import React from 'react';
import { VolumeX, CheckCircle2, Shield, Zap, MapPin, XCircle, Video, MicOff } from 'lucide-react';
import type { SectionProps } from '../types';

export const MuteVideoHeroSection: React.FC<SectionProps> = ({ section }) => (
  <section className="seo-section hero" style={{ padding: '100px 24px', margin: '80px 0 60px', background: 'var(--bg-card)', borderRadius: 40, border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
    <div className="floating-object hidden-mobile" style={{ position: 'absolute', top: '15%', left: '10%', opacity: 0.1, animation: 'float 6s ease-in-out infinite' }}>
      <VolumeX size={80} color="var(--brand-primary)" />
    </div>
    <div className="floating-object hidden-mobile" style={{ position: 'absolute', bottom: '15%', right: '10%', opacity: 0.05, animation: 'float 8s ease-in-out infinite' }}>
      <MicOff size={120} color="var(--text-main)" />
    </div>

    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 64, position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 500px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 20, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', marginBottom: 32 }}>
          <VolumeX size={32} />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 600 }}>{section.content}</p>
      </div>
      <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative', height: 400 }}>
        <div style={{ width: 140, height: 200, background: 'var(--bg-app)', border: '2px solid var(--border-color)', borderRadius: 16, position: 'absolute', left: 40, top: 100, transform: 'rotate(-15deg)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }} className="hover-lift">
           <Video size={40} color="var(--text-muted)" opacity={0.5} />
        </div>
        <div style={{ width: 160, height: 220, background: 'rgba(239, 68, 68, 0.05)', border: '2px dashed #ef4444', borderRadius: 16, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 20px 50px rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }} className="hover-lift">
           <VolumeX size={64} color="#ef4444" />
        </div>
        <div style={{ width: 140, height: 200, background: 'var(--bg-app)', border: '2px solid var(--border-color)', borderRadius: 16, position: 'absolute', right: 40, top: 60, transform: 'rotate(10deg)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }} className="hover-lift">
           <Video size={40} color="var(--text-muted)" opacity={0.5} />
        </div>
      </div>
    </div>
  </section>
);

export const MuteVideoHowToSection: React.FC<SectionProps> = ({ section }) => (
  <section className="seo-section how-to" style={{ padding: '120px 24px', background: 'var(--bg-app)', position: 'relative' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 80 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 9999, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <CheckCircle2 size={14} /> Quick Guide
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
        {section.steps?.map((step: any, i: number) => (
          <div key={i} style={{ width: '100%', maxWidth: 350, marginTop: i % 2 !== 0 ? 64 : 0, padding: 40, background: 'var(--bg-card)', borderRadius: 32, border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: 24 }} className="hover-lift">
            <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--bg-app)', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 900, color: 'var(--brand-primary)' }}>
              {i + 1}
            </div>
            <div>
              <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                {step.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: 'clamp(1.05rem, 2vw, 1.25rem)' }}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const MuteVideoSpeedSection: React.FC<SectionProps> = ({ section }) => (
  <section className="seo-section performance" style={{ padding: '120px 24px', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--brand-gradient)', color: '#fff', borderRadius: 9999, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}>
        <Zap size={14} /> Lightning Fast
      </div>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
      <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.7, opacity: 0.8, maxWidth: 800, margin: '0 auto 64px' }}>{section.content}</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
        {['No re-encoding required', 'No upload bandwidth', 'Instant offline processing'].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '24px 40px', background: 'var(--bg-app)', borderRadius: 100, border: '1px solid var(--border-color)' }} className="hover-lift">
            <CheckCircle2 color="var(--brand-primary)" size={24} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-main)' }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const MuteVideoOfflineSection: React.FC<SectionProps> = ({ section }) => (
  <section className="seo-section privacy" style={{ padding: '120px 24px', background: 'var(--bg-app)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
         <div style={{ width: 280, height: 280, borderRadius: '50%', background: 'var(--bg-card)', border: '8px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', position: 'relative', zIndex: 1 }} className="hover-lift">
            <Shield size={120} color="var(--brand-primary)" />
            <div style={{ position: 'absolute', top: -10, right: 20, width: 64, height: 64, background: 'var(--brand-gradient)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '4px solid var(--bg-app)' }}>
               <CheckCircle2 size={32} />
            </div>
         </div>
      </div>
      <div style={{ flex: '1 1 500px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: 9999, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24, border: '1px solid rgba(34, 197, 94, 0.2)' }}>
          <Shield size={14} /> Security First
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.7, opacity: 0.8 }}>{section.content}</p>
      </div>
    </div>
  </section>
);

export const MuteVideoFAQSection: React.FC<{
  faqs?: Array<{q: string, a: string}>
}> = ({ faqs }) => {
  const defaultFaqs = [
    { q: "Will muting the video reduce its file size?", a: "Yes, removing the audio track entirely will reduce the file size. However, audio data usually takes up a very small percentage of a video file compared to the visual data." },
    { q: "Does this affect the video quality?", a: "No. Our tool strips out the audio stream without re-encoding the video stream. The visual quality remains 100% identical to the original." },
    { q: "Can I undo this later?", a: "No, once the audio is removed and you download the new file, the audio is permanently gone from that specific file. You should always keep a backup of your original video if you might need the audio later." }
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
                <span style={{ color: '#ef4444' }}>Q:</span> {faq.q}
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
