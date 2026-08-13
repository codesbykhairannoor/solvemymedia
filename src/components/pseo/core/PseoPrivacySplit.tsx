import React from 'react';
import { Shield } from 'lucide-react';

interface PseoPrivacySplitProps {
  title: string;
  description: string;
  badgeText?: string;
}

export const PseoPrivacySplit: React.FC<PseoPrivacySplitProps> = ({
  title,
  description,
  badgeText = "Security First"
}) => {
  return (
    <section className="seo-section privacy" style={{ padding: '120px 24px', background: 'var(--bg-app)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
        
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(225, 29, 72, 0.1)', color: 'var(--brand-primary)', borderRadius: 9999, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24, border: '1px solid rgba(225, 29, 72, 0.2)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <Shield size={14} /> {badgeText}
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            {title}
          </h2>
          <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.7, opacity: 0.8 }}>
            {description}
          </p>
        </div>
        
        <div style={{ flex: '1 1 400px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
           <div style={{ width: 240, height: 240, borderRadius: 40, background: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', position: 'relative', zIndex: 1, transition: 'transform 0.5s ease' }} className="hover-lift">
              <Shield size={100} color="var(--brand-primary)" />
           </div>
        </div>
        
      </div>
    </section>
  );
};
