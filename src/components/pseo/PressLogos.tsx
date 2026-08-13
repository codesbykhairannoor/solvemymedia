import React from 'react';

interface PressLogosProps {
  title: string;
}

export const PressLogos: React.FC<PressLogosProps> = ({ title }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px', textAlign: 'center' }}>
      <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 32 }}>{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px 80px', opacity: 0.6, filter: 'grayscale(100%)' }}>
        <div style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'serif' }}>TechCrunch</div>
        <div style={{ fontSize: '2rem', fontWeight: 900, fontStyle: 'italic' }}>Forbes</div>
        <div style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-2px' }}>WIRED</div>
        <div style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'monospace' }}>THE VERGE</div>
      </div>
    </div>
  );
};