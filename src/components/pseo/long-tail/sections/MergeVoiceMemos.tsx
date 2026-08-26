// @ts-nocheck
import React from 'react';
import { Mic, Layers, Shield, Zap, CheckCircle2, ListMusic, Headphones } from 'lucide-react';

interface SD { h1?: string; description?: string; dynamicSection?: any; }

export const MergeVoiceMemosHero: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '80px 24px', background: 'var(--bg-card)', borderRadius: 40, border: '1px solid var(--border-color)', margin: '40px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 70%, rgba(16,185,129,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 360px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 220 }}>
          {['voice_memo_01.m4a', 'voice_memo_02.m4a', 'voice_memo_03.m4a'].map((file, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>
              <Mic size={16} color="#10b981" style={{ flexShrink: 0 }} />
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file}</span>
              <div style={{ width: 16, height: 16, background: 'rgba(16,185,129,0.15)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#10b981' }}>{i + 1}</div>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, color: 'var(--text-muted)', fontSize: '1.4rem' }}>↓</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'rgba(16,185,129,0.1)', borderRadius: 14, border: '2px solid #10b981', fontSize: '0.8rem', fontWeight: 700, color: '#10b981' }}>
            <Headphones size={16} style={{ flexShrink: 0 }} />
            <span>combined_final.mp3</span>
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(16,185,129,0.1)', color: '#10b981', borderRadius: 100, fontWeight: 700, fontSize: '0.85rem', marginBottom: 24, border: '1px solid rgba(16,185,129,0.2)' }}>
          <ListMusic size={14} /> Voice Memo Combiner
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>{data.h1 || 'Combine Multiple Voice Memos into One'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{data.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
          {['M4A & MP3 Support', 'Gapless Merge', 'Drag to Reorder'].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'var(--bg-main)', borderRadius: 100, border: '1px solid var(--border-color)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
              <CheckCircle2 size={12} color="#10b981" /> {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const MergeVoiceMemosHowTo: React.FC<{ data: SD }> = ({ data }) => {
  const items = data.dynamicSection?.items || [];
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.dynamicSection?.heading || 'The Easiest Way to Merge Audio'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ padding: '36px 32px', background: 'var(--bg-card)', borderRadius: 28, border: '1px solid var(--border-color)', borderLeft: '3px solid #10b981' }} className="hover-lift">
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                {i === 0 ? <Layers size={22} color="#10b981" /> : i === 1 ? <ListMusic size={22} color="#10b981" /> : <Headphones size={22} color="#10b981" />}
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

export const MergeVoiceMemosBenefits: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, background: 'linear-gradient(135deg,#10b981,#06b6d4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 60px rgba(16,185,129,0.25)', position: 'relative' }}>
          <Mic size={96} color="rgba(255,255,255,0.9)" />
          <div style={{ position: 'absolute', bottom: 16, right: 16, width: 64, height: 64, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={28} color="#10b981" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 420px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>From Scattered Memos to One Clean Track</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>Merge dozens of separate iPhone voice memos, dictated notes, and recorded interviews into a single seamless audio file — ready for editing or sharing.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {['iPhone M4A voice memos', 'Android voice recorder files', 'Zoom or Meet audio recordings'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const MergeVoiceMemosPrivacy: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: 40, padding: '72px 48px', border: '1px solid var(--border-color)' }}>
        <div style={{ width: 72, height: 72, margin: '0 auto 24px', borderRadius: 22, background: 'linear-gradient(135deg,#10b981,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={36} color="#fff" />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>Your Private Recordings Stay Private</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>Medical dictations, legal notes, business meetings — audio recordings are highly sensitive. We merge your audio entirely in your browser with WebAssembly. Zero server transmission.</p>
      </div>
    </div>
  </section>
);

export const MergeVoiceMemosPerformance: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, borderRadius: '50%', background: 'var(--bg-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Zap size={90} color="rgba(16,185,129,0.1)" />
          <div style={{ position: 'absolute', bottom: 24, right: 24, width: 70, height: 70, background: 'linear-gradient(135deg,#10b981,#06b6d4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={30} color="#fff" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 440px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>Merge Dozens of Recordings Instantly</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28 }}>No upload limit. No timeout. Combine as many recordings as your device's RAM can hold. Our engine stitches them together gaplessly in seconds.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['Gapless audio stitching', 'Cross-format: M4A, MP3, WAV', 'No file count limit'].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
