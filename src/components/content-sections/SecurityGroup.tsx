import React from 'react';
import { ShieldCheck, Terminal, Activity, Wifi } from 'lucide-react';

interface SecurityHeroProps {
  title: string;
  description: string;
  flipLayout?: boolean;
}

export const SecurityHeroSection: React.FC<SecurityHeroProps> = ({ title, description, flipLayout }) => (
  <section className="content-section security-hero" style={{ padding: '80px 24px', marginBottom: '80px' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: flipLayout ? 'row-reverse' : 'row', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
      <div style={{ flex: '1 1 360px' }}>
        <div style={{ display: 'inline-flex', padding: '10px 20px', background: 'rgba(var(--brand-primary-rgb), 0.1)', borderRadius: 100, color: 'var(--brand-primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: 24, gap: 8, alignItems: 'center' }}>
          <ShieldCheck size={16} /> 100% Private Processing
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.15 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{description}</p>
      </div>
      <div style={{ flex: '1 1 360px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 280, height: 280 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(var(--brand-primary-rgb), 0.2)' }} />
          <div style={{ position: 'absolute', inset: 30, borderRadius: '50%', border: '2px dashed rgba(var(--brand-primary-rgb), 0.3)' }} />
          <div style={{ position: 'absolute', inset: 60, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(var(--brand-primary-rgb), 0.15), rgba(var(--brand-secondary-rgb), 0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 60px rgba(var(--brand-primary-rgb), 0.2)' }}>
            <ShieldCheck size={80} color="var(--brand-primary)" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

interface SecurityGeoProps {
  title: string;
  description: string;
}

export const SecurityGeoSection: React.FC<SecurityGeoProps> = ({ title, description }) => (
  <section className="content-section security-geo" style={{ padding: '80px 24px', marginBottom: '80px' }}>
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)', lineHeight: 1.2 }}>{title}</h2>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40, maxWidth: 600 }}>{description}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: 16 }}>
        <div style={{ gridColumn: '1 / 3', padding: 32, background: 'linear-gradient(135deg, rgba(var(--brand-primary-rgb), 0.12), rgba(var(--brand-secondary-rgb), 0.06))', borderRadius: 20, border: '1px solid rgba(var(--brand-primary-rgb), 0.2)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Wifi size={32} color="var(--brand-primary)" />
          <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-main)' }}>Offline Processing</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>Your files never need an internet connection to be processed. All computation is in-browser.</div>
        </div>
        <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--brand-primary)' }}>0</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>API Calls Made</div>
        </div>
        <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--brand-secondary)' }}>100%</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Private</div>
        </div>
        <div style={{ gridColumn: '2 / 4', padding: 24, background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 16 }}>
          <Activity size={28} color="var(--text-accent)" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>Real-time Local Execution</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>WASM processes files at native speed directly in your browser memory.</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const SecurityPrivacySection: React.FC<{title: string, description: string}> = ({ title, description }) => (
  <section className="content-section security-privacy" style={{ padding: '60px 24px', margin: '0 auto 80px', maxWidth: 800, borderRadius: 24, background: '#0d1117', fontFamily: 'monospace', border: '1px solid rgba(var(--brand-primary-rgb), 0.3)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
      <Terminal size={20} color="var(--brand-primary)" />
      <span style={{ color: 'var(--brand-primary)', fontWeight: 700, fontSize: '0.9rem' }}>SECURITY LOG</span>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
        {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}
      </div>
    </div>
    <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: 16, color: '#fff' }}>{title}</h2>
    <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: 1.8, marginBottom: 32 }}>{description}</p>
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {['> file_upload: BLOCKED', '> server_request: NONE', '> local_processing: ACTIVE', '> data_leak_risk: 0%'].map(line => (
        <div key={line} style={{ color: 'var(--brand-primary)', fontSize: '0.9rem' }}>{line}</div>
      ))}
    </div>
  </section>
);
