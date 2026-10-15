// @ts-nocheck
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Radio, 
  EyeOff, 
  Music, 
  Lock, 
  CheckCircle2, 
  Zap, 
  ServerOff, 
  Sparkles, 
  Volume2, 
  AudioWaveform, 
  FileAudio, 
  Sliders, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

/**
 * SECTION 1: Audio Frequency Spectrum & Threat Visualizer
 */
export const RemoveAudioSpectrumThreatSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'raw' | 'clean'>('raw');

  return (
    <section className="seo-section audio-threat-visualizer" style={{ maxWidth: 1200, margin: '40px auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(225,29,72,0.1)', border: '1px solid rgba(225,29,72,0.3)', borderRadius: 100, color: '#e11d48', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: 16 }}>
          <ShieldAlert size={15} />
          <span>{activeTab === 'raw' ? (t('rmaThreatRawBadge') || 'THREAT AUDIT: UNTOUCHED AUDIO') : (t('rmaThreatCleanBadge') || 'STATUS: 100% CLEANED & LOSSLESS')}</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 16, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {activeTab === 'raw' ? (t('rmaThreatRawTitle') || 'Hidden Metadata Atoms Inside Raw Audio') : (t('rmaThreatCleanTitle') || 'Pristine Audio Stream with Zero Acoustic Loss')}
        </h2>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 28, padding: '36px 32px', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
        {/* Tab Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-flex', background: 'var(--bg-app)', padding: 4, borderRadius: 12, border: '1px solid var(--border-color)' }}>
            <button
              type="button"
              onClick={() => setActiveTab('raw')}
              style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: activeTab === 'raw' ? '#e11d48' : 'transparent', color: activeTab === 'raw' ? 'white' : 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}
            >
              {t('rmaThreatTabRaw') || 'Inspect Raw Threat Atoms'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('clean')}
              style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: activeTab === 'clean' ? '#10b981' : 'transparent', color: activeTab === 'clean' ? 'white' : 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}
            >
              {t('rmaThreatTabClean') || 'Preview Cleaned Signal'}
            </button>
          </div>
        </div>

        {/* Audio Waveform Display */}
        <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 18, padding: '24px 20px', marginBottom: 24 }}>
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
                  : 'linear-gradient(to top, #64748b, #94a3b8)';

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

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'monospace', flexWrap: 'wrap', gap: 8 }}>
            <span>{t('rmaAudioStreamSpec') || '44.1 kHz • 24-bit PCM / 320 kbps Stream'}</span>
            <span style={{ color: activeTab === 'raw' ? '#e11d48' : '#10b981', fontWeight: 700 }}>
              {activeTab === 'raw' ? (t('rmaThreatIdentFlagged') || '⚠️ 5 Hidden Tracking Identifiers Embedded') : (t('rmaThreatIdentClean') || '✓ 100% Bit-Exact Audio Stream (0dB Loss)')}
            </span>
            <span>{t('rmaThreatDuration') || 'Duration: 03:42.15'}</span>
          </div>
        </div>

        {/* Breakdown Items */}
        {activeTab === 'raw' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 16, padding: 20 }}>
              <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.92rem', marginBottom: 6 }}>
                {t('rmaThreatSynthTitle') || 'Google SynthID & C2PA Provenance'}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {t('rmaThreatSynthDesc') || 'Trained Algorithmic Media Manifest embedded in ID3 GEOB'}
              </div>
            </div>
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 16, padding: 20 }}>
              <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.92rem', marginBottom: 6 }}>
                {t('rmaThreatDawTitle') || 'DAW Project Path & Software Serial'}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {t('rmaThreatDawDesc') || 'Ableton Live / Logic Pro X session file paths & machine user'}
              </div>
            </div>
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 16, padding: 20 }}>
              <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.92rem', marginBottom: 6 }}>
                {t('rmaThreatTimeTitle') || 'Original Mastering Timestamp'}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {t('rmaThreatTimeDesc') || 'Exact studio timecode and render hardware timestamps'}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 16, padding: 20 }}>
              <div style={{ color: '#10b981', fontWeight: 800, fontSize: '0.92rem', marginBottom: 6 }}>
                {t('rmaSpecAuditTitle') || 'LIVE FREQUENCY SPECTRUM AUDIT'}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {t('rmaSpecPreserved') || 'AUDIO QUALITY PRESERVED: 100% (0.00 dB loss)'}
              </div>
            </div>
            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 16, padding: 20 }}>
              <div style={{ color: '#10b981', fontWeight: 800, fontSize: '0.92rem', marginBottom: 6 }}>
                {t('rmaSpecDynRange') || 'Dynamic Range'}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {t('rmaSpecDynRangeVal') || '144 dB (24-bit PCM / 320kbps MP3)'}
              </div>
            </div>
            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 16, padding: 20 }}>
              <div style={{ color: '#10b981', fontWeight: 800, fontSize: '0.92rem', marginBottom: 6 }}>
                {t('rmaSpecEngine') || 'Processing Engine'}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {t('rmaSpecEngineVal') || 'WebAssembly Bitstream Passthrough'}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/**
 * SECTION 2: Vertical Studio Patchbay Workflow
 */
export const RemoveAudioPatchbayWorkflowSection: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: t('rmaWorkflowStep1') || 'Step 01',
      title: t('rmaWorkflowStep1Title') || 'Load Master Track',
      desc: t('rmaWorkflowStep1Desc') || 'Drop your MP3, WAV, FLAC, AAC, or OGG file directly into the studio workspace. No files are uploaded to any external server.'
    },
    {
      num: t('rmaWorkflowStep2') || 'Step 02',
      title: t('rmaWorkflowStep2Title') || 'Binary Header Scrubber',
      desc: t('rmaWorkflowStep2Desc') || 'Our WebAssembly engine parses binary container chunks, identifying ID3v2 frames, C2PA manifests, DAW signatures, and embedded artwork.'
    },
    {
      num: t('rmaWorkflowStep3') || 'Step 03',
      title: t('rmaWorkflowStep3Title') || 'Instant Lossless Export',
      desc: t('rmaWorkflowStep3Desc') || 'Audio frames are extracted and remuxed bit-for-bit into a sanitized container without re-encoding, preserving 100% audio fidelity.'
    }
  ];

  return (
    <section className="seo-section patchbay-workflow" style={{ maxWidth: 1000, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--brand-glow)', border: '1px solid var(--brand-primary)', borderRadius: 100, color: 'var(--brand-primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: 16 }}>
          <Layers size={15} />
          <span>{t('rmaWorkflowBadge') || '3-STEP STUDIO WORKFLOW'}</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 16, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {t('rmaWorkflowTitle') || 'How Audio Metadata Stripping Works'}
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 760, margin: '0 auto', lineHeight: 1.7 }}>
          {t('rmaWorkflowSubtitle') || 'Lossless audio frame passthrough engine executing directly inside your browser memory.'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {steps.map((st, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 24, padding: 32, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: 'var(--brand-gradient)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>
              0{i + 1}
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
 * SECTION 3: Rackmount Cards
 */
export const RemoveAudioRackmountCardsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section rackmount-cards" style={{ maxWidth: 1100, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--brand-glow)', border: '1px solid var(--brand-primary)', borderRadius: 100, color: 'var(--brand-primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: 16 }}>
          <Lock size={15} />
          <span>{t('rmaRackBadge') || 'SECURITY & INTEGRITY ARCHITECTURE'}</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 16, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {t('rmaRackTitle') || 'Enterprise-Grade Audio Sanitization'}
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 760, margin: '0 auto', lineHeight: 1.7 }}>
          {t('rmaRackSubtitle') || 'Built for music producers, podcasters, sound engineers, and privacy-focused creators.'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Rack 1 */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {t('rmaRackUnit1Title') || 'SynthID & C2PA AI Provenance Scrubber'}
                </span>
                <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', borderRadius: 4, fontWeight: 700 }}>
                  {t('rmaRackUnit1Tag') || 'ACTIVE SHIELD'}
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, maxWidth: 680, lineHeight: 1.6 }}>
                {t('rmaRackUnit1Desc') || 'Detects and strips Google SynthID watermarks, Suno AI tags, Udio prompts, and ElevenLabs voice identifiers embedded in ID3 GEOB frames.'}
              </p>
            </div>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#ef4444', background: 'rgba(239,68,68,0.08)', padding: '6px 12px', borderRadius: 8 }}>
            {t('rmaRackUnit1Status') || 'STATUS: ID3v2 GEOB / C2PA PURGED'}
          </div>
        </div>

        {/* Rack 2 */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(56,189,248,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
              <Lock size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {t('rmaRackUnit2Title') || 'DAW Project Path & Software Serial Scrubber'}
                </span>
                <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', borderRadius: 4, fontWeight: 700 }}>
                  {t('rmaRackUnit2Tag') || 'ACTIVE'}
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, maxWidth: 680, lineHeight: 1.6 }}>
                {t('rmaRackUnit2Desc') || 'Wipes internal DAW signatures left by Ableton Live, Logic Pro X, Pro Tools, and FL Studio, concealing your machine username, operating system, and project directories.'}
              </p>
            </div>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#38bdf8', background: 'rgba(56,189,248,0.08)', padding: '6px 12px', borderRadius: 8 }}>
            {t('rmaRackUnit2Status') || 'TENC / TSSE / PRIV: PURGED'}
          </div>
        </div>

        {/* Rack 3 */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
              <Zap size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {t('rmaRackUnit3Title') || 'Zero Quality Loss Bitstream Passthrough'}
                </span>
                <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(16,185,129,0.15)', color: '#10b981', borderRadius: 4, fontWeight: 700 }}>
                  {t('rmaRackUnit3Tag') || 'AUDIOPHILE'}
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, maxWidth: 680, lineHeight: 1.6 }}>
                {t('rmaRackUnit3Desc') || 'Copies audio frames without transcoding. 24-bit 96kHz studio masters or high-bitrate 320kbps MP3s retain 100% of their dynamic range and acoustic frequency response.'}
              </p>
            </div>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#10b981', background: 'rgba(16,185,129,0.08)', padding: '6px 12px', borderRadius: 8 }}>
            {t('rmaRackUnit3Status') || 'PASS: -c:a copy (0dB DELTA)'}
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
  const { t } = useLanguage();

  return (
    <section className="seo-section forensic-diff" style={{ maxWidth: 1000, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2, margin: 0 }}>
          {t('rmaDiffTitle') || 'Audio Forensic Inspection Matrix'}
        </h2>
      </div>

      <div style={{ overflowX: 'auto', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-app)' }}>
              <th style={{ padding: '16px 20px', color: 'var(--text-main)', fontWeight: 800 }}>
                {t('rmaDiffColLayer') || 'Audio Metadata Layer'}
              </th>
              <th style={{ padding: '16px 20px', color: '#ef4444', fontWeight: 800 }}>
                {t('rmaDiffColRaw') || 'Unsanitized Raw Audio'}
              </th>
              <th style={{ padding: '16px 20px', color: '#10b981', fontWeight: 800 }}>
                {t('rmaDiffColClean') || 'Cleaned Output (SolveMyMedia)'}
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.88rem' }}>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('rmaDiffRow1Layer') || 'C2PA / Google SynthID Manifest'}
              </td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>
                {t('rmaDiffRow1Raw') || 'Active (trainedAlgorithmicMedia)'}
              </td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                {t('rmaDiffRow1Clean') || '✓ 100% Stripped & Purged'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('rmaDiffRow2Layer') || 'DAW Signature & Username'}
              </td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>
                {t('rmaDiffRow2Raw') || 'Exposed (Ableton/Logic/FL path)'}
              </td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                {t('rmaDiffRow2Clean') || '✓ Completely Neutralized'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('rmaDiffRow3Layer') || 'ID3 Title, Artist, Album & Artwork'}
              </td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>
                {t('rmaDiffRow3Raw') || 'Exposed text & embedded JPEG/PNG'}
              </td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                {t('rmaDiffRow3Clean') || '✓ Cleared to Pure Audio'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('rmaDiffRow4Layer') || 'Recording Timestamps & Clocks'}
              </td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>
                {t('rmaDiffRow4Raw') || 'Subsecond render timestamp'}
              </td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                {t('rmaDiffRow4Clean') || '✓ Nullified'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('rmaDiffRow5Layer') || 'Audio Quality & Frequency'}
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                {t('rmaDiffRow5Raw') || 'Original sound frames'}
              </td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                {t('rmaDiffRow5Clean') || '✓ 0dB loss (Pure stream copy)'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
