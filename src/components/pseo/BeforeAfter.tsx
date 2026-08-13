import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BeforeAfterProps {
  title: string;
  description: string;
  before: { label: string; value: string };
  after: { label: string; value: string };
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({ title, description, before, after }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)' }}>{description}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 250px', background: 'rgba(239, 68, 68, 0.05)', border: '2px dashed rgba(239, 68, 68, 0.3)', borderRadius: 24, padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--danger-color)', marginBottom: 16, textTransform: 'uppercase' }}>{before.label}</div>
          <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-main)' }}>{before.value}</div>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-elevated)', borderRadius: '50%', boxShadow: 'var(--shadow-md)', zIndex: 2 }}>
          <ArrowRight size={32} style={{ color: 'var(--brand-primary)' }} />
        </div>
        <div style={{ flex: '1 1 250px', background: 'rgba(34, 197, 94, 0.05)', border: '2px solid rgba(34, 197, 94, 0.5)', borderRadius: 24, padding: 48, textAlign: 'center', boxShadow: '0 10px 30px rgba(34,197,94,0.1)' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--success-color)', marginBottom: 16, textTransform: 'uppercase' }}>{after.label}</div>
          <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--brand-primary)' }}>{after.value}</div>
        </div>
      </div>
    </div>
  );
};