import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useUniversalCompressor } from '../hooks/useUniversalCompressor';
import { ConvertVideoHeroSection, ConvertVideoHowToSection, ConvertVideoGeoSection, ConvertVideoPrivacySection, ConvertVideoPerformanceSection } from '../components/content-sections/tools/ConvertVideoSections';

export const ConvertVideo: React.FC = () => {
  const { processing, progress, engine, processMedia } = useUniversalCompressor();
  
  const ui = { target_format: "Target Format", select_format: "Select the format you want to convert this video into.", convert_mp4: "Convert to MP4" };
  
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('mp4');

  const handleProcess = async () => {
    if (!file) return;
    const url = await processMedia(file, 100, targetFormat);
    if (url) setOutputUrl(url);
  };

  const sidebarContent = (
    <>
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} className="text-brand-primary" />
          <span>{ui.target_format}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>{ui.select_format}</p>
        
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['mp4', 'webm', 'mkv', 'avi'].map((fmt) => (
            <button 
              key={fmt}
              className={`tab-btn ${targetFormat === fmt ? 'active' : ''}`} 
              style={{ padding: '8px 16px', fontSize: '0.9rem' }} 
              onClick={() => setTargetFormat(fmt)}
            >
              .{fmt}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      <CenteredActionWorkspace
        title="Convert Video Formats Fast"
        description="Seamlessly convert your video files into MP4, WebM, MOV, and AVI formats right from your browser. 100% private and ultra-fast."
        toolId="convert-video"
        file={file}
        onFileSelect={setFile}
        outputUrl={outputUrl}
        processing={processing}
        progress={progress}
        engine={engine}
        onProcess={handleProcess}
        processActionText={targetFormat === 'mp4' ? ui.convert_mp4 : ui.convert_mp4.replace('MP4', targetFormat.toUpperCase())}
        sidebarContent={sidebarContent}
        targetFormat={targetFormat}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px' }}>
        
        <ConvertVideoHeroSection 
          flipLayout={false}
          section={{
            type: 'hero',
            title: 'Convert Any Video Format Instantly',
            content: "Say goodbye to 'unsupported codec' errors. Convert your heavy MKV, AVI, MOV, and WebM files into universally playable MP4 videos directly within your browser."
          }}
        />

        <ConvertVideoPerformanceSection 
          flipLayout={true}
          badges={["No FFmpeg installation", "Preserves original quality", "Supports 4K and 60FPS"]}
          section={{
            type: 'performance',
            title: 'WebAssembly Transcoding Engine',
            content: "We've ported industry-standard media frameworks directly into the browser. Unlike basic converters, SolveMyMedia utilizes SharedArrayBuffer and Web Workers to transcode gigabytes of video data blazingly fast without crashing your tab."
          }}
        />

        <ConvertVideoPrivacySection
          flipLayout={false}
          section={{
            type: 'privacy',
            title: 'Play Anywhere, On Any Device',
            content: 'By converting your videos to MP4 (H.264/AAC), you ensure they will play flawlessly on iPhones, Androids, Smart TVs, and social media platforms.'
          }}
        />

        <ConvertVideoHowToSection 
          flipLayout={false}
          section={{
            type: 'how-to',
            title: 'How to Convert Videos Offline',
            steps: [
              { title: 'Drop your Video', description: 'Select any obscure video format from your local drive.' },
              { title: 'Choose Target', description: 'Select MP4 for universal playback or WebM for web optimization.' },
              { title: 'Save File', description: 'The conversion happens locally. Click download when done.' }
            ]
          }}
        />

        <ConvertVideoGeoSection 
          flipLayout={false}
          section={{
            type: 'geo',
            title: '100% Local Execution',
            content: 'No accounts, no software installation, and no upload limits. Just drag, drop, and convert.'
          }}
        />

        {/* SECTION 5: FAQ */}
        <section className="content-section faq-section" style={{ padding: '0 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                {
                  q: "Why convert MKV to MP4?",
                  a: "MKV is a great container, but many default media players (like QuickTime on Mac) and social networks do not support it natively. Converting it to MP4 guarantees it can be viewed by anyone, anywhere."
                },
                {
                  q: "Is there a file size limit for conversion?",
                  a: "No! Because our tool runs locally on your browser using WebAssembly, there are no artificial limits. You can convert 10GB+ movies as long as you have enough disk space and memory."
                },
                {
                  q: "Does this conversion reduce the video quality?",
                  a: "By default, we set the target quality to 100% to ensure a virtually lossless conversion. The output MP4 will look identical to your original source file."
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