import React, { useRef } from 'react';
import { UploadCloud, FileVideo, FileAudio, Trash2, Download, Loader2, Zap } from 'lucide-react';
import { smartHighlight } from '../../utils/textFormatting';
import { useLanguage } from '../../hooks/useLanguage';
import { getLocalizedSlug } from '../../i18n/slugs';

interface DualColumnWorkspaceProps {
  title: string;
  accept: string;
  file: File | null;
  setFile: (file: File | null) => void;
  outputUrl: string | null;
  processing: boolean;
  progress: number;
  engine: string | null;
  onProcess: () => void;
  processActionText: string;
  sidebarContent: React.ReactNode;
  targetFormat?: string;
  toolId?: string;
  description?: string;
}

export const DualColumnWorkspace: React.FC<DualColumnWorkspaceProps> = ({
  title,
  accept,
  file,
  setFile,
  outputUrl,
  processing,
  progress,
  engine,
  onProcess,
  processActionText,
  sidebarContent,
  targetFormat,
  toolId,
  description
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const ui = {
    upload_desc: "Upload your media below to process it directly in your browser without compromising privacy.",
    drag_drop: "Drag & drop video or",
    browse_files: "Browse Files",
    processing: "Processing...",
    download_result: "Download Result"
  };

  const { currentLang } = useLanguage();

  const getToolName = (id: string) => {
    const localized = getLocalizedSlug(id, currentLang);
    return localized.replace(/-/g, " ");
  };

  const finalTitle = toolId ? getToolName(toolId) : title;
  const finalDescription = description || ui.upload_desc;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const isVideo = accept.includes('video');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', paddingTop: !file ? '64px' : '0' }}>
      
      {!file && (
        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: 1200, margin: '0 auto 40px auto', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.15, fontFamily: 'Outfit, sans-serif', textTransform: 'capitalize' }}>
            {smartHighlight(finalTitle)}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
            {finalDescription}
          </p>
        </div>
      )}

      <div className="tool-workspace-container" style={{ margin: file ? '24px auto' : '0 auto' }}>
        <div className="tool-workspace-left glass-panel">
          {!file ? (
          <div 
            className="dropzone"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept={accept}
              style={{ display: 'none' }} 
            />
            <div className="dropzone-icon">
              <UploadCloud size={40} />
            </div>
            <p>{ui.drag_drop} <span className="browse-text">{ui.browse_files}</span></p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', padding: 24, position: 'relative' }}>
              <div style={{ textAlign: 'center' }}>
                {isVideo ? <FileVideo size={64} color="var(--brand-primary)" /> : <FileAudio size={64} color="var(--brand-primary)" />}
                <p style={{ marginTop: 16, fontWeight: 600 }}>{file.name}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
              {!processing && !outputUrl && (
                <button 
                  onClick={() => setFile(null)}
                  style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error-color)', border: 'none', padding: 8, borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            {processing && (
              <div style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 600 }}>Processing {progress}%</span>
                  {engine === 'tier1' && <span style={{ color: 'var(--warning-color)', fontSize: '0.85rem' }}>s GPU WebCodecs (MP4)</span>}
                  {engine === 'tier2' && <span style={{ color: 'var(--warning-color)', fontSize: '0.85rem' }}>s GPU WebCodecs (WebM)</span>}
                  {engine === 'tier3' && <span style={{ color: 'var(--text-accent)', fontSize: '0.85rem' }}>dY?O CPU WASM FFmpeg</span>}
                </div>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="tool-workspace-right glass-panel">
        <h3 style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border-color)', fontWeight: 800 }}>
          {finalTitle}
        </h3>
        
        {sidebarContent}
        
        <div style={{ marginTop: 'auto', paddingTop: 24 }}>
          {outputUrl ? (
            <a 
              href={outputUrl} 
              download={`processed_${file?.name.split('.')[0]}.${targetFormat || file?.name.split('.').pop()}`} 
              className="btn-primary" 
            >
              <Download size={18} />
              {ui.download_result}
            </a>
          ) : (
            <button
              onClick={onProcess}
              disabled={processing || !file}
              className="btn-primary"
            >
              {processing ? (
                <div style={{ animation: 'spin 1s linear infinite', display: 'flex' }}><Loader2 size={18} /></div>
              ) : (
                <Zap size={18} />
              )}
              <span>{processing ? ui.processing : processActionText}</span>
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};
