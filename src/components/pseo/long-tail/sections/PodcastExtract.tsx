// @ts-nocheck
import React from 'react';
import { Mic2, Music2, Shield, Zap, CheckCircle2, Radio, Headphones } from 'lucide-react';

interface SD { h1?: string; description?: string; dynamicSection?: any; }

export const PodcastExtractHero: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '80px 24px', background: 'var(--bg-card)', borderRadius: 40, border: '1px solid var(--border-color)', margin: '40px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, rgba(236,72,153,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 360px', display: 'flex', justifyContent: 'center' }}>
        {/* Audio wave visualization */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 200, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            {[20, 40, 60, 80, 60, 100, 80, 60, 40, 70, 50, 80, 60, 40, 30].map((h, i) => (
              <div key={i} style={{ width: 6, height: h, background: 'linear-gradient(180deg,#ec4899,#8b5cf6)', borderRadius: 3, opacity: 0.7 + i * 0.02 }} />
            ))}
          </div>
          <div style={{ width: 140, height: 140, background: 'linear-gradient(135deg,#ec4899,#8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(236,72,153,0.3)' }}>
            <Mic2 size={64} color="#fff" />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['MP3', 'WAV', 'M4A'].map((fmt, i) => (
              <div key={i} style={{ padding: '6px 14px', background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.3)', borderRadius: 100, fontSize: '0.8rem', fontWeight: 700, color: '#ec4899' }}>{fmt}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(236,72,153,0.1)', color: '#ec4899', borderRadius: 100, fontWeight: 700, fontSize: '0.85rem', marginBottom: 24, border: '1px solid rgba(236,72,153,0.2)' }}>
          <Radio size={14} /> Podcast Creator Tool
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>{data.h1 || 'Extract Audio from Video for Podcasts'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{data.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
          {(data.bespokeData?.heroTags || ['Lossless Extraction', 'Audacity-Ready', 'No Re-Encoding']).map((b: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'var(--bg-main)', borderRadius: 100, border: '1px solid var(--border-color)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
              <CheckCircle2 size={12} color="#ec4899" /> {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const PodcastExtractHowTo: React.FC<{ data: SD }> = ({ data }) => {
  const steps = data.dynamicSection?.items || [];
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.dynamicSection?.heading || '3 Steps to Pristine Podcast Audio'}</h2>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 40, top: 40, bottom: 40, width: 2, background: 'linear-gradient(180deg,#ec4899,#8b5cf6)', opacity: 0.3 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {steps.map((step: any, i: number) => (
              <div key={i} style={{ display: 'flex', gap: 32, alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#ec4899,#8b5cf6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 10px 24px rgba(236,72,153,0.3)', fontSize: '1.5rem', fontWeight: 900 }}>{i + 1}</div>
                <div style={{ padding: '24px 32px', background: 'var(--bg-card)', borderRadius: 24, flex: 1, border: '1px solid var(--border-color)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 10, color: 'var(--text-main)' }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const PodcastExtractBenefits: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, background: 'linear-gradient(135deg,#ec4899,#8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 60px rgba(236,72,153,0.25)', position: 'relative' }}>
          <Headphones size={96} color="rgba(255,255,255,0.9)" />
          <div style={{ position: 'absolute', bottom: 16, right: 16, width: 64, height: 64, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Music2 size={28} color="#ec4899" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 420px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.benefitsTitle || 'The Perfect Tool for Every Podcaster'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{data.bespokeData?.benefitsDesc || 'Whether you record on Zoom, camera, or screen — our tool pulls the exact audio track from any video source.'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {(data.bespokeData?.benefitsItems || ['Zoom recordings support', 'Camera & DSLR footage', 'Screen recording rips']).map((item: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#ec4899" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const PodcastExtractPrivacy: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: 40, padding: '72px 48px', border: '1px solid var(--border-color)' }}>
        <div style={{ width: 72, height: 72, margin: '0 auto 24px', borderRadius: 22, background: 'linear-gradient(135deg,#ec4899,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={36} color="#fff" />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.privacyTitle || 'Your Unreleased Episodes Are Safe'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>{data.bespokeData?.privacyDesc || 'We process everything locally — your unreleased content never touches the internet until you decide to publish it.'}</p>
      </div>
    </div>
  </section>
);

export const PodcastExtractPerformance: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, borderRadius: '50%', background: 'var(--bg-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Zap size={90} color="rgba(236,72,153,0.1)" />
          <div style={{ position: 'absolute', bottom: 24, right: 24, width: 70, height: 70, background: 'linear-gradient(135deg,#ec4899,#8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={30} color="#fff" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 440px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.performanceTitle || 'Extract a 2-Hour Zoom in Seconds'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28 }}>{data.bespokeData?.performanceDesc || 'Our direct stream copy engine extracts audio without re-encoding. A 2-hour podcast interview takes almost instant.'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(data.bespokeData?.performanceItems || ['Direct stream copy (no re-encoding)', 'Handles 10GB+ recordings', 'No timeout for long files']).map((b: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#ec4899" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
