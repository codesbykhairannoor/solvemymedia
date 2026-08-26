import React from 'react';
import { Smartphone, Monitor, Tv, Lock, Zap, RefreshCw, AlertCircle } from 'lucide-react';

export const MovToMp4Hero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: 'var(--bg-main)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 64 }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, marginBottom: 32, fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }}></span>
            iPhone Video Converter
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.05, 
            letterSpacing: '-0.05em',
            color: 'var(--text-main)',
            marginBottom: 24
          }}>
            {h1 || "Make MOV Files Play Anywhere"}
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-muted)', 
            lineHeight: 1.6, 
            marginBottom: 40,
            maxWidth: 540
          }}>
            {description || "Apple's MOV files often fail on Android or Windows. Convert them to the universally supported MP4 format in seconds."}
          </p>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {safeData.heroTags?.map((tag: string, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)', fontWeight: 500 }}>
                <CheckIcon /> {tag}
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 320, height: 600, background: '#111', borderRadius: 48, border: '12px solid #333', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}>
             <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 120, height: 30, background: '#333', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }} />
             <div style={{ padding: '80px 32px', textAlign: 'center', color: 'white', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '16px', marginBottom: 24, display: 'inline-flex', alignSelf: 'center' }}>
                  <AlertCircle size={32} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 8 }}>Can't Play Video</h3>
                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: 40 }}>The file format .MOV is not supported.</p>
                
                <div style={{ width: '100%', height: 2, background: '#333', marginBottom: 40 }} />
                
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 8, color: '#3b82f6' }}>Converted to MP4</h3>
                <div style={{ width: '100%', height: 120, background: '#222', borderRadius: 12, marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <div style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '12px solid white', marginLeft: 4 }} />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export const MovToMp4Benefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
          {safeData.benefitsTitle || "Universal Compatibility"}
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
          {[
            { icon: <Monitor size={32} />, label: "Windows PCs" },
            { icon: <Smartphone size={32} />, label: "Android Devices" },
            { icon: <Tv size={32} />, label: "Smart TVs" }
          ].map((device, i) => (
            <div key={i} style={{ flex: '1 1 250px', padding: '40px 24px', background: 'var(--bg-main)', borderRadius: 24, border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, margin: '0 auto 24px', borderRadius: 20, background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {device.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 12 }}>{device.label}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{safeData.benefitsItems?.[i] || "Play seamlessly without codec errors."}</p>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: 48, maxWidth: 700, margin: '48px auto 0' }}>
          {safeData.benefitsDesc || "Apple's proprietary format limits where you can share your memories. Convert to MP4 to unlock playback on over 99% of digital devices worldwide."}
        </p>
      </div>
    </section>
  );
};

export const MovToMp4Privacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', background: 'linear-gradient(to right, rgba(17, 24, 39, 0.05), transparent)', borderRadius: 32, padding: '48px', borderLeft: '4px solid #111827', display: 'flex', alignItems: 'flex-start', gap: 32 }}>
        <div style={{ width: 64, height: 64, background: '#111827', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Lock size={32} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>
            {safeData.privacyTitle || "Processed Securely on Your Device"}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            {safeData.privacyDesc || "Your personal iPhone recordings are yours alone. We don't upload your files to a server. Our engine converts the MOV to MP4 locally in your browser cache."}
          </p>
        </div>
      </div>
    </section>
  );
};

export const MovToMp4Performance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 24, lineHeight: 1.1 }}>
            {safeData.performanceTitle || "Instant Format Remuxing"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
            {safeData.performanceDesc || "In many cases, MOV and MP4 use the exact same internal video data (H.264/HEVC). Our tool intelligently 'remuxes' the file—swapping the container without re-encoding—resulting in instant, lossless conversion."}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {safeData.performanceItems?.map((item: string, i: number) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600, color: 'var(--text-main)' }}>
                <div style={{ width: 32, height: 32, background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={16} />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: '1 1 400px' }}>
           {/* Abstract Speed Graphic */}
           <div style={{ width: '100%', padding: '40px', background: 'var(--bg-main)', borderRadius: 32, border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>MOV Upload</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Bypassed</span>
              </div>
              <div style={{ height: 8, background: 'var(--border-color)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '10%', height: '100%', background: '#9ca3af' }} />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Local Remuxing</span>
                <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700 }}>Lightning Fast</span>
              </div>
              <div style={{ height: 8, background: 'var(--border-color)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: '#10b981' }} />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
