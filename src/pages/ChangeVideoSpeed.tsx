import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { DualColumnWorkspace } from '../components/workspaces/DualColumnWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';

export const ChangeVideoSpeed: React.FC = () => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  
  const t = {
    factor: "Speed Factor",
    desc: "Change video playback speed without distorting audio pitch.",
    slow: "Slow (0.5x)",
    norm: "Normal (1.0x)",
    fast: "Fast (2.0x)",
    change: "Change Speed"
  };
  
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [speed, setSpeed] = useState<number>(1.5);

  const handleProcess = async () => {
    if (!file) return;
    const vpts = (1 / speed).toFixed(2);
    // atempo only supports 0.5 to 2.0
    const args = [
      '-i', file.name,
      '-filter_complex', `[0:v]setpts=${vpts}*PTS[v];[0:a]atempo=${speed}[a]`,
      '-map', '[v]',
      '-map', '[a]',
      'output.mp4'
    ];
    const url = await runCustomFFmpeg([file], args, 'output.mp4', 'video/mp4');
    if (url) setOutputUrl(url);
  };

  const sidebarContent = (
    <>
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} className="text-brand-primary" />
          <span>{t.factor}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{t.desc}</p>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontWeight: 700, color: 'var(--text-main)' }}>
          <span>{speed.toFixed(1)}x</span>
        </div>
        <input 
          type="range" 
          min="0.5" 
          max="2.0" 
          step="0.1" 
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={processing || !!outputUrl}
          style={{
            width: '100%',
            cursor: processing || !!outputUrl ? 'not-allowed' : 'pointer',
            opacity: processing || !!outputUrl ? 0.6 : 1,
            accentColor: 'var(--brand-primary)'
          }}
        />
        <div style={{ display: 'flex', gap: '8px', marginTop: 12 }}>
          <button className={`tab-btn ${speed === 0.5 ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setSpeed(0.5)}>{t.slow}</button>
          <button className={`tab-btn ${speed === 1.0 ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setSpeed(1.0)}>{t.norm}</button>
          <button className={`tab-btn ${speed === 2.0 ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setSpeed(2.0)}>{t.fast}</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <DualColumnWorkspace
      accept="video/*"
      title="Speed Up or Slow Down Video Playback"
      toolId="change-video-speed"
      file={file}
      setFile={(f) => { setFile(f); setOutputUrl(null); }}
      outputUrl={outputUrl}
      processing={processing}
      progress={progress}
      engine="tier3"
      onProcess={handleProcess}
      processActionText={t.change}
      sidebarContent={sidebarContent}
      targetFormat="mp4"
      />

  
    </>
  );
};