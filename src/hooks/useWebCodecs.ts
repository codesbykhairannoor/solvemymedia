import { useState, useEffect } from 'react';
import { Muxer, ArrayBufferTarget } from 'mp4-muxer';

type Quality = 'extreme' | 'balanced' | 'high';

export const useWebCodecs = () => {
  const [ready, setReady] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if ('VideoEncoder' in window && 'MediaStreamTrackProcessor' in window) {
      setReady(true);
    } else {
      console.error("WebCodecs or MediaStream API is not fully supported in this browser.");
    }
  }, []);

  const compressMedia = async (file: File, quality: Quality): Promise<string | null> => {
    if (!ready) return null;
    if (!file.type.startsWith('video')) {
      alert("This engine only supports Video files.");
      return null;
    }

    setProcessing(true);
    setProgress(0);

    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = "anonymous";

      video.onloadedmetadata = async () => {
        let muxer: Muxer<ArrayBufferTarget> | null = null;
        let videoEncoder: VideoEncoder | null = null;
        let audioEncoder: AudioEncoder | null = null;
        
        let muxerReady = false;
        let pendingVideoChunks: { chunk: EncodedVideoChunk, meta: EncodedVideoChunkMetadata | undefined }[] = [];
        let pendingAudioChunks: { chunk: EncodedAudioChunk, meta: EncodedAudioChunkMetadata | undefined }[] = [];

        try {
          const originalWidth = video.videoWidth;
          const originalHeight = video.videoHeight;
          const duration = video.duration;
          
          let targetWidth = originalWidth || 1280;
          let targetHeight = originalHeight || 720;
          let targetBitrate = 2_000_000;

          if (quality === 'extreme') {
            targetWidth = targetWidth / 2;
            targetHeight = targetHeight / 2;
            targetBitrate = 500_000;
          } else if (quality === 'balanced') {
            targetWidth = targetWidth * 0.75;
            targetHeight = targetHeight * 0.75;
            targetBitrate = 1_000_000;
          }
          
          targetWidth = Math.max(16, Math.floor(targetWidth / 16) * 16);
          targetHeight = Math.max(16, Math.floor(targetHeight / 16) * 16);

          const stream = (video as any).captureStream();
          const videoTrack = stream.getVideoTracks()[0];
          const audioTrack = stream.getAudioTracks()[0];
          
          const initMuxer = (audioSampleRate: number, audioChannels: number) => {
            const muxerOptions: any = {
              target: new ArrayBufferTarget(),
              video: {
                codec: 'avc',
                width: targetWidth,
                height: targetHeight,
              },
              fastStart: 'in-memory',
              firstTimestampBehavior: 'offset'
            };

            if (audioTrack && audioSampleRate > 0) {
              muxerOptions.audio = {
                codec: 'aac',
                numberOfChannels: audioChannels,
                sampleRate: audioSampleRate
              };
            }

            muxer = new Muxer(muxerOptions);
            muxerReady = true;

            // Flush queues
            pendingVideoChunks.forEach(c => muxer!.addVideoChunk(c.chunk, c.meta as any));
            pendingAudioChunks.forEach(c => muxer!.addAudioChunk(c.chunk, c.meta as any));
            pendingVideoChunks = [];
            pendingAudioChunks = [];
          };

          if (!audioTrack) {
            initMuxer(0, 0); // No audio, init immediately
          }

          videoEncoder = new VideoEncoder({
            output: (chunk, meta) => {
              if (muxerReady && muxer) {
                muxer.addVideoChunk(chunk, meta as any);
              } else {
                pendingVideoChunks.push({ chunk, meta: meta as any });
              }
              const percent = Math.round((chunk.timestamp / 1_000_000 / duration) * 100);
              setProgress(Math.min(100, Math.max(0, percent)));
            },
            error: (e) => {
              console.error("VideoEncoder error", e);
              reject(e);
            }
          });

          const baseEncoderConfig: VideoEncoderConfig = {
            codec: 'avc1.42001f', // Baseline Level 3.1
            width: targetWidth,
            height: targetHeight,
            bitrate: targetBitrate,
            hardwareAcceleration: 'prefer-hardware',
            avc: { format: 'avc' }
          };

          const check1 = await VideoEncoder.isConfigSupported(baseEncoderConfig);
          if (!check1.supported) {
            baseEncoderConfig.hardwareAcceleration = 'no-preference';
            baseEncoderConfig.codec = 'avc1.4d0034'; // Try Main profile high level
            const check2 = await VideoEncoder.isConfigSupported(baseEncoderConfig);
            if (!check2.supported) {
              baseEncoderConfig.codec = 'avc1.420034'; // Try Baseline high level
            }
          }
          videoEncoder.configure(baseEncoderConfig);

          if (!videoTrack) {
            throw new Error("Cannot capture video track from the browser player.");
          }

          const processor = new (window as any).MediaStreamTrackProcessor({ track: videoTrack });
          const reader = processor.readable.getReader();

          if (audioTrack) {
             let firstAudioDataReceived = false;

             audioEncoder = new AudioEncoder({
               output: (chunk, meta) => {
                 if (muxerReady && muxer) {
                    muxer.addAudioChunk(chunk, meta as any);
                 } else {
                    pendingAudioChunks.push({ chunk, meta: meta as any });
                 }
               },
               error: (e) => console.error("AudioEncoder error", e)
             });

             const audioProcessor = new (window as any).MediaStreamTrackProcessor({ track: audioTrack });
             const audioReader = audioProcessor.readable.getReader();
             
             const processAudio = async () => {
               try {
                 while (true) {
                   const { done, value } = await audioReader.read();
                   if (done) break;
                   const data = value as AudioData;

                   if (!firstAudioDataReceived) {
                     firstAudioDataReceived = true;
                     // Now we have the EXACT sampleRate and channels
                     audioEncoder!.configure({
                       codec: 'mp4a.40.2',
                       sampleRate: data.sampleRate,
                       numberOfChannels: data.numberOfChannels,
                       bitrate: 128_000
                     });
                     initMuxer(data.sampleRate, data.numberOfChannels);
                   }

                   if (audioEncoder && audioEncoder.state === 'configured') {
                     audioEncoder.encode(data);
                     data.close();
                   } else {
                     data.close();
                   }
                 }
               } catch (err) {
                 console.error("Audio processing error", err);
               }
             };
             processAudio();
          }

          video.play(); // Start generating frames

          const processFrames = async () => {
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const frame = value as VideoFrame;
                if (videoEncoder && videoEncoder.state === 'configured') {
                  videoEncoder.encode(frame, { keyFrame: frame.timestamp % 2000000 < 50000 });
                  frame.close();
                } else {
                  frame.close();
                }
              }
            } catch (err) {
              console.error("Frame processing error:", err);
            }
          };

          processFrames();

          video.onended = async () => {
            try {
              if (videoEncoder && videoEncoder.state !== 'closed') await videoEncoder.flush();
              if (audioEncoder && audioEncoder.state !== 'closed') await audioEncoder.flush();
              if (muxer) {
                muxer.finalize();
                const { buffer } = muxer.target;
                const blob = new Blob([buffer], { type: 'video/mp4' });
                resolve(URL.createObjectURL(blob));
              } else {
                resolve(null);
              }
            } catch (err) {
              reject(err);
            } finally {
              video.remove();
              setProcessing(false);
            }
          };

        } catch (e) {
          reject(e);
          video.remove();
          setProcessing(false);
        }
      };
      
      video.onerror = () => {
        reject("Failed to load video natively.");
        video.remove();
        setProcessing(false);
      };
    });
  };

  return { ready, processing, progress, compressMedia };
};
