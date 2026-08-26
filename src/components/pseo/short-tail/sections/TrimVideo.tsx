import React from 'react';
import { Scissors, Film, ShieldCheck, Zap, Youtube, Clock } from 'lucide-react';

export const TrimVideoHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: '#020617', // Very dark slate (cinematic)
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 24px', background: 'rgba(255,255,255,0.05)', borderRadius: 4, border: '1px solid #334155', color: '#94a3b8', fontWeight: 600, marginBottom: 40, textTransform: 'uppercase', letterSpacing: '2px' }}>
          <Film size={16} /> VIDEO CUTTER
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
          fontWeight: 800, 
          color: '#ffffff',
          lineHeight: 1.1,
          marginBottom: 24,
          letterSpacing: '-0.02em'
        }}>
          {h1 || "Cut the Boring Parts."}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#cbd5e1', 
          lineHeight: 1.7, 
          maxWidth: 650,
          margin: '0 auto 48px'
        }}>
          {description || "Have a 5-minute video but only need 10 seconds of it? Trim your video clips perfectly without re-encoding or losing any visual quality."}
        </p>

        {/* Mock Cinematic Film Strip */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 4, overflow: 'hidden', maxWidth: 800, margin: '0 auto 48px', opacity: 0.8 }}>
          {[1,2,3,4,5].map((item, i) => (
            <div key={i} style={{ 
              width: 150, 
              height: 100, 
              background: i === 1 || i === 2 || i === 3 ? '#3b82f6' : '#1e293b', 
              border: '2px solid #000',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: i === 1 || i === 2 || i === 3 ? 'white' : '#475569',
              filter: i === 0 || i === 4 ? 'grayscale(100%) blur(2px)' : 'none',
              transform: i === 0 || i === 4 ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}>
               <Film size={24} />
               {/* Film holes */}
               <div style={{ position: 'absolute', top: 4, left: 0, right: 0, display: 'flex', justifyContent: 'space-around' }}>
                 <div style={{ width: 8, height: 8, background: '#000' }} />
                 <div style={{ width: 8, height: 8, background: '#000' }} />
               </div>
               <div style={{ position: 'absolute', bottom: 4, left: 0, right: 0, display: 'flex', justifyContent: 'space-around' }}>
                 <div style={{ width: 8, height: 8, background: '#000' }} />
                 <div style={{ width: 8, height: 8, background: '#000' }} />
               </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '8px 20px', 
              background: '#1e293b', 
              borderRadius: 30, 
              color: '#cbd5e1', 
              fontWeight: 500,
              fontSize: '0.9rem'
            }}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TrimVideoBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#0f172a', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#f8fafc', textAlign: 'center', marginBottom: 64 }}>
          {safeData.benefitsTitle || "Optimized for Creators"}
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {[
            { icon: <Youtube />, title: "Social Media Limits", desc: safeData.benefitsItems?.[0] || "Instagram Reels and TikTok have strict time limits. Trim your video down to exactly 59 seconds to ensure it uploads without issues." },
            { icon: <Scissors />, title: "Remove Bloopers", desc: safeData.benefitsItems?.[1] || "Cut out the awkward silence at the beginning of your screen recording, or the mistakes at the very end." },
            { icon: <Clock />, title: "Save Bandwidth", desc: safeData.benefitsItems?.[2] || "Why send a 500MB video when the part you want to show is only 20MB? Trimming saves time and internet data." }
          ].map((item, i) => (
            <div key={i} style={{ padding: 40, background: '#1e293b', borderRadius: 16, borderTop: '4px solid #3b82f6' }}>
              <div style={{ width: 56, height: 56, background: '#0f172a', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', marginBottom: 24 }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc', marginBottom: 16 }}>{item.title}</h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TrimVideoPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#1e293b', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <ShieldCheck size={80} color="#3b82f6" />
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 20 }}>
            {safeData.privacyTitle || "We Don't See Your Videos"}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', lineHeight: 1.8 }}>
            {safeData.privacyDesc || "Online video trimmers usually force you to upload your personal clips to their servers. We don't. The trimming happens securely in your browser's local sandbox."}
          </p>
        </div>
      </div>
    </section>
  );
};

export const TrimVideoPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#020617', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <Zap size={48} color="#f59e0b" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#f8fafc', marginBottom: 24 }}>
          {safeData.performanceTitle || "Lossless Copy Codec"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: 800, margin: '0 auto 48px', lineHeight: 1.7 }}>
          {safeData.performanceDesc || "Rendering a video takes hours. We use a '-c copy' technique in FFmpeg WASM to slice the video container without re-encoding the actual pixels. It takes seconds, and the quality is 100% identical."}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
             <div key={i} style={{ padding: '16px 32px', background: '#1e293b', color: '#3b82f6', borderRadius: 30, fontWeight: 700, fontSize: '1.1rem', border: '1px solid #334155' }}>
               {item}
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
