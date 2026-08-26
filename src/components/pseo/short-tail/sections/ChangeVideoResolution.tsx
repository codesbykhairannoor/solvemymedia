import React from 'react';
import { Settings, ShieldCheck, Cog, Monitor, PlayCircle, BarChart3, SlidersHorizontal } from 'lucide-react';

export const ChangeVideoResolutionHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: '#f1f5f9', // Light gray dashboard background
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 16px', background: 'white', borderRadius: 6, border: '1px solid #cbd5e1', color: '#475569', fontWeight: 600, fontSize: '0.85rem', marginBottom: 32, letterSpacing: '1px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            <Cog size={14} /> MEDIA UTILITY DASHBOARD
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 800, 
            color: '#0f172a',
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: '-0.03em'
          }}>
            {h1 || "Advanced Video Resolution Control"}
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#475569', 
            lineHeight: 1.7, 
            marginBottom: 48
          }}>
            {description || "Take complete control over your video files. Change resolutions, tweak aspect ratios, and optimize bitrates using our advanced in-browser processing dashboard."}
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {safeData.heroTags?.map((tag: string, i: number) => (
              <div key={i} style={{ 
                padding: '8px 16px', 
                background: '#e2e8f0', 
                borderRadius: 6, 
                color: '#334155', 
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          {/* Mock Dashboard UI */}
          <div style={{ width: '100%', background: 'white', borderRadius: 16, border: '1px solid #cbd5e1', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, color: '#334155' }}>Output Settings</span>
              <Settings size={18} color="#64748b" />
            </div>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem', color: '#475569', fontWeight: 600 }}>
                  <span>Resolution</span> <span>1080p (FHD)</span>
                </div>
                <div style={{ height: 8, background: '#e2e8f0', borderRadius: 4, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '60%', background: '#3b82f6', borderRadius: 4 }} />
                  <div style={{ position: 'absolute', top: -4, left: '60%', width: 16, height: 16, background: 'white', border: '2px solid #3b82f6', borderRadius: '50%', transform: 'translateX(-50%)', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem', color: '#475569', fontWeight: 600 }}>
                  <span>Bitrate Target</span> <span>5.0 Mbps</span>
                </div>
                <div style={{ height: 8, background: '#e2e8f0', borderRadius: 4, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '40%', background: '#10b981', borderRadius: 4 }} />
                  <div style={{ position: 'absolute', top: -4, left: '40%', width: 16, height: 16, background: 'white', border: '2px solid #10b981', borderRadius: '50%', transform: 'translateX(-50%)', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                 <div style={{ flex: 1, padding: '12px', background: '#f1f5f9', borderRadius: 8, textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>H.264</div>
                 <div style={{ flex: 1, padding: '12px', background: '#3b82f6', borderRadius: 8, textAlign: 'center', fontWeight: 700, color: 'white' }}>APPLY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ChangeVideoResolutionBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: 64 }}>
          {safeData.benefitsTitle || "The Ultimate Media Utility"}
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {[
            { icon: <Monitor />, title: "Custom Dimensions", desc: safeData.benefitsItems?.[0] || "Don't just stick to presets. Enter the exact pixel width and height you need for your specific LED screen or digital signage." },
            { icon: <SlidersHorizontal />, title: "Aspect Ratio Unlocking", desc: safeData.benefitsItems?.[1] || "Force a 4:3 video into 16:9, or unlock the aspect ratio entirely to stretch and fit to any custom container." },
            { icon: <PlayCircle />, title: "Format Conversion", desc: safeData.benefitsItems?.[2] || "While you change the resolution, you can simultaneously convert the video from MKV or MOV into a web-friendly MP4." }
          ].map((item, i) => (
            <div key={i} style={{ padding: 40, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ marginBottom: 24, color: '#475569' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>{item.title}</h3>
              <p style={{ color: '#475569', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ChangeVideoResolutionPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#0f172a', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ padding: 32, background: '#1e293b', borderRadius: '50%', border: '4px solid #334155' }}>
            <ShieldCheck size={64} color="#38bdf8" />
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 20 }}>
            {safeData.privacyTitle || "Client-Side Processing"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.8 }}>
            {safeData.privacyDesc || "All resizing operations are executed within a secure, isolated sandbox in your web browser. We guarantee that your source files and the resulting outputs are never transmitted over the internet."}
          </p>
        </div>
      </div>
    </section>
  );
};

export const ChangeVideoResolutionPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#f1f5f9', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <BarChart3 size={48} color="#3b82f6" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', marginBottom: 24 }}>
          {safeData.performanceTitle || "Multi-Threaded Rendering"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#475569', maxWidth: 800, margin: '0 auto 48px', lineHeight: 1.7 }}>
          {safeData.performanceDesc || "By utilizing WebAssembly SIMD and SharedArrayBuffer capabilities, our engine can distribute the pixel interpolation tasks across multiple CPU cores, rendering your video significantly faster."}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
             <div key={i} style={{ padding: '12px 24px', background: 'white', color: '#0f172a', borderRadius: 6, fontWeight: 600, fontSize: '1rem', border: '1px solid #cbd5e1' }}>
               {item}
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
