import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, FileVideo, FileAudio, Trash2, Download, Loader2, Zap, RefreshCw, FileEdit, RotateCcw } from 'lucide-react';
import { smartHighlight } from '../../utils/textFormatting';
import { useLanguage } from '../../hooks/useLanguage';

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
  const { currentLang, t } = useLanguage();

  const [customFileName, setCustomFileName] = useState<string>('');

  const defaultBaseName = file ? file.name.replace(/\.[^/.]+$/, '') : '';

  useEffect(() => {
    if (file) {
      setCustomFileName(file.name.replace(/\.[^/.]+$/, ''));
    } else {
      setCustomFileName('');
    }
  }, [file]);

  const ui = {
    upload_desc: t('cwUploadDesc') || "Upload your media below to process it directly in your browser without compromising privacy.",
    drag_drop: t('dragDrop') || "Drag & drop file or",
    browse_files: t('browseFiles') || "Browse Files",
    processing: t('cwProcessing') || "Processing...",
    download_result: t('cwDownload') || "Download Result"
  };

  const finalTitle = title;
  const finalDescription = description || ui.upload_desc;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isVideo = accept.includes('video') || (file?.type.includes('video') ?? true);
  const rawExt = targetFormat || file?.name.split('.').pop() || (isVideo ? 'mp4' : 'mp3');
  const finalExt = rawExt.replace(/^\./, '');
  const downloadFileName = `${(customFileName.trim() || defaultBaseName || 'processed')}.${finalExt}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', paddingTop: '40px' }}>
      
      <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: 1200, margin: '0 auto 32px auto', width: '100%' }}>
        <h1 style={{ 
          fontSize: file ? 'clamp(1.75rem, 4vw, 2.4rem)' : 'clamp(2.5rem, 5vw, 4rem)', 
          fontWeight: 900, 
          marginBottom: file ? 10 : 20, 
          letterSpacing: '-0.03em', 
          lineHeight: 1.15, 
          fontFamily: 'Outfit, sans-serif', 
          textTransform: 'capitalize',
          transition: 'font-size 0.25s ease, margin 0.25s ease'
        }}>
          {smartHighlight(finalTitle)}
        </h1>
        {!file && (
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
            {finalDescription}
          </p>
        )}
      </div>

      <div className="tool-workspace-container" style={{ margin: '0 auto' }}>
        {/* Hidden File Input for Drag & Drop and Replace */}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept={accept}
          style={{ display: 'none' }} 
        />

        <div className="tool-workspace-left glass-panel">
          {!file ? (
            <div 
              className="dropzone"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="dropzone-icon">
                <UploadCloud size={40} />
              </div>
              <p>{ui.drag_drop} <span className="browse-text">{ui.browse_files}</span></p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', padding: 24, position: 'relative' }}>
                <div style={{ textAlign: 'center' }}>
                  {isVideo ? <FileVideo size={64} color="var(--brand-primary)" /> : <FileAudio size={64} color="var(--brand-primary)" />}
                  <p style={{ marginTop: 16, fontWeight: 600, wordBreak: 'break-all' }}>{file.name}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>

                {!processing && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-secondary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)', background: 'rgba(var(--brand-primary-rgb), 0.1)', color: 'var(--brand-primary)', border: '1px solid rgba(var(--brand-primary-rgb), 0.25)', cursor: 'pointer', fontWeight: 600 }}
                    >
                      <RefreshCw size={14} />
                      {t('replaceFile') || 'Replace File'}
                    </button>
                    {!outputUrl && (
                      <button 
                        type="button"
                        onClick={() => setFile(null)}
                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error-color)', border: 'none', padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.85rem', fontWeight: 600 }}
                        title="Remove file"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {processing && (
                <div style={{ marginTop: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 600 }}>Processing {progress}%</span>
                    {engine === 'tier1' && <span style={{ color: 'var(--warning-color)', fontSize: '0.85rem' }}>⚡ GPU WebCodecs (MP4)</span>}
                    {engine === 'tier2' && <span style={{ color: 'var(--warning-color)', fontSize: '0.85rem' }}>⚡ GPU WebCodecs (WebM)</span>}
                    {engine === 'tier3' && <span style={{ color: 'var(--text-accent)', fontSize: '0.85rem' }}>🐌 CPU WASM FFmpeg</span>}
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
          
          {/* File Rename Field */}
          {file && (
            <div style={{ marginTop: 24, marginBottom: 16, background: 'var(--bg-input)', padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
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
                  .{finalExt}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '6px 0 0 0' }}>
                {t('renameFileHint') || 'Rename output file before downloading'}
              </p>
            </div>
          )}

          <div style={{ marginTop: 'auto', paddingTop: file ? 8 : 24 }}>
            {outputUrl ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a 
                  href={outputUrl} 
                  download={downloadFileName} 
                  className="btn-primary" 
                >
                  <Download size={18} />
                  {ui.download_result}
                </a>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 16px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}
                >
                  <RefreshCw size={15} />
                  {t('processAnother') || 'Process Another File'}
                </button>
              </div>
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
