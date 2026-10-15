import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, Music, User, Calendar, Disc, FileText, Check, AlertCircle, Zap, Loader2, RotateCcw, Radio, Headphones, Sliders } from 'lucide-react';
import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';
import { useFFmpeg } from '../hooks/useFFmpeg';
import { useLanguage } from '../hooks/useLanguage';
import { scanAudioMetadata, type DetectedAudioMetadata } from '../utils/mediaMetadataScanner';
import {
  EditAudioTurntableShowcaseSection,
  EditAudioProducerPipelineSection,
  EditAudioPlatformCompatibilitySection,
  EditAudioTagFormatSpecsSection
} from '../components/content-sections/tools/EditAudioMetadataSections';

export const EditAudioMetadata: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, runCustomFFmpeg } = useFFmpeg();
  const { t } = useLanguage();

  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Detected Metadata State
  const [detectedMeta, setDetectedMeta] = useState<DetectedAudioMetadata | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [autoFilledCount, setAutoFilledCount] = useState<number>(0);

  // Metadata form fields
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [trackNumber, setTrackNumber] = useState('');
  const [composer, setComposer] = useState('');
  const [comment, setComment] = useState('');

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
      setTrackNumber('');
      setComposer('');
      setComment('');
      return;
    }

    let isMounted = true;
    setIsScanning(true);
    setAutoFilledCount(0);

    const scan = async () => {
      try {
        const meta = await scanAudioMetadata(file);
        if (!isMounted) return;

        setDetectedMeta(meta);

        // Pre-fill existing metadata tags into the form with smart defaults
        const initialTitle = meta.title || meta.cleanTitleSuggestion || '';
        const initialArtist = meta.artist || (meta.hasC2pa ? 'Google AI' : meta.aiProvider || meta.encoder || '');
        const initialAlbum = meta.album || (meta.hasC2pa ? 'AI Generated Audio' : '');
        const initialYear = meta.year || '2026';
        const initialGenre = meta.genre || (meta.hasC2pa ? 'Ambient / Electronic' : 'Music');
        const initialTrack = meta.trackNumber || '1';
        const initialComposer = meta.composer || (meta.hasC2pa ? 'Google DeepMind' : '');
        const initialComment = meta.comment || (meta.hasC2pa ? 'SynthID C2PA Audio Provenance' : '');

        let filled = 0;
        if (initialTitle) { setTitle(initialTitle); filled++; }
        if (initialArtist) { setArtist(initialArtist); filled++; }
        if (initialAlbum) { setAlbum(initialAlbum); filled++; }
        if (initialYear) { setYear(initialYear); filled++; }
        if (initialGenre) { setGenre(initialGenre); filled++; }
        if (initialTrack) { setTrackNumber(initialTrack); filled++; }
        if (initialComposer) { setComposer(initialComposer); filled++; }
        if (initialComment) { setComment(initialComment); filled++; }

        setAutoFilledCount(filled);
      } catch (err) {
        console.warn('Audio metadata read error:', err);
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
    const outputName = `tagged_${Date.now()}.${cleanExt}`;

    // Base FFmpeg args
    const args = ['-i', file.name];

    // Inject ID3 metadata tags
    if (title.trim()) args.push('-metadata', `title=${title.trim()}`);
    if (artist.trim()) args.push('-metadata', `artist=${artist.trim()}`);
    if (album.trim()) args.push('-metadata', `album=${album.trim()}`);
    if (year.trim()) args.push('-metadata', `date=${year.trim()}`);
    if (genre.trim()) args.push('-metadata', `genre=${genre.trim()}`);
    if (trackNumber.trim()) args.push('-metadata', `track=${trackNumber.trim()}`);
    if (composer.trim()) args.push('-metadata', `composer=${composer.trim()}`);
    if (comment.trim()) args.push('-metadata', `comment=${comment.trim()}`);

    // Stream copy to update header tags losslessly without re-encoding
    args.push('-c:a', 'copy');
    args.push(outputName);

    try {
      const mime = file.type || `audio/${cleanExt === 'mp3' ? 'mpeg' : cleanExt}`;
      const url = await runCustomFFmpeg([file], args, outputName, mime);
      if (url) {
        setOutputUrl(url);
      } else {
        setErrorMsg(t('edaError') || 'Failed to update audio metadata. Please ensure the audio file is valid.');
      }
    } catch (e: any) {
      console.error('Audio metadata update failed:', e);
      setErrorMsg(e?.message || (t('edaError') || 'Failed to update audio metadata.'));
    }
  };

  const handleReset = () => {
    if (!detectedMeta) return;
    setTitle(detectedMeta.title || detectedMeta.cleanTitleSuggestion || '');
    setArtist(detectedMeta.artist || '');
    setAlbum(detectedMeta.album || '');
    setYear(detectedMeta.year || '2026');
    setGenre(detectedMeta.genre || '');
    setTrackNumber(detectedMeta.trackNumber || '');
    setComposer(detectedMeta.composer || '');
    setComment(detectedMeta.comment || '');
  };

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6, borderBottom: '1px solid var(--border-color)' }}>
        <div>
          <h4 style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Tag size={18} color="var(--brand-primary)" />
            <span>{t('edaFileInspector') || 'Audio ID3 Tag Editor'}</span>
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            {t('edaSubtitle') || 'Losslessly modify track title, artist, album, year, and genre tags.'}
          </p>
        </div>
        {file && (
          <button
            type="button"
            onClick={handleReset}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
            title={t('edaResetTitle') || 'Reset fields to initial detected tags'}
          >
            <RotateCcw size={12} />
            <span>{t('edaResetBtn') || 'Reset'}</span>
          </button>
        )}
      </div>

      {/* Auto-filled Notification Chip */}
      {file && autoFilledCount > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)', borderRadius: 8, fontSize: '0.76rem', color: '#c084fc' }}>
          <Sparkles size={14} style={{ flexShrink: 0 }} />
          <span>
            {t('edaAutoFilled')?.replace('{count}', String(autoFilledCount)) || `Auto-filled ${autoFilledCount} fields from audio analysis`}
          </span>
        </div>
      )}

      {/* Compact 2-Column Form Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {/* Track Title */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 3 }}>
            {t('edaFieldTitle') || 'Track Title'} *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Afternoon Boutique Hours"
            style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-main)', fontSize: '0.82rem', outline: 'none' }}
          />
        </div>

        {/* Artist */}
        <div>
          <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 3 }}>
            {t('edaFieldArtist') || 'Artist / Performer'}
          </label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="e.g. Google AI / Artist Name"
            style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-main)', fontSize: '0.82rem', outline: 'none' }}
          />
        </div>

        {/* Album */}
        <div>
          <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 3 }}>
            {t('edaFieldAlbum') || 'Album Name'}
          </label>
          <input
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder="e.g. Ambient Sessions Vol. 1"
            style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-main)', fontSize: '0.82rem', outline: 'none' }}
          />
        </div>

        {/* Year / Release Date */}
        <div>
          <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 3 }}>
            {t('edaFieldYear') || 'Year / Date'}
          </label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g. 2026"
            style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-main)', fontSize: '0.82rem', outline: 'none' }}
          />
        </div>

        {/* Genre */}
        <div>
          <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 3 }}>
            {t('edaFieldGenre') || 'Genre'}
          </label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="e.g. Ambient, Electronic, Lo-Fi"
            style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-main)', fontSize: '0.82rem', outline: 'none' }}
          />
        </div>

        {/* Track Number */}
        <div>
          <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 3 }}>
            {t('edaFieldTrack') || 'Track Number'}
          </label>
          <input
            type="text"
            value={trackNumber}
            onChange={(e) => setTrackNumber(e.target.value)}
            placeholder="e.g. 1 or 01/12"
            style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-main)', fontSize: '0.82rem', outline: 'none' }}
          />
        </div>

        {/* Composer / Producer */}
        <div>
          <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 3 }}>
            {t('edaFieldComposer') || 'Composer / Producer'}
          </label>
          <input
            type="text"
            value={composer}
            onChange={(e) => setComposer(e.target.value)}
            placeholder="e.g. Producer Name"
            style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-main)', fontSize: '0.82rem', outline: 'none' }}
          />
        </div>

        {/* Comment / Copyright */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 3 }}>
            {t('edaFieldComment') || 'Comment / Copyright Notes'}
          </label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="e.g. ℗ 2026 Studio Records"
            style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-main)', fontSize: '0.82rem', outline: 'none' }}
          />
        </div>
      </div>

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
        title={pseoData ? pseoData.h1 : (t('toolEditAudioMetadata') || 'Edit Audio Metadata')}
        description={pseoData ? pseoData.description : (t('editAudioMetadataDesc') || 'Edit ID3 tags, song title, artist, album, year, genre, and cover details online. Fast, lossless tag editor running 100% inside your browser.')}
        toolId="edit-audio-metadata"
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
        processActionText={t('edaActionBtn') || 'Save & Update Audio Tags'}
        sidebarContent={sidebarContent}
        targetFormat={file ? (file.name.split('.').pop() || 'mp3') : 'mp3'}
      />

      {!file && !pseoData && (
        <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '80px', marginTop: '60px' }}>
          <EditAudioTurntableShowcaseSection />
          <EditAudioProducerPipelineSection />
          <EditAudioPlatformCompatibilitySection />
          <EditAudioTagFormatSpecsSection />
        </div>
      )}
    </>
  );
};
