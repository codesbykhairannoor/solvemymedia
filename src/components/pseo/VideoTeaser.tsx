import React from 'react';
import { Play } from 'lucide-react';

interface VideoTeaserProps {
  title: string;
  description: string;
}

export const VideoTeaser: React.FC<VideoTeaserProps> = ({ title, description }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)' }}>{description}</p>
      </div>
      <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', height: 'clamp(300px, 50vw, 500px)', background: 'var(--bg-elevated)', borderRadius: 32, border: '1px solid var(--border-color)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(168,85,247,0.2), transparent)' }} />
        <button style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', cursor: 'pointer', zIndex: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          <Play size={32} style={{ marginLeft: 4 }} />
        </button>
      </div>
    </div>
  );
};