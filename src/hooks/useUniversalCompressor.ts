import { useState } from 'react';
import { useFFmpeg } from './useFFmpeg';
import { runWebCodecs } from '../utils/webCodecsEngine';

export type Quality = number;
export type EngineTier = 'tier1' | 'tier2' | 'tier3' | null;

export const useUniversalCompressor = () => {
  const ffmpeg = useFFmpeg();
  
  const [engine, setEngine] = useState<EngineTier>(null);
  const [processing, setProcessing] = useState(false);
  const [webCodecsProgress, setWebCodecsProgress] = useState(0);
  
  const ready = ffmpeg.ready;
  const progress = engine === 'tier3' ? ffmpeg.progress : webCodecsProgress;

  const processMedia = async (file: File, quality: Quality, targetFormat: string): Promise<string | null> => {
    setProcessing(true);
    setWebCodecsProgress(0);
    setEngine(null);

    const isVideo = file.type.startsWith('video');
    const hasWebCodecs = typeof window !== 'undefined' && 'VideoEncoder' in window && 'MediaStreamTrackProcessor' in window;
    
    let resultUrl: string | null = null;

    // Fast Path: WebCodecs for MP4/WebM (Hardware accelerated, runs without waiting for FFmpeg)
    if (isVideo && hasWebCodecs && (targetFormat.toLowerCase() === 'mp4' || targetFormat.toLowerCase() === 'webm')) {
      try {
        setEngine(targetFormat.toLowerCase() === 'mp4' ? 'tier1' : 'tier2');
        resultUrl = await runWebCodecs(file, quality, targetFormat.toLowerCase() as any, (p) => setWebCodecsProgress(p));
      } catch (e) {
        console.warn(`WebCodecs (${targetFormat}) failed, falling back to WASM FFmpeg:`, e);
      }
    }

    // Fallback or Native Audio/Special Video Path: FFmpeg WASM
    if (!resultUrl) {
      console.log("Running Tier 3 (FFmpeg WASM)");
      setEngine('tier3');
      
      // Ensure FFmpeg is loaded before compressing
      if (!ffmpeg.ready) {
        const loaded = await ffmpeg.load();
        if (!loaded) {
          console.error("FFmpeg failed to load");
          setProcessing(false);
          return null;
        }
      }
      
      resultUrl = await ffmpeg.compressMedia(file, quality, targetFormat);
    }

    setProcessing(false);
    return resultUrl;
  };

  return { ready, processing, progress, engine, processMedia };
};
