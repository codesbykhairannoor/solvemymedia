import React from 'react';
import { Type, PlaySquare, Subtitles, Video, Search, Lock, Zap } from 'lucide-react';

export const TranscribeMp4Hero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: '#111827',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 20px', background: '#374151', borderRadius: 8, color: '#facc15', fontWeight: 700, marginBottom: 32, letterSpacing: '1px' }}>
            <Type size={18} /> SUBTITLES & CAPTIONS
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
            fontWeight: 800, 
            color: '#f9fafb',
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: '-0.02em'
          }}>
            {h1 || "Generate Subtitles from MP4 Videos"}
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#9ca3af', 
            lineHeight: 1.7, 
            marginBottom: 48
          }}>
            {description || "Don't pay for expensive captioning services. Automatically extract dialogue from your video files and convert them into text or SRT subtitle files instantly."}
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {safeData.heroTags?.map((tag: string, i: number) => (
              <div key={i} style={{ 
                padding: '10px 20px', 
                background: 'rgba(250, 204, 21, 0.1)', 
                border: '1px solid rgba(250, 204, 21, 0.3)',
                borderRadius: 4, 
                color: '#fde047', 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <Subtitles size={16} /> {tag}
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          {/* Mock Video Player with Subtitles */}
          <div style={{ width: '100%', maxWidth: 500, aspectRatio: '16/9', background: '#030712', borderRadius: 16, border: '2px solid #374151', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.2 }}>
              <PlaySquare size={80} color="#facc15" />
            </div>
            {/* Subtitle text */}
            <div style={{ background: 'rgba(0,0,0,0.8)', color: '#facc15', padding: '8px 16px', borderRadius: 8, fontSize: '1.2rem', fontWeight: 700, textAlign: 'center', alignSelf: 'center', zIndex: 2, textShadow: '2px 2px 0 #000' }}>
              [Automatically Generated Captions]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TranscribeMp4Benefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#1f2937', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#f9fafb', textAlign: 'center', marginBottom: 64 }}>
          {safeData.benefitsTitle || "Why Caption Your Videos?"}
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {[
            { icon: <Search />, title: "Boost SEO & Discovery", desc: safeData.benefitsItems?.[0] || "Search engines can't watch videos, but they can read text. Transcribing your video gives Google rich keywords to index." },
            { icon: <Video />, title: "Social Media Engagement", desc: safeData.benefitsItems?.[1] || "85% of Facebook and TikTok videos are watched without sound. Captions keep viewers watching your content." },
            { icon: <Subtitles />, title: "Export to SRT or VTT", desc: safeData.benefitsItems?.[2] || "We output standard subtitle formats with exact timestamps, ready to be uploaded to YouTube or Premiere Pro." }
          ].map((item, i) => (
            <div key={i} style={{ padding: 32, background: '#111827', borderRadius: 16, borderTop: '4px solid #facc15' }}>
              <div style={{ marginBottom: 24, color: '#facc15' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f9fafb', marginBottom: 16 }}>{item.title}</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TranscribeMp4Privacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#111827', color: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '64px 32px', background: '#374151', borderRadius: 32 }}>
        <Lock size={64} color="#facc15" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 20 }}>
          {safeData.privacyTitle || "We Don't Upload Your 2GB Videos"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#d1d5db', lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>
          {safeData.privacyDesc || "Uploading massive MP4 files to a cloud transcriber takes hours and wastes bandwidth. Our tool extracts the audio track locally and transcribes it instantly. Your video never leaves your computer."}
        </p>
      </div>
    </section>
  );
};

export const TranscribeMp4Performance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#1f2937', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 64, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f9fafb', marginBottom: 24 }}>
            {safeData.performanceTitle || "Real-Time AI Transcription"}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#9ca3af', lineHeight: 1.7, marginBottom: 32 }}>
            {safeData.performanceDesc || "Watch the text appear as the video plays. We use cutting-edge Web Speech APIs to deliver instantaneous, highly accurate captions."}
          </p>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            {safeData.performanceItems?.map((item: string, i: number) => (
              <div key={i} style={{ background: '#111827', padding: '24px', borderRadius: 12, borderLeft: '4px solid #facc15', display: 'flex', alignItems: 'center', gap: 16 }}>
                <Zap size={24} color="#facc15" />
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f9fafb' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
