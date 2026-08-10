import React, { useState, useRef } from 'react';
import { VolumeX, Settings2, Video, FastForward, ShieldAlert, ChevronDown, CheckCircle2 } from 'lucide-react';
import type { SectionProps } from '../types';
import { useLanguage } from '../../../hooks/useLanguage';

export const MuteVideoHeroSection: React.FC<SectionProps> = ({ section }) => {
  const { t } = useLanguage();
  return (
  <section className="seo-section hero" style={{ padding: '120px 24px', margin: '80px 0 60px', background: '#0f172a', borderRadius: 40, position: 'relative', overflow: 'hidden' }}>
    {/* Abstract audio visualizer fade out */}
    <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: '50%', background: 'linear-gradient(90deg, transparent, #0f172a)', zIndex: 1 }} />
    <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: 8, opacity: 0.15, zIndex: 0 }}>
      {Array.from({ length: 40 }).map((_, i) => (
        <div 
          key={i} 
          style={{ 
            width: 8, 
            height: Math.max(4, 100 * Math.sin(i * 0.2) * (1 - i/40)), 
            background: 'var(--brand-primary)', 
            borderRadius: 4,
            animation: `pulseWave 1.5s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.05}s`
          }} 
        />
      ))}
    </div>
    <style>{`@keyframes pulseWave { 0% { transform: scaleY(0.8); opacity: 0.5; } 100% { transform: scaleY(1.2); opacity: 1; } }`}</style>
    
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 2 }}>
      <div style={{ flex: '1 1 500px' }}>
        <div style={{ display: 'inline-flex', padding: '10px 24px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, color: 'white', fontWeight: 800, fontSize: '0.9rem', marginBottom: 24, gap: 8, alignItems: 'center', backdropFilter: 'blur(10px)' }}>
          <VolumeX size={18} color="#ef4444" /> {t('mvAbsoluteSilence') || "Absolute Silence"}
        </div>
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, marginBottom: 24, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.1 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: '#94a3b8', lineHeight: 1.8 }}>{section.content}</p>
      </div>
      
      <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center' }}>
         <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>
            <div style={{ width: '100%', aspectRatio: '1', background: 'rgba(0,0,0,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
               {/* Pulsing ring that stops */}
               <div style={{ position: 'absolute', top: 20, left: 20, right: 20, bottom: 20, border: '2px dashed rgba(239, 68, 68, 0.3)', borderRadius: '50%', animation: 'spinVault 10s linear infinite' }} />
               
               <div style={{ width: 140, height: 140, background: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(239, 68, 68, 0.4)', position: 'relative', zIndex: 2 }} className="hover-lift">
                  <VolumeX size={64} color="white" />
               </div>
            </div>
         </div>
      </div>
    </div>
  </section>
  );
};

export const MuteVideoHowToSection: React.FC<SectionProps> = ({ section }) => {
  const { t } = useLanguage();
  return (
  <section className="seo-section how-to" style={{ padding: '120px 24px', background: 'var(--bg-card)', position: 'relative' }}>
    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, textAlign: 'center', marginBottom: 80, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>{section.title}</h2>
    
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
      {section.steps?.map((step: any, i: number) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 40, background: 'var(--bg-app)', borderRadius: 40, boxShadow: '0 20px 40px rgba(0,0,0,0.02)', position: 'relative', border: '1px solid var(--border-color)' }}>
          <div style={{ width: 80, height: 80, borderRadius: 24, background: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 10px 20px rgba(var(--brand-primary-rgb), 0.2)' }}>
            {i === 0 ? <Video size={32} color="white" /> : i === 1 ? <Settings2 size={32} color="white" /> : <VolumeX size={32} color="white" />}
          </div>
          <div>
             <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 12, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>{step.title}</h3>
             <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.1rem' }}>{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
  );
};

export const MuteVideoSpeedSection: React.FC<SectionProps> = ({ section }) => {
  const { t } = useLanguage();
  return (
  <section className="seo-section speed" style={{ padding: '120px 24px', background: 'var(--bg-app)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
       <div style={{ flex: '1 1 500px' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.04em', lineHeight: 1.05 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 40 }}>{section.content}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[t('mvNoDecode') || 'No Video Decoding', t('mvStreamCopy') || 'Stream Copy Engine', t('mvZeroLoss') || 'Zero Quality Loss', t('mvInstant') || 'Instant Output'].map((item, i) => (
             <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px', background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-color)' }}>
                <FastForward color="var(--brand-primary)" size={20} />
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{item}</span>
             </div>
          ))}
        </div>
       </div>
       <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          {/* Speedometer styling */}
          <div style={{ width: 300, height: 300, borderRadius: '50%', border: '24px solid var(--bg-card)', borderTopColor: '#ef4444', borderRightColor: '#ef4444', transform: 'rotate(-45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', position: 'relative' }}>
             <div style={{ position: 'absolute', top: -30, left: -30, right: -30, bottom: -30, border: '2px dashed var(--border-color)', borderRadius: '50%' }} />
             <div style={{ transform: 'rotate(45deg)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1 }}>1s</div>
                 <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: 2 }}>{t('mvFast') || "Fast"}</div>
             </div>
          </div>
       </div>
    </div>
  </section>
  );
};

export const MuteVideoOfflineSection: React.FC<SectionProps> = ({ section }) => {
  const { t } = useLanguage();
  return (
  <section className="seo-section privacy" style={{ padding: '120px 24px', background: '#09090b', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
         <div style={{ position: 'relative', width: 280, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '2px dashed rgba(239, 68, 68, 0.4)', borderRadius: '50%', animation: 'spinVault 15s linear infinite reverse' }} />
            <div style={{ position: 'absolute', top: 20, left: 20, right: 20, bottom: 20, border: '4px solid #ef4444', borderRadius: '50%' }} />
            <ShieldAlert size={80} color="#ef4444" />
         </div>
      </div>
      <div style={{ flex: '1 1 500px' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 32, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.05 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: '#a1a1aa', fontWeight: 500, lineHeight: 1.7 }}>{section.content}</p>
      </div>
    </div>
  </section>
  );
};

const AccordionFaqItem: React.FC<{ faq: { q: string, a: string }, isOpen: boolean, onToggle: () => void }> = ({ faq, isOpen, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div 
      className="glass-panel" 
      style={{ 
        marginBottom: 16, 
        borderRadius: 24, 
        overflow: 'hidden',
        border: isOpen ? '1px solid var(--brand-primary)' : '1px solid var(--border-color)',
        transition: 'all 0.3s ease',
        background: isOpen ? 'var(--bg-app)' : 'var(--bg-card)',
        boxShadow: isOpen ? '0 10px 30px rgba(0,0,0,0.05)' : 'none'
      }}
    >
      <button 
        onClick={onToggle}
        style={{ 
          width: '100%', 
          padding: '24px 32px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          background: 'transparent', 
          border: 'none', 
          cursor: 'pointer',
          textAlign: 'left',
          color: 'var(--text-main)'
        }}
      >
        <span style={{ fontSize: '1.15rem', fontWeight: 700, paddingRight: 24, lineHeight: 1.4 }}>{faq.q}</span>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: 32, 
          height: 32, 
          borderRadius: '50%', 
          background: isOpen ? 'var(--brand-gradient)' : 'rgba(128,128,128,0.1)',
          color: isOpen ? '#fff' : 'var(--text-muted)',
          transition: 'all 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          flexShrink: 0
        }}>
          <ChevronDown size={20} />
        </div>
      </button>
      <div 
        style={{ 
          height: isOpen ? (contentRef.current?.scrollHeight || 'auto') : 0, 
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
        }}
      >
        <div ref={contentRef} style={{ padding: '0 32px 32px 32px', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
          {faq.a}
        </div>
      </div>
    </div>
  );
};

export const MuteVideoFAQSection: React.FC<{
  faqs?: Array<{q: string, a: string}>
}> = ({ faqs }) => {
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const defaultFaqs = [
    { q: t('mvFaq1Q') || "Will it reduce the file size?", a: t('mvFaq1A') || "Yes, removing the audio track entirely will reduce the file size. However, audio data usually takes up a very small percentage of a video file compared to the visual data." },
    { q: t('mvFaq2Q') || "Does it change video quality?", a: t('mvFaq2A') || "No. Our tool strips out the audio stream without re-encoding the video stream. The visual quality remains 100% identical to the original." },
    { q: t('mvFaq3Q') || "Can I restore the audio later?", a: t('mvFaq3A') || "No, once the audio is removed and you download the new file, the audio is permanently gone from that specific file. You should always keep a backup of your original video if you might need the audio later." }
  ];
  
  const faqList = faqs || defaultFaqs;
  
  return (
    <section className="seo-section faq" style={{ padding: '80px 24px', background: 'var(--bg-app)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('faqTitle') || "Frequently Asked Questions"}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {faqList.map((faq, i) => (
          <AccordionFaqItem 
            key={i} 
            faq={faq} 
            isOpen={activeFaq === i} 
            onToggle={() => setActiveFaq(activeFaq === i ? null : i)} 
          />
        ))}
        </div>
      </div>
    </section>
  );
};
