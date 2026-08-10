// @ts-nocheck
import React from 'react';
import { FastForward, CheckCircle2, Shield, Zap, MapPin, ArrowRight, Gauge, Play } from 'lucide-react';
import type { SectionProps } from '../types';
import { useLanguage } from '../../../hooks/useLanguage';

export const ChangeVideoSpeedHeroSection: React.FC<SectionProps> = ({ section, badges, stats, buttonText }) => {
  const { t } = useLanguage();
  return (
  <section className="seo-section hero" style={{ padding: '100px 24px', margin: '80px 0 60px', background: 'var(--bg-card)', borderRadius: 40, border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {/* 1.0x Speed */}
            <div style={{ width: 140, height: 180, background: 'var(--bg-app)', border: '2px dashed var(--border-color)', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, position: 'relative' }}>
               <Play size={40} color="var(--text-muted)" />
               <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-muted)' }}>1.0x</span>
            </div>
            
            {/* Speed Action */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
               <div style={{ width: 64, height: 64, background: 'var(--brand-gradient)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 10px 30px rgba(225, 29, 72, 0.4)' }} className="hover-lift">
                 <FastForward size={32} />
               </div>
               <ArrowRight size={24} color="var(--text-muted)" />
            </div>
            
            {/* 2.0x Speed */}
            <div style={{ width: 140, height: 180, background: 'var(--bg-card)', border: '2px solid var(--brand-primary)', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 40px rgba(225, 29, 72, 0.15)', position: 'relative' }} className="hover-lift">
               <Gauge size={40} color="var(--brand-primary)" />
               <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--brand-primary)' }}>2.0x</span>
               <div style={{ position: 'absolute', top: -12, right: -12, background: 'var(--brand-primary)', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: '0.85rem', fontWeight: 800 }}>{t('speedVMasterTime') || 'Master Time'}</div>
            </div>
         </div>
      </div>
      
      <div style={{ flex: '1 1 500px' }}>
        <div style={{ display: 'inline-flex', padding: '10px 20px', background: 'rgba(225, 29, 72, 0.1)', borderRadius: 100, color: 'var(--brand-primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: 24, gap: 8, alignItems: 'center' }}>
          <FastForward size={16} /> {t('speedVHeroPill') || 'Cinematic Speed Adjustments'}
        </div>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: 24, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', lineHeight: 1.8 }}>{section.content}</p>
      </div>
    </div>
  </section>
  );
};

export const ChangeVideoSpeedHowToSection: React.FC<SectionProps> = ({ section, badges, stats, buttonText }) => {
  const { t } = useLanguage();
  return (
  <section className="seo-section how-to" style={{ padding: '120px 24px', background: 'var(--bg-app)', position: 'relative' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 80, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
        {section.steps?.map((step: any, i: number) => (
          <div key={i} style={{ position: 'relative', padding: 40, background: 'var(--bg-card)', borderRadius: 32, border: '1px solid var(--border-color)' }} className="hover-lift">
            <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--brand-gradient)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, marginBottom: 24, boxShadow: '0 10px 20px rgba(225, 29, 72, 0.3)' }}>
              {i + 1}
            </div>
            <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>{step.title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: 'clamp(1.05rem, 2vw, 1.25rem)' }}>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export const ChangeVideoSpeedGeoSection: React.FC<SectionProps> = ({ section, badges, stats, buttonText }) => {
  const { t } = useLanguage();
  return (
  <section className="seo-section geo" style={{ padding: '120px 24px', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 500px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(225, 29, 72, 0.1)', color: 'var(--brand-primary)', borderRadius: 9999, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 32, border: '1px solid rgba(225, 29, 72, 0.2)' }}>
          <MapPin size={14} /> {section.badgeText || 'Local Processing'}
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.7 }}>{section.content}</p>
      </div>
      <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
         <div style={{ width: 240, height: 240, background: 'var(--bg-app)', border: '2px solid var(--border-color)', borderRadius: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, position: 'relative' }} className="hover-lift">
            <FastForward size={64} color="var(--brand-primary)" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
               <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--text-muted)' }} />
               <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--text-muted)' }} />
               <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--brand-primary)', boxShadow: '0 0 10px var(--brand-primary)' }} />
            </div>
         </div>
      </div>
    </div>
  </section>
  );
};

export const ChangeVideoSpeedPrivacySection: React.FC<SectionProps> = ({ section, badges, stats, buttonText }) => {
  const { t } = useLanguage();
  return (
  <section className="seo-section privacy" style={{ padding: '120px 24px', background: 'var(--bg-app)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: 40, padding: '80px 48px', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
        <div style={{ width: 80, height: 80, margin: '0 auto 32px', borderRadius: 24, background: 'var(--bg-app)', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={40} color="var(--brand-primary)" />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.7, maxWidth: 800, margin: '0 auto' }}>{section.content}</p>
      </div>
    </div>
  </section>
  );
};

export const ChangeVideoSpeedPerformanceSection: React.FC<SectionProps> = ({ section, badges, stats, buttonText }) => {
  const { t } = useLanguage();
  return (
  <section className="seo-section performance" style={{ padding: '120px 24px', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
         <div style={{ width: 280, height: 280, background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
            <Zap size={100} color="var(--text-muted)" opacity={0.2} />
            <div style={{ position: 'absolute', bottom: 30, right: 30, width: 80, height: 80, background: 'var(--brand-gradient)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 10px 30px rgba(225, 29, 72, 0.3)' }} className="hover-lift">
              <Zap size={32} />
            </div>
         </div>
      </div>
      <div style={{ flex: '1 1 500px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--brand-gradient)', color: '#fff', borderRadius: 9999, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}>
          <Zap size={14} /> {section.badgeText || t('speedVPerfPill') || 'Lightning Fast'}
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{section.title}</h2>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.7, opacity: 0.8, marginBottom: 40 }}>{section.content}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {(badges || ['Zero server latency', 'Adaptive audio pitch', 'Wasm speed']).map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', background: 'var(--bg-app)', borderRadius: 16, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 color="var(--brand-primary)" size={20} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};
