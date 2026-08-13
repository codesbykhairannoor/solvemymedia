import React from 'react';

interface BigTypographyHeroProps {
  text: string;
}

export const BigTypographyHero: React.FC<BigTypographyHeroProps> = ({ text }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '120px 24px', textAlign: 'center' }}>
      <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1, letterSpacing: '-0.04em', maxWidth: 1200, margin: '0 auto', background: 'linear-gradient(to right, var(--text-main), var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {text}
      </h1>
    </div>
  );
};