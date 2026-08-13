import React from 'react';
import { Zap, CheckCircle2 } from 'lucide-react';

interface Feature {
  title: string;
  desc?: string;
}

interface PseoFeatureSplitProps {
  title: string;
  description: string;
  badgeText?: string;
  features: Feature[];
}

export const PseoFeatureSplit: React.FC<PseoFeatureSplitProps> = ({
  title,
  description,
  badgeText = "Lightning Fast",
  features
}) => {
  return (
    <section className="seo-section performance" style={{ padding: '120px 24px', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ flex: '1 1 400px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 240, height: 240, borderRadius: '50%', background: 'var(--bg-app)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', zIndex: 1, transition: 'transform 0.5s ease' }} className="hover-lift">
            <Zap size={100} color="var(--brand-primary)" />
          </div>
        </div>
        
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--brand-gradient)', color: '#fff', borderRadius: 9999, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24, boxShadow: '0 10px 20px rgba(225, 29, 72, 0.2)' }}>
            <Zap size={14} /> {badgeText}
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            {title}
          </h2>
          <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.7, opacity: 0.8, marginBottom: 40 }}>
            {description}
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {features?.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '24px', background: 'var(--bg-app)', borderRadius: 24, border: '1px solid var(--border-color)', transition: 'transform 0.3s ease', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }} className="hover-lift">
                <CheckCircle2 color="var(--brand-primary)" size={24} style={{ flexShrink: 0, marginTop: 4 }} />
                <div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-main)' }}>{item.title}</div>
                  {item.desc && (
                    <div style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.6 }}>{item.desc}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
