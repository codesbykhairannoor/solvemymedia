import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FloatingCTAProps {
  title: string;
  buttonText: string;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ title, buttonText }) => {
  return (
    <div style={{ position: 'sticky', bottom: 24, left: 0, right: 0, padding: '0 24px', zIndex: 100, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <div style={{ background: 'rgba(20,20,20,0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 99, padding: '12px 12px 12px 24px', display: 'flex', alignItems: 'center', gap: 24, pointerEvents: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
        <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.05rem' }}>{title}</span>
        <button style={{ background: 'var(--brand-primary)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 99, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          {buttonText} <ArrowUpRight size={18} />
        </button>
      </div>
    </div>
  );
};