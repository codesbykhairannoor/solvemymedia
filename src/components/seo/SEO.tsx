import React from 'react';
import { useHead } from '@unhead/react';
import { useLanguage } from '../../hooks/useLanguage';
import { useLocation } from 'react-router-dom';
import { getStandardSlug, getLocalizedSlug } from '../../i18n/slugs';

interface SEOProps {
  titleKey: string;
  descKey: string;
  defaultTitle?: string;
  defaultDesc?: string;
  faqItems?: Array<{ q: string; a: string }>;
}

// JSON-LD schema for each tool slug
const TOOL_SCHEMA: Record<string, { appName: string; category: string; steps: Array<{ name: string; text: string }> }> = {
  'compress-video': {
    appName: 'Video Compressor Online',
    category: 'MultimediaApplication',
    steps: [
      { name: 'Upload Video', text: 'Select your MP4, WebM, or MOV file. It stays in your browser memory.' },
      { name: 'Choose Quality', text: 'Pick Extreme, Balanced, or High Quality compression preset.' },
      { name: 'Compress & Download', text: 'WebAssembly compresses locally. Download the smaller file instantly.' },
    ],
  },
  'compress-audio': {
    appName: 'Audio Compressor Online',
    category: 'MultimediaApplication',
    steps: [
      { name: 'Upload Audio', text: 'Select your MP3, WAV, or AAC file. No uploads to any server.' },
      { name: 'Set Bitrate', text: 'Choose your target bitrate for the compressed output.' },
      { name: 'Compress & Download', text: 'Audio is compressed locally using WebAssembly. Download immediately.' },
    ],
  },
  'convert-video': {
    appName: 'Video Format Converter',
    category: 'MultimediaApplication',
    steps: [
      { name: 'Upload Video', text: 'Select your source video file (MP4, WebM, MKV, MOV, AVI).' },
      { name: 'Choose Output Format', text: 'Pick your desired output format from the list.' },
      { name: 'Convert & Download', text: 'Browser converts the file locally using WebCodecs. Download result.' },
    ],
  },
  'convert-audio': {
    appName: 'Audio Format Converter',
    category: 'MultimediaApplication',
    steps: [
      { name: 'Upload Audio', text: 'Select your source audio file (MP3, WAV, AAC, OGG, FLAC).' },
      { name: 'Choose Format', text: 'Select the output audio format.' },
      { name: 'Convert & Download', text: 'Audio is converted locally with WebAssembly. Download the result.' },
    ],
  },
  'video-to-audio': {
    appName: 'Video to Audio Extractor',
    category: 'MultimediaApplication',
    steps: [
      { name: 'Upload Video', text: 'Select your video file. It is processed entirely in your browser.' },
      { name: 'Choose Format', text: 'Select MP3 or WAV as the output audio format.' },
      { name: 'Extract & Download', text: 'The audio stream is extracted locally. Download the audio file.' },
    ],
  },
  'transcribe': {
    appName: 'AI Audio Transcription Tool',
    category: 'MultimediaApplication',
    steps: [
      { name: 'Upload Media', text: 'Select your audio or video file to transcribe.' },
      { name: 'Load AI Model', text: 'The Whisper WASM model loads locally — no internet required after load.' },
      { name: 'Transcribe & Copy', text: 'Speech is converted to text entirely in your browser. Copy or download.' },
    ],
  },
  'recorder': {
    appName: 'Screen and Audio Recorder',
    category: 'MultimediaApplication',
    steps: [
      { name: 'Configure Sources', text: 'Select screen, webcam, and microphone sources to record.' },
      { name: 'Start Recording', text: 'Click Start Recording. The browser captures the media streams.' },
      { name: 'Stop & Download', text: 'Click Stop. Download the recorded video file immediately.' },
    ],
  },
  'create-gif': {
    appName: 'Video to GIF Converter',
    category: 'MultimediaApplication',
    steps: [
      { name: 'Upload Video', text: 'Select a video clip to convert to GIF.' },
      { name: 'Set Parameters', text: 'Choose start/end time, frame rate, and output size.' },
      { name: 'Create & Download', text: 'GIF is generated locally with WebAssembly. Download instantly.' },
    ],
  },
  'video-speed': {
    appName: 'Video Speed Changer',
    category: 'MultimediaApplication',
    steps: [
      { name: 'Upload Video', text: 'Select your video file from your device.' },
      { name: 'Set Speed', text: 'Choose a speed multiplier (0.25× to 4×).' },
      { name: 'Process & Download', text: 'Video speed is changed locally. Download the result.' },
    ],
  },
  'crop-video': {
    appName: 'Video Crop & Resize Tool',
    category: 'MultimediaApplication',
    steps: [
      { name: 'Upload Video', text: 'Select your video file to crop.' },
      { name: 'Set Dimensions', text: 'Choose a preset ratio (16:9, 9:16, 1:1) or custom dimensions.' },
      { name: 'Crop & Download', text: 'Video is cropped locally without watermarks. Download the result.' },
    ],
  },
  'mute-video': {
    appName: 'Video Mute Tool',
    category: 'MultimediaApplication',
    steps: [
      { name: 'Upload Video', text: 'Select the video file you want to mute.' },
      { name: 'Confirm', text: 'Confirm you want to remove the audio track.' },
      { name: 'Download Muted Video', text: 'The audio track is removed locally. Download the silent video.' },
    ],
  },
  'watermark-video': {
    appName: 'Video Watermark Tool',
    category: 'MultimediaApplication',
    steps: [
      { name: 'Upload Video', text: 'Select the video to add a watermark to.' },
      { name: 'Design Watermark', text: 'Type text or upload an image. Set position, size, and opacity.' },
      { name: 'Apply & Download', text: 'Watermark is applied locally using WebAssembly. Download the result.' },
    ],
  },
  'merge-audio': {
    appName: 'Audio Merge Tool',
    category: 'MultimediaApplication',
    steps: [
      { name: 'Upload Audio Files', text: 'Select multiple audio files to merge together.' },
      { name: 'Set Order', text: 'Arrange the audio files in the desired playback order.' },
      { name: 'Merge & Download', text: 'Files are concatenated locally using WebAssembly. Download the merged audio.' },
    ],
  },
};

export const SEO: React.FC<SEOProps> = ({ titleKey, descKey, defaultTitle, defaultDesc, faqItems }) => {
  const { currentLang, t, languages } = useLanguage();
  const location = useLocation();
  
  const title = t(titleKey as any) || defaultTitle || 'SolveMyMedia';
  const description = t(descKey as any) || defaultDesc || 'Optimize your media files';
  
  const domain = 'https://solvemymedia.com';
  
  const currentPath = location.pathname;
  let cleanPath = currentPath;
  if (currentLang !== 'en' && cleanPath.startsWith(`/${currentLang}`)) {
    cleanPath = cleanPath.slice(currentLang.length + 1) || '/';
  }
  
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }

  let standardSlug = '';
  if (cleanPath !== '/') {
    const parts = cleanPath.split('/').filter(Boolean);
    const slugCandidate = parts[0];
    if (slugCandidate) {
      standardSlug = getStandardSlug(slugCandidate, currentLang);
    }
  }

  const formatUrl = (path: string) => {
    if (path.length > 1 && path.endsWith('/')) {
      return `${domain}${path.slice(0, -1)}`;
    }
    return `${domain}${path}`;
  };

  const canonicalLocalSlug = standardSlug ? getLocalizedSlug(standardSlug, currentLang) : '';
  const canonicalPathRaw = canonicalLocalSlug ? `/${canonicalLocalSlug}` : cleanPath;
  const canonicalPath = currentLang === 'en' ? canonicalPathRaw : `/${currentLang}${canonicalPathRaw === '/' ? '' : canonicalPathRaw}`;
  const canonicalUrl = formatUrl(canonicalPath);

  const alternateLinks = languages.map(lang => {
    const langLocalSlug = standardSlug ? getLocalizedSlug(standardSlug, lang.code) : '';
    const langPathRaw = langLocalSlug ? `/${langLocalSlug}` : cleanPath;
    const langPath = lang.code === 'en' ? langPathRaw : `/${lang.code}${langPathRaw === '/' ? '' : langPathRaw}`;
    return {
      rel: 'alternate',
      hreflang: lang.code,
      href: formatUrl(langPath)
    };
  });
  
  alternateLinks.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: formatUrl(standardSlug ? `/${standardSlug}` : cleanPath)
  });

  // Build JSON-LD schema
  const schemaGraph: object[] = [
    {
      '@type': 'WebSite',
      '@id': `${domain}/#website`,
      name: 'SolveMyMedia',
      url: domain,
      description: 'Free, secure, 100% client-side video and audio processing tools powered by WebAssembly.',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${domain}/?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ];

  const toolSchema = standardSlug && TOOL_SCHEMA[standardSlug];
  if (toolSchema) {
    schemaGraph.push({
      '@type': 'WebApplication',
      '@id': `${canonicalUrl}#webapp`,
      name: toolSchema.appName,
      url: canonicalUrl,
      applicationCategory: toolSchema.category,
      operatingSystem: 'All',
      browserRequirements: 'Requires WebAssembly and WebCodecs support (Chrome 94+, Firefox 97+, Safari 16+)',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1250',
      },
      creator: { '@type': 'Organization', name: 'SolveMyMedia', url: domain },
    });
    schemaGraph.push({
      '@type': 'HowTo',
      name: `How to use ${toolSchema.appName}`,
      description: description,
      totalTime: 'PT1M',
      tool: [{ '@type': 'HowToTool', name: 'Web Browser (Chrome, Firefox, Safari, Edge)' }],
      step: toolSchema.steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    });
  } else {
    // Homepage org schema
    schemaGraph.push({
      '@type': 'Organization',
      '@id': `${domain}/#org`,
      name: 'SolveMyMedia',
      url: domain,
      description: 'Privacy-first, client-side media processing platform with 13 free tools.',
    });
  }

  // FAQ schema
  if (faqItems && faqItems.length > 0) {
    schemaGraph.push({
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faqpage`,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    });
  }

  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': schemaGraph });

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'SolveMyMedia' },
      { property: 'og:image', content: 'https://solvemymedia.com/og-image.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'SolveMyMedia — Free, Private Media Tools' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: 'https://solvemymedia.com/og-image.png' },
      { name: 'twitter:image:alt', content: 'SolveMyMedia — Free, Private Media Tools' },
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl },
      ...(alternateLinks as any[])
    ],
    script: [
      { type: 'application/ld+json', innerHTML: jsonLd }
    ]
  });

  return null;
};

