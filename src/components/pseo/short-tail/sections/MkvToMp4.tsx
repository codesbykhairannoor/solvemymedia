import React from 'react';
import { Film, Clapperboard, MonitorPlay, CheckCircle2, ShieldBan, Cpu } from 'lucide-react';

export const MkvToMp4Hero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '140px 24px 100px', 
      background: '#0a0a0a',
      position: 'relative',
      fontFamily: '"Space Grotesk", sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap');
        .cinema-glow {
          box-shadow: 0 0 100px rgba(220, 38, 38, 0.4);
        }
      `}</style>
      
      {/* Background cinematic lights */}
      <div style={{ position: 'absolute', top: 0, left: '20%', width: '60%', height: '30%', background: 'radial-gradient(ellipse, rgba(220, 38, 38, 0.15), transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 30, color: '#e5e5e5', marginBottom: 40, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
          <Clapperboard size={14} color="#dc2626" /> Cinematic Format Converter
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          fontWeight: 700, 
          color: '#ffffff',
          lineHeight: 1.1,
          marginBottom: 32,
          textShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}>
          {h1 || "Convert Heavy MKV Movies to MP4"}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#a3a3a3', 
          lineHeight: 1.6, 
          maxWidth: 700,
          margin: '0 auto 48px'
        }}>
          {description || "Don't let unsupported MKV files ruin movie night. Remux your high-definition movies into universally supported MP4 format instantly, without waiting for hours."}
        </p>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e5e5e5', fontSize: '0.95rem' }}>
              <CheckCircle2 size={18} color="#dc2626" /> {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const MkvToMp4Benefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#171717', fontFamily: '"Space Grotesk", sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 700, color: 'white', marginBottom: 16, textAlign: 'center' }}>
          {safeData.benefitsTitle || "Built for High-Definition Media"}
        </h2>
        <p style={{ textAlign: 'center', color: '#a3a3a3', fontSize: '1.1rem', marginBottom: 64, maxWidth: 600, margin: '0 auto 64px' }}>
          {safeData.benefitsDesc || "MKV is the standard for high-quality rips, but MP4 is the standard for playback. We bridge the gap perfectly."}
        </p>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 32 }}>
          {[
            { icon: <MonitorPlay size={40} />, title: "TV Playback", desc: safeData.benefitsItems?.[0] || "Play MKVs directly on your Smart TV via USB." },
            { icon: <Film size={40} />, title: "Keep the Quality", desc: safeData.benefitsItems?.[1] || "Zero compression means zero quality loss. 100% original pixels." },
            { icon: <Clapperboard size={40} />, title: "Subtitle Support", desc: safeData.benefitsItems?.[2] || "Maintains soft-coded subtitles during the remuxing process." }
          ].map((item, i) => (
            <div key={i} style={{ flex: '1 1 300px', background: '#0a0a0a', border: '1px solid #262626', padding: '48px 32px', borderRadius: 24, textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'white', fontWeight: 600, marginBottom: 16 }}>{item.title}</h3>
              <p style={{ color: '#a3a3a3', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const MkvToMp4Privacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#0a0a0a', fontFamily: '"Space Grotesk", sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white', marginBottom: 24 }}>
            {safeData.privacyTitle || "No More Multi-Gigabyte Uploads"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#a3a3a3', lineHeight: 1.8 }}>
            {safeData.privacyDesc || "Uploading a 5GB MKV file to a cloud converter is a nightmare. Our tool processes the massive files entirely on your local machine. No data leaves your computer, and you don't wait for cloud servers."}
          </p>
        </div>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <div className="cinema-glow" style={{ width: 200, height: 200, borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <ShieldBan size={80} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const MkvToMp4Performance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#171717', borderTop: '1px solid #262626', fontFamily: '"Space Grotesk", sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: 24, marginBottom: 32 }}>
          <Cpu size={48} color="#dc2626" />
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: 24 }}>
          {safeData.performanceTitle || "Handles 4K & 8K MKVs with Ease"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#a3a3a3', maxWidth: 700, margin: '0 auto 48px', lineHeight: 1.7 }}>
          {safeData.performanceDesc || "Whether it's a small anime episode or a massive 4K movie rip, our WebAssembly architecture leverages your local CPU and RAM to convert files at native speeds."}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
             <div key={i} style={{ background: '#0a0a0a', padding: '16px 24px', borderRadius: 12, border: '1px solid #262626', color: 'white', fontWeight: 600 }}>
               {item}
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
