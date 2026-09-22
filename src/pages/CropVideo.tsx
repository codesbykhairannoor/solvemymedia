import { CropVideoHeroSection, CropVideoHowToSection, CropVideoPlatformSection, CropVideoPrivacySection } from '../components/content-sections/tools/CropVideoSections';
import React, { useState, useRef, useCallback } from 'react';
import { Settings2, Move, AlignCenter, AlignLeft, AlignRight, Smartphone, Square, Monitor, Film, Tablet } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { useLanguage } from '../hooks/useLanguage';

interface CropPreset {
  id: string;
  name: string;
  ratio: number;
  icon: React.ReactNode;
}

export const CropVideo: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  const { t } = useLanguage();
  
  const ui = {
    ratio: t('cropRatio') || "Crop Aspect Ratio",
    desc: t('cropDesc') || "Select an aspect ratio or drag the frame to compose your shot.",
    action: t('cropAction') || "Crop Video"
  };

  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>('9:16');
  const [cropOffset, setCropOffset] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);
  const [currentDimensions, setCurrentDimensions] = useState<{ width: number; height: number } | null>(null);

  const dragStartRef = useRef<{
    startX: number;
    startY: number;
    initialOffset: { x: number; y: number };
  } | null>(null);

  const presets: CropPreset[] = [
    { id: '9:16', name: '9:16', ratio: 9 / 16, icon: <Smartphone size={16} /> },
    { id: '1:1', name: '1:1', ratio: 1 / 1, icon: <Square size={16} /> },
    { id: '16:9', name: '16:9', ratio: 16 / 9, icon: <Monitor size={16} /> },
    { id: '4:5', name: '4:5', ratio: 4 / 5, icon: <Tablet size={16} /> },
    { id: '4:3', name: '4:3', ratio: 4 / 3, icon: <Monitor size={16} /> },
    { id: '21:9', name: '21:9', ratio: 21 / 9, icon: <Film size={16} /> }
  ];

  const activePreset = presets.find(p => p.id === aspectRatio) || presets[0];

  // Calculate crop box geometry in percentages and target pixels
  const getCropMetrics = useCallback(() => {
    const nw = currentDimensions?.width || 1920;
    const nh = currentDimensions?.height || 1080;
    const nativeAspect = nw / nh;
    const targetAspect = activePreset.ratio;

    let cropWPct: number;
    let cropHPct: number;

    if (targetAspect > nativeAspect) {
      cropWPct = 100;
      cropHPct = (nativeAspect / targetAspect) * 100;
    } else {
      cropHPct = 100;
      cropWPct = (targetAspect / nativeAspect) * 100;
    }

    const maxXPct = Math.max(0, 100 - cropWPct);
    const maxYPct = Math.max(0, 100 - cropHPct);

    const leftPct = maxXPct * cropOffset.x;
    const topPct = maxYPct * cropOffset.y;

    // Actual pixels for FFmpeg
    const cropW = Math.max(2, Math.floor((nw * (cropWPct / 100)) / 2) * 2);
    const cropH = Math.max(2, Math.floor((nh * (cropHPct / 100)) / 2) * 2);
    const cropX = Math.max(0, Math.min(nw - cropW, Math.floor((nw * (leftPct / 100)) / 2) * 2));
    const cropY = Math.max(0, Math.min(nh - cropH, Math.floor((nh * (topPct / 100)) / 2) * 2));

    return {
      cropWPct,
      cropHPct,
      maxXPct,
      maxYPct,
      leftPct,
      topPct,
      cropW,
      cropH,
      cropX,
      cropY,
      nw,
      nh
    };
  }, [currentDimensions, activePreset, cropOffset]);

  const metrics = getCropMetrics();

  const handleProcess = async () => {
    if (!file) return;
    
    const { cropW, cropH, cropX, cropY } = metrics;
    const cropFilter = `crop=${cropW}:${cropH}:${cropX}:${cropY}`;

    const args = [
      '-i', file.name,
      '-vf', cropFilter,
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-preset', 'fast',
      '-movflags', '+faststart',
      '-c:a', 'aac',
      '-b:a', '192k',
      'output.mp4'
    ];
    const url = await runCustomFFmpeg([file], args, 'output.mp4', 'video/mp4');
    if (url) setOutputUrl(url);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialOffset: { ...cropOffset }
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

    const newOffsetX = metrics.maxXPct > 0 
      ? Math.max(0, Math.min(1, dragStartRef.current.initialOffset.x + deltaXPct / metrics.maxXPct))
      : 0.5;

    const newOffsetY = metrics.maxYPct > 0 
      ? Math.max(0, Math.min(1, dragStartRef.current.initialOffset.y + deltaYPct / metrics.maxYPct))
      : 0.5;

    setCropOffset({ x: newOffsetX, y: newOffsetY });
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

  const renderVideoOverlay = ({ videoDimensions, containerRef }: {
    videoDimensions: { width: number; height: number } | null;
    videoElement: HTMLVideoElement | null;
    containerRef: React.RefObject<HTMLDivElement | null>;
  }) => {
    if (videoDimensions && (!currentDimensions || currentDimensions.width !== videoDimensions.width || currentDimensions.height !== videoDimensions.height)) {
      setTimeout(() => setCurrentDimensions(videoDimensions), 0);
    }

    return (
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
        onPointerMove={(e) => handlePointerMove(e, containerRef)}
        onPointerUp={handlePointerUp}
      >
        {/* Dynamic Visual Crop Box */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={(e) => handlePointerMove(e, containerRef)}
          onPointerUp={handlePointerUp}
          style={{
            position: 'absolute',
            left: `${metrics.leftPct}%`,
            top: `${metrics.topPct}%`,
            width: `${metrics.cropWPct}%`,
            height: `${metrics.cropHPct}%`,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.65)',
            border: '2px solid var(--brand-primary)',
            boxSizing: 'border-box',
            cursor: isDragging ? 'grabbing' : 'grab',
            pointerEvents: 'auto',
            transition: isDragging ? 'none' : 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
            zIndex: 10
          }}
        >
          {/* Viewfinder Corner Accents */}
          <div style={{ position: 'absolute', top: -2, left: -2, width: 14, height: 14, borderTop: '3px solid #fff', borderLeft: '3px solid #fff', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: -2, right: -2, width: 14, height: 14, borderTop: '3px solid #fff', borderRight: '3px solid #fff', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -2, left: -2, width: 14, height: 14, borderBottom: '3px solid #fff', borderLeft: '3px solid #fff', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -2, right: -2, width: 14, height: 14, borderBottom: '3px solid #fff', borderRight: '3px solid #fff', pointerEvents: 'none' }} />

          {/* Rule of Thirds Grid Lines */}
          <div style={{ position: 'absolute', left: '33.33%', top: 0, bottom: 0, width: 1, borderLeft: '1px dashed rgba(255, 255, 255, 0.25)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: '66.66%', top: 0, bottom: 0, width: 1, borderLeft: '1px dashed rgba(255, 255, 255, 0.25)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: 1, borderTop: '1px dashed rgba(255, 255, 255, 0.25)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '66.66%', left: 0, right: 0, height: 1, borderTop: '1px dashed rgba(255, 255, 255, 0.25)', pointerEvents: 'none' }} />

          {/* Floating HUD Tag: Current Crop Dimensions */}
          <div style={{
            position: 'absolute',
            top: 8,
            left: 8,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            fontSize: '0.72rem',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: 4,
            border: '1px solid rgba(var(--brand-primary-rgb), 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap'
          }}>
            <span style={{ color: 'var(--brand-primary)' }}>{activePreset.id}</span>
            <span>•</span>
            <span>{metrics.cropW} × {metrics.cropH}</span>
          </div>

          {/* Subtle Drag Indicator */}
          <div style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            background: 'rgba(0, 0, 0, 0.65)',
            color: 'var(--text-muted)',
            padding: '2px 6px',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: '0.65rem',
            pointerEvents: 'none'
          }}>
            <Move size={10} />
            <span>Drag</span>
          </div>
        </div>
      </div>
    );
  };

  const sidebarContent = (
    <div>
      <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Settings2 size={18} className="text-brand-primary" />
        <span>{ui.ratio}</span>
      </h4>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{ui.desc}</p>
      
      {/* Aspect Ratio Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
        {presets.map((preset) => {
          const isSelected = aspectRatio === preset.id;
          return (
            <button 
              key={preset.id}
              className={`option-btn ${isSelected ? 'active' : ''}`}
              onClick={() => {
                setAspectRatio(preset.id);
                setCropOffset({ x: 0.5, y: 0.5 });
              }}
              disabled={processing || !!outputUrl}
              style={{
                padding: '11px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: processing || !!outputUrl ? 'not-allowed' : 'pointer',
                opacity: processing || !!outputUrl ? 0.6 : 1
              }}
            >
              <span style={{ color: isSelected ? 'var(--brand-primary)' : 'var(--text-muted)' }}>{preset.icon}</span>
              <span>{preset.name}</span>
            </button>
          );
        })}
      </div>

      {/* Quick Framing / Alignment Buttons */}
      <div style={{ marginBottom: 20, background: 'var(--bg-input)', padding: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{t('frameAlignment') || 'Frame Alignment'}</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t('frameAlignmentHint') || 'Drag box on preview or snap'}</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            type="button"
            className="option-btn"
            onClick={() => setCropOffset(prev => ({ ...prev, x: 0, y: 0 }))}
            disabled={processing || !!outputUrl}
            style={{ flex: 1, padding: '6px 8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
          >
            <AlignLeft size={13} />
            <span>{metrics.maxXPct > 0 ? (t('alignLeft') || 'Left') : (t('alignTop') || 'Top')}</span>
          </button>
          <button
            type="button"
            className={`option-btn ${cropOffset.x === 0.5 && cropOffset.y === 0.5 ? 'active' : ''}`}
            onClick={() => setCropOffset({ x: 0.5, y: 0.5 })}
            disabled={processing || !!outputUrl}
            style={{ flex: 1, padding: '6px 8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
          >
            <AlignCenter size={13} />
            <span>{t('alignCenter') || 'Center'}</span>
          </button>
          <button
            type="button"
            className="option-btn"
            onClick={() => setCropOffset(prev => ({ ...prev, x: 1, y: 1 }))}
            disabled={processing || !!outputUrl}
            style={{ flex: 1, padding: '6px 8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
          >
            <AlignRight size={13} />
            <span>{metrics.maxXPct > 0 ? (t('alignRight') || 'Right') : (t('alignBottom') || 'Bottom')}</span>
          </button>
        </div>
      </div>

      {/* Output Specs Box */}
      <div style={{ background: 'var(--bg-input)', padding: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
        <span style={{ color: 'var(--text-muted)' }}>{t('targetResolution') || 'Target Resolution:'}</span>
        <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>
          {metrics.cropW} × {metrics.cropH} ({activePreset.id})
        </span>
      </div>
    </div>
  );

  return (
    <>
      <CenteredActionWorkspace
        title={pseoData ? pseoData.h1 : (t('cropTitle') || "Crop Video Dimensions to Any Aspect Ratio")}
        description={pseoData ? pseoData.description : (t('cropSub') || "Crop and resize your videos easily with our visual cropper. All processing happens securely on your own device.")}
        toolId="crop-video"
        file={file}
        onFileSelect={(f) => { 
          setFile(f); 
          setOutputUrl(null); 
          setCurrentDimensions(null);
          setCropOffset({ x: 0.5, y: 0.5 });
        }}
        outputUrl={outputUrl}
        onResetResult={() => setOutputUrl(null)}
        processing={processing}
        progress={progress}
        engine="tier3"
        onProcess={handleProcess}
        processActionText={ui.action}
        sidebarContent={sidebarContent}
        targetFormat="mp4"
        videoOverlay={renderVideoOverlay}
      />

      {!file && !pseoData && (
        <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px' }}>
          <CropVideoHeroSection 
            section={{ type: 'hero', title: t('cropHero') || "Crop Video Perfectly", content: t('cropHeroDesc') || "Trim out the edges of your video for TikTok, Reels, and YouTube Shorts instantly without watermarks." }} 
          />
          <CropVideoHowToSection 
            section={{
              type: 'howto',
              title: t('cropHowTo') || "How to Crop Videos",
              steps: [
                { title: t('cropHowTo1') || "Select a Video", description: t('cropHowTo1Desc') || "Choose any video file from your local device." },
                { title: t('cropHowTo2') || "Pick Aspect Ratio", description: t('cropHowTo2Desc') || "Select the desired format like 9:16 vertical or 1:1 square, or drag the frame." },
                { title: t('cropHowTo3') || "Crop & Export", description: t('cropHowTo3Desc') || "Hit crop and your video will be instantly ready for download." }
              ]
            }} 
          />
          <CropVideoPlatformSection 
            section={{ type: 'platform', title: t('cropPlat') || "Social Media Ready", content: t('cropPlatDesc') || "Perfectly align your video dimensions for any social platform and ensure it looks professional." }} 
          />
          <CropVideoPrivacySection 
            section={{ type: 'privacy', title: t('cropPriv') || "Secure Local Processing", content: t('cropPrivDesc') || "Your video files are strictly kept on your local machine and never uploaded or stored anywhere else." }} 
          />
        </div>
      )}
    </>
  );
};