import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { PseoHowTo } from './core/PseoHowTo';
import { PseoFeatureSplit } from './core/PseoFeatureSplit';
import { PseoPrivacySplit } from './core/PseoPrivacySplit';
import { PseoGeoBox } from './core/PseoGeoBox';
import { PseoValuesGrid } from './core/PseoValuesGrid';
import { PseoSlimBanner } from './core/PseoSlimBanner';
import { PseoFaq } from './core/PseoFaq';

interface PseoData {
  h1?: string;
  description?: string;
  features?: { title: string; desc: string }[];
  faqs?: { q: string; a: string }[];
  dynamicSection?: {
    type: 'steps' | 'benefits' | 'comparison';
    heading: string;
    items: { title: string; content: string }[];
  };
}

interface NativeLayoutRendererProps {
  data: PseoData;
}

export const NativeLayoutRenderer: React.FC<NativeLayoutRendererProps> = ({ data }) => {
  const { t } = useLanguage();
  if (!data) return null;

  // Split features into two arrays if we have enough, to showcase different layout components
  const halfFeatures = data.features && data.features.length > 0 ? Math.ceil(data.features.length / 2) : 0;
  const firstHalfFeatures = data.features ? data.features.slice(0, halfFeatures) : [];
  const secondHalfFeatures = data.features ? data.features.slice(halfFeatures) : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px' }}>
      
      {/* 1. DYNAMIC SECTION (How-To or Values Grid) */}
      {data.dynamicSection && (
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

      {/* 2. FEATURE SPLIT (First half of features, if any exist in the JSON) */}
      {firstHalfFeatures.length > 0 && (
        <PseoFeatureSplit 
          title={t('cvPerfTitle') || "Why Choose Our Tool?"}
          description={t('cvPerfDesc') || "Everything runs directly on your machine. No uploads, no waiting in queues."}
          features={firstHalfFeatures}
        />
      )}

      {/* 3. PRIVACY / SECURITY SECTION (Generic localized wrapper) */}
      <PseoPrivacySplit 
        title={t('compVPrivacyTitle') || "Total Data Privacy"}
        description={t('compVPrivacyDesc') || "Your files never leave your device. All processing happens locally in your browser memory."}
        badgeText={t('compVPrivacyBadge1') || "Secure Architecture"}
      />

      {/* 4. OFFLINE GEO BOX (Generic localized wrapper) */}
      <PseoGeoBox 
        title={t('compVGeoTitle2') || "100% Offline Processing"}
        description={t('compVGeoDesc2') || "Process files instantly without an internet connection after the page loads. No server limits, no bandwidth costs."}
        badgeText={t('homeSecurityBadge') || "Local Processing"}
      />

      {/* 5. SLIM BANNER */}
      <PseoSlimBanner 
        title={t('homeArchTitle') || "Powered by WebAssembly"}
        description={t('homeArchDesc') || "We bring desktop-class algorithms straight to your browser."}
        tags={[t('compVPrivacyBadge1') || 'Offline Processing', t('compVPrivacyBadge2') || 'No Uploads', t('compVPrivacyBadge3') || 'Browser Sandbox']}
      />

      {/* 6. FAQ */}
      {data.faqs && data.faqs.length > 0 && (
        <PseoFaq faqs={data.faqs} />
      )}
      
    </div>
  );
};
