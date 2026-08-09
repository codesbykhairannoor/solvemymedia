import { CreateGifHeroSection, CreateGifHowToSection, CreateGifPerformanceSection, CreateGifPrivacySection, CreateGifFAQSection } from '../components/content-sections/tools/CreateGifSections';
import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';

export const CreateGif: React.FC = () => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  
  const t = {
    settings: "GIF Settings",
    desc: "Customize the frame rate and size of your GIF.",
    small: "Small & Fast (Meme)",
    fps10: "10 FPS, 320px width",
    fps15: "15 FPS, 480px width",
    fps24: "24 FPS, 640px width",
    gen: "Generate GIF"
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
          <span>{t.settings}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{t.desc}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button 
            className={`tool-card glass-panel ${fps === 10 && width === 320 ? 'active' : ''}`}
            onClick={() => { setFps(10); setWidth(320); }}
            style={{ padding: 12, textAlign: 'left', border: fps === 10 && width === 320 ? '2px solid var(--brand-primary)' : '2px solid transparent' }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.small}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.fps10}</div>
          </button>

          <button 
            className={`tool-card glass-panel ${fps === 15 && width === 480 ? 'active' : ''}`}
            onClick={() => { setFps(15); setWidth(480); }}
            style={{ padding: 12, textAlign: 'left', border: fps === 15 && width === 480 ? '2px solid var(--brand-primary)' : '2px solid transparent' }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Balanced</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.fps15}</div>
          </button>

          <button 
            className={`tool-card glass-panel ${fps === 24 && width === 640 ? 'active' : ''}`}
            onClick={() => { setFps(24); setWidth(640); }}
            style={{ padding: 12, textAlign: 'left', border: fps === 24 && width === 640 ? '2px solid var(--brand-primary)' : '2px solid transparent' }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>High Quality (Heavy)</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.fps24}</div>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <CenteredActionWorkspace
      title="Create GIF from Video"
      description="Convert any video into an optimized animated GIF in seconds. Customize frame rate and size without uploading your files to the cloud."
      toolId="create-gif"
      file={file}
      onFileSelect={(f) => { setFile(f); setOutputUrl(null); }}
      outputUrl={outputUrl}
      processing={processing}
      progress={progress}
      engine="tier3"
      onProcess={handleProcess}
      processActionText={t.gen}
      sidebarContent={sidebarContent}
      targetFormat="gif"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px' }}>
        <CreateGifHeroSection 
          section={{ type: 'hero', title: "Turn Videos into Viral GIFs", content: "Convert MP4, WebM, and MOV to animated GIFs in seconds. No watermarks, no signups, completely free." }} 
        />
        <CreateGifHowToSection 
          section={{
            type: 'howto',
            title: "How to Make a GIF",
            steps: [
              { title: "Upload Video", description: "Select any video file from your device." },
              { title: "Set Framerate", description: "Choose the FPS and output size to balance quality and file size." },
              { title: "Generate & Download", description: "Instantly create and save your animated GIF." }
            ]
          }} 
        />
        <CreateGifPerformanceSection 
          section={{ type: 'performance', title: "Built for Speed", content: "Our advanced WebAssembly engine compiles video frames directly in your browser without communicating with external servers." }} 
        />
        <CreateGifPrivacySection 
          section={{ type: 'privacy', title: "Your Files Stay Yours", content: "Because everything runs locally, your sensitive videos are completely safe. Disconnect from the internet and watch it still work." }} 
        />
        <CreateGifFAQSection />
      </div>
    </>
  );
};