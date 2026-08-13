import React from 'react';
import { CheckCircle } from 'lucide-react';

interface FeatureZigZagProps {
  title: string;
  description: string;
  items: { title: string; desc: string; imagePlaceholder: string }[];
}

export const FeatureZigZag: React.FC<FeatureZigZagProps> = ({ title, description, items }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: 700, margin: '0 auto' }}>{description}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
        {items.map((item, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={i} style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center', flexDirection: isEven ? 'row' : 'row-reverse' }}>
              <div style={{ flex: '1 1 300px', background: 'linear-gradient(135deg, rgba(168,85,247,0.1), transparent)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 24, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)', fontWeight: 700, fontSize: '1.2rem' }}>
                {item.imagePlaceholder}
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{item.title}</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>{item.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--brand-primary)', fontWeight: 600 }}>
                  <CheckCircle size={20} />
                  <span>Available on all platforms</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};