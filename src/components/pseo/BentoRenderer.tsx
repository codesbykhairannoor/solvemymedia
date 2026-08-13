import React from 'react';

// === BATCH 1 COMPONENTS (30) ===
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

// === BATCH 2 ADVANCED COMPONENTS (24) ===
// Advanced Media & Interactive
import { HoverRevealImage } from './HoverRevealImage';
import { ScrollingMarquee } from './ScrollingMarquee';
import { InteractiveDemoTeaser } from './InteractiveDemoTeaser';
import { MasonryGallery } from './MasonryGallery';
import { VideoCarousel } from './VideoCarousel';

// Advanced Social Proof
import { WallOfLove } from './WallOfLove';
import { TweetGrid } from './TweetGrid';
import { CaseStudyHighlight } from './CaseStudyHighlight';
import { PressLogos } from './PressLogos';
import { VideoTestimonial } from './VideoTestimonial';

// Advanced Value & Data
import { RoiCalculator } from './RoiCalculator';
import { DataMetricsRow } from './DataMetricsRow';
import { FeatureComparisonMatrix } from './FeatureComparisonMatrix';
import { SecurityArchitecture } from './SecurityArchitecture';
import { GlobalReachMap } from './GlobalReachMap';

// Advanced Typography & Content
import { BigTypographyHero } from './BigTypographyHero';
import { NumberedListMinimal } from './NumberedListMinimal';
import { OffsetGridContent } from './OffsetGridContent';
import { GradientTextFeature } from './GradientTextFeature';
import { DropdownFAQGrid } from './DropdownFAQGrid';

// Advanced CTAs & Structure
import { StickySidebarContent } from './StickySidebarContent';
import { SplitScreenCTA } from './SplitScreenCTA';
import { GamifiedProgressCTA } from './GamifiedProgressCTA';
import { MinimalFooterBento } from './MinimalFooterBento';

export interface BentoSection {
  type: string;
  data: any;
}

interface BentoRendererProps {
  sections: BentoSection[];
  pageTitle?: string;
}

const normalizeBentoData = (type: string, rawData: any) => {
  if (!rawData) return {};
  const data = { ...rawData };

  // 1. Global mappings
  if (data.content && !data.description) data.description = data.content;
  if (data.subtitle && !data.description) data.description = data.subtitle;
  if (data.buttonText && !data.ctaText) data.ctaText = data.buttonText;
  
  // 2. Component specific fixes
  if (type === 'big-typo-hero' && data.title && !data.text) data.text = data.title;
  if (type === 'hero-split' && !data.imagePlaceholder) data.imagePlaceholder = '✨';
  
  // 3. Array deep mapping
  const mapArrayItem = (obj: any) => typeof obj === 'object' ? {
    ...obj,
    desc: obj.desc || obj.description || obj.content || "",
    description: obj.description || obj.desc || obj.content || "",
    time: obj.time || obj.date || "Step",
    imagePlaceholder: obj.imagePlaceholder || "🚀"
  } : obj;

  if (Array.isArray(data.events)) data.events = data.events.map(mapArrayItem);
  if (Array.isArray(data.cards)) data.cards = data.cards.map(mapArrayItem);
  if (Array.isArray(data.steps)) data.steps = data.steps.map(mapArrayItem);
  if (Array.isArray(data.features)) data.features = data.features.map(mapArrayItem);
  if (Array.isArray(data.items)) data.items = data.items.map(mapArrayItem);

  return data;
};

export const BentoRenderer: React.FC<BentoRendererProps> = ({ sections, pageTitle }) => {
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return null;
  }

  return (
    <div className="bento-container" style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: '40px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '80px'
    }}>
      {sections.map((section, index) => {
        const { type, data: rawData } = section;
        const data = normalizeBentoData(type, rawData);

        // Skip redundant top-level hero section
        if (index === 0 && (type === 'hero-split' || type === 'big-typo-hero')) {
          const sectionTitle = (data.title || data.text || '').toLowerCase().trim();
          const cleanPageTitle = (pageTitle || '').toLowerCase().trim();
          if (cleanPageTitle && (sectionTitle === cleanPageTitle || sectionTitle.includes(cleanPageTitle) || cleanPageTitle.includes(sectionTitle))) {
            return null;
          }
        }
        
        switch (type) {
          // BATCH 1
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
          
          // BATCH 2
          case 'hover-reveal-image': return <HoverRevealImage key={index} {...data} />;
          case 'scrolling-marquee': return <ScrollingMarquee key={index} {...data} />;
          case 'interactive-demo': return <InteractiveDemoTeaser key={index} {...data} />;
          case 'masonry-gallery': return <MasonryGallery key={index} {...data} />;
          case 'video-carousel': return <VideoCarousel key={index} {...data} />;
          
          case 'wall-of-love': return <WallOfLove key={index} {...data} />;
          case 'tweet-grid': return <TweetGrid key={index} {...data} />;
          case 'case-study': return <CaseStudyHighlight key={index} {...data} />;
          case 'press-logos': return <PressLogos key={index} {...data} />;
          case 'video-testimonial': return <VideoTestimonial key={index} {...data} />;
          
          case 'roi-calculator': return <RoiCalculator key={index} {...data} />;
          case 'data-metrics-row': return <DataMetricsRow key={index} {...data} />;
          case 'feature-comparison': return <FeatureComparisonMatrix key={index} {...data} />;
          case 'security-arch': return <SecurityArchitecture key={index} {...data} />;
          case 'global-reach': return <GlobalReachMap key={index} {...data} />;
          
          case 'big-typo-hero': return <BigTypographyHero key={index} {...data} />;
          case 'numbered-list': return <NumberedListMinimal key={index} {...data} />;
          case 'offset-grid': return <OffsetGridContent key={index} {...data} />;
          case 'gradient-text': return <GradientTextFeature key={index} {...data} />;
          case 'dropdown-faq': return <DropdownFAQGrid key={index} {...data} />;
          
          case 'sticky-sidebar': return <StickySidebarContent key={index} {...data} />;
          case 'split-screen-cta': return <SplitScreenCTA key={index} {...data} />;
          case 'gamified-progress': return <GamifiedProgressCTA key={index} {...data} />;
          case 'minimal-footer': return <MinimalFooterBento key={index} {...data} />;

          default:
            console.warn(`BentoRenderer: Unknown component type '${type}'`);
            return null;
        }
      })}
    </div>
  );
};
