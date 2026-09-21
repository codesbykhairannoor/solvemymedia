import { CreateGifHeroSection, CreateGifHowToSection, CreateGifPerformanceSection, CreateGifPrivacySection } from '../components/content-sections/tools/CreateGifSections';
import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { useLanguage } from '../hooks/useLanguage';

export const CreateGif: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  const { t } = useLanguage();
  
  const ui = {
    settings: t('gifSettings') || "GIF Settings",
    desc: t('gifDesc') || "Customize the frame rate and size of your GIF.",
    small: t('gifSmall') || "Small & Fast (Meme)",
    fps10: t('gifFps10') || "10 FPS, 320px width",
    fps15: t('gifFps15') || "15 FPS, 480px width",
    fps24: t('gifFps24') || "24 FPS, 640px width",
    gen: t('gifGen') || "Generate GIF"
  };

  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [fps, setFps] = useState<number>(15);
  const [width, setWidth] = useState<number>(480);

  const handleProcess = async () => {
    if (!file) return;
    const args = ['-i', file.name, '-vf', `fps=${fps},scale=${width}:-1`, '-loop', '0', 'output.gif'];
    const url = await runCustomFFmpeg([file], args, 'output.gif', 'image/gif');
    if (url) setOutputUrl(url);
  };

  const sidebarContent = (
    <>
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} className="text-brand-primary" />
          <span>{ui.settings}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{ui.desc}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button 
            className={`tool-card glass-panel ${fps === 10 && width === 320 ? 'active' : ''}`}
            onClick={() => { setFps(10); setWidth(320); }}
            style={{ padding: 12, textAlign: 'left', border: fps === 10 && width === 320 ? '2px solid var(--brand-primary)' : '2px solid transparent' }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{ui.small}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ui.fps10}</div>
          </button>

          <button 
            className={`tool-card glass-panel ${fps === 15 && width === 480 ? 'active' : ''}`}
            onClick={() => { setFps(15); setWidth(480); }}
            style={{ padding: 12, textAlign: 'left', border: fps === 15 && width === 480 ? '2px solid var(--brand-primary)' : '2px solid transparent' }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t('gifBalanced') || "Balanced"}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ui.fps15}</div>
          </button>

          <button 
            className={`tool-card glass-panel ${fps === 24 && width === 640 ? 'active' : ''}`}
            onClick={() => { setFps(24); setWidth(640); }}
            style={{ padding: 12, textAlign: 'left', border: fps === 24 && width === 640 ? '2px solid var(--brand-primary)' : '2px solid transparent' }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t('gifHigh') || "High Quality (Heavy)"}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ui.fps24}</div>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <CenteredActionWorkspace
      title={pseoData ? pseoData.h1 : (t('gifTitle') || "Create GIF from Video")}
      description={pseoData ? pseoData.description : (t('gifSub') || "Convert any video into an optimized animated GIF in seconds. Customize frame rate and size without uploading your files to the cloud.")}
      toolId="create-gif"
      file={file}
      onFileSelect={(f) => { setFile(f); setOutputUrl(null); }}
      outputUrl={outputUrl}
      onResetResult={() => setOutputUrl(null)}
      processing={processing}
      progress={progress}
      engine="tier3"
      onProcess={handleProcess}
      processActionText={ui.gen}
      sidebarContent={sidebarContent}
      targetFormat="gif"
      />

      {!file && !pseoData && (
      <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px' }}>
        <CreateGifHeroSection 
          section={{ 
            type: 'hero', 
            title: pseoData ? pseoData.h1 : (t('gifHero') || "Turn Videos into Viral GIFs"), 
            content: pseoData ? pseoData.description : (t('gifHeroDesc') || "Convert MP4, WebM, and MOV to animated GIFs in seconds. No watermarks, no signups, completely free.") 
          }} 
        />
        <CreateGifHowToSection 
          section={{
            type: 'howto',
            title: t('gifHowTo') || "How to Make a GIF",
            steps: [
              { title: t('gifHowTo1') || "Upload Video", description: t('gifHowTo1Desc') || "Select any video file from your device." },
              { title: t('gifHowTo2') || "Set Framerate", description: t('gifHowTo2Desc') || "Choose the FPS and output size to balance quality and file size." },
              { title: t('gifHowTo3') || "Generate & Download", description: t('gifHowTo3Desc') || "Instantly create and save your animated GIF." }
            ]
          }} 
        />
        <CreateGifPerformanceSection 
          section={{ 
            type: 'performance', 
            title: pseoData && pseoData.features[0] ? pseoData.features[0].title : (t('gifPerf') || "Built for Speed"), 
            content: pseoData && pseoData.features[0] ? pseoData.features[0].desc : (t('gifPerfDesc') || "Most GIF makers limit your video size because of server costs. We use WebAssembly to run the conversion on your device, allowing you to process large videos effortlessly.") 
          }} 
        />
        <CreateGifPrivacySection 
          section={{ type: 'privacy', title: t('gifPriv') || "Your Files Stay Yours", content: t('gifPrivDesc') || "Because everything runs locally, your sensitive videos are completely safe. Disconnect from the internet and watch it still work." }} 
        />
        
      </div>
      )}
    </>
  );
};