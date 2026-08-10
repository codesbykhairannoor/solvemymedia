import { useHead } from '@unhead/react';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';
import { useLocation } from 'react-router-dom';

export const useSeoMeta = (title: string, description: string) => {
  const location = useLocation();
  const pathname = location.pathname;
  
  let cleanPath = pathname;
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0 && SUPPORTED_LANGUAGES.some(l => l.code === pathSegments[0])) {
    cleanPath = '/' + pathSegments.slice(1).join('/');
  }
  if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;

  const domain = typeof window !== 'undefined' ? window.location.origin : 'https://solvemymedia.com';

  const hreflangs = SUPPORTED_LANGUAGES.map(lang => ({
    rel: 'alternate',
    hreflang: lang.code,
    href: lang.code === 'en' ? `${domain}${cleanPath}` : `${domain}/${lang.code}${cleanPath}`
  }));

  hreflangs.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${domain}${cleanPath}`
  });

  useHead({
    title,
    meta: [
      { name: 'description', content: description }
    ],
    link: [
      { rel: 'canonical', href: `${domain}${pathname}` },
      ...hreflangs
    ]
  });
};
