import React from 'react';

interface OffsetGridContentProps {
  title: string;
  description: string;
}

export const OffsetGridContent: React.FC<OffsetGridContentProps> = ({ title, description }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: 900, height: 500 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '60%', height: 400, background: 'var(--bg-elevated)', borderRadius: 32, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Image Area</div>
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '55%', background: 'var(--bg-card)', borderRadius: 32, padding: 48, boxShadow: '0 30px 60px rgba(0,0,0,0.4)', border: '1px solid var(--brand-primary)', zIndex: 2 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{description}</p>
        </div>
      </div>
    </div>
  );
};