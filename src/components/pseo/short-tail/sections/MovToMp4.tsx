import React from 'react';
import { Apple, Smartphone, Laptop, Tv, CheckCircle, RefreshCcw, Shield } from 'lucide-react';

export const MovToMp4Hero: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section style={{ 
      background: 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)', 
      padding: '120px 24px 100px', 
      position: 'relative', 
      overflow: 'hidden',
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120%', height: 600, background: 'radial-gradient(ellipse at top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />
      
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.03)', padding: '6px 20px', borderRadius: 999, marginBottom: 24, border: '1px solid rgba(0,0,0,0.05)', backdropFilter: 'blur(10px)' }}>
          <Apple size={16} color="var(--text-main)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-main)' }}>Made for Apple Ecosystem</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: 24, color: '#111827', letterSpacing: '-0.02em' }}>
          {data.h1}
        </h1>
        
        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', lineHeight: 1.6, color: '#4b5563', maxWidth: 650, margin: '0 auto 40px' }}>
          {data.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
          {data.bespokeData?.heroTags?.map((tag: string, idx: number) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#374151', fontSize: '0.95rem', fontWeight: 500 }}>
              <CheckCircle size={16} color="var(--brand-primary)" />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const MovToMp4Benefits: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section style={{ padding: '120px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#111827', lineHeight: 1.2, marginBottom: 20 }}>
            {data.bespokeData?.benefitsTitle || "Universal Playback Guaranteed"}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', maxWidth: 700, margin: '0 auto' }}>
            {data.bespokeData?.benefitsDesc || "Stop dealing with format unsupported errors. Convert your MOV files to MP4 and watch them play seamlessly on any device in the world."}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {/* Device Cards */}
          <div style={{ background: 'rgba(249, 250, 251, 0.8)', backdropFilter: 'blur(20px)', padding: 40, borderRadius: 24, border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Smartphone size={48} color="#1f2937" strokeWidth={1.5} style={{ marginBottom: 24 }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12, color: '#111827' }}>Mobile Devices</h3>
            <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: 1.6 }}>Native support on Android and older iOS devices without relying on third-party players.</p>
          </div>
          <div style={{ background: 'rgba(249, 250, 251, 0.8)', backdropFilter: 'blur(20px)', padding: 40, borderRadius: 24, border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Laptop size={48} color="#1f2937" strokeWidth={1.5} style={{ marginBottom: 24 }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12, color: '#111827' }}>Web & Windows</h3>
            <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: 1.6 }}>Play directly in Chrome, Edge, and Firefox. Flawless playback on Windows Media Player.</p>
          </div>
          <div style={{ background: 'rgba(249, 250, 251, 0.8)', backdropFilter: 'blur(20px)', padding: 40, borderRadius: 24, border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Tv size={48} color="#1f2937" strokeWidth={1.5} style={{ marginBottom: 24 }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12, color: '#111827' }}>Smart TVs</h3>
            <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: 1.6 }}>MP4 is the gold standard for Samsung, LG, and Sony TVs. Say goodbye to codec errors.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const MovToMp4Performance: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section style={{ padding: '100px 24px', background: '#f8fafc' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <RefreshCcw size={48} color="var(--brand-primary)" style={{ marginBottom: 24 }} />
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#0f172a', marginBottom: 24 }}>
          {data.features?.[0]?.title || "Lightning Fast Transcoding"}
        </h2>
        <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#475569', maxWidth: 700 }}>
          {data.features?.[0]?.desc || "Because MOV and MP4 use very similar internal structures, we can often remux your video instead of re-encoding it. This means a 1GB video can be converted in seconds."}
        </p>
      </div>
    </section>
  );
};

export const MovToMp4Privacy: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section style={{ padding: '80px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', border: '1px solid #e2e8f0', borderRadius: 24, padding: 40, display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <Shield size={64} color="#10b981" strokeWidth={1.5} style={{ marginBottom: 20 }} />
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
            {data.features?.[1]?.title || "Offline & Secure"}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7 }}>
            {data.features?.[1]?.desc || "Your family videos and private recordings never leave your device. We use WebAssembly to convert everything right here in your browser."}
          </p>
        </div>
        <div style={{ flex: '1 1 300px', background: '#f8fafc', padding: 32, borderRadius: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: 12 }}>
              <span style={{ color: '#64748b' }}>Cloud Upload</span>
              <span style={{ color: '#ef4444', fontWeight: 600 }}>0 Bytes</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: 12 }}>
              <span style={{ color: '#64748b' }}>Local Processing</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>100%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Privacy Guaranteed</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>Yes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
