import React, { useState, useRef, useEffect } from 'react';
import { 
  Scissors, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Sliders, 
  Clock, 
  Volume2, 
  VolumeX, 
  Film,
  CheckCircle2,
  Sparkles,
  Settings2
} from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { useLanguage } from '../hooks/useLanguage';
import {
  CutVideoFilmstripBenchmarkSection,
  CutVideoWorkflowRibbonSection,
  CutVideoAsymmetricBentoSection,
  CutVideoTechnicalSpecsSection,
  CutVideoFaqSection
} from '../components/content-sections/tools/CutVideoSections';

export const CutVideo: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  const { t } = useLanguage();

  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Timeline state
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPreviewingSelection, setIsPreviewingSelection] = useState<boolean>(false);

  // Settings
  const [cutMode, setCutMode] = useState<'lossless' | 'accurate'>('lossless');
  const [muteAudio, setMuteAudio] = useState<boolean>(false);

  // Create object URL when file changes
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setOutputUrl(null);
      setStartTime(0);
      setEndTime(0);
      setDuration(0);
      setCurrentTime(0);
      setIsPlaying(false);
      setIsPreviewingSelection(false);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setVideoUrl(null);
      setOutputUrl(null);
    }
  }, [file]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const d = videoRef.current.duration || 0;
      setDuration(d);
      setStartTime(0);
      setEndTime(d);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      setCurrentTime(cur);

      // If we are previewing selection, stop when reaching endTime
      if (isPreviewingSelection && cur >= endTime) {
        videoRef.current.pause();
        videoRef.current.currentTime = startTime;
        setIsPlaying(false);
        setIsPreviewingSelection(false);
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setIsPreviewingSelection(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const playSelection = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = startTime;
    setIsPreviewingSelection(true);
    videoRef.current.play();
    setIsPlaying(true);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    const ms = Math.floor((secs % 1) * 10);
    return `${String(mins).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}.${ms}`;
  };

  const nudgeStart = (delta: number) => {
    const newVal = Math.max(0, Math.min(startTime + delta, endTime - 0.2));
    setStartTime(parseFloat(newVal.toFixed(2)));
    if (videoRef.current) videoRef.current.currentTime = newVal;
  };

  const nudgeEnd = (delta: number) => {
    const newVal = Math.max(startTime + 0.2, Math.min(endTime + delta, duration));
    setEndTime(parseFloat(newVal.toFixed(2)));
    if (videoRef.current) videoRef.current.currentTime = newVal;
  };

  const applyPreset = (type: '15s' | '30s' | '60s' | 'mid' | 'reset') => {
    if (!duration) return;
    if (type === '15s') {
      setStartTime(0);
      setEndTime(Math.min(15, duration));
    } else if (type === '30s') {
      setStartTime(0);
      setEndTime(Math.min(30, duration));
    } else if (type === '60s') {
      setStartTime(0);
      setEndTime(Math.min(60, duration));
    } else if (type === 'mid') {
      const quarter = duration * 0.25;
      setStartTime(quarter);
      setEndTime(quarter * 3);
    } else if (type === 'reset') {
      setStartTime(0);
      setEndTime(duration);
    }
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  const handleProcess = async () => {
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase() || 'mp4';
    const base = file.name.replace(/\.[^/.]+$/, '');
    const outFileName = `cut_${base}.${cutMode === 'lossless' ? ext : 'mp4'}`;
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
      }
    } catch (err) {
      console.warn('Lossless cut fell back to re-encoding:', err);
      // Fallback to safe re-encode if stream copy container failed
      const fallbackArgs = [
        '-ss', startTime.toFixed(3),
        '-to', endTime.toFixed(3),
        '-i', file.name,
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'fast',
        outFileName
      ];
      const url = await runCustomFFmpeg([file], fallbackArgs, outFileName, 'video/mp4');
      if (url) setOutputUrl(url);
    }
  };

  const getPercent = (val: number) => {
    if (!duration) return 0;
    return Math.min(100, Math.max(0, (val / duration) * 100));
  };

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Title & Mode */}
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Scissors size={18} className="text-brand-primary" />
          <span>{t('toolCutVideo') || 'Cut & Trim Video'}</span>
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
          {t('cutVideoDesc') || 'Trim, slice, and cut video clips online without quality loss. 100% private in-browser WebAssembly processing.'}
        </p>
      </div>

      {/* Slicing Engine Toggle */}
      <div style={{ background: 'var(--bg-card)', padding: 14, borderRadius: 14, border: '1px solid var(--border-color)' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', display: 'block', marginBottom: 10 }}>
          ⚡ {t('cutSec3Badge') || 'Cutting Engine'}:
        </label>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label 
            style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: 10, 
              padding: 10, 
              borderRadius: 10, 
              background: cutMode === 'lossless' ? 'rgba(var(--brand-primary-rgb, 99, 102, 241), 0.1)' : 'transparent',
              border: cutMode === 'lossless' ? '1px solid var(--brand-primary)' : '1px solid transparent',
              cursor: 'pointer' 
            }}
          >
            <input 
              type="radio" 
              name="cutMode" 
              checked={cutMode === 'lossless'} 
              onChange={() => setCutMode('lossless')}
              style={{ marginTop: 3 }}
            />
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('cutModeLossless') || 'Lossless Stream Cut (0.4s)'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {t('cutModeLosslessDesc') || 'Cuts in 0.5s without re-encoding. 100% original quality preserved.'}
              </div>
            </div>
          </label>

          <label 
            style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: 10, 
              padding: 10, 
              borderRadius: 10, 
              background: cutMode === 'accurate' ? 'rgba(var(--brand-primary-rgb, 99, 102, 241), 0.1)' : 'transparent',
              border: cutMode === 'accurate' ? '1px solid var(--brand-primary)' : '1px solid transparent',
              cursor: 'pointer' 
            }}
          >
            <input 
              type="radio" 
              name="cutMode" 
              checked={cutMode === 'accurate'} 
              onChange={() => setCutMode('accurate')}
              style={{ marginTop: 3 }}
            />
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('cutModeAccurate') || 'Frame-Accurate Cut'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {t('cutModeAccurateDesc') || 'Re-encodes cleanly at the exact millisecond frame.'}
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Audio strip checkbox */}
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', background: 'var(--bg-card)', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--border-color)' }}>
        <input 
          type="checkbox" 
          checked={muteAudio} 
          onChange={(e) => setMuteAudio(e.target.checked)} 
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {muteAudio ? <VolumeX size={16} color="#ef4444" /> : <Volume2 size={16} color="var(--brand-primary)" />}
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Mute audio in clipped video
          </span>
        </div>
      </label>

      {/* Fast Badge */}
      <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: 14, borderRadius: 12, border: '1px solid rgba(16, 185, 129, 0.25)', color: 'var(--success-color)', fontSize: '0.85rem' }}>
        <strong style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <Zap size={15} /> {t('cutSpeedBadge') || 'Instant 0.4s Cut'}
        </strong>
        100% in-browser WebAssembly stream copy execution.
      </div>
    </div>
  );

  return (
    <>
      <CenteredActionWorkspace
        accept="video/*,.mp4,.webm,.mov,.mkv,.avi,.wmv,.flv,.3gp,.m4v,.ts,.ogv"
        title={pseoData ? pseoData.h1 : (t('toolCutVideo') || 'Cut Video Online')}
        description={pseoData ? pseoData.description : (t('cutVideoDesc') || 'Trim, slice, and cut video clips online without quality loss. 100% private in-browser WebAssembly processing.')}
        toolId="cut-video"
        file={file}
        onFileSelect={(f) => { setFile(f); setOutputUrl(null); }}
        outputUrl={outputUrl}
        onResetResult={() => setOutputUrl(null)}
        processing={processing}
        progress={progress}
        engine="tier3"
        onProcess={handleProcess}
        processActionText={t('cutAction') || 'Cut Video Now'}
        sidebarContent={sidebarContent}
        targetFormat={cutMode === 'lossless' ? (file?.name.split('.').pop() || 'mp4') : 'mp4'}
        videoOverlay={file && videoUrl ? () => (
          <div 
            style={{ 
              marginTop: 16, 
              width: '100%', 
              background: 'var(--bg-card)', 
              borderRadius: 20, 
              padding: 20, 
              border: '1px solid var(--border-color)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)' 
            }}
          >
            {/* Embedded video player for scrubber */}
            <div style={{ position: 'relative', width: '100%', maxHeight: 380, background: '#000000', borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
              <video 
                ref={videoRef}
                src={videoUrl}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                playsInline
                style={{ width: '100%', maxHeight: 380, display: 'block', margin: '0 auto', objectFit: 'contain' }}
              />

              {/* Central Play/Pause Watermark Button */}
              <button
                type="button"
                onClick={togglePlay}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                }}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: 3 }} />}
              </button>
            </div>

            {/* Time Stats Indicator Strip */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t('cutStartTime') || 'Start'}:</span>
                <strong style={{ color: 'var(--brand-primary)', fontFamily: 'monospace' }}>{formatTime(startTime)}</strong>
              </div>

              <div style={{ padding: '4px 12px', background: 'rgba(var(--brand-primary-rgb, 99, 102, 241), 0.1)', borderRadius: 100, border: '1px solid var(--border-color)', fontSize: '0.82rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
                {t('cutDuration') || 'Selected'}: {formatTime(Math.max(0, endTime - startTime))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t('cutEndTime') || 'End'}:</span>
                <strong style={{ color: 'var(--brand-secondary)', fontFamily: 'monospace' }}>{formatTime(endTime)}</strong>
              </div>
            </div>

            {/* Dual Timeline Scrubber Bar */}
            <div style={{ position: 'relative', height: 44, display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              {/* Background Track */}
              <div style={{ position: 'absolute', width: '100%', height: 10, background: 'var(--bg-app)', borderRadius: 6, border: '1px solid var(--border-color)', zIndex: 1 }} />
              
              {/* Highlight Active Segment */}
              <div 
                style={{ 
                  position: 'absolute', 
                  height: 10, 
                  background: 'linear-gradient(90deg, var(--brand-primary), var(--brand-secondary))', 
                  borderRadius: 6, 
                  zIndex: 2,
                  left: `${getPercent(startTime)}%`,
                  width: `${Math.max(0, getPercent(endTime) - getPercent(startTime))}%`,
                  boxShadow: '0 0 12px rgba(var(--brand-primary-rgb, 99, 102, 241), 0.4)'
                }} 
              />

              {/* Current Playhead */}
              <div 
                style={{ 
                  position: 'absolute', 
                  width: 3, 
                  height: 24, 
                  background: '#ffffff', 
                  left: `${getPercent(currentTime)}%`, 
                  zIndex: 6, 
                  pointerEvents: 'none',
                  boxShadow: '0 0 8px rgba(0,0,0,0.8)' 
                }} 
              />

              {/* Start Handle Input */}
              <input 
                type="range" 
                min={0} 
                max={duration || 100} 
                step={0.05} 
                value={startTime}
                onChange={(e) => {
                  const val = Math.min(parseFloat(e.target.value), endTime - 0.2);
                  setStartTime(val);
                  if (videoRef.current) videoRef.current.currentTime = val;
                }}
                style={{ 
                  position: 'absolute', width: '100%', zIndex: 3, opacity: 0, cursor: 'pointer'
                }}
              />
              <div 
                style={{
                  position: 'absolute', 
                  width: 22, 
                  height: 22, 
                  background: 'var(--brand-primary)', 
                  borderRadius: '50%',
                  left: `calc(${getPercent(startTime)}% - 11px)`, 
                  zIndex: 4, 
                  pointerEvents: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)', 
                  border: '3px solid #ffffff'
                }}
              />

              {/* End Handle Input */}
              <input 
                type="range" 
                min={0} 
                max={duration || 100} 
                step={0.05} 
                value={endTime}
                onChange={(e) => {
                  const val = Math.max(parseFloat(e.target.value), startTime + 0.2);
                  setEndTime(val);
                  if (videoRef.current) videoRef.current.currentTime = val;
                }}
                style={{ 
                  position: 'absolute', width: '100%', zIndex: 5, opacity: 0, cursor: 'pointer'
                }}
              />
              <div 
                style={{
                  position: 'absolute', 
                  width: 22, 
                  height: 22, 
                  background: 'var(--brand-secondary)', 
                  borderRadius: '50%',
                  left: `calc(${getPercent(endTime)}% - 11px)`, 
                  zIndex: 4, 
                  pointerEvents: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)', 
                  border: '3px solid #ffffff'
                }}
              />
            </div>

            {/* Quick Action Buttons Row */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              {/* Play Selection Button */}
              <button
                type="button"
                onClick={playSelection}
                className="btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', fontSize: '0.85rem', borderRadius: 10 }}
              >
                <Play size={14} />
                <span>{t('cutPlaySelection') || 'Preview Selection'}</span>
              </button>

              {/* Set In/Out Points to Current Video Time */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => {
                    if (videoRef.current) {
                      const cur = videoRef.current.currentTime;
                      setStartTime(Math.min(cur, endTime - 0.2));
                    }
                  }}
                  style={{ padding: '8px 12px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', cursor: 'pointer' }}
                >
                  [ {t('cutSetStart') || 'Set In-Point'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (videoRef.current) {
                      const cur = videoRef.current.currentTime;
                      setEndTime(Math.max(cur, startTime + 0.2));
                    }
                  }}
                  style={{ padding: '8px 12px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', cursor: 'pointer' }}
                >
                  {t('cutSetEnd') || 'Set Out-Point'} ]
                </button>
              </div>
            </div>

            {/* Micro-Nudge & Preset Strip */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 14, borderTop: '1px solid var(--border-color)' }}>
              {/* Nudge controls */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Start:</span>
                  <button type="button" onClick={() => nudgeStart(-1.0)} style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>-1s</button>
                  <button type="button" onClick={() => nudgeStart(-0.1)} style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>-0.1s</button>
                  <button type="button" onClick={() => nudgeStart(0.1)} style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>+0.1s</button>
                  <button type="button" onClick={() => nudgeStart(1.0)} style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>+1s</button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>End:</span>
                  <button type="button" onClick={() => nudgeEnd(-1.0)} style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>-1s</button>
                  <button type="button" onClick={() => nudgeEnd(-0.1)} style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>-0.1s</button>
                  <button type="button" onClick={() => nudgeEnd(0.1)} style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>+0.1s</button>
                  <button type="button" onClick={() => nudgeEnd(1.0)} style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer' }}>+1s</button>
                </div>
              </div>

              {/* Presets */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button type="button" onClick={() => applyPreset('15s')} style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  {t('cutPreset15s') || '15s Story'}
                </button>
                <button type="button" onClick={() => applyPreset('30s')} style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  {t('cutPreset30s') || '30s Status'}
                </button>
                <button type="button" onClick={() => applyPreset('60s')} style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  {t('cutPreset60s') || '60s Reel'}
                </button>
                <button type="button" onClick={() => applyPreset('mid')} style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  {t('cutPresetMid') || 'Middle 50%'}
                </button>
                <button type="button" onClick={() => applyPreset('reset')} style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: 6, background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  {t('cutReset') || 'Reset Range'}
                </button>
              </div>
            </div>
          </div>
        ) : undefined}
      />

      {/* Render the 5 Brand New, 100% Unique Sections when no file is uploaded */}
      {!file && !pseoData && (
        <div 
          className="seo-sections-wrapper cut-video-sections-container" 
          style={{ display: 'flex', flexDirection: 'column', gap: '30px', paddingBottom: '80px', paddingTop: '20px' }}
        >
          {/* Section 1: Filmstrip & Speed Benchmark */}
          <CutVideoFilmstripBenchmarkSection />

          {/* Section 2: 4-Stage Horizontal Pipeline Ribbon */}
          <CutVideoWorkflowRibbonSection />

          {/* Section 3: Asymmetric Bento Matrix */}
          <CutVideoAsymmetricBentoSection />

          {/* Section 4: Deep Technical Specs Table */}
          <CutVideoTechnicalSpecsSection />

          {/* Section 5: Glassmorphic FAQ Accordion */}
          <CutVideoFaqSection />
        </div>
      )}
    </>
  );
};
export default CutVideo;
