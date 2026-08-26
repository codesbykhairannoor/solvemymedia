import { TranscribeMediaHeroSection, TranscribeMediaHowToSection, TranscribeMediaPerformanceSection, TranscribeMediaPrivacySection } from '../components/content-sections/tools/TranscribeMediaSections';
import React, { useState, useRef } from 'react';
import { UploadCloud, FileVideo, FileAudio, Trash2, Copy, Loader2, PlayCircle, FileText } from 'lucide-react';
import { useWhisper } from '../hooks/useWhisper';
import { smartHighlight } from '../utils/textFormatting';
import { useLanguage } from '../hooks/useLanguage';

export const TranscribeMedia: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { ready, loadingProgress, processing, resultText, transcribe, initModel } = useWhisper();
  const { t: translate } = useLanguage();
  
  const t = {
    upload: translate('transDesc') || "Upload your audio or video file below to transcribe it to text securely in your browser using AI.",
    result: translate('transResult') || "Transcription Result",
    placeholder: translate('transPlaceholder') || "Transcription will appear here.",
    action: translate('transAction') || "Start Transcription"
  };

  const finalTitle = pseoData ? pseoData.h1 : (translate('transTitle') || 'Transcribe Audio & Video Offline');
  const finalDesc = pseoData ? pseoData.description : t.upload;

  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<string>('indonesian');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    await transcribe(file, language);
  };

  const copyToClipboard = () => {
    if (resultText) {
      navigator.clipboard.writeText(resultText);
    }
  };

  const isVideo = file?.type.startsWith('video');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', paddingTop: !file ? '64px' : '0' }}>
      
      {!file && (
        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: 1200, margin: '0 auto 40px auto', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.15, fontFamily: 'Outfit, sans-serif' }}>
            {smartHighlight(finalTitle)}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
            {finalDesc}
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
              style={{ display: 'none' }} 
            />
            <div className="dropzone-icon">
              <UploadCloud size={40} />
            </div>
            <p>{translate('dragDrop') || 'Drag & drop'} audio/video <span className="browse-text">{translate('browseFiles') || 'Browse Files'}</span></p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', padding: 24, position: 'relative' }}>
              <div style={{ textAlign: 'center' }}>
                {isVideo ? <FileVideo size={64} color="var(--brand-primary)" /> : <FileAudio size={64} color="var(--brand-primary)" />}
                <p style={{ marginTop: 16, fontWeight: 600 }}>{file.name}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
              {!processing && (
                <button 
                  onClick={() => setFile(null)}
                  style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error-color)', border: 'none', padding: 8, borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

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
        
        <div style={{ marginBottom: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileText size={18} className="text-brand-primary" />
            <span>{t.result}</span>
          </h4>
          
          <div style={{ marginTop: 12, flex: 1, minHeight: 200, background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', padding: 16, border: '1px solid var(--border-color)', overflowY: 'auto' }}>
            {resultText ? (
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{resultText}</p>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', marginTop: '10%' }}>{processing ? ('Processing...') : t.placeholder}</p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            disabled={processing}
            style={{ 
              background: 'var(--bg-input)', 
              color: 'var(--text-main)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          >
            <option value="indonesian">Indonesian</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
            <option value="japanese">Japanese</option>
            <option value="korean">Korean</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', gap: 12 }}>
          {resultText ? (
            <button
              onClick={copyToClipboard}
              className="btn-primary"
              style={{ flex: 1, background: 'var(--brand-primary)' }}
            >
              <Copy size={18} />
              <span>{translate('transCopy') || 'Copy to Clipboard'}</span>
            </button>
          ) : (
            <button
              onClick={handleProcess}
              disabled={processing || !file || !ready}
              className="btn-primary"
              style={{ flex: 1, background: 'var(--brand-primary)', opacity: (processing || !file || !ready) ? 0.5 : 1 }}
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
      
    
    
      <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px', padding: '80px 0', background: 'var(--bg-main)' }}>
        {!pseoData && (
          <>
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
          </>
        )}

        
        
      </div>
  
    </div>
  );
};