// @ts-nocheck
import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Radio, EyeOff, Music, Lock, CheckCircle2, ChevronDown, Zap, ServerOff, Sparkles, Volume2, AudioWaveform, FileAudio, Sliders, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

/**
 * SECTION 1: Interactive Audio Frequency Spectrum & Threat Visualizer
 * (Replaces redundant hero with a live interactive tool demonstration)
 */
export const RemoveAudioSpectrumThreatSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'raw' | 'clean'>('raw');

  return (
    <section className="seo-section audio-threat-visualizer" style={{ maxWidth: 1200, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ background: '#050814', border: '1px solid rgba(225,29,72,0.25)', borderRadius: 28, padding: '36px 32px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
        {/* Glow Orb */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 350, height: 350, background: activeTab === 'raw' ? 'radial-gradient(circle, rgba(225,29,72,0.15) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', pointerEvents: 'none', transition: 'all 0.4s ease' }} />

        {/* Top Header & Tab Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28, position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: activeTab === 'raw' ? 'rgba(225,29,72,0.12)' : 'rgba(16,185,129,0.12)', border: `1px solid ${activeTab === 'raw' ? 'rgba(225,29,72,0.3)' : 'rgba(16,185,129,0.3)'}`, borderRadius: 100, fontSize: '0.78rem', fontWeight: 800, color: activeTab === 'raw' ? '#f43f5e' : '#34d399', marginBottom: 8 }}>
              {activeTab === 'raw' ? <ShieldAlert size={14} /> : <ShieldCheck size={14} />}
              <span>{activeTab === 'raw' ? 'THREAT AUDIT: UNTOUCHED AUDIO' : 'STATUS: 100% CLEANED & LOSSLESS'}</span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#f8fafc', margin: 0, letterSpacing: '-0.02em' }}>
              {activeTab === 'raw' ? 'Hidden Metadata Atoms Inside Raw Audio' : 'Pristine Audio Stream with Zero Acoustic Loss'}
            </h3>
          </div>

          {/* Toggle Button */}
          <div style={{ display: 'flex', background: '#0b1120', padding: 4, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              type="button"
              onClick={() => setActiveTab('raw')}
              style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: activeTab === 'raw' ? '#e11d48' : 'transparent', color: activeTab === 'raw' ? 'white' : '#94a3b8', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Raw Audio (With Tags)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('clean')}
              style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: activeTab === 'clean' ? '#10b981' : 'transparent', color: activeTab === 'clean' ? 'white' : '#94a3b8', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Sanitized Output
            </button>
          </div>
        </div>

        {/* Audio Waveform Display */}
        <div style={{ background: '#090d1e', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, padding: '24px 20px', marginBottom: 24 }}>
          {/* Simulated Oscilloscope Waveform */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 90, gap: 3, marginBottom: 16 }}>
            {[
              28, 42, 65, 84, 52, 38, 70, 92, 45, 30, 60, 88, 75, 40, 25, 55, 78, 96, 68, 48,
              32, 74, 90, 58, 36, 64, 82, 50, 28, 62, 85, 72, 44, 26, 54, 80, 94, 66, 42, 30,
              58, 86, 70, 48, 34, 68, 91, 52, 36, 60, 82, 45, 28, 56, 76, 92, 64, 40, 28, 50
            ].map((height, i) => {
              const isFlagged = activeTab === 'raw' && (i === 7 || i === 17 || i === 22 || i === 36 || i === 46);
              const barColor = activeTab === 'clean' 
                ? 'linear-gradient(to top, #059669, #34d399)' 
                : isFlagged 
                  ? 'linear-gradient(to top, #dc2626, #f87171)' 
                  : 'linear-gradient(to top, #334155, #64748b)';

              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', height: `${height}%`, background: barColor, borderRadius: 3, transition: 'all 0.3s ease' }} />
                  {isFlagged && (
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#ef4444' }} />
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>
            <span>44.1 kHz • 24-bit PCM / 320 kbps Stream</span>
            <span style={{ color: activeTab === 'raw' ? '#f43f5e' : '#34d399', fontWeight: 700 }}>
              {activeTab === 'raw' ? '⚠️ 5 Hidden Tracking Identifiers Embedded' : '✓ 100% Bit-Exact Audio Stream (0dB Loss)'}
            </span>
            <span>Duration: 03:42.15</span>
          </div>
        </div>

        {/* Feature Grid / Breakdown */}
        {activeTab === 'raw' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 14, padding: 16 }}>
              <div style={{ color: '#f87171', fontWeight: 800, fontSize: '0.85rem', marginBottom: 4 }}>Google SynthID & C2PA Provenance</div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Embedded inside ID3v2 <code>GEOB</code> frame with <code>trainedAlgorithmicMedia</code> manifest indicating AI origin.
              </div>
            </div>
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 14, padding: 16 }}>
              <div style={{ color: '#f87171', fontWeight: 800, fontSize: '0.85rem', marginBottom: 4 }}>DAW & Computer Username Leaks</div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Ableton Live, Logic Pro, and FL Studio embed absolute project paths (<code>C:/Users/Alex/...</code>) in encoder frames.
              </div>
            </div>
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 14, padding: 16 }}>
              <div style={{ color: '#f87171', fontWeight: 800, fontSize: '0.85rem', marginBottom: 4 }}>Bloated Artwork & Unwanted Tags</div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Hidden <code>APIC</code> frames containing uncompressed cover artwork increase file weight by up to 2MB.
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 14, padding: 16 }}>
              <div style={{ color: '#34d399', fontWeight: 800, fontSize: '0.85rem', marginBottom: 4 }}>Purged Container Headers</div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                ID3v1, ID3v2, C2PA manifests, and RIFF INFO chunks completely removed with <code>-map_metadata -1</code>.
              </div>
            </div>
            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 14, padding: 16 }}>
              <div style={{ color: '#34d399', fontWeight: 800, fontSize: '0.85rem', marginBottom: 4 }}>Zero Re-encoding Artifacts</div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Uses FFmpeg stream copy (<code>-c:a copy</code>). Not a single audio sample is decompressed or re-encoded.
              </div>
            </div>
            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 14, padding: 16 }}>
              <div style={{ color: '#34d399', fontWeight: 800, fontSize: '0.85rem', marginBottom: 4 }}>100% In-Browser Isolation</div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Execution happens entirely in device WebAssembly RAM. No audio bits are ever uploaded to cloud servers.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/**
 * SECTION 2: Vertical Audio Patchbay / Studio Jack-Cable Workflow
 * (Completely different from standard horizontal steps)
 */
export const RemoveAudioPatchbayWorkflowSection: React.FC = () => {
  const steps = [
    {
      jack: 'IN 01',
      title: 'Local WebAssembly Memory Sandbox',
      desc: 'Your MP3, WAV, or FLAC track is mounted into browser virtual RAM. Zero bytes are uploaded to remote servers, safeguarding unreleased music and sensitive voice memos.',
      tag: 'Zero Cloud Storage'
    },
    {
      jack: 'DEMUX 02',
      title: 'Deep Binary Atom & Tag Inspection',
      desc: 'Our parser maps container atoms, targeting ID3v2 GEOB C2PA manifests, SynthID watermarks, Ableton/Logic software footprints, and embedded APIC artwork.',
      tag: 'C2PA & SynthID Scanned'
    },
    {
      jack: 'OUT 03',
      title: 'Lossless Bitstream Pass (-c:a copy)',
      desc: 'Header atoms are rewritten to null while pure audio packets are copied bit-for-bit into the clean file, guaranteeing zero frequency alteration or distortion.',
      tag: '0dB Quality Loss'
    }
  ];

  return (
    <section className="seo-section patchbay-workflow" style={{ maxWidth: 900, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, color: 'var(--text-main)', marginBottom: 10 }}>
          Audio Sanitization Pipeline
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          How SolveMyMedia removes tracking identifiers without re-encoding audio frames.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
        {/* Vertical Connecting Line */}
        <div style={{ position: 'absolute', top: 30, bottom: 30, left: 32, width: 3, background: 'linear-gradient(to bottom, #e11d48, #10b981)', zIndex: 0 }} />

        {steps.map((st, i) => (
          <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
            {/* Jack Plug Visual */}
            <div style={{ width: 64, height: 64, borderRadius: 16, background: '#090d1e', border: '2px solid #e11d48', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 6px 20px rgba(0,0,0,0.4)' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f43f5e', border: '2px solid #000', marginBottom: 2 }} />
              <span style={{ fontSize: '0.62rem', fontWeight: 900, color: '#f43f5e', fontFamily: 'monospace' }}>{st.jack}</span>
            </div>

            {/* Step Card */}
            <div style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 18, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  {st.title}
                </h4>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: 'rgba(225,29,72,0.1)', color: '#f43f5e' }}>
                  {st.tag}
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
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
 * SECTION 3: Modular 19" Studio Rackmount Threat Units
 */
export const RemoveAudioRackmountCardsSection: React.FC = () => {
  return (
    <section className="seo-section rackmount-units" style={{ maxWidth: 1200, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, color: 'var(--text-main)', marginBottom: 10 }}>
          Modular Audio Privacy Modules
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Engineered for producers, podcasters, and privacy advocates.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Rack Unit 1 */}
        <div style={{ background: '#080d1e', border: '1.5px solid #1e293b', borderRadius: 16, padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(225,29,72,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f43f5e' }}>
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc' }}>AI Audio Provenance & SynthID Purger</span>
                <span style={{ fontSize: '0.68rem', padding: '2px 6px', background: 'rgba(225,29,72,0.2)', color: '#f87171', borderRadius: 4, fontWeight: 700 }}>ACTIVE</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8', margin: 0, maxWidth: 680, lineHeight: 1.5 }}>
                Targets and scrubs C2PA cryptographic manifests, Google SynthID audio watermarks, Suno AI generation prompt tags, and ElevenLabs synthetic voice fingerprints.
              </p>
            </div>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#f43f5e', background: 'rgba(225,29,72,0.08)', padding: '6px 12px', borderRadius: 8 }}>
            GEOB / C2PA / IPTC: STRIPPED
          </div>
        </div>

        {/* Rack Unit 2 */}
        <div style={{ background: '#080d1e', border: '1.5px solid #1e293b', borderRadius: 16, padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(56,189,248,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
              <Lock size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc' }}>DAW Project Path & Software Serial Scrubber</span>
                <span style={{ fontSize: '0.68rem', padding: '2px 6px', background: 'rgba(56,189,248,0.2)', color: '#38bdf8', borderRadius: 4, fontWeight: 700 }}>ACTIVE</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8', margin: 0, maxWidth: 680, lineHeight: 1.5 }}>
                Wipes internal DAW signatures left by Ableton Live, Logic Pro X, Pro Tools, and FL Studio, concealing your machine username, operating system, and project directories.
              </p>
            </div>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#38bdf8', background: 'rgba(56,189,248,0.08)', padding: '6px 12px', borderRadius: 8 }}>
            TENC / TSSE / PRIV: PURGED
          </div>
        </div>

        {/* Rack Unit 3 */}
        <div style={{ background: '#080d1e', border: '1.5px solid #1e293b', borderRadius: 16, padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
              <Zap size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc' }}>Zero Quality Loss Bitstream Passthrough</span>
                <span style={{ fontSize: '0.68rem', padding: '2px 6px', background: 'rgba(16,185,129,0.2)', color: '#34d399', borderRadius: 4, fontWeight: 700 }}>AUDIOPHILE</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8', margin: 0, maxWidth: 680, lineHeight: 1.5 }}>
                Copies audio frames without transcoding. 24-bit 96kHz studio masters or high-bitrate 320kbps MP3s retain 100% of their dynamic range and acoustic frequency response.
              </p>
            </div>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#34d399', background: 'rgba(16,185,129,0.08)', padding: '6px 12px', borderRadius: 8 }}>
            PASS: -c:a copy (0dB DELTA)
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * SECTION 4: Audio Forensic Comparison Matrix
 */
export const RemoveAudioForensicDiffSection: React.FC = () => {
  return (
    <section className="seo-section forensic-diff" style={{ maxWidth: 1000, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
          Forensic Inspection Matrix
        </h3>
      </div>

      <div style={{ overflowX: 'auto', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-app)' }}>
              <th style={{ padding: '16px 20px', color: 'var(--text-main)', fontWeight: 800 }}>Audio Frame / Header</th>
              <th style={{ padding: '16px 20px', color: '#ef4444', fontWeight: 800 }}>Raw File (Before)</th>
              <th style={{ padding: '16px 20px', color: '#10b981', fontWeight: 800 }}>Cleaned Audio (After)</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.85rem' }}>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>ID3v2 & Vorbis Tags (TIT2, TPE1)</td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>Exposes artist, title, album, date</td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>✓ 100% Cleared</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>Google SynthID / C2PA Manifests</td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>GEOB cryptographic AI watermark</td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>✓ Purged completely</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>DAW Project Signatures</td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>Ableton/Logic username & paths</td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>✓ Zero software leaks</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>Embedded Album Cover Artwork</td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>High-res image chunks (APIC)</td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>✓ Stripped for smaller size</td>
            </tr>
            <tr>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>Audio Quality & Frequency</td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>Original sound frames</td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>✓ 0dB loss (Pure stream copy)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
