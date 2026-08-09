import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useUniversalCompressor } from '../hooks/useUniversalCompressor';

export const ConvertVideoToAudio: React.FC = () => {
  const { processing, progress, engine, processMedia } = useUniversalCompressor();
  
  const t = {
    format: "Target Audio Format",
    desc: "Select the format you want to extract the audio into.",
    action: "Extract to"
  };

  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('mp3');

  const handleProcess = async () => {
    if (!file) return;
    // Extracting audio, use 'high' quality default
    const url = await processMedia(file, 100, targetFormat);
    if (url) setOutputUrl(url);
  };

  const sidebarContent = (
    <>
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} className="text-brand-primary" />
          <span>{t.format}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{t.desc}</p>
        
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className={`tab-btn ${targetFormat === 'mp3' ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setTargetFormat('mp3')}>.mp3</button>
          <button className={`tab-btn ${targetFormat === 'wav' ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setTargetFormat('wav')}>.wav</button>
          <button className={`tab-btn ${targetFormat === 'aac' ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setTargetFormat('aac')}>.aac</button>
          <button className={`tab-btn ${targetFormat === 'ogg' ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setTargetFormat('ogg')}>.ogg</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <CenteredActionWorkspace
      title="Extract Audio from Video"
      toolId="video-to-audio"
      file={file}
      onFileSelect={setFile}
      outputUrl={outputUrl}
      processing={processing}
      progress={progress}
      engine={engine}
      onProcess={handleProcess}
      processActionText={`${t.action} ${targetFormat.toUpperCase()}`}
      sidebarContent={sidebarContent}
      targetFormat={targetFormat}
      />

  
    </>
  );
};