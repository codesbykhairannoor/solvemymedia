// @ts-nocheck
import React, { useState } from 'react';
import { Tag, Sparkles, Film, CheckCircle2, Zap, Clock, Tv, Layers, ShieldCheck, FileText, Clapperboard, ChevronDown, Video, Camera, Award, HardDrive } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

/**
 * SECTION 1: Digital Director's Clapperboard & Archival Slate Visualizer
 * (Hollywood cinema production theme)
 */
export const EditVideoClapperboardSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section clapperboard-showcase" style={{ maxWidth: 1200, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ background: '#080c14', border: '1px solid rgba(234,179,8,0.3)', borderRadius: 28, padding: '36px 32px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
        {/* Golden Cinema Ambient Glow */}
        <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(234,179,8,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* Left: Authentic Hollywood Clapperboard Mockup */}
          <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 380, background: '#111827', borderRadius: 18, border: '2px solid #374151', overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.7)' }}>
              {/* Clapper Top Striped Bar */}
              <div style={{ height: 42, background: 'repeating-linear-gradient(45deg, #1f2937, #1f2937 20px, #facc15 20px, #facc15 40px)', borderBottom: '3px solid #000' }} />

              {/* Slate Body */}
              <div style={{ padding: '20px 22px', color: '#f3f4f6', fontFamily: 'monospace' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, borderBottom: '1px solid #374151', paddingBottom: 12, marginBottom: 12, textAlign: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.62rem', color: '#9ca3af', display: 'block' }}>SCENE</span>
                    <strong style={{ fontSize: '1.1rem', color: '#facc15' }}>04B</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.62rem', color: '#9ca3af', display: 'block' }}>TAKE</span>
                    <strong style={{ fontSize: '1.1rem', color: '#facc15' }}>02</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.62rem', color: '#9ca3af', display: 'block' }}>ROLL</span>
                    <strong style={{ fontSize: '1.1rem', color: '#facc15' }}>A01</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #374151', paddingBottom: 6 }}>
                    <span style={{ color: '#9ca3af' }}>TITLE:</span>
                    <strong style={{ color: '#67e8f9' }}>"Cinematic Journey 4K"</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #374151', paddingBottom: 6 }}>
                    <span style={{ color: '#9ca3af' }}>DIRECTOR:</span>
                    <strong style={{ color: '#f3f4f6' }}>Studio Creator / Filmmaker</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #374151', paddingBottom: 6 }}>
                    <span style={{ color: '#9ca3af' }}>YEAR / DATE:</span>
                    <strong style={{ color: '#facc15' }}>2026-10-15</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9ca3af' }}>CONTAINER ATOM:</span>
                    <strong style={{ color: '#4ade80' }}>MP4 ilst ©nam / QuickTime udta</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Studio & Festival Cataloging Description */}
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(234,179,8,0.15)', border: '1px solid rgba(234,179,8,0.3)', borderRadius: 100, fontSize: '0.78rem', fontWeight: 800, color: '#facc15', marginBottom: 14 }}>
              <Film size={14} />
              <span>DIRECTOR'S ARCHIVAL CATALOGING</span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#f8fafc', margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
              Standardize Video Titles, Credits, and Licensing
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              Tag your master videos with authoritative title headers, director credits, copyright notices, and release years. Streamline library indexing for Plex, Jellyfin, Apple TV, and film festival submissions without re-rendering in heavy NLE suites.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              <div style={{ background: '#0e1422', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px' }}>
                <div style={{ color: '#facc15', fontWeight: 800, fontSize: '0.82rem', marginBottom: 2 }}>Plex & Jellyfin Ready</div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Auto-scrapes embedded title & year cleanly.</div>
              </div>
              <div style={{ background: '#0e1422', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px' }}>
                <div style={{ color: '#4ade80', fontWeight: 800, fontSize: '0.82rem', marginBottom: 2 }}>0% Quality Re-compression</div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Injects metadata directly into container atoms.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * SECTION 2: Continuous 35mm Filmstrip Stepper
 * (Styled as an actual 35mm filmstrip with sprockets)
 */
export const EditVideoFilmstripStepperSection: React.FC = () => {
  const frames = [
    {
      frame: 'FRAME 01',
      title: 'Import Master Footage',
      desc: 'Select any MP4, MOV, MKV, or WebM video file. The container header is parsed directly in browser RAM in milliseconds.'
    },
    {
      frame: 'FRAME 02',
      title: 'Define Director & Title Tags',
      desc: 'Smart auto-fill decrypts clean titles from raw filenames. Customize song/video title, director credits, and release year.'
    },
    {
      frame: 'FRAME 03',
      title: 'Lossless Sub-Second Export',
      desc: 'FFmpeg WebAssembly writes new header atoms with stream copy (-c copy). Download your tagged master immediately.'
    }
  ];

  return (
    <section className="seo-section filmstrip-stepper" style={{ maxWidth: 1100, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, color: 'var(--text-main)', marginBottom: 10 }}>
          35mm Filmstrip Tagging Workflow
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Streamlined video cataloging without waiting hours for heavy video editor renders.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {frames.map((fr, i) => (
          <div key={i} style={{ background: '#0b1120', border: '1.5px solid #1e293b', borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
            {/* Top Sprocket Perforations */}
            <div style={{ height: 18, background: '#070b14', display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderBottom: '1px solid #1e293b' }}>
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} style={{ width: 10, height: 8, background: '#1e293b', borderRadius: 2 }} />
              ))}
            </div>

            {/* Frame Body */}
            <div style={{ padding: '22px 24px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#facc15', fontFamily: 'monospace', display: 'block', marginBottom: 8 }}>
                {fr.frame}
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', marginBottom: 8 }}>
                {fr.title}
              </h4>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                {fr.desc}
              </p>
            </div>

            {/* Bottom Sprocket Perforations */}
            <div style={{ height: 18, background: '#070b14', display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTop: '1px solid #1e293b' }}>
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} style={{ width: 10, height: 8, background: '#1e293b', borderRadius: 2 }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * SECTION 3: Film Archival & Media Server Compatibility Matrix
 */
export const EditVideoMediaServerCompatibilitySection: React.FC = () => {
  const platforms = [
    { title: 'Plex & Jellyfin Media Servers', desc: 'Auto-scrapes embedded title, series name, and release year without filename parsing errors.', icon: HardDrive, color: '#facc15' },
    { title: 'Film Festival & Broadcast Standards', desc: 'Embeds director credits, production house, and copyright compliance for commercial review.', icon: Award, color: '#67e8f9' },
    { title: 'YouTube & Social Media Attribution', desc: 'Ensures original copyright and creator licensing tags persist through distribution channels.', icon: Video, color: '#f43f5e' },
    { title: 'Smart TVs & DLNA Home Streaming', desc: 'Enables Apple TV, Samsung Tizen, and LG webOS to display full video title and cover details.', icon: Tv, color: '#4ade80' }
  ];

  return (
    <section className="seo-section media-server-compatibility" style={{ maxWidth: 1200, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, color: 'var(--text-main)', marginBottom: 10 }}>
          Media Server & Archival Standards
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Format metadata for automatic cataloging on home media servers and broadcasting systems.
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
                {p.title}
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
 * SECTION 4: Film Container Tag Format Specifications
 */
export const EditVideoFormatSpecsSection: React.FC = () => {
  return (
    <section className="seo-section format-specs" style={{ maxWidth: 1000, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
          Video Container Tag Standard Matrix
        </h3>
      </div>

      <div style={{ overflowX: 'auto', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-app)' }}>
              <th style={{ padding: '16px 20px', color: 'var(--text-main)', fontWeight: 800 }}>Container</th>
              <th style={{ padding: '16px 20px', color: '#facc15', fontWeight: 800 }}>Tag Specification</th>
              <th style={{ padding: '16px 20px', color: '#38bdf8', fontWeight: 800 }}>Supported Fields</th>
              <th style={{ padding: '16px 20px', color: '#22c55e', fontWeight: 800 }}>Fidelity</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.85rem' }}>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>MP4 (.mp4)</td>
              <td style={{ padding: '14px 20px', color: '#facc15' }}>ISO BMFF ilst Atoms</td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>©nam (Title), ©ART (Artist), ©day, ©gen</td>
              <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>Stream Copy</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>QuickTime (.mov)</td>
              <td style={{ padding: '14px 20px', color: '#facc15' }}>QuickTime udta Atoms</td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>titl, auth, yrrc, gnre, dscp, cprt</td>
              <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>ProRes Preserved</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>Matroska (.mkv)</td>
              <td style={{ padding: '14px 20px', color: '#facc15' }}>EBML Info & Tags</td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>TITLE, ARTIST, DATE_RELEASED, COMMENT</td>
              <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>Bit-Exact Remux</td>
            </tr>
            <tr>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>WebM (.webm)</td>
              <td style={{ padding: '14px 20px', color: '#facc15' }}>EBML Segment Info</td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>Title, MuxingApp, WritingApp</td>
              <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>VP9 / AV1 Untouched</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

/**
 * SECTION 5: Single Interactive Cinema Metadata FAQ Accordion
 */
export const EditVideoFaqSection: React.FC = () => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: t('edtFaq1Q') || 'Will editing video metadata re-encode or compress my footage?', a: t('edtFaq1A') || 'Never. SolveMyMedia performs a direct stream demux copy (-c copy). It injects metadata tags directly into the container header in under one second without re-rendering video frames.' },
    { q: t('edtFaq2Q') || 'Which media players display these video tags?', a: t('edtFaq2A') || 'Tags edited here are fully recognized by Apple TV, QuickTime, VLC Player, Windows Media Player, Plex, Jellyfin, and Kodi.' },
    { q: t('edtFaq3Q') || 'Can I change creation date and timestamps?', a: t('edtFaq3A') || 'Yes! You can set custom release dates and timestamps, standardizing your catalog chronologically.' },
    { q: t('edtFaq4Q') || 'Are my video files uploaded to your servers?', a: t('edtFaq4A') || 'No. All processing happens 100% locally inside your browser via WebAssembly. Your video files never leave your computer.' }
  ];

  return (
    <section className="seo-section video-faq" style={{ maxWidth: 840, margin: '0 auto 60px auto', padding: '0 24px' }}>
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
