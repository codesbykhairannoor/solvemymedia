import { useState, useRef, useCallback } from 'react';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to use WebGPU if available, fallback to WASM
env.allowLocalModels = false;

/**
 * Intelligent multi-pass cleaner to eliminate Whisper autoregressive hallucination loops
 * (e.g. repeated phrases during pauses/silence like "di sini saya akan mencari..." 20 times)
 * while safely preserving natural language features like Indonesian kata ulang ("jalan-jalan", "hati-hati").
 */
export function cleanWhisperRepetitions(text: string): string {
  if (!text || typeof text !== 'string') return '';
  
  let current = text.replace(/\s+/g, ' ').trim();
  if (!current) return '';
  
  // Normalize common Indonesian prefixes that Whisper alternates (e.g. "disini" vs "di sini")
  current = current.replace(/\bdisini\b/gi, 'di sini');

  // Pass 1: Regex-based consecutive phrase deduplication (handles phrases separated by space, commas, periods)
  for (let len = 15; len >= 2; len--) {
    const pattern = new RegExp(`((?:\\b[\\w'-]+\\b[\\s,.]*){${len}})(?:\\s*\\1){1,}`, 'gi');
    current = current.replace(pattern, '$1');
  }

  // Pass 2: Word-level sequence deduplication with punctuation normalization
  const words = current.split(' ');
  const result: string[] = [];
  let i = 0;

  const normalizeWord = (w: string) => w.toLowerCase().replace(/[^a-z0-9]/gi, '');

  while (i < words.length) {
    let bestMatchLen = 0;
    let bestCount = 0;

    const maxCheck = Math.min(15, Math.floor((words.length - i) / 2));
    for (let len = maxCheck; len >= 1; len--) {
      const segA = words.slice(i, i + len).map(normalizeWord).join(' ');
      if (!segA || segA.length < 2) continue;

      let next = i + len;
      let count = 1;

      while (next + len <= words.length) {
        const segB = words.slice(next, next + len).map(normalizeWord).join(' ');
        if (segA === segB) {
          count++;
          next += len;
        } else {
          break;
        }
      }

      // If phrase (len >= 2) repeats 2 or more times, collapse it.
      // If single word (len === 1), only collapse if repeated 3 or more times (to preserve Indonesian kata ulang like "hati-hati" / "sama sama")
      if ((len >= 2 && count >= 2) || (len === 1 && count >= 3)) {
        bestMatchLen = len;
        bestCount = count;
        break;
      }
    }

    if (bestMatchLen > 0) {
      for (let k = 0; k < bestMatchLen; k++) {
        result.push(words[i + k]);
      }
      i += bestMatchLen * bestCount;
    } else {
      result.push(words[i]);
      i++;
    }
  }

  // Pass 3: Catch any remaining single word stutter spam like "halo halo halo halo" or "dan dan dan"
  let finalStr = result.join(' ');
  finalStr = finalStr.replace(/\b(\w+)(?:[\s,.]+\1\b){2,}/gi, '$1');

  // Clean trailing duplicate punctuation and normalize whitespace
  return finalStr
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,!?;:])/g, '$1')
    .replace(/([.,!?;:])\1+/g, '$1')
    .trim();
}

export const useWhisper = () => {
  const [ready, setReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [resultText, setResultText] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const transcriberRef = useRef<any>(null);
  const currentModelRef = useRef<string>('');
  const initializingRef = useRef<Promise<boolean> | null>(null);

  const initModel = useCallback(async (modelId: string = 'onnx-community/whisper-base'): Promise<boolean> => {
    if (transcriberRef.current && currentModelRef.current === modelId) return true;
    if (initializingRef.current && currentModelRef.current === modelId) return initializingRef.current;
    
    setError(null);
    setReady(false);
    setLoadingProgress(0);

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

        console.log(`Initializing Whisper model [${modelId}] using device: ${deviceToUse}`);
        
        try {
          transcriberRef.current = await pipeline(
            'automatic-speech-recognition', 
            modelId, 
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
              modelId, 
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

        currentModelRef.current = modelId;
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

  const transcribe = async (
    file: File, 
    language: string = 'indonesian', 
    modelId: string = 'onnx-community/whisper-base'
  ) => {
    if (!transcriberRef.current || currentModelRef.current !== modelId) {
      const loaded = await initModel(modelId);
      if (!loaded || !transcriberRef.current) return null;
    }

    setProcessing(true);
    setResultText('');
    setError(null);

    try {
      // 1. Extract 16kHz mono audio data (native or FFmpeg fallback)
      const audioData = await extractAudio(file);

      // 2. Run inference with natural speech decoding options (mild repetition penalty, no ngram blocking)
      const options: any = {
        chunk_length_s: 30,
        stride_length_s: 5,
        task: 'transcribe',
        return_timestamps: false,
        repetition_penalty: 1.1,
        generate_kwargs: {
          repetition_penalty: 1.1,
        }
      };

      // Only pass language if specified and not 'auto'
      if (language && language !== 'auto') {
        options.language = language;
      }

      const output = await transcriberRef.current(audioData, options);

      const rawText = typeof output === 'string' ? output : (output?.text || '');
      const cleanedText = cleanWhisperRepetitions(rawText);
      
      setResultText(cleanedText);
      setProcessing(false);
      return cleanedText;
    } catch (err: any) {
      console.error("Transcription error:", err);
      setError(err?.message || "Transcription failed. Please ensure the file contains clear speech.");
      setProcessing(false);
      return null;
    }
  };

  return { ready, loadingProgress, processing, resultText, error, transcribe, initModel };
};

