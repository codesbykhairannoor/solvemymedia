import React from 'react';
import { Settings2, HardDrive, Lock, Cpu, SlidersHorizontal, AudioWaveform } from 'lucide-react';

export const CompressWavHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: '#0f172a',
      color: '#e2e8f0',
      fontFamily: '"Fira Code", monospace',
      borderBottom: '1px solid #1e293b'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600;700&display=swap');
      `}</style>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ color: '#0ea5e9', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          {'//'} STUDIO AUDIO COMPRESSION
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          fontWeight: 700, 
          color: '#f8fafc',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          maxWidth: 800
        }}>
          {h1 || "Compress Massive WAV Stems"}
        </h1>
        
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#94a3b8', 
          lineHeight: 1.6, 
          maxWidth: 650,
          fontFamily: 'system-ui, sans-serif'
        }}>
          {description || "Uncompressed 24-bit/48kHz WAV files eat up hard drives fast. Downsample your stems to 16-bit/44.1kHz or compress them to high-quality MP3s for sending to clients."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '6px 12px', 
              background: '#020617', 
              border: '1px solid #334155', 
              color: '#38bdf8', 
              fontSize: '0.85rem'
            }}>
              [{tag}]
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CompressWavBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ width: '100%', background: '#0f172a', padding: 32, borderRadius: 16, border: '1px solid #1e293b', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontFamily: '"Fira Code", monospace', fontSize: '0.85rem', marginBottom: 24, borderBottom: '1px solid #334155', paddingBottom: 16 }}>
              <span>IN_WAV_24BIT</span>
              <span style={{ color: '#0ea5e9' }}>OUT_WAV_16BIT</span>
            </div>
            <AudioWaveform size={48} color="#0ea5e9" style={{ marginBottom: 24 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: '"Fira Code", monospace' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}><span>Size:</span> <span>-33%</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}><span>Quality:</span> <span>CD Standard</span></div>
            </div>
          </div>
        </div>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', marginBottom: 24 }}>
            {safeData.benefitsTitle || "Manage Your Disk Space"}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.7, marginBottom: 40 }}>
            {safeData.benefitsDesc || "Exporting a multitrack session creates gigabytes of WAV files. Learn how to intelligently compress them without losing noticeable dynamic range."}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { icon: <SlidersHorizontal />, title: "Bit Depth Reduction", desc: safeData.benefitsItems?.[0] || "Convert 32-bit float or 24-bit audio to standard 16-bit to instantly cut file size by 33%." },
              { icon: <HardDrive />, title: "Sample Rate Conversion", desc: safeData.benefitsItems?.[1] || "Downsample 96kHz or 48kHz audio to 44.1kHz (CD quality) to save even more space." }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 20 }}>
                <div style={{ color: '#0ea5e9', flexShrink: 0, marginTop: 4 }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ color: '#475569', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const CompressWavPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#e0f2fe', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <Lock size={48} color="#0369a1" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0c4a6e', marginBottom: 20 }}>
          {safeData.privacyTitle || "Keep Stems Secure"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#0369a1', lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>
          {safeData.privacyDesc || "Audio engineers shouldn't trust unreleased stems to cloud converters. Our compressor processes the WAV data array entirely inside your browser's local sandbox."}
        </p>
      </div>
    </section>
  );
};

export const CompressWavPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#0f172a', color: '#e2e8f0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: 24 }}>
              {safeData.performanceTitle || "WASM Audio Processing"}
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>
              {safeData.performanceDesc || "Converting large WAV chunks requires serious CPU power. We bypass JavaScript bottlenecks by utilizing WebAssembly to crunch the audio samples in C++ speeds."}
            </p>
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ padding: '32px', background: '#020617', border: '1px solid #1e293b', borderRadius: 16 }}>
              {safeData.performanceItems?.map((item: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i !== safeData.performanceItems.length -1 ? 16 : 0, fontFamily: '"Fira Code", monospace', fontSize: '0.9rem', color: '#38bdf8' }}>
                   <Cpu size={16} /> <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
