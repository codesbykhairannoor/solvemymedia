import { useState, useRef, useCallback } from 'react';

export interface RecorderOptions {
  screen: boolean;
  webcam: boolean;
  mic: boolean;
  systemAudio: boolean;
}

export const useStudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);
  
  const recorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const streamsRef = useRef<MediaStream[]>([]);
  const startTimeRef = useRef<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioNodesRef = useRef<any[]>([]);

  const stopAllStreams = useCallback(() => {
    streamsRef.current.forEach(stream => {
      stream.getTracks().forEach(track => track.stop());
    });
    streamsRef.current = [];
    if (workerRef.current) {
      workerRef.current.postMessage('stop');
      workerRef.current.terminate();
      workerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(console.error);
      audioCtxRef.current = null;
    }
    audioNodesRef.current.forEach(node => node.disconnect && node.disconnect());
    audioNodesRef.current = [];
  }, []);

  const startRecording = async (options: RecorderOptions) => {
    try {
      setRecordedBlobUrl(null);
      let screenStream: MediaStream | null = null;
      let webcamStream: MediaStream | null = null;
      
      let hasAudio = false;

      // 1. Capture Webcam & Mic first (User permissions usually need to be first to avoid conflicts)
      if (options.webcam || options.mic) {
        webcamStream = await navigator.mediaDevices.getUserMedia({ 
          video: options.webcam ? { width: 1280, height: 720, facingMode: 'user' } : false, 
          audio: options.mic ? { 
            echoCancellation: false, 
            noiseSuppression: false,
            autoGainControl: false 
          } : false 
        });
        streamsRef.current.push(webcamStream);
        
        if (options.mic && webcamStream.getAudioTracks().length > 0) {
          hasAudio = true;
        }
      }

      // 2. Capture Screen (getDisplayMedia)
      if (options.screen) {
        screenStream = await navigator.mediaDevices.getDisplayMedia({ 
          video: { width: 1920, height: 1080, frameRate: 30 }, 
          audio: options.systemAudio ? {
            echoCancellation: false, 
            noiseSuppression: false,
            autoGainControl: false 
          } : false
        });
        streamsRef.current.push(screenStream);
        
        if (options.systemAudio && screenStream.getAudioTracks().length > 0) {
          hasAudio = true;
        }
      }

      const allTracks: MediaStreamTrack[] = [];

      // 3. Compose Video (Picture-in-Picture or Single)
      if (options.screen && options.webcam && screenStream && webcamStream) {
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d')!;

        const vScreen = document.createElement('video');
        vScreen.srcObject = screenStream;
        vScreen.muted = true;
        await vScreen.play();

        const vWebcam = document.createElement('video');
        vWebcam.srcObject = webcamStream;
        vWebcam.muted = true;
        await vWebcam.play();

        const drawLoop = () => {
          if (!isRecording && recorderRef.current?.state !== 'recording') return;
          // Draw Screen
          ctx.drawImage(vScreen, 0, 0, canvas.width, canvas.height);
          // Draw Webcam (Bottom Right, 16:9 ratio, bordered)
          const camWidth = 480;
          const camHeight = 270;
          const padding = 40;
          const camX = canvas.width - camWidth - padding;
          const camY = canvas.height - camHeight - padding;
          
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(camX, camY, camWidth, camHeight, 16);
          ctx.clip();
          ctx.drawImage(vWebcam, camX, camY, camWidth, camHeight);
          ctx.restore();
          
          // Add border
          ctx.lineWidth = 4;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.roundRect(camX, camY, camWidth, camHeight, 16);
          ctx.stroke();
        };
        
        // Wait briefly for videos to load their first frames
        await new Promise(r => setTimeout(r, 500));
        
        // Use a Web Worker to drive the loop so it doesn't pause when tab is backgrounded
        const workerCode = `
          let interval;
          self.onmessage = function(e) {
            if (e.data === 'start') {
              interval = setInterval(() => self.postMessage('tick'), 1000 / 30);
            } else if (e.data === 'stop') {
              clearInterval(interval);
            }
          };
        `;
        const workerBlob = new Blob([workerCode], { type: 'application/javascript' });
        const worker = new Worker(URL.createObjectURL(workerBlob));
        worker.onmessage = () => drawLoop();
        worker.postMessage('start');
        workerRef.current = worker;

        const canvasStream = canvas.captureStream(30);
        allTracks.push(canvasStream.getVideoTracks()[0]);
      } else if (options.screen && screenStream) {
        allTracks.push(screenStream.getVideoTracks()[0]);
      } else if (options.webcam && webcamStream) {
        allTracks.push(webcamStream.getVideoTracks()[0]);
      }

      // Add mixed audio
      if (hasAudio) {
        const audioTracks: MediaStreamTrack[] = [];
        if (screenStream && options.systemAudio && screenStream.getAudioTracks().length > 0) {
          audioTracks.push(screenStream.getAudioTracks()[0]);
        }
        if (webcamStream && options.mic && webcamStream.getAudioTracks().length > 0) {
          audioTracks.push(webcamStream.getAudioTracks()[0]);
        }

        if (audioTracks.length > 0) {
          // ALWAYS use AudioContext to reset hardware timestamps!
          // We MUST store these in refs so they aren't Garbage Collected!
          const actx = new (window.AudioContext || (window as any).webkitAudioContext)();
          audioCtxRef.current = actx;
          await actx.resume();
          
          const dest = actx.createMediaStreamDestination();
          audioNodesRef.current.push(dest);
          
          // Dummy oscillator to keep stream alive in Firefox (prevents silent empty drops)
          const osc = actx.createOscillator();
          const gain = actx.createGain();
          gain.gain.value = 0;
          osc.connect(gain);
          gain.connect(dest);
          osc.start();
          audioNodesRef.current.push(osc, gain);

          audioTracks.forEach(track => {
            const src = actx.createMediaStreamSource(new MediaStream([track]));
            
            // If this is the System Audio track, apply a 250% Gain Booster to combat Windows Audio Ducking
            if (screenStream && track === screenStream.getAudioTracks()[0]) {
              const boostGain = actx.createGain();
              boostGain.gain.value = 2.5;
              src.connect(boostGain);
              boostGain.connect(dest);
              audioNodesRef.current.push(src, boostGain);
            } else {
              src.connect(dest);
              audioNodesRef.current.push(src);
            }
          });
          
          allTracks.push(dest.stream.getAudioTracks()[0]);
        }
      }

      const finalStream = new MediaStream(allTracks);

      // 4. Start Recording
      const mimeTypes = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
      let selectedMimeType = '';
      for (const mime of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mime)) {
          selectedMimeType = mime;
          break;
        }
      }

      const recorder = new MediaRecorder(finalStream, { 
        mimeType: selectedMimeType || undefined,
        videoBitsPerSecond: 5000000 // 5Mbps
      });
      recorderRef.current = recorder;

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: selectedMimeType || 'video/webm' });
        // Prevent 0 byte blobs from crashing the UI
        if (blob.size === 0) {
           console.error("Recording produced an empty blob.");
           alert("Recording failed. Please ensure the camera/screen is active and try again.");
        } else {
           const url = URL.createObjectURL(blob);
           setRecordedBlobUrl(url);
        }
        stopAllStreams();
      };

      // Handle user stopping screen share via browser UI
      if (screenStream) {
        screenStream.getVideoTracks()[0].onended = () => {
          if (recorder.state === 'recording') stopRecording();
        };
      }

      recorder.start(1000);
      setIsRecording(true);
      startTimeRef.current = Date.now();
      setRecordingTime(0);
      
      timerRef.current = window.setInterval(() => {
        // Use absolute time diff so background throttling doesn't desync the clock
        const diff = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setRecordingTime(diff);
      }, 1000);

    } catch (err) {
      console.error("Recording failed to start", err);
      stopAllStreams();
    }
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state === 'recording') {
      recorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
  };

  return {
    isRecording,
    recordingTime,
    recordedBlobUrl,
    startRecording,
    stopRecording,
    resetRecording: () => setRecordedBlobUrl(null)
  };
};
