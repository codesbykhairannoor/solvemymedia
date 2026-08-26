import React from 'react';
import { Music2, Play, Zap, FileAudio, LayoutGrid, ArrowRight } from 'lucide-react';

export const VideoToMp3Hero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
      fontFamily: '"Outfit", system-ui, sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
      `}</style>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        
        {/* Floating elements */}
        <div style={{ position: 'absolute', top: -30, left: 40, width: 60, height: 60, background: '#f43f5e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 10px 20px rgba(244, 63, 94, 0.4)' }}>
          <Play size={30} fill="currentColor" />
        </div>
        <div style={{ position: 'absolute', bottom: 0, right: 20, width: 70, height: 70, background: '#a855f7', borderRadius: '20%', transform: 'rotate(15deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 10px 20px rgba(168, 85, 247, 0.4)' }}>
          <Music2 size={35} />
        </div>

        <h1 style={{ 
          fontSize: 'clamp(3rem, 6vw, 5rem)', 
          fontWeight: 900, 
          color: '#881337',
          lineHeight: 1.1,
          marginBottom: 24,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em'
        }}>
          {h1 || "Turn Any Video Into an MP3"}
        </h1>
        
        <p style={{ 
          fontSize: '1.3rem', 
          color: '#9f1239', 
          lineHeight: 1.6, 
          maxWidth: 650,
          margin: '0 auto 48px',
          fontWeight: 500
        }}>
          {description || "Have a music video, a webinar, or a lecture? Convert it into a standard MP3 file instantly so you can listen to it anywhere."}
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '8px 24px', 
              background: '#881337', 
              borderRadius: 30, 
              color: '#ffe4e6', 
              fontWeight: 700,
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

export const VideoToMp3Benefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#ffffff', fontFamily: '"Outfit", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: '#881337', textAlign: 'center', marginBottom: 64 }}>
          {safeData.benefitsTitle || "The Universal Audio Format"}
        </h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'stretch' }}>
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ background: '#fff1f2', padding: 40, borderRadius: 32, flex: 1 }}>
              <FileAudio size={40} color="#e11d48" style={{ marginBottom: 24 }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#881337', marginBottom: 16 }}>{safeData.benefitsItems?.[0] || "Plays on Everything"}</h3>
              <p style={{ color: '#9f1239', fontSize: '1.1rem' }}>MP3 is supported by literally every device on earth. From modern iPhones to 20-year-old car stereos.</p>
            </div>
            <div style={{ background: '#fdf4ff', padding: 40, borderRadius: 32, flex: 1 }}>
              <Zap size={40} color="#c026d3" style={{ marginBottom: 24 }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#4a044e', marginBottom: 16 }}>{safeData.benefitsItems?.[1] || "Drastically Smaller"}</h3>
              <p style={{ color: '#701a75', fontSize: '1.1rem' }}>A 1GB 4K video file can be reduced to a 10MB MP3 file, saving 99% of your storage space.</p>
            </div>
          </div>
          <div style={{ flex: '1 1 400px', background: '#fff7ed', padding: '64px 40px', borderRadius: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <LayoutGrid size={56} color="#ea580c" style={{ marginBottom: 32 }} />
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#7c2d12', marginBottom: 24, lineHeight: 1.1 }}>{safeData.benefitsItems?.[2] || "Batch Processing"}</h3>
            <p style={{ color: '#9a3412', fontSize: '1.2rem', lineHeight: 1.6 }}>Drag and drop an entire folder of music videos. We will queue them up and convert them all to MP3 automatically without crashing your browser.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const VideoToMp3Privacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#881337', color: '#ffe4e6', fontFamily: '"Outfit", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '40px', border: '2px solid #e11d48', borderRadius: 32 }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 24 }}>
          {safeData.privacyTitle || "Secure In-Browser Conversion"}
        </h2>
        <p style={{ fontSize: '1.25rem', color: '#fecdd3', lineHeight: 1.7, maxWidth: 650, margin: '0 auto' }}>
          {safeData.privacyDesc || "Most converters upload your video to a server, taking forever. We use a local WebAssembly port of FFmpeg to convert your video directly on your machine. Zero uploads."}
        </p>
      </div>
    </section>
  );
};

export const VideoToMp3Performance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#fff1f2', fontFamily: '"Outfit", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 64, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#881337', marginBottom: 24 }}>
            {safeData.performanceTitle || "High Quality Encoding"}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#be123c', lineHeight: 1.7, marginBottom: 32 }}>
            {safeData.performanceDesc || "We extract the audio stream and re-encode it using the industry standard LAME MP3 encoder at 320kbps, ensuring your music sounds exactly as the artist intended."}
          </p>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            {safeData.performanceItems?.map((item: string, i: number) => (
              <div key={i} style={{ background: 'white', padding: '24px', borderRadius: 24, boxShadow: '0 10px 30px rgba(225, 29, 72, 0.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ background: '#ffe4e6', width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ArrowRight size={24} color="#e11d48" />
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#881337' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
