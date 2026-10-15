import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, MapPin, Smartphone, UserX, Clock, Check, AlertCircle, FileVideo, Zap, Lock, Loader2, Sparkles, Tag } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { useLanguage } from '../hooks/useLanguage';
import { scanFileMetadata, type DetectedVideoMetadata } from '../utils/mediaMetadataScanner';
import {
  RemoveVideoMetadataHeroSection,
  RemoveVideoMetadataHowToSection,
  RemoveVideoMetadataBentoSection,
  RemoveVideoMetadataComparisonSection
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

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Tool Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6, borderBottom: '1px solid var(--border-color)' }}>
        <div>
          <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldAlert size={18} color="#ef4444" />
            <span>{t('rmvFileInspector') || 'Video Metadata Scrubber'}</span>
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            {t('rmvSubtitle') || 'Select metadata tags to strip losslessly.'}
          </p>
        </div>
        {detectedMeta?.hasC2pa && (
          <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: 'rgba(168,85,247,0.15)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.3)' }}>
            AI Manifest (C2PA)
          </span>
        )}
      </div>

      {/* Hidden Metadata in Container Inspector */}
      {file && (
        <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, paddingBottom: 6, borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Tag size={14} color="var(--brand-primary)" />
              <span>{t('rmvDetectedMetadataTitle') || 'Hidden Metadata in Container'}</span>
            </span>
            {isScanning && (
              <span style={{ fontSize: '0.72rem', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Loader2 size={12} className="animate-spin" /> {t('scanning') || 'Scanning...'}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.78rem' }}>
            {/* AI Watermark / C2PA Manifest Alert */}
            {(detectedMeta?.hasC2pa || detectedMeta?.aiGenerated) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: 'rgba(168,85,247,0.1)', borderRadius: 6, color: '#c084fc', fontWeight: 600 }}>
                <Sparkles size={14} style={{ flexShrink: 0, color: '#e879f9' }} />
                <span><strong>Watermark AI (C2PA):</strong> {detectedMeta.c2paIssuer || 'Google SynthID Provenance'}</span>
              </div>
            )}

            {/* Creation Date / Time */}
            {(detectedMeta?.creationTime || detectedMeta?.year) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
                <Clock size={13} style={{ flexShrink: 0, color: '#38bdf8' }} />
                <span><strong style={{ color: 'var(--text-muted)' }}>Waktu Pembuatan:</strong> {detectedMeta.creationTime || detectedMeta.year}</span>
              </div>
            )}

            {/* Software / Encoder */}
            {detectedMeta?.encoder && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
                <FileVideo size={13} style={{ flexShrink: 0, color: '#a855f7' }} />
                <span><strong style={{ color: 'var(--text-muted)' }}>Software / Encoder:</strong> {detectedMeta.encoder}</span>
              </div>
            )}

            {/* GPS Geotag */}
            {detectedMeta?.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f87171' }}>
                <MapPin size={13} style={{ flexShrink: 0 }} />
                <span><strong>Koordinat GPS:</strong> <code style={{ color: '#fca5a5' }}>{detectedMeta.location}</code></span>
              </div>
            )}

            {/* Camera Hardware */}
            {detectedMeta?.hasDeviceInfo && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
                <Smartphone size={13} style={{ flexShrink: 0, color: '#38bdf8' }} />
                <span><strong style={{ color: 'var(--text-muted)' }}>Perangkat:</strong> {[detectedMeta.deviceMake, detectedMeta.deviceModel].filter(Boolean).join(' ')}</span>
              </div>
            )}

            {/* Author / Artist */}
            {detectedMeta?.artist && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
                <UserX size={13} style={{ flexShrink: 0, color: '#fbbf24' }} />
                <span><strong style={{ color: 'var(--text-muted)' }}>Penulis / Artist:</strong> {detectedMeta.artist}</span>
              </div>
            )}

            {/* Title */}
            {detectedMeta?.title && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
                <Tag size={13} style={{ flexShrink: 0, color: '#38bdf8' }} />
                <span><strong style={{ color: 'var(--text-muted)' }}>Judul:</strong> "{detectedMeta.title}"</span>
              </div>
            )}

            {/* Clean Reassurance if no metadata tags */}
            {!isScanning && !detectedMeta?.hasC2pa && !detectedMeta?.creationTime && !detectedMeta?.year && !detectedMeta?.encoder && !detectedMeta?.location && !detectedMeta?.hasDeviceInfo && !detectedMeta?.artist && !detectedMeta?.title && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#22c55e', padding: '2px 0' }}>
                <ShieldCheck size={14} style={{ flexShrink: 0 }} />
                <span>Wadah bersih: Tidak ditemukan koordinat GPS atau watermark AI.</span>
              </div>
            )}
          </div>
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
          <RemoveVideoMetadataHeroSection />
          <RemoveVideoMetadataHowToSection />
          <RemoveVideoMetadataBentoSection />
          <RemoveVideoMetadataComparisonSection />
        </div>
      )}
    </>
  );
};
