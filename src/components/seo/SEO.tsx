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
}

export const SEO: React.FC<SEOProps> = ({ titleKey, descKey, defaultTitle, defaultDesc }) => {
  const { currentLang, t, languages } = useLanguage();
  const location = useLocation();
  
  const title = t(titleKey) || defaultTitle || 'SolveMyMedia';
  const description = t(descKey) || defaultDesc || 'Optimize your media files';
  
  const domain = 'https://solvemymedia.com';
  
  const currentPath = location.pathname;
  let cleanPath = currentPath;
  if (currentLang !== 'en' && cleanPath.startsWith(`/${currentLang}`)) {
    cleanPath = cleanPath.slice(currentLang.length + 1) || '/';
  }
  
  // Ensure cleanPath always starts with /
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }

  // If this is a tool route, we need to extract the standard slug to localize it
  // cleanPath is like '/compress-video' or '/'
  let standardSlug = '';
  let basePath = cleanPath;
  if (cleanPath !== '/') {
    const parts = cleanPath.split('/').filter(Boolean);
    const slugCandidate = parts[0]; 
    if (slugCandidate) {
      // It might already be a localized slug, so we get the standard one
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

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: 'website' }
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl },
      ...alternateLinks
    ]
  });

  return null;
};
