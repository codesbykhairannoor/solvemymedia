// @ts-nocheck
import React from 'react';
import { Eye, Sliders, Shield, Zap, CheckCircle2, Layers, Target } from 'lucide-react';

interface SD { h1?: string; description?: string; dynamicSection?: any; }

export const LosslessCompressHero: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '80px 24px', background: 'var(--bg-card)', borderRadius: 40, border: '1px solid var(--border-color)', margin: '40px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 80%, rgba(245,158,11,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 360px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          {/* Quality meter */}
          <div style={{ width: 280, padding: '28px 32px', background: 'var(--bg-main)', borderRadius: 24, border: '1px solid var(--border-color)', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              <span>Visual Quality</span><span style={{ color: '#f59e0b', fontWeight: 800 }}>98%</span>
            </div>
            <div style={{ height: 10, background: 'var(--bg-card)', borderRadius: 100, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '98%', background: 'linear-gradient(90deg,#f59e0b,#10b981)', borderRadius: 100 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, marginBottom: 10, fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              <span>File Size Reduction</span><span style={{ color: '#10b981', fontWeight: 800 }}>-85%</span>
            </div>
            <div style={{ height: 10, background: 'var(--bg-card)', borderRadius: 100, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '85%', background: 'linear-gradient(90deg,#10b981,#06b6d4)', borderRadius: 100 }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ padding: '10px 18px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 12, fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b' }}>VBR Encoding</div>
            <div style={{ padding: '10px 18px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12, fontSize: '0.8rem', fontWeight: 700, color: '#10b981' }}>WebCodecs GPU</div>
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(245,158,11,0.1)', color: '#f59e0b', borderRadius: 100, fontWeight: 700, fontSize: '0.85rem', marginBottom: 24, border: '1px solid rgba(245,158,11,0.2)' }}>
          <Eye size={14} /> Perceptual Quality Preservation
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>{data.h1 || 'Make Video Smaller Without Losing Quality'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{data.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
          {['Up to -90% size', 'Near-invisible loss', 'Smart VBR encoding'].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'var(--bg-main)', borderRadius: 100, border: '1px solid var(--border-color)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
              <CheckCircle2 size={12} color="#f59e0b" /> {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const LosslessCompressHowTo: React.FC<{ data: SD }> = ({ data }) => {
  const items = data.dynamicSection?.items || [];
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.dynamicSection?.heading || 'Who Needs Lossless-Feeling Compression?'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ padding: '40px 32px', background: 'var(--bg-card)', borderRadius: 28, border: '1px solid var(--border-color)', borderTop: '3px solid #f59e0b' }} className="hover-lift">
              <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                {i === 0 ? <Layers size={24} color="#f59e0b" /> : i === 1 ? <Target size={24} color="#f59e0b" /> : <Sliders size={24} color="#f59e0b" />}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 10, color: 'var(--text-main)' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const LosslessCompressBenefits: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, background: 'linear-gradient(135deg,#f59e0b,#f97316)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 60px rgba(245,158,11,0.25)', position: 'relative' }}>
          <Eye size={96} color="rgba(255,255,255,0.9)" />
          <div style={{ position: 'absolute', bottom: 16, right: 16, width: 64, height: 64, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={28} color="#f59e0b" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 420px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>The 75% Quality Setting is Your Best Friend</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>At 75% quality, our intelligent VBR encoder allocates data only where your eyes can actually detect a difference. The result: 85% smaller file, but visually identical to the source.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {['Ideal for content archival', 'Perfect for web background videos', 'Game footage for Discord'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#f59e0b" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const LosslessCompressPrivacy: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: 40, padding: '72px 48px', border: '1px solid var(--border-color)' }}>
        <div style={{ width: 72, height: 72, margin: '0 auto 24px', borderRadius: 22, background: 'linear-gradient(135deg,#f59e0b,#f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={36} color="#fff" />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>Your Raw Footage Stays Private</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>Your raw, unedited footage is irreplaceable. We compress it entirely in-browser. No cloud upload means no risk of your content appearing anywhere without your consent.</p>
      </div>
    </div>
  </section>
);

export const LosslessCompressPerformance: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, borderRadius: '50%', background: 'var(--bg-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Zap size={90} color="rgba(245,158,11,0.1)" />
          <div style={{ position: 'absolute', bottom: 24, right: 24, width: 70, height: 70, background: 'linear-gradient(135deg,#f59e0b,#f97316)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={30} color="#fff" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 440px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>GPU-Accelerated via WebCodecs</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28 }}>We use WebCodecs to offload video encoding to your graphics card. What would take minutes on older tools happens in seconds — and without sacrificing any perceptual quality.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['Hardware GPU acceleration', 'Adaptive VBR algorithm', 'Lossless quality mode available'].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#f59e0b" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
