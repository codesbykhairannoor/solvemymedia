import React from 'react';

interface StickySidebarContentProps {
  title: string;
  items: { title: string; desc: string }[];
}

export const StickySidebarContent: React.FC<StickySidebarContentProps> = ({ title, items }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'flex-start' }}>
      <div style={{ flex: '1 1 300px', position: 'sticky', top: 100 }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.1 }}>{title}</h2>
      </div>
      <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: 64 }}>
        {items.map((item, i) => (
          <div key={i}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{item.title}</h3>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};