import React from 'react';
import { Music, Zap, Lock, FastForward, Headphones, ShieldCheck, Activity } from 'lucide-react';

export const Mp4ToMp3Hero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px 80px', 
      background: 'radial-gradient(circle at top right, rgba(236, 72, 153, 0.15), transparent 40%), var(--bg-main)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Outfit", system-ui, sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap');
        @keyframes soundwave {
          0% { height: 10px; }
          50% { height: 40px; }
          100% { height: 10px; }
        }
        .audio-bar {
          width: 8px;
          background: linear-gradient(to top, #ec4899, #8b5cf6);
          border-radius: 4px;
          animation: soundwave 1s ease-in-out infinite;
        }
      `}</style>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        
        {/* Equalizer Graphic */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 40, height: 40 }}>
          <div className="audio-bar" style={{ animationDelay: '0.0s' }} />
          <div className="audio-bar" style={{ animationDelay: '0.2s', height: '30px' }} />
          <div className="audio-bar" style={{ animationDelay: '0.4s', height: '20px' }} />
          <div className="audio-bar" style={{ animationDelay: '0.1s', height: '35px' }} />
          <div className="audio-bar" style={{ animationDelay: '0.3s' }} />
        </div>

        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
          fontWeight: 800, 
          lineHeight: 1.1, 
          letterSpacing: '-0.04em',
          background: 'linear-gradient(135deg, #fce7f3 0%, #ec4899 50%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 24,
          maxWidth: 900
        }}>
          {h1 || "Turn Videos Into High-Quality MP3s"}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-muted)', 
          lineHeight: 1.6, 
          maxWidth: 700,
          marginBottom: 48
        }}>
          {description || "Extract studio-quality audio from your MP4 files in seconds. Zero uploads. Perfect for podcasts and music libraries."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <span key={i} style={{
              padding: '8px 20px',
              background: 'rgba(236, 72, 153, 0.1)',
              border: '1px solid rgba(236, 72, 153, 0.2)',
              borderRadius: 30,
              color: '#ec4899',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <Headphones size={16} /> {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Mp4ToMp3Benefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'var(--bg-main)', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 24, lineHeight: 1.2 }}>
              {safeData.benefitsTitle || "Extract Tracks Without Quality Loss"}
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>
              {safeData.benefitsDesc || "Stop filling your hard drive with massive video files when you only need the audio. Our advanced extraction engine pulls the exact audio stream perfectly."}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {safeData.benefitsItems?.map((item: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-color)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
                    <Music size={20} />
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '1.05rem' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            {/* Visual Abstract representation of video to audio */}
            <div style={{ width: '100%', aspectRatio: '1', background: 'linear-gradient(45deg, #1e1b4b, #4c1d95)', borderRadius: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(76, 29, 149, 0.2)' }}>
               <Music size={120} color="white" style={{ opacity: 0.1, position: 'absolute', transform: 'scale(1.5) rotate(15deg)' }} />
               <div style={{ width: '60%', height: '60%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                 <div style={{ padding: '12px 24px', background: 'white', borderRadius: 20, color: 'black', fontWeight: 800 }}>MP4 Video</div>
                 <Activity size={32} color="#ec4899" />
                 <div style={{ padding: '12px 24px', background: '#ec4899', borderRadius: 20, color: 'white', fontWeight: 800 }}>MP3 Audio</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Mp4ToMp3Privacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, margin: '0 auto 32px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 15px 35px rgba(16, 185, 129, 0.3)' }}>
          <ShieldCheck size={40} color="white" />
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 24 }}>
          {safeData.privacyTitle || "Absolute Privacy for Your Audio"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>
          {safeData.privacyDesc || "Whether it's a private recorded meeting, a personal voice memo, or unreleased music, your files never leave your device. Our WebAssembly engine processes everything entirely offline inside your browser sandbox."}
        </p>
      </div>
    </section>
  );
};

export const Mp4ToMp3Performance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 20 }}>
            {safeData.performanceTitle || "Lightning Fast Extraction"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto' }}>
            {safeData.performanceDesc || "Extracting audio shouldn't take longer than the video itself. We strip the audio stream instantly."}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
            <div key={i} style={{ 
              padding: 40, 
              background: 'var(--bg-card)', 
              borderRadius: 32, 
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(236, 72, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: '#ec4899' }}>
                <FastForward size={32} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)' }}>{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
