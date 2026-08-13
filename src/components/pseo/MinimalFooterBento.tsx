import React from 'react';

interface MinimalFooterBentoProps {
  title: string;
  features: string[];
}

export const MinimalFooterBento: React.FC<MinimalFooterBentoProps> = ({ title, features }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ background: 'var(--bg-elevated)', borderRadius: 32, padding: 'clamp(40px, 6vw, 80px)', border: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 48, textAlign: 'center' }}>{title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 16, textAlign: 'center', fontWeight: 600, color: 'var(--text-main)', border: '1px solid var(--border-color)' }}>
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};