import { VideoToAudioHeroSection, VideoToAudioHowToSection, VideoToAudioPerformanceSection, VideoToAudioPrivacySection, VideoToAudioFAQSection } from '../components/content-sections/tools/VideoToAudioSections';
import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useUniversalCompressor } from '../hooks/useUniversalCompressor';
import { useLanguage } from '../hooks/useLanguage';
import { DynamicSection } from '../components/DynamicSection';

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

  const sidebarContent = (
    <>
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} className="text-brand-primary" />
          <span>{t.format}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{t.desc}</p>
        
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className={`tab-btn ${targetFormat === 'mp3' ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setTargetFormat('mp3')}>.mp3</button>
          <button className={`tab-btn ${targetFormat === 'wav' ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setTargetFormat('wav')}>.wav</button>
          <button className={`tab-btn ${targetFormat === 'aac' ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setTargetFormat('aac')}>.aac</button>
          <button className={`tab-btn ${targetFormat === 'ogg' ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setTargetFormat('ogg')}>.ogg</button>
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
      onFileSelect={setFile}
      outputUrl={outputUrl}
      processing={processing}
      progress={progress}
      engine={engine}
      onProcess={handleProcess}
      processActionText={`${t.action} ${targetFormat.toUpperCase()}`}
      sidebarContent={sidebarContent}
      targetFormat={targetFormat}
      />

  
    
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px' }}>
        {!pseoData && (
          <>
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
          </>
        )}
        
        {/* DYNAMIC PSEO SECTION */}
        {pseoData && pseoData.dynamicSection && (
          <div style={{ padding: '0 24px' }}>
             <DynamicSection data={pseoData.dynamicSection} />
          </div>
        )}
        <VideoToAudioFAQSection faqs={pseoData?.faqs} />
      </div>
    </>
  );
};