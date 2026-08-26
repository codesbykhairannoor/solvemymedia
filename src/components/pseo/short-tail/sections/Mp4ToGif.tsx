import React from 'react';
import { Image, Share, Repeat, Zap, Shield, ImagePlay } from 'lucide-react';

export const Mp4ToGifHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: 'linear-gradient(135deg, #fef08a, #fde047)',
      fontFamily: '"Outfit", system-ui, sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
      `}</style>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        
        {/* Floating graphical elements */}
        <div style={{ position: 'absolute', top: -40, left: 0, width: 80, height: 80, background: '#a855f7', borderRadius: '20%', transform: 'rotate(-15deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 10px 20px rgba(168, 85, 247, 0.4)' }}>
          <ImagePlay size={40} />
        </div>
        <div style={{ position: 'absolute', bottom: -20, right: 0, width: 60, height: 60, background: '#ec4899', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 10px 20px rgba(236, 72, 153, 0.4)' }}>
          <Repeat size={30} />
        </div>

        <h1 style={{ 
          fontSize: 'clamp(3rem, 6vw, 5rem)', 
          fontWeight: 900, 
          color: '#4c1d95',
          lineHeight: 1,
          marginBottom: 24,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em'
        }}>
          {h1 || "Turn Videos Into Viral GIFs"}
        </h1>
        
        <p style={{ 
          fontSize: '1.3rem', 
          color: '#713f12', 
          lineHeight: 1.6, 
          maxWidth: 650,
          margin: '0 auto 48px',
          fontWeight: 500
        }}>
          {description || "Need a reaction meme? Convert any MP4 video into a high-quality, looping GIF animation perfectly sized for Twitter, Discord, or Slack."}
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '8px 24px', 
              background: '#4c1d95', 
              borderRadius: 30, 
              color: '#fef08a', 
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

export const Mp4ToGifBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#ffffff', fontFamily: '"Outfit", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: '#4c1d95', textAlign: 'center', marginBottom: 64 }}>
          {safeData.benefitsTitle || "The Universal Language of the Internet"}
        </h2>
        
        {/* Staggered Masonry-style Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'stretch' }}>
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ background: '#fdf4ff', padding: 40, borderRadius: 32, flex: 1 }}>
              <Share size={40} color="#c026d3" style={{ marginBottom: 24 }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#4a044e', marginBottom: 16 }}>{safeData.benefitsItems?.[0] || "Easy Sharing"}</h3>
              <p style={{ color: '#701a75', fontSize: '1.1rem' }}>GIFs autoplay everywhere. No clicking play, no volume buttons. Just pure, instant visual communication.</p>
            </div>
            <div style={{ background: '#fef2f2', padding: 40, borderRadius: 32, flex: 1 }}>
              <Image size={40} color="#e11d48" style={{ marginBottom: 24 }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#881337', marginBottom: 16 }}>{safeData.benefitsItems?.[1] || "Perfect Frame Rates"}</h3>
              <p style={{ color: '#9f1239', fontSize: '1.1rem' }}>Extract frames at 15fps or 30fps to get that buttery smooth look without hitting the 8MB Discord limit.</p>
            </div>
          </div>
          <div style={{ flex: '1 1 400px', background: '#faf5ff', padding: '64px 40px', borderRadius: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Repeat size={56} color="#7e22ce" style={{ marginBottom: 32 }} />
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#3b0764', marginBottom: 24, lineHeight: 1.1 }}>{safeData.benefitsItems?.[2] || "Endless Loops"}</h3>
            <p style={{ color: '#581c87', fontSize: '1.2rem', lineHeight: 1.6 }}>Whether it's a funny cat video or a product demo, converting it to a GIF ensures it loops infinitely on any webpage or forum. Capture attention instantly.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Mp4ToGifPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#4c1d95', color: '#fef08a', fontFamily: '"Outfit", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <Shield size={64} style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 24 }}>
          {safeData.privacyTitle || "No Watermarks, No Uploads"}
        </h2>
        <p style={{ fontSize: '1.25rem', color: '#e9d5ff', lineHeight: 1.7, maxWidth: 650, margin: '0 auto' }}>
          {safeData.privacyDesc || "Other GIF makers ruin your meme with an ugly watermark and steal your video. Our tool is 100% free, runs locally in your browser, and leaves no watermark."}
        </p>
      </div>
    </section>
  );
};

export const Mp4ToGifPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#faf5ff', fontFamily: '"Outfit", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 64, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#3b0764', marginBottom: 24 }}>
            {safeData.performanceTitle || "WASM Frame Extraction"}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#6b21a8', lineHeight: 1.7, marginBottom: 32 }}>
            {safeData.performanceDesc || "Rendering GIFs used to require heavy desktop software. We compile FFmpeg directly into WebAssembly, meaning your browser can extract video frames and compile a GIF matrix in seconds."}
          </p>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            {safeData.performanceItems?.map((item: string, i: number) => (
              <div key={i} style={{ background: 'white', padding: '24px', borderRadius: 24, boxShadow: '0 10px 30px rgba(126, 34, 206, 0.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ background: '#fdf4ff', width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={24} color="#c026d3" />
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#4a044e' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
