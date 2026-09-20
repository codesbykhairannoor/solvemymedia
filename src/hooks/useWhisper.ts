import { useState, useRef, useCallback } from 'react';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to use WebGPU if available, fallback to WASM
env.allowLocalModels = false;

export const useWhisper = () => {
  const [ready, setReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [resultText, setResultText] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const transcriberRef = useRef<any>(null);
  const initializingRef = useRef<Promise<boolean> | null>(null);

  const initModel = useCallback(async (): Promise<boolean> => {
    if (transcriberRef.current) return true;
    if (initializingRef.current) return initializingRef.current;
    
    setError(null);

    // Track per-file progress to prevent glitching progress bar
    const progressMap: Record<string, number> = {};

    const progressCallback = (data: any) => {
      if (data.status === 'progress') {
        progressMap[data.file] = data.progress;
        const values = Object.values(progressMap);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        setLoadingProgress(Math.round(avg));
      } else if (data.status === 'ready' || data.status === 'done') {
        setLoadingProgress(100);
      }
    };

    initializingRef.current = (async () => {
      try {
        // Safely detect true WebGPU support before initializing ONNX Runtime
        let deviceToUse = 'wasm';
        if (typeof navigator !== 'undefined' && 'gpu' in navigator) {
          try {
            const adapter = await (navigator as any).gpu.requestAdapter();
            if (adapter) deviceToUse = 'webgpu';
          } catch (e) {
            console.warn("WebGPU adapter request failed:", e);
          }
        }

        console.log(`Initializing Whisper using device: ${deviceToUse}`);
        
        try {
          transcriberRef.current = await pipeline(
            'automatic-speech-recognition', 
            'onnx-community/whisper-tiny', 
            { 
              device: deviceToUse as any,
              dtype: 'fp32',
              progress_callback: progressCallback
            }
          );
        } catch (gpuErr) {
          if (deviceToUse === 'webgpu') {
            console.warn("WebGPU initialization failed, falling back to WASM:", gpuErr);
            transcriberRef.current = await pipeline(
              'automatic-speech-recognition', 
              'onnx-community/whisper-tiny', 
              { 
                device: 'wasm',
                dtype: 'fp32',
                progress_callback: progressCallback
              }
            );
          } else {
            throw gpuErr;
          }
        }

        setReady(true);
        setLoadingProgress(100);
        return true;
      } catch (e: any) {
        console.error("Failed to load Whisper model:", e);
        setError(e?.message || "Failed to load speech recognition model. Please check your internet connection.");
        return false;
      } finally {
        initializingRef.current = null;
      }
    })();

    return initializingRef.current;
  }, []);

  const extractAudio = async (file: File): Promise<Float32Array> => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    
    // 1. Try native AudioContext decodeAudioData (fastest for MP3, WAV, AAC, etc.)
    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      return audioBuffer.getChannelData(0);
    } catch (nativeErr) {
      console.warn("Native decodeAudioData failed, falling back to FFmpeg audio extraction...", nativeErr);
    }

    // 2. Fallback: Use FFmpeg WASM to extract 16kHz mono WAV from any video/audio format
    try {
      const { FFmpeg } = await import('@ffmpeg/ffmpeg');
      const { fetchFile } = await import('@ffmpeg/util');
      const ffmpeg = new FFmpeg();
      await ffmpeg.load({
        coreURL: window.location.origin + '/ffmpeg/ffmpeg-core.js',
        wasmURL: window.location.origin + '/ffmpeg/ffmpeg-core.wasm',
        classWorkerURL: window.location.origin + '/ffmpeg/worker.js',
      });

      const ext = file.name.split('.').pop() || 'tmp';
      const inputName = `whisper_in_${Date.now()}.${ext}`;
      const outputName = `whisper_out_${Date.now()}.wav`;

      await ffmpeg.writeFile(inputName, await fetchFile(file));
      await ffmpeg.exec(['-i', inputName, '-vn', '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', outputName]);
      const data = await ffmpeg.readFile(outputName);

      try {
        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);
        ffmpeg.terminate();
      } catch (_) {}

      const wavBytes = data as Uint8Array;
      const wavBuffer = wavBytes.buffer.slice(wavBytes.byteOffset, wavBytes.byteOffset + wavBytes.byteLength);
      const audioBuffer = await audioContext.decodeAudioData(wavBuffer);
      return audioBuffer.getChannelData(0);
    } catch (ffmpegErr) {
      console.error("FFmpeg audio extraction failed:", ffmpegErr);
      throw new Error("Could not decode audio from the provided file.");
    }
  };

  const transcribe = async (file: File, language: string = 'indonesian') => {
    if (!transcriberRef.current) {
      const loaded = await initModel();
      if (!loaded || !transcriberRef.current) return null;
    }

    setProcessing(true);
    setResultText('');
    setError(null);

    try {
      // 1. Extract 16kHz mono audio data (native or FFmpeg fallback)
      const audioData = await extractAudio(file);

      // 2. Run inference
      const options: any = {
        chunk_length_s: 30,
        stride_length_s: 5,
        task: 'transcribe'
      };

      // Only pass language if specified and not 'auto'
      if (language && language !== 'auto') {
        options.language = language;
      }

      const output = await transcriberRef.current(audioData, options);

      const text = typeof output === 'string' ? output : (output?.text || '');
      setResultText(text.trim());
      setProcessing(false);
      return text.trim();
    } catch (err: any) {
      console.error("Transcription error:", err);
      setError(err?.message || "Transcription failed. Please ensure the file contains clear speech.");
      setProcessing(false);
      return null;
    }
  };

  return { ready, loadingProgress, processing, resultText, error, transcribe, initModel };
};

