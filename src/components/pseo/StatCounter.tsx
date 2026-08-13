import React from 'react';

interface StatCounterProps {
  stats: { value: string; label: string }[];
}

export const StatCounter: React.FC<StatCounterProps> = ({ stats }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, justifyContent: 'space-evenly', background: 'var(--bg-elevated)', borderRadius: 32, padding: '48px 24px', border: '1px solid var(--border-color)' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: 'var(--brand-primary)', lineHeight: 1, marginBottom: 8, letterSpacing: '-0.03em' }}>{s.value}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};