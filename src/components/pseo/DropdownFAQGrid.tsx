import React from 'react';

interface DropdownFAQGridProps {
  faqs: { q: string; a: string }[];
}

export const DropdownFAQGrid: React.FC<DropdownFAQGridProps> = ({ faqs }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 24, padding: 32 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 16 }}>{faq.q}</h3>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};