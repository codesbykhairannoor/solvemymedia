import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';

export const CropVideo: React.FC = () => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  
  const t = {
    ratio: "Crop Aspect Ratio",
    desc: "Center-crop your video to a specific social media aspect ratio.",
    square: "1:1 (Square)",
    square_desc: "Perfect for Instagram Feed",
    vert: "9:16 (Vertical)",
    vert_desc: "For TikTok, Reels, Shorts",
    land: "16:9 (Landscape)",
    land_desc: "For YouTube or TV",
    action: "Crop Video"
  };

  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>('9:16');

  const handleProcess = async () => {
    if (!file) return;
    
    let cropFilter = '';
    if (aspectRatio === '1:1') {
      cropFilter = 'crop=min(iw\\,ih):min(iw\\,ih)';
    } else if (aspectRatio === '9:16') {
      cropFilter = 'crop=min(iw\\,ih*9/16):min(ih\\,iw*16/9)';
    } else if (aspectRatio === '16:9') {
      cropFilter = 'crop=min(iw\\,ih*16/9):min(ih\\,iw*9/16)';
    }

    const args = ['-i', file.name, '-vf', cropFilter, 'output.mp4'];
    const url = await runCustomFFmpeg([file], args, 'output.mp4', 'video/mp4');
    if (url) setOutputUrl(url);
  };

  const sidebarContent = (
    <>
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} className="text-brand-primary" />
          <span>{t.ratio}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{t.desc}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button 
            className={`tool-card glass-panel ${aspectRatio === '1:1' ? 'active' : ''}`}
            onClick={() => setAspectRatio('1:1')}
            disabled={processing || !!outputUrl}
            style={{ padding: 12, textAlign: 'left', border: aspectRatio === '1:1' ? '2px solid var(--brand-primary)' : '2px solid transparent', cursor: processing || !!outputUrl ? 'not-allowed' : 'pointer', opacity: processing || !!outputUrl ? 0.6 : 1 }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.square}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.square_desc}</div>
          </button>

          <button 
            className={`tool-card glass-panel ${aspectRatio === '9:16' ? 'active' : ''}`}
            onClick={() => setAspectRatio('9:16')}
            disabled={processing || !!outputUrl}
            style={{ padding: 12, textAlign: 'left', border: aspectRatio === '9:16' ? '2px solid var(--brand-primary)' : '2px solid transparent', cursor: processing || !!outputUrl ? 'not-allowed' : 'pointer', opacity: processing || !!outputUrl ? 0.6 : 1 }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.vert}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.vert_desc}</div>
          </button>

          <button 
            className={`tool-card glass-panel ${aspectRatio === '16:9' ? 'active' : ''}`}
            onClick={() => setAspectRatio('16:9')}
            disabled={processing || !!outputUrl}
            style={{ padding: 12, textAlign: 'left', border: aspectRatio === '16:9' ? '2px solid var(--brand-primary)' : '2px solid transparent', cursor: processing || !!outputUrl ? 'not-allowed' : 'pointer', opacity: processing || !!outputUrl ? 0.6 : 1 }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.land}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.land_desc}</div>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <CenteredActionWorkspace
      title="Crop Video Dimensions to Any Aspect Ratio"
      toolId="crop-video"
      file={file}
      onFileSelect={(f) => { setFile(f); setOutputUrl(null); }}
      outputUrl={outputUrl}
      processing={processing}
      progress={progress}
      engine="tier3"
      onProcess={handleProcess}
      processActionText={t.action}
      sidebarContent={sidebarContent}
      targetFormat="mp4"
      />

  
    </>
  );
};