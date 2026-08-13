import React from 'react';
import { Check, X } from 'lucide-react';

interface ComparisonTableProps {
  title: string;
  description: string;
  features: string[];
  us: boolean[];
  them: boolean[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ title, description, features, us, them }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)' }}>{description}</p>
      </div>
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 24, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', background: 'var(--bg-card)', padding: '24px', borderBottom: '1px solid var(--border-color)', fontWeight: 800, color: 'var(--text-main)', fontSize: '1.1rem' }}>
          <div>Feature</div>
          <div style={{ textAlign: 'center', color: 'var(--brand-primary)' }}>SolveMyMedia</div>
          <div style={{ textAlign: 'center' }}>Others</div>
        </div>
        {features.map((feat, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '24px', borderBottom: i === features.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-main)', fontWeight: 500 }}>{feat}</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>{us[i] ? <Check style={{ color: 'var(--success-color)' }} /> : <X style={{ color: 'var(--danger-color)' }} />}</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>{them[i] ? <Check style={{ color: 'var(--success-color)' }} /> : <X style={{ color: 'var(--danger-color)' }} />}</div>
          </div>
        ))}
      </div>
    </div>
  );
};