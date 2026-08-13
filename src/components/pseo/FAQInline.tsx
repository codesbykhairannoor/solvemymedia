import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQInlineProps {
  title: string;
  description: string;
  faqs: { q: string; a: string }[];
}

export const FAQInline: React.FC<FAQInlineProps> = ({ title, description, faqs }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px', maxWidth: 800, margin: '0 auto 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)' }}>{description}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: 16 }}>
              <button 
                onClick={() => setOpenIdx(isOpen ? null : i)}
                style={{ width: '100%', padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '1.15rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
              >
                {faq.q}
                {isOpen ? <Minus size={20} style={{ color: 'var(--brand-primary)' }} /> : <Plus size={20} style={{ color: 'var(--text-muted)' }} />}
              </button>
              {isOpen && (
                <div style={{ padding: '0 0 16px 0', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};