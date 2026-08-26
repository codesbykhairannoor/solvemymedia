import React from 'react';
import { Tv, Subtitles, Zap, Lock, BadgeCheck } from 'lucide-react';

export const MkvToMp4Hero: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  const tags = bd.heroTags || [];
  return (
    <section style={{ padding: '120px 24px', background: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', fontWeight: 900, marginBottom: 24, color: 'var(--brand-primary)' }}>{data.h1}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 700, marginBottom: 40 }}>{data.description}</p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {tags.map((t: any, i: any) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', background: 'var(--bg-card)', border: '2px solid var(--brand-primary)', borderRadius: 100, fontWeight: 700, color: 'var(--text-main)' }}>
              <BadgeCheck size={18} color="var(--brand-primary)" /> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export const MkvToMp4Benefits: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 60, alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px', display: 'flex', gap: 20, justifyContent: 'center' }}>
          <div style={{ width: 160, height: 160, background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <Tv size={64} color="var(--brand-secondary)" />
          </div>
          <div style={{ width: 160, height: 160, background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginTop: 40 }}>
            <Subtitles size={64} color="var(--brand-primary)" />
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.benefitsTitle}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{bd.benefitsDesc}</p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 16 }}>
            {(bd.benefitsItems || []).map((it: any, i: any) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600, color: 'var(--text-main)' }}><BadgeCheck size={20} color="var(--brand-primary)" /> {it}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export const MkvToMp4Privacy: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: 60, background: 'var(--bg-card)', borderRadius: 40, border: '1px solid var(--border-color)' }}>
        <Lock size={56} style={{ margin: '0 auto 24px', color: 'var(--text-main)' }} />
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.privacyTitle}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{bd.privacyDesc}</p>
      </div>
    </section>
  );
};

export const MkvToMp4Performance: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 40 }}>
        <div style={{ flex: '1 1 400px' }}>
          <Zap size={48} color="#eab308" style={{ marginBottom: 24 }} />
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.performanceTitle}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{bd.performanceDesc}</p>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(bd.performanceItems || []).map((it: any, i: any) => (
            <div key={i} style={{ padding: '24px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 16, fontWeight: 700, borderLeft: '4px solid #eab308', color: 'var(--text-main)' }}>
              {it}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
