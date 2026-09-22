import { TranscribeMediaHeroSection, TranscribeMediaHowToSection, TranscribeMediaPerformanceSection, TranscribeMediaPrivacySection } from '../components/content-sections/tools/TranscribeMediaSections';
import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, FileVideo, FileAudio, Trash2, Copy, Loader2, PlayCircle, FileText, RefreshCw, Download, FileEdit, RotateCcw, Search, X } from 'lucide-react';
import { useWhisper } from '../hooks/useWhisper';
import { smartHighlight } from '../utils/textFormatting';
import { useLanguage } from '../hooks/useLanguage';
import { MediaLivePreview } from '../components/preview/MediaLivePreview';
import { useWorkspace } from '../contexts/WorkspaceContext';

export const TranscribeMedia: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { ready, loadingProgress, processing, resultText, error, transcribe, initModel } = useWhisper();
  const { t: translate } = useLanguage();
  const { setHasActiveFile } = useWorkspace();
  
  const t = {
    upload: translate('transDesc') || "Upload your audio or video file below to transcribe it to text securely in your browser using AI.",
    result: translate('transResult') || "Transcription Result",
    placeholder: translate('transPlaceholder') || "Transcription will appear here.",
    action: translate('transAction') || "Start Transcription"
  };

  const finalTitle = pseoData ? pseoData.h1 : (translate('transTitle') || 'Transcribe Audio & Video Offline');
  const finalDesc = pseoData ? pseoData.description : t.upload;

  const [file, setFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('onnx-community/whisper-base');
  const [language, setLanguage] = useState<string>('indonesian');
  const [customFileName, setCustomFileName] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const defaultBaseName = file ? file.name.replace(/\.[^/.]+$/, '') : '';

  useEffect(() => {
    setHasActiveFile(!!file);
    return () => setHasActiveFile(false);
  }, [file, setHasActiveFile]);

  useEffect(() => {
    if (file) {
      setCustomFileName(file.name.replace(/\.[^/.]+$/, ''));
    } else {
      setCustomFileName('');
    }
  }, [file]);

  // Auto-initialize Whisper AI model as soon as a file is selected or model changed
  useEffect(() => {
    if (file && !ready && !processing) {
      initModel(selectedModel);
    }
  }, [file, ready, processing, initModel, selectedModel]);

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    if (file && !processing) {
      initModel(model);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    if (!ready) {
      await initModel(selectedModel);
    }
    await transcribe(file, language, selectedModel);
  };

  const renderHighlightedText = (text: string, query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      return <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, margin: 0, color: 'var(--text-main)' }}>{text}</p>;
    }
    const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);
    return (
      <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, margin: 0, color: 'var(--text-main)' }}>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark
              key={i}
              style={{
                backgroundColor: 'rgba(245, 158, 11, 0.45)',
                color: 'var(--text-main)',
                borderBottom: '2px solid #f59e0b',
                borderRadius: '2px',
                padding: '1px 3px',
                fontWeight: 700
              }}
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
    );
  };

  const matchCount = searchQuery.trim() && resultText
    ? (resultText.match(new RegExp(searchQuery.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length
    : 0;


  const copyToClipboard = () => {
    if (resultText) {
      navigator.clipboard.writeText(resultText);
    }
  };

  const downloadTranscript = () => {
    if (!resultText) return;
    const blob = new Blob([resultText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(customFileName.trim() || defaultBaseName || 'transcription')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isVideo = file?.type.startsWith('video');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', paddingTop: file ? '20px' : '40px' }}>
      
      {!file && finalTitle && (
        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: 1200, margin: '0 auto 32px auto', width: '100%' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 900, 
            marginBottom: 20, 
            letterSpacing: '-0.03em', 
            lineHeight: 1.15, 
            fontFamily: 'Outfit, sans-serif'
          }}>
            {smartHighlight(finalTitle)}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
            {finalDesc}
          </p>
        </div>
      )}

      <div className="tool-workspace-container" style={{ margin: '0 auto' }}>
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="video/*,audio/*,.mp4,.webm,.mov,.mkv,.avi,.wmv,.flv,.3gp,.m4v,.ts,.ogv,.mp3,.wav,.ogg,.aac,.flac,.m4a,.wma,.opus,.aiff,.ac3"
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
            <p>{translate('dragDrop') || 'Drag & drop'} audio/video <span className="browse-text">{translate('browseFiles') || 'Browse Files'}</span></p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <MediaLivePreview
              file={file}
              toolId="transcribe-media"
              onReplace={() => fileInputRef.current?.click()}
              onRemove={() => setFile(null)}
            />

            {(!ready && file) && (
              <div style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 600 }}>{translate('transLoading') || 'Loading AI Model...'} {loadingProgress}%</span>
                  <span style={{ color: 'var(--brand-primary)', fontSize: '0.85rem' }}>{translate('transDownload') || 'One-time download'}</span>
                </div>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${loadingProgress}%`, background: 'var(--brand-primary)' }}></div>
                </div>
              </div>
            )}
            
            {processing && (
              <div style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
                  <div style={{ animation: 'spin 1s linear infinite', display: 'flex', color: 'var(--brand-primary)' }}><Loader2 size={24} /></div>
                  <span style={{ fontWeight: 600 }}>{translate('transTranscribing') || 'AI is transcribing your media...'}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="tool-workspace-right glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border-color)', fontWeight: 800 }}>
          {translate('transTitle') || 'Transcribe Media'}
        </h3>
        
        <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <h4 style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileText size={18} className="text-brand-primary" />
              <span>{t.result}</span>
            </h4>
            {resultText && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '2px 8px', borderRadius: 12, border: '1px solid var(--border-color)', fontWeight: 600 }}>
                {resultText.trim().split(/\s+/).filter(Boolean).length} {translate('words') || 'words'}
              </span>
            )}
          </div>
          
          {/* Search bar inside transcript when text exists */}
          {resultText && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              padding: '6px 10px',
              marginBottom: 8
            }}>
              <Search size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={translate('searchTranscript') || "Search in transcript..."}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem'
                }}
              />
              {searchQuery && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: '0.75rem', color: matchCount > 0 ? 'var(--brand-primary)' : 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {matchCount} {matchCount === 1 ? 'match' : 'matches'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: 2 }}
                    title="Clear search"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Independent scroll container so sidebar never stretches out of control */}
          <div 
            style={{ 
              height: 240, 
              maxHeight: 250, 
              background: 'var(--bg-input)', 
              borderRadius: 'var(--radius-md)', 
              padding: 14, 
              border: '1px solid var(--border-color)', 
              overflowY: 'auto',
              scrollBehavior: 'smooth'
            }}
          >
            {resultText ? (
              renderHighlightedText(resultText, searchQuery)
            ) : (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', marginTop: '18%' }}>
                {processing ? ('AI is transcribing your media...') : t.placeholder}
              </p>
            )}
          </div>
        </div>

        {/* Output File Rename Field */}
        {file && (
          <div style={{ marginBottom: 16, background: 'var(--bg-input)', padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FileEdit size={14} style={{ color: 'var(--brand-primary)' }} />
                {translate('outputFileName') || 'Output File Name'}
              </span>
              {customFileName !== defaultBaseName && (
                <button
                  type="button"
                  onClick={() => setCustomFileName(defaultBaseName)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--brand-primary)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                  title={translate('resetFileName') || 'Reset'}
                >
                  <RotateCcw size={12} /> {translate('resetFileName') || 'Reset'}
                </button>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              <input
                type="text"
                value={customFileName}
                onChange={(e) => setCustomFileName(e.target.value)}
                placeholder={translate('outputFileNamePlaceholder') || 'Enter file name...'}
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
                .txt
              </span>
            </div>
          </div>
        )}

        {/* Model & Language Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
              {translate('transModel') || 'AI Model'}
            </label>
            <select
              value={selectedModel}
              onChange={(e) => handleModelChange(e.target.value)}
              disabled={processing}
              style={{
                background: 'var(--bg-input)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '7px 10px',
                fontSize: '0.82rem',
                outline: 'none',
                width: '100%',
                fontWeight: 500
              }}
            >
              <option value="onnx-community/whisper-base">🎯 Base (High Detail ~73MB)</option>
              <option value="onnx-community/whisper-tiny">⚡ Tiny (Fast ~39MB)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
              {translate('transLang') || 'Audio Language'}
            </label>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              disabled={processing}
              style={{ 
                background: 'var(--bg-input)', 
                color: 'var(--text-main)', 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-sm)',
                padding: '7px 10px',
                fontSize: '0.82rem',
                outline: 'none',
                width: '100%',
                fontWeight: 500
              }}
            >
              <option value="auto">🌐 {translate('autoDetect') || 'Auto Detect'}</option>
              <option value="indonesian">🇮🇩 Indonesian</option>
              <option value="english">🇺🇸 English</option>
              <option value="spanish">🇪🇸 Spanish</option>
              <option value="french">🇫🇷 French</option>
              <option value="german">🇩🇪 German</option>
              <option value="japanese">🇯🇵 Japanese</option>
              <option value="korean">🇰🇷 Korean</option>
              <option value="chinese">🇨🇳 Chinese</option>
              <option value="arabic">🇸🇦 Arabic</option>
              <option value="russian">🇷🇺 Russian</option>
              <option value="portuguese">🇵🇹 Portuguese</option>
              <option value="italian">🇮🇹 Italian</option>
              <option value="dutch">🇳🇱 Dutch</option>
              <option value="turkish">🇹🇷 Turkish</option>
              <option value="vietnamese">🇻🇳 Vietnamese</option>
              <option value="thai">🇹🇭 Thai</option>
            </select>
          </div>
        </div>

        {error && (
          <div style={{ marginBottom: 16, padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error-color)', color: 'var(--error-color)', fontSize: '0.85rem', lineHeight: 1.4 }}>
            {error}
          </div>
        )}
        
        <div style={{ display: 'flex', gap: 10, flexDirection: resultText ? 'column' : 'row' }}>
          {resultText ? (
            <>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={copyToClipboard}
                  className="btn-primary"
                  style={{ flex: 1, background: 'var(--brand-primary)' }}
                >
                  <Copy size={18} />
                  <span>{translate('transCopy') || 'Copy to Clipboard'}</span>
                </button>
                <button
                  onClick={downloadTranscript}
                  className="btn-primary"
                  style={{ flex: 1, background: 'var(--brand-secondary)' }}
                >
                  <Download size={18} />
                  <span>Save .TXT</span>
                </button>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleProcess}
                  disabled={processing}
                  title={translate('repeatProcess') || 'Re-adjust Settings'}
                  style={{ flex: '1 1 140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'rgba(var(--brand-primary-rgb), 0.1)', border: '1px solid rgba(var(--brand-primary-rgb), 0.25)', color: 'var(--brand-primary)', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s ease' }}
                >
                  <RotateCcw size={15} />
                  <span>{translate('repeatProcess') || 'Re-adjust Settings'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title={translate('processAnother') || 'Choose Another File'}
                  style={{ flex: '1 1 140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s ease' }}
                >
                  <RefreshCw size={15} />
                  <span>{translate('processAnother') || 'Choose Another File'}</span>
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={handleProcess}
              disabled={processing || !file || (!ready && loadingProgress > 0 && loadingProgress < 100)}
              className="btn-primary"
              style={{ 
                flex: 1, 
                background: 'var(--brand-primary)', 
                opacity: (processing || !file || (!ready && loadingProgress > 0 && loadingProgress < 100)) ? 0.5 : 1,
                cursor: (processing || !file || (!ready && loadingProgress > 0 && loadingProgress < 100)) ? 'not-allowed' : 'pointer'
              }}
            >
              {processing ? (
                <div style={{ animation: 'spin 1s linear infinite', display: 'flex' }}><Loader2 size={18} /></div>
              ) : (
                <PlayCircle size={18} />
              )}
              <span>{processing ? ('Processing...') : t.action}</span>
            </button>
          )}
        </div>
        </div>
      </div>
      
      {!file && !pseoData && (
        <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px', padding: '80px 0', background: 'var(--bg-main)' }}>
          <TranscribeMediaHeroSection 
            section={{ type: 'hero', title: translate('transHeroTitle') || "Transcribe Audio & Video Offline", content: translate('transHeroDesc') || "Upload your media files and have our local AI whisper model instantly convert speech to text without ever sending your data to the cloud." }} 
          />
          <TranscribeMediaHowToSection 
            section={{
              type: 'howto',
              title: translate('transHowTo') || "How to Transcribe",
              steps: [
                { title: translate('transHowTo1') || "Select Media", description: translate('transHowTo1Desc') || "Upload any audio or video file from your computer." },
                { title: translate('transHowTo2') || "AI Analysis", description: translate('transHowTo2Desc') || "The local AI engine listens and detects the spoken language." },
                { title: translate('transHowTo3') || "Get Text", description: translate('transHowTo3Desc') || "Instantly copy the transcription text to your clipboard." }
              ]
            }} 
          />
          <TranscribeMediaPerformanceSection 
            section={{ type: 'performance', title: translate('transPerfTitle') || "Hardware Acceleration", content: translate('transPerfDesc') || "We harness the power of your device's native hardware to run the complex AI neural network directly in the browser." }} 
          />
          <TranscribeMediaPrivacySection 
            section={{ type: 'privacy', title: translate('transPrivTitle') || "Total Privacy", content: translate('transPrivDesc') || "We guarantee that your sensitive audio recordings, meetings, and personal videos are completely safe. Nothing is uploaded. Period." }} 
          />
        </div>
      )}
    </div>
  );
};