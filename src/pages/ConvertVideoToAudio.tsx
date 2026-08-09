import { VideoToAudioHeroSection, VideoToAudioHowToSection, VideoToAudioPerformanceSection, VideoToAudioPrivacySection, VideoToAudioFAQSection } from '../components/content-sections/tools/VideoToAudioSections';
import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useUniversalCompressor } from '../hooks/useUniversalCompressor';

export const ConvertVideoToAudio: React.FC = () => {
  const { processing, progress, engine, processMedia } = useUniversalCompressor();
  
  const t = {
    format: "Target Audio Format",
    desc: "Select the format you want to extract the audio into.",
    action: "Extract to"
  };

  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('mp3');

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
      title="Extract Audio from Video"
      description="Extract high-quality audio tracks from your video files instantly. Runs 100% locally in your browser for ultimate privacy."
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
        <VideoToAudioHeroSection 
          section={{ type: 'hero', title: "Extract Audio from Video", content: "Pull the exact audio track (MP3 or WAV) from your favorite music videos, lectures, and movies without losing an ounce of quality." }} 
        />
        <VideoToAudioHowToSection 
          section={{
            type: 'howto',
            title: "How to Extract Audio",
            steps: [
              { title: "Upload Video", description: "Select the video file you want to extract audio from." },
              { title: "Choose Format", description: "Select MP3, WAV, or AAC depending on your needs." },
              { title: "Extract", description: "We separate the audio track instantly right in your browser." }
            ]
          }} 
        />
        <VideoToAudioPerformanceSection 
          section={{ type: 'performance', title: "Lightning Fast Extraction", content: "By avoiding uploading massive video files, our WebAssembly engine extracts audio streams natively in milliseconds." }} 
        />
        <VideoToAudioPrivacySection 
          section={{ type: 'privacy', title: "Offline Extraction", content: "No server needed. We split the audio and video streams right on your device motherboard using advanced Web Codecs." }} 
        />
        <VideoToAudioFAQSection />
      </div>
    </>
  );
};