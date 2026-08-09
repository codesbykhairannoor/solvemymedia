import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function SeoArticle({ currentLangCode }) {
  const { t } = useTranslation();
  const keywordString = t('seoKeywords', { returnObjects: true });
  const keywordsStringRaw = typeof keywordString === 'string' ? keywordString : 'qr code generator';
  const keywordsList = keywordsStringRaw.split(',').map(k => k.trim());
  
  const tagTitles = {
    en: "Popular Searches",
    id: "Pencarian Populer",
    fr: "Recherches Populaires",
    es: "Búsquedas Populares",
    de: "Beliebte Suchanfragen",
    it: "Ricerche Popolari",
    pt: "Pesquisas Populares",
    ja: "人気の検索",
    ko: "인기 검색어",
    zh: "热门搜索"
  };
  const sectionTitle = tagTitles[currentLangCode] || tagTitles['en'];

  return (
    <section className="w-full bg-white dark:bg-zinc-950 py-12 px-6 border-t border-blue-100 dark:border-[#102040]">
      <Helmet>
        <meta name="keywords" content={keywordsStringRaw} />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-6">
          {sectionTitle}
        </h3>
        <div className="text-[11px] leading-relaxed text-zinc-400 dark:text-zinc-500 font-sans">
          {keywordsList.map((kw, idx) => (
            <React.Fragment key={idx}>
              <span className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-default">
                {kw}
              </span>
              {idx < keywordsList.length - 1 && (
                <span className="mx-2 opacity-30">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
