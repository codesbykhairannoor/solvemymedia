import React from 'react';

interface QuoteBannerProps {
  quote: string;
  author: string;
}

export const QuoteBanner: React.FC<QuoteBannerProps> = ({ quote, author }) => {
  return (
    <div style={{ marginBottom: '80px', padding: 'clamp(40px, 6vw, 80px) 24px', background: 'var(--text-main)', color: 'var(--bg-main)', textAlign: 'center', borderRadius: 32 }}>
      <p style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.4, marginBottom: 24, maxWidth: 900, margin: '0 auto 32px' }}>"{quote}"</p>
      <div style={{ fontSize: '1.2rem', fontWeight: 700, opacity: 0.8 }}>— {author}</div>
    </div>
  );
};