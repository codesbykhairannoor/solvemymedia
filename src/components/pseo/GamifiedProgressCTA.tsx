import React from 'react';
import { Unlock } from 'lucide-react';

interface GamifiedProgressCTAProps {
  title: string;
  description: string;
}

export const GamifiedProgressCTA: React.FC<GamifiedProgressCTAProps> = ({ title, description }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', background: 'var(--bg-card)', border: '1px solid var(--brand-primary)', borderRadius: 32, padding: 48, textAlign: 'center', boxShadow: '0 10px 40px rgba(168,85,247,0.2)' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--brand-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}><Unlock size={32} /></div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: 32 }}>{description}</p>
        <div style={{ height: 12, background: 'var(--bg-elevated)', borderRadius: 6, marginBottom: 16, overflow: 'hidden' }}>
          <div style={{ width: '85%', height: '100%', background: 'var(--brand-primary)', borderRadius: 6 }} />
        </div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>85% of users compress their first file within 2 minutes</div>
      </div>
    </div>
  );
};