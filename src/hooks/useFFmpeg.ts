import { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export const useFFmpeg = () => {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const ffmpegRef = useRef(new FFmpeg());

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const ffmpeg = ffmpegRef.current;
    
    ffmpeg.on('log', ({ message }) => {
      setLogs((prev) => [...prev, message]);
    });

    ffmpeg.on('progress', ({ progress, time }) => {
      setProgress(Math.round(progress * 100));
    });

    try {
      // We are now using the ESM builds of FFmpeg core and worker.
      // This creates a standard Module Worker which uses dynamic import() instead of importScripts(),
      // which is 100% compliant with modern browser security policies (especially Firefox).
      await ffmpeg.load({
        coreURL: window.location.origin + '/ffmpeg/ffmpeg-core.js',
        wasmURL: window.location.origin + '/ffmpeg/ffmpeg-core.wasm',
        classWorkerURL: window.location.origin + '/ffmpeg/worker.js',
      });
      setReady(true);
    } catch (e) {
      console.error("FFmpeg completely failed to load locally:", e);
    }
  };

  const compressMedia = async (file: File, quality: number, targetFormat: string) => {
    if (!ready) return null;
    setProcessing(true);
    setProgress(0);
    setLogs([]);
    
    const ffmpeg = ffmpegRef.current;
    const isVideo = file.type.startsWith('video');
    const inputExt = file.name.split('.').pop() || (isVideo ? 'mp4' : 'mp3');
    const inputName = `input.${inputExt}`;
    const outputName = `output.${targetFormat}`;
    
    // Write the file to memory 
    await ffmpeg.writeFile(inputName, await fetchFile(file));
    
    // Determine compression arguments based on quality and targetFormat
    let args: string[] = ['-i', inputName];
    
    const isTargetAudio = ['mp3', 'wav', 'aac', 'ogg'].includes(targetFormat);

    if (!isTargetAudio) {
      if (targetFormat === 'mp4' || targetFormat === 'mkv') {
        args.push('-c:v', 'libx264');
      } else if (targetFormat === 'webm') {
        args.push('-c:v', 'libvpx-vp9');
      } else if (targetFormat === 'avi') {
        args.push('-c:v', 'mpeg4');
      }

      const crf = Math.round(35 - ((quality / 100) * 17));
      let preset = 'medium';
      if (quality < 33) preset = 'veryfast';
      else if (quality < 66) preset = 'faster';
      else preset = 'fast';

      const scaleMultiplier = (0.3 + (0.7 * (quality / 100))).toFixed(2);
      
      args.push('-crf', crf.toString(), '-preset', preset, '-vf', `scale=trunc(iw*${scaleMultiplier}/2)*2:-2`);
    } else {
      // Audio conversion (from Audio OR Video)
      if (isVideo) {
        args.push('-vn'); // Strip video stream if extracting audio from video
      }
      
      if (targetFormat === 'mp3') {
        args.push('-c:a', 'libmp3lame');
      } else if (targetFormat === 'ogg') {
        args.push('-c:a', 'libvorbis');
      } else if (targetFormat === 'aac') {
        args.push('-c:a', 'aac');
      }
      
      const audioKbps = Math.round(32 + ((quality / 100) * 160));
      args.push('-b:a', `${audioKbps}k`);
    }

    args.push(outputName);

    try {
      await ffmpeg.exec(args);
      const data = await ffmpeg.readFile(outputName);
      let mimeType = !isTargetAudio ? `video/${targetFormat}` : `audio/${targetFormat}`;
      if (targetFormat === 'mkv') mimeType = 'video/x-matroska';
      if (targetFormat === 'mp3') mimeType = 'audio/mpeg';

      const blob = new Blob([data as any], { type: mimeType });
      setProcessing(false);
      return URL.createObjectURL(blob);
    } catch (e) {
      console.error(e);
      setProcessing(false);
      return null;
    }
  };

  const trimMedia = async (fileUrl: string, startSec: number, endSec: number) => {
    if (!ready) return null;
    setProcessing(true);
    setProgress(0);
    setLogs([]);
    
    const ffmpeg = ffmpegRef.current;
    const inputName = `input_trim.webm`;
    const outputName = `output_trim.webm`;
    
    try {
      // Fetch the blob from the object URL
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const fileData = new Uint8Array(await blob.arrayBuffer());
      
      await ffmpeg.writeFile(inputName, fileData);
      
      // Fast stream copy (no re-encoding)
      // FFmpeg args: -ss {start} -to {end} -i input.webm -c copy output.webm
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
      console.error(e);
      setProcessing(false);
      return null;
    }
  };

  const fixWebmMetadata = async (fileUrl: string) => {
    if (!ready) return null;
    setProcessing(true);
    setProgress(0);
    setLogs([]);
    
    const ffmpeg = ffmpegRef.current;
    const inputName = `input_fix.webm`;
    const outputName = `output_fix.webm`;
    
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
    }
  };

  const runCustomFFmpeg = async (files: File[], args: string[], outputName: string, mimeType: string) => {
    if (!ready) return null;
    setProcessing(true);
    setProgress(0);
    setLogs([]);
    
    const ffmpeg = ffmpegRef.current;
    
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
      console.error(e);
      setProcessing(false);
      return null;
    }
  };

  return { ready, processing, progress, logs, compressMedia, trimMedia, fixWebmMetadata, runCustomFFmpeg };
};
