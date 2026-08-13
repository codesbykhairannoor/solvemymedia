import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSplitProps {
  title: string;
  description: string;
  ctaText: string;
  imagePlaceholder: string;
}

export const HeroSplit: React.FC<HeroSplitProps> = ({ title, description, ctaText, imagePlaceholder }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 400px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)', lineHeight: 1.2, marginBottom: 24, letterSpacing: '-0.03em' }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40 }}>{description}</p>
        <button style={{ padding: '16px 32px', background: 'var(--text-main)', color: 'var(--bg-main)', border: 'none', borderRadius: 99, fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          {ctaText} <ArrowRight size={20} />
        </button>
      </div>
      <div style={{ flex: '1 1 400px', height: 400, background: 'linear-gradient(45deg, var(--bg-elevated), var(--bg-card))', borderRadius: 32, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-muted)' }}>
        {imagePlaceholder}
      </div>
    </div>
  );
};