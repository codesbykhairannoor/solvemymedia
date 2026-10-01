import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Scissors, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Volume2, 
  VolumeX, 
  Film,
  CheckCircle2,
  Sparkles,
  Download,
  RefreshCw,
  Trash2,
  UploadCloud,
  FileEdit,
  Clock,
  Sliders,
  ChevronRight,
  Maximize2,
  Settings2
} from 'lucide-react';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { useLanguage } from '../hooks/useLanguage';
import { useWorkspace } from '../contexts/WorkspaceContext';
import { smartHighlight } from '../utils/textFormatting';
import {
  CutVideoFilmstripBenchmarkSection,
  CutVideoWorkflowRibbonSection,
  CutVideoAsymmetricBentoSection,
  CutVideoTechnicalSpecsSection,
  CutVideoFaqSection
} from '../components/content-sections/tools/CutVideoSections';

export const CutVideo: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  const { currentLang, t } = useLanguage();
  const { setHasActiveFile } = useWorkspace();

  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputSizeBytes, setOutputSizeBytes] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const resultVideoRef = useRef<HTMLVideoElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Playback & Timeline State
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoopingSelection, setIsLoopingSelection] = useState<boolean>(false);
  const [videoDimensions, setVideoDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Settings
  const [cutMode, setCutMode] = useState<'lossless' | 'accurate'>('lossless');
  const [muteAudio, setMuteAudio] = useState<boolean>(false);
  const [customFileName, setCustomFileName] = useState<string>('');

  // Dragging interaction state
  const [activeDrag, setActiveDrag] = useState<'start' | 'end' | 'range' | 'playhead' | null>(null);
  const dragStartRef = useRef<{ clientX: number; initialStart: number; initialEnd: number }>({ clientX: 0, initialStart: 0, initialEnd: 0 });

  // Sync workspace active file state
  useEffect(() => {
    const active = Boolean(file || outputUrl);
    setHasActiveFile(active);
    return () => setHasActiveFile(false);
  }, [file, outputUrl, setHasActiveFile]);

  // Handle file change
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setOutputUrl(null);
      setOutputSizeBytes(null);
      setStartTime(0);
      setEndTime(0);
      setDuration(0);
      setCurrentTime(0);
      setIsPlaying(false);
      setIsLoopingSelection(false);
      setCustomFileName(file.name.replace(/\.[^/.]+$/, ''));

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setVideoUrl(null);
      setOutputUrl(null);
      setOutputSizeBytes(null);
      setVideoDimensions(null);
    }
  }, [file]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const d = videoRef.current.duration || 0;
      setDuration(d);
      setStartTime(0);
      setEndTime(d);
      if (videoRef.current.videoWidth && videoRef.current.videoHeight) {
        setVideoDimensions({
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight
        });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      setCurrentTime(cur);

      if (isLoopingSelection) {
        if (cur >= endTime || cur < startTime) {
          videoRef.current.currentTime = startTime;
          setCurrentTime(startTime);
        }
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setIsLoopingSelection(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlaySelection = () => {
    if (!videoRef.current) return;
    if (isLoopingSelection) {
      videoRef.current.pause();
      setIsPlaying(false);
      setIsLoopingSelection(false);
    } else {
      videoRef.current.currentTime = startTime;
      setCurrentTime(startTime);
      setIsLoopingSelection(true);
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const seekTo = (time: number) => {
    if (videoRef.current) {
      const clamped = Math.max(0, Math.min(time, duration));
      videoRef.current.currentTime = clamped;
      setCurrentTime(clamped);
    }
  };

  const formatTimecode = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '00:00.0';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  const nudgeStart = (delta: number) => {
    const newVal = Math.max(0, Math.min(startTime + delta, endTime - 0.2));
    const formatted = parseFloat(newVal.toFixed(2));
    setStartTime(formatted);
    seekTo(formatted);
  };

  const nudgeEnd = (delta: number) => {
    const newVal = Math.max(startTime + 0.2, Math.min(endTime + delta, duration));
    const formatted = parseFloat(newVal.toFixed(2));
    setEndTime(formatted);
    seekTo(formatted);
  };

  const applyPreset = (type: '15s' | '30s' | '60s' | 'mid' | 'reset') => {
    if (!duration) return;
    if (type === '15s') {
      setStartTime(0);
      setEndTime(Math.min(15, duration));
      seekTo(0);
    } else if (type === '30s') {
      setStartTime(0);
      setEndTime(Math.min(30, duration));
      seekTo(0);
    } else if (type === '60s') {
      setStartTime(0);
      setEndTime(Math.min(60, duration));
      seekTo(0);
    } else if (type === 'mid') {
      const quarter = duration * 0.25;
      setStartTime(quarter);
      setEndTime(quarter * 3);
      seekTo(quarter);
    } else if (type === 'reset') {
      setStartTime(0);
      setEndTime(duration);
      seekTo(0);
    }
  };

  // Timeline Dragging Listeners
  const handlePointerDown = (type: 'start' | 'end' | 'range' | 'playhead', e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setActiveDrag(type);
    dragStartRef.current = {
      clientX: e.clientX,
      initialStart: startTime,
      initialEnd: endTime
    };
  };

  const handleTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!timelineTrackRef.current || !duration) return;
    const rect = timelineTrackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = Math.max(0, Math.min(1, clickX / rect.width));
    const clickTime = clickRatio * duration;

    // Check if clicked near start handle or end handle
    const startX = (startTime / duration) * rect.width;
    const endX = (endTime / duration) * rect.width;

    if (Math.abs(clickX - startX) <= 14) {
      handlePointerDown('start', e);
    } else if (Math.abs(clickX - endX) <= 14) {
      handlePointerDown('end', e);
    } else {
      seekTo(clickTime);
      handlePointerDown('playhead', e);
    }
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!activeDrag || !timelineTrackRef.current || !duration) return;
    const rect = timelineTrackRef.current.getBoundingClientRect();
    const deltaPixels = e.clientX - dragStartRef.current.clientX;
    const deltaSeconds = (deltaPixels / rect.width) * duration;

    if (activeDrag === 'start') {
      const newStart = Math.max(0, Math.min(dragStartRef.current.initialStart + deltaSeconds, endTime - 0.2));
      setStartTime(parseFloat(newStart.toFixed(2)));
      seekTo(newStart);
    } else if (activeDrag === 'end') {
      const newEnd = Math.max(startTime + 0.2, Math.min(dragStartRef.current.initialEnd + deltaSeconds, duration));
      setEndTime(parseFloat(newEnd.toFixed(2)));
      seekTo(newEnd);
    } else if (activeDrag === 'range') {
      const rangeLen = dragStartRef.current.initialEnd - dragStartRef.current.initialStart;
      let newStart = dragStartRef.current.initialStart + deltaSeconds;
      let newEnd = dragStartRef.current.initialEnd + deltaSeconds;

      if (newStart < 0) {
        newStart = 0;
        newEnd = rangeLen;
      }
      if (newEnd > duration) {
        newEnd = duration;
        newStart = duration - rangeLen;
      }

      setStartTime(parseFloat(newStart.toFixed(2)));
      setEndTime(parseFloat(newEnd.toFixed(2)));
      seekTo(newStart);
    } else if (activeDrag === 'playhead') {
      const clickX = e.clientX - rect.left;
      const clickRatio = Math.max(0, Math.min(1, clickX / rect.width));
      seekTo(clickRatio * duration);
    }
  }, [activeDrag, duration, startTime, endTime]);

  const handlePointerUp = useCallback(() => {
    setActiveDrag(null);
  }, []);

  useEffect(() => {
    if (activeDrag) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [activeDrag, handlePointerMove, handlePointerUp]);

  // Execute FFmpeg Slicing
  const handleProcess = async () => {
    if (!file) return;

    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setIsLoopingSelection(false);
    }

    const rawExt = file.name.split('.').pop()?.toLowerCase() || 'mp4';
    const baseName = (customFileName.trim() || file.name.replace(/\.[^/.]+$/, '')).trim();
    const effectiveExt = cutMode === 'lossless' ? rawExt : 'mp4';
    const outFileName = `cut_${baseName}.${effectiveExt}`;
    const mime = cutMode === 'lossless' ? (file.type || 'video/mp4') : 'video/mp4';

    let args: string[] = [];

    if (cutMode === 'lossless') {
      // 0.4s fast stream copy slice
      args = [
        '-ss', startTime.toFixed(3),
        '-to', endTime.toFixed(3),
        '-i', file.name,
        ...(muteAudio ? ['-an'] : ['-c:a', 'copy']),
        '-c:v', 'copy',
        '-avoid_negative_ts', 'make_zero',
        outFileName
      ];
    } else {
      // Frame accurate re-encode
      args = [
        '-ss', startTime.toFixed(3),
        '-to', endTime.toFixed(3),
        '-i', file.name,
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'fast',
        '-movflags', '+faststart',
        ...(muteAudio ? ['-an'] : ['-c:a', 'aac', '-b:a', '192k']),
        outFileName
      ];
    }

    try {
      const url = await runCustomFFmpeg([file], args, outFileName, mime);
      if (url) {
        setOutputUrl(url);
        // Estimate or fetch result size
        fetch(url)
          .then(res => res.blob())
          .then(blob => setOutputSizeBytes(blob.size))
          .catch(() => {});
        window.scrollTo({ top: 40, behavior: 'smooth' });
      }
    } catch (err) {
      console.warn('Lossless cut failed, falling back to frame-accurate re-encode:', err);
      const fallbackArgs = [
        '-ss', startTime.toFixed(3),
        '-to', endTime.toFixed(3),
        '-i', file.name,
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'fast',
        '-movflags', '+faststart',
        ...(muteAudio ? ['-an'] : ['-c:a', 'aac', '-b:a', '192k']),
        outFileName
      ];
      const url = await runCustomFFmpeg([file], fallbackArgs, outFileName, 'video/mp4');
      if (url) {
        setOutputUrl(url);
        fetch(url)
          .then(res => res.blob())
          .then(blob => setOutputSizeBytes(blob.size))
          .catch(() => {});
        window.scrollTo({ top: 40, behavior: 'smooth' });
      }
    }
  };

  const getPercent = (timeVal: number) => {
    if (!duration) return 0;
    return Math.min(100, Math.max(0, (timeVal / duration) * 100));
  };

  const selectedDuration = Math.max(0, endTime - startTime);
  const rawExt = file ? (file.name.split('.').pop() || 'mp4').toUpperCase() : 'MP4';
  const effectiveTargetExt = cutMode === 'lossless' ? rawExt.toLowerCase() : 'mp4';
  const downloadFileName = `${customFileName.trim() || 'cut_video'}.${effectiveTargetExt}`;

  return (
    <div style={{ width: '100%', minHeight: '80vh', padding: '24px 16px 80px' }}>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }}
        accept="video/*,.mp4,.webm,.mov,.mkv,.avi,.wmv,.flv,.3gp,.m4v,.ts,.ogv"
        style={{ display: 'none' }}
      />

      {/* 1. HERO (Shown when no file is uploaded) */}
      {!file && (
        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: 1200, margin: '0 auto 32px auto', width: '100%' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 900, 
            marginBottom: 20, 
            letterSpacing: '-0.03em', 
            lineHeight: 1.15, 
            fontFamily: 'Outfit, sans-serif'
          }}>
            {smartHighlight(pseoData ? pseoData.h1 : (t('toolCutVideoTitle') || t('toolCutVideo') || 'Cut Video Online Fast & Lossless'))}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
            {pseoData ? pseoData.description : (t('cutVideoDesc') || t('cwUploadDesc') || 'Trim and slice video clips directly in your browser with instant WebAssembly stream demuxing. 100% private, free, and zero server uploads.')}
          </p>
        </div>
      )}

      {/* 2. STANDARD WORKSPACE CONTAINER (Shown when no file is uploaded) */}
      {!file && (
        <div className="tool-workspace-container" style={{ margin: '0 auto' }}>
          <div className="tool-workspace-left glass-panel">
            <div 
              className="dropzone"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="dropzone-icon">
                <UploadCloud size={40} />
              </div>
              <p>{t('dragDrop') || 'Drag & drop file or'}{' '}<span className="browse-text">{t('browseFiles') || 'Browse Files'}</span></p>
            </div>
          </div>

          <div className="tool-workspace-right glass-panel">
            <div>
              <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Settings2 size={18} className="text-brand-primary" />
                <span>{t('cutSettings') || 'Trimming Settings'}</span>
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                {t('cutSettingsDesc') || 'Set in and out cut points with frame precision or lossless stream copy.'}
              </p>

              {/* Mode Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                <div style={{ padding: 12, borderRadius: 10, background: 'var(--bg-app)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--brand-primary)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Zap size={14} />
                    <span>{t('cutModeLossless') || 'Lossless Stream Cut'}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {t('cutModeLosslessDesc') || 'Cuts in 0.5s without re-encoding. 100% original quality preserved.'}
                  </div>
                </div>

                <div style={{ padding: 12, borderRadius: 10, background: 'var(--bg-app)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Scissors size={14} />
                    <span>{t('cutModeAccurate') || 'Frame-Accurate Cut'}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {t('cutModeAccurateDesc') || 'Re-encodes cleanly at the exact millisecond frame.'}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary"
              disabled
              style={{ marginTop: 'auto' }}
            >
              {t('cutAction') || t('toolCutVideo') || 'Cut Video Now'}
            </button>
          </div>
        </div>
      )}

      {/* 2. RESULT STAGE (Shown when cut is processed and outputUrl is ready) */}
      {file && outputUrl && (
        <div style={{ maxWidth: 960, margin: '0 auto', animation: 'fadeInDown 0.3s ease' }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 24,
            padding: '36px 28px',
            boxShadow: '0 16px 50px rgba(0,0,0,0.15)',
            textAlign: 'center'
          }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(6,182,212,0.2) 100%)',
              border: '2px solid var(--success-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 8px 30px rgba(16,185,129,0.3)'
            }}>
              <CheckCircle2 size={38} color="var(--success-color)" />
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.02em' }}>
              {t('cutSuccessTitle') || 'Video Trimmed Successfully!'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 24 }}>
              {(t('cutSuccessDesc') || 'Your trimmed clip is ready to download.')} ({formatTimecode(selectedDuration)})
            </p>

            {/* Result Video Player */}
            <div style={{
              maxWidth: 760,
              margin: '0 auto 24px auto',
              borderRadius: 16,
              overflow: 'hidden',
              background: '#07090e',
              border: '1px solid var(--border-color)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)'
            }}>
              <video
                ref={resultVideoRef}
                src={outputUrl}
                controls
                autoPlay
                playsInline
                style={{ width: '100%', maxHeight: 440, display: 'block', margin: '0 auto', objectFit: 'contain' }}
              />
            </div>

            {/* Stats row */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center', padding: '10px 20px', borderRadius: 12, background: 'var(--bg-app)', border: '1px solid var(--border-color)', marginBottom: 28 }}>
              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t('cutOriginalDuration') || 'Original'}: </span>
                <strong style={{ color: 'var(--text-main)' }}>{formatTimecode(duration)}</strong>
              </div>
              <span style={{ color: 'var(--border-color)' }}>•</span>
              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t('cutDuration') || 'Cut Duration'}: </span>
                <strong style={{ color: 'var(--brand-primary)' }}>{formatTimecode(selectedDuration)}</strong>
              </div>
              {outputSizeBytes && (
                <>
                  <span style={{ color: 'var(--border-color)' }}>•</span>
                  <div style={{ fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{t('actualSize') || 'Size'}: </span>
                    <strong style={{ color: 'var(--brand-secondary)' }}>{(outputSizeBytes / (1024 * 1024)).toFixed(2)} MB</strong>
                  </div>
                </>
              )}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={outputUrl}
                download={downloadFileName}
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '14px 36px',
                  borderRadius: 14,
                  fontSize: '1rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  boxShadow: '0 8px 30px rgba(168,85,247,0.4)'
                }}
              >
                <Download size={20} />
                <span>{(t('cwDownload') || 'Download')} {downloadFileName}</span>
              </a>

              <button
                type="button"
                onClick={() => setOutputUrl(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 24px',
                  borderRadius: 14,
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  background: 'var(--bg-app)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  cursor: 'pointer'
                }}
              >
                <Scissors size={18} />
                <span>{t('cutTrimAnother') || 'Trim Another Part'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setOutputUrl(null);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 24px',
                  borderRadius: 14,
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={17} />
                <span>{t('cutPickNew') || 'Pick New Video'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. PROFESSIONAL DIRECT TRIMMING SUITE (When file is loaded and ready to trim) */}
      {file && !outputUrl && videoUrl && (
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Top File Meta Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 14,
            padding: '12px 18px',
            flexWrap: 'wrap',
            gap: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(168,85,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Film size={18} color="var(--brand-primary)" />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 420 }}>
                  {file.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                  <span>•</span>
                  <span>{rawExt}</span>
                  {videoDimensions && (
                    <>
                      <span>•</span>
                      <span>{videoDimensions.width}×{videoDimensions.height}</span>
                    </>
                  )}
                  {duration > 0 && (
                    <>
                      <span>•</span>
                      <span>{formatTimecode(duration)}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 14px',
                  borderRadius: 8,
                  background: 'var(--bg-app)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={13} />
                <span>{t('cutReplaceVideo') || 'Replace Video'}</span>
              </button>

              <button
                type="button"
                onClick={() => setFile(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 12px',
                  borderRadius: 8,
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  color: 'var(--error-color)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          {/* MAIN STAGE: LARGE RESPONSIVE VIDEO CANVAS */}
          <div style={{
            position: 'relative',
            width: '100%',
            background: '#06070b',
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            boxShadow: '0 16px 45px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 340,
            maxHeight: 520
          }}>
            <video
              ref={videoRef}
              src={videoUrl}
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              muted={isMuted}
              playsInline
              style={{
                width: '100%',
                maxHeight: 520,
                display: 'block',
                margin: '0 auto',
                objectFit: 'contain',
                cursor: 'pointer'
              }}
            />

            {/* Central Play/Pause Overlay Button */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 68,
                  height: 68,
                  borderRadius: '50%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                  transition: 'all 0.2s ease',
                  zIndex: 5
                }}
              >
                <Play size={28} style={{ marginLeft: 4 }} />
              </button>
            )}

            {/* Floating Top-Left Time Indicator */}
            <div style={{
              position: 'absolute',
              top: 14,
              left: 14,
              background: 'rgba(10, 14, 23, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '5px 12px',
              borderRadius: 8,
              fontSize: '0.82rem',
              fontWeight: 800,
              fontFamily: 'monospace',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              zIndex: 5
            }}>
              <span style={{ color: 'var(--brand-primary)' }}>{formatTimecode(currentTime)}</span>
              <span style={{ opacity: 0.4 }}>/</span>
              <span>{formatTimecode(duration)}</span>
            </div>

            {/* Floating Top-Right Mute Toggle */}
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                background: 'rgba(10, 14, 23, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                width: 36,
                height: 36,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 5
              }}
            >
              {isMuted ? <VolumeX size={16} color="#ef4444" /> : <Volume2 size={16} />}
            </button>

            {/* Looping selection notification banner */}
            {isLoopingSelection && (
              <div style={{
                position: 'absolute',
                bottom: 14,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(90deg, rgba(168,85,247,0.95), rgba(6,182,212,0.95))',
                color: '#ffffff',
                padding: '6px 16px',
                borderRadius: 20,
                fontSize: '0.8rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                zIndex: 5
              }}>
                <Sparkles size={14} />
                <span>{currentLang === 'id' ? 'Sedang Memutar Hasil Potongan (Loop)' : 'Looping Trimmed Preview'}</span>
              </div>
            )}
          </div>

          {/* INTERACTIVE TIMELINE SCRUBBER SUITE */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 20,
            padding: '24px 20px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
            
            {/* Timeline Header: Stats & Presets */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)', borderRadius: 8, fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{t('cutStartTime') || 'Start'}:</span>
                  <strong style={{ color: 'var(--brand-primary)', fontFamily: 'monospace' }}>{formatTimecode(startTime)}</strong>
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', background: 'var(--brand-gradient)', color: '#ffffff', borderRadius: 20, fontSize: '0.88rem', fontWeight: 800, boxShadow: '0 4px 15px rgba(168,85,247,0.25)' }}>
                  <Scissors size={14} />
                  <span>{t('cutDuration') || 'Cut Duration'}: {formatTimecode(selectedDuration)}</span>
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 8, fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{t('cutEndTime') || 'End'}:</span>
                  <strong style={{ color: 'var(--brand-secondary)', fontFamily: 'monospace' }}>{formatTimecode(endTime)}</strong>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Preset:
                </span>
                <button type="button" onClick={() => applyPreset('15s')} style={{ padding: '4px 10px', fontSize: '0.76rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer', fontWeight: 600 }}>15s</button>
                <button type="button" onClick={() => applyPreset('30s')} style={{ padding: '4px 10px', fontSize: '0.76rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer', fontWeight: 600 }}>30s</button>
                <button type="button" onClick={() => applyPreset('60s')} style={{ padding: '4px 10px', fontSize: '0.76rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer', fontWeight: 600 }}>60s</button>
                <button type="button" onClick={() => applyPreset('reset')} style={{ padding: '4px 10px', fontSize: '0.76rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', cursor: 'pointer' }}>{t('cutReset') || 'Full'}</button>
              </div>
            </div>

            {/* THE DUAL-HANDLE FILMSTRIP TIMELINE TRACK */}
            <div style={{ position: 'relative', width: '100%', userSelect: 'none', touchAction: 'none' }}>
              
              {/* Ruler Tick Marks */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px 6px', fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                <span>00:00</span>
                <span>{formatTimecode(duration * 0.25)}</span>
                <span>{formatTimecode(duration * 0.5)}</span>
                <span>{formatTimecode(duration * 0.75)}</span>
                <span>{formatTimecode(duration)}</span>
              </div>

              {/* Filmstrip Timeline Track */}
              <div
                ref={timelineTrackRef}
                onPointerDown={handleTrackPointerDown}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 60,
                  background: 'var(--bg-input)',
                  borderRadius: 12,
                  border: '1.5px solid var(--border-color)',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
              >
                {/* Simulated Filmstrip Grid Sprockets */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 38px, rgba(255,255,255,0.03) 38px, rgba(255,255,255,0.03) 40px)',
                  pointerEvents: 'none'
                }} />

                {/* Left Cut Zone (Dimmed / Excluded) */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: `${getPercent(startTime)}%`,
                  background: 'rgba(5, 7, 12, 0.75)',
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0,0,0,0.2) 8px, rgba(0,0,0,0.2) 16px)',
                  pointerEvents: 'none',
                  zIndex: 2
                }} />

                {/* Active Highlight Selection Range */}
                <div
                  onPointerDown={(e) => handlePointerDown('range', e)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${getPercent(startTime)}%`,
                    width: `${Math.max(0, getPercent(endTime) - getPercent(startTime))}%`,
                    background: 'linear-gradient(90deg, rgba(168,85,247,0.25) 0%, rgba(6,182,212,0.25) 100%)',
                    borderTop: '2px solid var(--brand-primary)',
                    borderBottom: '2px solid var(--brand-secondary)',
                    cursor: activeDrag === 'range' ? 'grabbing' : 'grab',
                    zIndex: 3,
                    boxShadow: '0 0 20px rgba(168,85,247,0.25)'
                  }}
                  title={currentLang === 'id' ? 'Tarik untuk menggeser rentang potongan' : 'Drag to slide trim range'}
                />

                {/* Right Cut Zone (Dimmed / Excluded) */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${getPercent(endTime)}%`,
                  right: 0,
                  background: 'rgba(5, 7, 12, 0.75)',
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0,0,0,0.2) 8px, rgba(0,0,0,0.2) 16px)',
                  pointerEvents: 'none',
                  zIndex: 2
                }} />

                {/* Left In-Point Handle */}
                <div
                  onPointerDown={(e) => handlePointerDown('start', e)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `calc(${getPercent(startTime)}% - 8px)`,
                    width: 16,
                    background: 'var(--brand-primary)',
                    border: '2px solid #ffffff',
                    borderRadius: 6,
                    cursor: 'ew-resize',
                    zIndex: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 14px rgba(168,85,247,0.8)'
                  }}
                  title="In-Point (Start)"
                >
                  <div style={{ width: 2, height: 18, background: '#ffffff', borderRadius: 1 }} />
                </div>

                {/* Right Out-Point Handle */}
                <div
                  onPointerDown={(e) => handlePointerDown('end', e)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `calc(${getPercent(endTime)}% - 8px)`,
                    width: 16,
                    background: 'var(--brand-secondary)',
                    border: '2px solid #ffffff',
                    borderRadius: 6,
                    cursor: 'ew-resize',
                    zIndex: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 14px rgba(6,182,212,0.8)'
                  }}
                  title="Out-Point (End)"
                >
                  <div style={{ width: 2, height: 18, background: '#ffffff', borderRadius: 1 }} />
                </div>

                {/* Current Playhead Needle */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${getPercent(currentTime)}%`,
                  width: 2,
                  background: '#ffffff',
                  boxShadow: '0 0 8px #ffffff',
                  pointerEvents: 'none',
                  zIndex: 5
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: -4,
                    width: 10,
                    height: 10,
                    background: '#ffffff',
                    transform: 'rotate(45deg)'
                  }} />
                </div>
              </div>
            </div>

            {/* PRECISION CONTROLS & STEPPERS TOOLBAR */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, paddingTop: 6 }}>
              
              {/* Playback Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={togglePlay}
                  className="btn-primary"
                  style={{
                    padding: '9px 18px',
                    borderRadius: 10,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: '0.88rem',
                    fontWeight: 800
                  }}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  <span>{isPlaying ? (currentLang === 'id' ? 'Jeda' : 'Pause') : (currentLang === 'id' ? 'Putar' : 'Play')}</span>
                </button>

                {/* PLAY SELECTION (MOST REQUESTED FEATURE) */}
                <button
                  type="button"
                  onClick={togglePlaySelection}
                  style={{
                    padding: '9px 18px',
                    borderRadius: 10,
                    background: isLoopingSelection ? 'var(--brand-gradient)' : 'rgba(168,85,247,0.1)',
                    border: `1.5px solid ${isLoopingSelection ? 'transparent' : 'var(--brand-primary)'}`,
                    color: isLoopingSelection ? '#ffffff' : 'var(--brand-primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isLoopingSelection ? '0 0 20px rgba(168,85,247,0.4)' : 'none'
                  }}
                >
                  <Sparkles size={16} />
                  <span>{currentLang === 'id' ? 'Putar Hasil Potongan' : 'Preview Cut Selection'}</span>
                </button>

                {/* Jump to Start / End */}
                <button
                  type="button"
                  onClick={() => seekTo(startTime)}
                  style={{ padding: '8px 12px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', cursor: 'pointer' }}
                  title="Jump to Start"
                >
                  [ {currentLang === 'id' ? 'Ke Awal' : 'To Start'}
                </button>
                <button
                  type="button"
                  onClick={() => seekTo(endTime)}
                  style={{ padding: '8px 12px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', cursor: 'pointer' }}
                  title="Jump to End"
                >
                  {currentLang === 'id' ? 'Ke Akhir' : 'To End'} ]
                </button>
              </div>

              {/* Set In/Out to current playhead */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => {
                    const cur = videoRef.current ? videoRef.current.currentTime : currentTime;
                    setStartTime(Math.min(cur, endTime - 0.2));
                  }}
                  style={{ padding: '8px 12px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', cursor: 'pointer' }}
                >
                  [ {currentLang === 'id' ? 'Set Titik Awal' : 'Set In-Point'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const cur = videoRef.current ? videoRef.current.currentTime : currentTime;
                    setEndTime(Math.max(cur, startTime + 0.2));
                  }}
                  style={{ padding: '8px 12px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', cursor: 'pointer' }}
                >
                  {currentLang === 'id' ? 'Set Titik Akhir' : 'Set Out-Point'} ]
                </button>
              </div>

              {/* Frame-by-frame nudge steppers */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {currentLang === 'id' ? 'Awal' : 'Start'}:
                  </span>
                  <button type="button" onClick={() => nudgeStart(-1.0)} style={{ padding: '4px 7px', fontSize: '0.74rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>-1s</button>
                  <button type="button" onClick={() => nudgeStart(-0.1)} style={{ padding: '4px 7px', fontSize: '0.74rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>-0.1s</button>
                  <button type="button" onClick={() => nudgeStart(0.1)} style={{ padding: '4px 7px', fontSize: '0.74rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>+0.1s</button>
                  <button type="button" onClick={() => nudgeStart(1.0)} style={{ padding: '4px 7px', fontSize: '0.74rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>+1s</button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {currentLang === 'id' ? 'Akhir' : 'End'}:
                  </span>
                  <button type="button" onClick={() => nudgeEnd(-1.0)} style={{ padding: '4px 7px', fontSize: '0.74rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>-1s</button>
                  <button type="button" onClick={() => nudgeEnd(-0.1)} style={{ padding: '4px 7px', fontSize: '0.74rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>-0.1s</button>
                  <button type="button" onClick={() => nudgeEnd(0.1)} style={{ padding: '4px 7px', fontSize: '0.74rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>+0.1s</button>
                  <button type="button" onClick={() => nudgeEnd(1.0)} style={{ padding: '4px 7px', fontSize: '0.74rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>+1s</button>
                </div>
              </div>
            </div>
          </div>

          {/* EXPORT OPTIONS & SLICING ACTION PANEL */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 20,
            padding: '24px 28px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {/* Mode Option 1: Lossless Stream Cut */}
              <label 
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: 12, 
                  padding: 16, 
                  borderRadius: 14, 
                  background: cutMode === 'lossless' ? 'rgba(168,85,247,0.08)' : 'var(--bg-app)',
                  border: `1.5px solid ${cutMode === 'lossless' ? 'var(--brand-primary)' : 'var(--border-color)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <input 
                  type="radio" 
                  name="cutMode" 
                  checked={cutMode === 'lossless'} 
                  onChange={() => setCutMode('lossless')}
                  style={{ marginTop: 4 }}
                />
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Zap size={15} color="var(--brand-primary)" />
                    <span>{t('cutModeLossless') || 'Lossless Stream Copy'}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {t('cutModeLosslessDesc') || 'Cuts in 0.4s without re-encoding. 100% original quality preserved.'}
                  </div>
                </div>
              </label>

              {/* Mode Option 2: Frame-Accurate Re-encode */}
              <label 
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: 12, 
                  padding: 16, 
                  borderRadius: 14, 
                  background: cutMode === 'accurate' ? 'rgba(6,182,212,0.08)' : 'var(--bg-app)',
                  border: `1.5px solid ${cutMode === 'accurate' ? 'var(--brand-secondary)' : 'var(--border-color)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <input 
                  type="radio" 
                  name="cutMode" 
                  checked={cutMode === 'accurate'} 
                  onChange={() => setCutMode('accurate')}
                  style={{ marginTop: 4 }}
                />
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Sliders size={15} color="var(--brand-secondary)" />
                    <span>{t('cutModeAccurate') || 'Frame-Accurate Cut'}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {t('cutModeAccurateDesc') || 'Re-encodes video precisely at the exact millisecond frame specified.'}
                  </div>
                </div>
              </label>
            </div>

            {/* Bottom Row: Filename, Mute toggle, Process Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', flex: 1, minWidth: 280 }}>
                {/* File rename input */}
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 10, overflow: 'hidden', flex: 1, maxWidth: 360 }}>
                  <input
                    type="text"
                    value={customFileName}
                    onChange={(e) => setCustomFileName(e.target.value)}
                    placeholder="Nama file..."
                    disabled={processing}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      padding: '10px 14px',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                  <span style={{ padding: '0 12px', fontSize: '0.82rem', fontWeight: 800, color: 'var(--brand-secondary)', background: 'rgba(var(--brand-secondary-rgb), 0.1)', height: 38, display: 'flex', alignItems: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    .{effectiveTargetExt}
                  </span>
                </div>

                {/* Mute toggle */}
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  <input
                    type="checkbox"
                    checked={muteAudio}
                    onChange={(e) => setMuteAudio(e.target.checked)}
                  />
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {muteAudio ? <VolumeX size={15} color="#ef4444" /> : <Volume2 size={15} color="var(--brand-primary)" />}
                    {t('cutMuteAudio') || 'Mute audio in clipped video'}
                  </span>
                </label>
              </div>

              {/* Big Process Button */}
              <button
                type="button"
                onClick={handleProcess}
                disabled={processing}
                className="btn-primary"
                style={{
                  padding: '14px 38px',
                  borderRadius: 14,
                  fontSize: '1rem',
                  fontWeight: 900,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  boxShadow: '0 8px 30px rgba(168,85,247,0.35)',
                  cursor: processing ? 'not-allowed' : 'pointer',
                  opacity: processing ? 0.7 : 1
                }}
              >
                <Scissors size={20} />
                <span>
                  {processing 
                    ? (t('cutCutting') || 'Cutting Video...') 
                    : (t('cutAction') || 'Cut Video Now')}
                </span>
              </button>
            </div>

            {/* Processing Progress Bar */}
            {processing && (
              <div style={{ marginTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>
                    {t('cutProcessingWasm') || 'Processing with FFmpeg WASM...'} {progress}%
                  </span>
                  <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>
                    {cutMode === 'lossless' ? '⚡ Stream Demux Copy' : '🎯 Frame Re-encode'}
                  </span>
                </div>
                <div className="progress-container" style={{ height: 8, borderRadius: 4 }}>
                  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. SEO CONTENT SECTIONS (Rendered when no file is uploaded) */}
      {!file && !pseoData && (
        <div 
          className="seo-sections-wrapper cut-video-sections-container" 
          style={{ display: 'flex', flexDirection: 'column', gap: '30px', paddingBottom: '80px', paddingTop: '40px' }}
        >
          <CutVideoFilmstripBenchmarkSection />
          <CutVideoWorkflowRibbonSection />
          <CutVideoAsymmetricBentoSection />
          <CutVideoTechnicalSpecsSection />
          <CutVideoFaqSection />
        </div>
      )}

      <style>{`
        .cut-dropzone-hero:hover {
          border-color: var(--brand-primary) !important;
          background: var(--bg-card-hover) !important;
          transform: translateY(-2px);
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CutVideo;
