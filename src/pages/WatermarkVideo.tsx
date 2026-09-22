import { WatermarkVideoHeroSection, WatermarkVideoHowToSection, WatermarkVideoBrandSection, WatermarkVideoPrivacySection } from '../components/content-sections/tools/WatermarkVideoSections';
import React, { useState, useRef, useEffect } from 'react';
import { Image, FileVideo, Trash2, Download, Loader2, Zap, Settings2, RefreshCw, FileEdit, RotateCcw, Type, Move, CheckCircle2, Sparkles } from 'lucide-react';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { smartHighlight } from '../utils/textFormatting';
import { useLanguage } from '../hooks/useLanguage';
import { MediaLivePreview } from '../components/preview/MediaLivePreview';
import { useWorkspace } from '../contexts/WorkspaceContext';

export const WatermarkVideo: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { ready, processing, progress, runCustomFFmpeg } = useFFmpeg();
  const { t } = useLanguage();
  const { setHasActiveFile } = useWorkspace();
  
  const ui = {
    pos: t('wmPos') || "Position",
    desc: t('wmDesc') || "Choose where the watermark appears on the live video.",
    tl: t('wmTL') || "Top Left",
    tr: t('wmTR') || "Top Right",
    bl: t('wmBL') || "Bottom Left",
    br: t('wmBR') || "Bottom Right",
    c: t('wmC') || "Center",
    tiled: t('wmTiled') || "Tiled Grid (3×3)",
    moving: t('wmMoving') || "Moving / Bouncing",
    scale: t('wmScale') || "Scale Size",
    opacity: t('wmOpac') || "Opacity",
    action: t('wmAction') || "Add Watermark",
    addVideo: t('dragDrop') || "Select Video",
    addLogo: t('browseFiles') || "Select Logo Image",
    applying: t('cwProcessing') || "Applying...",
    downloadResult: t('cwDownload') || "Download Result"
  };

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [watermarkType, setWatermarkType] = useState<'image' | 'text'>('image');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [textWatermark, setTextWatermark] = useState<string>('@SolveMyMedia');
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [textBadge, setTextBadge] = useState<boolean>(true);

  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [position, setPosition] = useState<string>('bottom-right');
  const [scale, setScale] = useState<number>(1.0);
  const [opacity, setOpacity] = useState<number>(0.9);
  const [margin, setMargin] = useState<number>(20);
  const [customPos, setCustomPos] = useState<{ x: number; y: number }>({ x: 80, y: 80 });
  const [isDragging, setIsDragging] = useState(false);

  const [customFileName, setCustomFileName] = useState<string>('');
  const defaultBaseName = videoFile ? videoFile.name.replace(/\.[^/.]+$/, '') : '';

  useEffect(() => {
    setHasActiveFile(!!videoFile);
    return () => setHasActiveFile(false);
  }, [videoFile, setHasActiveFile]);

  useEffect(() => {
    if (videoFile) {
      setCustomFileName(videoFile.name.replace(/\.[^/.]+$/, ''));
    } else {
      setCustomFileName('');
    }
  }, [videoFile]);

  // Manage logo image preview URL
  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [imageFile]);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const dragStartRef = useRef<{ startX: number; startY: number; initialPos: { x: number; y: number } } | null>(null);

  // Generate PNG file from text watermark via offscreen canvas
  const createTextWatermarkFile = async (): Promise<File | null> => {
    if (!textWatermark.trim()) return null;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const baseFontSize = Math.round(36 * scale);
    ctx.font = `bold ${baseFontSize}px sans-serif`;
    const metrics = ctx.measureText(textWatermark);
    const padX = textBadge ? 26 : 8;
    const padY = textBadge ? 16 : 8;
    canvas.width = Math.ceil(metrics.width + padX * 2);
    canvas.height = Math.ceil(baseFontSize + padY * 2);

    const isDarkText = textColor.toLowerCase() === '#0f172a' || textColor.toLowerCase() === '#000000';

    if (textBadge) {
      ctx.fillStyle = isDarkText ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.85)';
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(0, 0, canvas.width, canvas.height, 12);
      } else {
        ctx.rect(0, 0, canvas.width, canvas.height);
      }
      ctx.fill();
      ctx.strokeStyle = isDarkText ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.font = `bold ${baseFontSize}px sans-serif`;
    ctx.textBaseline = 'middle';

    // Stroke outline for maximum legibility on any video background
    ctx.strokeStyle = isDarkText ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.95)';
    ctx.lineWidth = Math.max(2, Math.round(2.5 * scale));
    ctx.strokeText(textWatermark, padX, canvas.height / 2);

    // Text fill
    ctx.fillStyle = textColor;
    ctx.fillText(textWatermark, padX, canvas.height / 2);

    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
    if (!blob) return null;
    return new File([blob], 'text_watermark.png', { type: 'image/png' });
  };

  const handleProcess = async () => {
    if (!videoFile) return;

    let watermarkInputFile: File | null = null;
    if (watermarkType === 'image') {
      if (!imageFile) return;
      watermarkInputFile = imageFile;
    } else {
      watermarkInputFile = await createTextWatermarkFile();
      if (!watermarkInputFile) return;
    }
    
    const m = margin;
    let baseWmFilter = `[1:v]format=rgba,colorchannelmixer=aa=${opacity},scale=iw*${scale}:-1[wm]`;
    let overlayFilter = '';

    if (position === 'tiled') {
       baseWmFilter = `[1:v]format=rgba,colorchannelmixer=aa=${opacity},scale=iw*${scale}:-1,split=9[wm1][wm2][wm3][wm4][wm5][wm6][wm7][wm8][wm9]`;
       const xPcts = ['(W-w)*0.15', '(W-w)*0.5', '(W-w)*0.85'];
       const yPcts = ['(H-h)*0.15', '(H-h)*0.5', '(H-h)*0.85'];
       const steps: string[] = [];
       let stepIdx = 0;
       for (let r = 0; r < 3; r++) {
         for (let c = 0; c < 3; c++) {
           const wmIdx = stepIdx + 1;
           const inStream = stepIdx === 0 ? '[0:v]' : `[v${stepIdx}]`;
           const outStream = stepIdx === 8 ? '' : `[v${stepIdx + 1}]`;
           steps.push(`${inStream}[wm${wmIdx}]overlay=${xPcts[c]}:${yPcts[r]}${outStream}`);
           stepIdx++;
         }
       }
       overlayFilter = steps.join(';');
    } else if (position === 'moving') {
       // Dynamic screensaver bounce across X and Y based on timestamp 't'
       const posX = `abs(mod(t*140,2*max(1,W-w))-max(1,W-w))`;
       const posY = `abs(mod(t*85,2*max(1,H-h))-max(1,H-h))`;
       overlayFilter = `[0:v][wm]overlay=x='${posX}':y='${posY}'`;
    } else {
      let overlayPos = '';
      if (position === 'bottom-right') overlayPos = `W-w-${m}:H-h-${m}`;
      else if (position === 'top-right') overlayPos = `W-w-${m}:${m}`;
      else if (position === 'top-left') overlayPos = `${m}:${m}`;
      else if (position === 'bottom-left') overlayPos = `${m}:H-h-${m}`;
      else if (position === 'center') overlayPos = `(W-w)/2:(H-h)/2`;
      else if (position === 'custom') overlayPos = `(W-w)*${customPos.x / 100}:(H-h)*${customPos.y / 100}`;
      else overlayPos = `W-w-${m}:H-h-${m}`;
      
      overlayFilter = `[0:v][wm]overlay=${overlayPos}`;
    }

    const args = [
      '-i', videoFile.name, 
      '-i', watermarkInputFile.name, 
      '-filter_complex', `${baseWmFilter};${overlayFilter}`, 
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-preset', 'fast',
      '-movflags', '+faststart',
      '-c:a', 'aac',
      '-b:a', '192k',
      'output.mp4'
    ];
    
    const url = await runCustomFFmpeg([videoFile, watermarkInputFile], args, 'output.mp4', 'video/mp4');
    if (url) setOutputUrl(url);
  };

  const downloadFileName = `${(customFileName.trim() || defaultBaseName || 'watermarked')}.mp4`;

  // Watermark dragging directly on preview
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    setPosition('custom');
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPos: { ...customPos }
    };
  };

  const handlePointerMove = (e: React.PointerEvent, containerRef: React.RefObject<HTMLDivElement | null>) => {
    if (!isDragging || !dragStartRef.current || !containerRef.current) return;
    e.stopPropagation();
    e.preventDefault();

    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;

    const deltaXPct = (deltaX / rect.width) * 100;
    const deltaYPct = (deltaY / rect.height) * 100;

    const newX = Math.max(5, Math.min(95, dragStartRef.current.initialPos.x + deltaXPct));
    const newY = Math.max(5, Math.min(95, dragStartRef.current.initialPos.y + deltaYPct));

    setCustomPos({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      dragStartRef.current = null;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // Real-time floating watermark overlay rendered on the live video
  const renderVideoOverlay = ({ containerRef }: {
    videoDimensions: { width: number; height: number } | null;
    videoElement: HTMLVideoElement | null;
    containerRef: React.RefObject<HTMLDivElement | null>;
  }) => {
    const hasWatermarkContent = (watermarkType === 'image' && !!imagePreviewUrl) || (watermarkType === 'text' && !!textWatermark.trim());

    if (!hasWatermarkContent) {
      return (
        <div style={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          color: 'var(--brand-primary)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.75rem',
          fontWeight: 700,
          border: '1px solid rgba(var(--brand-primary-rgb), 0.4)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}>
          ✨ Select logo image or type text to preview live watermark
        </div>
      );
    }

    const renderWatermarkElement = (posStyle: React.CSSProperties, key: string) => {
      const isInteractive = position !== 'tiled' && position !== 'moving';

      if (watermarkType === 'image' && imagePreviewUrl) {
        return (
          <div
            key={key}
            onPointerDown={isInteractive ? handlePointerDown : undefined}
            onPointerMove={isInteractive ? (e) => handlePointerMove(e, containerRef) : undefined}
            onPointerUp={isInteractive ? handlePointerUp : undefined}
            style={{
              position: 'absolute',
              cursor: isInteractive ? (isDragging ? 'grabbing' : 'grab') : 'default',
              pointerEvents: isInteractive ? 'auto' : 'none',
              maxWidth: `${Math.round(25 * scale)}%`,
              maxHeight: `${Math.round(25 * scale)}%`,
              display: 'inline-flex',
              padding: 2,
              borderRadius: 4,
              border: isDragging ? '1px dashed var(--brand-primary)' : '1px dashed transparent',
              transition: isDragging ? 'none' : 'border 0.2s ease, opacity 0.2s ease',
              opacity: opacity,
              userSelect: 'none',
              zIndex: 10,
              ...posStyle
            }}
          >
            <img 
              src={imagePreviewUrl} 
              alt="Watermark Preview"
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))'
              }}
            />
          </div>
        );
      }

      if (watermarkType === 'text' && textWatermark.trim()) {
        const isDarkText = textColor.toLowerCase() === '#0f172a' || textColor.toLowerCase() === '#000000';
        return (
          <div
            key={key}
            onPointerDown={isInteractive ? handlePointerDown : undefined}
            onPointerMove={isInteractive ? (e) => handlePointerMove(e, containerRef) : undefined}
            onPointerUp={isInteractive ? handlePointerUp : undefined}
            style={{
              position: 'absolute',
              cursor: isInteractive ? (isDragging ? 'grabbing' : 'grab') : 'default',
              pointerEvents: isInteractive ? 'auto' : 'none',
              fontSize: `clamp(11px, ${1.2 * scale}vw, ${22 * scale}px)`,
              fontWeight: 800,
              color: textColor,
              background: textBadge 
                ? (isDarkText ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.85)') 
                : 'transparent',
              backdropFilter: textBadge ? 'blur(6px)' : 'none',
              padding: textBadge ? '4px 12px' : '0 4px',
              borderRadius: textBadge ? 6 : 0,
              border: isDragging 
                ? '1px dashed var(--brand-primary)' 
                : (textBadge 
                    ? (isDarkText ? '1px solid rgba(0, 0, 0, 0.25)' : '1px solid rgba(255, 255, 255, 0.25)') 
                    : 'none'),
              textShadow: textBadge 
                ? 'none' 
                : (isDarkText 
                    ? '0 0 4px rgba(255, 255, 255, 0.9), 0 1px 3px rgba(255, 255, 255, 0.9)' 
                    : '0 0 4px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0,0,0,0.85)'),
              opacity: opacity,
              userSelect: 'none',
              whiteSpace: 'nowrap',
              zIndex: 10,
              ...posStyle
            }}
          >
            {textWatermark}
          </div>
        );
      }

      return null;
    };

    if (position === 'tiled') {
      const xPcts = [15, 50, 85];
      const yPcts = [15, 50, 85];
      return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {yPcts.map((yp, r) =>
            xPcts.map((xp, c) =>
              renderWatermarkElement({
                top: `${yp}%`,
                left: `${xp}%`,
                transform: 'translate(-50%, -50%)'
              }, `tiled-${r}-${c}`)
            )
          )}
        </div>
      );
    }

    if (position === 'moving') {
      return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div className="watermark-moving-animated">
            {renderWatermarkElement({ position: 'relative' }, 'moving')}
          </div>
        </div>
      );
    }

    if (position === 'custom') {
      return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {renderWatermarkElement({
            left: `${customPos.x}%`,
            top: `${customPos.y}%`,
            transform: 'translate(-50%, -50%)'
          }, 'custom')}
        </div>
      );
    }

    const m = `${margin}px`;
    const singleStyle: React.CSSProperties = {
      top: position.includes('top') ? m : position === 'center' ? '50%' : 'auto',
      bottom: position.includes('bottom') ? m : 'auto',
      left: position.includes('left') ? m : position === 'center' ? '50%' : 'auto',
      right: position.includes('right') ? m : 'auto',
      transform: position === 'center' ? 'translate(-50%, -50%)' : undefined
    };

    return (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {renderWatermarkElement(singleStyle, 'single')}
      </div>
    );
  };

  const isReadyToProcess = !!videoFile && (watermarkType === 'image' ? !!imageFile : !!textWatermark.trim());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', paddingTop: videoFile ? '20px' : '40px' }}>
      
      {/* Hidden File Inputs */}
      <input 
        type="file" 
        ref={videoInputRef} 
        onChange={(e) => { 
          if (e.target.files && e.target.files.length > 0) {
            setVideoFile(e.target.files[0]); 
            setOutputUrl(null); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }} 
        accept="video/*,.mp4,.webm,.mov,.mkv,.avi,.wmv,.flv,.3gp,.m4v,.ts,.ogv"
        style={{ display: 'none' }} 
      />

      <input 
        type="file" 
        ref={imageInputRef} 
        onChange={(e) => { 
          if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]); 
            setOutputUrl(null); 
          }
        }} 
        accept="image/*"
        style={{ display: 'none' }} 
      />

      {/* Header */}
      {!videoFile && (
        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: 1200, margin: '0 auto 32px auto', width: '100%' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 900, 
            marginBottom: 20, 
            letterSpacing: '-0.03em', 
            lineHeight: 1.15, 
            fontFamily: 'Outfit, sans-serif'
          }}>
            {smartHighlight(pseoData ? pseoData.h1 : (t('wmTitle') || 'Add Custom Watermark Logo to Video'))}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
            {pseoData ? pseoData.description : (t('wmSub') || "Protect your creative work by overlaying custom text or image watermarks onto your videos before sharing them online.")}
          </p>
        </div>
      )}

      <div className="tool-workspace-container" style={{ margin: '0 auto' }}>
        
        {/* LEFT COLUMN: Video Player / Upload Area & Watermark Selector */}
        <div className="tool-workspace-left glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          {/* Main Video Dropzone / Live Player */}
          {!videoFile ? (
            <div className="dropzone" style={{ flex: 1, minHeight: 280 }} onClick={() => videoInputRef.current?.click()}>
              <div className="dropzone-icon">
                <FileVideo size={40} color="var(--brand-primary)" />
              </div>
              <p>{ui.addVideo} <span className="browse-text">{t('browseFiles') || 'Browse Files'}</span></p>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supports MP4, WebM, MOV, MKV, AVI, and more</span>
            </div>
          ) : (
            <MediaLivePreview
              file={videoFile}
              outputUrl={outputUrl}
              targetFormat="mp4"
              customFileName={customFileName}
              toolId="watermark-video"
              processing={processing}
              progress={progress}
              engine="tier3"
              onReplace={() => videoInputRef.current?.click()}
              onRemove={() => { setVideoFile(null); setOutputUrl(null); }}
              videoOverlay={renderVideoOverlay}
            />
          )}

          {/* Watermark Asset Selector (Visible once video is loaded) */}
          {videoFile && !outputUrl && (
            <div style={{ background: 'var(--bg-input)', padding: 16, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              
              {/* Type Switcher: Image Logo vs Text Watermark */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Sparkles size={14} className="text-brand-primary" />
                  Watermark Asset
                </span>
                <div style={{ display: 'inline-flex', background: 'var(--bg-card)', padding: 2, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <button
                    type="button"
                    onClick={() => setWatermarkType('image')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      borderRadius: 'calc(var(--radius-sm) - 2px)',
                      border: 'none',
                      cursor: 'pointer',
                      background: watermarkType === 'image' ? 'var(--brand-primary)' : 'transparent',
                      color: watermarkType === 'image' ? '#fff' : 'var(--text-main)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Image size={12} />
                    <span>Logo Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWatermarkType('text')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      borderRadius: 'calc(var(--radius-sm) - 2px)',
                      border: 'none',
                      cursor: 'pointer',
                      background: watermarkType === 'text' ? 'var(--brand-primary)' : 'transparent',
                      color: watermarkType === 'text' ? '#fff' : 'var(--text-main)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Type size={12} />
                    <span>Text Watermark</span>
                  </button>
                </div>
              </div>

              {/* IMAGE LOGO UPLOAD / DISPLAY */}
              {watermarkType === 'image' && (
                !imageFile ? (
                  <div 
                    className="dropzone" 
                    style={{ padding: '16px 12px', minHeight: 'auto', background: 'var(--bg-card)', borderStyle: 'dashed' }} 
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <Image size={24} color="var(--brand-secondary)" style={{ marginBottom: 4 }} />
                    <p style={{ fontSize: '0.85rem', margin: 0 }}>
                      <span className="browse-text">{ui.addLogo}</span> (PNG, JPG, WebP)
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-card)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {imagePreviewUrl && (
                        <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={imagePreviewUrl} alt="Thumbnail" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </div>
                      )}
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '0.85rem', margin: 0, wordBreak: 'break-all' }}>{imageFile.name}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>{(imageFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button 
                        type="button" 
                        onClick={() => imageInputRef.current?.click()} 
                        style={{ background: 'rgba(var(--brand-secondary-rgb), 0.1)', color: 'var(--brand-secondary)', border: '1px solid rgba(var(--brand-secondary-rgb), 0.25)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', fontWeight: 600 }}
                      >
                        <RefreshCw size={12} /> Change
                      </button>
                      <button 
                        type="button"
                        onClick={() => setImageFile(null)} 
                        style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: 'var(--error-color)', cursor: 'pointer', padding: 6, borderRadius: 'var(--radius-sm)' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )
              )}

              {/* TEXT WATERMARK CONTROLS */}
              {watermarkType === 'text' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <input
                    type="text"
                    value={textWatermark}
                    onChange={(e) => setTextWatermark(e.target.value)}
                    placeholder="Enter text watermark (e.g. @YourName)"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 12px',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    {/* Color Chips */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 600 }}>Color:</span>
                      {[
                        { color: '#ffffff', label: 'White' },
                        { color: '#facc15', label: 'Gold' },
                        { color: '#38bdf8', label: 'Cyan' },
                        { color: '#a855f7', label: 'Purple' },
                        { color: '#0f172a', label: 'Dark' }
                      ].map(c => (
                        <button
                          key={c.color}
                          type="button"
                          onClick={() => setTextColor(c.color)}
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            background: c.color,
                            border: textColor === c.color 
                              ? '2px solid var(--brand-primary)' 
                              : (c.color === '#0f172a' ? '2px solid rgba(255, 255, 255, 0.6)' : '1px solid rgba(255,255,255,0.3)'),
                            cursor: 'pointer',
                            outline: textColor === c.color ? '2px solid var(--brand-primary)' : 'none',
                            outlineOffset: 1,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                          }}
                          title={c.label}
                        />
                      ))}
                    </div>

                    {/* Dark frosted badge checkbox */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={textBadge} 
                        onChange={(e) => setTextBadge(e.target.checked)}
                        style={{ accentColor: 'var(--brand-primary)', cursor: 'pointer' }} 
                      />
                      <span>Frosted Badge</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Real-Time Position, Scale, Opacity & Action */}
        <div className="tool-workspace-right glass-panel">
          <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', height: '100%', display: 'flex', flexDirection: 'column' }}>
            
            <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Settings2 size={18} className="text-brand-primary" />
              <span>{ui.pos}</span>
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{ui.desc}</p>
            
            {/* Position Preset Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
              {[
                { id: 'top-left', label: ui.tl },
                { id: 'top-right', label: ui.tr },
                { id: 'bottom-left', label: ui.bl },
                { id: 'bottom-right', label: ui.br },
                { id: 'center', label: ui.c },
                { id: 'tiled', label: ui.tiled },
                { id: 'moving', label: '🎬 ' + ui.moving }
              ].map(pos => (
                <button 
                  key={pos.id} 
                  type="button"
                  className={`option-btn ${position === pos.id ? 'active' : ''}`} 
                  onClick={() => setPosition(pos.id)} 
                  disabled={processing || !!outputUrl} 
                  style={{ 
                    padding: '10px 12px', 
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: position === pos.id ? '#ffffff' : 'var(--text-main)',
                    gridColumn: pos.id === 'moving' ? 'span 2' : undefined
                  }}
                >
                  {pos.label}
                </button>
              ))}
            </div>

            {/* Scale Slider */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                <span>{ui.scale}</span>
                <span style={{ color: 'var(--brand-primary)' }}>{(scale * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" 
                min="0.2" 
                max="2.5" 
                step="0.05" 
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                disabled={processing || !!outputUrl}
                style={{ width: '100%', accentColor: 'var(--brand-primary)' }}
              />
            </div>

            {/* Opacity Slider */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                <span>{ui.opacity}</span>
                <span style={{ color: 'var(--brand-secondary)' }}>{(opacity * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="1.0" 
                step="0.05" 
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                disabled={processing || !!outputUrl}
                style={{ width: '100%', accentColor: 'var(--brand-secondary)' }}
              />
            </div>

            {/* Edge Margin / Inset Slider */}
            {position !== 'center' && position !== 'custom' && position !== 'tiled' && position !== 'moving' && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  <span>Edge Inset</span>
                  <span style={{ color: 'var(--text-muted)' }}>{margin}px</span>
                </div>
                <input 
                  type="range" 
                  min="8" 
                  max="48" 
                  step="2" 
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  disabled={processing || !!outputUrl}
                  style={{ width: '100%', accentColor: 'var(--brand-primary)' }}
                />
              </div>
            )}

            {/* Output File Rename Field */}
            {videoFile && (
              <div style={{ marginBottom: 16, background: 'var(--bg-input)', padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FileEdit size={14} style={{ color: 'var(--brand-primary)' }} />
                    {t('outputFileName') || 'Output File Name'}
                  </span>
                  {customFileName !== defaultBaseName && (
                    <button
                      type="button"
                      onClick={() => setCustomFileName(defaultBaseName)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--brand-primary)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                      title={t('resetFileName') || 'Reset'}
                    >
                      <RotateCcw size={12} /> {t('resetFileName') || 'Reset'}
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <input
                    type="text"
                    value={customFileName}
                    onChange={(e) => setCustomFileName(e.target.value)}
                    placeholder={t('outputFileNamePlaceholder') || 'Enter file name...'}
                    disabled={processing}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      padding: '8px 12px',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      width: '100%'
                    }}
                  />
                  <span style={{ padding: '0 10px', fontSize: '0.85rem', color: 'var(--brand-secondary)', fontWeight: 700, background: 'rgba(var(--brand-secondary-rgb), 0.1)', height: '100%', display: 'flex', alignItems: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    .mp4
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '6px 0 0 0' }}>
                  {t('renameFileHint') || 'Rename output file before downloading'}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ marginTop: 'auto', paddingTop: 16 }}>
              {outputUrl ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <a 
                    href={outputUrl} 
                    download={downloadFileName} 
                    className="btn-primary" 
                  >
                    <Download size={18} />
                    {ui.downloadResult}
                  </a>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => setOutputUrl(null)}
                      title={t('repeatProcess') || 'Re-adjust Settings'}
                      style={{ flex: '1 1 140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'rgba(var(--brand-primary-rgb), 0.1)', border: '1px solid rgba(var(--brand-primary-rgb), 0.25)', color: 'var(--brand-primary)', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s ease' }}
                    >
                      <RotateCcw size={15} />
                      <span>{t('repeatProcess') || 'Re-adjust Settings'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      title={t('processAnother') || 'Choose Another File'}
                      style={{ flex: '1 1 140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s ease' }}
                    >
                      <RefreshCw size={15} />
                      <span>{t('processAnother') || 'Choose Another File'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleProcess}
                  disabled={processing || !isReadyToProcess || !ready}
                  className="btn-primary"
                >
                  {processing ? (
                    <div style={{ animation: 'spin 1s linear infinite', display: 'flex' }}><Loader2 size={18} /></div>
                  ) : (
                    <Zap size={18} />
                  )}
                  <span>{processing ? (t('cwProcessing') || 'Processing...') : ui.action}</span>
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
      
      {!videoFile && !pseoData && (
        <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px' }}>
          <WatermarkVideoHeroSection 
            section={{ type: 'hero', title: t('wmHero') || "Add Custom Watermark Logo to Video", content: t('wmHeroDesc') || "Protect your creative work by overlaying custom text or image watermarks onto your videos before sharing them online." }} 
          />
          <WatermarkVideoHowToSection 
            section={{
              type: 'howto',
              title: t('wmHowTo') || "How to Add a Watermark",
              steps: [
                { title: t('wmHowTo1') || "Upload Media", description: t('wmHowTo1Desc') || "Select your main video and your logo image file or type watermark text." },
                { title: t('wmHowTo2') || "Position Logo", description: t('wmHowTo2Desc') || "Choose where you want the watermark to appear, adjust scale and opacity with real-time preview." },
                { title: t('wmHowTo3') || "Process", description: t('wmHowTo3Desc') || "Export your video with the watermark permanently burned in." }
              ]
            }} 
          />
          <WatermarkVideoBrandSection 
            section={{ type: 'brand', title: t('wmBrand') || "Permanent Branding", content: t('wmBrandDesc') || "Once burned into the video, your watermark cannot be removed by simple cropping or metadata stripping." }} 
          />
          <WatermarkVideoPrivacySection 
            section={{ type: 'privacy', title: t('wmPriv') || "100% Secure & Private", content: t('wmPrivDesc') || "Your videos are never uploaded to any cloud server. The entire watermarking process runs securely inside your device." }} 
          />
        </div>
      )}
    </div>
  );
};
