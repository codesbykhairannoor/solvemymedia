import { HeroFeaturesSection } from '../components/content-sections/FeatureGroup';
import { SecurityPrivacySection } from '../components/content-sections/SecurityGroup';
import { MergeAudioHeroSection, MergeAudioHowToSection, MergeAudioPerformanceSection, MergeAudioPrivacySection, MergeAudioFAQSection } from '../components/content-sections/tools/MergeAudioSections';
import React, { useState, useRef } from 'react';
import { Music, FileAudio, Trash2, Download, Loader2, Zap, Plus, GripVertical, UploadCloud } from 'lucide-react';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { smartHighlight } from '../utils/textFormatting';
import { useLanguage } from '../hooks/useLanguage';
export const MergeAudio: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { ready, processing, progress, runCustomFFmpeg } = useFFmpeg();
  
  const { t: translate } = useLanguage();
  
  const t = {
    upload: translate('maUpload') || "Combine multiple audio tracks into a single seamless file. Rearrange, edit, and merge completely offline.",
    add: translate('maAdd') || "Add Audio File",
    join: translate('maJoin') || "Join Audio Files",
    desc: translate('maDesc') || "Combine multiple audio tracks sequentially into a single file.",
    action: translate('maAction') || "Merge Audio"
  };

  const [files, setFiles] = useState<File[]>([]);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(f => f.type.startsWith('audio'));
      setFiles(prev => [...prev, ...newFiles]);
      setOutputUrl(null);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setOutputUrl(null);
  };

  const handleProcess = async () => {
    if (files.length < 2) return;
    
    // FFmpeg args to concat multiple audio files
    const args: string[] = [];
    files.forEach(f => {
      args.push('-i', f.name);
    });
    
    let filterComplex = '';
    for (let i = 0; i < files.length; i++) {
      filterComplex += `[${i}:a]`;
    }
    filterComplex += `concat=n=${files.length}:v=0:a=1[outa]`;
    
    args.push('-filter_complex', filterComplex, '-map', '[outa]', 'output.mp3');
    
    const url = await runCustomFFmpeg(files, args, 'output.mp3', 'audio/mpeg');
    if (url) setOutputUrl(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', paddingTop: files.length === 0 ? '64px' : '0' }}>
      
      {files.length === 0 && (
        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: 1200, margin: '0 auto 40px auto', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.15, fontFamily: 'Outfit, sans-serif' }}>
            {smartHighlight(pseoData ? pseoData.h1 : (translate('maTitle') || 'Merge Audio Files Seamlessly'))}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
            {pseoData ? pseoData.description : t.upload}
          </p>
        </div>
      )}

      <div className="tool-workspace-container" style={{ margin: files.length > 0 ? '24px auto' : '0 auto' }}>
        <div className="tool-workspace-left glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          {files.length === 0 ? (
            <div 
              className="dropzone"
              onClick={() => fileInputRef.current?.click()}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                accept="audio/*"
                style={{ display: 'none' }} 
              />
              <div className="dropzone-icon">
                <UploadCloud size={40} />
              </div>
              <p>Drag & drop audio or <span className="browse-text">Browse Files</span></p>
            </div>
          ) : (
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: 8, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {files.map((file, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-input)', padding: 16, borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <GripVertical size={18} color="var(--text-muted)" />
                    <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: 12, borderRadius: '50%' }}>
                      <FileAudio size={24} color="var(--brand-primary)" />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>{file.name}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  {!processing && !outputUrl && (
                    <button onClick={() => removeFile(index)} style={{ background: 'transparent', border: 'none', color: 'var(--error-color)', cursor: 'pointer', padding: 8 }}>
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}

              {!processing && !outputUrl && (
                <div 
                  className="dropzone" 
                  style={{ minHeight: 120, flex: 'none', padding: 24, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple
                    accept="audio/*"
                    style={{ display: 'none' }} 
                  />
                  <div className="dropzone-icon" style={{ width: 40, height: 40, margin: '0 auto 8px' }}>
                    <Plus size={24} />
                  </div>
                  <p style={{ fontSize: '0.9rem' }}>{t.add}</p>
                </div>
              )}

              {processing && (
                <div style={{ marginTop: 24, padding: 24, background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 600 }}>{translate('maMerging') || "Merging"} {progress}%</span>
                    <span style={{ color: 'var(--text-accent)', fontSize: '0.85rem' }}>{translate('maCpuWasm') || "🐌 CPU WASM FFmpeg"}</span>
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
          {translate('maAction') || 'Merge Audio'}
        </h3>
        
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Music size={18} className="text-brand-primary" />
            <span>{t.join}</span>
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{t.desc}</p>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 24 }}>
          {outputUrl ? (
            <a 
              href={outputUrl} 
              download={`merged_audio_${new Date().getTime()}.mp3`} 
              className="btn-primary" 
            >
              <Download size={18} />
              {translate('maDownload') || "Download Result"}
            </a>
          ) : (
            <button
              onClick={handleProcess}
              disabled={processing || files.length < 2 || !ready}
              className="btn-primary"
            >
              {processing ? (
                <div style={{ animation: 'spin 1s linear infinite', display: 'flex' }}><Loader2 size={18} /></div>
              ) : (
                <Zap size={18} />
              )}
              <span>{processing ? ('Processing...') : t.action}</span>
            </button>
          )}
          {files.length > 0 && files.length < 2 && !outputUrl && (
            <p style={{ color: 'var(--warning-color)', fontSize: '0.8rem', textAlign: 'center', marginTop: 12 }}>Add at least 2 files to merge</p>
          )}
        </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px' }}>
        {!pseoData && (
          <>
            <MergeAudioHeroSection 
              section={{ type: 'hero', title: translate('maHeroTitle') || "Combine Audio Tracks Seamlessly", content: translate('maHeroDesc') || "Merge multiple MP3, WAV, or OGG files into a single continuous track. Perfect for podcasts, mixtapes, and audiobooks." }} 
            />
            <MergeAudioHowToSection 
              section={{
                type: 'howto',
                title: translate('maHowTo') || "How to Merge Audio",
                steps: [
                  { title: translate('maHowTo1') || "Add Audio Files", description: translate('maHowTo1Desc') || "Upload two or more audio tracks you want to combine." },
                  { title: translate('maHowTo2') || "Rearrange Order", description: translate('maHowTo2Desc') || "Drag and drop the files to get the perfect sequence." },
                  { title: translate('maHowTo3') || "Merge & Save", description: translate('maHowTo3Desc') || "Click merge and download your single combined audio file." }
                ]
              }} 
            />
            <MergeAudioPerformanceSection 
              section={{ type: 'performance', title: translate('maPerfTitle') || "Zero Latency Processing", content: translate('maPerfDesc') || "No queue times or upload delays. Everything is merged instantaneously in your browser using local resources." }} 
            />
            <MergeAudioPrivacySection 
              section={{ type: 'privacy', title: translate('maPrivTitle') || "100% Offline & Private", content: translate('maPrivDesc') || "Your voice notes and music are processed on your device only, offering bank-grade security for your files." }} 
            />
          </>
        )}

        
        {!pseoData && (
          <MergeAudioFAQSection faqs={pseoData?.faqs} />
        )}
      </div>
    </div>
  );
};
