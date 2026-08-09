import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useUniversalCompressor } from '../hooks/useUniversalCompressor';

export const ConvertVideo: React.FC = () => {
  const { processing, progress, engine, processMedia } = useUniversalCompressor();
  
  const ui = { target_format: "Target Format", select_format: "Select the format you want to convert this video into.", convert_mp4: "Convert to MP4" };
  
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('mp4');

  const handleProcess = async () => {
    if (!file) return;
    // For conversion, use 'high' quality to avoid losing quality
    const url = await processMedia(file, 100, targetFormat);
    if (url) setOutputUrl(url);
  };

  const sidebarContent = (
    <>
      
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} className="text-brand-primary" />
          <span>{ui.target_format}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{ui.select_format}</p>
        
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className={`tab-btn ${targetFormat === 'mp4' ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setTargetFormat('mp4')}>.mp4</button>
          <button className={`tab-btn ${targetFormat === 'webm' ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setTargetFormat('webm')}>.webm</button>
          <button className={`tab-btn ${targetFormat === 'mkv' ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setTargetFormat('mkv')}>.mkv</button>
          <button className={`tab-btn ${targetFormat === 'avi' ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setTargetFormat('avi')}>.avi</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <CenteredActionWorkspace
      title="Convert Video Formats Fast"
      toolId="convert-video"
      file={file}
      onFileSelect={setFile}
      outputUrl={outputUrl}
      processing={processing}
      progress={progress}
      engine={engine}
      onProcess={handleProcess}
      processActionText={targetFormat === 'mp4' ? ui.convert_mp4 : ui.convert_mp4.replace('MP4', targetFormat.toUpperCase())}
      sidebarContent={sidebarContent}
      targetFormat={targetFormat}
      />

  
    </>
  );
};