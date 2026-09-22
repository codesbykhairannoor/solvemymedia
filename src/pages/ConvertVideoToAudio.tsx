import { VideoToAudioHeroSection, VideoToAudioHowToSection, VideoToAudioPerformanceSection, VideoToAudioPrivacySection } from '../components/content-sections/tools/VideoToAudioSections';
import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useUniversalCompressor } from '../hooks/useUniversalCompressor';
import { useLanguage } from '../hooks/useLanguage';

export const ConvertVideoToAudio: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, engine, processMedia } = useUniversalCompressor();
  
  const { t: translate } = useLanguage();
  
  const t = {
    format: translate('vtaFormat') || "Target Audio Format",
    desc: translate('vtaDesc') || "Select the format you want to extract the audio into.",
    action: translate('vtaAction') || "Extract to"
  };

  const pathParts = pseoData ? pseoData.path.split('-to-') : [];
  const initialFormat = pathParts.length > 1 ? pathParts[1] : 'mp3';
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>(initialFormat || 'mp3');

  const handleProcess = async () => {
    if (!file) return;
    // Extracting audio, use 'high' quality default
    const url = await processMedia(file, 100, targetFormat);
    if (url) setOutputUrl(url);
  };

  const AUDIO_FORMATS = [
    { id: 'mp3', name: 'MP3', desc: 'Universal' },
    { id: 'wav', name: 'WAV', desc: 'Lossless PCM' },
    { id: 'm4a', name: 'M4A', desc: 'Apple AAC' },
    { id: 'aac', name: 'AAC', desc: 'High Quality' },
    { id: 'flac', name: 'FLAC', desc: 'Lossless HD' },
    { id: 'ogg', name: 'OGG', desc: 'Vorbis Web' },
    { id: 'opus', name: 'OPUS', desc: 'Efficient' },
    { id: 'wma', name: 'WMA', desc: 'Windows' },
    { id: 'aiff', name: 'AIFF', desc: 'Studio Audio' },
    { id: 'ac3', name: 'AC3', desc: 'Dolby Surround' }
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
        title={pseoData ? pseoData.h1 : (translate('vtaTitle') || "Extract Audio from Video")}
        description={pseoData ? pseoData.description : (translate('vtaSub') || "Extract high-quality audio tracks from your video files instantly. Runs 100% locally in your browser for ultimate privacy.")}
        toolId="video-to-audio"
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
          <VideoToAudioHeroSection 
            section={{ 
              type: 'hero', 
              title: pseoData ? pseoData.h1 : (translate('vtaHeroTitle') || "Extract Audio from Video"), 
              content: pseoData ? pseoData.description : (translate('vtaHeroDesc') || "Pull the exact audio track (MP3 or WAV) from your favorite music videos, lectures, and movies without losing an ounce of quality.") 
            }} 
          />
          <VideoToAudioHowToSection 
            section={{
              type: 'howto',
              title: translate('vtaHowTo') || "How to Extract Audio",
              steps: [
                { title: translate('vtaHowTo1') || "Upload Video", description: translate('vtaHowTo1Desc') || "Select the video file you want to extract audio from." },
                { title: translate('vtaHowTo2') || "Choose Format", description: translate('vtaHowTo2Desc') || "Select MP3, WAV, or AAC depending on your needs." },
                { title: translate('vtaHowTo3') || "Extract", description: translate('vtaHowTo3Desc') || "We separate the audio track instantly right in your browser." }
              ]
            }} 
          />
          <VideoToAudioPerformanceSection 
            section={{ 
              type: 'performance', 
              title: pseoData && pseoData.features && pseoData.features[0] ? pseoData.features[0].title : (translate('vtaPerfTitle') || "Lightning Fast Extraction"), 
              content: pseoData && pseoData.features && pseoData.features[0] ? pseoData.features[0].desc : (translate('vtaPerfDesc') || "By avoiding uploading massive video files, our WebAssembly engine extracts audio streams natively in milliseconds.") 
            }} 
          />
          <VideoToAudioPrivacySection 
            section={{ type: 'privacy', title: translate('vtaPrivTitle') || "Offline Extraction", content: translate('vtaPrivDesc') || "No server needed. We split the audio and video streams right on your device motherboard using advanced Web Codecs." }} 
          />
        </div>
      )}
    </>
  );
};