import React from 'react';
import { Star, Zap, Shield, Cpu } from 'lucide-react';

interface FeatureProps {
  title: string;
  description: string;
  flipLayout?: boolean;
}

export const HeroFeaturesSection: React.FC<FeatureProps> = ({ title, description, flipLayout }) => (
  <section className="content-section hero-features" style={{ padding: '80px 24px', marginBottom: '80px', borderBottom: '1px solid var(--border-color)' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: flipLayout ? 'row-reverse' : 'row', flexWrap: 'wrap', alignItems: 'center', gap: 48 }}>
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 16, background: 'rgba(var(--brand-secondary-rgb), 0.1)', color: 'var(--brand-secondary)', marginBottom: 24 }}>
          <Star size={32} />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{description}</p>
      </div>
      <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', aspectRatio: '16/9', background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <div style={{ width: '80%', height: '60%', background: 'var(--bg-main)', borderRadius: 12, border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(var(--brand-secondary-rgb), 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--brand-secondary)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

interface StepsProps {
  title: string;
  steps: { title: string; description: string }[];
}

export const HowToStepsSection: React.FC<StepsProps> = ({ title, steps }) => (
  <section className="content-section how-to" style={{ padding: '80px 24px', margin: '0 auto 80px', maxWidth: 1000, background: 'var(--bg-card)', borderRadius: 32 }}>
    <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 60, color: 'var(--text-main)' }}>{title}</h2>
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
      {steps.map((step, i) => (
        <div key={i} style={{ flex: '1 1 250px', textAlign: 'center', padding: '0 16px' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(var(--brand-primary-rgb), 0.1)', border: '2px solid var(--brand-primary)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.2rem', fontWeight: 900 }}>{i + 1}</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 10, color: 'var(--text-main)' }}>{step.title}</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.description}</p>
        </div>
      ))}
    </div>
  </section>
);
