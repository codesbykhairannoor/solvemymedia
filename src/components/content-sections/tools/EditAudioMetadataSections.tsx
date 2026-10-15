// @ts-nocheck
import React, { useState } from 'react';
import { Tag, Sparkles, Music, Disc, Sliders, CheckCircle2, ChevronDown, Zap, Radio, Headphones, Layers, FileCheck } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

export const EditAudioMetadataHeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section hero" style={{ padding: '85px 24px', marginBottom: '60px', background: '#130e2b', borderRadius: 36, position: 'relative', overflow: 'hidden', border: '1px solid rgba(168,85,247,0.25)' }}>
      {/* Background Studio Glow */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(168,85,247,0.12) 0%, transparent 55%), radial-gradient(circle at 75% 75%, rgba(236,72,153,0.09) 0%, transparent 60%)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)', backgroundSize: '36px 36px', zIndex: 0 }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, color: 'white' }}>
        {/* Studio Pill */}
        <div style={{ display: 'inline-flex', padding: '9px 20px', background: 'rgba(168,85,247,0.15)', borderRadius: 100, color: '#c084fc', fontWeight: 800, fontSize: '0.85rem', marginBottom: 24, gap: 10, alignItems: 'center', border: '1px solid rgba(168,85,247,0.3)' }}>
          <Music size={18} /> {t('edaHeroPill') || 'Lossless Studio Tag Editor'}
        </div>

        <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
          {t('edaHeroTitle') || 'Organize, Edit, and Brand Your Audio Tracks with Ease'}
        </h2>

        <p style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)', color: '#cbd5e1', lineHeight: 1.8, maxWidth: 760, margin: '0 auto 36px auto' }}>
          {t('edaHeroDesc') || 'Correct misspelled titles, update artist names, add release years, and embed genre tags across your music library. Works client-side without re-encoding audio.'}
        </p>

        {/* Floating Tag Chips */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
          <span style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '6px 14px', borderRadius: 100, fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Disc size={14} color="#c084fc" /> ID3v2.3 & ID3v2.4
          </span>
          <span style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '6px 14px', borderRadius: 100, fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Headphones size={14} color="#38bdf8" /> Rekordbox & Serato Ready
          </span>
          <span style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '6px 14px', borderRadius: 100, fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Radio size={14} color="#4ade80" /> Spotify & Apple Podcasts Compliant
          </span>
          <span style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '6px 14px', borderRadius: 100, fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Zap size={14} color="#fbbf24" /> 0dB Lossless Stream Copy
          </span>
        </div>

        {/* Visual Equalizer Banner */}
        <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 18, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 640, margin: '0 auto', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {[24, 40, 16, 48, 32, 56, 28, 44, 20, 52, 36, 60, 24, 44, 18].map((h, idx) => (
              <div key={idx} style={{ width: 4, height: h, background: 'linear-gradient(to top, #a855f7, #ec4899)', borderRadius: 2 }} />
            ))}
          </div>
          <div style={{ textAlign: 'left', flex: 1, paddingLeft: 12 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f1f5f9' }}>Lossless Stream Tag Injection</div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Rewrites header frames in &lt;100ms without modifying sound waves.</div>
          </div>
          <span style={{ color: '#4ade80', fontSize: '0.78rem', fontWeight: 800, background: 'rgba(74,222,128,0.15)', padding: '4px 10px', borderRadius: 6 }}>Ready</span>
        </div>
      </div>
    </section>
  );
};

export const EditAudioMetadataHowToSection: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t('edaStep1Title') || 'Select Track or Voice Memo',
      desc: t('edaStep1Desc') || 'Import any MP3, WAV, FLAC, or M4A audio file from your device. The editor parses existing ID3 tags instantly.',
      icon: Disc
    },
    {
      num: '02',
      title: t('edaStep2Title') || 'Customize Track Metadata',
      desc: t('edaStep2Desc') || 'Fine-tune song title, artist, album, genre, release year, track number, and producer credits.',
      icon: Sliders
    },
    {
      num: '03',
      title: t('edaStep3Title') || 'Export Clean Tagged Audio',
      desc: t('edaStep3Desc') || 'Download your updated audio file with newly injected metadata, fully compatible with Spotify, Apple Music, and DJ software.',
      icon: FileCheck
    }
  ];

  return (
    <section className="seo-section how-to" style={{ padding: '70px 24px', maxWidth: 1200, margin: '0 auto 60px auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 12 }}>
          {t('edaHowToTitle') || 'How to Edit Audio Tags & Metadata Online'}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 640, margin: '0 auto' }}>
          {t('edaHowToSubtitle') || 'Streamlined workflow designed for producers, DJs, podcasters, and music lovers.'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {steps.map((st, i) => {
          const IconComp = st.icon;
          return (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '32px 28px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(168,85,247,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
                  <IconComp size={22} />
                </div>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--brand-primary)', opacity: 0.7 }}>
                  {st.num}
                </span>
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 10 }}>
                {st.title}
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                {st.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const EditAudioMetadataBentoSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section bento" style={{ padding: '70px 24px', maxWidth: 1200, margin: '0 auto 60px auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 12 }}>
          {t('edaBentoTitle') || 'Built for Musicians, Podcasters & Sound Engineers'}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 650, margin: '0 auto' }}>
          Industry-grade ID3 tagging features engineered for speed, accuracy, and format compliance.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {/* Card 1 */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(74,222,128,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80' }}>
            <Zap size={24} />
          </div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            {t('edaBentoCard1Title') || 'Zero Re-encoding Artifacts'}
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            {t('edaBentoCard1Desc') || 'Unlike traditional converters that recompress your music, our editor injects tags directly into the container header for 100% audio fidelity.'}
          </p>
        </div>

        {/* Card 2 */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(168,85,247,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
            <Sparkles size={24} />
          </div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            {t('edaBentoCard2Title') || 'Smart Auto-Fill Intelligence'}
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            {t('edaBentoCard2Desc') || 'Automatically detects song titles from clean filenames and suggests artist, year, and genre tags to save you time.'}
          </p>
        </div>

        {/* Card 3 */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(56,189,248,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
            <Headphones size={24} />
          </div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            {t('edaBentoCard3Title') || 'DJ & Car Stereo Compatibility'}
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            {t('edaBentoCard3Desc') || 'Formats ID3v2.3 and ID3v2.4 tags for flawless display in Pioneer CDJs, Rekordbox, Serato, Traktor, and vehicle infotainment screens.'}
          </p>
        </div>

        {/* Card 4 */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(251,191,36,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24' }}>
            <Radio size={24} />
          </div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            {t('edaBentoCard4Title') || 'Podcast & Audiobook Chaptering'}
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            {t('edaBentoCard4Desc') || 'Embed standardized episode numbers, release dates, and creator credits for Apple Podcasts and Spotify compliance.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export const EditAudioMetadataComparisonSection: React.FC = () => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: t('edaFaq1Q') || 'Which ID3 tag version is written to MP3 files?', a: t('edaFaq1A') || 'We write industry-standard ID3v2.3 and ID3v2.4 tags with UTF-8 encoding, ensuring maximum compatibility across all modern players and older hardware.' },
    { q: t('edaFaq2Q') || 'Does editing tags re-encode my audio track?', a: t('edaFaq2A') || 'No. We copy the raw audio bitstream without re-encoding (-c:a copy), so your audio remains 100% lossless.' },
    { q: t('edaFaq3Q') || 'Can I edit metadata for WAV and FLAC files?', a: t('edaFaq3A') || 'Yes! We support WAV RIFF INFO chunks, FLAC Vorbis comments, and MP4/M4A audio tags in addition to standard MP3 ID3 tags.' },
    { q: t('edaFaq4Q') || 'Can I use this for DJ software like Rekordbox and Serato?', a: t('edaFaq4A') || 'Absolutely. Tags edited here will immediately reflect in Rekordbox, Serato DJ, Traktor, and iTunes libraries.' }
  ];

  return (
    <section className="seo-section comparison-faqs" style={{ padding: '70px 24px', maxWidth: 1200, margin: '0 auto 60px auto' }}>
      {/* Format Checklist */}
      <div style={{ marginBottom: 60 }}>
        <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', textAlign: 'center', marginBottom: 28 }}>
          Audio Format & ID3 Standard Matrix
        </h3>

        <div style={{ overflowX: 'auto', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-app)' }}>
                <th style={{ padding: '16px 20px', color: 'var(--text-main)', fontWeight: 800 }}>Audio Container</th>
                <th style={{ padding: '16px 20px', color: 'var(--brand-primary)', fontWeight: 800 }}>Tag Standard</th>
                <th style={{ padding: '16px 20px', color: '#22c55e', fontWeight: 800 }}>Supported Fields</th>
                <th style={{ padding: '16px 20px', color: '#38bdf8', fontWeight: 800 }}>Speed & Fidelity</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.88rem' }}>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>MP3 (.mp3)</td>
                <td style={{ padding: '14px 20px', color: 'var(--brand-primary)' }}>ID3v2.3 / ID3v2.4 UTF-8</td>
                <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 600 }}>Title, Artist, Album, Year, Genre, Track</td>
                <td style={{ padding: '14px 20px', color: '#38bdf8' }}>Instant (&lt;150ms) • Lossless</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>WAV (.wav)</td>
                <td style={{ padding: '14px 20px', color: 'var(--brand-primary)' }}>RIFF INFO & ID3 Chunk</td>
                <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 600 }}>INAM, IART, IPRD, IGNR, ICMT</td>
                <td style={{ padding: '14px 20px', color: '#38bdf8' }}>24-bit 96kHz Preserved</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>FLAC (.flac)</td>
                <td style={{ padding: '14px 20px', color: 'var(--brand-primary)' }}>Vorbis Comment Blocks</td>
                <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 600 }}>TITLE, ARTIST, ALBUM, DATE, GENRE</td>
                <td style={{ padding: '14px 20px', color: '#38bdf8' }}>Bit-exact Copy</td>
              </tr>
              <tr>
                <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>AAC / M4A (.m4a)</td>
                <td style={{ padding: '14px 20px', color: 'var(--brand-primary)' }}>iTunes ilst Atoms</td>
                <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 600 }}>©nam, ©ART, ©alb, ©day, ©gen</td>
                <td style={{ padding: '14px 20px', color: '#38bdf8' }}>Apple Ecosystem Ready</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQs */}
      <div style={{ maxWidth: 840, margin: '0 auto' }}>
        <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-main)', textAlign: 'center', marginBottom: 24 }}>
          Frequently Asked Questions
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 14, overflow: 'hidden' }}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--text-main)', fontSize: '0.98rem', fontWeight: 700 }}
              >
                <span>{f.q}</span>
                <ChevronDown size={18} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, color: 'var(--text-muted)' }} />
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 22px 18px 22px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
