// @ts-nocheck
import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, MapPin, EyeOff, Cpu, Lock, CheckCircle2, ChevronDown, Zap, ServerOff, Video, Sparkles, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

export const RemoveVideoMetadataHeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section hero" style={{ padding: '90px 24px', marginBottom: '60px', background: '#0b1329', borderRadius: 36, position: 'relative', overflow: 'hidden', border: '1px solid rgba(225,29,72,0.2)' }}>
      {/* Background Cyber Grid */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(225,29,72,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(225,29,72,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px', zIndex: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 56, alignItems: 'center', position: 'relative', zIndex: 1, color: 'white' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'inline-flex', padding: '10px 20px', background: 'rgba(225,29,72,0.15)', borderRadius: 100, color: '#f43f5e', fontWeight: 800, fontSize: '0.85rem', marginBottom: 24, gap: 10, alignItems: 'center', border: '1px solid rgba(225,29,72,0.3)' }}>
            <ShieldCheck size={18} /> {t('rmvHeroPill') || '100% Client-Side Privacy Shield'}
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.12 }}>
            {t('rmvHeroTitle') || 'Wipe GPS, Camera Serials, and Timestamps from Any Video'}
          </h2>
          <p style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)', color: '#94a3b8', lineHeight: 1.8, marginBottom: 32 }}>
            {t('rmvHeroDesc') || 'Every smartphone video embeds your exact home coordinates, phone model, and creation timestamp. SolveMyMedia cleans all hidden tags directly in browser memory before you share online.'}
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontSize: '0.9rem', fontWeight: 700 }}>
              <ServerOff size={18} /> 0 Cloud Uploads
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4ade80', fontSize: '0.9rem', fontWeight: 700 }}>
              <Zap size={18} /> Instant Stream Copy (-c copy)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fbbf24', fontSize: '0.9rem', fontWeight: 700 }}>
              <EyeOff size={18} /> 100% Metadata Cleansed
            </div>
          </div>
        </div>

        {/* Interactive Privacy Terminal Visualizer */}
        <div style={{ flex: '1 1 480px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 480, background: '#0f172a', borderRadius: 20, border: '1px solid #334155', boxShadow: '0 25px 60px rgba(0,0,0,0.6)', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ background: '#1e293b', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #334155' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'monospace', marginLeft: 8 }}>
                {t('rmvTerminalTitle') || 'metadata_sanitizer.log'}
              </span>
            </div>

            {/* Terminal Body */}
            <div style={{ padding: '20px 24px', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.8 }}>
              <div style={{ color: '#38bdf8' }}>{t('rmvLog1') || '[SCAN] Inspecting ISO BMFF / QuickTime container...'}</div>
              <div style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertTriangle size={14} /> {t('rmvLog2') || '[FOUND] GPS coordinates (xyz atom) & camera serial'}
              </div>
              
              {/* Diff simulation */}
              <div style={{ margin: '14px 0', padding: '12px', background: 'rgba(0,0,0,0.4)', borderRadius: 8, borderLeft: '3px solid #ef4444' }}>
                <div style={{ color: '#ef4444', textDecoration: 'line-through' }}>- location.latitude: 37.774929</div>
                <div style={{ color: '#ef4444', textDecoration: 'line-through' }}>- location.longitude: -122.419416</div>
                <div style={{ color: '#ef4444', textDecoration: 'line-through' }}>- device.model: iPhone 16 Pro (A3084)</div>
                <div style={{ color: '#22c55e', fontWeight: 700 }}>+ container.udta: [STRIPPED CLEAN]</div>
              </div>

              <div style={{ color: '#fbbf24' }}>{t('rmvLog3') || '[PURGE] Stripping udta, ilst, and XMP metadata...'}</div>
              <div style={{ color: '#4ade80', fontWeight: 800 }}>{t('rmvLog4') || '[SUCCESS] Clean stream copy written with 0 leaks.'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const RemoveVideoMetadataHowToSection: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t('rmvHowToStep1Title') || 'Upload Video',
      desc: t('rmvHowToStep1Desc') || 'Select your MP4, MOV, MKV, or WebM video. The file stays locked in your browser RAM.'
    },
    {
      num: '02',
      title: t('rmvHowToStep2Title') || 'Inspect & Sanitize',
      desc: t('rmvHowToStep2Desc') || 'Select what to strip—GPS geotags, camera serials, creation timestamps, and device properties.'
    },
    {
      num: '03',
      title: t('rmvHowToStep3Title') || 'Download Safe Video',
      desc: t('rmvHowToStep3Desc') || 'Instant stream copy exports a completely sanitized video in seconds with zero loss in resolution.'
    }
  ];

  return (
    <section className="seo-section how-to" style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto 60px auto' }}>
      <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, textAlign: 'center', marginBottom: 54, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
        {t('rmvHowToTitle') || 'How to Strip Video Metadata in 3 Quick Steps'}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
        {steps.map((st, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', padding: '36px 28px', borderRadius: 24, border: '1px solid var(--border-color)', position: 'relative', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--brand-primary)', opacity: 0.35, marginBottom: 16 }}>{st.num}</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 12, color: 'var(--text-main)' }}>{st.title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.98rem', margin: 0 }}>{st.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const RemoveVideoMetadataBentoSection: React.FC = () => {
  const { t } = useLanguage();

  const bento = [
    {
      icon: <MapPin size={28} color="#ef4444" />,
      title: t('rmvBento1Title') || 'Complete GPS Geotag Sanitizer',
      desc: t('rmvBento1Desc') || 'Destroys embedded latitude, longitude, and altitude atoms recorded by iPhone and Android camera sensors.'
    },
    {
      icon: <Zap size={28} color="#eab308" />,
      title: t('rmvBento2Title') || 'Zero Re-encoding Loss',
      desc: t('rmvBento2Desc') || 'Unlike cloud editors that downgrade video bitrate, our WebAssembly stream copy retains 100% original video pixels.'
    },
    {
      icon: <Lock size={28} color="#22c55e" />,
      title: t('rmvBento3Title') || 'Zero Cloud Uploads',
      desc: t('rmvBento3Desc') || 'Your sensitive footage never touches external cloud servers or databases. GDPR and HIPAA compliant by architecture.'
    },
    {
      icon: <ShieldCheck size={28} color="#38bdf8" />,
      title: t('rmvBento4Title') || 'Social Media & Whistleblower Safe',
      desc: t('rmvBento4Desc') || 'Safely share footage to TikTok, X, YouTube, and journalism portals without leaving any digital footprints.'
    }
  ];

  return (
    <section className="seo-section bento" style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto 60px auto' }}>
      <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, textAlign: 'center', marginBottom: 54, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
        {t('rmvBentoTitle') || 'Engineered for Journalists, Creators, and Privacy-First Users'}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 24 }}>
        {bento.map((b, idx) => (
          <div key={idx} style={{ background: 'var(--bg-card)', padding: '32px 26px', borderRadius: 20, border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
              {b.icon}
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>{b.title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const RemoveVideoMetadataComparisonSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section comparison" style={{ padding: '80px 24px', maxWidth: 1000, margin: '0 auto 60px auto' }}>
      <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)' }}>
        {t('rmvCompTitle') || 'Browser WASM Sanitizer vs Risky Cloud Converters'}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {/* SolveMyMedia */}
        <div style={{ background: 'rgba(34,197,94,0.05)', border: '2px solid rgba(34,197,94,0.4)', borderRadius: 24, padding: 36, position: 'relative' }}>
          <div style={{ color: '#22c55e', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
            Recommended Choice
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: 12 }}>
            {t('rmvCompSolveMyMedia') || 'SolveMyMedia (Browser WASM)'}
          </h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>
            {t('rmvCompSolveMyMediaDesc') || 'Runs locally in RAM. Zero files uploaded. 0.8s instant export. 100% private.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['100% Local Sandboxed Processing', 'Preserves Original Codec Quality', 'Removes Hidden iPhone/Android GPS', 'Free Forever Without File Limits'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={16} color="#22c55e" /> {item}
              </div>
            ))}
          </div>
        </div>

        {/* Cloud Converters */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 24, padding: 36, opacity: 0.85 }}>
          <div style={{ color: '#ef4444', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
            High Privacy Risk
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: 12 }}>
            {t('rmvCompCloud') || 'Traditional Cloud Converters'}
          </h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>
            {t('rmvCompCloudDesc') || 'Uploads full video to 3rd-party servers, stores temporary copies, and queues behind paid accounts.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Stores Copies on Remote Disk', 'Compromises Location Privacy', 'Slow Network Upload & Download', 'Watermarks or Paid Subscriptions'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                <ShieldAlert size={16} color="#ef4444" /> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
