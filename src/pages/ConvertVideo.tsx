import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useLanguage } from '../hooks/useLanguage';
import { useUniversalCompressor } from '../hooks/useUniversalCompressor';
import { ConvertVideoHeroSection, ConvertVideoHowToSection, ConvertVideoGeoSection, ConvertVideoPrivacySection, ConvertVideoPerformanceSection } from '../components/content-sections/tools/ConvertVideoSections';
import { BentoRenderer } from '../components/pseo/BentoRenderer';

export const ConvertVideo: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, engine, processMedia } = useUniversalCompressor();
  const { t } = useLanguage();
  
  const ui = { 
    target_format: t('convVSettings') || "Target Format", 
    select_format: t('convVTargetDesc') || "Select the format you want to convert this video into.", 
    convert_mp4: t('convVAction') || "Convert to MP4" 
  };
  
  const pathParts = pseoData ? pseoData.path.split('-to-') : [];
  const initialFormat = pathParts.length > 1 ? pathParts[1] : 'mp4';
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>(initialFormat || 'mp4');

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
        title={pseoData ? pseoData.h1 : (t('convVTitle') || "Convert Video Formats Instantly")}
        description={pseoData ? pseoData.description : (t('convVDesc') || "Change your video from MP4 to WebM, MKV to AVI, and more. Processing runs directly in your browser without waiting for server uploads.")}
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
        {!pseoData && (
          <>
            <ConvertVideoHeroSection 
              flipLayout={false}
              section={{
                type: 'hero',
                title: pseoData ? pseoData.h1 : (t('convVHeroTitle2') || 'Convert Any Video Format Instantly'),
                content: pseoData ? pseoData.description : (t('convVHeroDesc2') || "Say goodbye to 'unsupported codec' errors. Convert your heavy MKV, AVI, MOV, and WebM files into universally playable MP4 videos directly within your browser.")
              }}
            />

            <ConvertVideoPerformanceSection 
              flipLayout={true}
              badges={[
                t('convVFeat1') || "No FFmpeg installation", 
                t('convVFeat2') || "Preserves original quality", 
                t('convVFeat3') || "Supports 4K and 60FPS"
              ]}
              section={{
                type: 'performance',
                title: pseoData && pseoData.features && pseoData.features[0] ? pseoData.features[0].title : (t('convVWasmTitle') || 'WebAssembly Transcoding Engine'),
                content: pseoData && pseoData.features && pseoData.features[0] ? pseoData.features[0].desc : (t('convVWasmDesc') || "We've ported industry-standard media frameworks directly into the browser. Unlike basic converters, SolveMyMedia utilizes SharedArrayBuffer and Web Workers to transcode gigabytes of video data blazingly fast without crashing your tab.")
              }}
            />

            <ConvertVideoPrivacySection
              flipLayout={false}
              section={{
                type: 'privacy',
                title: t('convVPrivTitle') || 'Play Anywhere, On Any Device',
                content: t('convVPrivDesc') || 'By converting your videos to MP4 (H.264/AAC), you ensure they will play flawlessly on iPhones, Androids, Smart TVs, and social media platforms.'
              }}
            />

            <ConvertVideoHowToSection 
              flipLayout={false}
              section={{
                type: 'how-to',
                title: t('convVHowTo') || 'How to Convert Videos Offline',
                steps: [
                  { title: t('convVHowTo1') || 'Drop your Video', description: t('convVHowTo1Desc') || 'Select any obscure video format from your local drive.' },
                  { title: t('convVHowTo2') || 'Choose Target', description: t('convVHowTo2Desc') || 'Select MP4 for universal playback or WebM for web optimization.' },
                  { title: t('convVHowTo3') || 'Save File', description: t('convVHowTo3Desc') || 'The conversion happens locally. Click download when done.' }
                ]
              }}
            />

            <ConvertVideoGeoSection 
              flipLayout={false}
              section={{
                type: 'geo',
                title: t('convVGeoTitle') || '100% Local Execution',
                content: t('convVGeoDesc') || 'No accounts, no software installation, and no upload limits. Just drag, drop, and convert.'
              }}
            />
          </>
        )}
        
        {/* DYNAMIC PSEO SECTION */}
        {pseoData && pseoData.bentoSections && (
          <div style={{ padding: '40px 0' }}>
             <BentoRenderer sections={pseoData.bentoSections} />
          </div>
        )}

        {/* SECTION 5: FAQ */}
        <section className="content-section faq-section" style={{ padding: '0 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('faqTitle') || 'Frequently Asked Questions'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {(pseoData?.faqs || [
                {
                  q: t('convVFaq1Q') || "Why convert MKV to MP4?",
                  a: t('convVFaq1A') || "MKV is a great container, but many default media players (like QuickTime on Mac) and social networks do not support it natively. Converting it to MP4 guarantees it can be viewed by anyone, anywhere."
                },
                {
                  q: t('convVFaq2Q') || "Is there a file size limit for conversion?",
                  a: t('convVFaq2A') || "No! Because our tool runs locally on your browser using WebAssembly, there are no artificial limits. You can convert 10GB+ movies as long as you have enough disk space and memory."
                },
                {
                  q: t('convVFaq3Q') || "Does this conversion reduce the video quality?",
                  a: t('convVFaq3A') || "By default, we set the target quality to 100% to ensure a virtually lossless conversion. The output MP4 will look identical to your original source file."
                }
              ]).map((faq: any, i: number) => (
                <div key={i} style={{ background: 'var(--bg-card)', padding: 32, borderRadius: 20, border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
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