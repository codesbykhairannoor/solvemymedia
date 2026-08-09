import { useState, useRef, useCallback } from 'react';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to use WebGPU if available, fallback to WASM
env.allowLocalModels = false;

export const useWhisper = () => {
  const [ready, setReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [resultText, setResultText] = useState('');
  
  const transcriberRef = useRef<any>(null);

  const initModel = useCallback(async () => {
    if (transcriberRef.current) return;
    
    // Track per-file progress to prevent glitching progress bar
    const progressMap: Record<string, number> = {};

    const progressCallback = (data: any) => {
      if (data.status === 'progress') {
        progressMap[data.file] = data.progress;
        const values = Object.values(progressMap);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        setLoadingProgress(Math.round(avg));
      } else if (data.status === 'ready') {
        setLoadingProgress(100);
      }
    };

    try {
      // Safely detect true WebGPU support before initializing ONNX Runtime
      let deviceToUse = 'wasm';
      if ('gpu' in navigator) {
        try {
          const adapter = await (navigator as any).gpu.requestAdapter();
          if (adapter) deviceToUse = 'webgpu';
        } catch (e) {
          console.warn("WebGPU adapter request failed:", e);
        }
      }

      console.log(`Initializing Whisper using device: ${deviceToUse}`);
      
      transcriberRef.current = await pipeline(
        'automatic-speech-recognition', 
        'onnx-community/whisper-base', 
        { 
          device: deviceToUse as any,
          dtype: 'fp32', // Use full precision (fp32) to avoid Quantization crashes in WASM and WebGPU
          progress_callback: progressCallback
        }
      );
      setReady(true);
    } catch (e) {
      console.error("Failed to load Whisper model:", e);
    }
  }, []);

  const transcribe = async (file: File, language: string = 'indonesian') => {
    if (!transcriberRef.current) await initModel();
    if (!transcriberRef.current) return null;

    setProcessing(true);
    setResultText('');

    try {
      // 1. Decode Audio/Video directly using Browser's native AudioContext
      // Whisper requires 16kHz mono audio
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // Get mono channel data
      const audioData = audioBuffer.getChannelData(0);

      // 2. Run inference
      // Using chunk_length_s enables long-form transcription accurately.
      // Explicitly pass language to prevent defaulting to English.
      const output = await transcriberRef.current(audioData, {
        chunk_length_s: 30,
        stride_length_s: 5,
        language: language,
        task: 'transcribe'
      });

      setResultText(output.text.trim());
      setProcessing(false);
      return output.text.trim();
    } catch (error) {
      console.error("Transcription error:", error);
      setProcessing(false);
      return null;
    }
  };

  return { ready, loadingProgress, processing, resultText, transcribe, initModel };
};
