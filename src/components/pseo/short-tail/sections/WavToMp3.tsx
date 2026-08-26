import React from 'react';
import { Waveform, Headphones, HardDrive, Lock, Zap, FileAudio } from 'lucide-react';

export const WavToMp3Hero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: 'linear-gradient(135deg, #2e1065, #4c1d95, #000000)',
      color: 'white',
      fontFamily: '"Manrope", system-ui, sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&display=swap');
      `}</style>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Headphones size={16} /> Professional Audio Compressor
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 800, 
            lineHeight: 1.1,
            marginBottom: 24,
            background: 'linear-gradient(to right, #a78bfa, #fbcfe8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {h1 || "Compress Heavy WAV Files to MP3"}
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#ddd6fe', 
            lineHeight: 1.6, 
            marginBottom: 40 
          }}>
            {description || "WAV files sound great, but they take up massive amounts of storage space. Convert them to high-bitrate MP3s to save up to 90% space without noticing the difference."}
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {safeData.heroTags?.map((tag: string, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fbcfe8', fontWeight: 600 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbcfe8' }} /> {tag}
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }}>
           <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 32, padding: 40, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <span style={{ color: '#a78bfa', fontWeight: 800 }}>WAV</span>
                <span style={{ color: '#fbcfe8', fontWeight: 800 }}>MP3</span>
              </div>
              <div style={{ display: 'flex', gap: 16, height: 120, alignItems: 'center' }}>
                <div style={{ flex: 4, height: '100%', background: 'linear-gradient(to bottom, #a78bfa, transparent)', borderRadius: 12, opacity: 0.8 }} />
                <div style={{ flex: 1, height: '30%', background: 'linear-gradient(to bottom, #fbcfe8, transparent)', borderRadius: 12 }} />
              </div>
              <div style={{ textAlign: 'center', marginTop: 24, color: '#ddd6fe', fontSize: '0.9rem', fontWeight: 600 }}>
                ~ 90% Storage Saved
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export const WavToMp3Benefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'var(--bg-main)', fontFamily: '"Manrope", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 24 }}>
          {safeData.benefitsTitle || "Why Convert to MP3?"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: 64, maxWidth: 700, margin: '0 auto 64px' }}>
          {safeData.benefitsDesc || "Uncompressed WAV audio is perfect for music production, but completely impractical for streaming, sharing, or listening on your phone."}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            { icon: <HardDrive />, title: "Free Up Space", desc: safeData.benefitsItems?.[0] || "A 3-minute WAV is ~30MB. An MP3 is ~3MB." },
            { icon: <FileAudio />, title: "Shareable", desc: safeData.benefitsItems?.[1] || "Easily attach to emails or send via WhatsApp." },
            { icon: <Headphones />, title: "320kbps Quality", desc: safeData.benefitsItems?.[2] || "Encode at maximum bitrate for near-lossless sound." }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 32, background: 'var(--bg-card)', padding: '32px 48px', borderRadius: 24, border: '1px solid var(--border-color)', textAlign: 'left' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WavToMp3Privacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'linear-gradient(to right, #4c1d95, #2e1065)', color: 'white', fontFamily: '"Manrope", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ padding: 40, background: 'rgba(255,255,255,0.1)', borderRadius: '50%', backdropFilter: 'blur(10px)', border: '2px dashed rgba(255,255,255,0.2)' }}>
            <Lock size={64} color="#fbcfe8" />
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 20 }}>
            {safeData.privacyTitle || "Keep Your Mixes Private"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#ddd6fe', lineHeight: 1.8 }}>
            {safeData.privacyDesc || "Producers and podcasters shouldn't have to upload unreleased audio to sketchy servers. Our converter runs completely locally. Your WAV files stay on your machine."}
          </p>
        </div>
      </div>
    </section>
  );
};

export const WavToMp3Performance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)', fontFamily: '"Manrope", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 24, textAlign: 'center' }}>
          {safeData.performanceTitle || "LAME MP3 Encoding in Browser"}
        </h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 700, margin: '0 auto 64px' }}>
          {safeData.performanceDesc || "We've compiled the industry-standard LAME encoder into WebAssembly, bringing studio-grade audio compression directly to your web browser."}
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
             <div key={i} style={{ background: 'var(--bg-main)', padding: '32px', borderRadius: 24, border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: 16 }}>
               <Zap size={24} color="#8b5cf6" />
               <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{item}</span>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
