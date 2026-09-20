import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, FileVideo, FileAudio, Trash2, Download, Loader2, Zap, RefreshCw, FileEdit, RotateCcw } from 'lucide-react';
import { smartHighlight } from '../../utils/textFormatting';
import { useLanguage } from '../../hooks/useLanguage';
import { MediaLivePreview } from '../preview/MediaLivePreview';

interface CenteredActionWorkspaceProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  outputUrl: string | null;
  onResetResult?: () => void;
  processing: boolean;
  progress: number;
  engine: string | null;
  onProcess: () => void;
  processActionText: string;
  sidebarContent: React.ReactNode;
  targetFormat?: string;
  title?: string;
  toolId?: string;
  description?: string;
}

export const CenteredActionWorkspace: React.FC<CenteredActionWorkspaceProps> = ({
  file,
  onFileSelect,
  outputUrl,
  onResetResult,
  processing,
  progress,
  engine,
  onProcess,
  processActionText,
  sidebarContent,
  targetFormat,
  title,
  toolId,
  description
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

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
    drag_drop: t('dragDrop') || "Drag & drop file or",
    browse_files: t('browseFiles') || "Browse Files",
    processing: t('cwProcessing') || "Processing...",
    download_result: t('cwDownload') || "Download Result",
    upload_desc: t('cwUploadDesc') || "Upload your media below to process it directly in your browser without compromising privacy."
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isVideo = file?.type.includes('video') || (file ? !file.type.includes('audio') : true);
  const accept = 'video/*,audio/*';
  const finalTitle = title;
  const rawExt = targetFormat || file?.name.split('.').pop() || (isVideo ? 'mp4' : 'mp3');
  const finalExt = rawExt.replace(/^\./, '');
  const downloadFileName = `${(customFileName.trim() || defaultBaseName || 'processed')}.${finalExt}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', paddingTop: '40px' }}>
      
      {finalTitle && (
        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: 1200, margin: '0 auto 32px auto', width: '100%' }}>
          <h1 style={{ 
            fontSize: file ? 'clamp(1.75rem, 4vw, 2.4rem)' : 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 900, 
            marginBottom: file ? 10 : 20, 
            letterSpacing: '-0.03em', 
            lineHeight: 1.15, 
            fontFamily: 'Outfit, sans-serif',
            transition: 'font-size 0.25s ease, margin 0.25s ease'
          }}>
            {smartHighlight(finalTitle)}
          </h1>
          {!file && (
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
              {description || `${ui.drag_drop} ${ui.browse_files}`}
            </p>
          )}
        </div>
      )}

      <div className="tool-workspace-container" style={{ margin: '0 auto' }}>
        {/* Hidden File Input */}
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
            <MediaLivePreview
              file={file}
              outputUrl={outputUrl}
              targetFormat={targetFormat}
              processing={processing}
              progress={progress}
              engine={engine}
              onReplace={() => fileInputRef.current?.click()}
              onRemove={() => onFileSelect(null)}
            />
          )}
        </div>

        <div className="tool-workspace-right glass-panel">
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
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onResetResult) {
                        onResetResult();
                      } else {
                        onFileSelect(file);
                      }
                    }}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'rgba(var(--brand-primary-rgb), 0.1)', border: '1px solid rgba(var(--brand-primary-rgb), 0.25)', color: 'var(--brand-primary)', fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    <RotateCcw size={15} />
                    {t('repeatProcess') || 'Repeat Process'}
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    <RefreshCw size={15} />
                    {t('processAnother') || 'Process Another File'}
                  </button>
                </div>
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
