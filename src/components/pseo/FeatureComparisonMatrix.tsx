import React from 'react';
import { Check, X, Info } from 'lucide-react';

interface FeatureComparisonMatrixProps {
  title: string;
  features: { name: string; us: boolean; compA: boolean; compB: boolean }[];
}

export const FeatureComparisonMatrix: React.FC<FeatureComparisonMatrixProps> = ({ title, features }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px', overflowX: 'auto' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 48, textAlign: 'center' }}>{title}</h2>
      <div style={{ minWidth: 800, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: 'var(--bg-elevated)', padding: 24, fontWeight: 800, borderBottom: '1px solid var(--border-color)' }}>
          <div>Capability</div>
          <div style={{ color: 'var(--brand-primary)', textAlign: 'center' }}>SolveMyMedia</div>
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Cloud Tools</div>
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Desktop Apps</div>
        </div>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: 24, borderBottom: i === features.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500, color: 'var(--text-main)' }}>{f.name} <Info size={14} style={{color: 'var(--text-muted)'}}/></div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>{f.us ? <Check color="var(--success-color)"/> : <X color="var(--danger-color)"/>}</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>{f.compA ? <Check color="var(--success-color)"/> : <X color="var(--danger-color)"/>}</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>{f.compB ? <Check color="var(--success-color)"/> : <X color="var(--danger-color)"/>}</div>
          </div>
        ))}
      </div>
    </div>
  );
};