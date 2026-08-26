// @ts-nocheck
import React from 'react';
import { Frame, Crop, Shield, Zap, CheckCircle2, Smartphone, SquareSplitHorizontal } from 'lucide-react';

interface SD { h1?: string; description?: string; dynamicSection?: any; }

export const InstagramCropHero: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)', borderRadius: 40, margin: '40px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, opacity: 0.07, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px', zIndex: 0 }} />
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1, color: '#fff' }}>
      <div style={{ flex: '1 1 360px', display: 'flex', justifyContent: 'center', gap: 24, alignItems: 'center' }}>
        {/* 16:9 phone (landscape) */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 160, height: 90, background: 'rgba(255,255,255,0.1)', border: '2px dashed rgba(255,255,255,0.4)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.7 }}>16:9</span>
          </div>
          <div style={{ marginTop: 6, fontSize: '0.7rem', opacity: 0.6 }}>YouTube</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
            <Crop size={18} color="#fff" />
          </div>
        </div>
        {/* 9:16 phone (vertical) */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 72, height: 128, background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.6)', borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
            <Frame size={22} color="#fff" />
            <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>9:16</span>
          </div>
          <div style={{ marginTop: 6, fontSize: '0.7rem', opacity: 0.8, fontWeight: 700 }}>Story ✓</div>
        </div>
      </div>
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(0,0,0,0.2)', borderRadius: 100, fontWeight: 700, fontSize: '0.85rem', marginBottom: 24, border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
          <Frame size={14} /> Story Format Tool
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{data.h1 || 'Crop Video for Instagram Story (9:16)'}</h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8 }}>{data.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
          {(data.bespokeData?.heroTags || ['9:16 Perfect Ratio', 'No Black Bars', 'Reels & Stories']).map((b: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'rgba(255,255,255,0.1)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.82rem', fontWeight: 600, backdropFilter: 'blur(8px)' }}>
              <CheckCircle2 size={12} /> {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const InstagramCropHowTo: React.FC<{ data: SD }> = ({ data }) => {
  const items = data.dynamicSection?.items || [];
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.dynamicSection?.heading || 'Understanding Social Media Ratios'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ padding: '40px 32px', background: 'var(--bg-card)', borderRadius: 28, border: '1px solid var(--border-color)', borderTop: `3px solid ${i === 0 ? '#fd1d1d' : '#833ab4'}` }} className="hover-lift">
              <div style={{ width: 48, height: 48, borderRadius: 14, background: i === 0 ? 'rgba(253,29,29,0.1)' : 'rgba(131,58,180,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                {i === 0 ? <SquareSplitHorizontal size={22} color="#fd1d1d" /> : <Smartphone size={22} color="#833ab4" />}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 10, color: i === 0 ? '#fd1d1d' : '#833ab4' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const InstagramCropBenefits: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, background: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 60px rgba(131,58,180,0.3)', position: 'relative' }}>
          <Frame size={96} color="rgba(255,255,255,0.9)" />
          <div style={{ position: 'absolute', bottom: 16, right: 16, width: 64, height: 64, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Crop size={28} color="#833ab4" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 420px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.benefitsTitle || 'Fill the Entire Mobile Screen'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{data.bespokeData?.benefitsDesc || 'Landscape videos on Instagram Stories leave ugly black bars that disengage viewers.'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {(data.bespokeData?.benefitsItems || ['No distracting black bars', 'Maximize Story real estate', 'Works for Reels & TikTok too']).map((item: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#833ab4" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const InstagramCropPrivacy: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: 40, padding: '72px 48px', border: '1px solid var(--border-color)' }}>
        <div style={{ width: 72, height: 72, margin: '0 auto 24px', borderRadius: 22, background: 'linear-gradient(135deg,#833ab4,#fd1d1d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={36} color="#fff" />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.privacyTitle || 'Your Content, Completely Yours'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>{data.bespokeData?.privacyDesc || 'Your brand content and creative projects are your intellectual property. We crop and process everything locally.'}</p>
      </div>
    </div>
  </section>
);

export const InstagramCropPerformance: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, borderRadius: '50%', background: 'var(--bg-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Zap size={90} color="rgba(131,58,180,0.1)" />
          <div style={{ position: 'absolute', bottom: 24, right: 24, width: 70, height: 70, background: 'linear-gradient(135deg,#833ab4,#fd1d1d)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={30} color="#fff" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 440px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.performanceTitle || 'Preview Before You Crop'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28 }}>{data.bespokeData?.performanceDesc || 'Use our visual crop interface to see exactly what will be included in the final 9:16 frame before committing.'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(data.bespokeData?.performanceItems || ['Visual preview before crop', 'Custom center point selection', 'Exports at original resolution']).map((b: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#833ab4" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
