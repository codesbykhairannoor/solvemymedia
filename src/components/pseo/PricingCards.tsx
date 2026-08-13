import React from 'react';
import { Check } from 'lucide-react';

interface PricingCardsProps {
  title: string;
  description: string;
}

export const PricingCards: React.FC<PricingCardsProps> = ({ title, description }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)' }}>{description}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
        <div style={{ flex: '1 1 300px', maxWidth: 400, background: 'var(--bg-elevated)', border: '1px solid var(--brand-primary)', borderRadius: 32, padding: 40, position: 'relative', boxShadow: '0 10px 30px rgba(168,85,247,0.1)' }}>
          <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', background: 'var(--brand-primary)', color: '#fff', padding: '4px 16px', borderRadius: 99, fontWeight: 700, fontSize: '0.9rem' }}>100% FREE</div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 8 }}>Free Forever</h3>
          <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: 24 }}>$0</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {['Unlimited Processing', 'No File Size Limits', '100% Private (Local)', 'No Watermarks'].map((f, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, color: 'var(--text-muted)', fontSize: '1.1rem' }}><Check style={{ color: 'var(--brand-primary)' }} /> {f}</li>
            ))}
          </ul>
          <button style={{ width: '100%', padding: '16px', background: 'var(--brand-primary)', color: '#fff', border: 'none', borderRadius: 16, fontSize: '1.1rem', fontWeight: 700 }}>Start Using Now</button>
        </div>
      </div>
    </div>
  );
};