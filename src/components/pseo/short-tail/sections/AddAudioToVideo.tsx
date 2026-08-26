import React from 'react';
import { Music, Video, Plus, Wand2, Shield, FastForward, Smartphone } from 'lucide-react';

export const AddAudioToVideoHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: 'linear-gradient(135deg, #2e0249, #4c0070)',
      color: 'white',
      fontFamily: '"Outfit", system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;900&display=swap');
      `}</style>
      
      {/* Decorative background tracks */}
      <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '110%', height: 40, background: 'rgba(163, 230, 53, 0.1)', transform: 'rotate(-5deg)' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '-5%', width: '110%', height: 40, background: 'rgba(236, 72, 153, 0.1)', transform: 'rotate(3deg)' }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 16, 
          padding: '16px 32px', 
          background: 'rgba(255,255,255,0.05)', 
          borderRadius: 40, 
          marginBottom: 40,
          border: '1px solid rgba(163, 230, 53, 0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          <Video size={24} color="#d946ef" /> 
          <Plus size={20} color="white" /> 
          <Music size={24} color="#a3e635" />
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
          fontWeight: 900, 
          lineHeight: 1,
          marginBottom: 24,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(to right, #a3e635, #d946ef)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {h1 || "Mix Audio and Video Instantly"}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#d8b4fe', 
          lineHeight: 1.6, 
          maxWidth: 700,
          margin: '0 auto 48px',
          fontWeight: 500
        }}>
          {description || "Merge your favorite song with a video clip. Perfect for creating TikToks, Instagram Reels, or adding background music to your vlog."}
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '10px 24px', 
              background: '#a3e635', 
              borderRadius: 30, 
              color: '#2e0249', 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 0 20px rgba(163, 230, 53, 0.4)'
            }}>
              <Wand2 size={18} /> {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AddAudioToVideoBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#09090b', fontFamily: '"Outfit", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: 'white', marginBottom: 24, lineHeight: 1.1 }}>
            {safeData.benefitsTitle || "Social Media Ready"}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#a1a1aa', lineHeight: 1.7, marginBottom: 40 }}>
            {safeData.benefitsDesc || "Stop wrestling with complicated video editors like Premiere Pro just to replace an audio track. Our tool does one thing and does it perfectly."}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { icon: <Smartphone />, title: "Mobile Optimized", desc: safeData.benefitsItems?.[0] || "Works flawlessly on your phone. Mix tracks on the go." },
              { icon: <Music />, title: "Replace or Overlay", desc: safeData.benefitsItems?.[1] || "Mute the original video sound, or keep it and play the new audio on top." }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, padding: '24px', background: '#18181b', borderRadius: 24, border: '1px solid #27272a' }}>
                <div style={{ width: 56, height: 56, background: 'rgba(217, 70, 239, 0.1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d946ef', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ color: '#a1a1aa', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          {/* Mock Timeline Graphic */}
          <div style={{ background: '#18181b', borderRadius: 32, padding: 32, border: '2px solid #27272a' }}>
            <div style={{ fontSize: '0.9rem', color: '#71717a', fontWeight: 700, marginBottom: 16 }}>TIMELINE</div>
            
            {/* Video Track */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <Video size={24} color="#71717a" />
              <div style={{ flex: 1, height: 40, background: '#3f3f46', borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                 <div style={{ width: '40%', height: 4, background: '#71717a', borderRadius: 2 }} />
              </div>
            </div>

            {/* Audio Track */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Music size={24} color="#a3e635" />
              <div style={{ flex: 1, height: 40, background: 'rgba(163, 230, 53, 0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 12px', border: '1px solid rgba(163, 230, 53, 0.4)' }}>
                 <div style={{ width: '80%', height: 16, background: `repeating-linear-gradient(90deg, transparent, transparent 2px, #a3e635 2px, #a3e635 4px)`, borderRadius: 2 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AddAudioToVideoPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#d946ef', color: 'white', fontFamily: '"Outfit", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <Shield size={64} style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 20 }}>
          {safeData.privacyTitle || "No Server Wait Times"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#fdf4ff', lineHeight: 1.8 }}>
          {safeData.privacyDesc || "Typical editors force you to upload a 500MB video, wait 10 minutes, and download it again. We process the muxing locally in your browser. Zero uploads. Complete privacy."}
        </p>
      </div>
    </section>
  );
};

export const AddAudioToVideoPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#09090b', fontFamily: '"Outfit", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'white', marginBottom: 24 }}>
          {safeData.performanceTitle || "WASM Audio Mixing"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#a1a1aa', maxWidth: 800, margin: '0 auto 64px', lineHeight: 1.7 }}>
          {safeData.performanceDesc || "We utilize WebAssembly to combine video streams and audio streams (muxing) at incredibly high speeds using your computer's local resources."}
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
             <div key={i} style={{ background: '#18181b', padding: '32px', borderRadius: 24, border: '1px solid #a3e635', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
               <FastForward size={32} color="#a3e635" />
               <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>{item}</span>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
