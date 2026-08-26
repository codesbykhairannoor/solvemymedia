import React from 'react';
import { Globe, Cpu, CheckSquare } from 'lucide-react';

export const WebmToMp4Hero: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), transparent)', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 24, lineHeight: 1.1, color: 'var(--text-main)' }}>{data.h1}</h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{data.description}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {(bd.heroTags || []).map((t: any, i: any) => (
              <span key={i} style={{ padding: '8px 16px', background: '#3b82f6', color: '#fff', borderRadius: 8, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <Globe size={200} color="#3b82f6" opacity={0.5} />
        </div>
      </div>
    </section>
  );
};

export const WebmToMp4Benefits: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.benefitsTitle}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 48 }}>{bd.benefitsDesc}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {(bd.benefitsItems || []).map((it: any, i: any) => (
            <div key={i} style={{ padding: 24, background: 'var(--bg-main)', borderRadius: 16, border: '1px solid var(--border-color)' }}>
              <CheckSquare size={24} color="#3b82f6" style={{ margin: '0 auto 16px' }} />
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{it}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WebmToMp4Privacy: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
        <div style={{ flex: '1 1 300px' }}><div style={{ width: '100%', height: 200, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Cpu size={64} color="var(--text-main)" /></div></div>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 16, color: 'var(--text-main)' }}>{bd.privacyTitle}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{bd.privacyDesc}</p>
        </div>
      </div>
    </section>
  );
};

export const WebmToMp4Performance: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.performanceTitle}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40, maxWidth: 700, margin: '0 auto 40px' }}>{bd.performanceDesc}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          {(bd.performanceItems || []).map((it: any, i: any) => (
             <div key={i} style={{ padding: '16px 32px', background: 'var(--bg-main)', color: 'var(--text-main)', borderRadius: 100, fontWeight: 700, border: '1px solid var(--border-color)' }}>{it}</div>
          ))}
        </div>
      </div>
    </section>
  );
};
