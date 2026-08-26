// @ts-nocheck
import React from 'react';
import { MessageCircle, FileVideo, Minimize2, Shield, Zap, CheckCircle2, Wifi } from 'lucide-react';

interface SD { h1?: string; description?: string; dynamicSection?: any; }

export const WhatsappCompressHero: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #075E54 0%, #128C7E 50%, #25D366 100%)', borderRadius: 40, margin: '40px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px', zIndex: 0 }} />
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1, color: '#fff' }}>
      <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 220 }}>
          {/* Phone mockup */}
          <div style={{ width: 180, height: 300, background: 'rgba(0,0,0,0.4)', borderRadius: 32, border: '3px solid rgba(255,255,255,0.3)', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, backdropFilter: 'blur(10px)' }}>
            <MessageCircle size={56} color="#25D366" />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', opacity: 0.8, marginBottom: 4 }}>WhatsApp Limit</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>16MB</div>
            </div>
            <div style={{ padding: '8px 20px', background: '#25D366', borderRadius: 100, fontSize: '0.8rem', fontWeight: 700 }}>✓ Ready to Send</div>
          </div>
          <div style={{ position: 'absolute', top: -16, right: -16, width: 64, height: 64, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.3)' }}>
            <Minimize2 size={28} color="#fff" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(0,0,0,0.2)', borderRadius: 100, fontWeight: 700, fontSize: '0.85rem', marginBottom: 24, border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
          <MessageCircle size={14} /> WhatsApp Optimizer
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{data.h1 || 'Compress Large Video for WhatsApp'}</h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8 }}>{data.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
          {(data.bespokeData?.heroTags || ['Fits 16MB Limit', 'No Data Waste', 'Audio Stays Synced']).map((b: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'rgba(255,255,255,0.1)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.82rem', fontWeight: 600, backdropFilter: 'blur(8px)' }}>
              <CheckCircle2 size={12} /> {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const WhatsappCompressHowTo: React.FC<{ data: SD }> = ({ data }) => {
  const steps = data.dynamicSection?.items || [];
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.dynamicSection?.heading || 'Why Use Our WhatsApp Compressor?'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {steps.map((step: any, i: number) => (
            <div key={i} style={{ padding: '36px 32px', background: 'var(--bg-card)', borderRadius: 28, border: '1px solid var(--border-color)', position: 'relative', borderTop: '3px solid #25D366' }} className="hover-lift">
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(37,211,102,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <MessageCircle size={22} color="#25D366" />
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

export const WhatsappCompressBenefits: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, background: 'linear-gradient(135deg,#075E54,#25D366)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 60px rgba(37,211,102,0.25)', position: 'relative' }}>
          <MessageCircle size={100} color="rgba(255,255,255,0.9)" />
          <div style={{ position: 'absolute', bottom: 16, right: 16, width: 64, height: 64, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
            <Wifi size={28} color="#25D366" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 420px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.benefitsTitle || 'Send Without Burning Your Data Plan'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{data.bespokeData?.benefitsDesc || 'Uploading a 1GB video through WhatsApp wastes enormous mobile data. We compress locally so you send a tiny file that still looks great.'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {(data.bespokeData?.benefitsItems || ['4K video compressed in seconds', 'Audio stays perfectly synced', 'Works on mobile browsers']).map((item: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#25D366" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const WhatsappCompressPrivacy: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: 40, padding: '72px 48px', border: '1px solid var(--border-color)', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
        <div style={{ width: 72, height: 72, margin: '0 auto 24px', borderRadius: 22, background: 'linear-gradient(135deg,#075E54,#25D366)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={36} color="#fff" />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.privacyTitle || 'Safer Than a WhatsApp App'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>{data.bespokeData?.privacyDesc || 'Our web-based tool runs entirely in your secure browser sandbox. No permissions. No account. No video upload.'}</p>
      </div>
    </div>
  </section>
);

export const WhatsappCompressPerformance: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, borderRadius: '50%', background: 'var(--bg-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Zap size={90} color="rgba(37,211,102,0.15)" />
          <div style={{ position: 'absolute', bottom: 24, right: 24, width: 70, height: 70, background: 'linear-gradient(135deg,#075E54,#25D366)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={30} color="#fff" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 440px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.bespokeData?.performanceTitle || 'Compress 4K to WhatsApp-Ready in Seconds'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28 }}>{data.bespokeData?.performanceDesc || 'Our WebAssembly engine taps directly into your device\'s native CPU. Even on mobile, you get desktop-class compression speed.'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(data.bespokeData?.performanceItems || ['No data upload required', 'Works fully offline', 'Instant compression on-device']).map((b: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#25D366" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
