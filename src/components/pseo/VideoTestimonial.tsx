import React from 'react';
import { Play } from 'lucide-react';

interface VideoTestimonialProps {
  quote: string;
  author: string;
}

export const VideoTestimonial: React.FC<VideoTestimonialProps> = ({ quote, author }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', background: 'var(--bg-card)', borderRadius: 32, border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <div style={{ height: 400, background: 'linear-gradient(45deg, var(--bg-elevated), transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--brand-primary)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 30px rgba(168,85,247,0.4)' }}>
            <Play size={32} style={{marginLeft: 4}}/>
          </button>
        </div>
        <div style={{ padding: '40px 32px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-main)', fontStyle: 'italic', marginBottom: 16 }}>"{quote}"</p>
          <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>— {author}</div>
        </div>
      </div>
    </div>
  );
};