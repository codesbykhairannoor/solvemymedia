import React from 'react';
import { Zap, Cpu, Settings2 } from 'lucide-react';

interface SplitProps {
  title: string;
  description: string;
}

export const SplitHeroSection: React.FC<SplitProps> = ({ title, description }) => (
  <section className="content-section split-hero" style={{ padding: '100px 24px', margin: '0 auto 80px', maxWidth: 1000, background: 'radial-gradient(circle at center, rgba(var(--brand-primary-rgb),0.1) 0%, transparent 70%)', borderRadius: 40 }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: '50%', background: 'var(--brand-gradient)', color: 'white', marginBottom: 32, boxShadow: '0 10px 30px rgba(var(--brand-primary-rgb),0.4)' }}>
        <Zap size={40} />
      </div>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: 24, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>{title}</h2>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>{description}</p>
    </div>
  </section>
);

export const SplitPerformanceSection: React.FC<SplitProps> = ({ title, description }) => (
  <section className="content-section split-performance" style={{ padding: '80px 24px', margin: '0 auto 80px', maxWidth: 1000, display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
    <div style={{ flex: '1 1 400px' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)' }}>{title}</h2>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{description}</p>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ padding: '12px 24px', background: 'rgba(var(--brand-primary-rgb), 0.1)', color: 'var(--brand-primary)', borderRadius: 100, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Cpu size={18} /> WebAssembly
        </div>
        <div style={{ padding: '12px 24px', background: 'rgba(var(--brand-secondary-rgb), 0.1)', color: 'var(--brand-secondary)', borderRadius: 100, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} /> WebCodecs
        </div>
      </div>
    </div>
    <div style={{ flex: '1 1 300px', display: 'grid', gap: 16 }}>
      <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Memory Usage</div>
        <div style={{ color: 'var(--brand-primary)', fontWeight: 800, fontSize: '1.2rem' }}>Optimized</div>
      </div>
      <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Execution Speed</div>
        <div style={{ color: 'var(--brand-secondary)', fontWeight: 800, fontSize: '1.2rem' }}>Native</div>
      </div>
    </div>
  </section>
);
