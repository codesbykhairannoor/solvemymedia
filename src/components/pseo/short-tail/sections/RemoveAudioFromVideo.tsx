import React from 'react';
import { VolumeX, FileVideo, Zap, MonitorPlay, ShieldCheck } from 'lucide-react';

export const RemoveAudioFromVideoHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: '#000000',
      color: '#ffffff',
      fontFamily: '"Inter", system-ui, sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
      `}</style>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <VolumeX size={80} color="#ef4444" strokeWidth={1.5} style={{ margin: '0 auto 32px' }} />
        
        <h1 style={{ 
          fontSize: 'clamp(3rem, 6vw, 5rem)', 
          fontWeight: 900, 
          lineHeight: 1,
          marginBottom: 24,
          letterSpacing: '-0.05em'
        }}>
          {h1 || "Silence Your Videos."}
        </h1>
        
        <p style={{ 
          fontSize: '1.3rem', 
          color: '#a1a1aa', 
          lineHeight: 1.6, 
          maxWidth: 600,
          margin: '0 auto 48px'
        }}>
          {description || "Need to post a video but the background noise is terrible? Strip the audio track completely in one click."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '10px 24px', 
              background: '#18181b', 
              border: '1px solid #27272a',
              borderRadius: 30, 
              color: '#d4d4d8', 
              fontWeight: 700,
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

export const RemoveAudioFromVideoBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#ffffff', fontFamily: '"Inter", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#09090b', textAlign: 'center', marginBottom: 64, letterSpacing: '-0.03em' }}>
          {safeData.benefitsTitle || "Why Mute a Video?"}
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
          {[
            { icon: <MonitorPlay />, title: "Website Backgrounds", desc: safeData.benefitsItems?.[0] || "Browsers block auto-playing videos unless they are muted. Strip the audio track to ensure your hero video plays instantly on page load." },
            { icon: <FileVideo />, title: "B-Roll Footage", desc: safeData.benefitsItems?.[1] || "If you're compiling clips for a montage, you don't want the raw camera audio ruining the music. Silence the clips before importing them." }
          ].map((item, i) => (
            <div key={i} style={{ padding: '40px', background: '#fafafa', borderRadius: 24, border: '1px solid #eaeaea' }}>
              <div style={{ marginBottom: 24, color: '#000' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#09090b', marginBottom: 16 }}>{item.title}</h3>
              <p style={{ color: '#52525b', lineHeight: 1.7, fontSize: '1.1rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const RemoveAudioFromVideoPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#18181b', color: '#ffffff', fontFamily: '"Inter", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <ShieldCheck size={80} color="#ffffff" strokeWidth={1} />
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 24, letterSpacing: '-0.02em' }}>
            {safeData.privacyTitle || "Keep it Local"}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#a1a1aa', lineHeight: 1.8 }}>
            {safeData.privacyDesc || "Don't upload your private videos to a sketchy server just to mute them. Our tool processes the video file inside your browser memory. Nobody sees it but you."}
          </p>
        </div>
      </div>
    </section>
  );
};

export const RemoveAudioFromVideoPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '120px 24px', background: '#ffffff', fontFamily: '"Inter", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <Zap size={48} color="#000000" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#09090b', marginBottom: 24, letterSpacing: '-0.03em' }}>
          {safeData.performanceTitle || "Zero Quality Loss"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#52525b', maxWidth: 700, margin: '0 auto 48px', lineHeight: 1.7 }}>
          {safeData.performanceDesc || "We do not re-encode your video. We simply strip the audio stream from the container. The result is identical video quality, delivered in seconds."}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
             <div key={i} style={{ padding: '12px 24px', background: '#000000', color: '#ffffff', borderRadius: 8, fontWeight: 700, fontSize: '1.1rem' }}>
               {item}
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
