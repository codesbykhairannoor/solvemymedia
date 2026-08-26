const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/pseo/short-tail/sections');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const files = {
  'WavToMp3.tsx': `
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
`,
  'M4aToMp3.tsx': `
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
`,
  'FlacToMp3.tsx': `
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
`,
  'OggToMp3.tsx': `
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
`,
  'CompressMp4.tsx': `
import React from 'react';
import { Minimize2, FileVideo, Shield, Server, CheckSquare } from 'lucide-react';

export const CompressMp4Hero: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '120px 24px', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ position: 'absolute', top: -100, left: -100, width: 300, height: 300, background: 'rgba(59,130,246,0.1)', borderRadius: '50%' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 900, marginBottom: 24, lineHeight: 1.1, color: 'var(--text-main)' }}>{data.h1}</h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>{data.description}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {(bd.heroTags || []).map((t: any, i: any) => (
              <span key={i} style={{ padding: '8px 16px', background: '#3b82f6', color: '#fff', borderRadius: 8, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 280, height: 280, borderRadius: '50%', background: 'var(--bg-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
             <Minimize2 size={80} color="#3b82f6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const CompressMp4Benefits: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.benefitsTitle}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 48 }}>{bd.benefitsDesc}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {(bd.benefitsItems || []).map((it: any, i: any) => (
            <div key={i} style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-color)' }}>
              <FileVideo size={32} color="#3b82f6" style={{ margin: '0 auto 16px' }} />
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{it}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CompressMp4Privacy: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
        <div style={{ flex: '1 1 300px' }}><div style={{ width: '100%', height: 200, background: 'var(--bg-main)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}><Shield size={64} color="#10b981" /></div></div>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 16, color: 'var(--text-main)' }}>{bd.privacyTitle}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{bd.privacyDesc}</p>
        </div>
      </div>
    </section>
  );
};

export const CompressMp4Performance: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.performanceTitle}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40, maxWidth: 700, margin: '0 auto 40px' }}>{bd.performanceDesc}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          {(bd.performanceItems || []).map((it: any, i: any) => (
             <div key={i} style={{ padding: '16px 32px', background: 'var(--bg-card)', borderRadius: 100, fontWeight: 700, border: '1px solid var(--border-color)', color: 'var(--text-main)' }}><CheckSquare size={16} style={{ display: 'inline', marginRight: 8, color: '#3b82f6' }} />{it}</div>
          ))}
        </div>
      </div>
    </section>
  );
};
`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(dir, filename), content.trim() + '\n');
}
console.log('Created 5 React components');
