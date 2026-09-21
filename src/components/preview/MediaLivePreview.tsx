import React, { useState, useEffect, useRef } from 'react';
import { FileVideo, FileAudio, Play, Pause, RefreshCw, Trash2, Volume2, Sparkles, Film, Music, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export interface MediaLivePreviewProps {
  file: File | null;
  outputUrl?: string | null;
  targetFormat?: string;
  processing?: boolean;
  progress?: number;
  engine?: string | null;
  onReplace?: () => void;
  onRemove?: () => void;
  customBadge?: React.ReactNode;
}

export const MediaLivePreview: React.FC<MediaLivePreviewProps> = ({
  file,
  outputUrl,
  targetFormat,
  processing,
  progress = 0,
  engine,
  onReplace,
  onRemove,
  customBadge
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'original' | 'result'>('original');
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [videoDimensions, setVideoDimensions] = useState<{ width: number; height: number } | null>(null);
  const [mediaDuration, setMediaDuration] = useState<number | null>(null);
  const [nativePlaybackFailed, setNativePlaybackFailed] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Automatically switch to result preview when outputUrl becomes available
  useEffect(() => {
    if (outputUrl) {
      setActiveTab('result');
      setNativePlaybackFailed(false);
    } else {
      setActiveTab('original');
    }
  }, [outputUrl]);

  // Manage object URL for the uploaded file
  useEffect(() => {
    if (!file) {
      setOriginalUrl(null);
      setVideoDimensions(null);
      setMediaDuration(null);
      setNativePlaybackFailed(false);
      return;
    }

    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    setNativePlaybackFailed(false);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!file) return null;

  const rawExt = file.name.split('.').pop()?.toLowerCase() || '';
  const isInputVideo = file.type.startsWith('video') || ['mp4', 'webm', 'mkv', 'avi', 'mov', 'flv', 'wmv', 'm4v', '3gp', 'ts', 'ogv'].includes(rawExt);
  const isInputAudio = file.type.startsWith('audio') || ['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a', 'wma', 'opus'].includes(rawExt);

  const effectiveTarget = (targetFormat || '').toLowerCase().replace(/^\./, '');
  const isTargetAudio = ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a'].includes(effectiveTarget);
  const isTargetVideo = ['mp4', 'webm', 'mkv', 'avi', 'mov', 'flv', 'wmv', 'm4v', '3gp', 'ts', 'ogv', 'gif'].includes(effectiveTarget);

  // Determine current active preview properties
  const isCurrentResult = activeTab === 'result' && !!outputUrl;
  const currentUrl = isCurrentResult ? outputUrl! : originalUrl;
  
  // Decide whether the current view is video or audio
  const isCurrentVideo = isCurrentResult 
    ? (isTargetAudio ? false : (isTargetVideo ? true : isInputVideo))
    : isInputVideo;

  const formatDuration = (seconds: number | null) => {
    if (!seconds || isNaN(seconds) || seconds === Infinity) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVideoMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (v.videoWidth && v.videoHeight) {
      setVideoDimensions({ width: v.videoWidth, height: v.videoHeight });
    }
    if (v.duration && !isNaN(v.duration) && v.duration !== Infinity) {
      setMediaDuration(v.duration);
    }
  };

  const handleAudioMetadata = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const a = e.currentTarget;
    if (a.duration && !isNaN(a.duration) && a.duration !== Infinity) {
      setMediaDuration(a.duration);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      {/* Top Bar: Tabs for Before / After (when result is ready) & Badges */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        {outputUrl ? (
          <div style={{ display: 'inline-flex', background: 'var(--bg-card)', padding: 3, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <button
              type="button"
              onClick={() => { setActiveTab('original'); setNativePlaybackFailed(false); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                borderRadius: 'calc(var(--radius-sm) - 2px)',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'original' ? 'var(--brand-primary)' : 'transparent',
                color: activeTab === 'original' ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              {isInputVideo ? <Film size={13} /> : <Music size={13} />}
              <span>{t('previewOriginal') || 'Original'}</span>
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('result'); setNativePlaybackFailed(false); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                borderRadius: 'calc(var(--radius-sm) - 2px)',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'result' ? 'var(--brand-secondary)' : 'transparent',
                color: activeTab === 'result' ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              <Sparkles size={13} />
              <span>{t('previewResult') || 'Processed Result'}</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-primary)', background: 'rgba(var(--brand-primary-rgb), 0.1)', padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}>
            {isInputVideo ? <Film size={14} /> : <Music size={14} />}
            <span>{isInputVideo ? 'Live Video Preview' : 'Live Audio Preview'}</span>
          </div>
        )}

        {/* Dimension or Duration Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {videoDimensions && isCurrentVideo && (
            <span style={{ background: 'var(--bg-card)', padding: '3px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontWeight: 600 }}>
              {videoDimensions.width}×{videoDimensions.height}
            </span>
          )}
          {mediaDuration && (
            <span style={{ background: 'var(--bg-card)', padding: '3px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontWeight: 600 }}>
              {formatDuration(mediaDuration)}
            </span>
          )}
          {customBadge}
        </div>
      </div>

      {/* Main Preview Player Canvas */}
      <div 
        style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: 'var(--bg-input)', 
          borderRadius: 'var(--radius-md)', 
          padding: 16, 
          position: 'relative',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          minHeight: 260
        }}
      >
        {/* VIDEO PLAYER VIEW */}
        {isCurrentVideo && currentUrl && !nativePlaybackFailed && (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <video
              ref={videoRef}
              key={currentUrl}
              src={currentUrl}
              controls
              playsInline
              preload="metadata"
              onLoadedMetadata={handleVideoMetadata}
              onError={() => {
                // If native browser video tag fails (e.g. MKV/AVI in Chrome)
                if (!isCurrentResult) {
                  setNativePlaybackFailed(true);
                }
              }}
              style={{
                maxWidth: '100%',
                maxHeight: 380,
                width: '100%',
                borderRadius: 'var(--radius-md)',
                background: '#0a0d14',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                outline: 'none',
                objectFit: 'contain'
              }}
            />
          </div>
        )}

        {/* AUDIO PLAYER VIEW */}
        {!isCurrentVideo && currentUrl && (
          <div style={{ width: '100%', maxWidth: 460, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', textAlign: 'center' }}>
            <div 
              style={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                background: isCurrentResult ? 'rgba(var(--brand-secondary-rgb), 0.15)' : 'rgba(var(--brand-primary-rgb), 0.15)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: 16,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              <Music size={36} color={isCurrentResult ? 'var(--brand-secondary)' : 'var(--brand-primary)'} />
            </div>
            
            <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: 4, wordBreak: 'break-all', maxWidth: '100%' }}>
              {isCurrentResult ? `Processed_${file.name.replace(/\.[^/.]+$/, '')}.${effectiveTarget || 'mp3'}` : file.name}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 16 }}>
              {isCurrentResult ? 'High Quality Audio Result' : `${(file.size / (1024 * 1024)).toFixed(2)} MB • ${rawExt.toUpperCase()}`}
            </p>

            <audio
              ref={audioRef}
              key={currentUrl}
              src={currentUrl}
              controls
              preload="metadata"
              onLoadedMetadata={handleAudioMetadata}
              style={{ width: '100%', outline: 'none' }}
            />
          </div>
        )}

        {/* FALLBACK CARD (For obscure containers like MKV / AVI that native browser video cannot decode) */}
        {isCurrentVideo && nativePlaybackFailed && (
          <div style={{ textAlign: 'center', padding: 24, maxWidth: 420 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(var(--brand-primary-rgb), 0.15)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <FileVideo size={36} color="var(--brand-primary)" />
            </div>
            <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 6, wordBreak: 'break-all' }}>{file.name}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: 16 }}>
              Browser engines do not natively decode <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>.{rawExt.toUpperCase()}</span> containers in the player, but it will be processed and playable once converted to MP4/WebM!
            </p>
            <span style={{ fontSize: '0.8rem', color: 'var(--brand-secondary)', fontWeight: 600, background: 'rgba(var(--brand-secondary-rgb), 0.1)', padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}>
              Ready to process
            </span>
          </div>
        )}

        {/* File Details & Quick Actions Bar */}
        {!processing && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                {isCurrentResult ? '✨ Result File' : file.name}
              </span>
              <span>•</span>
              <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {onReplace && (
                <button 
                  type="button"
                  onClick={onReplace}
                  className="btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'rgba(var(--brand-primary-rgb), 0.1)', color: 'var(--brand-primary)', border: '1px solid rgba(var(--brand-primary-rgb), 0.25)', cursor: 'pointer', fontWeight: 600 }}
                  title="Replace file"
                >
                  <RefreshCw size={13} />
                  <span>{t('replaceFile') || 'Replace'}</span>
                </button>
              )}
              {onRemove && !outputUrl && (
                <button 
                  type="button"
                  onClick={onRemove}
                  style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error-color)', border: 'none', padding: '6px 10px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', fontWeight: 600 }}
                  title="Remove file"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Processing Progress Bar */}
      {processing && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Processing {progress}%</span>
            {engine === 'tier1' && <span style={{ color: 'var(--warning-color)', fontWeight: 600 }}>⚡ GPU WebCodecs (MP4)</span>}
            {engine === 'tier2' && <span style={{ color: 'var(--warning-color)', fontWeight: 600 }}>⚡ GPU WebCodecs (WebM)</span>}
            {engine === 'tier3' && <span style={{ color: 'var(--brand-secondary)', fontWeight: 600 }}>⚙️ CPU WASM FFmpeg</span>}
          </div>
          <div className="progress-container" style={{ height: 6, borderRadius: 3 }}>
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
};
