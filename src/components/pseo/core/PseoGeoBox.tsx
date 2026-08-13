import React from 'react';
import { MapPin } from 'lucide-react';

interface PseoGeoBoxProps {
  title: string;
  description: string;
  badgeText?: string;
}

export const PseoGeoBox: React.FC<PseoGeoBoxProps> = ({
  title,
  description,
  badgeText = "Local Processing"
}) => {
  return (
    <section className="seo-section geo" style={{ padding: '120px 24px', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(225, 29, 72, 0.1)', color: 'var(--brand-primary)', borderRadius: 9999, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24, border: '1px solid rgba(225, 29, 72, 0.2)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <MapPin size={14} /> {badgeText}
        </div>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
          {title}
        </h2>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.7, opacity: 0.8, maxWidth: 700, margin: '0 auto', marginBottom: 64 }}>
          {description}
        </p>
        
        <div style={{ width: 140, height: 140, margin: '0 auto', borderRadius: '40px', background: 'var(--brand-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(225, 29, 72, 0.2)', transition: 'transform 0.5s ease' }} className="hover-lift">
           <MapPin size={64} color="white" />
        </div>
      </div>
    </section>
  );
};
