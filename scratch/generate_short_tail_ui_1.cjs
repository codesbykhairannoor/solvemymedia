const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/pseo/short-tail/sections');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const files = {
  'Mp4ToMp3.tsx': `
import React from 'react';
import { Music, FileAudio, Zap, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export const Mp4ToMp3Hero: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  const tags = bd.heroTags || ['Fast Audio Rip', 'Zero Quality Loss', 'Browser Based'];
  return (
    <section style={{ padding: '80px 24px', background: 'linear-gradient(180deg, var(--bg-card) 0%, var(--bg-main) 100%)', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'inline-flex', padding: '6px 14px', background: 'rgba(236,72,153,0.1)', color: '#ec4899', borderRadius: 20, fontWeight: 700, fontSize: '0.85rem', marginBottom: 20 }}>
            <Music size={14} style={{ marginRight: 6 }} /> MP4 to MP3 Converter
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, marginBottom: 24, lineHeight: 1.1, color: 'var(--text-main)' }}>
            {data.h1 || 'Convert MP4 to MP3'}
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>
            {data.description || 'Extract high-quality audio.'}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {tags.map((t: any, i: any) => (
              <span key={i} style={{ padding: '8px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle2 size={16} color="#ec4899" /> {t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
             <div style={{ width: 140, height: 180, background: 'var(--bg-card)', borderRadius: 20, border: '2px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
               <FileAudio size={48} color="#ec4899" />
               <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-main)' }}>MP3</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Mp4ToMp3Benefits: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  const items = bd.benefitsItems || ['Perfect for music videos', 'Extract podcast audio', 'Save storage space'];
  return (
    <section style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, textAlign: 'center', marginBottom: 16, color: 'var(--text-main)' }}>{bd.benefitsTitle || 'Extract Songs and Podcasts Instantly'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 700, margin: '0 auto 60px', lineHeight: 1.8 }}>{bd.benefitsDesc}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {items.map((it: any, i: any) => (
            <div key={i} style={{ padding: 32, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(236,72,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <CheckCircle2 size={24} color="#ec4899" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>{it}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Mp4ToMp3Privacy: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap', background: 'var(--bg-main)', padding: 48, borderRadius: 32, border: '1px solid var(--border-color)' }}>
        <Shield size={80} color="#10b981" style={{ flexShrink: 0 }} />
        <div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 16, color: 'var(--text-main)' }}>{bd.privacyTitle || 'Your Media is Never Uploaded'}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{bd.privacyDesc}</p>
        </div>
      </div>
    </section>
  );
};

export const Mp4ToMp3Performance: React.FC<any> = ({ data }) => {
  const bd = data.bespokeData || {};
  const items = bd.performanceItems || ['Zero upload time', 'No quality degradation', 'Handles huge files'];
  return (
    <section style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 60, alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
           <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
             {items.map((it: any, i: any) => (
               <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20, background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-color)' }}>
                 <Zap size={20} color="#eab308" />
                 <span style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-main)' }}>{it}</span>
               </li>
             ))}
           </ul>
        </div>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)' }}>{bd.performanceTitle || 'Direct Stream Copy'}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{bd.performanceDesc}</p>
        </div>
      </div>
    </section>
  );
};
`,
  'MovToMp4.tsx': `
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
`,
  'MkvToMp4.tsx': `
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
`,
  'WebmToMp4.tsx': `
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
`,
  'AviToMp4.tsx': `
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
`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(dir, filename), content.trim() + '\n');
}
console.log('Created 5 React components');
