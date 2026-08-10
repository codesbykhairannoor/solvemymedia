import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SEO } from './seo/SEO';
import { getStandardSlug } from '../i18n/slugs';
import { useLanguage } from '../hooks/useLanguage';

// Import all tools
import { CompressVideo } from '../pages/CompressVideo';
import { CompressAudio } from '../pages/CompressAudio';
import { ConvertVideo } from '../pages/ConvertVideo';
import { ConvertAudio } from '../pages/ConvertAudio';
import { ConvertVideoToAudio } from '../pages/ConvertVideoToAudio';
import { TranscribeMedia } from '../pages/TranscribeMedia';
import { StudioRecorder } from '../pages/StudioRecorder';
import { CreateGif } from '../pages/CreateGif';
import { ChangeVideoSpeed } from '../pages/ChangeVideoSpeed';
import { CropVideo } from '../pages/CropVideo';
import { MuteVideo } from '../pages/MuteVideo';
import { WatermarkVideo } from '../pages/WatermarkVideo';
import { MergeAudio } from '../pages/MergeAudio';

const TOOL_COMPONENTS: Record<string, React.FC> = {
  'compress-video': CompressVideo,
  'compress-audio': CompressAudio,
  'convert-video': ConvertVideo,
  'convert-audio': ConvertAudio,
  'video-to-audio': ConvertVideoToAudio,
  'transcribe': TranscribeMedia,
  'recorder': StudioRecorder,
  'create-gif': CreateGif,
  'video-speed': ChangeVideoSpeed,
  'crop-video': CropVideo,
  'mute-video': MuteVideo,
  'watermark-video': WatermarkVideo,
  'merge-audio': MergeAudio
};

const SLUG_TO_SEO: Record<string, { title: string, desc: string }> = {
  'compress-video': { title: 'seoCompressVideoTitle', desc: 'seoCompressVideoDesc' },
  'compress-audio': { title: 'seoCompressAudioTitle', desc: 'seoCompressAudioDesc' },
  'convert-video': { title: 'seoConvertVideoTitle', desc: 'seoConvertVideoDesc' },
  'convert-audio': { title: 'seoConvertAudioTitle', desc: 'seoConvertAudioDesc' },
  'video-to-audio': { title: 'seoVideoToAudioTitle', desc: 'seoVideoToAudioDesc' },
  'transcribe': { title: 'seoTranscribeTitle', desc: 'seoTranscribeDesc' },
  'recorder': { title: 'seoRecorderTitle', desc: 'seoRecorderDesc' },
  'create-gif': { title: 'seoCreateGifTitle', desc: 'seoCreateGifDesc' },
  'video-speed': { title: 'seoVideoSpeedTitle', desc: 'seoVideoSpeedDesc' },
  'crop-video': { title: 'seoCropVideoTitle', desc: 'seoCropVideoDesc' },
  'mute-video': { title: 'seoMuteVideoTitle', desc: 'seoMuteVideoDesc' },
  'watermark-video': { title: 'seoWatermarkVideoTitle', desc: 'seoWatermarkVideoDesc' },
  'merge-audio': { title: 'seoMergeAudioTitle', desc: 'seoMergeAudioDesc' }
};

export const DynamicToolRoute: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { currentLang } = useLanguage();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const standardSlug = getStandardSlug(slug, currentLang);

  if (!TOOL_COMPONENTS[standardSlug]) {
    return <Navigate to="/" replace />;
  }

  const Component = TOOL_COMPONENTS[standardSlug];
  const seoKeys = SLUG_TO_SEO[standardSlug] || { title: 'seoHomeTitle', desc: 'seoHomeDesc' };

  return (
    <>
      <SEO titleKey={seoKeys.title} descKey={seoKeys.desc} />
      <Component />
    </>
  );
};

