import React from 'react';
import { Smartphone, Heart, Sparkles, Film, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export const MovToGifHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: 'linear-gradient(135deg, #ffedd5, #ffe4e6)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 12, 
          padding: '10px 24px', 
          background: 'linear-gradient(90deg, #f43f5e, #f97316)', 
          borderRadius: 30, 
          color: 'white', 
          fontWeight: 700,
          marginBottom: 32,
          boxShadow: '0 10px 25px rgba(244, 63, 94, 0.3)'
        }}>
          <Heart size={18} fill="currentColor" /> SOCIAL MEDIA READY
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', 
          fontWeight: 900, 
          color: '#881337',
          lineHeight: 1.1,
          marginBottom: 24,
          letterSpacing: '-0.03em'
        }}>
          {h1 || "Turn iPhone Videos Into Reactions"}
        </h1>
        
        <p style={{ 
          fontSize: '1.3rem', 
          color: '#9f1239', 
          lineHeight: 1.6, 
          maxWidth: 700,
          margin: '0 auto 48px',
          fontWeight: 500
        }}>
          {description || "Have a funny moment recorded on your iPhone? Convert that heavy .MOV file into a lightweight, looping GIF to share instantly on Twitter, iMessage, or Slack."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px', 
              background: 'white', 
              borderRadius: 20, 
              color: '#f43f5e', 
              fontWeight: 700,
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
            }}>
              <Sparkles size={18} /> {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const MovToGifBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#1f2937', textAlign: 'center', marginBottom: 24 }}>
          {safeData.benefitsTitle || "The Perfect Loop"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#6b7280', textAlign: 'center', marginBottom: 64, maxWidth: 700, margin: '0 auto 64px' }}>
          {safeData.benefitsDesc || "Videos require a user to click play. GIFs are immediate. Transform your iOS screen recordings or camera rolls into engaging visual content."}
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ flex: '1 1 300px', background: 'linear-gradient(180deg, #fff1f2, #ffe4e6)', padding: 40, borderRadius: 32 }}>
            <Film size={48} color="#e11d48" style={{ marginBottom: 24 }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#881337', marginBottom: 16 }}>{safeData.benefitsItems?.[0] || "Select the Best Part"}</h3>
            <p style={{ color: '#9f1239', lineHeight: 1.6 }}>You don't need the whole 2-minute video. Trim the exact 3 seconds you need to make the perfect looping meme.</p>
          </div>
          
          <div style={{ flex: '1 1 300px', background: 'linear-gradient(180deg, #fff7ed, #ffedd5)', padding: 40, borderRadius: 32 }}>
            <ImageIcon size={48} color="#ea580c" style={{ marginBottom: 24 }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#7c2d12', marginBottom: 16 }}>{safeData.benefitsItems?.[1] || "Optimized Colors"}</h3>
            <p style={{ color: '#9a3412', lineHeight: 1.6 }}>GIFs are limited to 256 colors. We use advanced dithering to ensure your GIF looks just as good as the original MOV file.</p>
          </div>

          <div style={{ flex: '1 1 300px', background: 'linear-gradient(180deg, #fef2f2, #fecaca)', padding: 40, borderRadius: 32 }}>
            <Smartphone size={48} color="#dc2626" style={{ marginBottom: 24 }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#7f1d1d', marginBottom: 16 }}>{safeData.benefitsItems?.[2] || "Bypass Restrictions"}</h3>
            <p style={{ color: '#991b1b', lineHeight: 1.6 }}>Many forums and chat apps refuse to accept Apple's .MOV format. GIF is supported universally on every platform since 1987.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const MovToGifPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#fff1f2', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', background: 'white', padding: 64, borderRadius: 48, boxShadow: '0 20px 40px rgba(225, 29, 72, 0.05)' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#e11d48', marginBottom: 20 }}>
          {safeData.privacyTitle || "Keep Your Camera Roll Private"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#881337', lineHeight: 1.8 }}>
          {safeData.privacyDesc || "Never upload personal videos to sketchy meme generators. Our tool works entirely inside your web browser. No data leaves your phone or computer."}
        </p>
      </div>
    </section>
  );
};

export const MovToGifPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#1f2937', textAlign: 'center', marginBottom: 64 }}>
          {safeData.performanceTitle || "High Performance Extraction"}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
             <div key={i} style={{ padding: '24px 32px', background: '#fff7ed', borderRadius: 24, border: '1px solid #ffedd5', display: 'flex', alignItems: 'center', gap: 16 }}>
               <CheckCircle2 size={24} color="#ea580c" />
               <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#7c2d12' }}>{item}</span>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
