import React from 'react';

interface NumberedListMinimalProps {
  title: string;
  items: { title: string; desc: string }[];
}

export const NumberedListMinimal: React.FC<NumberedListMinimalProps> = ({ title, items }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px', maxWidth: 800, margin: '0 auto 80px' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 48 }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 300, color: 'var(--brand-primary)', lineHeight: 1, fontFamily: 'serif' }}>0{i+1}</div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 12 }}>{item.title}</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};