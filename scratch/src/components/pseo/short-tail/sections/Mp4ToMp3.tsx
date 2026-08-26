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
