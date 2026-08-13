import React from 'react';
import { Star } from 'lucide-react';

interface IconListProps {
  title: string;
  description: string;
  items: { title: string; desc: string }[];
}

export const IconList: React.FC<IconListProps> = ({ title, description, items }) => {
  return (
    <div style={{ marginBottom: '80px', padding: 'clamp(32px, 5vw, 64px)', background: 'var(--bg-elevated)', borderRadius: 32, border: '1px solid var(--border-color)' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
      <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: 48 }}>{description}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--brand-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Star size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};