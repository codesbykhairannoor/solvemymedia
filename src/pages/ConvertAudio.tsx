import { ConvertAudioHeroSection, ConvertAudioHowToSection, ConvertAudioSecuritySection, ConvertAudioPrivacySection } from '../components/content-sections/tools/ConvertAudioSections';
import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useUniversalCompressor } from '../hooks/useUniversalCompressor';
import { useLanguage } from '../hooks/useLanguage';

export const ConvertAudio: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, engine, processMedia } = useUniversalCompressor();
  
  const { t: translate } = useLanguage();
  
  const t = {
    format: translate('cvaFormat') || "Target Format",
    desc: translate('cvaDesc') || "Select the format you want to convert this audio into.",
    action: translate('cvaAction') || "Convert to"
  };

  const initialFormat = pseoData ? pseoData.path.split('-to-')[1] : 'mp3';
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>(initialFormat);

  const handleProcess = async () => {
    if (!file) return;
    // For conversion, use 'high' quality to avoid losing quality
    const url = await processMedia(file, 100, targetFormat);
    if (url) setOutputUrl(url);
  };

  const AUDIO_FORMATS = [
    { id: 'mp3', name: 'MP3', desc: t('audFmtUniversal') || 'Universal' },
    { id: 'wav', name: 'WAV', desc: t('audFmtLosslessPCM') || 'Lossless PCM' },
    { id: 'm4a', name: 'M4A', desc: t('audFmtAppleAAC') || 'Apple AAC' },
    { id: 'aac', name: 'AAC', desc: t('audFmtHighQuality') || 'High Quality' },
    { id: 'flac', name: 'FLAC', desc: t('audFmtLosslessHD') || 'Lossless HD' },
    { id: 'ogg', name: 'OGG', desc: t('audFmtVorbisWeb') || 'Vorbis Web' },
    { id: 'opus', name: 'OPUS', desc: t('audFmtEfficient') || 'Efficient' },
    { id: 'wma', name: 'WMA', desc: t('audFmtWindows') || 'Windows' },
    { id: 'aiff', name: 'AIFF', desc: t('audFmtStudioAudio') || 'Studio Audio' },
    { id: 'ac3', name: 'AC3', desc: t('audFmtDolbySurround') || 'Dolby Surround' }
  ];

  const sidebarContent = (
    <>
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} className="text-brand-primary" />
          <span>{t.format}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{t.desc}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {AUDIO_FORMATS.map((fmt) => {
            const isSelected = targetFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                type="button"
                className={`option-btn ${isSelected ? 'active' : ''}`}
                style={{
                  padding: '10px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 3,
                  borderRadius: 'var(--radius-sm)',
                  cursor: processing ? 'not-allowed' : 'pointer'
                }}
                onClick={() => setTargetFormat(fmt.id)}
                disabled={processing}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.88rem' }}>.{fmt.id}</span>
                  {isSelected && <span style={{ fontSize: '0.7rem', opacity: 0.9 }}>✓</span>}
                </div>
                <span style={{ fontSize: '0.72rem', opacity: isSelected ? 0.9 : 0.65, fontWeight: 500 }}>
                  {fmt.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <>
      <CenteredActionWorkspace
        title={pseoData ? pseoData.h1 : (translate('cvaTitle') || "Convert Audio Formats Fast")}
        description={pseoData ? pseoData.description : (translate('cvaSub') || "Easily convert your audio files between MP3, WAV, AAC, and OGG formats locally without quality loss. Your files never leave your browser.")}
        toolId="convert-audio"
        file={file}
        onFileSelect={(f) => { setFile(f); setOutputUrl(null); }}
        outputUrl={outputUrl}
        onResetResult={() => setOutputUrl(null)}
        processing={processing}
        progress={progress}
        engine={engine}
        onProcess={handleProcess}
        processActionText={`${t.action} ${targetFormat.toUpperCase()}`}
        sidebarContent={sidebarContent}
        targetFormat={targetFormat}
      />

      {!file && !pseoData && (
      <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px' }}>
        <ConvertAudioHeroSection 
          section={{ 
            type: 'hero', 
            title: pseoData ? pseoData.h1 : (translate('cvaHeroTitle') || "High-Fidelity Audio Converter"), 
            content: pseoData ? pseoData.description : (translate('cvaHeroDesc') || "Convert WAV to MP3, or OGG to AAC. We support a wide range of codecs to ensure you get the exact format you need for any project without compromising privacy.") 
          }} 
        />
        <ConvertAudioHowToSection 
          section={{
            type: 'howto',
            title: translate('cvaHowTo') || "How to Convert Audio",
            steps: [
              { title: translate('cvaHowTo1') || "Upload Audio", description: translate('cvaHowTo1Desc') || "Select any audio format from your computer." },
              { title: translate('cvaHowTo2') || "Transcode", description: translate('cvaHowTo2Desc') || "We instantly convert the stream without uploading it to a server." },
              { title: translate('cvaHowTo3') || "Save File", description: translate('cvaHowTo3Desc') || "Download the converted MP3 or WAV directly to your local drive." }
            ]
          }} 
        />
        <ConvertAudioSecuritySection 
          section={{ 
            type: 'security', 
            title: pseoData && pseoData.features[0] ? pseoData.features[0].title : (translate('cvaSecTitle') || "Offline Conversion"), 
            content: pseoData && pseoData.features[0] ? pseoData.features[0].desc : (translate('cvaSecDesc') || "Run intensive audio conversions entirely offline using our local WebAssembly engine.") 
          }} 
        />
        <ConvertAudioPrivacySection 
          section={{ type: 'privacy', title: translate('cvaPrivTitle') || "Strict Privacy", content: translate('cvaPrivDesc') || "Your media is never uploaded. Period." }} 
        />
      </div>
      )}
    </>
  );
};
