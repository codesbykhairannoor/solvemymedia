import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Step {
  title: string;
  content: string;
}

interface PseoHowToProps {
  title: string;
  steps: Step[];
  badgeText?: string;
}

export const PseoHowTo: React.FC<PseoHowToProps> = ({ 
  title, 
  steps,
  badgeText = "Quick Guide" 
}) => {
  return (
    <section className="seo-section how-to" style={{ padding: '120px 24px', background: 'var(--bg-app)', position: 'relative' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--brand-gradient)', color: '#fff', borderRadius: 9999, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <CheckCircle2 size={14} /> {badgeText}
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            {title}
          </h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {steps?.map((step, i) => (
            <div key={i} style={{ position: 'relative', padding: 48, background: 'var(--bg-card)', borderRadius: 40, border: '1px solid var(--border-color)', transition: 'transform 0.5s ease, box-shadow 0.5s ease', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }} className="hover-lift">
              <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 800, marginBottom: 12, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                <span style={{ color: 'var(--brand-primary)', marginRight: 12 }}>{i + 1}</span>
                {step.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: 'clamp(1rem, 2vw, 1.05rem)' }}>
                {step.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
