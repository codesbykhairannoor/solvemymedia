// @ts-nocheck
import React from 'react';
import { 
  Clapperboard, 
  Film, 
  Sparkles, 
  Layers, 
  Tv, 
  MonitorPlay, 
  Sliders, 
  CheckCircle2, 
  FolderSync, 
  FileVideo,
  Share2
} from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

/**
 * SECTION 1: Hollywood Clapperboard / Production Slate Showcase
 */
export const EditVideoClapperboardSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section clapperboard-showcase" style={{ maxWidth: 1200, margin: '40px auto 60px auto', padding: '0 clamp(16px, 3vw, 24px)', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--brand-glow)', border: '1px solid var(--brand-primary)', borderRadius: 100, color: 'var(--brand-primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: 16 }}>
          <Clapperboard size={15} />
          <span>{t('edtClapperBadge') || 'HOLLYWOOD SLATE • CONTAINER TAG STUDIO'}</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 16, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {t('edtClapperTitle') || 'Professional Video Tag & Atom Editor'}
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 760, margin: '0 auto', lineHeight: 1.7 }}>
          {t('edtClapperSubtitle') || 'Inject standard title, artist, director, release year, and genre tags into MP4, MOV, and MKV video files losslessly in seconds.'}
        </p>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 28, padding: 'clamp(20px, 4vw, 36px) clamp(16px, 4vw, 32px)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: 28, boxShadow: '0 10px 30px rgba(0,0,0,0.04)', width: '100%', boxSizing: 'border-box' }}>
        {/* Clapperboard Graphic */}
        <div style={{ width: 280, maxWidth: '100%', background: '#090d1e', border: '3px solid #334155', borderRadius: 18, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', boxSizing: 'border-box' }}>
          {/* Top Chevron Sticks */}
          <div style={{ height: 38, background: 'repeating-linear-gradient(45deg, #1e293b, #1e293b 15px, #f8fafc 15px, #f8fafc 30px)', borderBottom: '3px solid #334155' }} />
          {/* Slate Body */}
          <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'monospace' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #334155', paddingBottom: 6 }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{t('edtClapperProd') || 'PRODUCTION'}</span>
              <strong style={{ fontSize: '0.72rem', color: '#38bdf8' }}>{t('edtClapperProdVal') || 'SolveMyMedia Cinema'}</strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, textAlign: 'center', fontSize: '0.68rem', color: '#cbd5e1', borderBottom: '1px dashed #334155', paddingBottom: 6 }}>
              <div>{t('edtClapperScene') || 'SCENE: 01'}</div>
              <div>{t('edtClapperTake') || 'TAKE: 01'}</div>
              <div>{t('edtClapperFps') || 'FPS: 24.00'}</div>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#facc15', textAlign: 'center', fontWeight: 800 }}>
              ★ 4K MASTER REMUX ★
            </div>
          </div>
        </div>

        {/* Live Video Atom Form Preview */}
        <div style={{ flex: '1 1 260px', width: '100%', minWidth: 0, maxWidth: 520, background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 20, padding: 'clamp(16px, 3vw, 24px)', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--border-color)', marginBottom: 14 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              CONTAINER ATOM MAP (moov / udta)
            </span>
            <span style={{ fontSize: '0.72rem', padding: '3px 8px', background: 'rgba(56,189,248,0.1)', color: '#38bdf8', borderRadius: 6, fontWeight: 700 }}>
              LOSSLESS BIT-EXACT
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10, fontSize: '0.86rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', wordBreak: 'break-word', gap: 8 }}>
              <span style={{ color: 'var(--text-muted)' }}>{t('edtClapperTitleLbl') || 'Title'}:</span>
              <strong style={{ color: 'var(--text-main)', textAlign: 'right' }}>{t('edtClapperTitleVal') || 'Afternoon Cinematic Reel'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', wordBreak: 'break-word', gap: 8 }}>
              <span style={{ color: 'var(--text-muted)' }}>{t('edtClapperDirLbl') || 'Director / Artist'}:</span>
              <strong style={{ color: 'var(--text-main)', textAlign: 'right' }}>{t('edtClapperDirVal') || 'Studio Master'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', wordBreak: 'break-word', gap: 8 }}>
              <span style={{ color: 'var(--text-muted)' }}>{t('edtClapperYearLbl') || 'Release Year'}:</span>
              <strong style={{ color: 'var(--text-main)', textAlign: 'right' }}>{t('edtClapperYearVal') || '2026'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', wordBreak: 'break-word', gap: 8 }}>
              <span style={{ color: 'var(--text-muted)' }}>{t('edtClapperGenreLbl') || 'Genre'}:</span>
              <strong style={{ color: 'var(--text-main)', textAlign: 'right' }}>{t('edtClapperGenreVal') || 'Cinematic Documentary'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', wordBreak: 'break-word', gap: 8 }}>
              <span style={{ color: 'var(--text-muted)' }}>{t('edtClapperFmtLbl') || 'Format'}:</span>
              <span style={{ color: '#10b981', fontWeight: 700, textAlign: 'right' }}>{t('edtClapperFmtVal') || 'MP4 H.264 • 4K UHD'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * SECTION 2: Continuous 35mm Filmstrip Stepper Workflow
 */
export const EditVideoFilmstripStepperSection: React.FC = () => {
  const { t } = useLanguage();

  const frames = [
    {
      num: '01',
      title: t('edtFilmStep1Title') || 'FRAME 01 / Import Video',
      desc: t('edtFilmStep1Desc') || 'Drop your MP4, MOV, or MKV file. Our scanner instantly extracts existing udta, ilst, and EBML metadata.'
    },
    {
      num: '02',
      title: t('edtFilmStep2Title') || 'FRAME 02 / Edit Metadata',
      desc: t('edtFilmStep2Desc') || 'Set title, artist/director, release year, and genre. Use auto-fill to instantly clean up messy filenames.'
    },
    {
      num: '03',
      title: t('edtFilmStep3Title') || 'FRAME 03 / Instant Stream Copy',
      desc: t('edtFilmStep3Desc') || 'FFmpeg WebAssembly writes new metadata atoms directly into the file header in under 1 second with 0 re-encoding.'
    }
  ];

  return (
    <section className="seo-section filmstrip-stepper" style={{ maxWidth: 1000, margin: '0 auto 60px auto', padding: '0 24px', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--brand-glow)', border: '1px solid var(--brand-primary)', borderRadius: 100, color: 'var(--brand-primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: 16 }}>
          <Film size={15} />
          <span>{t('edtFilmstripBadge') || '35MM PRODUCTION WORKFLOW'}</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 16, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {t('edtFilmstripTitle') || '3-Step Video Tagging Pipeline'}
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 760, margin: '0 auto', lineHeight: 1.7 }}>
          {t('edtFilmstripSubtitle') || 'Modern container atom injection without re-encoding video frames.'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', boxSizing: 'border-box' }}>
        {frames.map((fr, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(14px, 3vw, 24px)', padding: 'clamp(18px, 4vw, 32px)', background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: 'var(--brand-gradient)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>
              {fr.num}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-main)', letterSpacing: '-0.02em', wordBreak: 'break-word' }}>
                {fr.title}
              </h3>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0, wordBreak: 'break-word' }}>
                {fr.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * SECTION 3: Home Theater & Media Server Archival Standards
 */
export const EditVideoMediaServerCompatibilitySection: React.FC = () => {
  const { t } = useLanguage();

  const servers = [
    {
      icon: <Tv size={24} color="#38bdf8" />,
      title: t('edtCompat1Title') || 'Apple TV & QuickTime',
      desc: t('edtCompat1Desc') || 'Native iTunes ilst metadata tags ensure movies and home videos appear with correct titles and cover details in iOS and macOS.'
    },
    {
      icon: <Sparkles size={24} color="#f59e0b" />,
      title: t('edtCompat2Title') || 'Plex Media Server',
      desc: t('edtCompat2Desc') || 'Standardized year and title atoms allow Plex to instantly match movies and TV shows without manual metadata fixing.'
    },
    {
      icon: <MonitorPlay size={24} color="#a855f7" />,
      title: t('edtCompat3Title') || 'Jellyfin & Kodi',
      desc: t('edtCompat3Desc') || 'Fully compatible with open-source home theater servers. Clean container tags prevent scanning errors and mismatched titles.'
    },
    {
      icon: <FolderSync size={24} color="#10b981" />,
      title: t('edtCompat4Title') || 'VLC & Windows Media Player',
      desc: t('edtCompat4Desc') || 'Display accurate track titles, artists, and release years in desktop playlists and file property dialogs.'
    }
  ];

  return (
    <section className="seo-section media-server-compatibility" style={{ maxWidth: 1100, margin: '0 auto 60px auto', padding: '0 24px', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--brand-glow)', border: '1px solid var(--brand-primary)', borderRadius: 100, color: 'var(--brand-primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: 16 }}>
          <Sparkles size={15} />
          <span>{t('edtCompatBadge') || 'MEDIA SERVER ECOSYSTEM'}</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 16, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {t('edtCompatTitle') || 'Seamless Home Theater & Streaming Indexing'}
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 760, margin: '0 auto', lineHeight: 1.7 }}>
          {t('edtCompatSubtitle') || 'Metadata injected by SolveMyMedia conforms to strict media server standards for automatic poster matching, sorting, and indexing.'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 20, width: '100%', boxSizing: 'border-box' }}>
        {servers.map((s, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: 'clamp(18px, 3vw, 24px)', display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {s.icon}
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, wordBreak: 'break-word' }}>
              {s.title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, wordBreak: 'break-word' }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * SECTION 4: Film Container Tag Format Specifications
 */
export const EditVideoFormatSpecsSection: React.FC = () => {
  const { t } = useLanguage();

  const rows = [
    {
      fmt: t('edtSpecsFmt1') || 'MP4 (.mp4)',
      spec: t('edtSpecsSpec1') || 'ISO BMFF ilst Atoms',
      fields: t('edtSpecsFields1') || '©nam (Title), ©ART (Artist), ©day, ©gen',
      fidelity: t('edtSpecsFid1') || 'Stream Copy'
    },
    {
      fmt: t('edtSpecsFmt2') || 'QuickTime (.mov)',
      spec: t('edtSpecsSpec2') || 'QuickTime udta Atoms',
      fields: t('edtSpecsFields2') || 'titl, auth, yrrc, gnre, dscp, cprt',
      fidelity: t('edtSpecsFid2') || 'ProRes Preserved'
    },
    {
      fmt: t('edtSpecsFmt3') || 'Matroska (.mkv)',
      spec: t('edtSpecsSpec3') || 'EBML Info & Tags',
      fields: t('edtSpecsFields3') || 'TITLE, ARTIST, DATE_RELEASED, COMMENT',
      fidelity: t('edtSpecsFid3') || 'Bit-Exact Remux'
    },
    {
      fmt: t('edtSpecsFmt4') || 'WebM (.webm)',
      spec: t('edtSpecsSpec4') || 'EBML Segment Info',
      fields: t('edtSpecsFields4') || 'Title, MuxingApp, WritingApp',
      fidelity: t('edtSpecsFid4') || 'VP9 / AV1 Untouched'
    }
  ];

  return (
    <section className="seo-section format-specs" style={{ maxWidth: 1000, margin: '0 auto 60px auto', padding: '0 clamp(16px, 3vw, 24px)', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2, margin: 0 }}>
          {t('edtSpecsTitle') || 'Video Container Tag Standard Matrix'}
        </h2>
      </div>

      {/* Desktop Table */}
      <div className="matrix-desktop-table" style={{ width: '100%', overflowX: 'auto', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, boxSizing: 'border-box' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 540 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-app)' }}>
              <th style={{ padding: '16px 20px', color: 'var(--text-main)', fontWeight: 800 }}>
                {t('edtSpecsColContainer') || 'Container'}
              </th>
              <th style={{ padding: '16px 20px', color: 'var(--brand-primary)', fontWeight: 800 }}>
                {t('edtSpecsColSpec') || 'Tag Specification'}
              </th>
              <th style={{ padding: '16px 20px', color: 'var(--brand-secondary)', fontWeight: 800 }}>
                {t('edtSpecsColFields') || 'Supported Fields'}
              </th>
              <th style={{ padding: '16px 20px', color: '#10b981', fontWeight: 800 }}>
                {t('edtSpecsColFidelity') || 'Fidelity'}
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.88rem' }}>
            {rows.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: idx < rows.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                  {row.fmt}
                </td>
                <td style={{ padding: '14px 20px', color: 'var(--brand-primary)', fontWeight: 600 }}>
                  {row.spec}
                </td>
                <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                  {row.fields}
                </td>
                <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                  {row.fidelity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Responsive Cards */}
      <div className="matrix-mobile-cards">
        {rows.map((row, idx) => (
          <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '16px', display: 'flex', flexDirection: 'column', gap: 10, boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: 10 }}>
              <span style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-main)' }}>{row.fmt}</span>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                {row.fidelity}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.82rem' }}>
              <div style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>{row.spec}</div>
              <div style={{ color: 'var(--text-muted)', lineHeight: 1.45 }}>{row.fields}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
