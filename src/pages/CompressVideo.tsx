import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { DualColumnWorkspace } from '../components/workspaces/DualColumnWorkspace';
import { useUniversalCompressor } from '../hooks/useUniversalCompressor';
import type { Quality } from '../hooks/useUniversalCompressor';

export const CompressVideo: React.FC = () => {
  const { processing, progress, engine, processMedia } = useUniversalCompressor();
  
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<Quality>(60);
  const [realSizeMB, setRealSizeMB] = useState<number | null>(null);
  
  const t = {
    settings: "Compression Settings",
    desc: "Choose compression target. Lower quality means smaller file size.",
    extreme: "Extreme Size",
    balanced: "Balanced",
    high: "High Quality"
  };

  React.useEffect(() => {
    if (outputUrl) {
      fetch(outputUrl)
        .then(res => res.blob())
        .then(blob => setRealSizeMB(blob.size / (1024 * 1024)))
        .catch(() => setRealSizeMB(null));
    } else {
      setRealSizeMB(null);
    }
  }, [outputUrl]);

  const handleProcess = async () => {
    if (!file) return;
    // Compress Video keeps original format ideally, but WebCodecs targets mp4/webm. 
    // We'll target mp4 by default for compression.
    const url = await processMedia(file, quality, 'mp4');
    if (url) setOutputUrl(url);
  };

  const getEstimatedSize = () => {
    if (!file) return null;
    const origMB = file.size / (1024 * 1024);
    
    if (realSizeMB !== null) {
      const savedPercent = Math.round((1 - (realSizeMB / origMB)) * 100);
      return {
        orig: origMB,
        est: realSizeMB,
        saved: savedPercent,
        isReal: true
      };
    }
    
    const ratio = 0.3 + (0.7 * (quality / 100)); // 0.3 to 1.0
    return {
      orig: origMB,
      est: origMB * ratio,
      saved: Math.round((1 - ratio) * 100),
      isReal: false
    };
  };

  const est = getEstimatedSize();

  const sidebarContent = (
    <>
      {est && (
        <div style={{ background: 'var(--bg-input)', padding: 16, borderRadius: 'var(--radius-md)', marginBottom: 24, border: '1px solid var(--brand-glow)' }}>
          <h4 style={{ fontSize: '0.9rem', color: est.isReal ? 'var(--brand-primary)' : 'var(--text-muted)', marginBottom: 12, fontWeight: est.isReal ? 700 : 500 }}>
            {est.isReal ? '🎉 Actual Result' : 'Estimated Result'}
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Original Size</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)', textDecoration: 'line-through' }}>{est.orig.toFixed(1)} MB</div>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand-secondary)' }}>👉</div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{est.isReal ? 'Actual Size' : 'Target Size'}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: est.saved > 0 ? 'var(--success-color)' : 'var(--warning-color)' }}>
                {est.isReal ? '' : '~'}{est.est.toFixed(1)} MB
              </div>
            </div>
          </div>
          <div style={{ fontSize: '0.8rem', color: est.saved > 0 ? 'var(--success-color)' : 'var(--warning-color)', textAlign: 'center', background: est.saved > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', padding: '4px 8px', borderRadius: 4, fontWeight: 600 }}>
            {est.saved > 0 ? `Saved ${est.saved}% storage!` : `Increased by ${Math.abs(est.saved)}%`}
          </div>
        </div>
      )}
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} className="text-brand-primary" />
          <span>{t.settings}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 12 }}>{t.desc}</p>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontWeight: 700, color: 'var(--text-main)' }}>
          <span>Quality: {quality}%</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="100" 
          step="1" 
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          disabled={processing || !!outputUrl}
          style={{
            width: '100%',
            cursor: processing || !!outputUrl ? 'not-allowed' : 'pointer',
            opacity: processing || !!outputUrl ? 0.6 : 1,
            accentColor: 'var(--brand-primary)'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>{t.extreme}</span>
          <span>{t.balanced}</span>
          <span>{t.high}</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      <DualColumnWorkspace
      accept="video/*"
      title="Compress Video Files without Losing Quality"
      toolId="compress-video"
      file={file}
      setFile={setFile}
      outputUrl={outputUrl}
      processing={processing}
      progress={progress}
      engine={engine}
      onProcess={handleProcess}
      processActionText="Compress Video"
      sidebarContent={sidebarContent}
      targetFormat="mp4"
      />

  
    </>
  );
};