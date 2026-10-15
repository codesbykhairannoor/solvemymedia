import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, MapPin, Smartphone, UserX, Clock, Check, AlertCircle, FileVideo, Zap, Lock, Loader2, Sparkles, Tag, Eye, RotateCcw } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { useLanguage } from '../hooks/useLanguage';
import { scanFileMetadata, type DetectedVideoMetadata } from '../utils/mediaMetadataScanner';
import {
  RemoveVideoRadarHudSection,
  RemoveVideoThreatVectorsSection,
  RemoveVideoPerformanceMetricsSection,
  RemoveVideoComparisonTableSection,
  RemoveVideoFaqSection
} from '../components/content-sections/tools/RemoveVideoMetadataSections';

export const RemoveVideoMetadata: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  const { t } = useLanguage();

  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Detected Metadata State
  const [detectedMeta, setDetectedMeta] = useState<DetectedVideoMetadata | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Sanitization Options
  const [stripGps, setStripGps] = useState(true);
  const [stripDevice, setStripDevice] = useState(true);
  const [stripAuthor, setStripAuthor] = useState(true);
  const [stripChapters, setStripChapters] = useState(true);

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
      return;
    }

    let isMounted = true;
    setIsScanning(true);

    const scan = async () => {
      try {
        const meta = await scanFileMetadata(file);
        if (!isMounted) return;
        setDetectedMeta(meta);
      } catch (err) {
        console.warn('Video metadata inspection notice:', err);
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

    const ext = (file.name.split('.').pop() || 'mp4').toLowerCase();
    const cleanExt = ['mp4', 'mov', 'mkv', 'webm', 'm4v'].includes(ext) ? ext : 'mp4';
    const outputName = `sanitized_${Date.now()}.${cleanExt}`;

    // Base FFmpeg args for stream copy
    const args = ['-i', file.name];

    // Build args based on user options
    if (stripAuthor || stripGps || stripDevice) {
      args.push('-map_metadata', '-1');
    }
    if (stripChapters) {
      args.push('-map_chapters', '-1');
    }

    // Stream copy to preserve 100% video/audio quality without re-encoding
    args.push('-c', 'copy');
    args.push(outputName);

    try {
      const mime = file.type || `video/${cleanExt}`;
      const url = await runCustomFFmpeg([file], args, outputName, mime);
      if (url) {
        setOutputUrl(url);
      } else {
        setErrorMsg(t('rmvError') || 'Failed to strip metadata. Please ensure the file is a valid video format.');
      }
    } catch (e: any) {
      console.error('Metadata strip failed:', e);
      setErrorMsg(e?.message || (t('rmvError') || 'Failed to strip metadata.'));
    }
  };

  const [isFlipped, setIsFlipped] = useState(false);

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {!isFlipped ? (
        <>
          {/* Tool Header (Front Side) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6, borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ShieldAlert size={18} color="#ef4444" />
                <span>{t('rmvFileInspector') || 'Video Metadata Scrubber'}</span>
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                {t('rmvSubtitle') || 'Pilih tag pelacak yang ingin dihapus.'}
              </p>
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
                title="Lihat lembar metadata detail di sisi belakang (bolak-balik)"
              >
                <Eye size={13} />
                <span>Cek Detail (Balik) 🔄</span>
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
              title="Klik untuk membalik dan melihat lembar metadata lengkap"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Terdeteksi:
                </span>
                {(detectedMeta?.creationTime || detectedMeta?.year) && (
                  <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                    🕒 {detectedMeta.creationTime || detectedMeta.year}
                  </span>
                )}
                {(detectedMeta?.hasC2pa || detectedMeta?.aiGenerated) && (
                  <span style={{ color: '#c084fc', fontWeight: 700 }}>
                    ✨ {detectedMeta.c2paIssuer || 'AI (C2PA)'}
                  </span>
                )}
                {detectedMeta?.encoder && (
                  <span style={{ color: 'var(--text-muted)' }}>
                    🎬 {detectedMeta.encoder}
                  </span>
                )}
                {!detectedMeta?.hasC2pa && !detectedMeta?.creationTime && !detectedMeta?.year && !detectedMeta?.encoder && (
                  <span style={{ color: '#22c55e', fontWeight: 600 }}>
                    🛡️ Wadah bersih dari tag pelacak
                  </span>
                )}
              </div>
              <span style={{ color: 'var(--brand-primary)', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
                Detail Sheet ➔
              </span>
            </div>
          )}

          {/* Toggles in 2-Column Compact Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-main)', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={stripGps}
                onChange={(e) => setStripGps(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#e11d48', cursor: 'pointer', flexShrink: 0 }}
              />
              <MapPin size={14} color="#ef4444" style={{ flexShrink: 0 }} />
              <span>{t('rmvOptGps') || 'Strip GPS Coordinates'}</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-main)', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={stripDevice}
                onChange={(e) => setStripDevice(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#e11d48', cursor: 'pointer', flexShrink: 0 }}
              />
              <Smartphone size={14} color="#38bdf8" style={{ flexShrink: 0 }} />
              <span>{t('rmvOptDevice') || 'Remove Camera Info'}</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-main)', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={stripAuthor}
                onChange={(e) => setStripAuthor(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#e11d48', cursor: 'pointer', flexShrink: 0 }}
              />
              <UserX size={14} color="#fbbf24" style={{ flexShrink: 0 }} />
              <span>{t('rmvOptAuthor') || 'Clear Creator Tags'}</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-main)', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={stripChapters}
                onChange={(e) => setStripChapters(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#e11d48', cursor: 'pointer', flexShrink: 0 }}
              />
              <Clock size={14} color="#a855f7" style={{ flexShrink: 0 }} />
              <span>{t('rmvOptChapters') || 'Remove Timestamps'}</span>
            </label>
          </div>
        </>
      ) : (
        /* Sisi Belakang: Lembar Detail Metadata */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Header Sisi Belakang */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6, borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h4 style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Eye size={16} color="var(--brand-primary)" />
                <span>Lembar Detail Metadata (Sisi Belakang)</span>
              </h4>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Forensik lengkap isi container & atom video
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <RotateCcw size={12} />
              <span>Balik ke Pembersih</span>
            </button>
          </div>

          {/* Table / List Detail Metadata */}
          <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 10, display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.78rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 4, borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-muted)' }}>🕒 Waktu & Jam:</span>
              <strong style={{ color: 'var(--text-main)' }}>{detectedMeta?.creationTime || detectedMeta?.year || 'Tidak ditemukan'}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 4, borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-muted)' }}>🤖 Watermark AI (C2PA):</span>
              <strong style={{ color: (detectedMeta?.hasC2pa || detectedMeta?.aiGenerated) ? '#c084fc' : 'var(--text-main)', maxWidth: '65%', textAlign: 'right' }}>
                {detectedMeta?.c2paIssuer || (detectedMeta?.hasC2pa ? 'C2PA AI Provenance' : 'Bersih / Tidak ada')}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 4, borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-muted)' }}>🎬 Software / Encoder:</span>
              <strong style={{ color: 'var(--text-main)' }}>{detectedMeta?.encoder || 'Tidak tersemat'}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 4, borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-muted)' }}>📍 Koordinat Geotag GPS:</span>
              <strong style={{ color: detectedMeta?.location ? '#f87171' : 'var(--text-main)' }}>
                {detectedMeta?.location || 'Bersih (Tidak ada GPS)'}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 4, borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-muted)' }}>📷 Kamera & Perangkat:</span>
              <strong style={{ color: 'var(--text-main)' }}>
                {[detectedMeta?.deviceMake, detectedMeta?.deviceModel].filter(Boolean).join(' ') || 'Bersih'}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 4, borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-muted)' }}>👤 Penulis / Artist:</span>
              <strong style={{ color: 'var(--text-main)' }}>{detectedMeta?.artist || 'Tidak ada'}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>🏷️ Judul Asli Container:</span>
              <strong style={{ color: 'var(--text-main)', maxWidth: '60%', textAlign: 'right', wordBreak: 'break-word' }}>
                {detectedMeta?.title || detectedMeta?.cleanTitleSuggestion || 'Tidak ada'}
              </strong>
            </div>
          </div>

          {/* Balik Button */}
          <button
            type="button"
            onClick={() => setIsFlipped(false)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: 'rgba(var(--brand-primary-rgb), 0.12)',
              color: 'var(--brand-primary)',
              border: '1px solid rgba(var(--brand-primary-rgb), 0.25)'
            }}
          >
            <RotateCcw size={13} />
            <span>Selesai Cek — Balik ke Opsi Bersihkan</span>
          </button>
        </div>
      )}

      {errorMsg && (
        <div style={{ background: 'rgba(239,68,68,0.1)', padding: 10, borderRadius: 8, border: '1px solid #ef4444', color: '#f87171', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertCircle size={15} />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      <CenteredActionWorkspace
        accept="video/*,.mp4,.webm,.mov,.mkv,.m4v"
        title={pseoData ? pseoData.h1 : (t('toolRemoveVideoMetadata') || 'Remove Video Metadata')}
        description={pseoData ? pseoData.description : (t('removeVideoMetadataDesc') || 'Strip hidden GPS location, camera serials, timestamps, and EXIF from video files. 100% private in-browser WebAssembly cleaner.')}
        toolId="remove-video-metadata"
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
        processActionText={t('rmvAction') || 'Clean & Strip Metadata'}
        sidebarContent={sidebarContent}
        targetFormat={file ? (file.name.split('.').pop() || 'mp4') : 'mp4'}
      />

      {!file && !pseoData && (
        <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px' }}>
          <RemoveVideoRadarHudSection />
          <RemoveVideoThreatVectorsSection />
          <RemoveVideoPerformanceMetricsSection />
          <RemoveVideoComparisonTableSection />
          <RemoveVideoFaqSection />
        </div>
      )}
    </>
  );
};
