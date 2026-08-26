import { WatermarkVideoHeroSection, WatermarkVideoHowToSection, WatermarkVideoBrandSection, WatermarkVideoPrivacySection } from '../components/content-sections/tools/WatermarkVideoSections';
import React, { useState, useRef } from 'react';
import { Image, FileVideo, Trash2, Download, Loader2, Zap, Settings2 } from 'lucide-react';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { smartHighlight } from '../utils/textFormatting';

import { useLanguage } from '../hooks/useLanguage';

export const WatermarkVideo: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { ready, processing, progress, runCustomFFmpeg } = useFFmpeg();
  const { t } = useLanguage();
  
  const ui = {
    pos: t('wmPos') || "Position",
    desc: t('wmDesc') || "Choose where the logo should appear on the video.",
    tl: t('wmTL') || "Top Left",
    tr: t('wmTR') || "Top Right",
    bl: t('wmBL') || "Bottom Left",
    br: t('wmBR') || "Bottom Right",
    c: t('wmC') || "Center",
    tiled: t('wmTiled') || "Tiled",
    scale: t('wmScale') || "Scale",
    opacity: t('wmOpac') || "Opacity",
    action: t('wmAction') || "Add Watermark",
    addVideo: t('dragDrop') || "Select Video",
    addLogo: t('browseFiles') || "Select Logo",
    applying: t('cwProcessing') || "Applying..."
  };

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [position, setPosition] = useState<string>('bottom-right');
  const [scale, setScale] = useState<number>(1.0);
  const [opacity, setOpacity] = useState<number>(1.0);
  const [videoRatio, setVideoRatio] = useState<number | null>(null);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleProcess = async () => {
    if (!videoFile || !imageFile) return;
    
    let baseWmFilter = `[1:v]format=rgba,colorchannelmixer=aa=${opacity},scale=iw*${scale}:-1[wm]`;
    let overlayFilter = '';

    if (position === 'tiled') {
       baseWmFilter = `[1:v]format=rgba,colorchannelmixer=aa=${opacity},scale=iw*${scale}:-1,split=5[wm1][wm2][wm3][wm4][wm5]`;
       overlayFilter = `[0:v][wm1]overlay=10:10[v1];[v1][wm2]overlay=W-w-10:10[v2];[v2][wm3]overlay=10:H-h-10[v3];[v3][wm4]overlay=W-w-10:H-h-10[v4];[v4][wm5]overlay=(W-w)/2:(H-h)/2`;
    } else {
      let overlayPos = '';
      if (position === 'bottom-right') overlayPos = 'W-w-10:H-h-10';
      else if (position === 'top-right') overlayPos = 'W-w-10:10';
      else if (position === 'top-left') overlayPos = '10:10';
      else if (position === 'bottom-left') overlayPos = '10:H-h-10';
      else if (position === 'center') overlayPos = '(W-w)/2:(H-h)/2';
      
      overlayFilter = `[0:v][wm]overlay=${overlayPos}`;
    }

    const args = ['-i', videoFile.name, '-i', imageFile.name, '-filter_complex', `${baseWmFilter};${overlayFilter}`, 'output.mp4'];
    
    const url = await runCustomFFmpeg([videoFile, imageFile], args, 'output.mp4', 'video/mp4');
    if (url) setOutputUrl(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', paddingTop: !videoFile ? '64px' : '0' }}>
      
      {!videoFile && (
        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: 1200, margin: '0 auto 40px auto', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.15, fontFamily: 'Outfit, sans-serif' }}>
            {smartHighlight(pseoData ? pseoData.h1 : (t('wmTitle') || 'Add Custom Watermark Logo to Video'))}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
            {pseoData ? pseoData.description : (t('wmSub') || "Protect your creative work by overlaying custom text or image watermarks onto your videos before sharing them online.")}
          </p>
        </div>
      )}

      <div className="tool-workspace-container" style={{ margin: videoFile ? '24px auto' : '0 auto' }}>
        <div className="tool-workspace-left glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        
        {/* Live Preview Area */}
        {videoFile && imageFile && !processing && !outputUrl && (
          <div style={{ width: '100%', background: '#000', borderRadius: 'var(--radius-md)', overflow: 'hidden', flex: 1, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ 
              position: 'relative', 
              aspectRatio: videoRatio ? `${videoRatio}` : '16/9',
              maxHeight: '100%',
              maxWidth: '100%',
              display: 'flex'
            }}>
              <video 
                src={URL.createObjectURL(videoFile)} 
                style={{ width: '100%', height: '100%', display: 'block' }} 
                autoPlay 
                loop 
                muted 
                onLoadedMetadata={(e) => setVideoRatio(e.currentTarget.videoWidth / e.currentTarget.videoHeight)}
              />
              {(() => {
                const renderPreviewImage = (posStyle: React.CSSProperties, key: string) => (
                  <img 
                    key={key}
                    src={URL.createObjectURL(imageFile)} 
                    style={{ 
                      position: 'absolute', 
                      maxWidth: '20%', 
                      maxHeight: '20%', 
                      objectFit: 'contain',
                      opacity: opacity,
                      ...posStyle
                    }} 
                    alt="Watermark Preview" 
                  />
                );

                if (position === 'tiled') {
                  return (
                    <>
                      {renderPreviewImage({ top: '10px', left: '10px', transform: `scale(${scale})` }, 'tl')}
                      {renderPreviewImage({ top: '10px', right: '10px', transform: `scale(${scale})` }, 'tr')}
                      {renderPreviewImage({ bottom: '10px', left: '10px', transform: `scale(${scale})` }, 'bl')}
                      {renderPreviewImage({ bottom: '10px', right: '10px', transform: `scale(${scale})` }, 'br')}
                      {renderPreviewImage({ top: '50%', left: '50%', transform: `translate(-50%, -50%) scale(${scale})` }, 'c')}
                    </>
                  );
                } else {
                  return renderPreviewImage({
                    top: position.includes('top') ? '10px' : position === 'center' ? '50%' : 'auto',
                    bottom: position.includes('bottom') ? '10px' : 'auto',
                    left: position.includes('left') ? '10px' : position === 'center' ? '50%' : 'auto',
                    right: position.includes('right') ? '10px' : 'auto',
                    transform: position === 'center' ? `translate(-50%, -50%) scale(${scale})` : `scale(${scale})`,
                  }, 'single');
                }
              })()}
            </div>
          </div>
        )}

        {/* Video Upload */}
        {!videoFile ? (
          <div className="dropzone" style={{ flex: 1 }} onClick={() => videoInputRef.current?.click()}>
            <input type="file" ref={videoInputRef} onChange={(e) => { if(e.target.files) setVideoFile(e.target.files[0]); setOutputUrl(null); }} style={{ display: 'none' }} />
            <FileVideo size={32} color="var(--brand-primary)" style={{ marginBottom: 8 }} />
            <p style={{ fontSize: '0.95rem' }}>{ui.addVideo}</p>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-input)', padding: 16, borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: 12, borderRadius: '50%' }}>
                <FileVideo size={24} color="var(--brand-primary)" />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>{videoFile.name}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
            {!processing && !outputUrl && (
              <button onClick={() => setVideoFile(null)} style={{ background: 'transparent', border: 'none', color: 'var(--error-color)', cursor: 'pointer', padding: 8 }}>
                <Trash2 size={20} />
              </button>
            )}
          </div>
        )}

        {/* Logo Upload */}
        {!imageFile ? (
          <div className="dropzone" style={{ flex: 1 }} onClick={() => imageInputRef.current?.click()}>
            <input type="file" ref={imageInputRef} onChange={(e) => { if(e.target.files) setImageFile(e.target.files[0]); setOutputUrl(null); }} style={{ display: 'none' }} />
            <Image size={32} color="var(--brand-secondary)" style={{ marginBottom: 8 }} />
            <p style={{ fontSize: '0.95rem' }}>{ui.addLogo}</p>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-input)', padding: 16, borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: 12, borderRadius: '50%' }}>
                <Image size={24} color="var(--brand-secondary)" />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>{imageFile.name}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>{(imageFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
            {!processing && !outputUrl && (
              <button onClick={() => setImageFile(null)} style={{ background: 'transparent', border: 'none', color: 'var(--error-color)', cursor: 'pointer', padding: 8 }}>
                <Trash2 size={20} />
              </button>
            )}
          </div>
        )}

        {processing && (
          <div style={{ marginTop: 8, padding: 24, background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontWeight: 600 }}>{ui.applying} {progress}%</span>
            </div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="tool-workspace-right glass-panel">
        <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Settings2 size={18} className="text-brand-primary" />
            <span>{ui.pos}</span>
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{ui.desc}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
            {[
              { id: 'top-left', label: ui.tl },
              { id: 'top-right', label: ui.tr },
              { id: 'bottom-left', label: ui.bl },
              { id: 'bottom-right', label: ui.br },
              { id: 'center', label: ui.c },
              { id: 'tiled', label: ui.tiled }
            ].map(pos => (
              <button 
                key={pos.id} 
                className={`option-btn ${position === pos.id ? 'active' : ''}`} 
                onClick={() => setPosition(pos.id)} 
                disabled={processing || !!outputUrl} 
                style={{ padding: 12 }}
              >
                {pos.label}
              </button>
            ))}
          </div>

        {/* Sliders */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem', fontWeight: 600 }}>
            <span>{ui.scale}</span>
            <span>{(scale * 100).toFixed(0)}%</span>
          </div>
          <input 
            type="range" 
            min="0.1" 
            max="3.0" 
            step="0.1" 
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            disabled={processing || !!outputUrl}
            style={{ width: '100%', accentColor: 'var(--brand-primary)' }}
          />
        </div>

        <div style={{ marginBottom: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem', fontWeight: 600 }}>
            <span>{ui.opacity}</span>
            <span>{(opacity * 100).toFixed(0)}%</span>
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

        <div style={{ marginTop: 'auto', paddingTop: 24 }}>
          {outputUrl ? (
            <a 
              href={outputUrl} 
              download={`watermarked_${new Date().getTime()}.mp4`} 
              className="btn-primary" 
            >
              <Download size={18} />
              Download Result
            </a>
          ) : (
            <button
              onClick={handleProcess}
              disabled={processing || !videoFile || !imageFile || !ready}
              className="btn-primary"
            >
              {processing ? (
                <div style={{ animation: 'spin 1s linear infinite', display: 'flex' }}><Loader2 size={18} /></div>
              ) : (
                <Zap size={18} />
              )}
              <span>{processing ? ('Processing...') : ui.action}</span>
            </button>
          )}
        </div>
        </div>
      </div>
      </div>
      
      {!pseoData && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px' }}>
        <WatermarkVideoHeroSection 
          section={{ type: 'hero', title: t('wmHero') || "Add Custom Watermark Logo to Video", content: t('wmHeroDesc') || "Protect your creative work by overlaying custom text or image watermarks onto your videos before sharing them online." }} 
        />
        <WatermarkVideoHowToSection 
          section={{
            type: 'howto',
            title: t('wmHowTo') || "How to Add a Watermark",
            steps: [
              { title: t('wmHowTo1') || "Upload Media", description: t('wmHowTo1Desc') || "Select your main video and your logo image file." },
              { title: t('wmHowTo2') || "Position Logo", description: t('wmHowTo2Desc') || "Choose where you want the watermark to appear and set opacity." },
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
