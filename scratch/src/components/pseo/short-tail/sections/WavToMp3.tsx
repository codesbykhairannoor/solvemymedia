import React from 'react';
import { Headphones, DownloadCloud, Volume2, Key, Check } from 'lucide-react';

export const WavToMp3Hero: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'rgba(16,185,129,0.1)', borderRadius: '50%' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Headphones size={48} color="#10b981" style={{ marginBottom: 24 }} />
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 24, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>{data.h1}</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 800, marginBottom: 40 }}>{data.description}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {(bd.heroTags || []).map((t: any, i: any) => (
             <span key={i} style={{ padding: '8px 16px', background: '#10b981', color: '#fff', borderRadius: 8, fontWeight: 700 }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WavToMp3Benefits: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, textAlign: 'center', color: 'var(--text-main)' }}>{bd.benefitsTitle}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 48, textAlign: 'center', maxWidth: 700, margin: '0 auto 48px' }}>{bd.benefitsDesc}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
           {(bd.benefitsItems || []).map((it: any, i: any) => (
             <div key={i} style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
               <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                 <Check size={18} color="#10b981" />
               </div>
               <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{it}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export const WavToMp3Privacy: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.privacyTitle}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{bd.privacyDesc}</p>
        </div>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 120, height: 120, background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(16,185,129,0.3)' }}>
            <Key size={48} color="#fff" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const WavToMp3Performance: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <DownloadCloud size={48} color="#10b981" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.performanceTitle}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>{bd.performanceDesc}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {(bd.performanceItems || []).map((it: any, i: any) => (
             <div key={i} style={{ padding: '10px 24px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 100, fontWeight: 700, color: 'var(--text-main)' }}>{it}</div>
          ))}
        </div>
      </div>
    </section>
  );
};
