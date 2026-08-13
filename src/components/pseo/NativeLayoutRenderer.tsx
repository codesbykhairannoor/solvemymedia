import React from 'react';
import { PseoHero } from './core/PseoHero';
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
  if (!data) return null;

  // Split features into two arrays if we have enough, to showcase different layout components
  const halfFeatures = data.features ? Math.ceil(data.features.length / 2) : 0;
  const firstHalfFeatures = data.features ? data.features.slice(0, halfFeatures) : [];
  const secondHalfFeatures = data.features ? data.features.slice(halfFeatures) : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px' }}>
      
      {/* 1. HERO */}
      {(data.h1 || data.description) && (
        <PseoHero 
          title={data.h1 || 'Optimized Media Tool'} 
          description={data.description || 'Process your files securely in the browser.'} 
        />
      )}

      {/* 2. FEATURE SPLIT (First half of features) */}
      {firstHalfFeatures.length > 0 && (
        <PseoFeatureSplit 
          title="Why Choose Our Tool?"
          description="Everything runs directly on your machine. No uploads, no waiting in queues."
          features={firstHalfFeatures}
        />
      )}

      {/* 3. DYNAMIC SECTION (How-To or Values Grid) */}
      {data.dynamicSection && (
        <>
          {data.dynamicSection.type === 'steps' && (
             <PseoHowTo 
               title={data.dynamicSection.heading} 
               steps={data.dynamicSection.items} 
             />
          )}
          {(data.dynamicSection.type === 'benefits' || data.dynamicSection.type === 'comparison') && (
             <PseoValuesGrid 
               title={data.dynamicSection.heading} 
               items={data.dynamicSection.items} 
             />
          )}
        </>
      )}

      {/* 4. PRIVACY / GEO (Second half of features, or default fallback) */}
      {secondHalfFeatures.length > 0 ? (
        <PseoPrivacySplit 
          title="Total Data Privacy"
          description={secondHalfFeatures[0]?.desc || 'Your files never leave your device. All processing happens locally in your browser memory.'}
          badgeText="Secure Architecture"
        />
      ) : (
        <PseoGeoBox 
          title="100% Offline Processing"
          description="Process files instantly without an internet connection after the page loads. No server limits, no bandwidth costs."
        />
      )}

      {/* 5. SLIM BANNER */}
      <PseoSlimBanner 
        title="Powered by WebAssembly"
        description="We bring desktop-class algorithms straight to your browser."
      />

      {/* 6. FAQ */}
      {data.faqs && data.faqs.length > 0 && (
        <PseoFaq faqs={data.faqs} />
      )}
      
    </div>
  );
};
