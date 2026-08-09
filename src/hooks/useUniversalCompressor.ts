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
    if (!ready) return null;
    
    setProcessing(true);
    setWebCodecsProgress(0);
    setEngine(null);

    const isVideo = file.type.startsWith('video');
    const hasWebCodecs = 'VideoEncoder' in window && 'MediaStreamTrackProcessor' in window;
    
    let resultUrl: string | null = null;

    // Fast Path: WebCodecs for MP4/WebM
    if (isVideo && hasWebCodecs && (targetFormat === 'mp4' || targetFormat === 'webm')) {
      try {
        setEngine(targetFormat === 'mp4' ? 'tier1' : 'tier2');
        resultUrl = await runWebCodecs(file, quality, targetFormat, (p) => setWebCodecsProgress(p));
      } catch (e) {
        console.warn(`WebCodecs (${targetFormat}) failed, falling back to WASM:`, e);
      }
    }

    // Fallback or Native Audio/Special Video Path: FFmpeg WASM
    if (!resultUrl) {
      console.warn("Running Tier 3 (FFmpeg WASM)");
      setEngine('tier3');
      resultUrl = await ffmpeg.compressMedia(file, quality, targetFormat);
    }

    setProcessing(false);
    return resultUrl;
  };

  return { ready, processing, progress, engine, processMedia };
};
