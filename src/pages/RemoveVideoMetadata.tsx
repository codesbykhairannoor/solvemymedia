import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, MapPin, Smartphone, UserX, Clock, Check, AlertCircle, FileVideo, Zap, Lock, Loader2 } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { useLanguage } from '../hooks/useLanguage';
import { scanVideoElement, buildDetectedMetadata, type DetectedVideoMetadata } from '../utils/mediaMetadataScanner';
import {
  RemoveVideoMetadataHeroSection,
  RemoveVideoMetadataHowToSection,
  RemoveVideoMetadataBentoSection,
  RemoveVideoMetadataComparisonSection
} from '../components/content-sections/tools/RemoveVideoMetadataSections';

export const RemoveVideoMetadata: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, runCustomFFmpeg, probeMedia } = useFFmpeg();
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
        const nativeInfo = await scanVideoElement(file);
        if (!isMounted) return;

        // Container atom & tag probe via FFmpeg WASM
        const { logs, metaText } = await probeMedia(file);
        if (!isMounted) return;

        const meta = buildDetectedMetadata(metaText, logs, nativeInfo);
        setDetectedMeta(meta);
      } catch (err) {
        console.warn('Video metadata inspection warning:', err);
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Privacy Status & Container Inspector Card */}
      <div style={{ background: detectedMeta?.hasGps ? 'rgba(239,68,68,0.09)' : 'rgba(225,29,72,0.06)', padding: 16, borderRadius: 16, border: detectedMeta?.hasGps ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(225,29,72,0.18)' }}>
        <h4 style={{ fontWeight: 800, fontSize: '0.96rem', color: detectedMeta?.hasGps ? '#ef4444' : '#f43f5e', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          {detectedMeta?.hasGps ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
          <span>{t('rmvFileInspector') || 'Video Metadata Scanner'}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
          {file ? `${file.name} (${formatFileSize(file.size)})` : (t('rmvCleanStatus') || 'Ready to sanitize video container')}
        </p>

        {file && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 12 }}>
            <div style={{ background: 'var(--bg-app)', padding: '6px 8px', borderRadius: 8, border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{t('rmvInspectRes') || 'Resolution'}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginTop: 2 }}>{detectedMeta?.resolution || '—'}</div>
            </div>
            <div style={{ background: 'var(--bg-app)', padding: '6px 8px', borderRadius: 8, border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{t('rmvInspectDur') || 'Duration'}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginTop: 2 }}>{detectedMeta?.durationFormatted || '—'}</div>
            </div>
            <div style={{ background: 'var(--bg-app)', padding: '6px 8px', borderRadius: 8, border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{t('rmvInspectFormat') || 'Format'}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginTop: 2 }}>{(file.name.split('.').pop() || 'MP4').toUpperCase()}</div>
            </div>
          </div>
        )}
      </div>

      {/* Deep Metadata Probe Report */}
      {file && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{t('rmvDetectedTitle') || 'Hidden Metadata in Container'}</span>
            {isScanning && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#38bdf8', fontSize: '0.75rem', fontWeight: 600 }}>
                <Loader2 size={12} className="animate-spin" />
                <span>Scanning atoms...</span>
              </span>
            )}
          </div>

          {isScanning && !detectedMeta && (
            <div style={{ padding: '12px 14px', background: 'rgba(56,189,248,0.06)', borderRadius: 12, border: '1px solid rgba(56,189,248,0.2)', color: '#38bdf8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Loader2 size={15} className="animate-spin" />
              <span>Memindai tag metadata wadah video (GPS, kamera, stempel waktu)...</span>
            </div>
          )}

          {detectedMeta && (
            <>
              {/* GPS Alert */}
              {detectedMeta.hasGps && (
                <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 12, padding: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f87171', fontWeight: 800, fontSize: '0.82rem', marginBottom: 4 }}>
                    <MapPin size={15} />
                    <span>KOORDINAT GPS TERDETEKSI!</span>
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.78rem', background: 'rgba(0,0,0,0.3)', padding: '5px 8px', borderRadius: 6, color: '#fca5a5', wordBreak: 'break-all' }}>
                    {detectedMeta.location}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#fca5a5', marginTop: 5, opacity: 0.9 }}>
                    Data koordinat lokasi tempat video ini direkam akan dihapus secara permanen.
                  </div>
                </div>
              )}

              {/* Hardware Device */}
              {detectedMeta.hasDeviceInfo && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'var(--bg-app)', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
                  <Smartphone size={14} color="#38bdf8" />
                  <span style={{ color: 'var(--text-muted)' }}>Perangkat:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{[detectedMeta.deviceMake, detectedMeta.deviceModel].filter(Boolean).join(' ')}</strong>
                </div>
              )}

              {/* Creation Date */}
              {detectedMeta.hasCreationDate && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'var(--bg-app)', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
                  <Clock size={14} color="#fbbf24" />
                  <span style={{ color: 'var(--text-muted)' }}>Waktu Pembuatan:</span>
                  <span style={{ color: 'var(--text-main)', fontSize: '0.78rem' }}>{detectedMeta.creationTime || detectedMeta.year}</span>
                </div>
              )}

              {/* Creator / Title */}
              {detectedMeta.hasAuthorInfo && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'var(--bg-app)', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
                  <UserX size={14} color="#a855f7" />
                  <span style={{ color: 'var(--text-muted)' }}>Tag Penulis:</span>
                  <span style={{ color: 'var(--text-main)', fontSize: '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {[detectedMeta.title, detectedMeta.artist, detectedMeta.copyright].filter(Boolean).join(' • ')}
                  </span>
                </div>
              )}

              {/* Encoder / Software */}
              {detectedMeta.encoder && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'var(--bg-app)', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
                  <FileVideo size={14} color="#94a3b8" />
                  <span style={{ color: 'var(--text-muted)' }}>Encoder:</span>
                  <span style={{ color: 'var(--text-main)', fontSize: '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {detectedMeta.encoder}
                  </span>
                </div>
              )}

              {/* Clean Container Reassurance */}
              {!detectedMeta.hasGps && !detectedMeta.hasDeviceInfo && !detectedMeta.hasAuthorInfo && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'rgba(34,197,94,0.08)', borderRadius: 10, border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e', fontSize: '0.8rem' }}>
                  <ShieldCheck size={16} />
                  <span>Wadah bersih: Tidak ditemukan koordinat GPS atau identitas hardware sensitif.</span>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Toggles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '0.88rem', color: 'var(--text-main)', userSelect: 'none' }}>
          <input
            type="checkbox"
            checked={stripGps}
            onChange={(e) => setStripGps(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: '#e11d48', cursor: 'pointer' }}
          />
          <MapPin size={16} color="#ef4444" />
          <span>{t('rmvOptGps') || 'Strip GPS Coordinates & Location Geotags'}</span>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '0.88rem', color: 'var(--text-main)', userSelect: 'none' }}>
          <input
            type="checkbox"
            checked={stripDevice}
            onChange={(e) => setStripDevice(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: '#e11d48', cursor: 'pointer' }}
          />
          <Smartphone size={16} color="#38bdf8" />
          <span>{t('rmvOptDevice') || 'Remove Camera Hardware & Serial Info'}</span>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '0.88rem', color: 'var(--text-main)', userSelect: 'none' }}>
          <input
            type="checkbox"
            checked={stripAuthor}
            onChange={(e) => setStripAuthor(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: '#e11d48', cursor: 'pointer' }}
          />
          <UserX size={16} color="#fbbf24" />
          <span>{t('rmvOptAuthor') || 'Clear Creator, Title & Software Tags'}</span>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '0.88rem', color: 'var(--text-main)', userSelect: 'none' }}>
          <input
            type="checkbox"
            checked={stripChapters}
            onChange={(e) => setStripChapters(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: '#e11d48', cursor: 'pointer' }}
          />
          <Clock size={16} color="#a855f7" />
          <span>{t('rmvOptChapters') || 'Remove Embedded Chapters & Timestamps'}</span>
        </label>
      </div>

      {/* Lossless Note */}
      <div style={{ background: 'rgba(34,197,94,0.08)', padding: 12, borderRadius: 12, border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e', fontSize: '0.8rem', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <Zap size={16} style={{ flexShrink: 0, marginTop: 2 }} />
        <span>{t('rmvSafeNote') || 'Stream Copy active: 100% original video & audio quality preserved without re-encoding.'}</span>
      </div>

      {errorMsg && (
        <div style={{ background: 'rgba(239,68,68,0.1)', padding: 12, borderRadius: 12, border: '1px solid #ef4444', color: '#f87171', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertCircle size={16} />
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
