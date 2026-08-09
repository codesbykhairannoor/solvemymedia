import React, { useState } from 'react';
import { Settings2, FastForward, Clock, Shield, CheckCircle, Globe2, Gauge } from 'lucide-react';
import { DualColumnWorkspace } from '../components/workspaces/DualColumnWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { ChangeVideoSpeedHeroSection, ChangeVideoSpeedPerformanceSection, ChangeVideoSpeedPrivacySection, ChangeVideoSpeedGeoSection } from '../components/content-sections/tools/ChangeVideoSpeedSections';

export const ChangeVideoSpeed: React.FC = () => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  
  const t = {
    factor: "Speed Factor",
    desc: "Change video playback speed without distorting audio pitch.",
    slow: "Slow (0.5x)",
    norm: "Normal (1.0x)",
    fast: "Fast (2.0x)",
    change: "Change Speed"
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
          <span>{t.factor}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{t.desc}</p>
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
          <button className={`tab-btn ${speed === 0.5 ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setSpeed(0.5)}>{t.slow}</button>
          <button className={`tab-btn ${speed === 1.0 ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setSpeed(1.0)}>{t.norm}</button>
          <button className={`tab-btn ${speed === 2.0 ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setSpeed(2.0)}>{t.fast}</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <DualColumnWorkspace
        accept="video/*"
        title="Change Video Playback Speed"
        description="Easily speed up or slow down your videos. Create slow-motion effects or fast-forward timelapses without leaving your browser."
        toolId="change-video-speed"
        file={file}
        setFile={(f) => { setFile(f); setOutputUrl(null); }}
        outputUrl={outputUrl}
        processing={processing}
        progress={progress}
        engine="tier3"
        onProcess={handleProcess}
        processActionText={t.change}
        sidebarContent={sidebarContent}
        targetFormat="mp4"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px' }}>
        
        <ChangeVideoSpeedHeroSection 
          flipLayout={false}
          section={{
            type: 'hero',
            title: 'Master Time with Frame-Level Precision',
            content: 'Create stunning timelapses from your long recordings or smooth slow-motion sequences for your sports clips. Our advanced frame processor shifts timestamps accurately without affecting pitch.'
          }}
        />

        <ChangeVideoSpeedPerformanceSection 
          flipLayout={true}
          badges={['Zero server latency', 'Adaptive audio pitch', 'Wasm speed']}
          section={{
            type: 'performance',
            title: 'Pitch-Perfect Audio Adjustments',
            content: "Most tools make slow-motion audio sound deep and distorted. Our tool automatically applies an 'atempo' filter to preserve natural voice tones."
          }}
        />

        <ChangeVideoSpeedPrivacySection
          flipLayout={false}
          section={{
            type: 'privacy',
            title: 'We Respect Your Privacy',
            content: 'Have you ever wondered what happens to your private videos when you upload them to "free" online speed changers? They can be viewed, stored, or analyzed. We eliminate that risk by doing all the heavy lifting locally on your device.'
          }}
        />

        <ChangeVideoSpeedGeoSection
          flipLayout={false}
          section={{
            type: 'geo',
            title: 'Global Speed, Local Execution',
            content: "It doesn't matter if you have a slow internet connection. Since the video never leaves your computer, you can alter the speed of 4GB files just as easily as 4MB ones. WebAssembly unlocks desktop-class FFmpeg speed right inside Chrome or Safari.",
            badgeText: 'BROWSER ARCHITECTURE'
          }}
        />

        {/* SECTION 5: FAQ */}
        <section className="content-section faq-section" style={{ padding: '0 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                {
                  q: "Will speeding up my video make the audio sound like a chipmunk?",
                  a: "No! Unlike rudimentary video editors, our tool automatically uses a time-stretching audio filter (atempo) which preserves the original pitch while changing the speed."
                },
                {
                  q: "What is the maximum speed I can set?",
                  a: "You can slow down the video up to 0.5x (half speed) or speed it up to 2.0x (double speed) in a single pass to ensure high-quality interpolation."
                },
                {
                  q: "Is it really free for unlimited large videos?",
                  a: "Yes. We don't have server costs because the processing uses your own device's CPU. You can process as many large files as you want completely for free."
                }
              ].map((faq, idx) => (
                <div key={idx} style={{ background: 'var(--bg-card)', padding: 32, borderRadius: 20, border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12, color: 'var(--text-main)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ color: 'var(--brand-primary)' }}>Q:</span> {faq.q}
                  </h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>
                    <strong style={{ color: 'var(--brand-secondary)' }}>A:</strong> {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};