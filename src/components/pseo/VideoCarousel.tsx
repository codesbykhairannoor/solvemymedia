import React from 'react';
import { Play } from 'lucide-react';

interface VideoCarouselProps {
  title: string;
  videos: { title: string; duration: string }[];
}

export const VideoCarousel: React.FC<VideoCarouselProps> = ({ title, videos }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px', overflow: 'hidden' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 32, paddingLeft: 24 }}>{title}</h2>
      <div style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 24, paddingLeft: 24, scrollbarWidth: 'none' }}>
        {videos.map((vid, i) => (
          <div key={i} style={{ flex: '0 0 300px', background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div style={{ height: 180, background: 'linear-gradient(45deg, var(--bg-elevated), transparent)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Play size={24} style={{marginLeft: 4}}/></div>
              <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '4px 8px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600 }}>{vid.duration}</div>
            </div>
            <div style={{ padding: 20 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>{vid.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};