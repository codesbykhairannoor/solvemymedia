// @ts-nocheck
import React from 'react';
import { Tag, Sparkles, Film, CheckCircle2, Zap, Clock, Tv, Layers, ShieldCheck, FileText } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

export const EditVideoMetadataHeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section hero" style={{ padding: '90px 24px', marginBottom: '60px', background: '#0a192f', borderRadius: 36, position: 'relative', overflow: 'hidden', border: '1px solid rgba(56,189,248,0.2)' }}>
      {/* Background Grid Pattern */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px', zIndex: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 56, alignItems: 'center', position: 'relative', zIndex: 1, color: 'white' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'inline-flex', padding: '10px 20px', background: 'rgba(56,189,248,0.15)', borderRadius: 100, color: '#38bdf8', fontWeight: 800, fontSize: '0.85rem', marginBottom: 24, gap: 10, alignItems: 'center', border: '1px solid rgba(56,189,248,0.3)' }}>
            <Tag size={18} /> {t('edtHeroPill') || 'Lossless Container Tag Editor'}
          </div>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.12 }}>
            {t('edtHeroTitle') || 'Tag, Organize, and Personalize Video Files in Seconds'}
          </h2>
          <p style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)', color: '#94a3b8', lineHeight: 1.8, marginBottom: 32 }}>
            {t('edtHeroDesc') || 'Update video titles, director credits, copyright notices, and genre tags cleanly across MP4, MOV, and MKV containers without spending hours rendering in heavyweight video editors.'}
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontSize: '0.9rem', fontWeight: 700 }}>
              <Zap size={18} /> Instant Stream Copy (-c copy)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4ade80', fontSize: '0.9rem', fontWeight: 700 }}>
              <Tv size={18} /> Apple & VLC Compatible
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fbbf24', fontSize: '0.9rem', fontWeight: 700 }}>
              <Layers size={18} /> Zero Re-rendering
            </div>
          </div>
        </div>

        {/* Interactive Studio Tag Inspector Mockup */}
        <div style={{ flex: '1 1 480px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 480, background: '#0f172a', borderRadius: 20, border: '1px solid #334155', boxShadow: '0 25px 60px rgba(0,0,0,0.6)', overflow: 'hidden' }}>
            <div style={{ background: '#1e293b', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #334155' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'monospace', marginLeft: 8 }}>
                {t('edtTerminalTitle') || 'tag_inspector.json'}
              </span>
            </div>

            <div style={{ padding: '24px', fontFamily: 'monospace', fontSize: '0.88rem', lineHeight: 1.8 }}>
              <div style={{ color: '#64748b', marginBottom: 12 }}>// {t('edtInspectorTitle') || 'CONTAINER HEADER TAGS'}</div>
              <div style={{ color: '#38bdf8' }}>
                <span style={{ color: '#94a3b8' }}>{t('edtTagTitle') || 'title: '}</span>"Cinematic Journey 4K"
              </div>
              <div style={{ color: '#38bdf8' }}>
                <span style={{ color: '#94a3b8' }}>{t('edtTagArtist') || 'artist: '}</span>"Studio Creator / Director"
              </div>
              <div style={{ color: '#38bdf8' }}>
                <span style={{ color: '#94a3b8' }}>genre: </span>"Travel Documentary"
              </div>
              <div style={{ color: '#38bdf8' }}>
                <span style={{ color: '#94a3b8' }}>{t('edtTagDate') || 'date: '}</span>"2026"
              </div>
              <div style={{ color: '#38bdf8' }}>
                <span style={{ color: '#94a3b8' }}>copyright: </span>"(C) 2026 All Rights Reserved"
              </div>
              
              <div style={{ marginTop: 16, padding: '8px 12px', background: 'rgba(34,197,94,0.1)', borderRadius: 8, border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', fontSize: '0.8rem', fontWeight: 700 }}>
                {t('edtTagStatus') || 'Status: Ready for Lossless Remux'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const EditVideoMetadataHowToSection: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t('edtHowToStep1Title') || 'Upload Video File',
      desc: t('edtHowToStep1Desc') || 'Select your MP4, MOV, WebM, or MKV file. No waiting for cloud uploads.'
    },
    {
      num: '02',
      title: t('edtHowToStep2Title') || 'Update Tag Information',
      desc: t('edtHowToStep2Desc') || 'Type in your title, artist/director name, album/series, genre, release year, and copyright license.'
    },
    {
      num: '03',
      title: t('edtHowToStep3Title') || 'Export Clean Container',
      desc: t('edtHowToStep3Desc') || 'Click Save and download your newly tagged video immediately with untouched crystal-clear resolution.'
    }
  ];

  return (
    <section className="seo-section how-to" style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto 60px auto' }}>
      <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, textAlign: 'center', marginBottom: 54, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
        {t('edtHowToTitle') || 'How to Edit Video Metadata in 3 Simple Steps'}
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

export const EditVideoMetadataBentoSection: React.FC = () => {
  const { t } = useLanguage();

  const bento = [
    {
      icon: <Zap size={28} color="#38bdf8" />,
      title: t('edtBento1Title') || 'Lossless Stream Copy',
      desc: t('edtBento1Desc') || 'Never wait for video re-rendering. Container atoms are updated in milliseconds without touching video bitrate.'
    },
    {
      icon: <Tv size={28} color="#a855f7" />,
      title: t('edtBento2Title') || 'Universal Media Player Compatibility',
      desc: t('edtBento2Desc') || 'Tags display properly across Apple QuickTime, VLC, Windows Media Player, Smart TVs, and Plex media servers.'
    },
    {
      icon: <ShieldCheck size={28} color="#22c55e" />,
      title: t('edtBento3Title') || 'Copyright & Attribution Protection',
      desc: t('edtBento3Desc') || 'Embed your creator name, studio credits, and copyright ownership directly into the video file header.'
    },
    {
      icon: <Layers size={28} color="#f59e0b" />,
      title: t('edtBento4Title') || 'Batch & Library Ready',
      desc: t('edtBento4Desc') || 'Organize your video archives and home movie collections with standardized titles and release dates.'
    }
  ];

  return (
    <section className="seo-section bento" style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto 60px auto' }}>
      <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, textAlign: 'center', marginBottom: 54, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
        {t('edtBentoTitle') || 'Professional Tagging for Archivists, Podcasters, and Creators'}
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

export const EditVideoMetadataComparisonSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section comparison" style={{ padding: '80px 24px', maxWidth: 1000, margin: '0 auto 60px auto' }}>
      <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)' }}>
        {t('edtCompTitle') || 'Instant Container Tagging vs Heavyweight Video Rendering'}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {/* SolveMyMedia */}
        <div style={{ background: 'rgba(56,189,248,0.05)', border: '2px solid rgba(56,189,248,0.4)', borderRadius: 24, padding: 36, position: 'relative' }}>
          <div style={{ color: '#38bdf8', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
            Instant Workflow
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: 12 }}>
            {t('edtCompSolveMyMedia') || 'SolveMyMedia Stream Copy'}
          </h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>
            {t('edtCompSolveMyMediaDesc') || 'Updates header atoms only. Takes 1.2s. Zero CPU heat, zero quality loss.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['1-Second Header Remuxing', 'Preserves 100% Video Bitrate', 'No Re-encoding or Frame Drops', '100% Client-Side In-Browser'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={16} color="#38bdf8" /> {item}
              </div>
            ))}
          </div>
        </div>

        {/* Heavy Editors */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 24, padding: 36, opacity: 0.85 }}>
          <div style={{ color: '#94a3b8', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
            Cumbersome Workflow
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: 12 }}>
            {t('edtCompEditor') || 'Traditional Video Editing Software'}
          </h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>
            {t('edtCompEditorDesc') || 'Requires creating a new timeline, re-encoding the entire video track, taking 15+ minutes with quality degradation.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['15+ Minutes Re-render Time', 'Lossy Generation Loss / Quality Drop', 'Spikes CPU & Laptop Battery', 'Overcomplicated Interface'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                <Clock size={16} color="#94a3b8" /> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
