import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, Music, Mic, UserX, Clock, Check, AlertCircle, FileAudio, Zap, Lock, Loader2, Sparkles, Tag, Eye, RotateCcw, Volume2, Radio, Disc } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { ResponsibleUseNotice } from '../components/ResponsibleUseNotice';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { useLanguage } from '../hooks/useLanguage';
import { scanAudioMetadata, type DetectedAudioMetadata } from '../utils/mediaMetadataScanner';
import {
  RemoveAudioSpectrumThreatSection,
  RemoveAudioPatchbayWorkflowSection,
  RemoveAudioRackmountCardsSection,
  RemoveAudioForensicDiffSection
} from '../components/content-sections/tools/RemoveAudioMetadataSections';

export const RemoveAudioMetadata: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  const { t } = useLanguage();

  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Detected Metadata State
  const [detectedMeta, setDetectedMeta] = useState<DetectedAudioMetadata | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Sanitization Options
  const [stripId3, setStripId3] = useState(true);
  const [stripAi, setStripAi] = useState(true);
  const [stripDaw, setStripDaw] = useState(true);
  const [stripArt, setStripArt] = useState(true);

  // Flip Card state
  const [isFlipped, setIsFlipped] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  useEffect(() => {
    if (!file) {
      setDetectedMeta(null);
      setIsScanning(false);
      setIsFlipped(false);
      return;
    }

    let isMounted = true;
    setIsScanning(true);

    const scan = async () => {
      try {
        const meta = await scanAudioMetadata(file);
        if (!isMounted) return;
        setDetectedMeta(meta);
      } catch (err) {
        console.warn('Audio metadata inspection notice:', err);
      } finally {
        if (isMounted) {
          setIsScanning(false);
        }
      }
    };

    scan();

    return () => {
      isMounted = false;
    };
  }, [file]);

  const handleProcess = async () => {
    if (!file) return;
    setErrorMsg(null);

    const ext = (file.name.split('.').pop() || 'mp3').toLowerCase();
    const cleanExt = ['mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg', 'opus'].includes(ext) ? ext : 'mp3';
    const outputName = `sanitized_${Date.now()}.${cleanExt}`;

    // Base FFmpeg args for lossless audio copy
    const args = ['-i', file.name];

    if (stripId3 || stripAi || stripDaw || stripArt) {
      args.push('-map_metadata', '-1');
    }

    // Pure stream copy: retains 100% audio quality with zero re-encoding
    args.push('-c:a', 'copy');
    args.push(outputName);

    try {
      const mime = file.type || `audio/${cleanExt === 'mp3' ? 'mpeg' : cleanExt}`;
      const url = await runCustomFFmpeg([file], args, outputName, mime);
      if (url) {
        setOutputUrl(url);
      } else {
        setErrorMsg(t('rmaError') || 'Failed to strip audio metadata. Please ensure the audio file is valid.');
      }
    } catch (e: any) {
      console.error('Audio metadata strip failed:', e);
      setErrorMsg(e?.message || (t('rmaError') || 'Failed to strip audio metadata.'));
    }
  };

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {!isFlipped ? (
        <>
          {/* Tool Header (Front Side) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6, borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ShieldAlert size={18} color="#ef4444" />
                <span>{t('rmaFileInspector') || 'Audio Metadata Scrubber'}</span>
              </h4>
            </div>
            {file && (
              <button
                type="button"
                onClick={() => setIsFlipped(true)}
                style={{
                  background: 'rgba(56,189,248,0.1)',
                  color: '#38bdf8',
                  border: '1px solid rgba(56,189,248,0.25)',
                  borderRadius: 8,
                  padding: '5px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
                title={t('rmaFlipDetailTitle') || 'Lihat lembar metadata audio detail di sisi belakang (bolak-balik)'}
              >
                <Eye size={13} />
                <span>{t('rmaFlipDetail') || 'Cek Detail (Balik) 🔄'}</span>
              </button>
            )}
          </div>

          {/* Quick Summary Strip (Front Side) */}
          {file && (
            <div 
              onClick={() => setIsFlipped(true)}
              style={{ 
                background: 'var(--bg-app)', 
                border: '1px solid var(--border-color)', 
                borderRadius: 8, 
                padding: '8px 12px', 
                fontSize: '0.78rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                cursor: 'pointer' 
              }}
              title={t('rmaFlipClickTitle') || 'Klik untuk membalik dan melihat lembar metadata audio lengkap'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  {t('rmaDetected') || 'Terdeteksi:'}
                </span>
                {detectedMeta?.rawTags?.['gps_coordinates'] && (
                  <span style={{ color: '#ef4444', fontWeight: 700 }}>
                    📍 {detectedMeta.rawTags['gps_coordinates']}
                  </span>
                )}
                {(detectedMeta?.creationTime || detectedMeta?.year) && (
                  <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                    🕒 {detectedMeta.creationTime || detectedMeta.year}
                  </span>
                )}
                {(detectedMeta?.hasC2pa || detectedMeta?.aiGenerated) && (
                  <span style={{ color: '#c084fc', fontWeight: 700 }}>
                    ✨ {detectedMeta.aiProvider || detectedMeta.c2paIssuer || 'AI (SynthID)'}
                  </span>
                )}
                {detectedMeta?.hasId3 && (
                  <span style={{ color: '#38bdf8', fontWeight: 600 }}>
                    🏷️ {detectedMeta.rawTags['id3_version'] || 'ID3 Tag'}
                  </span>
                )}
                {!detectedMeta?.hasC2pa && !detectedMeta?.hasId3 && !detectedMeta?.aiGenerated && !detectedMeta?.rawTags?.['gps_coordinates'] && (
                  <span style={{ color: '#22c55e', fontWeight: 600 }}>
                    🛡️ {t('rmaCleanContainer') || 'Wadah audio bersih dari tag pelacak'}
                  </span>
                )}
              </div>
              <span style={{ color: 'var(--brand-primary)', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
                {t('rmaDetailSheetBtn') || 'Detail Sheet ➔'}
              </span>
            </div>
          )}

          {/* Toggles in 2-Column Compact Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-main)', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={stripId3}
                onChange={(e) => setStripId3(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#e11d48', cursor: 'pointer', flexShrink: 0 }}
              />
              <Music size={14} color="#38bdf8" style={{ flexShrink: 0 }} />
              <span>{t('rmaOptId3') || 'Strip ID3 & Vorbis Tags'}</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-main)', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={stripAi}
                onChange={(e) => setStripAi(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#e11d48', cursor: 'pointer', flexShrink: 0 }}
              />
              <Sparkles size={14} color="#c084fc" style={{ flexShrink: 0 }} />
              <span>{t('rmaOptAi') || 'Remove C2PA & AI Watermarks'}</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-main)', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={stripDaw}
                onChange={(e) => setStripDaw(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#e11d48', cursor: 'pointer', flexShrink: 0 }}
              />
              <Mic size={14} color="#fbbf24" style={{ flexShrink: 0 }} />
              <span>{t('rmaOptDaw') || 'Clear DAW Signatures'}</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-main)', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={stripArt}
                onChange={(e) => setStripArt(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#e11d48', cursor: 'pointer', flexShrink: 0 }}
              />
              <Disc size={14} color="#a855f7" style={{ flexShrink: 0 }} />
              <span>{t('rmaOptArt') || 'Remove Artwork & Lyrics'}</span>
            </label>
          </div>
        </>
      ) : (
        /* Sisi Belakang: Lembar Detail Metadata Audio */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Header Sisi Belakang */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6, borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h4 style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Eye size={16} color="var(--brand-primary)" />
                <span>{t('rmaDetailTitle') || 'Audio Forensic Sheet (Sisi Belakang)'}</span>
              </h4>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                {t('rmaDetailSubtitle') || 'Deep container analysis & embedded atom audit'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              style={{
                background: 'rgba(34,197,94,0.1)',
                color: '#22c55e',
                border: '1px solid rgba(34,197,94,0.25)',
                borderRadius: 8,
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
              title={t('rmaFlipBackTitle') || 'Kembali ke pengaturan sanitasi audio'}
            >
              <span>{t('rmaFlipBack') || 'Kembali ke Pengaturan ➔'}</span>
            </button>
          </div>

          {/* File Metadata & Technical Headers (if detected) */}
          {(detectedMeta?.hasC2pa || detectedMeta?.aiGenerated || detectedMeta?.encoder) && (
            <div style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.25)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#c084fc', fontWeight: 800, fontSize: '0.8rem', marginBottom: 4 }}>
                <Sparkles size={14} />
                <span>{t('rmaAiDetected') || 'File Metadata & Technical Headers Detected'}</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {detectedMeta.aiDetails || detectedMeta.c2paIssuer || (detectedMeta.encoder ? `Encoder: ${detectedMeta.encoder}` : (t('rmaAiDetailsFallback') || 'Container contains technical tags and encoder properties.'))}
              </p>
            </div>
          )}

          {/* Quick Audio Technical Specs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 6, background: 'var(--bg-app)', padding: 8, borderRadius: 8, border: '1px solid var(--border-color)', fontSize: '0.72rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>{t('rmaDuration') || 'Duration'}: </span>
              <strong style={{ color: 'var(--text-main)' }}>{detectedMeta?.durationFormatted || '00:00'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>{t('rmaFormat') || 'Format'}: </span>
              <strong style={{ color: 'var(--text-main)' }}>{(file?.name.split('.').pop() || 'MP3').toUpperCase()}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>{t('rmaSize') || 'Size'}: </span>
              <strong style={{ color: 'var(--text-main)' }}>{file ? formatFileSize(file.size) : '0 B'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>🕒 {t('rmaTimeLabel') || 'Time & Date'}: </span>
              <strong style={{ color: 'var(--text-main)' }}>{detectedMeta?.creationTime || detectedMeta?.year || (t('rmvNotFound') || 'Not found')}</strong>
            </div>
          </div>

          {/* Raw Audio Tags Table */}
          <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-app)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.74rem', textAlign: 'left' }}>
              <tbody>
                {detectedMeta?.rawTags && Object.keys(detectedMeta.rawTags).length > 0 ? (
                  Object.entries(detectedMeta.rawTags).map(([k, v], idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '6px 8px', fontWeight: 700, color: 'var(--brand-primary)', fontFamily: 'monospace', width: '38%' }}>{k}</td>
                      <td style={{ padding: '6px 8px', color: 'var(--text-main)', wordBreak: 'break-word' }}>{v}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} style={{ padding: '12px 8px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      {t('rmaNoTagsFound') || 'No hidden metadata text tags found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8, color: '#ef4444', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 6 }}>
          <AlertCircle size={15} style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      <CenteredActionWorkspace
        accept="audio/*,.mp3,.wav,.ogg,.aac,.flac,.m4a,.wma,.opus"
        title={pseoData ? pseoData.h1 : (t('toolRemoveAudioMetadata') || 'Remove Audio Metadata')}
        description={pseoData ? pseoData.description : (t('removeAudioMetadataDesc') || 'Strip hidden ID3 tags, GPS locations, DAW project paths, and personal device signatures from MP3, WAV, and FLAC files. 100% private in-browser cleaner.')}
        toolId="remove-audio-metadata"
        file={file}
        onFileSelect={(f) => {
          setFile(f);
          setOutputUrl(null);
          setErrorMsg(null);
        }}
        outputUrl={outputUrl}
        onResetResult={() => setOutputUrl(null)}
        processing={processing}
        progress={progress}
        engine="tier3"
        onProcess={handleProcess}
        processActionText={t('rmaActionBtn') || 'Remove Audio Metadata'}
        sidebarContent={sidebarContent}
        targetFormat={file ? (file.name.split('.').pop() || 'mp3') : 'mp3'}
      />

      {/* Ethical Responsible Use Policy Banner */}
      <ResponsibleUseNotice />

      {!file && !pseoData && (
        <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '80px', marginTop: '60px', width: '100%', maxWidth: '100%', minWidth: 0, overflowX: 'hidden', boxSizing: 'border-box' }}>
          <RemoveAudioSpectrumThreatSection />
          <RemoveAudioPatchbayWorkflowSection />
          <RemoveAudioRackmountCardsSection />
          <RemoveAudioForensicDiffSection />
        </div>
      )}
    </>
  );
};
