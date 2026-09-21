import { CompressAudioHeroSection, CompressAudioHowToSection, CompressAudioPerformanceSection, CompressAudioPrivacySection } from '../components/content-sections/tools/CompressAudioSections';
import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { DualColumnWorkspace } from '../components/workspaces/DualColumnWorkspace';
import { useUniversalCompressor } from '../hooks/useUniversalCompressor';
import type { Quality } from '../hooks/useUniversalCompressor';
import { useLanguage } from '../hooks/useLanguage';

export const CompressAudio: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, engine, processMedia } = useUniversalCompressor();
  
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<Quality>(60);
  const [realSizeMB, setRealSizeMB] = useState<number | null>(null);
  
  const { t: translate } = useLanguage();
  
  const t = {
    desc: translate('caDesc') || "Choose compression target for audio.",
    small: translate('caSmall') || "Small (64k)",
    hq: translate('caHq') || "HQ (192k)",
    action: translate('caAction') || "Compress Audio"
  };

  React.useEffect(() => {
    if (outputUrl) {
      fetch(outputUrl)
        .then(res => res.blob())
        .then(blob => setRealSizeMB(blob.size / (1024 * 1024)))
        .catch(() => setRealSizeMB(null));
    } else {
      setRealSizeMB(null);
    }
  }, [outputUrl]);

  const handleProcess = async () => {
    if (!file) return;
    const url = await processMedia(file, quality, 'mp3');
    if (url) setOutputUrl(url);
  };

  const getEstimatedSize = () => {
    if (!file) return null;
    
    const origMB = file.size / (1024 * 1024);
    
    if (realSizeMB !== null) {
      const savedPercent = Math.round((1 - (realSizeMB / origMB)) * 100);
      return {
        orig: origMB,
        est: realSizeMB,
        saved: savedPercent,
        isReal: true
      };
    }
    
    const ratio = 0.2 + (0.6 * (quality / 100)); // 0.2 to 0.8
    return {
      orig: origMB,
      est: origMB * ratio,
      saved: Math.round((1 - ratio) * 100),
      isReal: false
    };
  };

  const est = getEstimatedSize();

  const sidebarContent = (
    <>
      {est && (
        <div style={{ background: 'var(--bg-input)', padding: 16, borderRadius: 'var(--radius-md)', marginBottom: 24, border: '1px solid var(--brand-glow)' }}>
          <h4 style={{ fontSize: '0.9rem', color: est.isReal ? 'var(--brand-primary)' : 'var(--text-muted)', marginBottom: 12, fontWeight: est.isReal ? 700 : 500 }}>
            {est.isReal ? '🎉 Actual Result' : 'Estimated Result'}
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Original Size</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)', textDecoration: 'line-through' }}>{est.orig.toFixed(1)} MB</div>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand-secondary)' }}>👉</div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{est.isReal ? 'Actual Size' : 'Target Size'}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: est.saved > 0 ? 'var(--success-color)' : 'var(--warning-color)' }}>
                {est.isReal ? '' : '~'}{est.est.toFixed(1)} MB
              </div>
            </div>
          </div>
          <div style={{ fontSize: '0.8rem', color: est.saved > 0 ? 'var(--success-color)' : 'var(--warning-color)', textAlign: 'center', background: est.saved > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', padding: '4px 8px', borderRadius: 4, fontWeight: 600 }}>
            {est.saved > 0 ? `Saved ${est.saved}% storage!` : `Increased by ${Math.abs(est.saved)}%`}
          </div>
        </div>
      )}
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} className="text-brand-primary" />
          <span>{translate('caSettings') || "Compression Settings"}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 12 }}>{t.desc}</p>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontWeight: 700, color: 'var(--text-main)' }}>
          <span>Quality: {quality}%</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="100" 
          step="1" 
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          disabled={processing || !!outputUrl}
          style={{
            width: '100%',
            cursor: processing || !!outputUrl ? 'not-allowed' : 'pointer',
            opacity: processing || !!outputUrl ? 0.6 : 1,
            accentColor: 'var(--brand-primary)'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>{t.small}</span>
          <span>{translate('caBalanced') || "Balanced"}</span>
          <span>{t.hq}</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      <DualColumnWorkspace
        accept="audio/*"
        title={pseoData ? pseoData.h1 : (translate('caTitle') || "Compress Audio Files without Losing Quality")}
        description={pseoData ? pseoData.description : (translate('caSub') || "Reduce the file size of your audio tracks while preserving excellent sound quality. Perfect for podcast hosting or email attachments.")}
        toolId="compress-audio"
        file={file}
        setFile={(f) => { setFile(f); setOutputUrl(null); }}
        outputUrl={outputUrl}
        onResetResult={() => setOutputUrl(null)}
        processing={processing}
        progress={progress}
        engine={engine}
        onProcess={handleProcess}
        processActionText={t.action}
        sidebarContent={sidebarContent}
        targetFormat="mp3"
      />

      {!pseoData && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px' }}>
        <CompressAudioHeroSection 
          section={{ type: 'hero', title: translate('caHeroTitle') || "Shrink Audio Size Instantly", content: translate('caHeroDesc') || "Compress your MP3, WAV, and AAC files securely offline. Save gigabytes of space for podcasts, voice notes, and music sharing." }} 
        />
        <CompressAudioHowToSection 
          section={{
            type: 'howto',
            title: translate('caHowTo') || "How to Compress Audio",
            steps: [
              { title: translate('caHowTo1') || "Upload Audio", description: translate('caHowTo1Desc') || "Select the audio file you want to compress from your device." },
              { title: translate('caHowTo2') || "Adjust Quality", description: translate('caHowTo2Desc') || "Use the slider to choose the right balance between file size and audio clarity." },
              { title: translate('caHowTo3') || "Compress & Save", description: translate('caHowTo3Desc') || "Hit compress and the file will be optimized and downloaded instantly." }
            ]
          }} 
        />
        <CompressAudioPerformanceSection 
          section={{ type: 'performance', title: translate('caPerfTitle') || "Powered by WebAssembly", content: translate('caPerfDesc') || "Experience native-grade FFmpeg compression speed entirely in your browser without the need for desktop applications." }} 
        />
        <CompressAudioPrivacySection 
          section={{ type: 'privacy', title: translate('caPrivTitle') || "100% Secure Local Execution", content: translate('caPrivDesc') || "Your audio files never leave your computer. We process everything locally so your private recordings remain strictly confidential." }} 
        />
      </div>
      )}
    </>
  );
};
