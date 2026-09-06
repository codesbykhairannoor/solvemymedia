import React, { Suspense, lazy } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SEO } from './seo/SEO';
import { getStandardSlug } from '../i18n/slugs';
import { useLanguage } from '../hooks/useLanguage';
import { NativeLayoutRenderer } from './pseo/NativeLayoutRenderer';
import LongTailTranslations from '../data/pseo-long-tail-translations.json';

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

const TOOL_COMPONENTS: Record<string, React.FC<any>> = {
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
    { qKey: 'cropFaq1Q', aKey: 'cropFaq1A' },
    { qKey: 'cropFaq2Q', aKey: 'cropFaq2A' },
    { qKey: 'cropFaq3Q', aKey: 'cropFaq3A' },
  ],
  'mute-video': [
    { qKey: 'mvFaq1Q', aKey: 'mvFaq1A' },
    { qKey: 'mvFaq2Q', aKey: 'mvFaq2A' },
    { qKey: 'mvFaq3Q', aKey: 'mvFaq3A' },
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

const ToolFallback = () => (
  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', background: 'var(--bg-main)' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div className="loader-spinner" style={{ width: 40, height: 40, border: '3px solid var(--border-color)', borderTopColor: 'var(--brand-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  </div>
);

export const DynamicToolRoute: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { currentLang, t } = useLanguage();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  let standardSlug = getStandardSlug(slug, currentLang);
  
  // Try to find a pSEO route match using the standard (English) slug
  let pseoData: any = null;
  const targetLang = (currentLang === 'zh-cn' || currentLang === 'zh') ? 'zh' : 
                     (currentLang === 'zh-tw' ? 'zh-TW' : currentLang);

  const findRoute = (translations: any) => {
    if (!translations) return null;
    const langData = translations[targetLang] || translations['en'];
    if (!langData) return null;
    return langData.find((r: any) => r.path === `/${standardSlug}` || r.path === standardSlug);
  };

  pseoData = findRoute(LongTailTranslations);
  
  if (pseoData) {
    standardSlug = pseoData.tool;
  }

  if (!TOOL_COMPONENTS[standardSlug]) {
    return <Navigate to="/" replace />;
  }

  const Component = TOOL_COMPONENTS[standardSlug];
  let seoKeys = SLUG_TO_SEO[standardSlug] || { title: 'seoHomeTitle', desc: 'seoHomeDesc' };
  
  let customTitle, customDesc;
  if (pseoData) {
    customTitle = pseoData.meta_title || pseoData.h1;
    customDesc = pseoData.meta_description || pseoData.description;
  }

  // Build FAQ items for JSON-LD FAQPage schema using translation keys
  let faqItems: any[] = [];
  if (pseoData?.faqs) {
    faqItems = pseoData.faqs;
  } else {
    const faqKeys = SLUG_TO_FAQ_KEYS[standardSlug] || [];
    faqItems = faqKeys
      .map(({ qKey, aKey }) => ({ q: t(qKey as any) || '', a: t(aKey as any) || '' }))
      .filter(item => item.q && item.a);
  }

  return (
    <>
      <SEO 
        titleKey={seoKeys.title as any} 
        descKey={seoKeys.desc as any} 
        customTitle={customTitle}
        customDesc={customDesc}
        faqItems={faqItems} 
      />
      <Suspense fallback={<ToolFallback />}>
        {/* Pass pseoData down just in case the component uses it for title inside UI */}
        <Component pseoData={pseoData} />
      </Suspense>

      {/* RENDER PSEO DATA EXTERNALLY SO SSG CAN READ IT WITHOUT WAITING FOR LAZY TOOL TO LOAD */}
      {pseoData && (
        <div style={{ marginTop: '40px' }}>
          <NativeLayoutRenderer data={pseoData} />
        </div>
      )}

      {/* SEO Section FAQ for Standard Tools */}
      {!pseoData && faqItems.length > 0 && (
        <section className="seo-section faq" style={{ padding: '120px 24px', background: 'var(--bg-card)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {t('faqTitle') || 'Frequently Asked Questions'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {faqItems.map((faq: any, idx: number) => (
                <div key={idx} style={{ background: 'var(--bg-card)', padding: 32, borderRadius: 20, border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12, color: 'var(--text-main)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ color: 'var(--brand-primary)' }}>Q:</span> {faq.q}
                  </h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>
                    <strong style={{ color: 'var(--brand-secondary)' }}>A:</strong> {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
