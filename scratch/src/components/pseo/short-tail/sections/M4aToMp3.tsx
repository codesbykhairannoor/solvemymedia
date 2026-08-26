import React from 'react';
import { Mic, Activity, Smartphone, ServerOff } from 'lucide-react';

export const M4aToMp3Hero: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 60, alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
             <div style={{ height: 140, background: 'var(--bg-card)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
               <Mic size={48} color="var(--brand-primary)" />
             </div>
             <div style={{ height: 140, background: 'var(--bg-card)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
               <Activity size={48} color="var(--brand-secondary)" />
             </div>
           </div>
        </div>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 24, lineHeight: 1.1, color: 'var(--text-main)' }}>{data.h1}</h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{data.description}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {(bd.heroTags || []).map((t: any, i: any) => (
              <span key={i} style={{ padding: '8px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: 8, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const M4aToMp3Benefits: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.benefitsTitle}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 48 }}>{bd.benefitsDesc}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          {(bd.benefitsItems || []).map((it: any, i: any) => (
            <div key={i} style={{ padding: '24px 32px', background: 'var(--bg-main)', borderRadius: 16, border: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)' }}>
              {it}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const M4aToMp3Privacy: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
       <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'center' }}>
         <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <ServerOff size={100} color="#ef4444" opacity={0.8} />
         </div>
         <div style={{ flex: '1 1 500px' }}>
           <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.privacyTitle}</h2>
           <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{bd.privacyDesc}</p>
         </div>
       </div>
    </section>
  );
};

export const M4aToMp3Performance: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '60px 40px', background: 'var(--bg-main)', borderRadius: 32, border: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.performanceTitle}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{bd.performanceDesc}</p>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          {(bd.performanceItems || []).map((it: any, i: any) => (
             <li key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, color: 'var(--brand-primary)' }}>
                <Activity size={18} /> {it}
             </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
