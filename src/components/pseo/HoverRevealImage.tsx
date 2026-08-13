import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface HoverRevealImageProps {
  title: string;
  description: string;
  items: { title: string; desc: string; imageLabel: string }[];
}

export const HoverRevealImage: React.FC<HoverRevealImageProps> = ({ title, description, items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: 700, margin: '0 auto' }}>{description}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {items.map((item, i) => {
            const isActive = activeIndex === i;
            return (
              <div 
                key={i} 
                onMouseEnter={() => setActiveIndex(i)}
                style={{
                  padding: 24, borderRadius: 24, cursor: 'pointer', transition: 'all 0.3s ease',
                  background: isActive ? 'var(--bg-elevated)' : 'transparent',
                  border: isActive ? '1px solid var(--border-color)' : '1px solid transparent',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: isActive ? 'var(--brand-primary)' : 'var(--text-main)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                  {item.title}
                  {isActive && <ChevronRight size={20} />}
                </h3>
                {isActive && <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>}
              </div>
            );
          })}
        </div>
        <div style={{ flex: '1 1 300px', height: 400, background: 'linear-gradient(135deg, rgba(168,85,247,0.1), transparent)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)', fontWeight: 700, fontSize: '1.5rem', transition: 'all 0.3s ease' }}>
          {items[activeIndex]?.imageLabel}
        </div>
      </div>
    </div>
  );
};