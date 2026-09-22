import React, { useState, useEffect, useRef } from 'react';
import { FileVideo, FileAudio, Play, Pause, RefreshCw, Trash2, Volume2, Sparkles, Film, Music, CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export interface MediaLivePreviewProps {
  file: File | null;
  outputUrl?: string | null;
  targetFormat?: string;
  customFileName?: string;
  toolId?: string;
  processing?: boolean;
  progress?: number;
  engine?: string | null;
  onReplace?: () => void;
  onRemove?: () => void;
  customBadge?: React.ReactNode;
  videoOverlay?: (props: {
    videoDimensions: { width: number; height: number } | null;
    videoElement: HTMLVideoElement | null;
    containerRef: React.RefObject<HTMLDivElement | null>;
  }) => React.ReactNode;
}

export const MediaLivePreview: React.FC<MediaLivePreviewProps> = ({
  file,
  outputUrl,
  targetFormat,
  customFileName,
  toolId,
  processing,
  progress = 0,
  engine,
  onReplace,
  onRemove,
  customBadge,
  videoOverlay
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'original' | 'result'>('original');
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [videoDimensions, setVideoDimensions] = useState<{ width: number; height: number } | null>(null);
  const [mediaDuration, setMediaDuration] = useState<number | null>(null);
  const [nativePlaybackFailed, setNativePlaybackFailed] = useState(false);
  const [resultSizeBytes, setResultSizeBytes] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Automatically switch to result preview when outputUrl becomes available and track its file size
  useEffect(() => {
    if (outputUrl) {
      setActiveTab('result');
      setNativePlaybackFailed(false);
      setCodecNotice(null);
      fetch(outputUrl)
        .then(res => res.blob())
        .then(b => setResultSizeBytes(b.size))
        .catch(() => setResultSizeBytes(null));
    } else {
      setActiveTab('original');
      setResultSizeBytes(null);
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
    setCodecNotice(null);

    return () => {
      // Delay revocation so in-flight video requests don't abort with MEDIA_ERR_SRC_NOT_SUPPORTED
      setTimeout(() => {
        try {
          URL.revokeObjectURL(url);
        } catch (_) {}
      }, 5000);
    };
  }, [file]);

  if (!file) return null;

  const rawExt = file.name.split('.').pop()?.toLowerCase() || '';
  const isInputVideo = file.type.startsWith('video') || ['mp4', 'webm', 'mkv', 'avi', 'mov', 'flv', 'wmv', 'm4v', '3gp', 'ts', 'ogv'].includes(rawExt);
  const isInputAudio = file.type.startsWith('audio') || ['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a', 'wma', 'opus'].includes(rawExt);

  const effectiveTarget = (targetFormat || (isInputVideo ? 'mp4' : 'mp3')).toLowerCase().replace(/^\./, '');
  const isTargetAudio = ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'opus', 'wma', 'aiff', 'ac3'].includes(effectiveTarget);
  const isTargetVideo = ['mp4', 'webm', 'mkv', 'avi', 'mov', 'flv', 'wmv', 'm4v', '3gp', 'ts', 'ogv', 'gif'].includes(effectiveTarget);

  // Non-browser-playable containers (browsers cannot play these inside standard HTML5 <video>)
  const NON_BROWSER_VIDEO_CONTAINERS = ['3gp', 'mkv', 'avi', 'wmv', 'flv', 'ts', 'ogv'];

  // Determine current active preview properties
  const isCurrentResult = activeTab === 'result' && !!outputUrl;
  const currentUrl = isCurrentResult ? outputUrl! : originalUrl;
  
  // Decide whether the current view is video or audio
  const isCurrentVideo = isCurrentResult 
    ? (isTargetAudio ? false : (isTargetVideo ? true : isInputVideo))
    : isInputVideo;

  const isGifResult = isCurrentResult && effectiveTarget === 'gif';
  
  // Only convert-video targeting desktop-only containers triggers non-browser fallback card.
  // Standard tools like crop, watermark, mute, speed, compress output browser-compatible MP4/WebM.
  const isConvertTool = toolId === 'convert-video';
  const isNonBrowserResult = isCurrentResult && isConvertTool && isCurrentVideo && !isGifResult && NON_BROWSER_VIDEO_CONTAINERS.includes(effectiveTarget);

  const [codecNotice, setCodecNotice] = useState<string | null>(null);

  const getToolActionVerb = () => {
    if (toolId === 'compress-video') return 'compressed';
    if (toolId === 'crop-video') return 'cropped';
    if (toolId === 'watermark-video') return 'watermarked';
    if (toolId === 'mute-video') return 'processed without audio';
    if (toolId === 'change-video-speed') return 'speed-adjusted';
    if (toolId === 'convert-video') return 'converted';
    return 'processed';
  };

  const getToolSuccessTitle = () => {
    if (toolId === 'crop-video') return t('cropSuccess') || 'Video Cropped Successfully! 🎉';
    if (toolId === 'watermark-video') return t('wmSuccess') || 'Watermark Applied Successfully! 🎉';
    if (toolId === 'mute-video') return t('mvSuccess') || 'Audio Removed Successfully! 🎉';
    if (toolId === 'compress-video') return t('compVSuccess') || 'Video Compressed Successfully! 🎉';
    if (toolId === 'compress-audio') return t('compASuccess') || 'Audio Compressed Successfully! 🎉';
    if (toolId === 'change-video-speed') return t('speedSuccess') || 'Video Speed Adjusted! 🎉';
    if (toolId === 'convert-audio') return t('convASuccess') || 'Audio Converted Successfully! 🎉';
    if (toolId === 'video-to-audio') return t('v2aSuccess') || 'Audio Extracted Successfully! 🎉';
    if (toolId === 'convert-video') return t('convVSuccess') || 'File Converted Successfully! 🎉';
    return t('genericSuccess') || 'Processing Completed Successfully! 🎉';
  };

  const defaultBaseName = file ? file.name.replace(/\.[^/.]+$/, '') : 'processed';
  const downloadFileName = `${(customFileName?.trim() || defaultBaseName)}.${effectiveTarget || rawExt || 'mp4'}`;

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
                padding: '6px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
                borderRadius: 'calc(var(--radius-sm) - 2px)',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'original' ? 'var(--brand-primary)' : 'transparent',
                color: activeTab === 'original' ? '#fff' : 'var(--text-main)',
                transition: 'all 0.2s ease'
              }}
            >
              {isInputVideo ? <Film size={14} /> : <Music size={14} />}
              <span>{isInputVideo ? (t('previewOriginalVideo') || 'Original Video') : (t('previewOriginalAudio') || 'Original Audio')}</span>
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('result'); setNativePlaybackFailed(false); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
                borderRadius: 'calc(var(--radius-sm) - 2px)',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'result' ? 'var(--brand-secondary)' : 'transparent',
                color: activeTab === 'result' ? '#fff' : 'var(--text-main)',
                transition: 'all 0.2s ease'
              }}
            >
              <Sparkles size={14} />
              <span>{isInputVideo ? (t('previewResultVideo') || 'Result Video') : (t('previewResultAudio') || 'Result Audio')}</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-primary)', background: 'rgba(var(--brand-primary-rgb), 0.1)', padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}>
            {isInputVideo ? <Film size={14} /> : <Music size={14} />}
            <span>{isInputVideo ? (t('liveVideoPreview') || 'Live Video Preview') : (t('liveAudioPreview') || 'Live Audio Preview')}</span>
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
          padding: 14, 
          position: 'relative',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          minHeight: 'clamp(360px, 50vh, 560px)'
        }}
      >
        {/* 1. ANIMATED GIF RESULT VIEW */}
        {isGifResult && currentUrl && (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={currentUrl}
              alt="Animated GIF Result"
              style={{
                maxWidth: '100%',
                maxHeight: 380,
                borderRadius: 'var(--radius-md)',
                objectFit: 'contain',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
              }}
            />
          </div>
        )}

        {/* 2. SUCCESS CARD FOR NON-BROWSER CONTAINER RESULTS (.3gp, .mkv, .avi, .wmv, .flv, .ts, etc. OR onError fallback) */}
        {!isGifResult && isNonBrowserResult && (
          <div style={{ textAlign: 'center', padding: '32px 24px', maxWidth: 480, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2))',
              border: '2px solid var(--success-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              boxShadow: '0 8px 25px rgba(16, 185, 129, 0.25)'
            }}>
              <CheckCircle2 size={38} color="var(--success-color)" />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: 6, letterSpacing: '-0.02em' }}>
              {getToolSuccessTitle()}
            </h3>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, background: 'rgba(var(--brand-secondary-rgb), 0.15)', color: 'var(--brand-secondary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: 14 }}>
              <span>{(t('desktopContainerTitle') || '.{ext} Container Ready').replace('{ext}', effectiveTarget.toUpperCase())}</span>
              {resultSizeBytes && <span>• {(resultSizeBytes / (1024 * 1024)).toFixed(2)} MB</span>}
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.6, marginBottom: 20 }}>
              {(t('desktopContainerDesc') || 'Web browsers only support inline playback for MP4 and WebM. Your .{ext} file is 100% encoded and ready to play in VLC, Windows Media Player, QuickTime, TVs, or your target device!').replace('{ext}', effectiveTarget.toUpperCase())}
            </p>

            <a
              href={outputUrl!}
              download={downloadFileName}
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 28px',
                fontSize: '0.95rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(var(--brand-primary-rgb), 0.3)'
              }}
            >
              <Download size={18} />
              <span>{(t('downloadExtResult') || 'Download .{ext} Result').replace('{ext}', effectiveTarget.toUpperCase())}</span>
            </a>

            <p style={{ marginTop: 16, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {t('desktopContainerTip') || '💡 Tip: To preview and play directly inside web browsers or websites, choose .mp4 or .webm.'}
            </p>
          </div>
        )}

        {/* 3. NATIVE VIDEO PLAYER VIEW (For MP4, WebM, and playable containers) */}
        {!isGifResult && !isNonBrowserResult && isCurrentVideo && currentUrl && (!nativePlaybackFailed || !NON_BROWSER_VIDEO_CONTAINERS.includes((activeTab === 'result' ? effectiveTarget : rawExt).toLowerCase())) && (
          <div style={{ width: '100%', height: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div
              ref={playerContainerRef}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: videoDimensions ? (videoDimensions.width >= videoDimensions.height ? '100%' : 'auto') : '100%',
                height: videoDimensions ? (videoDimensions.height > videoDimensions.width ? '100%' : 'auto') : 'auto',
                maxWidth: '100%',
                maxHeight: 'min(540px, 68vh)',
                minHeight: 340,
                aspectRatio: videoDimensions ? `${videoDimensions.width} / ${videoDimensions.height}` : '16 / 9',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#0a0d14',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
              }}
            >
              {activeTab === 'original' && codecNotice ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '36px 20px',
                  width: '100%',
                  height: '100%',
                  minHeight: 340,
                  background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.12) 0%, rgba(10, 13, 20, 0.95) 100%)',
                  position: 'relative'
                }}>
                  <div style={{
                    width: 68,
                    height: 68,
                    borderRadius: '50%',
                    background: 'rgba(var(--brand-primary-rgb), 0.15)',
                    border: '1px solid rgba(var(--brand-primary-rgb), 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 14,
                    boxShadow: '0 0 25px rgba(var(--brand-primary-rgb), 0.25)'
                  }}>
                    <FileVideo size={34} color="var(--brand-primary)" />
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 6, wordBreak: 'break-all', maxWidth: '90%' }}>
                    {file.name}
                  </h4>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, background: 'rgba(var(--brand-secondary-rgb), 0.12)', color: 'var(--brand-secondary)', fontWeight: 700, fontSize: '0.8rem', marginBottom: 14 }}>
                    <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    <span>•</span>
                    <span>{rawExt.toUpperCase()} ({t('advancedCodec') || 'Advanced Codec'})</span>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', maxWidth: 460, lineHeight: 1.6, margin: '0 auto 18px auto' }}>
                    {t('advancedCodecDesc') || "Browser engines cannot preview this file's codec (such as HEVC/H.265 or 10-bit color) natively in the live player. Don't worry, SolveMyMedia's engine fully supports it and will process it into a universal web-compatible format!"}
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 'var(--radius-full)', background: 'rgba(var(--brand-secondary-rgb), 0.15)', color: 'var(--brand-secondary)', fontSize: '0.85rem', fontWeight: 700, border: '1px solid rgba(var(--brand-secondary-rgb), 0.3)' }}>
                    <Sparkles size={16} />
                    <span>{t('readyToProcessPrompt') || 'Ready to process — Click to start'}</span>
                  </div>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  key={currentUrl}
                  src={currentUrl}
                  controls
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={handleVideoMetadata}
                  onError={(e) => {
                    const err = (e.currentTarget as HTMLVideoElement).error;
                    console.warn("Video playback error:", err);
                    const currentExt = (activeTab === 'result' ? effectiveTarget : rawExt).toLowerCase();
                    if (NON_BROWSER_VIDEO_CONTAINERS.includes(currentExt)) {
                      setNativePlaybackFailed(true);
                    } else if (activeTab === 'original') {
                      setCodecNotice(t('nativePlayerCodecUnavailable') || "Native player preview is unavailable for this file's codec (e.g. HEVC/H.265). It will be processed properly upon processing!");
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'contain',
                    outline: 'none'
                  }}
                />
              )}
              {activeTab === 'original' && videoOverlay && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 6,
                    overflow: 'hidden'
                  }}
                >
                  {videoOverlay({
                    videoDimensions,
                    videoElement: videoRef.current,
                    containerRef: playerContainerRef
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. AUDIO PLAYER VIEW */}
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
              {isCurrentResult ? downloadFileName : file.name}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 16 }}>
              {isCurrentResult ? (t('highQualityAudioResult') || 'High Quality Audio Result') : `${(file.size / (1024 * 1024)).toFixed(2)} MB • ${rawExt.toUpperCase()}`}
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

        {/* 5. FALLBACK CARD (For obscure ORIGINAL source containers like MKV / AVI that native browser video cannot decode) */}
        {!isCurrentResult && isCurrentVideo && nativePlaybackFailed && NON_BROWSER_VIDEO_CONTAINERS.includes(rawExt) && (
          <div style={{ textAlign: 'center', padding: 24, maxWidth: 420 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(var(--brand-primary-rgb), 0.15)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <FileVideo size={36} color="var(--brand-primary)" />
            </div>
            <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 6, wordBreak: 'break-all' }}>{file.name}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: 16 }}>
              {(t('obscureContainerDesc') || 'Browser engines do not natively decode .{ext} containers in the player, but it will be processed and playable once processed!').replace('{ext}', rawExt.toUpperCase())}
            </p>
            <span style={{ fontSize: '0.8rem', color: 'var(--brand-secondary)', fontWeight: 600, background: 'rgba(var(--brand-secondary-rgb), 0.1)', padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}>
              {t('readyToProcess') || 'Ready to process'}
            </span>
          </div>
        )}

        {/* File Details & Quick Actions Bar */}
        {!processing && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                {isCurrentResult ? `✨ ${t('resultFile') || 'Result File'}` : file.name}
              </span>
              <span>•</span>
              <span>
                {isCurrentResult && resultSizeBytes 
                  ? `${(resultSizeBytes / (1024 * 1024)).toFixed(2)} MB` 
                  : `${(file.size / (1024 * 1024)).toFixed(2)} MB`}
              </span>
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
            <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{t('processingPercent') || 'Processing'} {progress}%</span>
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
