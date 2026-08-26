import React from 'react';
import { Sparkles, Music, Cpu, HardDrive } from 'lucide-react';

export const FlacToMp3Hero: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '120px 24px', background: 'linear-gradient(180deg, var(--bg-main) 0%, var(--bg-card) 100%)', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
         <Sparkles size={48} color="#f59e0b" style={{ margin: '0 auto 24px' }} />
         <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 24, color: 'var(--text-main)' }}>{data.h1}</h2>
         <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40 }}>{data.description}</p>
         <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
           {(bd.heroTags || []).map((t: any, i: any) => (
             <span key={i} style={{ padding: '8px 24px', background: 'var(--bg-main)', border: '1px solid #f59e0b', color: 'var(--text-main)', borderRadius: 100, fontWeight: 700 }}>{t}</span>
           ))}
         </div>
      </div>
    </section>
  );
};

export const FlacToMp3Benefits: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.benefitsTitle}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{bd.benefitsDesc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {(bd.benefitsItems || []).map((it: any, i: any) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20, background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-color)' }}>
                <Music size={24} color="#f59e0b" /> <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '1.1rem' }}>{it}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 240, height: 320, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
             <HardDrive size={80} color="#f59e0b" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const FlacToMp3Privacy: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.privacyTitle}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{bd.privacyDesc}</p>
      </div>
    </section>
  );
};

export const FlacToMp3Performance: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 60, alignItems: 'center' }}>
         <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
           <Cpu size={100} color="#f59e0b" />
         </div>
         <div style={{ flex: '1 1 500px' }}>
           <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.performanceTitle}</h2>
           <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{bd.performanceDesc}</p>
           <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
             {(bd.performanceItems || []).map((it: any, i: any) => (
                <li key={i} style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: 12, fontWeight: 600, borderLeft: '4px solid #f59e0b', color: 'var(--text-main)' }}>{it}</li>
             ))}
           </ul>
         </div>
      </div>
    </section>
  );
};
