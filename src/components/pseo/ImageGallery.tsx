import React from 'react';

interface ImageGalleryProps {
  title: string;
  images: string[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ title, images }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 48, textAlign: 'center' }}>{title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
        {images.map((img, i) => (
          <div key={i} style={{ height: 250, background: 'var(--bg-elevated)', borderRadius: 24, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontWeight: 600 }}>
            {img}
          </div>
        ))}
      </div>
    </div>
  );
};