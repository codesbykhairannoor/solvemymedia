// @ts-nocheck
import React from 'react';
import { useLocation } from 'react-router-dom';
import { LONG_TAIL_REGISTRY } from './LongTailRegistry';
import { PseoFaq } from '../core/PseoFaq';

interface LongTailRendererProps {
  data: any;
}

/**
 * LongTailRenderer — renders bespoke, path-specific sections for long-tail SEO pages.
 * Falls back to null if no registry entry is found (caller should use NativeLayoutRenderer instead).
 */
export const LongTailRenderer: React.FC<LongTailRendererProps> = ({ data }) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Strip trailing slash and locale prefix (e.g. /id/reduce-mp4... -> /reduce-mp4...)
  const normalizedPath = '/' + pathname.replace(/^\/[a-z]{2}\//, '').replace(/^\//, '');

  const entry = LONG_TAIL_REGISTRY[normalizedPath];
  if (!entry) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', paddingBottom: '80px' }}>
      {entry.sections.map((SectionComponent, idx) => (
        <SectionComponent key={idx} data={data} />
      ))}

      {/* FAQ always rendered last */}
      {data.faqs && data.faqs.length > 0 && (
        <div style={{ padding: '0 24px' }}>
          <PseoFaq faqs={data.faqs} />
        </div>
      )}
    </div>
  );
};
