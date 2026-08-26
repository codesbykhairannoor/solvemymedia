import React from 'react';
import { History, FileVideo, ShieldAlert, Cpu } from 'lucide-react';

export const AviToMp4Hero: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
         <History size={64} style={{ margin: '0 auto 32px', color: 'var(--brand-primary)' }} />
         <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 24, color: 'var(--text-main)' }}>{data.h1}</h2>
         <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 700, margin: '0 auto 40px' }}>{data.description}</p>
         <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
           {(bd.heroTags || []).map((t: any, i: any) => (
             <span key={i} style={{ padding: '8px 24px', background: 'var(--bg-main)', borderRadius: 8, border: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)' }}>{t}</span>
           ))}
         </div>
      </div>
    </section>
  );
};

export const AviToMp4Benefits: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 60, alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.benefitsTitle}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{bd.benefitsDesc}</p>
          <div style={{ display: 'grid', gap: 16 }}>
            {(bd.benefitsItems || []).map((it: any, i: any) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 12 }}>
                 <FileVideo size={20} color="var(--brand-primary)" /> <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{it}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 280, height: 280, borderRadius: '50%', background: 'var(--bg-card)', border: '4px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <FileVideo size={80} color="var(--text-muted)" opacity={0.5} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const AviToMp4Privacy: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
         <ShieldAlert size={56} color="#ef4444" style={{ marginBottom: 24 }} />
         <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.privacyTitle}</h2>
         <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{bd.privacyDesc}</p>
      </div>
    </section>
  );
};

export const AviToMp4Performance: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
         <div style={{ flex: '1 1 300px' }}><Cpu size={120} color="var(--brand-primary)" opacity={0.8} style={{ margin: '0 auto', display: 'block' }} /></div>
         <div style={{ flex: '1 1 500px' }}>
           <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.performanceTitle}</h2>
           <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{bd.performanceDesc}</p>
           <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
             {(bd.performanceItems || []).map((it: any, i: any) => (
                <span key={i} style={{ padding: '8px 16px', background: 'var(--bg-card)', borderRadius: 100, border: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-main)' }}>{it}</span>
             ))}
           </div>
         </div>
      </div>
    </section>
  );
};
