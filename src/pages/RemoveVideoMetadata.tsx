import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, MapPin, Smartphone, UserX, Clock, Check, AlertCircle, FileVideo, Zap, Lock } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { useLanguage } from '../hooks/useLanguage';
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Privacy Status Card */}
      <div style={{ background: 'rgba(225,29,72,0.08)', padding: 16, borderRadius: 16, border: '1px solid rgba(225,29,72,0.2)' }}>
        <h4 style={{ fontWeight: 800, fontSize: '0.98rem', color: '#f43f5e', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShieldAlert size={18} />
          <span>{t('rmvFileInspector') || 'Video Metadata Scanner'}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
          {file ? `${file.name} (${formatFileSize(file.size)})` : (t('rmvCleanStatus') || 'Ready to sanitize video container')}
        </p>
      </div>

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
