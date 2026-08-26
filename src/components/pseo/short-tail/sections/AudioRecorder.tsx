import React from 'react';
import { Mic, Radio, Download, ShieldCheck, PlayCircle, Settings } from 'lucide-react';

export const AudioRecorderHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: '#18181b', // Studio Dark Gray
      color: '#f4f4f5',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 12, 
          padding: '8px 24px', 
          background: 'rgba(239, 68, 68, 0.1)', 
          borderRadius: 30, 
          color: '#ef4444', 
          fontWeight: 800,
          marginBottom: 40,
          border: '1px solid rgba(239, 68, 68, 0.3)',
          letterSpacing: '2px',
          boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)'
        }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', animation: 'pulse 2s infinite' }} />
          ON AIR
          <style>{`@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }`}</style>
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
          fontWeight: 900, 
          color: '#ffffff',
          lineHeight: 1.1,
          marginBottom: 24,
          letterSpacing: '-0.03em'
        }}>
          {h1 || "Record Studio-Quality Audio In Browser"}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#a1a1aa', 
          lineHeight: 1.7, 
          maxWidth: 700,
          margin: '0 auto 48px'
        }}>
          {description || "Turn your browser into a digital audio workstation. Record voice memos, podcast segments, or interviews using your microphone without downloading any apps."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '10px 24px', 
              background: '#27272a', 
              borderRadius: 8, 
              color: '#d4d4d8', 
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AudioRecorderBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#09090b', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', textAlign: 'center', marginBottom: 64 }}>
          {safeData.benefitsTitle || "The Easiest Way to Record"}
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {[
            { icon: <Mic />, title: "Instant Access", desc: safeData.benefitsItems?.[0] || "No accounts, no login, no software installation. Just click allow microphone and start speaking." },
            { icon: <Download />, title: "Multiple Formats", desc: safeData.benefitsItems?.[1] || "Export your recording as a lightweight MP3 for sharing, or an uncompressed WAV for editing in ProTools or Logic." },
            { icon: <Radio />, title: "Podcast Ready", desc: safeData.benefitsItems?.[2] || "Connect your USB XLR interface directly to the browser. We capture exactly what your hardware sends us." }
          ].map((item, i) => (
            <div key={i} style={{ padding: 40, background: '#18181b', borderRadius: 24, textAlign: 'center', border: '1px solid #27272a' }}>
              <div style={{ width: 64, height: 64, margin: '0 auto 24px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: 16 }}>{item.title}</h3>
              <p style={{ color: '#a1a1aa', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AudioRecorderPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#18181b', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ padding: 40, background: '#09090b', borderRadius: 32, border: '1px solid #27272a', position: 'relative' }}>
             <ShieldCheck size={80} color="#22c55e" />
             <div style={{ position: 'absolute', top: -10, right: -10, background: '#22c55e', color: '#000', fontWeight: 800, padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem' }}>SECURE</div>
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: 20 }}>
            {safeData.privacyTitle || "We Don't Listen In"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#a1a1aa', lineHeight: 1.8 }}>
            {safeData.privacyDesc || "Your privacy is paramount. Unlike cloud-based transcription tools, our recorder buffers the audio data directly into your browser's RAM. We literally cannot hear your recordings."}
          </p>
        </div>
      </div>
    </section>
  );
};

export const AudioRecorderPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#09090b', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', textAlign: 'center', marginBottom: 64 }}>
          {safeData.performanceTitle || "High-Fidelity Capture"}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
             <div key={i} style={{ padding: '24px', background: '#18181b', borderRadius: 16, borderLeft: '4px solid #ef4444', display: 'flex', alignItems: 'center', gap: 16 }}>
               <Settings size={24} color="#71717a" />
               <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#e4e4e7' }}>{item}</span>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
