// @ts-nocheck
import React from 'react';
import { Mail, FileVideo, Minimize2, Shield, Zap, CheckCircle2, Inbox } from 'lucide-react';

interface SD { h1?: string; description?: string; dynamicSection?: any; }

export const EmailCompressHero: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '80px 24px 60px', background: 'var(--bg-card)', borderRadius: 40, border: '1px solid var(--border-color)', margin: '40px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 200, height: 150, background: 'var(--bg-main)', border: '2px solid var(--border-color)', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 20px 50px rgba(0,0,0,0.1)', position: 'relative' }}>
            <Inbox size={44} color="var(--brand-primary, #8b5cf6)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Gmail / Outlook</span>
            <div style={{ position: 'absolute', top: -12, right: -12, background: '#ef4444', color: '#fff', width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900 }}>25</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 90, height: 110, background: 'rgba(239,68,68,0.1)', border: '2px dashed #ef4444', borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <FileVideo size={28} color="#ef4444" />
                <span style={{ fontSize: '1rem', fontWeight: 900, color: '#ef4444' }}>500MB</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>Before</span>
            </div>
            <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg,#8b5cf6,#6366f1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(139,92,246,0.35)' }}>
              <Minimize2 size={20} color="#fff" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 90, height: 110, background: 'rgba(16,185,129,0.1)', border: '2px solid #10b981', borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <FileVideo size={28} color="#10b981" />
                <span style={{ fontSize: '1rem', fontWeight: 900, color: '#10b981' }}>18MB</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>After ✓</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(139,92,246,0.12)', color: '#8b5cf6', borderRadius: 100, fontWeight: 700, fontSize: '0.85rem', marginBottom: 24, border: '1px solid rgba(139,92,246,0.2)' }}>
          <Mail size={14} /> Email-Ready Compression
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>{data.h1 || 'Reduce MP4 Video Size for Email'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{data.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
          {(data.bespokeData?.heroTags || ['Under 25MB', 'No Upload Needed', 'Gmail & Outlook Ready']).map((b: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'var(--bg-main)', borderRadius: 100, border: '1px solid var(--border-color)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
              <CheckCircle2 size={12} color="#10b981" /> {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const EmailCompressHowTo: React.FC<{ data: SD }> = ({ data }) => {
  const steps = data.dynamicSection?.items || [];
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.15 }}>{data.dynamicSection?.heading || 'How to Compress for Email'}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {steps.map((step: any, i: number) => (
            <div key={i} style={{ padding: '36px 32px', background: 'var(--bg-card)', borderRadius: 28, border: '1px solid var(--border-color)', position: 'relative' }} className="hover-lift">
              <div style={{ width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg,#8b5cf6,#6366f1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: 20, boxShadow: '0 6px 18px rgba(139,92,246,0.3)' }}>{i + 1}</div>
              <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '3rem', fontWeight: 900, color: 'rgba(139,92,246,0.07)', lineHeight: 1 }}>{i + 1}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 10, color: 'var(--text-main)' }}>{step.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{step.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const EmailCompressBenefits: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 420px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.benefitsTitle || 'Stop Getting "File Too Large" Errors'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{data.bespokeData?.benefitsDesc || 'Every email provider imposes strict size limits. Compress your video privately in your browser before sending — no cloud storage required.'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {(data.bespokeData?.benefitsItems || ['Gmail 25MB attachment limit', 'Outlook 20MB attachment limit', 'Yahoo Mail 25MB limit']).map((item: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#8b5cf6" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, background: 'linear-gradient(135deg,#8b5cf6,#6366f1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 60px rgba(139,92,246,0.3)', position: 'relative' }}>
          <Mail size={96} color="rgba(255,255,255,0.9)" />
          <div style={{ position: 'absolute', bottom: 16, right: 16, width: 64, height: 64, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
            <CheckCircle2 size={30} color="#10b981" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const EmailCompressPrivacy: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: 40, padding: '72px 48px', border: '1px solid var(--border-color)', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
        <div style={{ width: 72, height: 72, margin: '0 auto 24px', borderRadius: 22, background: 'linear-gradient(135deg,#8b5cf6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px rgba(139,92,246,0.3)' }}>
          <Shield size={36} color="#fff" />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.privacyTitle || 'Your Video Never Leaves Your Device'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>{data.bespokeData?.privacyDesc || 'Unlike cloud-based compressors, we process everything inside your browser using WebAssembly.'}</p>
      </div>
    </div>
  </section>
);

export const EmailCompressPerformance: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, borderRadius: '50%', background: 'var(--bg-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
          <Zap size={90} color="rgba(139,92,246,0.12)" />
          <div style={{ position: 'absolute', bottom: 24, right: 24, width: 70, height: 70, background: 'linear-gradient(135deg,#8b5cf6,#6366f1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 28px rgba(139,92,246,0.35)' }}>
            <Zap size={30} color="#fff" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 440px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', background: 'linear-gradient(135deg,#8b5cf6,#6366f1)', color: '#fff', borderRadius: 9999, fontWeight: 700, fontSize: '0.8rem', marginBottom: 22, boxShadow: '0 6px 18px rgba(139,92,246,0.3)' }}>
          <Zap size={13} /> WebAssembly Powered
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.performanceTitle || 'Compress a 500MB Video in Under a Minute'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28 }}>{data.bespokeData?.performanceDesc || 'Our engine uses native WebAssembly FFmpeg. No cloud round-trips. Hardware-level speed, right on your CPU.'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(data.bespokeData?.performanceItems || ['Zero Upload Latency', 'GPU-Accelerated Encoding', 'No App Installation']).map((b: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#8b5cf6" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
