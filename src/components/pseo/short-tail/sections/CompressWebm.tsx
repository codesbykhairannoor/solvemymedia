import React from 'react';
import { LayoutGrid, MousePointer2, ShieldBan, Rocket, Server, LineChart } from 'lucide-react';

export const CompressWebmHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: '#fafafa',
      fontFamily: '"Inter", system-ui, sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap');
      `}</style>
      <div style={{ maxWidth: 1000, margin: '0 auto', border: '1px solid #eaeaea', background: 'white', borderRadius: 24, padding: '80px 40px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', textAlign: 'center' }}>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 16px', background: '#f4f4f5', borderRadius: 8, color: '#52525b', fontWeight: 600, fontSize: '0.85rem', marginBottom: 40, letterSpacing: '1px', textTransform: 'uppercase' }}>
          <LayoutGrid size={14} /> Web Asset Optimization
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          fontWeight: 900, 
          color: '#09090b',
          lineHeight: 1.1,
          letterSpacing: '-0.05em',
          marginBottom: 24
        }}>
          {h1 || "Compress WebM Files for the Web"}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#71717a', 
          lineHeight: 1.6, 
          maxWidth: 600,
          margin: '0 auto 48px'
        }}>
          {description || "WebM is designed for the web, but unoptimized files still cause buffering. Crunch your WebM files down to the smallest possible size."}
        </p>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#18181b', fontWeight: 600 }}>
              <MousePointer2 size={16} color="#3b82f6" /> {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CompressWebmBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#ffffff', fontFamily: '"Inter", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#09090b', marginBottom: 24, letterSpacing: '-0.03em' }}>
            {safeData.benefitsTitle || "Stop Website Buffering"}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#71717a', lineHeight: 1.7, marginBottom: 40 }}>
            {safeData.benefitsDesc || "If your background videos or hero animations are lagging, your WebM file is too large. Optimize the bitrate to ensure instant playback on slow connections."}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { icon: <LineChart />, title: "Boost SEO Scores", desc: safeData.benefitsItems?.[0] || "Smaller assets mean faster Largest Contentful Paint (LCP)." },
              { icon: <Server />, title: "Save Bandwidth", desc: safeData.benefitsItems?.[1] || "Cut your CDN costs by reducing the file size by up to 80%." }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 24 }}>
                <div style={{ width: 56, height: 56, background: '#f4f4f5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#18181b', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#09090b', marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ color: '#71717a', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ padding: 40, background: '#fafafa', border: '1px solid #eaeaea', borderRadius: 32 }}>
            <div style={{ fontWeight: 600, color: '#71717a', marginBottom: 12 }}>Network Waterfall</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ height: 24, background: '#ef4444', borderRadius: 4, width: '100%', opacity: 0.2 }} />
              <div style={{ height: 24, background: '#ef4444', borderRadius: 4, width: '80%', opacity: 0.5 }} />
              <div style={{ height: 24, background: '#22c55e', borderRadius: 4, width: '30%', position: 'relative' }}>
                <div style={{ position: 'absolute', right: -120, top: 4, fontSize: '0.85rem', fontWeight: 700, color: '#22c55e' }}>Compressed WebM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CompressWebmPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#09090b', color: 'white', fontFamily: '"Inter", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <ShieldBan size={48} color="#3b82f6" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.02em' }}>
          {safeData.privacyTitle || "Client-Side Processing"}
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#a1a1aa', lineHeight: 1.8 }}>
          {safeData.privacyDesc || "Developers shouldn't have to upload proprietary assets to third-party servers. We use WebAssembly to compress the WebM file locally on your machine."}
        </p>
      </div>
    </section>
  );
};

export const CompressWebmPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#ffffff', fontFamily: '"Inter", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#09090b', marginBottom: 24, letterSpacing: '-0.03em' }}>
            {safeData.performanceTitle || "Hardware VP8/VP9 Encoding"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#71717a', lineHeight: 1.7, marginBottom: 32 }}>
            {safeData.performanceDesc || "Re-encoding WebM formats used to take ages. Our engine connects to your system's hardware accelerated VP8 or VP9 encoders to process files at lightning speed."}
          </p>
        </div>
        <div style={{ flex: '1 1 400px' }}>
           <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
             {safeData.performanceItems?.map((item: string, i: number) => (
               <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '24px', background: '#fafafa', border: '1px solid #eaeaea', borderRadius: 16, fontWeight: 700, color: '#09090b' }}>
                 <Rocket size={24} color="#3b82f6" /> {item}
               </li>
             ))}
           </ul>
        </div>
      </div>
    </section>
  );
};
