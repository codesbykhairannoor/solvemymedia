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
    
    const isVideo = file.type.startsWith('video');
    const rawExt = file.name.split('.').pop() || (isVideo ? 'mp4' : 'mp3');
    const inputExt = rawExt.toLowerCase();
    const inputName = `input_${Date.now()}.${inputExt}`;
    const outputName = `output_${Date.now()}.${targetFormat.toLowerCase()}`;
    
    try {
      // Write the file to memory 
      await ffmpeg.writeFile(inputName, await fetchFile(file));
      
      let args: string[] = ['-i', inputName];
      
      const isTargetAudio = ['mp3', 'wav', 'aac', 'ogg'].includes(targetFormat.toLowerCase());

      if (!isTargetAudio) {
        const scaleMultiplier = quality >= 100 ? 1 : Number((0.3 + (0.7 * (quality / 100))).toFixed(2));
        const scaleFilter = scaleMultiplier < 1 ? `scale=trunc(iw*${scaleMultiplier}/2)*2:-2` : 'scale=trunc(iw/2)*2:-2';

        if (targetFormat === 'mp4' || targetFormat === 'mkv') {
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
        } else if (targetFormat === 'webm') {
          const crf = Math.round(40 - ((quality / 100) * 20));
          args.push(
            '-c:v', 'libvpx-vp9',
            '-b:v', '0',
            '-crf', crf.toString(),
            '-deadline', 'realtime',
            '-cpu-used', '4',
            '-vf', scaleFilter,
            '-c:a', 'libopus',
            '-b:a', '128k'
          );
        } else if (targetFormat === 'avi') {
          const qv = Math.round(2 + ((100 - quality) / 100) * 10);
          args.push(
            '-c:v', 'mpeg4',
            '-q:v', qv.toString(),
            '-vf', scaleFilter,
            '-c:a', 'libmp3lame',
            '-b:a', '192k'
          );
        } else {
          args.push('-vf', scaleFilter);
        }
      } else {
        // Audio conversion (from Audio OR Video)
        if (isVideo) {
          args.push('-vn'); // Strip video stream if extracting audio from video
        }
        
        const audioKbps = Math.round(32 + ((quality / 100) * 160));
        if (targetFormat === 'mp3') {
          args.push('-c:a', 'libmp3lame', '-b:a', `${audioKbps}k`);
        } else if (targetFormat === 'ogg') {
          args.push('-c:a', 'libvorbis', '-b:a', `${audioKbps}k`);
        } else if (targetFormat === 'aac') {
          args.push('-c:a', 'aac', '-b:a', `${audioKbps}k`);
        } else if (targetFormat === 'wav') {
          args.push('-c:a', 'pcm_s16le');
        } else {
          args.push('-b:a', `${audioKbps}k`);
        }
      }

      args.push(outputName);

      await ffmpeg.exec(args);
      const data = await ffmpeg.readFile(outputName);
      
      let mimeType = !isTargetAudio ? `video/${targetFormat}` : `audio/${targetFormat}`;
      if (targetFormat === 'mkv') mimeType = 'video/x-matroska';
      if (targetFormat === 'avi') mimeType = 'video/x-msvideo';
      if (targetFormat === 'mp3') mimeType = 'audio/mpeg';
      if (targetFormat === 'wav') mimeType = 'audio/wav';
      if (targetFormat === 'aac') mimeType = 'audio/aac';
      if (targetFormat === 'ogg') mimeType = isVideo ? 'video/ogg' : 'audio/ogg';

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

