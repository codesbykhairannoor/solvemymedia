// @ts-nocheck
import React from 'react';
import { FastForward, TrendingUp, Shield, Zap, CheckCircle2, Timer, Play } from 'lucide-react';

interface SD { h1?: string; description?: string; dynamicSection?: any; }

export const TiktokSpeedHero: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #010101 0%, #1a0010 50%, #010101 100%)', borderRadius: 40, margin: '40px 0', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
    {/* TikTok-like neon glow */}
    <div style={{ position: 'absolute', top: '30%', left: '10%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(105,16,31,0.4)', filter: 'blur(60px)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', top: '20%', right: '15%', width: 160, height: 160, borderRadius: '50%', background: 'rgba(0,242,234,0.2)', filter: 'blur(50px)', pointerEvents: 'none' }} />
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1, color: '#fff' }}>
      <div style={{ flex: '1 1 360px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative' }}>
          {/* Phone with speed indicator */}
          <div style={{ width: 160, height: 280, background: 'rgba(255,255,255,0.05)', borderRadius: 28, border: '2px solid rgba(255,255,255,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, backdropFilter: 'blur(12px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(105,16,31,0.3) 0%, transparent 50%, rgba(0,242,234,0.1) 100%)' }} />
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <FastForward size={48} color="#ff0050" />
            </div>
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ff0050', lineHeight: 1 }}>2x</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Speed</div>
            </div>
            <div style={{ position: 'relative', zIndex: 1, padding: '8px 20px', background: '#ff0050', borderRadius: 100, fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>TikTok Ready ✓</div>
          </div>
          <div style={{ position: 'absolute', top: 20, right: -24, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['0.5x', '1x', '1.5x', '2x'].map((s, i) => (
              <div key={i} style={{ width: 50, height: 28, background: i === 3 ? '#ff0050' : 'rgba(255,255,255,0.1)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>{s}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(255,0,80,0.15)', color: '#ff0050', borderRadius: 100, fontWeight: 700, fontSize: '0.85rem', marginBottom: 24, border: '1px solid rgba(255,0,80,0.3)' }}>
          <TrendingUp size={14} /> TikTok Optimizer
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{data.h1 || 'Speed Up Video for TikTok Fast'}</h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.85, lineHeight: 1.8 }}>{data.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
          {(data.bespokeData?.heroTags || ['Pitch Correction', 'Up to 2x Speed', 'TikTok MP4 Output']).map((b: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'rgba(255,255,255,0.08)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.82rem', fontWeight: 600 }}>
              <CheckCircle2 size={12} /> {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const TiktokSpeedHowTo: React.FC<{ data: SD }> = ({ data }) => {
  const steps = data.dynamicSection?.items || [];
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.dynamicSection?.heading || 'Optimize Pacing for Social Media'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {steps.map((step: any, i: number) => (
            <div key={i} style={{ padding: '36px 32px', background: 'var(--bg-card)', borderRadius: 28, border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }} className="hover-lift">
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#ff0050,#00f2ea)' }} />
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,0,80,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                {i === 0 ? <Timer size={22} color="#ff0050" /> : i === 1 ? <FastForward size={22} color="#ff0050" /> : <Play size={22} color="#ff0050" />}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 10, color: 'var(--text-main)' }}>{step.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{step.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TiktokSpeedBenefits: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, background: 'linear-gradient(135deg,#ff0050,#00f2ea)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 60px rgba(255,0,80,0.25)', position: 'relative' }}>
          <TrendingUp size={96} color="rgba(255,255,255,0.9)" />
          <div style={{ position: 'absolute', bottom: 16, right: 16, width: 64, height: 64, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FastForward size={28} color="#ff0050" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 420px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.benefitsTitle || 'Faster Videos = Higher Watch Completion'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{data.bespokeData?.benefitsDesc || 'Studies show that slightly sped-up videos have significantly higher completion rates on TikTok.'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {(data.bespokeData?.benefitsItems || ['Increases audience retention', 'Fits more content into 60s', 'Pitch-corrected audio sounds natural']).map((item: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#ff0050" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const TiktokSpeedPrivacy: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: 40, padding: '72px 48px', border: '1px solid var(--border-color)' }}>
        <div style={{ width: 72, height: 72, margin: '0 auto 24px', borderRadius: 22, background: 'linear-gradient(135deg,#ff0050,#7928ca)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={36} color="#fff" />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.privacyTitle || 'Your Pre-Release Content Stays Safe'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>{data.bespokeData?.privacyDesc || 'Process it locally before it ever touches the internet. We never receive your content.'}</p>
      </div>
    </div>
  </section>
);

export const TiktokSpeedPerformance: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, borderRadius: '50%', background: 'var(--bg-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Zap size={90} color="rgba(255,0,80,0.1)" />
          <div style={{ position: 'absolute', bottom: 24, right: 24, width: 70, height: 70, background: 'linear-gradient(135deg,#ff0050,#00f2ea)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={30} color="#fff" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 440px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.performanceTitle || 'Better Than TikTok\'s Built-In Editor'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28 }}>{data.bespokeData?.performanceDesc || 'Our FFmpeg engine lets you fine-tune speed from 0.5x to 4x, with pitch correction that keeps audio natural.'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(data.bespokeData?.performanceItems || ['Fine-tune 0.5x to 4x speed', 'Automatic pitch correction', 'Export as TikTok-compatible MP4']).map((b: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#ff0050" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
