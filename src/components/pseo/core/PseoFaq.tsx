import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

interface FaqItemData {
  q: string;
  a: string;
}

interface AccordionFaqItemProps {
  faq: FaqItemData;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionFaqItem: React.FC<AccordionFaqItemProps> = ({ faq, isOpen, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div style={{ 
      background: 'var(--bg-card)', 
      borderRadius: 24, 
      border: isOpen ? '1px solid var(--brand-primary)' : '1px solid var(--border-color)', 
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      boxShadow: isOpen ? '0 10px 30px rgba(0,0,0,0.05)' : 'none'
    }}>
      <button 
        onClick={onToggle}
        style={{ 
          width: '100%', 
          padding: '24px 32px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          background: 'transparent', 
          border: 'none', 
          cursor: 'pointer',
          textAlign: 'left',
          color: 'var(--text-main)'
        }}
      >
        <span style={{ fontSize: '1.15rem', fontWeight: 700, paddingRight: 24, lineHeight: 1.4 }}>{faq.q}</span>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: 32, 
          height: 32, 
          borderRadius: '50%', 
          background: isOpen ? 'var(--brand-gradient)' : 'rgba(128,128,128,0.1)',
          color: isOpen ? '#fff' : 'var(--text-muted)',
          transition: 'all 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          flexShrink: 0
        }}>
          <ChevronDown size={20} />
        </div>
      </button>
      <div 
        style={{ 
          height: isOpen ? (contentRef.current?.scrollHeight || 'auto') : 0, 
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
        }}
      >
        <div ref={contentRef} style={{ padding: '0 32px 32px 32px', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
          {faq.a}
        </div>
      </div>
    </div>
  );
};

interface PseoFaqProps {
  faqs: FaqItemData[];
}

export const PseoFaq: React.FC<PseoFaqProps> = ({ faqs }) => {
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="seo-section faq" style={{ padding: '80px 24px', background: 'var(--bg-app)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>
          {t('faqTitle') || "Frequently Asked Questions"}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {faqs.map((faq, i) => (
            <AccordionFaqItem 
              key={i} 
              faq={faq} 
              isOpen={activeFaq === i} 
              onToggle={() => setActiveFaq(activeFaq === i ? null : i)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
