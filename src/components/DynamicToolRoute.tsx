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

// FAQ translation key pairs for each tool
const SLUG_TO_FAQ_KEYS: Record<string, Array<{ qKey: string; aKey: string }>> = {
  'compress-video': [
    { qKey: 'compVFaq1Q', aKey: 'compVFaq1A' },
    { qKey: 'compVFaq2Q', aKey: 'compVFaq2A' },
    { qKey: 'compVFaq3Q', aKey: 'compVFaq3A' },
  ],
  'compress-audio': [
    { qKey: 'compAFaq1Q', aKey: 'compAFaq1A' },
    { qKey: 'compAFaq2Q', aKey: 'compAFaq2A' },
    { qKey: 'compAFaq3Q', aKey: 'compAFaq3A' },
  ],
  'convert-video': [
    { qKey: 'convVFaq1Q', aKey: 'convVFaq1A' },
    { qKey: 'convVFaq2Q', aKey: 'convVFaq2A' },
    { qKey: 'convVFaq3Q', aKey: 'convVFaq3A' },
  ],
  'convert-audio': [
    { qKey: 'convAFaq1Q', aKey: 'convAFaq1A' },
    { qKey: 'convAFaq2Q', aKey: 'convAFaq2A' },
    { qKey: 'convAFaq3Q', aKey: 'convAFaq3A' },
  ],
  'video-to-audio': [
    { qKey: 'vtaFaq1Q', aKey: 'vtaFaq1A' },
    { qKey: 'vtaFaq2Q', aKey: 'vtaFaq2A' },
    { qKey: 'vtaFaq3Q', aKey: 'vtaFaq3A' },
  ],
  'transcribe': [
    { qKey: 'transFaq1Q', aKey: 'transFaq1A' },
    { qKey: 'transFaq2Q', aKey: 'transFaq2A' },
    { qKey: 'transFaq3Q', aKey: 'transFaq3A' },
  ],
  'recorder': [
    { qKey: 'recFaq1Q', aKey: 'recFaq1A' },
    { qKey: 'recFaq2Q', aKey: 'recFaq2A' },
    { qKey: 'recFaq3Q', aKey: 'recFaq3A' },
  ],
  'create-gif': [
    { qKey: 'gifFaq1Q', aKey: 'gifFaq1A' },
    { qKey: 'gifFaq2Q', aKey: 'gifFaq2A' },
    { qKey: 'gifFaq3Q', aKey: 'gifFaq3A' },
  ],
  'video-speed': [
    { qKey: 'speedVFaq1Q', aKey: 'speedVFaq1A' },
    { qKey: 'speedVFaq2Q', aKey: 'speedVFaq2A' },
    { qKey: 'speedVFaq3Q', aKey: 'speedVFaq3A' },
  ],
  'crop-video': [
    { qKey: 'cropVFaq1Q', aKey: 'cropVFaq1A' },
    { qKey: 'cropVFaq2Q', aKey: 'cropVFaq2A' },
    { qKey: 'cropVFaq3Q', aKey: 'cropVFaq3A' },
  ],
  'mute-video': [
    { qKey: 'muteVFaq1Q', aKey: 'muteVFaq1A' },
    { qKey: 'muteVFaq2Q', aKey: 'muteVFaq2A' },
    { qKey: 'muteVFaq3Q', aKey: 'muteVFaq3A' },
  ],
  'watermark-video': [
    { qKey: 'wmFaq1Q', aKey: 'wmFaq1A' },
    { qKey: 'wmFaq2Q', aKey: 'wmFaq2A' },
    { qKey: 'wmFaq3Q', aKey: 'wmFaq3A' },
  ],
  'merge-audio': [
    { qKey: 'maFaq1Q', aKey: 'maFaq1A' },
    { qKey: 'maFaq2Q', aKey: 'maFaq2A' },
    { qKey: 'maFaq3Q', aKey: 'maFaq3A' },
  ],
};

export const DynamicToolRoute: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { currentLang, t } = useLanguage();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const standardSlug = getStandardSlug(slug, currentLang);

  if (!TOOL_COMPONENTS[standardSlug]) {
    return <Navigate to="/" replace />;
  }

  const Component = TOOL_COMPONENTS[standardSlug];
  const seoKeys = SLUG_TO_SEO[standardSlug] || { title: 'seoHomeTitle', desc: 'seoHomeDesc' };

  // Build FAQ items for JSON-LD FAQPage schema using translation keys
  const faqKeys = SLUG_TO_FAQ_KEYS[standardSlug] || [];
  const faqItems = faqKeys
    .map(({ qKey, aKey }) => ({ q: t(qKey as any) || '', a: t(aKey as any) || '' }))
    .filter(item => item.q && item.a);

  return (
    <>
      <SEO titleKey={seoKeys.title} descKey={seoKeys.desc} faqItems={faqItems} />
      <Component />
    </>
  );
};
