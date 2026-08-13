import { CropVideoHeroSection, CropVideoHowToSection, CropVideoPlatformSection, CropVideoPrivacySection, CropVideoFAQSection } from '../components/content-sections/tools/CropVideoSections';
import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';

import { useLanguage } from '../hooks/useLanguage';
import { NativeLayoutRenderer } from '../components/pseo/NativeLayoutRenderer';

export const CropVideo: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  const { t } = useLanguage();
  
  const ui = {
    ratio: t('cropRatio') || "Crop Aspect Ratio",
    desc: t('cropDesc') || "Center-crop your video to a specific social media aspect ratio.",
    square: t('cropSquare') || "1:1 (Square)",
    square_desc: t('cropSquareDesc') || "Perfect for Instagram Feed",
    vert: t('cropVert') || "9:16 (Vertical)",
    vert_desc: t('cropVertDesc') || "For TikTok, Reels, Shorts",
    land: t('cropLand') || "16:9 (Landscape)",
    land_desc: t('cropLandDesc') || "For YouTube or TV",
    action: t('cropAction') || "Crop Video"
  };

  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>('9:16');

  const handleProcess = async () => {
    if (!file) return;
    
    let cropFilter = '';
    if (aspectRatio === '1:1') {
      cropFilter = 'crop=min(iw\\,ih):min(iw\\,ih)';
    } else if (aspectRatio === '9:16') {
      cropFilter = 'crop=min(iw\\,ih*9/16):min(ih\\,iw*16/9)';
    } else if (aspectRatio === '16:9') {
      cropFilter = 'crop=min(iw\\,ih*16/9):min(ih\\,iw*9/16)';
    }

    const args = ['-i', file.name, '-vf', cropFilter, 'output.mp4'];
    const url = await runCustomFFmpeg([file], args, 'output.mp4', 'video/mp4');
    if (url) setOutputUrl(url);
  };

  const sidebarContent = (
    <>
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} className="text-brand-primary" />
          <span>{ui.ratio}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{ui.desc}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button 
            className={`tool-card glass-panel ${aspectRatio === '1:1' ? 'active' : ''}`}
            onClick={() => setAspectRatio('1:1')}
            disabled={processing || !!outputUrl}
            style={{ padding: 12, textAlign: 'left', border: aspectRatio === '1:1' ? '2px solid var(--brand-primary)' : '2px solid transparent', cursor: processing || !!outputUrl ? 'not-allowed' : 'pointer', opacity: processing || !!outputUrl ? 0.6 : 1 }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{ui.square}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ui.square_desc}</div>
          </button>

          <button 
            className={`tool-card glass-panel ${aspectRatio === '9:16' ? 'active' : ''}`}
            onClick={() => setAspectRatio('9:16')}
            disabled={processing || !!outputUrl}
            style={{ padding: 12, textAlign: 'left', border: aspectRatio === '9:16' ? '2px solid var(--brand-primary)' : '2px solid transparent', cursor: processing || !!outputUrl ? 'not-allowed' : 'pointer', opacity: processing || !!outputUrl ? 0.6 : 1 }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{ui.vert}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ui.vert_desc}</div>
          </button>

          <button 
            className={`tool-card glass-panel ${aspectRatio === '16:9' ? 'active' : ''}`}
            onClick={() => setAspectRatio('16:9')}
            disabled={processing || !!outputUrl}
            style={{ padding: 12, textAlign: 'left', border: aspectRatio === '16:9' ? '2px solid var(--brand-primary)' : '2px solid transparent', cursor: processing || !!outputUrl ? 'not-allowed' : 'pointer', opacity: processing || !!outputUrl ? 0.6 : 1 }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{ui.land}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ui.land_desc}</div>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <CenteredActionWorkspace
      title={pseoData ? pseoData.h1 : (t('cropTitle') || "Crop Video Dimensions to Any Aspect Ratio")}
      description={pseoData ? pseoData.description : (t('cropSub') || "Crop and resize your videos easily with our visual cropper. All processing happens securely on your own device.")}
      toolId="crop-video"
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
        {!pseoData && (
          <>
            <CropVideoHeroSection 
              section={{ type: 'hero', title: t('cropHero') || "Crop Video Perfectly", content: t('cropHeroDesc') || "Trim out the edges of your video for TikTok, Reels, and YouTube Shorts instantly without watermarks." }} 
            />
            <CropVideoHowToSection 
              section={{
                type: 'howto',
                title: t('cropHowTo') || "How to Crop Videos",
                steps: [
                  { title: t('cropHowTo1') || "Select a Video", description: t('cropHowTo1Desc') || "Choose any video file from your local device." },
                  { title: t('cropHowTo2') || "Pick Aspect Ratio", description: t('cropHowTo2Desc') || "Select the desired format like 9:16 vertical or 1:1 square." },
                  { title: t('cropHowTo3') || "Crop & Export", description: t('cropHowTo3Desc') || "Hit crop and your video will be instantly ready for download." }
                ]
              }} 
            />
            <CropVideoPlatformSection 
              section={{ type: 'platform', title: t('cropPlat') || "Social Media Ready", content: t('cropPlatDesc') || "Perfectly align your video dimensions for any social platform and ensure it looks professional." }} 
            />
            <CropVideoPrivacySection 
              section={{ type: 'privacy', title: t('cropPriv') || "Secure Local Processing", content: t('cropPrivDesc') || "Your video files are strictly kept on your local machine and never uploaded or stored anywhere else." }} 
            />
          </>
        )}

        {/* DYNAMIC PSEO SECTION */}
        {pseoData && (
          <NativeLayoutRenderer data={pseoData} />
        )}
        <CropVideoFAQSection 
          faqs={pseoData?.faqs || [
            { q: t('cropFaq1Q') || "Does cropping reduce video quality?", a: t('cropFaq1A') || "Cropping technically re-encodes the video, but we use high-quality presets to ensure the cropped area retains its original sharpness." },
            { q: t('cropFaq2Q') || "Can I do custom free-form cropping?", a: t('cropFaq2A') || "Currently we only support center-cropping to standard social media aspect ratios (1:1, 9:16, 16:9) to keep the process lightning fast and simple." },
            { q: t('cropFaq3Q') || "Is it really private?", a: t('cropFaq3A') || "Absolutely. Everything happens directly inside your web browser. Try turning off your Wi-Fi before clicking 'Crop'!" }
          ]}
        />
      </div>
    </>
  );
};