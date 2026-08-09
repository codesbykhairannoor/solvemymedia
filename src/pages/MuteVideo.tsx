import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';

export const MuteVideo: React.FC = () => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  
  const t = {
    remove: "Remove Audio",
    desc: "This tool instantly strips all audio tracks from your video. The video quality is completely preserved.",
    fast: "Lightning Fast! ⚡",
    fast_desc: "This process does not re-encode your video, so it will finish in less than a second.",
    action: "Mute Video"
  };

  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!file) return;
    const args = ['-i', file.name, '-c', 'copy', '-an', 'output.mp4'];
    const url = await runCustomFFmpeg([file], args, 'output.mp4', 'video/mp4');
    if (url) setOutputUrl(url);
  };

  const sidebarContent = (
    <>
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} className="text-brand-primary" />
          <span>{t.remove}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{t.desc}</p>
      </div>
      
      <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(16, 185, 129, 0.2)', color: 'var(--success-color)', fontSize: '0.9rem' }}>
        <strong style={{ display: 'block', marginBottom: 4 }}>{t.fast}</strong>
        {t.fast_desc}
      </div>
    </>
  );

  return (
    <>
      <CenteredActionWorkspace
      title="Remove Audio from Video Completely"
      toolId="mute-video"
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