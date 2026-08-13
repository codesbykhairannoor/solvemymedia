import React from 'react';

interface TweetGridProps {
  title: string;
  tweets: { name: string; handle: string; text: string; date: string }[];
}

export const TweetGrid: React.FC<TweetGridProps> = ({ title, tweets }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 48, textAlign: 'center' }}>{title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {tweets.map((tw, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: 24 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--brand-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{tw.name[0]}</div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{tw.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{tw.handle}</div>
              </div>
              <div style={{ marginLeft: 'auto', color: '#1DA1F2' }}>🐦</div>
            </div>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: 16 }}>{tw.text}</p>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{tw.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};