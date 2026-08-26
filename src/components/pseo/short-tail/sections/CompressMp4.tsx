import React from 'react';
import { Minimize2, Server, Download, Lock, HardDrive, Smartphone, Zap, Play } from 'lucide-react';

export const CompressMp4Hero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: 'linear-gradient(to right, #e0f2fe, #f0fdfa)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative abstract shapes */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: '#bae6fd', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.6 }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '300px', height: '300px', background: '#ccfbf1', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.6 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ padding: '8px 20px', background: 'white', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 8, color: '#0369a1', fontWeight: 600, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: 32 }}>
            <Minimize2 size={18} /> File Size Optimizer
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 900, 
            lineHeight: 1.1,
            color: '#0f172a',
            marginBottom: 24,
            letterSpacing: '-0.03em'
          }}>
            {h1 || "Shrink MP4 Videos Without Losing Quality"}
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#475569', 
            lineHeight: 1.7, 
            marginBottom: 40 
          }}>
            {description || "Got a video that's too big to email or send on WhatsApp? Compress your MP4 files by up to 90% directly in your browser."}
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {safeData.heroTags?.map((tag: string, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0284c7', fontWeight: 600 }}>
                <CheckCircle /> {tag}
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ background: 'white', borderRadius: 32, padding: 40, boxShadow: '0 20px 40px rgba(0,0,0,0.08)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontWeight: 700, color: '#64748b' }}>Original Size</span>
              <span style={{ fontWeight: 800, color: '#ef4444' }}>~ 500 MB</span>
            </div>
            <div style={{ height: 16, background: '#fee2e2', borderRadius: 8, marginBottom: 32 }}>
              <div style={{ width: '100%', height: '100%', background: '#ef4444', borderRadius: 8 }} />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontWeight: 700, color: '#64748b' }}>Compressed</span>
              <span style={{ fontWeight: 800, color: '#10b981' }}>~ 50 MB</span>
            </div>
            <div style={{ height: 16, background: '#d1fae5', borderRadius: 8 }}>
              <div style={{ width: '10%', height: '100%', background: '#10b981', borderRadius: 8 }} />
            </div>

            <div style={{ position: 'absolute', top: '50%', right: -24, transform: 'translateY(-50%)', width: 48, height: 48, background: '#0ea5e9', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(14, 165, 233, 0.3)' }}>
              <Minimize2 size={24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export const CompressMp4Benefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'white', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', marginBottom: 24 }}>
          {safeData.benefitsTitle || "Solve the 'File Too Large' Error"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: 64, maxWidth: 800, margin: '0 auto 64px' }}>
          {safeData.benefitsDesc || "Email clients cap attachments at 25MB. Discord limits uploads to 8MB. Fix these limits forever by crunching your videos down intelligently."}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 32 }}>
          {[
            { icon: <HardDrive />, title: "Save Space", desc: safeData.benefitsItems?.[0] || "Reclaim gigabytes of hard drive space on your PC or phone." },
            { icon: <Download />, title: "Faster Uploads", desc: safeData.benefitsItems?.[1] || "A smaller file means it uploads and sends in seconds." },
            { icon: <Smartphone />, title: "Mobile Friendly", desc: safeData.benefitsItems?.[2] || "Optimized specifically for smooth playback on mobile devices." }
          ].map((item, i) => (
            <div key={i} style={{ padding: '40px 24px', background: '#f8fafc', borderRadius: 24, border: '1px solid #e2e8f0', transition: 'all 0.3s ease' }}>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>{item.title}</h3>
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CompressMp4Privacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: 20 }}>
            {safeData.privacyTitle || "No Cloud Uploads Required"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: 1.8 }}>
            {safeData.privacyDesc || "Typical compressors force you to upload your videos to their servers, exposing your private data. Our compression engine runs entirely inside your browser's local sandbox."}
          </p>
        </div>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 200, height: 200 }}>
             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '4px solid #bae6fd', borderRadius: '50%', animation: 'spin 10s linear infinite' }} />
             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: 32, borderRadius: '50%', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
               <Lock size={48} color="#0284c7" />
             </div>
             <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CompressMp4Performance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'white', borderTop: '1px solid #f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <Server size={48} color="#0284c7" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', marginBottom: 24 }}>
          {safeData.performanceTitle || "Powered by WebCodecs"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: 800, margin: '0 auto 48px', lineHeight: 1.7 }}>
          {safeData.performanceDesc || "We use the latest WebCodecs API to access your device's hardware media encoder directly. This means blazing fast compression speeds without maxing out your CPU."}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
             <div key={i} style={{ padding: '16px 24px', background: '#f0fdfa', color: '#0f766e', borderRadius: 12, fontWeight: 700, border: '1px solid #ccfbf1', display: 'flex', alignItems: 'center', gap: 12 }}>
               <Zap size={20} /> {item}
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
