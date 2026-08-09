import React from 'react';
import { Type, CheckCircle2, ShieldCheck, Cpu, Mic, FileText, FastForward } from 'lucide-react';
import type { SectionProps } from '../types';

export const TranscribeMediaHeroSection: React.FC<SectionProps> = ({ section }) => (
  <section className="seo-section hero" style={{ padding: '100px 24px', margin: '80px 0 60px', background: 'var(--bg-app)', borderRadius: 40, border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: '-20%', left: '-10%', right: '-10%', bottom: '-20%', display: 'flex', flexWrap: 'wrap', gap: 40, opacity: 0.03, pointerEvents: 'none', transform: 'rotate(-15deg)' }}>
       {Array.from({ length: 50 }).map((_, i) => (
         <span key={i} style={{ fontSize: '3rem', fontWeight: 900, whiteSpace: 'nowrap', color: 'var(--text-main)' }}>TRANSCRIBE</span>
       ))}
    </div>
    
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 500px' }}>
        <div style={{ display: 'inline-flex', padding: '12px 24px', background: 'var(--brand-gradient)', borderRadius: 100, color: 'white', fontWeight: 800, fontSize: '0.9rem', marginBottom: 40, gap: 12, alignItems: 'center', boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)' }}>
          <Type size={18} /> AI-Powered Transcription
        </div>
        
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.04em', lineHeight: 1.2 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 40 }}>{section.content}</p>
      </div>
      
      <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center' }}>
         <div style={{ position: 'relative', width: 340, height: 420 }}>
            <div style={{ position: 'absolute', top: 40, left: 40, right: 40, bottom: 40, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: 32, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
                <Mic size={100} color="var(--text-muted)" opacity={0.2} />
            </div>
            
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', animation: 'stampDown 3s infinite' }}>
               <div style={{ padding: '16px 32px', border: '8px solid rgba(168, 85, 247, 0.5)', color: 'rgba(168, 85, 247, 0.5)', fontSize: '2.5rem', fontWeight: 900, borderRadius: 16, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'var(--bg-card)' }}>
                  <FileText size={48} />
               </div>
            </div>
            <style>{`@keyframes stampDown { 0% { transform: scale(3); opacity: 0; } 10% { transform: scale(1); opacity: 1; } 80% { transform: scale(1); opacity: 1; } 100% { transform: scale(1); opacity: 0; } }`}</style>
         </div>
      </div>
    </div>
  </section>
);

export const TranscribeMediaHowToSection: React.FC<SectionProps> = ({ section }) => (
  <section className="seo-section how-to" style={{ padding: '120px 24px', background: 'var(--bg-card)', position: 'relative' }}>
    <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 80, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
    
    <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {section.steps?.map((step: any, i: number) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 32, padding: 48, background: 'var(--bg-app)', borderRadius: 32, border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }} className="hover-lift">
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--bg-card)', border: '2px dashed var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--brand-primary)' }}>
            {i === 0 ? <Mic size={32} /> : i === 1 ? <Cpu size={32} /> : <FileText size={32} />}
          </div>
          <div style={{ flex: 1 }}>
             <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 12, color: 'var(--text-main)' }}>{step.title}</h3>
             <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.1rem' }}>{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const TranscribeMediaPerformanceSection: React.FC<SectionProps> = ({ section }) => (
  <section className="seo-section geo" style={{ padding: '120px 24px', background: 'var(--brand-gradient)', position: 'relative' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1, color: 'white' }}>
      <div style={{ flex: '1 1 500px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 32, letterSpacing: '-0.04em', lineHeight: 1.2 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', opacity: 0.9, lineHeight: 1.7 }}>{section.content}</p>
      </div>
      <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
         <div style={{ width: '100%', maxWidth: 400, padding: 48, borderRadius: 32, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', position: 'relative' }} className="hover-lift">
            <FastForward size={48} color="white" style={{ marginBottom: 24 }} />
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 16 }}>Local AI Acceleration</h3>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.7 }}>We utilize WebGL and WebGPU to accelerate the Whisper AI model directly using your device's graphics card.</p>
         </div>
      </div>
    </div>
  </section>
);

export const TranscribeMediaPrivacySection: React.FC<SectionProps> = ({ section }) => (
  <section className="seo-section privacy" style={{ padding: '120px 24px', background: 'var(--bg-app)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'inline-flex', padding: 32, background: 'var(--bg-card)', borderRadius: 32, border: '1px solid var(--border-color)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', marginBottom: 40 }}>
        <ShieldCheck size={80} color="var(--brand-primary)" />
      </div>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
      <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.7, maxWidth: 800, margin: '0 auto' }}>{section.content}</p>
    </div>
  </section>
);

export const TranscribeMediaFAQSection: React.FC<{
  faqs?: Array<{q: string, a: string}>
}> = ({ faqs }) => {
  const defaultFaqs = [
    { q: "Do I need an internet connection to transcribe?", a: "An internet connection is required only once to download the Whisper AI model to your browser cache. After that, the actual transcription happens 100% offline." },
    { q: "Is the transcription completely private?", a: "Yes. Unlike cloud-based services, your audio and video files never leave your device. The AI runs locally in your browser memory." },
    { q: "What languages are supported?", a: "We support multiple major languages including English, Indonesian, Spanish, French, German, Japanese, and Korean. You can select your language before starting." }
  ];
  
  const faqList = faqs || defaultFaqs;
  
  return (
    <section className="seo-section faq" style={{ padding: '120px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {faqList.map((faq, idx) => (
            <div key={idx} style={{ background: 'var(--bg-app)', padding: 32, borderRadius: 20, border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12, color: 'var(--text-main)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ color: 'var(--brand-primary)' }}>Q:</span> {faq.q}
              </h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>
                <strong style={{ color: 'var(--brand-secondary)' }}>A:</strong> {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
