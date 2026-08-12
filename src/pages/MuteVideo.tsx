import { MuteVideoHeroSection, MuteVideoHowToSection, MuteVideoSpeedSection, MuteVideoOfflineSection, MuteVideoFAQSection } from '../components/content-sections/tools/MuteVideoSections';
import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';

import { useLanguage } from '../hooks/useLanguage';

export const MuteVideo: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  const { t } = useLanguage();
  
  const ui = {
    remove: "Remove Audio",
    desc: "This tool instantly strips all audio tracks from your video. The video quality is completely preserved.",
    fast: "Lightning Fast! ⚡",
    fast_desc: "This process does not re-encode your video, so it will finish in less than a second.",
    action: "Mute Video"
  };

  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!file) return;
    const args = ['-i', file.name, '-c', 'copy', '-an', 'output.mp4'];
    const url = await runCustomFFmpeg([file], args, 'output.mp4', 'video/mp4');
    if (url) setOutputUrl(url);
  };

  const sidebarContent = (
    <>
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} className="text-brand-primary" />
          <span>{ui.remove}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{ui.desc}</p>
      </div>
      
      <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(16, 185, 129, 0.2)', color: 'var(--success-color)', fontSize: '0.9rem' }}>
        <strong style={{ display: 'block', marginBottom: 4 }}>{ui.fast}</strong>
        {ui.fast_desc}
      </div>
    </>
  );

  return (
    <>
      <CenteredActionWorkspace
      title={pseoData ? pseoData.h1 : (t('mvTitle') || "Remove Audio from Video Completely")}
      description={pseoData ? pseoData.description : (t('mvSub') || "Quickly remove the audio track from any video file. Perfect for creating silent clips or preparing footage for social media.")}
      toolId="mute-video"
      file={file}
      onFileSelect={(f) => { setFile(f); setOutputUrl(null); }}
      outputUrl={outputUrl}
      processing={processing}
      progress={progress}
      engine="tier3"
      onProcess={handleProcess}
      processActionText={ui.action}
      sidebarContent={sidebarContent}
      targetFormat="mp4"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px' }}>
        <MuteVideoHeroSection 
          section={{ type: 'hero', title: t('muteVHeroTitle') || "Instantly Remove Audio", content: t('muteVHeroDesc') || "Strip out the sound track from any video file without re-encoding, preserving 100% of the original video quality." }} 
        />
        <MuteVideoHowToSection 
          section={{
            type: 'howto',
            title: t('muteVHowToTitle') || "How to Mute Videos",
            steps: [
              { title: t('muteVHowTo1') || "Select a Video", description: t('muteVHowTo1Desc') || "Choose the video file that you want to mute from your device." },
              { title: t('muteVHowTo2') || "Instant Mute", description: t('muteVHowTo2Desc') || "The audio track is stripped instantly. You don't have to wait for any processing." },
              { title: t('muteVHowTo3') || "Save Silently", description: t('muteVHowTo3Desc') || "Download the muted video back to your local storage securely." }
            ]
          }} 
        />
        <MuteVideoSpeedSection 
          section={{ type: 'speed', title: t('muteVSpeedTitle') || "Zero Wait Time", content: t('muteVSpeedDesc') || "By skipping the re-encoding step and just removing the audio stream directly, this process finishes almost instantly regardless of video length." }} 
        />
        <MuteVideoOfflineSection 
          section={{ type: 'privacy', title: t('muteVPrivTitle') || "Absolute Offline Privacy", content: t('muteVPrivDesc') || "Your video files are strictly kept on your local machine. They are never uploaded or stored anywhere else." }} 
        />
        <MuteVideoFAQSection />
      </div>
    </>
  );
};