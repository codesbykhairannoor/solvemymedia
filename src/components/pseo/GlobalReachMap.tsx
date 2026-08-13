import React from 'react';

interface GlobalReachMapProps {
  title: string;
  stats: string;
}

export const GlobalReachMap: React.FC<GlobalReachMapProps> = ({ title, stats }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '80px 24px', background: 'radial-gradient(circle, var(--bg-elevated) 0%, var(--bg-main) 100%)', textAlign: 'center', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(var(--brand-primary) 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--text-main)', marginBottom: 24 }}>{title}</h2>
        <div style={{ fontSize: '1.5rem', color: 'var(--brand-primary)', fontWeight: 700, padding: '16px 32px', background: 'rgba(168,85,247,0.1)', display: 'inline-block', borderRadius: 99 }}>{stats}</div>
      </div>
    </div>
  );
};