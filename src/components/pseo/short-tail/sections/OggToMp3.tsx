import React from 'react';
import { Gamepad2, Volume2, Globe, Shield, FastForward, CheckSquare } from 'lucide-react';

export const OggToMp3Hero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: 'linear-gradient(to bottom right, #1a0b2e, #0f172a, #020617)',
      position: 'relative',
      overflow: 'hidden',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Decorative neon lines */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: 2, background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)', opacity: 0.5 }} />
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: 2, background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)', opacity: 0.5 }} />
      
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 24px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '30px', marginBottom: 32 }}>
          <Gamepad2 size={18} color="#a78bfa" />
          <span style={{ color: '#c4b5fd', fontWeight: 600, letterSpacing: '1px' }}>GAMER AUDIO TOOLS</span>
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
          fontWeight: 900, 
          lineHeight: 1.1,
          marginBottom: 24,
          textTransform: 'uppercase',
          background: 'linear-gradient(to right, #a78bfa, #67e8f9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
        }}>
          {h1 || "Convert OGG to MP3 for the Web"}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#94a3b8', 
          lineHeight: 1.7, 
          maxWidth: 750,
          marginBottom: 48
        }}>
          {description || "OGG Vorbis is fantastic for game engines and Discord bots, but it won't play in iTunes or on iPhones. Convert your assets to MP3 instantly."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '10px 24px', 
              background: 'rgba(6, 182, 212, 0.1)', 
              borderRadius: 4, 
              color: '#67e8f9', 
              fontWeight: 700,
              borderLeft: '4px solid #06b6d4',
              textTransform: 'uppercase',
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

export const OggToMp3Benefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#020617', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            {/* Retro grid graphic */}
            <div style={{ width: '100%', height: 350, background: 'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', borderRadius: 24, border: '1px solid rgba(139, 92, 246, 0.2)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#0f172a', padding: 24, borderRadius: 16, border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
                 <Volume2 size={48} color="#a78bfa" />
                 <div style={{ color: '#f8fafc', fontWeight: 800 }}>AUDIO_ASSET.OGG</div>
               </div>
            </div>
          </div>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#f8fafc', marginBottom: 24, lineHeight: 1.1 }}>
              {safeData.benefitsTitle || "Universal Compatibility"}
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>
              {safeData.benefitsDesc || "While OGG is open-source and great for game developers, the general public uses MP3. Make sure your soundtracks and voice lines can be heard by everyone."}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
              {[
                { text: safeData.benefitsItems?.[0] || "Works on iOS devices" },
                { text: safeData.benefitsItems?.[1] || "Supported by all media players" },
                { text: safeData.benefitsItems?.[2] || "Easy to embed in websites" }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b' }}>
                  <CheckSquare size={20} color="#06b6d4" />
                  <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const OggToMp3Privacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: 16, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', transform: 'rotate(45deg)' }}>
          <Shield size={40} style={{ transform: 'rotate(-45deg)' }} />
        </div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f8fafc', marginBottom: 20 }}>
          {safeData.privacyTitle || "Secure Local Conversion"}
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.8 }}>
          {safeData.privacyDesc || "Don't leak your unreleased game assets. We don't upload your OGG files. The conversion engine runs directly in your browser using WebAssembly."}
        </p>
      </div>
    </section>
  );
};

export const OggToMp3Performance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#020617', borderTop: '1px solid #1e293b', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: 24 }}>
            {safeData.performanceTitle || "High-Speed Transcoding"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>
            {safeData.performanceDesc || "Batch process dozens of sound effects in seconds. We utilize multithreading to encode multiple MP3s simultaneously."}
          </p>
        </div>
        <div style={{ flex: '1 1 400px' }}>
           <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
             {safeData.performanceItems?.map((item: string, i: number) => (
               <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', background: 'linear-gradient(90deg, #1e293b, #0f172a)', borderRadius: 12, borderLeft: '4px solid #8b5cf6' }}>
                 <FastForward size={24} color="#a78bfa" />
                 <span style={{ color: '#f8fafc', fontWeight: 600, fontSize: '1.1rem' }}>{item}</span>
               </li>
             ))}
           </ul>
        </div>
      </div>
    </section>
  );
};
