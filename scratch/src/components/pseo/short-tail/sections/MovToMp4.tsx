import React from 'react';
import { Smartphone, MonitorPlay, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const MovToMp4Hero: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  const tags = bd.heroTags || ['Fix Playback Errors', 'Instant Remux', 'Universal MP4'];
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 24, letterSpacing: '-0.04em', color: 'var(--text-main)' }}>
          {data.h1 || 'MOV to MP4'}
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.6 }}>{data.description}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {tags.map((t: any, i: any) => (
            <div key={i} style={{ padding: '10px 20px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 100, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const MovToMp4Benefits: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  const items = bd.benefitsItems || [];
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.benefitsTitle}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{bd.benefitsDesc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {items.map((it: any, i: any) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <CheckCircle2 size={20} color="#3b82f6" /> <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{it}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
           <div style={{ width: '100%', maxWidth: 360, height: 400, background: 'var(--bg-card)', borderRadius: 32, border: '8px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
              <Smartphone size={64} color="#3b82f6" />
              <MonitorPlay size={64} color="#10b981" />
           </div>
        </div>
      </div>
    </section>
  );
};

export const MovToMp4Privacy: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <ShieldCheck size={64} color="#3b82f6" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.privacyTitle}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{bd.privacyDesc}</p>
      </div>
    </section>
  );
};

export const MovToMp4Performance: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  const items = bd.performanceItems || [];
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
         <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <Zap size={48} color="#eab308" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.performanceTitle}</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>{bd.performanceDesc}</p>
         </div>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
           {items.map((it: any, i: any) => (
             <div key={i} style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border-color)', textAlign: 'center', fontWeight: 700, color: 'var(--text-main)' }}>
               {it}
             </div>
           ))}
         </div>
      </div>
    </section>
  );
};
