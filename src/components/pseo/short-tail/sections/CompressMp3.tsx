import React from 'react';
import { Mic, Headphones, Volume2, ShieldCheck, Activity, Smartphone } from 'lucide-react';

export const CompressMp3Hero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: '#09090b',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(34, 211, 238, 0.1)', borderRadius: 20, color: '#22d3ee', fontWeight: 600, fontSize: '0.9rem', marginBottom: 24 }}>
            <Activity size={16} /> Audio Bitrate Optimizer
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 800, 
            lineHeight: 1.1,
            marginBottom: 24,
            background: 'linear-gradient(to right, #22d3ee, #f472b6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {h1 || "Squeeze More Music Into Your Phone"}
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#a1a1aa', 
            lineHeight: 1.6, 
            marginBottom: 40
          }}>
            {description || "High bitrate MP3s sound great but eat up your storage limit. Reduce the bitrate to 128kbps or 64kbps to fit thousands more podcasts and songs on your device."}
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {safeData.heroTags?.map((tag: string, i: number) => (
              <span key={i} style={{ padding: '8px 16px', background: '#18181b', border: '1px solid #27272a', borderRadius: 8, color: '#f472b6', fontSize: '0.9rem', fontWeight: 600 }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          {/* Neon Waveform Graphic */}
          <div style={{ width: '100%', height: 200, display: 'flex', alignItems: 'flex-end', gap: 8, justifyContent: 'center', opacity: 0.8 }}>
            {[40, 70, 45, 90, 60, 80, 50, 100, 65, 85, 30].map((height, i) => (
              <div key={i} style={{ 
                width: 12, 
                height: `${height}%`, 
                background: `linear-gradient(to top, #22d3ee, #f472b6)`, 
                borderRadius: 6,
                boxShadow: '0 0 15px rgba(244, 114, 182, 0.4)'
              }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const CompressMp3Benefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#18181b', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', marginBottom: 24 }}>
          {safeData.benefitsTitle || "More Audio, Less Space"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#a1a1aa', marginBottom: 64, maxWidth: 700, margin: '0 auto 64px' }}>
          {safeData.benefitsDesc || "Not everything needs to be 320kbps. Podcasts, audiobooks, and lectures sound exactly the same at much lower bitrates."}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {[
            { icon: <Mic />, title: "Perfect for Podcasts", desc: safeData.benefitsItems?.[0] || "Spoken word doesn't require high frequencies. Compress a 1-hour podcast down to just 15MB." },
            { icon: <Smartphone />, title: "Offline Storage", desc: safeData.benefitsItems?.[1] || "Fit your entire music library onto an old iPod or cheap Android phone without running out of space." },
            { icon: <Volume2 />, title: "Smart Encoding", desc: safeData.benefitsItems?.[2] || "We use LAME VBR (Variable Bit Rate) to only use data during complex audio passages, saving even more space." }
          ].map((item, i) => (
            <div key={i} style={{ padding: 40, background: '#27272a', borderRadius: 24, textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: 'linear-gradient(90deg, #22d3ee, #f472b6)' }} />
              <div style={{ width: 64, height: 64, borderRadius: 16, background: '#18181b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: '#22d3ee' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>{item.title}</h3>
              <p style={{ color: '#a1a1aa', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CompressMp3Privacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#09090b', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ padding: 40, background: '#18181b', borderRadius: '50%', border: '1px solid #27272a', boxShadow: '0 0 40px rgba(34, 211, 238, 0.1)' }}>
            <ShieldCheck size={64} color="#22d3ee" />
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: 20 }}>
            {safeData.privacyTitle || "Keep Unreleased Audio Safe"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#a1a1aa', lineHeight: 1.8 }}>
            {safeData.privacyDesc || "Producers compressing unreleased tracks shouldn't have to upload their MP3s to an untrusted server. Our tool performs the bitrate reduction locally in your browser memory."}
          </p>
        </div>
      </div>
    </section>
  );
};

export const CompressMp3Performance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#18181b', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#ffffff', textAlign: 'center', marginBottom: 64 }}>
          {safeData.performanceTitle || "Lightning Fast Batch Compression"}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
             <div key={i} style={{ padding: '24px 32px', background: '#09090b', borderRadius: 16, border: '1px solid #27272a', display: 'flex', alignItems: 'center', gap: 16 }}>
               <Headphones size={24} color="#f472b6" />
               <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#e4e4e7' }}>{item}</span>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
