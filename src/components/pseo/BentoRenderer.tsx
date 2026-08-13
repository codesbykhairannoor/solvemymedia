import React from 'react';
import { StatBox } from './StatBox';
import { ProsConsTable } from './ProsConsTable';
import { HowToSteps } from './HowToSteps';
import { FeatureGrid } from './FeatureGrid';
import { TestimonialBlock } from './TestimonialBlock';
import { AlertBox } from './AlertBox';

export interface BentoSection {
  type: 'stat-box' | 'pros-cons' | 'how-to' | 'feature-grid' | 'testimonial' | 'alert';
  data: any;
}

interface BentoRendererProps {
  sections: BentoSection[];
}

export const BentoRenderer: React.FC<BentoRendererProps> = ({ sections }) => {
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return null;
  }

  return (
    <div className="bento-container" style={{
      maxWidth: 1000,
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px' // the children themselves have 80px marginBottom so this gap is just extra safety
    }}>
      {sections.map((section, index) => {
        const { type, data } = section;
        
        switch (type) {
          case 'stat-box':
            return <StatBox key={index} {...data} />;
          case 'pros-cons':
            return <ProsConsTable key={index} {...data} />;
          case 'how-to':
            return <HowToSteps key={index} {...data} />;
          case 'feature-grid':
            return <FeatureGrid key={index} {...data} />;
          case 'testimonial':
            return <TestimonialBlock key={index} {...data} />;
          case 'alert':
            return <AlertBox key={index} {...data} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
