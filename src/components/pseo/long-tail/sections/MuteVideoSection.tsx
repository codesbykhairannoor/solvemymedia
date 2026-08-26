// @ts-nocheck
import React from 'react';
import { VolumeX, Film, Shield, Zap, CheckCircle2, Music, Eye } from 'lucide-react';

interface SD { h1?: string; description?: string; dynamicSection?: any; }

export const MuteVideoHero: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)', borderRadius: 40, margin: '40px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '28px 28px', zIndex: 0 }} />
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1, color: '#fff' }}>
      <div style={{ flex: '1 1 360px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 200, height: 150, background: 'rgba(255,255,255,0.08)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
            <Film size={56} color="rgba(255,255,255,0.7)" />
          </div>
          {/* Sound wave strikethrough */}
          <div style={{ position: 'absolute', bottom: -30, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, opacity: 0.4 }}>
              {[10, 20, 30, 15, 25, 35, 20].map((h, i) => (
                <div key={i} style={{ width: 4, height: h, background: '#fff', borderRadius: 2 }} />
              ))}
            </div>
            <div style={{ width: 60, height: 2, background: '#ef4444', transform: 'rotate(-45deg)', position: 'absolute' }} />
          </div>
          {/* Mute badge */}
          <div style={{ position: 'absolute', top: -16, right: -16, width: 56, height: 56, background: 'linear-gradient(135deg,#ef4444,#dc2626)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(239,68,68,0.4)' }}>
            <VolumeX size={26} color="#fff" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(239,68,68,0.15)', color: '#f87171', borderRadius: 100, fontWeight: 700, fontSize: '0.85rem', marginBottom: 24, border: '1px solid rgba(239,68,68,0.3)' }}>
          <VolumeX size={14} /> Instant Silent Clip Creator
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{data.h1 || 'Remove Sound from Video Completely'}</h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.85, lineHeight: 1.8 }}>{data.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
          {(data.bespokeData?.heroTags || ['Instant Processing', 'No Re-encoding', '100% Silent Output']).map((b: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'rgba(255,255,255,0.08)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.82rem', fontWeight: 600 }}>
              <CheckCircle2 size={12} /> {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const MuteVideoHowTo: React.FC<{ data: SD }> = ({ data }) => {
  const items = data.dynamicSection?.items || [];
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.dynamicSection?.heading || 'Why Mute Videos?'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ padding: '36px 32px', background: 'var(--bg-card)', borderRadius: 28, border: '1px solid var(--border-color)', borderLeft: '3px solid #71717a' }} className="hover-lift">
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(113,113,122,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                {i === 0 ? <Film size={22} color="#71717a" /> : i === 1 ? <Music size={22} color="#71717a" /> : <Eye size={22} color="#71717a" />}
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

export const MuteVideoBenefits: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, background: 'linear-gradient(135deg,#27272a,#18181b)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.3)', position: 'relative', border: '2px solid rgba(255,255,255,0.08)' }}>
          <VolumeX size={96} color="rgba(255,255,255,0.7)" />
          <div style={{ position: 'absolute', bottom: 16, right: 16, width: 64, height: 64, background: 'linear-gradient(135deg,#ef4444,#dc2626)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={28} color="#fff" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 420px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.benefitsTitle || 'Perfect Silent Clips for Social Media'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{data.bespokeData?.benefitsDesc || 'Auto-play videos on Instagram, TikTok, and Facebook are muted by default. Creating silent videos means your content always loads ready-to-play.'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {(data.bespokeData?.benefitsItems || ['Ideal for background B-roll', 'Instagram & TikTok ready', 'Add your own music track after']).map((item: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="var(--brand-primary, #8b5cf6)" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const MuteVideoPrivacy: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: 40, padding: '72px 48px', border: '1px solid var(--border-color)' }}>
        <div style={{ width: 72, height: 72, margin: '0 auto 24px', borderRadius: 22, background: 'linear-gradient(135deg,#27272a,#3f3f46)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={36} color="#e4e4e7" />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.privacyTitle || 'Sensitive Conversations Stay Private'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>{data.bespokeData?.privacyDesc || 'We strip the audio locally so no third party ever hears what was said in your original recording.'}</p>
      </div>
    </div>
  </section>
);

export const MuteVideoPerformance: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, borderRadius: '50%', background: 'var(--bg-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Zap size={90} color="rgba(113,113,122,0.1)" />
          <div style={{ position: 'absolute', bottom: 24, right: 24, width: 70, height: 70, background: 'linear-gradient(135deg,#3f3f46,#27272a)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={30} color="#e4e4e7" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 440px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.performanceTitle || 'Mute a 4K Video in a Fraction of a Second'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28 }}>{data.bespokeData?.performanceDesc || 'Removing audio does not require re-encoding the video. We simply repackage the video stream and discard the audio track.'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(data.bespokeData?.performanceItems || ['Near-instant processing', 'Video quality untouched', 'Any format — MP4, MOV, WebM']).map((b: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="var(--brand-primary, #8b5cf6)" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
