// @ts-nocheck
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { getStandardSlug } from '../../i18n/slugs';
import { LONG_TAIL_REGISTRY } from './long-tail/LongTailRegistry';

import { PseoFaq as _PseoFaq } from './core/PseoFaq';

interface PseoData {
  h1?: string;
  description?: string;
  features?: { title: string; desc: string }[];
  faqs?: { q: string; a: string }[];
  bespokeData?: any;
}

interface NativeLayoutRendererProps {
  data: PseoData;
}

export const NativeLayoutRenderer: React.FC<NativeLayoutRendererProps> = ({ data }) => {
  const { currentLang } = useLanguage();
  const location = useLocation();

  if (!data) return null;

  // ─── Check if this path is a registered page ───────────────────────
  const rawPath = location.pathname;
  // Normalize: strip locale prefix (e.g. /id/path → /path) and trailing slash
  const strippedPath = rawPath.replace(/^\/[a-z]{2}\//, '').replace(/^\/+/, '').replace(/\/$/, '');
  
  // Convert localized slug back to standard English slug for registry lookup
  const standardSlug = '/' + getStandardSlug(strippedPath, currentLang);
  
  const longTailEntry = LONG_TAIL_REGISTRY[standardSlug];


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

  // ─── Unmapped Routes Fallback ─────────────────────────────────────────────────
  // We completely removed the generic templates per the No Repetitive Templates rule!
  return null;
};
