import { Muxer as Mp4Muxer, ArrayBufferTarget as Mp4ArrayBufferTarget } from 'mp4-muxer';
import { Muxer as WebmMuxer, ArrayBufferTarget as WebmArrayBufferTarget } from 'webm-muxer';

type Quality = number;
type EngineMode = 'mp4' | 'webm';

export const runWebCodecs = async (
  file: File, 
  quality: Quality, 
  mode: EngineMode,
  onProgress: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    video.onloadedmetadata = async () => {
      let muxer: any = null;
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

        const scale = 0.3 + (0.7 * (quality / 100)); // 0.3 to 1.0
        targetWidth = targetWidth * scale;
        targetHeight = targetHeight * scale;
        targetBitrate = 200_000 + (3_800_000 * (quality / 100)); // 200kbps to 4Mbps
        
        targetWidth = Math.max(16, Math.floor(targetWidth / 16) * 16);
        targetHeight = Math.max(16, Math.floor(targetHeight / 16) * 16);

        const stream = (video as any).captureStream();
        const videoTrack = stream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks()[0];
        
        const initMuxer = (audioSampleRate: number, audioChannels: number) => {
          if (mode === 'mp4') {
            const muxerOptions: any = {
              target: new Mp4ArrayBufferTarget(),
              video: { codec: 'avc', width: targetWidth, height: targetHeight },
              fastStart: 'in-memory',
              firstTimestampBehavior: 'offset'
            };
            if (audioTrack && audioSampleRate > 0) {
              muxerOptions.audio = { codec: 'aac', numberOfChannels: audioChannels, sampleRate: audioSampleRate };
            }
            muxer = new Mp4Muxer(muxerOptions);
          } else {
            const muxerOptions: any = {
              target: new WebmArrayBufferTarget(),
              video: { codec: 'V_VP8', width: targetWidth, height: targetHeight },
              firstTimestampBehavior: 'offset'
            };
            if (audioTrack && audioSampleRate > 0) {
              muxerOptions.audio = { codec: 'A_OPUS', numberOfChannels: audioChannels, sampleRate: audioSampleRate };
            }
            muxer = new WebmMuxer(muxerOptions);
          }
          muxerReady = true;

          pendingVideoChunks.forEach(c => muxer!.addVideoChunk(c.chunk, c.meta as any));
          pendingAudioChunks.forEach(c => muxer!.addAudioChunk(c.chunk, c.meta as any));
          pendingVideoChunks = [];
          pendingAudioChunks = [];
        };

        if (!audioTrack) {
          initMuxer(0, 0);
        }

        videoEncoder = new VideoEncoder({
          output: (chunk, meta) => {
            if (muxerReady && muxer) {
              muxer.addVideoChunk(chunk, meta as any);
            } else {
              pendingVideoChunks.push({ chunk, meta: meta as any });
            }
            const percent = Math.round((chunk.timestamp / 1_000_000 / duration) * 100);
            onProgress(Math.min(100, Math.max(0, percent)));
          },
          error: (e) => {
            reject(e);
          }
        });

        const baseEncoderConfig: VideoEncoderConfig = mode === 'mp4' 
          ? {
              codec: 'avc1.42001f', // Baseline 3.1
              width: targetWidth,
              height: targetHeight,
              bitrate: targetBitrate,
              hardwareAcceleration: 'prefer-hardware',
              avc: { format: 'avc' }
            }
          : {
              codec: 'vp8',
              width: targetWidth,
              height: targetHeight,
              bitrate: targetBitrate,
              hardwareAcceleration: 'prefer-hardware',
            };

        if (mode === 'mp4') {
          const check1 = await VideoEncoder.isConfigSupported(baseEncoderConfig);
          if (!check1.supported) {
            baseEncoderConfig.hardwareAcceleration = 'no-preference';
            baseEncoderConfig.codec = 'avc1.4d0034';
            const check2 = await VideoEncoder.isConfigSupported(baseEncoderConfig);
            if (!check2.supported) {
              baseEncoderConfig.codec = 'avc1.420034';
              const check3 = await VideoEncoder.isConfigSupported(baseEncoderConfig);
              if (!check3.supported) {
                 throw new DOMException("H.264 not supported");
              }
            }
          }
        } else {
           const check = await VideoEncoder.isConfigSupported(baseEncoderConfig);
           if (!check.supported) {
              baseEncoderConfig.hardwareAcceleration = 'no-preference';
           }
        }
        
        videoEncoder.configure(baseEncoderConfig);

        if (!videoTrack) throw new Error("No video track");

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
                   audioEncoder!.configure({
                     codec: mode === 'mp4' ? 'mp4a.40.2' : 'opus',
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
               console.error("Audio err", err);
             }
           };
           processAudio();
        }

        video.play();

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
            console.error("Frame err:", err);
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
              const blob = new Blob([buffer], { type: mode === 'mp4' ? 'video/mp4' : 'video/webm' });
              resolve(URL.createObjectURL(blob));
            } else {
              reject("Muxer failed");
            }
          } catch (err) {
            reject(err);
          } finally {
            video.remove();
          }
        };

      } catch (e) {
        reject(e);
        video.remove();
      }
    };
    
    video.onerror = () => {
      reject(new Error("Failed to load video natively."));
      video.remove();
    };
  });
};
