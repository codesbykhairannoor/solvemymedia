import React from 'react';
import { Music, Sliders, Shield, Zap, Sparkles, Disc } from 'lucide-react';

export const FlacToMp3Hero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: 'radial-gradient(ellipse at bottom, #27272a, #09090b)',
      color: '#e4e4e7',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ padding: '12px', background: 'linear-gradient(135deg, #fbbf24, #d97706)', borderRadius: '50%', marginBottom: 32, boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)' }}>
          <Disc size={40} color="#000" />
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          fontWeight: 800, 
          lineHeight: 1.1,
          marginBottom: 24,
          color: '#ffffff',
          letterSpacing: '-0.02em'
        }}>
          {h1 || "FLAC to MP3 for Everyday Listening"}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#a1a1aa', 
          lineHeight: 1.7, 
          maxWidth: 700,
          marginBottom: 48 
        }}>
          {description || "FLAC files are perfect for archiving, but they are too large for mobile devices. Compress your audiophile tracks into high-bitrate MP3s for seamless everyday playback."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '6px 16px', 
              background: '#18181b', 
              border: '1px solid #3f3f46', 
              borderRadius: 8, 
              color: '#fbbf24', 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <Sparkles size={16} /> {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FlacToMp3Benefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#09090b', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: 24 }}>
            {safeData.benefitsTitle || "Near-Lossless at 320kbps"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#a1a1aa', lineHeight: 1.7, marginBottom: 40 }}>
            {safeData.benefitsDesc || "Most people cannot tell the difference between a FLAC file and a 320kbps MP3 file. Save gigabytes of space on your phone while maintaining premium sound quality."}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { icon: <Music />, title: safeData.benefitsItems?.[0] || "Preserve Metadata (ID3 tags)" },
              { icon: <Sliders />, title: safeData.benefitsItems?.[1] || "Adjustable Bitrate" }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '24px', background: '#18181b', borderRadius: 16, border: '1px solid #27272a' }}>
                <div style={{ color: '#fbbf24' }}>{item.icon}</div>
                <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '1.1rem' }}>{item.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          {/* Abstract Sound Graphic */}
          <div style={{ width: '100%', maxWidth: 400, aspectRatio: '1', background: '#18181b', borderRadius: '50%', position: 'relative', border: '1px solid #3f3f46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ width: '70%', height: '70%', borderRadius: '50%', border: '2px dashed #fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ width: '40%', height: '40%', borderRadius: '50%', background: 'linear-gradient(135deg, #fbbf24, #d97706)' }} />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FlacToMp3Privacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#18181b', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <Shield size={48} color="#fbbf24" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: 20 }}>
          {safeData.privacyTitle || "Don't Upload Your Rare Rips"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#a1a1aa', lineHeight: 1.7 }}>
          {safeData.privacyDesc || "Uploading large FLAC files to a server is slow and insecure. Our tool runs directly in your browser. Your rare audio rips remain safely on your hard drive."}
        </p>
      </div>
    </section>
  );
};

export const FlacToMp3Performance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#09090b', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: 20 }}>
            {safeData.performanceTitle || "Fast Multi-core Encoding"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#a1a1aa', maxWidth: 700, margin: '0 auto' }}>
            {safeData.performanceDesc || "Batch convert entire albums in seconds. We utilize WebAssembly to squeeze maximum performance from your CPU."}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
             <div key={i} style={{ padding: '32px', background: '#18181b', borderRadius: 16, border: '1px solid #27272a', textAlign: 'center' }}>
               <Zap size={32} color="#fbbf24" style={{ margin: '0 auto 16px' }} />
               <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '1.1rem' }}>{item}</div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
