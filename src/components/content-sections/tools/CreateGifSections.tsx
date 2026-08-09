import React from 'react';
import { Sparkles, ImagePlay, Camera, CheckCircle2, MapPin, Zap } from 'lucide-react';
import type { SectionProps } from '../types';

export const CreateGifHeroSection: React.FC<SectionProps> = ({ section }) => (
  <section className="seo-section hero" style={{ padding: '100px 24px', margin: '80px 0 60px', background: 'var(--bg-card)', borderRadius: 40, border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 500px' }}>
        <div style={{ display: 'inline-flex', padding: '10px 20px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: 100, color: '#ec4899', fontWeight: 700, fontSize: '0.9rem', marginBottom: 24, gap: 8, alignItems: 'center' }}>
          <Sparkles size={16} /> Viral Ready
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', lineHeight: 1.8 }}>{section.content}</p>
      </div>
      
      <div style={{ flex: '1 1 500px', display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
         <div style={{ width: 160, height: 220, background: 'var(--bg-app)', borderRadius: 16, border: '1px solid var(--border-color)', padding: 16, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 20px 40px rgba(0,0,0,0.05)', position: 'relative', zIndex: 2 }} className="hover-lift">
            <div style={{ flex: 1, background: 'var(--border-color)', borderRadius: 8, width: '100%' }} />
         </div>
         
         <div style={{ width: 64, height: 64, background: 'linear-gradient(to right, #ec4899, #f43f5e)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 3, boxShadow: '0 10px 30px rgba(236, 72, 153, 0.4)' }}>
           <ImagePlay size={32} />
         </div>
         
         <div style={{ width: 160, height: 220, background: 'var(--bg-app)', borderRadius: 16, border: '1px dashed #ec4899', padding: 16, display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 20px 40px rgba(0,0,0,0.05)', position: 'relative', zIndex: 2 }} className="hover-lift">
            <div style={{ flex: 1, background: 'rgba(236, 72, 153, 0.2)', borderRadius: 8, width: '100%', display: 'flex', flexWrap: 'wrap', gap: 4, padding: 8 }}>
              <div style={{ width: '45%', height: '45%', background: '#ec4899', borderRadius: 4 }}></div>
              <div style={{ width: '45%', height: '45%', background: '#ec4899', borderRadius: 4, opacity: 0.8 }}></div>
              <div style={{ width: '45%', height: '45%', background: '#ec4899', borderRadius: 4, opacity: 0.6 }}></div>
              <div style={{ width: '45%', height: '45%', background: '#ec4899', borderRadius: 4, opacity: 0.4 }}></div>
            </div>
         </div>
      </div>
    </div>
  </section>
);

export const CreateGifHowToSection: React.FC<SectionProps> = ({ section }) => (
  <section className="seo-section how-to" style={{ padding: '120px 24px', background: 'var(--bg-app)', position: 'relative' }}>
    <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 80, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
    <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>
      {section.steps?.map((step: any, i: number) => (
        <div key={i} style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 32, border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }} className="hover-lift">
          <div style={{ position: 'absolute', top: -20, right: -20, fontSize: '10rem', fontWeight: 900, color: 'var(--bg-app)', opacity: 0.5, lineHeight: 1, zIndex: 0 }}>
            {i + 1}
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
             <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
               {step.title}
             </h3>
             <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: 'clamp(1.05rem, 2vw, 1.25rem)' }}>{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const CreateGifPerformanceSection: React.FC<SectionProps> = ({ section }) => (
  <section className="seo-section performance" style={{ padding: '120px 24px', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 500px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--brand-gradient)', color: '#fff', borderRadius: 9999, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}>
          <Zap size={14} /> Local Hardware
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.7, opacity: 0.8, marginBottom: 40 }}>{section.content}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {['Zero latency', 'Lossless framerates', 'WASM-powered rendering'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', background: 'var(--bg-app)', borderRadius: 16, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 color="#ec4899" size={20} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
         <div style={{ width: 280, height: 280, background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
            <Camera size={100} color="#ec4899" opacity={0.2} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 80, height: 80, background: 'linear-gradient(135deg, #ec4899, #f43f5e)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)' }} className="hover-lift">
              <Zap size={32} />
            </div>
         </div>
      </div>
    </div>
  </section>
);

export const CreateGifPrivacySection: React.FC<SectionProps> = ({ section }) => (
  <section className="seo-section geo" style={{ padding: '120px 24px', background: 'var(--bg-app)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
         <div style={{ width: '100%', maxWidth: 400, padding: 48, borderRadius: 32, background: 'var(--bg-card)', border: '1px solid var(--border-color)', position: 'relative' }} className="hover-lift">
            <MapPin size={48} color="#ec4899" style={{ marginBottom: 24 }} />
            <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)' }}>Absolute Offline Privacy</h3>
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', lineHeight: 1.7 }}>Your video files are never uploaded to our servers. Every frame of your GIF is generated purely within your own browser's memory.</p>
         </div>
      </div>
      <div style={{ flex: '1 1 500px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.7 }}>{section.content}</p>
      </div>
    </div>
  </section>
);

export const CreateGifFAQSection: React.FC<{
  faqs?: Array<{q: string, a: string}>
}> = ({ faqs }) => {
  const defaultFaqs = [
    { q: "Will the GIF maintain the same quality as the video?", a: "GIFs are limited to 256 colors per frame by definition. While we use advanced dithering and palette generation to make it look as close to the original as possible, some color loss is standard for the GIF format." },
    { q: "Is there a limit on how long the video can be?", a: "Because the conversion happens locally in your browser RAM, extremely long videos might cause memory limits. We recommend trimming your video to under 30 seconds before converting it to a GIF." },
    { q: "Do you keep a copy of my GIF?", a: "No. Our tool is 100% serverless. The entire GIF generation process happens on your device and no data is ever transmitted to us." }
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
                <span style={{ color: '#ec4899' }}>Q:</span> {faq.q}
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
