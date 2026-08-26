// @ts-nocheck
import React from 'react';
import { Smartphone, Repeat2, Shield, Zap, CheckCircle2, Apple } from 'lucide-react';

interface SD { h1?: string; description?: string; dynamicSection?: any; }

export const MovToMp4Hero: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '80px 24px', background: 'var(--bg-card)', borderRadius: 40, border: '1px solid var(--border-color)', margin: '40px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center', gap: 24, alignItems: 'center' }}>
        {/* MOV Card */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 120, height: 140, background: 'rgba(99,102,241,0.1)', border: '2px dashed #6366f1', borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <Apple size={36} color="#6366f1" />
            <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#6366f1' }}>.MOV</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', padding: '0 8px' }}>iPhone Only</span>
          </div>
        </div>
        {/* Arrow */}
        <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(99,102,241,0.35)' }}>
          <Repeat2 size={24} color="#fff" />
        </div>
        {/* MP4 Card */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 120, height: 140, background: 'rgba(16,185,129,0.1)', border: '2px solid #10b981', borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, position: 'relative' }}>
            <Smartphone size={36} color="#10b981" />
            <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#10b981' }}>.MP4</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', padding: '0 8px' }}>Works Everywhere</span>
            <div style={{ position: 'absolute', top: -12, right: -12, background: '#10b981', color: '#fff', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>✓</div>
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', borderRadius: 100, fontWeight: 700, fontSize: '0.85rem', marginBottom: 24, border: '1px solid rgba(99,102,241,0.2)' }}>
          <Smartphone size={14} /> Universal Format
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>{data.h1 || 'Convert iPhone MOV to MP4 for Android'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{data.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
          {['Zero Quality Loss', 'Works on All Androids', 'No App Needed'].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'var(--bg-main)', borderRadius: 100, border: '1px solid var(--border-color)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
              <CheckCircle2 size={12} color="#10b981" /> {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const MovToMp4HowTo: React.FC<{ data: SD }> = ({ data }) => {
  const items = data.dynamicSection?.items || [];
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.dynamicSection?.heading || 'MOV vs MP4 Compatibility'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ padding: '40px 32px', background: 'var(--bg-card)', borderRadius: 28, border: '1px solid var(--border-color)', borderLeft: i === 1 ? '3px solid #10b981' : '3px solid #6366f1' }} className="hover-lift">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 12, color: i === 1 ? '#10b981' : '#6366f1' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const MovToMp4Benefits: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 60px rgba(99,102,241,0.25)', position: 'relative' }}>
          <Repeat2 size={96} color="rgba(255,255,255,0.9)" />
          <div style={{ position: 'absolute', bottom: 16, right: 16, width: 64, height: 64, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Smartphone size={28} color="#6366f1" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 420px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>Share iPhone Videos Universally</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>Stop the "can't play this file" messages. Convert once, play anywhere — Android phones, Windows PCs, smart TVs, and web browsers all support MP4 natively.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {['100% Android compatible', 'Plays on Windows & Smart TVs', 'Works in all web browsers'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#6366f1" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const MovToMp4Privacy: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: 40, padding: '72px 48px', border: '1px solid var(--border-color)' }}>
        <div style={{ width: 72, height: 72, margin: '0 auto 24px', borderRadius: 22, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={36} color="#fff" />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>Your Personal Videos Are 100% Private</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>We repackage the video container locally in your browser. Your iPhone videos — birthdays, vacations, personal moments — never touch our servers.</p>
      </div>
    </div>
  </section>
);

export const MovToMp4Performance: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, borderRadius: '50%', background: 'var(--bg-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Zap size={90} color="rgba(99,102,241,0.12)" />
          <div style={{ position: 'absolute', bottom: 24, right: 24, width: 70, height: 70, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={30} color="#fff" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 440px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>Remux MOV to MP4 Without Re-Encoding</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28 }}>If your iPhone video uses H.264, we simply copy the streams into an MP4 container. Zero quality loss. Completed in seconds regardless of file size.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['Stream copy: zero re-encoding', 'Handles 10GB+ MOV files', 'No file size limit'].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#6366f1" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
