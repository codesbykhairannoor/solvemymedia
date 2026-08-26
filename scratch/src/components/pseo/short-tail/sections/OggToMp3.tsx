import React from 'react';
import { Gamepad2, Share2, Zap, ShieldCheck } from 'lucide-react';

export const OggToMp3Hero: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
         <div style={{ width: 80, height: 80, background: 'var(--bg-card)', borderRadius: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 10px 20px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)' }}>
           <Gamepad2 size={40} color="var(--brand-primary)" />
         </div>
         <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 24, color: 'var(--text-main)' }}>{data.h1}</h2>
         <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 700, margin: '0 auto 40px' }}>{data.description}</p>
         <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
           {(bd.heroTags || []).map((t: any, i: any) => (
             <span key={i} style={{ padding: '10px 20px', background: 'var(--brand-primary)', color: '#fff', borderRadius: 100, fontWeight: 700 }}>{t}</span>
           ))}
         </div>
      </div>
    </section>
  );
};

export const OggToMp3Benefits: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.benefitsTitle}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{bd.benefitsDesc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {(bd.benefitsItems || []).map((it: any, i: any) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, background: 'var(--bg-main)', borderRadius: 12, border: '1px solid var(--border-color)' }}>
                <Share2 size={20} color="var(--brand-primary)" /> <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{it}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const OggToMp3Privacy: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '60px 40px', background: 'var(--bg-card)', borderRadius: 32, border: '1px solid var(--border-color)' }}>
        <ShieldCheck size={56} color="#10b981" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.privacyTitle}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{bd.privacyDesc}</p>
      </div>
    </section>
  );
};

export const OggToMp3Performance: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 60, alignItems: 'center' }}>
         <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
           <Zap size={100} color="#eab308" />
         </div>
         <div style={{ flex: '1 1 500px' }}>
           <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.performanceTitle}</h2>
           <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{bd.performanceDesc}</p>
           <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 16 }}>
             {(bd.performanceItems || []).map((it: any, i: any) => (
                <li key={i} style={{ background: 'var(--bg-main)', padding: '12px 24px', borderRadius: 100, border: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)' }}>{it}</li>
             ))}
           </ul>
         </div>
      </div>
    </section>
  );
};
