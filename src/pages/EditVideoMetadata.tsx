import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, Film, User, Calendar, Music, FileText, Shield, AlertCircle, Zap, Loader2, RotateCcw } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { ResponsibleUseNotice } from '../components/ResponsibleUseNotice';
import { ModernDateTimePicker } from '../components/ModernDateTimePicker';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { useLanguage } from '../hooks/useLanguage';
import { scanFileMetadata, type DetectedVideoMetadata } from '../utils/mediaMetadataScanner';
import {
  EditVideoClapperboardSection,
  EditVideoFilmstripStepperSection,
  EditVideoMediaServerCompatibilitySection,
  EditVideoFormatSpecsSection
} from '../components/content-sections/tools/EditVideoMetadataSections';

export const EditVideoMetadata: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  const { t } = useLanguage();

  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Detected Metadata State
  const [detectedMeta, setDetectedMeta] = useState<DetectedVideoMetadata | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [autoFilledCount, setAutoFilledCount] = useState<number>(0);

  // Metadata form fields
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [genre, setGenre] = useState('');
  const [comment, setComment] = useState('');
  const [copyright, setCopyright] = useState('');

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
      setAutoFilledCount(0);
      setTitle('');
      setArtist('');
      setAlbum('');
      setDateTime('');
      setGenre('');
      setComment('');
      setCopyright('');
      return;
    }

    let isMounted = true;
    setIsScanning(true);
    setAutoFilledCount(0);

    const scan = async () => {
      try {
        const meta = await scanFileMetadata(file);
        if (!isMounted) return;

        setDetectedMeta(meta);

        // Pre-fill existing metadata tags authentically from the user's video file
        const initialTitle = meta.title || meta.cleanTitleSuggestion || '';
        const initialArtist = meta.artist || meta.encoder || '';
        const initialDate = meta.creationTime || (meta.year ? `${meta.year}-01-01 12:00:00` : '');
        const initialAlbum = meta.album || '';
        const initialGenre = meta.genre || '';
        const initialComment = meta.comment || '';
        const initialCopyright = meta.copyright || '';

        let filled = 0;
        if (initialTitle) { setTitle(initialTitle); filled++; }
        if (initialArtist) { setArtist(initialArtist); filled++; }
        if (initialDate) { setDateTime(initialDate); filled++; }
        if (initialAlbum) { setAlbum(initialAlbum); filled++; }
        if (initialGenre) { setGenre(initialGenre); filled++; }
        if (initialComment) { setComment(initialComment); filled++; }
        if (initialCopyright) { setCopyright(initialCopyright); filled++; }

        setAutoFilledCount(filled);
      } catch (err) {
        console.warn('Video metadata read error:', err);
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
    const outputName = `tagged_${Date.now()}.${cleanExt}`;

    // Base FFmpeg args
    const args = ['-i', file.name];

    // Inject metadata tags
    if (title.trim()) args.push('-metadata', `title=${title.trim()}`);
    if (artist.trim()) args.push('-metadata', `artist=${artist.trim()}`);
    if (album.trim()) args.push('-metadata', `album=${album.trim()}`);
    if (dateTime.trim()) {
      args.push('-metadata', `date=${dateTime.trim()}`);
      args.push('-metadata', `creation_time=${dateTime.trim()}`);
    }
    if (genre.trim()) args.push('-metadata', `genre=${genre.trim()}`);
    if (comment.trim()) args.push('-metadata', `comment=${comment.trim()}`);
    if (copyright.trim()) args.push('-metadata', `copyright=${copyright.trim()}`);

    // Stream copy to update header tags losslessly without re-encoding
    args.push('-c', 'copy');
    args.push(outputName);

    try {
      const mime = file.type || `video/${cleanExt}`;
      const url = await runCustomFFmpeg([file], args, outputName, mime);
      if (url) {
        setOutputUrl(url);
      } else {
        setErrorMsg(t('edtError') || 'Failed to update video metadata. Please check that the input video is valid.');
      }
    } catch (e: any) {
      console.error('Metadata update failed:', e);
      setErrorMsg(e?.message || (t('edtError') || 'Failed to update video metadata.'));
    }
  };

  const handleClearAll = () => {
    setTitle('');
    setArtist('');
    setAlbum('');
    setDateTime('');
    setGenre('');
    setComment('');
    setCopyright('');
    setAutoFilledCount(0);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    background: 'var(--bg-app)',
    border: '1px solid var(--border-color)',
    borderRadius: 8,
    color: 'var(--text-main)',
    fontSize: '0.84rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: '0.78rem',
    fontWeight: 700,
    color: 'var(--text-main)',
    marginBottom: 4
  };

  const hasAnyValue = Boolean(title || artist || album || dateTime || genre || comment || copyright);

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6, borderBottom: '1px solid var(--border-color)' }}>
        <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Film size={18} color="var(--brand-primary)" />
          <span>{t('toolEditVideoMetadata') || 'Video Metadata'}</span>
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isScanning && (
            <span style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Loader2 size={12} className="animate-spin" /> {t('scanning') || 'Scanning...'}
            </span>
          )}
          {hasAnyValue && !isScanning && (
            <button
              type="button"
              onClick={handleClearAll}
              style={{ background: 'transparent', border: 'none', color: 'var(--brand-primary)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}
              title={t('edtResetTitle') || 'Reset fields to original detected tags'}
            >
              <RotateCcw size={12} />
              <span>{t('edtResetBtn') || 'Reset'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Detected Metadata Summary */}
      {file && detectedMeta && (
        <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '8px 10px', fontSize: '0.78rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>
            {t('edtInspectorTitle') || 'Embedded Container Metadata'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {detectedMeta.location && (
              <span style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', padding: '2px 8px', borderRadius: 4, border: '1px solid rgba(239, 68, 68, 0.3)', fontWeight: 700 }}>
                📍 {detectedMeta.location}
              </span>
            )}
            {(detectedMeta.creationTime || detectedMeta.year) && (
              <span style={{ background: 'var(--bg-card)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border-color)', color: 'var(--text-main)', fontWeight: 600 }}>
                🕒 {detectedMeta.creationTime || detectedMeta.year}
              </span>
            )}
            {detectedMeta.encoder && (
              <span style={{ background: 'var(--bg-card)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
                🎬 {detectedMeta.encoder}
              </span>
            )}
            {(detectedMeta.hasC2pa || detectedMeta.aiGenerated) && (
              <span style={{ background: 'rgba(168,85,247,0.12)', color: '#c084fc', padding: '2px 8px', borderRadius: 4, border: '1px solid rgba(168,85,247,0.3)', fontWeight: 600 }}>
                ✨ {detectedMeta.c2paIssuer || 'AI (C2PA / SynthID)'}
              </span>
            )}
            {!detectedMeta.hasC2pa && !detectedMeta.creationTime && !detectedMeta.year && !detectedMeta.encoder && !detectedMeta.title && !detectedMeta.artist && !detectedMeta.location && (
              <span style={{ color: 'var(--text-muted)' }}>
                {t('rmvCleanStatus') || 'Ready to sanitize video container'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Title Field */}
      <div>
        <label style={labelStyle}>
          <Film size={13} color="#38bdf8" />
          <span>{t('edtFieldTitle') || 'Title'}</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('edtFieldTitlePlaceholder') || 'e.g. Vacation in Bali'}
          style={inputStyle}
        />
      </div>

      {/* Row for Artist & DateTime */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <label style={labelStyle}>
            <User size={13} color="#a855f7" />
            <span>{t('edtFieldArtist') || 'Artist / Creator'}</span>
          </label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder={t('edtFieldArtistPlaceholder') || 'e.g. John Doe / Studio'}
            style={inputStyle}
          />
        </div>
        <div>
          <ModernDateTimePicker
            label={t('edtFieldDateTime') || 'Tanggal & Jam Pembuatan'}
            value={dateTime}
            onChange={(val) => setDateTime(val)}
            color="#eab308"
          />
        </div>
      </div>

      {/* Row for Album & Genre */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <label style={labelStyle}>
            <Music size={13} color="#ec4899" />
            <span>{t('edtFieldAlbum') || 'Album / Series'}</span>
          </label>
          <input
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder={t('edtFieldAlbumPlaceholder') || 'e.g. Vlog Season 1'}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>
            <Tag size={13} color="#22c55e" />
            <span>{t('edtFieldGenre') || 'Genre'}</span>
          </label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder={t('edtFieldGenrePlaceholder') || 'Travel'}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Row for Copyright & Comment */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <label style={labelStyle}>
            <Shield size={13} color="#f97316" />
            <span>{t('edtFieldCopyright') || 'Copyright'}</span>
          </label>
          <input
            type="text"
            value={copyright}
            onChange={(e) => setCopyright(e.target.value)}
            placeholder={t('edtFieldCopyrightPlaceholder') || 'e.g. (C) 2026 Studio'}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>
            <FileText size={13} color="#64748b" />
            <span>{t('edtFieldComment') || 'Comment'}</span>
          </label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('edtFieldCommentPlaceholder') || 'e.g. 4K 60fps'}
            style={inputStyle}
          />
        </div>
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
        title={pseoData ? pseoData.h1 : (t('toolEditVideoMetadata') || 'Edit Video Metadata')}
        description={pseoData ? pseoData.description : (t('editVideoMetadataDesc') || 'Edit title, artist, album, genre, release year, and copyright tags on video containers online without re-encoding.')}
        toolId="edit-video-metadata"
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
        processActionText={t('edtAction') || 'Save & Update Metadata'}
        sidebarContent={sidebarContent}
        targetFormat={file ? (file.name.split('.').pop() || 'mp4') : 'mp4'}
      />

      {/* Ethical Responsible Use Policy Banner */}
      <ResponsibleUseNotice />

      {!file && !pseoData && (
        <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '80px', marginTop: '60px', width: '100%', maxWidth: '100%', minWidth: 0, overflowX: 'hidden', boxSizing: 'border-box' }}>
          <EditVideoClapperboardSection />
          <EditVideoFilmstripStepperSection />
          <EditVideoMediaServerCompatibilitySection />
          <EditVideoFormatSpecsSection />
        </div>
      )}
    </>
  );
};
