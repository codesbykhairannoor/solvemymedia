import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionFeaturesProps {
  title: string;
  description: string;
  items: { title: string; desc: string }[];
}

export const AccordionFeatures: React.FC<AccordionFeaturesProps> = ({ title, description, items }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px', maxWidth: 800, margin: '0 auto 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)' }}>{description}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, overflow: 'hidden' }}>
              <button 
                onClick={() => setOpenIdx(isOpen ? null : i)}
                style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: 700, cursor: 'pointer' }}
              >
                {item.title}
                <ChevronDown size={24} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
              </button>
              {isOpen && (
                <div style={{ padding: '0 24px 24px', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};