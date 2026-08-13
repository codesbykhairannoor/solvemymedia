import React from 'react';
import { ShieldCheck, Lock, ServerOff } from 'lucide-react';

interface TrustBadgeBannerProps {
  title: string;
}

export const TrustBadgeBanner: React.FC<TrustBadgeBannerProps> = ({ title }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 24, padding: 32, display: 'flex', flexWrap: 'wrap', gap: 48, justifyContent: 'center', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>{title}</h3>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[
            { icon: <ShieldCheck />, text: 'Bank-grade Security' },
            { icon: <Lock />, text: 'End-to-End Private' },
            { icon: <ServerOff />, text: 'Zero Server Uploads' }
          ].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--success-color)', fontWeight: 600, fontSize: '1.05rem' }}>
              {b.icon} <span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};