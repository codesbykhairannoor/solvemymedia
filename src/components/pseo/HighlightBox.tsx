import React from 'react';
import { Rocket } from 'lucide-react';

interface HighlightBoxProps {
  title: string;
  description: string;
}

export const HighlightBox: React.FC<HighlightBoxProps> = ({ title, description }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ background: 'linear-gradient(45deg, var(--brand-primary), #EC4899)', borderRadius: 32, padding: 'clamp(40px, 6vw, 80px)', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(168,85,247,0.3)' }}>
        <Rocket size={64} style={{ color: '#fff', margin: '0 auto 24px', opacity: 0.9 }} />
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', marginBottom: 24, letterSpacing: '-0.03em' }}>{title}</h2>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>{description}</p>
      </div>
    </div>
  );
};