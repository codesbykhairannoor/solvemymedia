import React, { useState } from 'react';
import { Settings2, FastForward, Clock, Shield, CheckCircle, Globe2, Gauge } from 'lucide-react';
import { DualColumnWorkspace } from '../components/workspaces/DualColumnWorkspace';
import { useLanguage } from '../hooks/useLanguage';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { ChangeVideoSpeedHeroSection, ChangeVideoSpeedPerformanceSection, ChangeVideoSpeedPrivacySection, ChangeVideoSpeedGeoSection, ChangeVideoSpeedHowToSection } from '../components/content-sections/tools/ChangeVideoSpeedSections';

export const ChangeVideoSpeed: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  const { t } = useLanguage();
  
  const sidebarStrings = {
    factor: t('speedVSettings') || "Speed Factor",
    desc: t('speedVTargetDesc') || "Change video playback speed without distorting audio pitch.",
    slow: t('speedVSlow') || "Slow (0.5x)",
    norm: t('speedVNorm') || "Normal (1.0x)",
    fast: t('speedVFast') || "Fast (2.0x)",
    change: t('speedVAction') || "Change Speed"
  };
  
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [speed, setSpeed] = useState<number>(1.5);

  const handleProcess = async () => {
    if (!file) return;
    const vpts = (1 / speed).toFixed(2);
    const args = [
      '-i', file.name,
      '-filter_complex', `[0:v]setpts=${vpts}*PTS[v];[0:a]atempo=${speed}[a]`,
      '-map', '[v]',
      '-map', '[a]',
      'output.mp4'
    ];
    const url = await runCustomFFmpeg([file], args, 'output.mp4', 'video/mp4');
    if (url) setOutputUrl(url);
  };

  const sidebarContent = (
    <>
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} className="text-brand-primary" />
          <span>{sidebarStrings.factor}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{sidebarStrings.desc}</p>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontWeight: 700, color: 'var(--text-main)' }}>
          <span>{speed.toFixed(1)}x</span>
        </div>
        <input 
          type="range" 
          min="0.5" 
          max="2.0" 
          step="0.1" 
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={processing || !!outputUrl}
          style={{
            width: '100%',
            cursor: processing || !!outputUrl ? 'not-allowed' : 'pointer',
            opacity: processing || !!outputUrl ? 0.6 : 1,
            accentColor: 'var(--brand-primary)'
          }}
        />
        <div style={{ display: 'flex', gap: '8px', marginTop: 12 }}>
          <button className={`tab-btn ${speed === 0.5 ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setSpeed(0.5)}>{sidebarStrings.slow}</button>
          <button className={`tab-btn ${speed === 1.0 ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setSpeed(1.0)}>{sidebarStrings.norm}</button>
          <button className={`tab-btn ${speed === 2.0 ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setSpeed(2.0)}>{sidebarStrings.fast}</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <DualColumnWorkspace
        accept="video/*"
        title={pseoData ? pseoData.h1 : (t('speedVTitle') || "Change Video Playback Speed")}
        description={pseoData ? pseoData.description : (t('speedVDesc') || "Easily speed up or slow down your videos. Create slow-motion effects or fast-forward timelapses without leaving your browser.")}
        toolId="change-video-speed"
        file={file}
        setFile={(f) => { setFile(f); setOutputUrl(null); }}
        outputUrl={outputUrl}
        onResetResult={() => setOutputUrl(null)}
        processing={processing}
        progress={progress}
        engine="tier3"
        onProcess={handleProcess}
        processActionText={sidebarStrings.change}
        sidebarContent={sidebarContent}
        targetFormat="mp4"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px' }}>
        
        {!pseoData && (
          <>
            <ChangeVideoSpeedHowToSection 
              flipLayout={false}
              section={{
                type: 'how-to',
                title: t('speedVHowTo') || 'How to Adjust Video Speed',
                steps: [
                  { title: t('speedVHowTo1') || 'Import Video', description: t('speedVHowTo1Desc') || 'Select any MP4, WebM, or MOV file from your device.' },
                  { title: t('speedVHowTo2') || 'Set Speed Factor', description: t('speedVHowTo2Desc') || 'Use the slider to set a speed between 0.5x (slow motion) and 2.0x (fast forward).' },
                  { title: t('speedVHowTo3') || 'Export Video', description: t('speedVHowTo3Desc') || 'Click process to apply the changes and download the new video instantly.' }
                ]
              }}
            />

            <ChangeVideoSpeedGeoSection 
              flipLayout={false}
              section={{
                type: 'geo',
                title: t('speedVGeoTitle') || 'Process Videos Anywhere',
                content: t('speedVGeoDesc') || 'No internet connection needed after the first load. Change video speeds even while completely offline.',
                badgeText: t('speedVGeoPill') || 'Local Processing'
              }}
            />

            <ChangeVideoSpeedPrivacySection 
              flipLayout={false}
              section={{
                type: 'privacy',
                title: t('speedVPrivTitle') || 'Complete Privacy Protection',
                content: t('speedVPrivDesc') || 'Your video content is never uploaded to any remote server. The entire speed adjustment process happens securely within your browser sandbox, keeping your media 100% private.'
              }}
            />

            <ChangeVideoSpeedPerformanceSection 
              flipLayout={false}
              section={{
                type: 'performance',
                title: t('speedVPerfTitle') || 'Precision Control Without Distortion',
                content: t('speedVPerfDesc') || 'Adjusting video speed usually breaks the audio pitch. We use advanced FFmpeg atempo filters to preserve the natural sound of your audio track even at 2x speeds.',
                badgeText: t('speedVPerfPill') || 'Lightning Fast'
              }}
              badges={[
                t('speedVFeat1Title') || 'Time Manipulation',
                t('speedVFeat2Title') || 'Pitch Correction',
                t('speedVFeat3Title') || 'Fast Export'
              ]}
            />
          </>
        )}

        

        </div>
    </>
  );
};