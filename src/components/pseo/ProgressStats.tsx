import React from 'react';

interface ProgressStatsProps {
  title: string;
  description: string;
  stats: { label: string; percentage: number; color: string }[];
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({ title, description, stats }) => {
  return (
    <div style={{ marginBottom: '80px', padding: 'clamp(32px, 5vw, 64px)', background: 'var(--bg-card)', borderRadius: 32, border: '1px solid var(--border-color)' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
      <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: 48 }}>{description}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {stats.map((stat, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '1.1rem' }}>{stat.label}</span>
              <span style={{ fontWeight: 800, color: stat.color }}>{stat.percentage}%</span>
            </div>
            <div style={{ height: 16, background: 'var(--bg-elevated)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ width: `${stat.percentage}%`, height: '100%', background: stat.color, borderRadius: 8 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};