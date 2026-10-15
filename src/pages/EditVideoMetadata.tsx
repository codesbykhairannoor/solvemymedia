import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, Film, User, Calendar, Music, FileText, Shield, AlertCircle, Zap, Loader2, RotateCcw } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { useLanguage } from '../hooks/useLanguage';
import { scanFileMetadata, type DetectedVideoMetadata } from '../utils/mediaMetadataScanner';
import {
  EditVideoMetadataHeroSection,
  EditVideoMetadataHowToSection,
  EditVideoMetadataBentoSection,
  EditVideoMetadataComparisonSection
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
  const [year, setYear] = useState('');
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
      setYear('');
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

        // Pre-fill existing metadata tags into the form
        let filled = 0;
        if (meta.title) { setTitle(meta.title); filled++; }
        if (meta.artist) { setArtist(meta.artist); filled++; }
        if (meta.album) { setAlbum(meta.album); filled++; }
        if (meta.year) { setYear(meta.year); filled++; }
        if (meta.genre) { setGenre(meta.genre); filled++; }
        if (meta.comment) { setComment(meta.comment); filled++; }
        if (meta.copyright) { setCopyright(meta.copyright); filled++; }

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
    if (year.trim()) args.push('-metadata', `date=${year.trim()}`);
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
    setYear('');
    setGenre('');
    setComment('');
    setCopyright('');
    setAutoFilledCount(0);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    background: 'var(--bg-app)',
    border: '1px solid var(--border-color)',
    borderRadius: 10,
    color: 'var(--text-main)',
    fontSize: '0.88rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--text-main)',
    marginBottom: 6
  };

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* File & Container Specs Card */}
      {file && (
        <div style={{ background: 'rgba(56,189,248,0.06)', padding: 14, borderRadius: 14, border: '1px solid rgba(56,189,248,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Film size={15} color="#38bdf8" />
              <span>{file.name}</span>
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{formatFileSize(file.size)}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 8 }}>
            <div style={{ background: 'var(--bg-app)', padding: '6px 8px', borderRadius: 8, border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{t('rmvInspectRes') || 'Resolution'}</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', marginTop: 2 }}>{detectedMeta?.resolution || '—'}</div>
            </div>
            <div style={{ background: 'var(--bg-app)', padding: '6px 8px', borderRadius: 8, border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{t('rmvInspectDur') || 'Duration'}</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', marginTop: 2 }}>{detectedMeta?.durationFormatted || '—'}</div>
            </div>
            <div style={{ background: 'var(--bg-app)', padding: '6px 8px', borderRadius: 8, border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{t('rmvInspectFormat') || 'Format'}</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', marginTop: 2 }}>{(file.name.split('.').pop() || 'MP4').toUpperCase()}</div>
            </div>
          </div>

          {/* Detected AI / Encoder Pill */}
          {(detectedMeta?.hasC2pa || detectedMeta?.encoder) && (
            <div style={{ marginTop: 10, padding: '8px 10px', background: 'rgba(168,85,247,0.1)', borderRadius: 8, border: '1px solid rgba(168,85,247,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
              <span style={{ color: '#c084fc', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}>
                <Sparkles size={13} color="#e879f9" />
                <span>{detectedMeta.hasC2pa ? 'Manifest AI (C2PA)' : 'Software / Pengkode'}</span>
              </span>
              <span style={{ color: 'var(--text-main)', fontWeight: 600, maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={detectedMeta.c2paIssuer || detectedMeta.encoder}>
                {detectedMeta.c2paIssuer || detectedMeta.encoder}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Auto-fill Status Banner */}
      {file && (
        <>
          {isScanning && (
            <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontSize: '0.82rem' }}>
              <Loader2 size={16} className="animate-spin" />
              <span>Memindai & membaca tag metadata bawaan dari wadah video...</span>
            </div>
          )}

          {!isScanning && autoFilledCount > 0 && (
            <div style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(59,130,246,0.12))', border: '1px solid rgba(168,85,247,0.35)', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 10, color: '#c084fc', fontSize: '0.82rem', lineHeight: 1.5 }}>
              <Sparkles size={16} style={{ flexShrink: 0, marginTop: 2, color: '#e879f9' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: '#f0abfc', marginBottom: 2 }}>
                  ✨ {autoFilledCount} Tag Bawaan Terdeteksi & Terisi Otomatis
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.4 }}>
                  {title && <span>Judul: <strong style={{ color: 'var(--text-main)' }}>"{title}"</strong> • </span>}
                  {artist && <span>Pembuat: <strong style={{ color: 'var(--text-main)' }}>"{artist}"</strong> • </span>}
                  {year && <span>Tahun: <strong style={{ color: 'var(--text-main)' }}>{year}</strong></span>}
                </div>
              </div>
              <button
                type="button"
                onClick={handleClearAll}
                title="Kosongkan semua bidang"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text-main)', padding: '4px 8px', borderRadius: 6, fontSize: '0.72rem', cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <RotateCcw size={11} />
                <span>Reset</span>
              </button>
            </div>
          )}

          {!isScanning && autoFilledCount === 0 && detectedMeta && (
            <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <Tag size={15} color="#38bdf8" />
              <span>Wadah video ini belum memiliki tag judul/artis bawaan. Isi kolom di bawah untuk menambahkan tag baru.</span>
            </div>
          )}
        </>
      )}

      {/* Title Field */}
      <div>
        <label style={labelStyle}>
          <Film size={14} color="#38bdf8" />
          <span>{t('edtFieldTitle') || 'Title'}</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('edtFieldTitlePlaceholder') || 'e.g. Vacation in Bali 2026'}
          style={inputStyle}
        />
      </div>

      {/* Artist / Director */}
      <div>
        <label style={labelStyle}>
          <User size={14} color="#a855f7" />
          <span>{t('edtFieldArtist') || 'Artist / Director'}</span>
        </label>
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder={t('edtFieldArtistPlaceholder') || 'e.g. John Doe / Studio'}
          style={inputStyle}
        />
      </div>

      {/* Album / Series */}
      <div>
        <label style={labelStyle}>
          <Music size={14} color="#ec4899" />
          <span>{t('edtFieldAlbum') || 'Album / Series'}</span>
        </label>
        <input
          type="text"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          placeholder={t('edtFieldAlbumPlaceholder') || 'e.g. Travel Vlog Season 1'}
          style={inputStyle}
        />
      </div>

      {/* Row for Year & Genre */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={labelStyle}>
            <Calendar size={14} color="#eab308" />
            <span>{t('edtFieldYear') || 'Release Year'}</span>
          </label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder={t('edtFieldYearPlaceholder') || '2026'}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>
            <Tag size={14} color="#22c55e" />
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

      {/* Description / Comment */}
      <div>
        <label style={labelStyle}>
          <FileText size={14} color="#64748b" />
          <span>{t('edtFieldComment') || 'Description / Comment'}</span>
        </label>
        <textarea
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t('edtFieldCommentPlaceholder') || 'e.g. Captured in 4K 60fps'}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      {/* Copyright / License */}
      <div>
        <label style={labelStyle}>
          <Shield size={14} color="#f97316" />
          <span>{t('edtFieldCopyright') || 'Copyright / License'}</span>
        </label>
        <input
          type="text"
          value={copyright}
          onChange={(e) => setCopyright(e.target.value)}
          placeholder={t('edtFieldCopyrightPlaceholder') || 'e.g. (C) 2026 All Rights Reserved'}
          style={inputStyle}
        />
      </div>

      {/* Fast Stream Note */}
      <div style={{ background: 'rgba(56,189,248,0.08)', padding: 12, borderRadius: 12, border: '1px solid rgba(56,189,248,0.2)', color: '#38bdf8', fontSize: '0.8rem', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <Zap size={16} style={{ flexShrink: 0, marginTop: 2 }} />
        <span>{t('edtFastCopyNote') || 'Instant Container Rewrite: Tags are updated in 1 second without re-rendering or transcoding video frames.'}</span>
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

      {!file && !pseoData && (
        <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px' }}>
          <EditVideoMetadataHeroSection />
          <EditVideoMetadataHowToSection />
          <EditVideoMetadataBentoSection />
          <EditVideoMetadataComparisonSection />
        </div>
      )}
    </>
  );
};
