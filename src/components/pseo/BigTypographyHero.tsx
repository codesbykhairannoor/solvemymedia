import React from 'react';

interface BigTypographyHeroProps {
  text: string;
}

export const BigTypographyHero: React.FC<BigTypographyHeroProps> = ({ text }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '120px 24px', textAlign: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)', lineHeight: 1.2, letterSpacing: '-0.04em', maxWidth: 1200, margin: '0 auto', background: 'linear-gradient(to right, var(--text-main), var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {text}
      </h2>
    </div>
  );
};