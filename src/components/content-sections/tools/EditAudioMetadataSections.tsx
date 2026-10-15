// @ts-nocheck
import React from 'react';
import { 
  Disc, 
  Tag, 
  Sparkles, 
  Layers, 
  Sliders, 
  Radio, 
  Volume2, 
  Music, 
  CheckCircle2, 
  Apple, 
  FolderSync, 
  Car, 
  FileAudio,
  Check
} from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

/**
 * SECTION 1: Virtual Vinyl Turntable Showcase
 */
export const EditAudioTurntableShowcaseSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section turntable-showcase" style={{ maxWidth: 1200, margin: '40px auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--brand-glow)', border: '1px solid var(--brand-primary)', borderRadius: 100, color: 'var(--brand-primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: 16 }}>
          <Disc size={15} />
          <span>{t('edaTurntableBadge') || '33 ⅓ RPM STUDIO TAG EDITOR'}</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 16, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {t('edaTurntableTitle') || 'Professional ID3 & Vorbis Tag Studio'}
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 760, margin: '0 auto', lineHeight: 1.7 }}>
          {t('edaTurntableSubtitle') || 'Losslessly tag your audio releases with metadata compatible with Spotify, Apple Music, Traktor, and Rekordbox.'}
        </p>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 28, padding: '40px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: 36, boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
        {/* Turntable Vinyl Graphic */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, #1e293b 0%, #0f172a 40%, #020617 70%, #000 100%)', border: '6px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', animation: 'spinVinyl 12s linear infinite' }}>
            {/* Vinyl Grooves */}
            <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', width: 140, height: 140, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
            {/* Center Label */}
            <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--brand-gradient)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', border: '3px solid #1e293b' }}>
              <Music size={20} />
              <span style={{ fontSize: '0.62rem', fontWeight: 900, marginTop: 2, letterSpacing: '0.05em' }}>33 ⅓ RPM</span>
            </div>
            {/* Center Spindle */}
            <div style={{ position: 'absolute', width: 12, height: 12, borderRadius: '50%', background: '#fff', border: '2px solid #0f172a' }} />
          </div>
          <style>{`@keyframes spinVinyl { 100% { transform: rotate(360deg); } }`}</style>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            {t('edaTurntableFmtVal') || 'MP3 320kbps • 44.1kHz • Stereo'}
          </span>
        </div>

        {/* Live ID3 Tag Slate */}
        <div style={{ flex: '1 1 360px', maxWidth: 520, background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 20, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--border-color)', marginBottom: 14 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {t('edaTurntableNow') || 'NOW EDITING'}
            </span>
            <span style={{ fontSize: '0.72rem', padding: '3px 8px', background: 'rgba(16,185,129,0.1)', color: '#10b981', borderRadius: 6, fontWeight: 700 }}>
              {t('edaTurntableMaster') || 'MASTER AUDIO'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10, fontSize: '0.86rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>{t('edaTurntableTrack') || 'Title:'}</span>
              <strong style={{ color: 'var(--text-main)' }}>{t('edaTurntableTrackVal') || 'Afternoon Boutique Hours'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>{t('edaTurntableArtist') || 'Artist:'}</span>
              <strong style={{ color: 'var(--text-main)' }}>{t('edaTurntableArtistVal') || 'SolveMyMedia Studio'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>{t('edaTurntableAlbum') || 'Album:'}</span>
              <strong style={{ color: 'var(--text-main)' }}>{t('edaTurntableAlbumVal') || 'Acoustic Sessions 2026'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>{t('edaTurntableGenre') || 'Genre:'}</span>
              <strong style={{ color: 'var(--text-main)' }}>{t('edaTurntableGenreVal') || 'Lo-Fi Jazz / Chillhop'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>{t('edaTurntableYear') || 'Year:'}</span>
              <strong style={{ color: 'var(--text-main)' }}>{t('edaTurntableYearVal') || '2026'}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * SECTION 2: Producer Workflow Pipeline
 */
export const EditAudioProducerPipelineSection: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t('edaPipelineStep1Title') || '01 / Import Audio',
      desc: t('edaPipelineStep1Desc') || 'Drag and drop any MP3, WAV, FLAC, M4A, or OGG file. Our browser scanner automatically reads existing tags.'
    },
    {
      num: '02',
      title: t('edaPipelineStep2Title') || '02 / Tag Customization',
      desc: t('edaPipelineStep2Desc') || 'Update track title, artist, album, year, genre, and track number. Auto-fill cleans up filename junk with one click.'
    },
    {
      num: '03',
      title: t('edaPipelineStep3Title') || '03 / Lossless Remux',
      desc: t('edaPipelineStep3Desc') || 'Export with standard ID3v2.3 or ID3v2.4 tags in under 1 second using lossless WebAssembly stream copy.'
    }
  ];

  return (
    <section className="seo-section producer-pipeline" style={{ maxWidth: 1000, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--brand-glow)', border: '1px solid var(--brand-primary)', borderRadius: 100, color: 'var(--brand-primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: 16 }}>
          <Sliders size={15} />
          <span>{t('edaPipelineBadge') || 'PRODUCER WORKFLOW'}</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 16, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {t('edaPipelineTitle') || 'Fast 3-Step Audio Metadata Pipeline'}
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 760, margin: '0 auto', lineHeight: 1.7 }}>
          {t('edaPipelineSubtitle') || 'Effortlessly organize your audio catalog in seconds without re-compressing your music.'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {steps.map((st, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 24, padding: 32, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: 'var(--brand-gradient)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>
              {st.num}
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                {st.title}
              </h3>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                {st.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * SECTION 3: Streaming & DJ Platform Compatibility Grid
 */
export const EditAudioPlatformCompatibilitySection: React.FC = () => {
  const { t } = useLanguage();

  const platforms = [
    {
      icon: <Music size={24} color="#f59e0b" />,
      title: t('edaPlatform1Title') || 'Rekordbox & Serato DJ',
      desc: t('edaPlatform1Desc') || 'BPM, track title, artist, and genre tags index instantly in club CDJs and DJ controllers.'
    },
    {
      icon: <Apple size={24} color="#ec4899" />,
      title: t('edaPlatform2Title') || 'Apple Music & iTunes',
      desc: t('edaPlatform2Desc') || 'Proper album grouping, artwork indexing, and composer tags for iPhone, iPad, and Mac.'
    },
    {
      icon: <Car size={24} color="#38bdf8" />,
      title: t('edaPlatform3Title') || 'CarPlay & Android Auto',
      desc: t('edaPlatform3Desc') || 'Crisp dashboard display of track title and artist without ugly filename extensions.'
    },
    {
      icon: <FolderSync size={24} color="#10b981" />,
      title: t('edaPlatform4Title') || 'Spotify Local Files',
      desc: t('edaPlatform4Desc') || 'Sync your local music library to Spotify with full artist and album categorization.'
    }
  ];

  return (
    <section className="seo-section platform-compatibility" style={{ maxWidth: 1100, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--brand-glow)', border: '1px solid var(--brand-primary)', borderRadius: 100, color: 'var(--brand-primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: 16 }}>
          <Sparkles size={15} />
          <span>{t('edaPlatformBadge') || 'STREAMING & DJ ECOSYSTEM'}</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 16, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {t('edaPlatformTitle') || 'Universal Player & Hardware Compatibility'}
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 760, margin: '0 auto', lineHeight: 1.7 }}>
          {t('edaPlatformSubtitle') || 'Tags written by SolveMyMedia are standardized to play and index flawlessly across all major software and hardware.'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
        {platforms.map((p, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {p.icon}
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              {p.title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * SECTION 4: Audio Container Tag Format Specifications
 */
export const EditAudioTagFormatSpecsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section tag-format-specs" style={{ maxWidth: 1000, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2, margin: 0 }}>
          {t('edaSpecsTitle') || 'Audio Container Tag Standard Matrix'}
        </h2>
      </div>

      <div style={{ overflowX: 'auto', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-app)' }}>
              <th style={{ padding: '16px 20px', color: 'var(--text-main)', fontWeight: 800 }}>
                {t('edaSpecsColFmt') || 'Audio Format'}
              </th>
              <th style={{ padding: '16px 20px', color: 'var(--brand-primary)', fontWeight: 800 }}>
                {t('edaSpecsColSpec') || 'Tag Specification'}
              </th>
              <th style={{ padding: '16px 20px', color: 'var(--brand-secondary)', fontWeight: 800 }}>
                {t('edaSpecsColFields') || 'Supported Metadata Fields'}
              </th>
              <th style={{ padding: '16px 20px', color: '#10b981', fontWeight: 800 }}>
                {t('edaSpecsColFidelity') || 'Encoding Fidelity'}
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.88rem' }}>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('edaSpecsFmt1') || 'MP3 (.mp3)'}
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--brand-primary)' }}>
                {t('edaSpecsSpec1') || 'ID3v2.3 / ID3v2.4 (UTF-8)'}
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                {t('edaSpecsFields1') || 'TIT2 (Title), TPE1 (Artist), TALB, TYER, TCON, TRCK'}
              </td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                {t('edaSpecsFid1') || 'Lossless Remux'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('edaSpecsFmt2') || 'FLAC (.flac)'}
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--brand-primary)' }}>
                {t('edaSpecsSpec2') || 'Ogg Vorbis Comments'}
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                {t('edaSpecsFields2') || 'TITLE, ARTIST, ALBUM, DATE, GENRE, TRACKNUMBER'}
              </td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                {t('edaSpecsFid2') || 'Bit-Exact Lossless'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('edaSpecsFmt3') || 'WAV (.wav)'}
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--brand-primary)' }}>
                {t('edaSpecsSpec3') || 'RIFF INFO & ID3 Chunk'}
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                {t('edaSpecsFields3') || 'INAM (Title), IART (Artist), IPRD, ICRD, IGNR'}
              </td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                {t('edaSpecsFid3') || 'Uncompressed PCM'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('edaSpecsFmt4') || 'M4A / AAC (.m4a)'}
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--brand-primary)' }}>
                {t('edaSpecsSpec4') || 'iTunes ilst Atoms'}
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                {t('edaSpecsFields4') || '©nam, ©ART, ©alb, ©day, ©gen'}
              </td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                {t('edaSpecsFid4') || 'Apple Ready'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
