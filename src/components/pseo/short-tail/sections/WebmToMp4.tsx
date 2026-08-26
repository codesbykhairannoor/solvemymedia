import React from 'react';
import { Globe, Code2, MonitorSmartphone, Shield, Zap, FileJson } from 'lucide-react';

export const WebmToMp4Hero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '100px 24px 80px', 
      background: 'linear-gradient(180deg, #f0fdfa 0%, #ffffff 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ 
          background: '#0f766e', 
          color: 'white', 
          padding: '8px 24px', 
          borderRadius: 8, 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 12, 
          marginBottom: 40,
          boxShadow: '0 4px 15px rgba(15, 118, 110, 0.2)',
          fontWeight: 600,
          fontFamily: '"Fira Code", monospace'
        }}>
          <Code2 size={18} /> WEB MEDIA TO UNIVERSAL MP4
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
          fontWeight: 900, 
          color: '#111827',
          lineHeight: 1.1,
          marginBottom: 24,
          letterSpacing: '-0.02em',
          maxWidth: 900
        }}>
          {h1 || "Make WebM Files Playable Everywhere"}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#4b5563', 
          lineHeight: 1.7, 
          maxWidth: 750,
          marginBottom: 48
        }}>
          {description || "WebM is great for browsers, but terrible for iPhones and video editors. Instantly convert WebM videos to the universally compatible MP4 format."}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, width: '100%', maxWidth: 800 }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              background: 'white', 
              border: '2px solid #ccfbf1', 
              padding: '16px', 
              borderRadius: 12, 
              color: '#0f766e', 
              fontWeight: 700,
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WebmToMp4Benefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ padding: 40, background: '#f8fafc', borderRadius: 24, border: '1px solid #e2e8f0' }}>
             <Globe size={40} color="#0f766e" style={{ marginBottom: 24 }} />
             <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
               {safeData.benefitsTitle || "The iPhone Problem"}
             </h3>
             <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.1rem' }}>
               {safeData.benefitsDesc || "If you download a video from Twitter or Reddit, it's often a WebM. Try sending that to an iPhone user, and they won't be able to open it. MP4 solves this completely."}
             </p>
          </div>
        </div>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { icon: <MonitorSmartphone />, title: "Cross-Platform", desc: safeData.benefitsItems?.[0] || "Plays on iOS, macOS, Android, and Windows." },
              { icon: <FileJson />, title: "Metadata Preserved", desc: safeData.benefitsItems?.[1] || "Keeps duration, resolution, and framerate intact." }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <div style={{ width: 56, height: 56, background: '#ccfbf1', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f766e', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ color: '#475569', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const WebmToMp4Privacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#0f172a', color: 'white' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <Shield size={64} color="#5eead4" style={{ margin: '0 auto 32px' }} />
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24 }}>
          {safeData.privacyTitle || "Secure In-Browser Conversion"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#cbd5e1', lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>
          {safeData.privacyDesc || "WebM files can contain sensitive screen recordings. We ensure your privacy by converting the file entirely within your browser's local sandbox using WebAssembly."}
        </p>
      </div>
    </section>
  );
};

export const WebmToMp4Performance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)', borderRadius: 40, padding: '64px', border: '1px solid #99f6e4', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 48 }}>
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
              {safeData.performanceTitle || "Fast Native Processing"}
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#334155', lineHeight: 1.7, marginBottom: 32 }}>
              {safeData.performanceDesc || "Converting VP8/VP9 (WebM) to H.264 (MP4) requires heavy lifting. We utilize your device's multi-core CPU to crunch the pixels fast."}
            </p>
          </div>
          <div style={{ flex: '1 1 300px' }}>
             <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
               {safeData.performanceItems?.map((item: string, i: number) => (
                 <li key={i} style={{ padding: '16px 24px', background: 'white', borderRadius: 12, color: '#0f766e', fontWeight: 700, boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 12 }}>
                   <Zap size={20} /> {item}
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
