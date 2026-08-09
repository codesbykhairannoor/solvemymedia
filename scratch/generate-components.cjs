const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/components/content-sections');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// 1. SecurityGroup.tsx
const securityGroupCode = `import React from 'react';
import { ShieldCheck, Terminal, Activity, Wifi } from 'lucide-react';

interface SecurityHeroProps {
  title: string;
  description: string;
  flipLayout?: boolean;
}

export const SecurityHeroSection: React.FC<SecurityHeroProps> = ({ title, description, flipLayout }) => (
  <section className="content-section security-hero" style={{ padding: '80px 24px', margin: '40px 0' }}>
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
  <section className="content-section security-geo" style={{ padding: '80px 24px', margin: '40px 0' }}>
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
  <section className="content-section security-privacy" style={{ padding: '60px 24px', margin: '60px auto', maxWidth: 800, borderRadius: 24, background: '#0d1117', fontFamily: 'monospace', border: '1px solid rgba(var(--brand-primary-rgb), 0.3)' }}>
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
`;

// 2. FeatureGroup.tsx
const featureGroupCode = `import React from 'react';
import { Star, Zap, Shield, Cpu } from 'lucide-react';

interface FeatureProps {
  title: string;
  description: string;
  flipLayout?: boolean;
}

export const HeroFeaturesSection: React.FC<FeatureProps> = ({ title, description, flipLayout }) => (
  <section className="content-section hero-features" style={{ padding: '80px 24px', margin: '40px 0', borderBottom: '1px solid var(--border-color)' }}>
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
  <section className="content-section how-to" style={{ padding: '80px 24px', margin: '40px auto', maxWidth: 1000, background: 'var(--bg-card)', borderRadius: 32 }}>
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
`;

// 3. SplitGroup.tsx
const splitGroupCode = `import React from 'react';
import { Zap, Cpu, Settings2 } from 'lucide-react';

interface SplitProps {
  title: string;
  description: string;
}

export const SplitHeroSection: React.FC<SplitProps> = ({ title, description }) => (
  <section className="content-section split-hero" style={{ padding: '100px 24px', margin: '60px auto', maxWidth: 1000, background: 'radial-gradient(circle at center, rgba(var(--brand-primary-rgb),0.1) 0%, transparent 70%)', borderRadius: 40 }}>
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
  <section className="content-section split-performance" style={{ padding: '80px 24px', margin: '40px auto', maxWidth: 1000, display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
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
`;

fs.writeFileSync(path.join(dir, 'SecurityGroup.tsx'), securityGroupCode);
fs.writeFileSync(path.join(dir, 'FeatureGroup.tsx'), featureGroupCode);
fs.writeFileSync(path.join(dir, 'SplitGroup.tsx'), splitGroupCode);

// Add missing css variables to index.css
const cssPath = path.join(__dirname, '../src/index.css');
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('--brand-primary-rgb')) {
  css = css.replace(
    /:root {/g, 
    ':root {\n  --brand-primary-rgb: 168, 85, 247;\n  --brand-secondary-rgb: 6, 182, 212;\n'
  );
  fs.writeFileSync(cssPath, css);
}

console.log('Components created and CSS updated.');
