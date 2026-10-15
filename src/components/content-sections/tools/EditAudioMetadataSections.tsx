// @ts-nocheck
import React, { useState } from 'react';
import { Tag, Sparkles, Music, Disc, Sliders, CheckCircle2, ChevronDown, Zap, Radio, Headphones, Layers, FileCheck, Play, Volume2 } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

/**
 * SECTION 1: Virtual Vinyl Turntable & CDJ Deck Showcase
 * (Interactive DJ Console & Metadata Display)
 */
export const EditAudioTurntableShowcaseSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section turntable-showcase" style={{ maxWidth: 1200, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ background: '#0e0b1a', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 28, padding: '36px 32px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
        {/* Glow Orb */}
        <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* Left: Spinning Vinyl Disc Visual */}
          <div style={{ flex: '1 1 360px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, #1a1528 0%, #090710 70%, #000 100%)', border: '6px solid #231c38', boxShadow: '0 12px 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Vinyl Grooves */}
              <div style={{ position: 'absolute', inset: 20, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
              <div style={{ position: 'absolute', inset: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />
              <div style={{ position: 'absolute', inset: 60, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
              <div style={{ position: 'absolute', inset: 80, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.07)' }} />

              {/* Center Vinyl Label */}
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #ec4899)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', padding: 6, boxShadow: '0 4px 15px rgba(0,0,0,0.4)' }}>
                <Disc size={22} />
                <span style={{ fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.04em', marginTop: 2 }}>ID3v2.4</span>
                <span style={{ fontSize: '0.55rem', opacity: 0.85 }}>33 ⅓ RPM</span>
              </div>
            </div>
          </div>

          {/* Right: Digital DJ Deck & CarPlay Display Mockup */}
          <div style={{ flex: '1 1 480px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 100, fontSize: '0.78rem', fontWeight: 800, color: '#c084fc', marginBottom: 12 }}>
              <Headphones size={14} />
              <span>STUDIO METADATA MASTERING</span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#f8fafc', margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
              Broadcast-Ready Tags for DJ Decks & Streaming
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              Properly tagged audio ensures accurate track titles, artist credits, album artwork, and release dates appear across Pioneer CDJs, Apple CarPlay, Spotify, and car stereos.
            </p>

            {/* Now Playing Live Card */}
            <div style={{ background: '#16102a', border: '1px solid rgba(168,85,247,0.25)', borderRadius: 16, padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: '0.72rem', color: '#c084fc', fontWeight: 800, textTransform: 'uppercase' }}>Now Playing Display (ID3 Live Preview)</span>
                <span style={{ fontSize: '0.7rem', color: '#4ade80', background: 'rgba(74,222,128,0.15)', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>Pioneer Rekordbox Ready</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.7rem' }}>Track Title</span>
                  <strong style={{ color: '#f8fafc' }}>Afternoon Boutique Hours</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.7rem' }}>Artist / Performer</span>
                  <strong style={{ color: '#f8fafc' }}>Google AI / Studio Artist</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.7rem' }}>Album & Year</span>
                  <strong style={{ color: '#f8fafc' }}>Ambient Sessions • 2026</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.7rem' }}>Genre & Format</span>
                  <strong style={{ color: '#f8fafc' }}>Electronic / Lo-Fi • 320k MP3</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * SECTION 2: Horizontal Zig-Zag Producer Pipeline
 */
export const EditAudioProducerPipelineSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Import Any Audio Container',
      desc: 'Supports MP3 ID3v2, WAV RIFF INFO chunks, FLAC Vorbis comments, and AAC/M4A atoms without uploading files to any server.'
    },
    {
      num: '02',
      title: 'Smart Auto-Fill & Customization',
      desc: 'Automatic filename cleanup suggests track title, artist, year, and genre. Easily edit track numbers and composer credits.'
    },
    {
      num: '03',
      title: 'Lossless Tag Injection (-c:a copy)',
      desc: 'Header metadata atoms are losslessly rewritten in milliseconds, preserving 100% of original acoustic waveforms with zero re-encoding.'
    }
  ];

  return (
    <section className="seo-section producer-pipeline" style={{ maxWidth: 1100, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, color: 'var(--text-main)', marginBottom: 10 }}>
          3-Step Studio Workflow
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Fast, browser-powered ID3 editing with instant stream copy.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {steps.map((st, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '28px 24px', position: 'relative' }}>
            <div style={{ display: 'inline-flex', padding: '6px 12px', background: 'rgba(168,85,247,0.12)', color: '#c084fc', borderRadius: 8, fontWeight: 900, fontSize: '0.85rem', marginBottom: 16 }}>
              STEP {st.num}
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 8 }}>
              {st.title}
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              {st.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * SECTION 3: DJ & Streaming Platform Verification Bento
 */
export const EditAudioPlatformCompatibilitySection: React.FC = () => {
  const platforms = [
    { name: 'Pioneer Rekordbox & Serato DJ', desc: 'Accurate BPM, key metadata, and track titles for seamless live DJ sets.', icon: Headphones, color: '#38bdf8' },
    { name: 'Apple Music & iTunes Match', desc: 'Standardized ID3v2.3 tags ensure perfect album artwork and artist grouping.', icon: Music, color: '#ec4899' },
    { name: 'Spotify for Artists Ready', desc: 'Formatted track title and ISRC copyright metadata for release compliance.', icon: Radio, color: '#22c55e' },
    { name: 'Apple CarPlay & Android Auto', desc: 'Large dashboard displays correctly parse track, artist, and album year.', icon: Zap, color: '#fbbf24' }
  ];

  return (
    <section className="seo-section platform-compatibility" style={{ maxWidth: 1200, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, color: 'var(--text-main)', marginBottom: 10 }}>
          Universal Player & DJ Software Compatibility
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Tags formatted for standard compliance across club gear, streaming apps, and vehicles.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
        {platforms.map((p, i) => {
          const IconComp = p.icon;
          return (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 18, padding: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${p.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color, marginBottom: 14 }}>
                <IconComp size={22} />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>
                {p.name}
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

/**
 * SECTION 4: Multi-Container Tag Specification Pills
 */
export const EditAudioTagFormatSpecsSection: React.FC = () => {
  return (
    <section className="seo-section tag-format-specs" style={{ maxWidth: 1000, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
          Supported Tag Formats & Standards
        </h3>
      </div>

      <div style={{ overflowX: 'auto', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-app)' }}>
              <th style={{ padding: '16px 20px', color: 'var(--text-main)', fontWeight: 800 }}>Container</th>
              <th style={{ padding: '16px 20px', color: '#c084fc', fontWeight: 800 }}>Tag Standard</th>
              <th style={{ padding: '16px 20px', color: '#38bdf8', fontWeight: 800 }}>Supported Fields</th>
              <th style={{ padding: '16px 20px', color: '#22c55e', fontWeight: 800 }}>Processing</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.85rem' }}>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>MP3 (.mp3)</td>
              <td style={{ padding: '14px 20px', color: '#c084fc' }}>ID3v2.3 / ID3v2.4 UTF-8</td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>Title, Artist, Album, Year, Genre, Track</td>
              <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>Lossless &lt;100ms</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>WAV (.wav)</td>
              <td style={{ padding: '14px 20px', color: '#c084fc' }}>RIFF INFO Chunks</td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>INAM, IART, IPRD, IGNR, ICMT</td>
              <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>24-bit Preserved</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>FLAC (.flac)</td>
              <td style={{ padding: '14px 20px', color: '#c084fc' }}>Vorbis Comments</td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>TITLE, ARTIST, ALBUM, DATE, GENRE</td>
              <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>Bit-Exact Copy</td>
            </tr>
            <tr>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>M4A / AAC (.m4a)</td>
              <td style={{ padding: '14px 20px', color: '#c084fc' }}>iTunes ilst Atoms</td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>©nam, ©ART, ©alb, ©day, ©gen</td>
              <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>Apple Ready</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

/**
 * SECTION 5: Single Interactive Music Studio FAQ Accordion
 */
export const EditAudioFaqSection: React.FC = () => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: t('edaFaq1Q') || 'Which ID3 tag version is written to MP3 files?', a: t('edaFaq1A') || 'We write industry-standard ID3v2.3 and ID3v2.4 tags with UTF-8 encoding, ensuring maximum compatibility across all modern players and older hardware.' },
    { q: t('edaFaq2Q') || 'Does editing tags re-encode my audio track?', a: t('edaFaq2A') || 'No. We copy the raw audio bitstream without re-encoding (-c:a copy), so your audio remains 100% lossless.' },
    { q: t('edaFaq3Q') || 'Can I edit metadata for WAV and FLAC files?', a: t('edaFaq3A') || 'Yes! We support WAV RIFF INFO chunks, FLAC Vorbis comments, and MP4/M4A audio tags in addition to standard MP3 ID3 tags.' },
    { q: t('edaFaq4Q') || 'Can I use this for DJ software like Rekordbox and Serato?', a: t('edaFaq4A') || 'Absolutely. Tags edited here will immediately reflect in Rekordbox, Serato DJ, Traktor, and iTunes libraries.' }
  ];

  return (
    <section className="seo-section audio-faq" style={{ maxWidth: 840, margin: '0 auto 60px auto', padding: '0 24px' }}>
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
    </section>
  );
};
