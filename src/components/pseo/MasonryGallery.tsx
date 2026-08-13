import React from 'react';

interface MasonryGalleryProps {
  title: string;
  items: { label: string; height: number }[];
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({ title, items }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 48, textAlign: 'center' }}>{title}</h2>
      <div style={{ columnCount: 3, columnGap: 24 }}>
        {items.map((item, i) => (
          <div key={i} style={{ breakInside: 'avoid', marginBottom: 24, height: item.height, background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontWeight: 700 }}>
            {item.label}
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          div[style*="columnCount: 3"] { column-count: 2 !important; }
        }
        @media (max-width: 480px) {
          div[style*="columnCount: 3"] { column-count: 1 !important; }
        }
      `}</style>
    </div>
  );
};