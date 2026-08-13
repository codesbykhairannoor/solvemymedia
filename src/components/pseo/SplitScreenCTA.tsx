import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SplitScreenCTAProps {
  title: string;
  buttonText: string;
}

export const SplitScreenCTA: React.FC<SplitScreenCTAProps> = ({ title, buttonText }) => {
  return (
    <div style={{ marginBottom: '80px', display: 'flex', flexWrap: 'wrap', borderRadius: 32, overflow: 'hidden', border: '1px solid var(--border-color)', margin: '0 24px 80px' }}>
      <div style={{ flex: '1 1 400px', background: 'var(--brand-primary)', padding: 'clamp(48px, 8vw, 96px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', marginBottom: 32, lineHeight: 1.1 }}>{title}</h2>
        <button style={{ alignSelf: 'flex-start', padding: '16px 32px', background: '#fff', color: 'var(--brand-primary)', border: 'none', borderRadius: 99, fontWeight: 800, fontSize: '1.1rem', display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }}>
          {buttonText} <ArrowRight size={20} />
        </button>
      </div>
      <div style={{ flex: '1 1 400px', background: 'var(--bg-elevated)', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        Visual Area
      </div>
    </div>
  );
};