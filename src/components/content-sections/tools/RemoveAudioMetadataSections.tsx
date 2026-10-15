// @ts-nocheck
import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Radio, EyeOff, Music, Lock, CheckCircle2, ChevronDown, Zap, ServerOff, Sparkles, Volume2, AudioWaveform as Waveform, FileAudio } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

export const RemoveAudioMetadataHeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section hero" style={{ padding: '85px 24px', marginBottom: '60px', background: '#070d1e', borderRadius: 36, position: 'relative', overflow: 'hidden', border: '1px solid rgba(56,189,248,0.2)' }}>
      {/* Background Soundwave Grid */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(56,189,248,0.07) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.06) 0%, transparent 60%)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px', zIndex: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 52, alignItems: 'center', position: 'relative', zIndex: 1, color: 'white' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'inline-flex', padding: '9px 18px', background: 'rgba(56,189,248,0.12)', borderRadius: 100, color: '#38bdf8', fontWeight: 800, fontSize: '0.85rem', marginBottom: 22, gap: 10, alignItems: 'center', border: '1px solid rgba(56,189,248,0.25)' }}>
            <ShieldCheck size={18} /> {t('rmaHeroPill') || '100% Client-Side Audio Privacy'}
          </div>
          <h2 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.6rem)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.14 }}>
            {t('rmaHeroTitle') || 'Wipe ID3 Tags, AI Watermarks, and DAW Signatures from Any Audio'}
          </h2>
          <p style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)', color: '#94a3b8', lineHeight: 1.8, marginBottom: 30 }}>
            {t('rmaHeroDesc') || 'Audio files often store your computer username, DAW project path, SynthID provenance, and embedded artist data. SolveMyMedia cleans all hidden tags directly in browser memory before you distribute or share.'}
          </p>

          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontSize: '0.9rem', fontWeight: 700 }}>
              <ServerOff size={18} /> 0 Cloud Uploads
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4ade80', fontSize: '0.9rem', fontWeight: 700 }}>
              <Zap size={18} /> Lossless Audio Copy (-c:a copy)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#c084fc', fontSize: '0.9rem', fontWeight: 700 }}>
              <Sparkles size={18} /> SynthID & AI Scrubber
            </div>
          </div>
        </div>

        {/* Acoustic Waveform & Tag Sanitizer Card */}
        <div style={{ flex: '1 1 480px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 480, background: '#0c152e', borderRadius: 24, border: '1px solid rgba(56,189,248,0.25)', boxShadow: '0 25px 65px rgba(0,0,0,0.6)', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ background: '#111e40', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'monospace', marginLeft: 8 }}>audio_sanitizer_stream.log</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#38bdf8', background: 'rgba(56,189,248,0.15)', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>320 kbps Stream</span>
            </div>

            {/* Simulated Audio Spectrum & Strip Flow */}
            <div style={{ padding: '22px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <FileAudio size={24} color="#38bdf8" />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#f1f5f9' }}>track_master_session.mp3</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>44.1 kHz • Stereo PCM • 4.2 MB</div>
                  </div>
                </div>
                <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 700, background: 'rgba(239,68,68,0.15)', padding: '3px 8px', borderRadius: 6 }}>3 Leaks Detected</span>
              </div>

              {/* Detected Tags Warning */}
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
                <div style={{ color: '#f87171', fontSize: '0.78rem', fontWeight: 700, marginBottom: 4 }}>⚠️ Hidden Forensic Signatures:</div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.6, fontFamily: 'monospace' }}>
                  • [GEOB] Google C2PA SynthID Provenance Manifest<br />
                  • [TENC] Logic Pro X 10.7 / Apple macOS (User: AlexStudio)<br />
                  • [APIC] 1400x1400 Embedded PNG Artwork (840 KB)
                </div>
              </div>

              {/* Action Simulation */}
              <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <CheckCircle2 size={20} color="#22c55e" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ color: '#4ade80', fontSize: '0.82rem', fontWeight: 800 }}>Sanitized Output: 0dB Quality Loss</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>All tracking atoms stripped. Audio frames copied byte-for-byte.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const RemoveAudioMetadataHowToSection: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t('rmaStep1Title') || 'Upload Audio File',
      desc: t('rmaStep1Desc') || 'Drop your MP3, WAV, FLAC, AAC, or OGG file directly into the browser. No files are ever sent to external cloud servers.',
      color: '#38bdf8'
    },
    {
      num: '02',
      title: t('rmaStep2Title') || 'Deep Audio Tag Audit',
      desc: t('rmaStep2Desc') || 'Our binary scanner audits ID3v2, C2PA manifests, SynthID watermarks, and RIFF INFO chunks in real-time.',
      color: '#a855f7'
    },
    {
      num: '03',
      title: t('rmaStep3Title') || 'Lossless Stream Strip',
      desc: t('rmaStep3Desc') || 'FFmpeg executes in WebAssembly to strip metadata losslessly with -c:a copy, retaining 100% original acoustic bit depth and frequency.',
      color: '#22c55e'
    }
  ];

  return (
    <section className="seo-section how-to" style={{ padding: '70px 24px', maxWidth: 1200, margin: '0 auto 60px auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 12 }}>
          {t('rmaHowToTitle') || 'How to Remove Audio Metadata in 3 Simple Steps'}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 640, margin: '0 auto' }}>
          {t('rmaHowToSubtitle') || 'Pure browser-based privacy scrubber. Zero latency, no software installation, and complete confidentiality.'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {steps.map((st, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: '3.5rem', fontWeight: 900, color: st.color, opacity: 0.15, position: 'absolute', top: 12, right: 18, lineHeight: 1 }}>
              {st.num}
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${st.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: st.color, fontWeight: 900, marginBottom: 18, border: `1px solid ${st.color}33` }}>
              {st.num}
            </div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 10 }}>
              {st.title}
            </h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              {st.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const RemoveAudioMetadataBentoSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section bento" style={{ padding: '70px 24px', maxWidth: 1200, margin: '0 auto 60px auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 12 }}>
          {t('rmaBentoTitle') || 'Engineered for Acoustic Purity & Privacy'}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 650, margin: '0 auto' }}>
          Everything you need to scrub metadata without affecting sonic dynamics or audiophile fidelity.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {/* Card 1 */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(56,189,248,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
            <Zap size={24} />
          </div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            {t('rmaBentoCard1Title') || 'Bit-for-Bit Lossless Copy'}
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            {t('rmaBentoCard1Desc') || 'No re-encoding or audio compression. Your audio spectrum, bit rate (320kbps or 24-bit PCM), and dynamics stay completely untouched.'}
          </p>
        </div>

        {/* Card 2 */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(192,132,252,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
            <Sparkles size={24} />
          </div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            {t('rmaBentoCard2Title') || 'AI Audio & SynthID Scrubber'}
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            {t('rmaBentoCard2Desc') || 'Removes C2PA manifests, Google SynthID metadata, Suno AI tags, Udio prompts, and ElevenLabs voice identifiers.'}
          </p>
        </div>

        {/* Card 3 */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
            <Lock size={24} />
          </div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            {t('rmaBentoCard3Title') || 'DAW Privacy Protection'}
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            {t('rmaBentoCard3Desc') || 'Eliminates Ableton Live, Logic Pro, Pro Tools, and FL Studio project paths, software serials, and machine usernames.'}
          </p>
        </div>

        {/* Card 4 */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>
            <ShieldCheck size={24} />
          </div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            {t('rmaBentoCard4Title') || 'Store & Streaming Compliant'}
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            {t('rmaBentoCard4Desc') || 'Prepare pristine audio files ready for commercial release, podcast distribution, or anonymous online uploads.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export const RemoveAudioMetadataComparisonSection: React.FC = () => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: t('rmaFaq1Q') || 'Does removing audio metadata change the sound quality?', a: t('rmaFaq1A') || 'Not at all. We use lossless stream copy (-c:a copy) which only strips the container tags and header chunks without touching a single audio frame.' },
    { q: t('rmaFaq2Q') || 'Can it detect and remove Google SynthID and AI music tags?', a: t('rmaFaq2A') || 'Yes. It inspects ID3v2 GEOB frames and C2PA manifests to remove Google SynthID, Suno AI, Udio, and ElevenLabs provenance signatures.' },
    { q: t('rmaFaq3Q') || 'Which audio formats are supported?', a: t('rmaFaq3A') || 'We support all common audio containers including MP3, WAV, FLAC, AAC, M4A, OGG, and OPUS.' },
    { q: t('rmaFaq4Q') || 'Are my private audio recordings uploaded to any server?', a: t('rmaFaq4A') || 'Never. All inspection and stripping processes run completely inside your device\'s browser using WebAssembly. Your files never leave your computer.' }
  ];

  return (
    <section className="seo-section comparison-faqs" style={{ padding: '70px 24px', maxWidth: 1200, margin: '0 auto 60px auto' }}>
      {/* Comparison Table */}
      <div style={{ marginBottom: 60 }}>
        <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', textAlign: 'center', marginBottom: 28 }}>
          Audio Sanitization Matrix
        </h3>

        <div style={{ overflowX: 'auto', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-app)' }}>
                <th style={{ padding: '16px 20px', color: 'var(--text-main)', fontWeight: 800 }}>Metadata Feature</th>
                <th style={{ padding: '16px 20px', color: '#ef4444', fontWeight: 800 }}>Untouched Audio File</th>
                <th style={{ padding: '16px 20px', color: '#22c55e', fontWeight: 800 }}>SolveMyMedia Sanitized Audio</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.88rem' }}>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>ID3v2 & Vorbis Tags</td>
                <td style={{ padding: '14px 20px', color: '#ef4444' }}>Exposes artist, title, album, date</td>
                <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>✓ 100% Stripped & Cleared</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>C2PA & SynthID Manifests</td>
                <td style={{ padding: '14px 20px', color: '#ef4444' }}>Embedded AI provenance metadata</td>
                <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>✓ Purged from GEOB frames</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>DAW / Software Footprints</td>
                <td style={{ padding: '14px 20px', color: '#ef4444' }}>Ableton / Logic project paths & usernames</td>
                <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>✓ Zero encoder or DAW leaks</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>Embedded Artwork & Lyrics</td>
                <td style={{ padding: '14px 20px', color: '#ef4444' }}>High-res cover art & synchronized text</td>
                <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>✓ APIC & USLT frames removed</td>
              </tr>
              <tr>
                <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>Audio Quality & Frequency</td>
                <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>Original sound frames</td>
                <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>✓ 0dB loss (Pure -c:a copy)</td>
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
