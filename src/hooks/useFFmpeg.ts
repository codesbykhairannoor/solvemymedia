import { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

export const useFFmpeg = () => {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  // In Vite SSR, import.meta.env.SSR is true on the server
  const ffmpegRef = useRef<any>(import.meta.env.SSR ? null : new FFmpeg());
  const loadingPromiseRef = useRef<Promise<boolean> | null>(null);

  useEffect(() => {
    if (!ffmpegRef.current) {
      ffmpegRef.current = new FFmpeg();
    }
    load();
  }, []);

  const load = async (): Promise<boolean> => {
    if (ffmpegRef.current?.loaded) {
      setReady(true);
      return true;
    }
    if (loadingPromiseRef.current) {
      return loadingPromiseRef.current;
    }

    loadingPromiseRef.current = (async () => {
      try {
        if (!ffmpegRef.current) {
          ffmpegRef.current = new FFmpeg();
        }
        const ffmpeg = ffmpegRef.current;
        
        ffmpeg.on('log', ({ message }: { message: string }) => {
          setLogs((prev) => [...prev, message]);
        });

        ffmpeg.on('progress', ({ progress }: { progress: number; time: number }) => {
          setProgress(Math.round(progress * 100));
        });

        await ffmpeg.load({
          coreURL: window.location.origin + '/ffmpeg/ffmpeg-core.js',
          wasmURL: window.location.origin + '/ffmpeg/ffmpeg-core.wasm',
          classWorkerURL: window.location.origin + '/ffmpeg/worker.js',
        });
        setReady(true);
        return true;
      } catch (e) {
        console.error("FFmpeg completely failed to load locally:", e);
        return false;
      } finally {
        loadingPromiseRef.current = null;
      }
    })();

    return loadingPromiseRef.current;
  };

  const compressMedia = async (file: File, quality: number, targetFormat: string) => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return null;

    if (!ready && !ffmpeg.loaded) {
      const ok = await load();
      if (!ok) return null;
    }

    setProcessing(true);
    setProgress(0);
    setLogs([]);
    
    const rawExt = (file.name.split('.').pop() || '').toLowerCase();
    const cleanExt = rawExt.replace(/[^a-z0-9]/g, '');
    const cleanTarget = targetFormat.toLowerCase().replace(/^\./, '').trim();
    const isVideo = file.type.startsWith('video') || ['mp4', 'webm', 'mkv', 'avi', 'mov', 'flv', 'wmv', 'm4v', '3gp', 'ts', 'ogv'].includes(cleanExt);
    const inputName = `input_${Date.now()}.${cleanExt || (isVideo ? 'mp4' : 'mp3')}`;
    const outputName = `output_${Date.now()}.${cleanTarget}`;
    
    try {
      // Write the file to memory 
      await ffmpeg.writeFile(inputName, await fetchFile(file));
      
      let args: string[] = ['-i', inputName];
      
      const isTargetAudio = ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'opus', 'wma', 'aiff', 'ac3'].includes(cleanTarget);

      if (!isTargetAudio) {
        const scaleMultiplier = quality >= 100 ? 1 : Number((0.3 + (0.7 * (quality / 100))).toFixed(2));
        const scaleFilter = scaleMultiplier < 1 ? `scale=trunc(iw*${scaleMultiplier}/2)*2:-2` : 'scale=trunc(iw/2)*2:-2';

        if (['mp4', 'mkv', 'mov', 'm4v', 'ts'].includes(cleanTarget)) {
          const crf = Math.round(35 - ((quality / 100) * 17));
          let preset = 'medium';
          if (quality < 33) preset = 'veryfast';
          else if (quality < 66) preset = 'faster';
          else preset = 'fast';

          args.push(
            '-c:v', 'libx264',
            '-pix_fmt', 'yuv420p',
            '-crf', crf.toString(),
            '-preset', preset,
            '-vf', scaleFilter,
            '-c:a', 'aac',
            '-b:a', '192k'
          );
        } else if (cleanTarget === 'webm') {
          const crf = Math.round(40 - ((quality / 100) * 20));
          args.push(
            '-c:v', 'libvpx',
            '-b:v', '1.5M',
            '-crf', crf.toString(),
            '-deadline', 'realtime',
            '-cpu-used', '4',
            '-vf', scaleFilter,
            '-c:a', 'libopus',
            '-b:a', '128k',
            '-ar', '48000'
          );
        } else if (cleanTarget === 'avi') {
          const qv = Math.round(2 + ((100 - quality) / 100) * 10);
          args.push(
            '-c:v', 'mpeg4',
            '-q:v', qv.toString(),
            '-vf', scaleFilter,
            '-c:a', 'libmp3lame',
            '-b:a', '192k',
            '-ac', '2',
            '-ar', '44100'
          );
        } else if (cleanTarget === 'wmv') {
          args.push(
            '-c:v', 'wmv2',
            '-b:v', '2M',
            '-vf', scaleFilter,
            '-c:a', 'wmav2',
            '-b:a', '128k',
            '-ac', '2',
            '-ar', '44100'
          );
        } else if (cleanTarget === 'flv') {
          args.push(
            '-c:v', 'flv',
            '-vf', scaleFilter,
            '-c:a', 'libmp3lame',
            '-ac', '2',
            '-ar', '44100'
          );
        } else if (cleanTarget === '3gp') {
          args.push(
            '-c:v', 'libx264',
            '-pix_fmt', 'yuv420p',
            '-preset', 'fast',
            '-vf', scaleFilter,
            '-c:a', 'aac',
            '-ac', '2',
            '-ar', '32000'
          );
        } else if (cleanTarget === 'ogv') {
          args.push(
            '-c:v', 'theora',
            '-q:v', '6',
            '-vf', scaleFilter,
            '-c:a', 'libvorbis',
            '-b:a', '128k',
            '-ac', '2'
          );
        } else if (cleanTarget === 'gif') {
          args.push(
            '-an',
            '-vf', `${scaleFilter},fps=12,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`
          );
        } else {
          args.push('-vf', scaleFilter);
        }
      } else {
        // Audio conversion or extraction from video
        // Strip any video stream (including embedded album cover art) cleanly
        args.push('-vn');
        
        const audioKbps = Math.round(32 + ((quality / 100) * 160));
        if (cleanTarget === 'mp3') {
          args.push('-c:a', 'libmp3lame', '-b:a', `${audioKbps}k`, '-ac', '2', '-ar', '44100');
        } else if (cleanTarget === 'ogg') {
          args.push('-c:a', 'libvorbis', '-b:a', `${audioKbps}k`, '-ac', '2');
        } else if (cleanTarget === 'aac' || cleanTarget === 'm4a') {
          args.push('-c:a', 'aac', '-b:a', `${audioKbps}k`, '-ac', '2');
        } else if (cleanTarget === 'wav') {
          args.push('-c:a', 'pcm_s16le');
        } else if (cleanTarget === 'flac') {
          args.push('-c:a', 'flac');
        } else if (cleanTarget === 'opus') {
          args.push('-c:a', 'libopus', '-b:a', `${Math.min(audioKbps, 160)}k`, '-ac', '2', '-ar', '48000');
        } else if (cleanTarget === 'wma') {
          args.push('-c:a', 'wmav2', '-b:a', `${audioKbps}k`, '-ac', '2', '-ar', '44100');
        } else if (cleanTarget === 'aiff') {
          args.push('-c:a', 'pcm_s16be');
        } else if (cleanTarget === 'ac3') {
          args.push('-c:a', 'ac3', '-b:a', `${audioKbps}k`, '-ac', '2');
        } else {
          args.push('-b:a', `${audioKbps}k`);
        }
      }

      args.push(outputName);

      try {
        await ffmpeg.exec(args);
      } catch (execErr) {
        console.warn("FFmpeg exec warning/non-zero return:", execErr);
      }

      const data = await ffmpeg.readFile(outputName);
      if (!data || (data as Uint8Array).byteLength === 0) {
        throw new Error(`FFmpeg did not produce output for format: ${cleanTarget}`);
      }
      
      let mimeType = !isTargetAudio ? `video/${cleanTarget}` : `audio/${cleanTarget}`;
      if (cleanTarget === 'mkv') mimeType = 'video/x-matroska';
      if (cleanTarget === 'avi') mimeType = 'video/x-msvideo';
      if (cleanTarget === 'mov') mimeType = 'video/quicktime';
      if (cleanTarget === 'wmv') mimeType = 'video/x-ms-wmv';
      if (cleanTarget === 'flv') mimeType = 'video/x-flv';
      if (cleanTarget === '3gp') mimeType = 'video/3gpp';
      if (cleanTarget === 'ts') mimeType = 'video/mp2t';
      if (cleanTarget === 'm4v') mimeType = 'video/x-m4v';
      if (cleanTarget === 'ogv') mimeType = 'video/ogg';
      if (cleanTarget === 'gif') mimeType = 'image/gif';
      if (cleanTarget === 'mp3') mimeType = 'audio/mpeg';
      if (cleanTarget === 'wav') mimeType = 'audio/wav';
      if (cleanTarget === 'aac') mimeType = 'audio/aac';
      if (cleanTarget === 'm4a') mimeType = 'audio/mp4';
      if (cleanTarget === 'flac') mimeType = 'audio/flac';
      if (cleanTarget === 'opus') mimeType = 'audio/opus';
      if (cleanTarget === 'ogg') mimeType = isTargetAudio ? 'audio/ogg' : 'video/ogg';
      if (cleanTarget === 'wma') mimeType = 'audio/x-ms-wma';
      if (cleanTarget === 'aiff') mimeType = 'audio/aiff';
      if (cleanTarget === 'ac3') mimeType = 'audio/ac3';

      const blob = new Blob([data as any], { type: mimeType });
      setProcessing(false);
      return URL.createObjectURL(blob);
    } catch (e) {
      console.error("FFmpeg compressMedia failed:", e);
      setProcessing(false);
      return null;
    } finally {
      try {
        await ffmpeg.deleteFile(inputName);
      } catch (_) {}
      try {
        await ffmpeg.deleteFile(outputName);
      } catch (_) {}
    }
  };

  const trimMedia = async (fileUrl: string, startSec: number, endSec: number) => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return null;

    if (!ready && !ffmpeg.loaded) {
      const ok = await load();
      if (!ok) return null;
    }

    setProcessing(true);
    setProgress(0);
    setLogs([]);
    
    const inputName = `input_trim_${Date.now()}.webm`;
    const outputName = `output_trim_${Date.now()}.webm`;
    
    try {
      // Fetch the blob from the object URL
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const fileData = new Uint8Array(await blob.arrayBuffer());
      
      await ffmpeg.writeFile(inputName, fileData);
      
      // Fast stream copy (no re-encoding)
      const args = [
        '-ss', startSec.toString(),
        '-to', endSec.toString(),
        '-i', inputName,
        '-c', 'copy',
        outputName
      ];
      
      await ffmpeg.exec(args);
      const data = await ffmpeg.readFile(outputName);
      const trimmedBlob = new Blob([data as any], { type: 'video/webm' });
      
      setProcessing(false);
      return URL.createObjectURL(trimmedBlob);
    } catch (e) {
      console.error("FFmpeg trimMedia failed:", e);
      setProcessing(false);
      return null;
    } finally {
      try {
        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);
      } catch (_) {}
    }
  };

  const fixWebmMetadata = async (fileUrl: string) => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return fileUrl;

    if (!ready && !ffmpeg.loaded) {
      const ok = await load();
      if (!ok) return fileUrl;
    }

    setProcessing(true);
    setProgress(0);
    setLogs([]);
    
    const inputName = `input_fix_${Date.now()}.webm`;
    const outputName = `output_fix_${Date.now()}.webm`;
    
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const fileData = new Uint8Array(await blob.arrayBuffer());
      
      await ffmpeg.writeFile(inputName, fileData);
      
      // Fast stream copy with forced PTS generation to fix Infinity duration
      const args = ['-i', inputName, '-c', 'copy', '-fflags', '+genpts', outputName];
      
      await ffmpeg.exec(args);
      const data = await ffmpeg.readFile(outputName);
      const fixedBlob = new Blob([data as any], { type: 'video/webm' });
      
      setProcessing(false);
      return URL.createObjectURL(fixedBlob);
    } catch (e) {
      console.error("Failed to fix WebM metadata:", e);
      setProcessing(false);
      return fileUrl; // Return original on failure
    } finally {
      try {
        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);
      } catch (_) {}
    }
  };

  const runCustomFFmpeg = async (files: File[], args: string[], outputName: string, mimeType: string) => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return null;

    if (!ready && !ffmpeg.loaded) {
      const ok = await load();
      if (!ok) return null;
    }

    setProcessing(true);
    setProgress(0);
    setLogs([]);
    
    try {
      // Write all input files to memory
      for (let i = 0; i < files.length; i++) {
        await ffmpeg.writeFile(files[i].name, await fetchFile(files[i]));
      }
      
      await ffmpeg.exec(args);
      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data as any], { type: mimeType });
      
      setProcessing(false);
      return URL.createObjectURL(blob);
    } catch (e) {
      console.error("FFmpeg runCustomFFmpeg failed:", e);
      setProcessing(false);
      return null;
    } finally {
      for (let i = 0; i < files.length; i++) {
        try {
          await ffmpeg.deleteFile(files[i].name);
        } catch (_) {}
      }
      try {
        await ffmpeg.deleteFile(outputName);
      } catch (_) {}
    }
  };

  return { ready, processing, progress, logs, load, compressMedia, trimMedia, fixWebmMetadata, runCustomFFmpeg };
};

