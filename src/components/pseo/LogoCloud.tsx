import React from 'react';

interface LogoCloudProps {
  title: string;
}

export const LogoCloud: React.FC<LogoCloudProps> = ({ title }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '48px 24px', background: 'var(--bg-elevated)', borderRadius: 32, textAlign: 'center' }}>
      <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 32 }}>{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px 64px', opacity: 0.5, filter: 'grayscale(100%)' }}>
        {/* Mock logos using pure text for now */}
        <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'serif' }}>ACME Corp</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 900, fontStyle: 'italic' }}>Globex</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>Soylent</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-2px' }}>Initech</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>Umbrella</div>
      </div>
    </div>
  );
};