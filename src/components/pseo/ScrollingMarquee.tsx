import React from 'react';

interface ScrollingMarqueeProps {
  items: string[];
}

export const ScrollingMarquee: React.FC<ScrollingMarqueeProps> = ({ items }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '40px 0', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex' }}>
      <div style={{ display: 'inline-flex', animation: 'scroll 20s linear infinite' }}>
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} style={{ display: 'inline-flex', alignItems: 'center', padding: '0 40px', fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)', opacity: 0.8 }}>
            <span style={{ color: 'var(--brand-primary)', marginRight: 24 }}>✦</span> {item}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
};