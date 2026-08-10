import React from 'react';
import { Crop, Smartphone, Monitor, CheckCircle2, Lock, Sparkles, Scissors, Target, MapPin, Shield, Zap, Video } from 'lucide-react';
import type { SectionProps } from '../types';
import { useLanguage } from '../../../hooks/useLanguage';

export const CropVideoHeroSection: React.FC<SectionProps> = ({ section }) => {
  const { t } = useLanguage();
  return (
  <section className="seo-section hero" style={{ padding: '80px 24px', margin: '40px 0 60px', background: 'var(--bg-app)', borderRadius: 32, border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'inline-flex', padding: '8px 20px', background: 'var(--brand-primary)', borderRadius: 100, color: 'white', fontWeight: 800, fontSize: '0.9rem', marginBottom: 32, gap: 8, alignItems: 'center', boxShadow: '0 10px 30px rgba(var(--brand-primary-rgb), 0.3)' }}>
          <Scissors size={16} /> {t('cvCropUploads') || "Crop Without Uploads"}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48, position: 'relative' }}>
        <div style={{ width: 140, height: 140, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ position: 'absolute', top: 0, left: 0, width: 32, height: 32, borderTop: '4px solid var(--brand-primary)', borderLeft: '4px solid var(--brand-primary)', borderTopLeftRadius: 16 }}></div>
           <div style={{ position: 'absolute', top: 0, right: 0, width: 32, height: 32, borderTop: '4px solid var(--brand-primary)', borderRight: '4px solid var(--brand-primary)', borderTopRightRadius: 16 }}></div>
           <div style={{ position: 'absolute', bottom: 0, left: 0, width: 32, height: 32, borderBottom: '4px solid var(--brand-primary)', borderLeft: '4px solid var(--brand-primary)', borderBottomLeftRadius: 16 }}></div>
           <div style={{ position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderBottom: '4px solid var(--brand-primary)', borderRight: '4px solid var(--brand-primary)', borderBottomRightRadius: 16 }}></div>
           
           <div style={{ width: 80, height: 80, borderRadius: 20, background: 'var(--brand-gradient)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)' }} className="hover-lift">
             <Crop size={40} />
           </div>
        </div>
      </div>
      
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
      <p style={{ fontSize: 'clamp(1.05rem, 2, 1.25rem)', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>{section.content}</p>
    </div>
  </section>
  );
};

export const CropVideoHowToSection: React.FC<SectionProps> = ({ section }) => {
  const { t } = useLanguage();
  return (
  <section className="seo-section how-to" style={{ padding: '120px 24px', background: 'var(--bg-app)', position: 'relative' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ display: 'inline-flex', padding: '8px 20px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 100, color: 'var(--text-main)', fontWeight: 800, fontSize: '0.9rem', marginBottom: 24, gap: 8, alignItems: 'center' }}>
          <Sparkles size={16} className="text-brand-primary" /> {t('cvQuickGuide') || "Quick Guide"}
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40 }}>{t('cvExtract') || "Extract visual data or trim sensitive margins off a video completely within your browser's private memory."}</p>
      </div>
      
      <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {section.steps?.map((step: any, i: number) => (
          <div key={i} style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 32, border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: 24 }} className="hover-lift">
            <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--bg-app)', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 900, color: 'var(--brand-primary)' }}>
              {i + 1}
            </div>
            <div>
              <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 800, marginBottom: 12, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
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
};

export const CropVideoPlatformSection: React.FC<SectionProps> = ({ section }) => {
  const { t } = useLanguage();
  return (
  <section className="seo-section platforms" style={{ padding: '80px 24px', background: 'var(--bg-card)', position: 'relative' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', padding: '8px 20px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 100, color: 'var(--text-main)', fontWeight: 800, fontSize: '0.9rem', marginBottom: 24, gap: 8, alignItems: 'center' }}>
        <Smartphone size={16} className="text-brand-primary" /> {t('cvSocialReady') || "Social Ready"}
      </div>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
      <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.7, maxWidth: 800, margin: '0 auto 64px' }}>{section.content}</p>
      
      <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
         <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, background: 'var(--border-color)' }}></div>
         <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'var(--border-color)' }}></div>
         <div style={{ width: 100, height: 100, borderRadius: '50%', border: '4px solid #eab308', margin: 'auto', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }} className="hover-lift">
            <Video size={40} color="#eab308" />
         </div>
      </div>
    </div>
  </section>
  );
};

export const CropVideoPrivacySection: React.FC<SectionProps> = ({ section }) => {
  const { t } = useLanguage();
  return (
  <section className="seo-section privacy" style={{ padding: '120px 24px', background: 'var(--bg-app)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
         <div style={{ width: '100%', maxWidth: 400, padding: 48, borderRadius: 32, background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 30px 60px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }} className="hover-lift">
            <Shield size={64} color="var(--brand-primary)" style={{ marginBottom: 32 }} />
            <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)' }}>{t('cvCropUploads') || 'Crop Without Uploads'}</h3>
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', lineHeight: 1.7 }}>{t('cvExtract') || 'Extract visual data or trim sensitive margins off a video completely within your browser\'s private memory.'}</p>
         </div>
      </div>
      <div style={{ flex: '1 1 500px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: 9999, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24, border: '1px solid rgba(34, 197, 94, 0.2)' }}>
          <Shield size={14} /> {t('cvSecurityFirst') || 'Security First'}
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.7, opacity: 0.8 }}>{section.content}</p>
      </div>
    </div>
  </section>
  );
};

export const CropVideoFAQSection: React.FC<{
  faqs?: Array<{q: string, a: string}>
}> = ({ faqs }) => {
  const { t } = useLanguage();
  const defaultFaqs = [
    { q: t('cropFaq1Q') || "Does cropping reduce video quality?", a: t('cropFaq1A') || "Cropping technically re-encodes the video, but we use high-quality presets to ensure the cropped area retains its original sharpness." },
    { q: t('cropFaq2Q') || "Can I do custom free-form cropping?", a: t('cropFaq2A') || "Currently we only support center-cropping to standard social media aspect ratios (1:1, 9:16, 16:9) to keep the process lightning fast and simple." },
    { q: t('cropFaq3Q') || "Is it really private?", a: t('cropFaq3A') || "Absolutely. Everything happens directly inside your web browser. Try turning off your Wi-Fi before clicking 'Crop'!" }
  ];
  
  const faqList = faqs || defaultFaqs;
  
  return (
    <section className="seo-section faq" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('faqTitle') || "Frequently Asked Questions"}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {faqList.map((faq, idx) => (
            <div key={idx} style={{ background: 'var(--bg-app)', padding: 32, borderRadius: 20, border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12, color: 'var(--text-main)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ color: '#22c55e' }}>Q:</span> {faq.q}
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
