import React from 'react';

interface DataMetricsRowProps {
  metrics: { value: string; label: string }[];
}

export const DataMetricsRow: React.FC<DataMetricsRowProps> = ({ metrics }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ padding: 32, background: 'var(--bg-card)', borderTop: '4px solid var(--brand-primary)', borderRadius: '0 0 16px 16px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.02em' }}>{m.value}</div>
            <div style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};