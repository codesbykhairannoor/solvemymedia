import React from 'react';

// Features & Benefits
import { FeatureGrid } from './FeatureGrid';
import { BentoCards } from './BentoCards';
import { FeatureZigZag } from './FeatureZigZag';
import { IconList } from './IconList';
import { AccordionFeatures } from './AccordionFeatures';
import { HighlightBox } from './HighlightBox';

// Data & Comparisons
import { StatBox } from './StatBox';
import { ProsConsTable } from './ProsConsTable';
import { ComparisonTable } from './ComparisonTable';
import { ProgressStats } from './ProgressStats';
import { PricingCards } from './PricingCards';

// Trust & Social Proof
import { TestimonialBlock } from './TestimonialBlock';
import { LogoCloud } from './LogoCloud';
import { UserReviewsGrid } from './UserReviewsGrid';
import { TrustBadgeBanner } from './TrustBadgeBanner';
import { StatCounter } from './StatCounter';

// Workflows & Instructions
import { HowToSteps } from './HowToSteps';
import { TimelineView } from './TimelineView';
import { CodeSnippet } from './CodeSnippet';
import { TerminalSteps } from './TerminalSteps';
import { BeforeAfter } from './BeforeAfter';

// Media & Content
import { HeroSplit } from './HeroSplit';
import { VideoTeaser } from './VideoTeaser';
import { QuoteBanner } from './QuoteBanner';
import { ImageGallery } from './ImageGallery';
import { AlertBox } from './AlertBox';

// CTAs
import { BottomCTA } from './BottomCTA';
import { NewsletterSignup } from './NewsletterSignup';
import { FloatingCTA } from './FloatingCTA';
import { FAQInline } from './FAQInline';

export interface BentoSection {
  type: string;
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
      gap: '24px'
    }}>
      {sections.map((section, index) => {
        const { type, data } = section;
        
        switch (type) {
          case 'stat-box': return <StatBox key={index} {...data} />;
          case 'pros-cons': return <ProsConsTable key={index} {...data} />;
          case 'how-to': return <HowToSteps key={index} {...data} />;
          case 'feature-grid': return <FeatureGrid key={index} {...data} />;
          case 'testimonial': return <TestimonialBlock key={index} {...data} />;
          case 'alert': return <AlertBox key={index} {...data} />;
          
          case 'bento-cards': return <BentoCards key={index} {...data} />;
          case 'feature-zigzag': return <FeatureZigZag key={index} {...data} />;
          case 'icon-list': return <IconList key={index} {...data} />;
          case 'accordion-features': return <AccordionFeatures key={index} {...data} />;
          case 'highlight-box': return <HighlightBox key={index} {...data} />;
          
          case 'comparison-table': return <ComparisonTable key={index} {...data} />;
          case 'progress-stats': return <ProgressStats key={index} {...data} />;
          case 'pricing-cards': return <PricingCards key={index} {...data} />;
          
          case 'logo-cloud': return <LogoCloud key={index} {...data} />;
          case 'user-reviews-grid': return <UserReviewsGrid key={index} {...data} />;
          case 'trust-badge-banner': return <TrustBadgeBanner key={index} {...data} />;
          case 'stat-counter': return <StatCounter key={index} {...data} />;
          
          case 'timeline-view': return <TimelineView key={index} {...data} />;
          case 'code-snippet': return <CodeSnippet key={index} {...data} />;
          case 'terminal-steps': return <TerminalSteps key={index} {...data} />;
          case 'before-after': return <BeforeAfter key={index} {...data} />;
          
          case 'hero-split': return <HeroSplit key={index} {...data} />;
          case 'video-teaser': return <VideoTeaser key={index} {...data} />;
          case 'quote-banner': return <QuoteBanner key={index} {...data} />;
          case 'image-gallery': return <ImageGallery key={index} {...data} />;
          
          case 'bottom-cta': return <BottomCTA key={index} {...data} />;
          case 'newsletter-signup': return <NewsletterSignup key={index} {...data} />;
          case 'floating-cta': return <FloatingCTA key={index} {...data} />;
          case 'faq-inline': return <FAQInline key={index} {...data} />;
          
          default:
            console.warn(\`BentoRenderer: Unknown component type '\${type}'\`);
            return null;
        }
      })}
    </div>
  );
};
