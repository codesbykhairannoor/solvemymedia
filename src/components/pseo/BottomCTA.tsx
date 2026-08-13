import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BottomCTAProps {
  title: string;
  description: string;
  buttonText: string;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ title, description, buttonText }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ background: 'linear-gradient(135deg, var(--bg-elevated), var(--bg-card))', border: '1px solid var(--border-color)', borderRadius: 32, padding: 'clamp(48px, 8vw, 96px) 24px', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--text-main)', marginBottom: 24, letterSpacing: '-0.03em' }}>{title}</h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto 48px', lineHeight: 1.6 }}>{description}</p>
        <button style={{ padding: '20px 48px', background: 'var(--brand-primary)', color: '#fff', border: 'none', borderRadius: 99, fontSize: '1.2rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 12, cursor: 'pointer', boxShadow: '0 10px 30px rgba(168,85,247,0.4)' }}>
          {buttonText} <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};