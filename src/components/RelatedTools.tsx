import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Video, Music, Scissors, RefreshCw, Bot, MonitorPlay, ImagePlay, Gauge, Crop, 
  VolumeX, Stamp, AudioLines, ArrowRight, Sparkles 
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedSlug } from '../i18n/slugs';

interface RelatedToolsProps {
  currentToolId: string;
}

interface ToolItem {
  id: string;
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  color: string;
  category: 'video' | 'audio' | 'ai';
  nameKey?: string;
  descKey: string;
  fallbackName: string;
  fallbackDesc: string;
}

const ALL_CORE_TOOLS: ToolItem[] = [
  {
    id: 'compress-video',
    icon: Video,
    color: '#a855f7',
    category: 'video',
    nameKey: 'navbarCompressVideo',
    descKey: 'toolCompressVideoDesc',
    fallbackName: 'Compress Video',
    fallbackDesc: 'Shrink video file size locally with zero quality loss.'
  },
  {
    id: 'convert-video',
    icon: RefreshCw,
    color: '#a855f7',
    category: 'video',
    nameKey: 'toolConvertVideoName',
    descKey: 'toolConvertVideoDesc',
    fallbackName: 'Convert Video',
    fallbackDesc: 'Convert MP4, WebM, MOV, MKV, and AVI entirely in browser.'
  },
  {
    id: 'video-to-audio',
    icon: Music,
    color: '#ef4444',
    category: 'audio',
    nameKey: 'navbarVideoToAudio',
    descKey: 'toolVideoToAudioDesc',
    fallbackName: 'Video to Audio',
    fallbackDesc: 'Extract high-quality MP3 or WAV soundtracks from any video.'
  },
  {
    id: 'compress-audio',
    icon: Music,
    color: '#06b6d4',
    category: 'audio',
    nameKey: 'navbarCompressAudio',
    descKey: 'toolCompressAudioDesc',
    fallbackName: 'Compress Audio',
    fallbackDesc: 'Reduce MP3, WAV, and AAC sizes for email and podcast sharing.'
  },
  {
    id: 'convert-audio',
    icon: Scissors,
    color: '#06b6d4',
    category: 'audio',
    nameKey: 'navbarConvertAudio',
    descKey: 'toolConvertAudioDesc',
    fallbackName: 'Convert Audio',
    fallbackDesc: 'Convert between MP3, WAV, AAC, FLAC, and OGG formats.'
  },
  {
    id: 'crop-video',
    icon: Crop,
    color: '#22c55e',
    category: 'video',
    nameKey: 'navbarCropVideo',
    descKey: 'toolCropVideoDesc',
    fallbackName: 'Crop Video',
    fallbackDesc: 'Resize and crop video framing for TikTok, Reels, and Shorts.'
  },
  {
    id: 'mute-video',
    icon: VolumeX,
    color: '#64748b',
    category: 'video',
    nameKey: 'navbarMuteVideo',
    descKey: 'toolMuteVideoDesc',
    fallbackName: 'Mute Video',
    fallbackDesc: 'Strip audio tracks from videos instantly without re-encoding.'
  },
  {
    id: 'video-speed',
    icon: Gauge,
    color: '#eab308',
    category: 'video',
    nameKey: 'navbarVideoSpeed',
    descKey: 'toolVideoSpeedDesc',
    fallbackName: 'Video Speed',
    fallbackDesc: 'Speed up or slow down videos smoothly from 0.25x to 4x.'
  },
  {
    id: 'create-gif',
    icon: ImagePlay,
    color: '#ec4899',
    category: 'video',
    nameKey: 'navbarCreateGif',
    descKey: 'toolCreateGifDesc',
    fallbackName: 'Create GIF',
    fallbackDesc: 'Turn video clips into lightweight, animated GIFs.'
  },
  {
    id: 'watermark-video',
    icon: Stamp,
    color: '#3b82f6',
    category: 'video',
    nameKey: 'toolWatermarkVideoName',
    descKey: 'toolWatermarkVideoDesc',
    fallbackName: 'Watermark Video',
    fallbackDesc: 'Overlay logos, text stamps, and copyright marks onto videos.'
  },
  {
    id: 'merge-audio',
    icon: AudioLines,
    color: '#f97316',
    category: 'audio',
    nameKey: 'toolMergeAudioName',
    descKey: 'toolMergeAudioDesc',
    fallbackName: 'Merge Audio',
    fallbackDesc: 'Combine multiple sound clips into a single seamless audio track.'
  },
  {
    id: 'transcribe',
    icon: Bot,
    color: '#a855f7',
    category: 'ai',
    nameKey: 'navbarTranscribe',
    descKey: 'toolTranscribeDesc',
    fallbackName: 'AI Transcribe',
    fallbackDesc: 'Speech-to-text AI powered by client-side Whisper WebAssembly.'
  },
  {
    id: 'recorder',
    icon: MonitorPlay,
    color: '#ef4444',
    category: 'ai',
    nameKey: 'navbarRecorder',
    descKey: 'toolRecorderDesc',
    fallbackName: 'Studio Recorder',
    fallbackDesc: 'Capture screen, camera, and microphone directly to video.'
  },
];

export const RelatedTools: React.FC<RelatedToolsProps> = ({ currentToolId }) => {
  const { currentLang, t } = useLanguage();

  // Pick related tools based on category and popularity
  const currentItem = ALL_CORE_TOOLS.find(t => t.id === currentToolId);
  const currentCategory = currentItem?.category || (currentToolId.includes('audio') ? 'audio' : 'video');

  const sameCategoryTools = ALL_CORE_TOOLS.filter(
    t => t.id !== currentToolId && t.category === currentCategory
  );
  const otherTools = ALL_CORE_TOOLS.filter(
    t => t.id !== currentToolId && t.category !== currentCategory
  );

  // Pick 4 to 6 related tools prioritizing same category
  const selectedTools = [...sameCategoryTools, ...otherTools].slice(0, 6);

  const getToolUrl = (toolId: string) => {
    const locSlug = getLocalizedSlug(toolId, currentLang);
    return currentLang === 'en' ? `/${locSlug}` : `/${currentLang}/${locSlug}`;
  };

  const getToolDisplayName = (item: ToolItem) => {
    if (item.nameKey) {
      const translated = t(item.nameKey as any);
      if (translated && translated !== item.nameKey) {
        // Return cleaned up title
        return translated.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
      }
    }
    const locSlug = getLocalizedSlug(item.id, currentLang);
    return locSlug.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  };

  const getToolDisplayDesc = (item: ToolItem) => {
    if (item.descKey) {
      const translated = t(item.descKey as any);
      if (translated && translated !== item.descKey) {
        return translated;
      }
    }
    return item.fallbackDesc;
  };

  return (
    <section 
      className="related-tools-section" 
      style={{ 
        padding: '80px 24px', 
        background: 'var(--bg-app)', 
        borderTop: '1px solid var(--border-color)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 999,
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            color: 'var(--brand-primary)',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: 16
          }}>
            <Sparkles size={14} />
            <span>{t('relatedToolsBadge') || 'More Browser Tools'}</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 800,
            color: 'var(--text-main)',
            letterSpacing: '-0.02em',
            margin: '0 0 12px'
          }}>
            {t('relatedToolsTitle') || 'Explore Related Media Tools'}
          </h2>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            {t('relatedToolsDesc') || 'All tools run 100% locally in your browser with no file size limits, no tracking, and zero cloud uploads.'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24
        }}>
          {selectedTools.map((item) => {
            const Icon = item.icon;
            const url = getToolUrl(item.id);
            const title = getToolDisplayName(item);
            const desc = getToolDisplayDesc(item);

            return (
              <Link
                key={item.id}
                to={url}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 24,
                  borderRadius: 16,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = item.color;
                  e.currentTarget.style.boxShadow = `0 12px 28px rgba(0,0,0,0.08), 0 0 20px ${item.color}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
                }}
              >
                <div>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${item.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                    border: `1px solid ${item.color}30`
                  }}>
                    <Icon size={22} color={item.color} />
                  </div>

                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    margin: '0 0 8px',
                    letterSpacing: '-0.01em'
                  }}>
                    {title}
                  </h3>

                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    margin: 0
                  }}>
                    {desc}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginTop: 20,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: item.color
                }}>
                  <span>{t('tryToolBtn') || 'Open Tool'}</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
