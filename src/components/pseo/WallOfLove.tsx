import React from 'react';
import { Heart } from 'lucide-react';

interface WallOfLoveProps {
  title: string;
  reviews: { text: string }[];
}

export const WallOfLove: React.FC<WallOfLoveProps> = ({ title, reviews }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', borderRadius: 99, fontWeight: 700, marginBottom: 16 }}>
          <Heart size={16} fill="currentColor" /> Wall of Love
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)' }}>{title}</h2>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
        {reviews.map((rev, i) => (
          <div key={i} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 99, padding: '12px 24px', fontSize: '0.95rem', color: 'var(--text-muted)', boxShadow: 'var(--shadow-sm)' }}>
            "{rev.text}"
          </div>
        ))}
      </div>
    </div>
  );
};