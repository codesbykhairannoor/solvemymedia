// @ts-nocheck
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { PseoHowTo } from './core/PseoHowTo';
import { PseoFeatureSplit } from './core/PseoFeatureSplit';
import { PseoPrivacySplit } from './core/PseoPrivacySplit';
import { PseoGeoBox } from './core/PseoGeoBox';
import { PseoValuesGrid } from './core/PseoValuesGrid';
import { PseoSlimBanner } from './core/PseoSlimBanner';
import { PseoFaq } from './core/PseoFaq';
import { LONG_TAIL_REGISTRY } from './long-tail/LongTailRegistry';
import { PseoFaq as _PseoFaq } from './core/PseoFaq';

interface PseoData {
  h1?: string;
  description?: string;
  features?: { title: string; desc: string }[];
  faqs?: { q: string; a: string }[];
  dynamicSection?: {
    type: string;
    heading: string;
    items: { title: string; content: string }[];
  };
  bentoSections?: { type: string; data: any }[];
}

interface NativeLayoutRendererProps {
  data: PseoData;
}

export const NativeLayoutRenderer: React.FC<NativeLayoutRendererProps> = ({ data }) => {
  const { t } = useLanguage();
  const location = useLocation();

  if (!data) return null;

  // ─── Check if this path is a registered long-tail page ───────────────────────
  const rawPath = location.pathname;
  // Normalize: strip locale prefix (e.g. /id/path → /path) and trailing slash
  const normalizedPath = '/' + rawPath.replace(/^\/[a-z]{2}\//, '').replace(/^\/+/, '').replace(/\/$/, '');
  const longTailEntry = LONG_TAIL_REGISTRY[normalizedPath];

  // ─── Bespoke Long-Tail Renderer ───────────────────────────────────────────────
  if (longTailEntry) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', paddingBottom: '80px' }}>
        {longTailEntry.sections.map((SectionComponent, idx) => (
          <SectionComponent key={idx} data={data} />
        ))}
        {data.faqs && data.faqs.length > 0 && (
          <div style={{ padding: '0 24px' }}>
            <_PseoFaq faqs={data.faqs} />
          </div>
        )}
      </div>
    );
  }

  // ─── Generic Fallback Renderer (all other pages) ──────────────────────────────
  const parseList = (list: any[]) => {
    if (!list || !Array.isArray(list)) return [];
    return list.map(item => {
      if (typeof item === 'string') {
        const parts = item.split(' - ');
        return { title: parts[0], content: parts[1] || parts[0] };
      }
      return { 
        title: item.title || item.date || item.label || '', 
        content: item.content || item.description || item.desc || item.value || '' 
      };
    });
  };

  const getListData = (sData: any) => {
    return sData.features || sData.items || sData.steps || sData.cards || sData.events || sData.stats || sData.points || [];
  };

  const renderSection = (section: { type: string; data: any }, index: number) => {
    const { type, data: sData } = section;
    
    if (['hero-split', 'big-typography-hero', 'big-typo-hero'].includes(type)) return null;
    if (sData.title && data.h1 && sData.title.toLowerCase() === data.h1.toLowerCase()) return null;

    const rawList = getListData(sData);
    const parsedList = parseList(rawList);

    if (['security-arch', 'alert', 'trust-badge', 'highlight-box'].includes(type)) {
      return (
        <PseoPrivacySplit 
          key={index}
          title={sData.title || t('compVPrivacyTitle') || "Security Focus"}
          description={sData.description || sData.content || ""}
          badgeText={sData.label || sData.badge || t('compVPrivacyBadge1') || "Secure Architecture"}
        />
      );
    }

    if (['global-reach-map', 'stat-counter', 'progress-stats'].includes(type)) {
      return (
        <PseoGeoBox 
          key={index}
          title={sData.title || "Global Reach"}
          description={sData.description || sData.content || ""}
          badgeText={sData.badge || "Local Processing"}
        />
      );
    }

    if (['bottom-cta', 'floating-cta', 'gamified-progress', 'split-screen-cta', 'newsletter-signup'].includes(type)) {
      return (
        <PseoSlimBanner 
          key={index}
          title={sData.title || "Powered by WebAssembly"}
          description={sData.description || sData.content || ""}
          tags={[sData.buttonText || 'Try Now']}
        />
      );
    }

    if (['terminal-steps', 'how-to-steps', 'numbered-list', 'timeline-view'].includes(type)) {
      return (
        <PseoHowTo 
          key={index}
          title={sData.title || "How it Works"}
          steps={parsedList}
          badgeText={sData.badge || "Quick Guide"}
        />
      );
    }

    if (['feature-zigzag', 'feature-comparison-matrix', 'pros-cons-table', 'before-after', 'bento-cards'].includes(type)) {
      return (
        <PseoFeatureSplit 
          key={index}
          title={sData.title || "Why Choose Our Tool?"}
          description={sData.description || sData.content || ""}
          features={parsedList}
        />
      );
    }

    return (
      <PseoValuesGrid 
        key={index}
        title={sData.title || "Key Benefits"}
        items={parsedList.length > 0 
          ? parsedList 
          : [{ title: sData.title || "", content: sData.description || sData.content || "" }]}
      />
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px' }}>
      {data.bentoSections && data.bentoSections.map((section, idx) => renderSection(section, idx))}

      {!data.bentoSections && data.dynamicSection && (
        <>
          {data.dynamicSection.type === 'steps' ? (
             <PseoHowTo 
               title={data.dynamicSection.heading} 
               steps={data.dynamicSection.items} 
               badgeText={t('compVHowToTitle') || "Quick Guide"}
             />
          ) : (
             <PseoValuesGrid 
               title={data.dynamicSection.heading} 
               items={data.dynamicSection.items} 
             />
          )}
        </>
      )}

      {data.faqs && data.faqs.length > 0 && (
        <PseoFaq faqs={data.faqs} />
      )}
    </div>
  );
};
