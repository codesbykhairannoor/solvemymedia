import React from 'react';
import { ShieldCheck, Zap, Heart } from 'lucide-react';

interface ValueItem {
  title: string;
  content: string;
}

interface PseoValuesGridProps {
  title: string;
  items: ValueItem[];
}

const icons = [ShieldCheck, Zap, Heart];

export const PseoValuesGrid: React.FC<PseoValuesGridProps> = ({
  title,
  items
}) => {
  return (
    <section className="seo-section values" style={{ padding: '80px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', lineHeight: 1.2 }}>
          {title}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {items?.map((val, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div key={idx} style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', transition: 'transform 0.3s ease', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }} className="hover-lift">
                <Icon size={32} color="var(--brand-primary)" style={{ marginBottom: 24 }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)' }}>{val.title}</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{val.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
