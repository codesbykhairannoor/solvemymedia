import React from 'react';
import { ArrowUpRight, Zap, Shield } from 'lucide-react';

interface BentoCardsProps {
  title: string;
  description: string;
  cards: { title: string; desc: string; icon: string }[];
}

export const BentoCards: React.FC<BentoCardsProps> = ({ title, description, cards }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: 700, margin: '0 auto' }}>{description}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {cards.map((card, i) => (
          <div key={i} style={{
            background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 24, padding: 32,
            display: 'flex', flexDirection: 'column', gap: 24, boxShadow: 'var(--shadow-sm)',
            gridColumn: i === 0 ? '1 / -1' : 'auto' // Make the first card span full width
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: 16, background: 'var(--brand-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={24} />
              </div>
              <ArrowUpRight size={24} style={{ color: 'var(--text-muted)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>{card.title}</h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};