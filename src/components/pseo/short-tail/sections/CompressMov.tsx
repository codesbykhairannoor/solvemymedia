import React from 'react';
import { Smartphone, HardDrive, ShieldCheck, Zap, Maximize, CloudOff, Cpu } from 'lucide-react';

export const CompressMovHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px 80px', 
      background: 'radial-gradient(ellipse at top, #f5f5f7, #ffffff)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(0,0,0,0.03)', borderRadius: 30, color: '#1d1d1f', fontWeight: 600, fontSize: '0.9rem', marginBottom: 32, backdropFilter: 'blur(10px)' }}>
          <Smartphone size={16} color="#0071e3" /> Made for iPhone & Mac Video
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', 
          fontWeight: 700, 
          color: '#1d1d1f',
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          marginBottom: 24,
          maxWidth: 900,
          margin: '0 auto 24px'
        }}>
          {h1 || "Shrink Massive MOV Files Instantly"}
        </h1>
        
        <p style={{ 
          fontSize: '1.3rem', 
          color: '#86868b', 
          lineHeight: 1.6, 
          maxWidth: 750,
          margin: '0 auto 48px'
        }}>
          {description || "iPhone 4K and ProRes videos are beautiful, but their massive file sizes fill up your iCloud in days. Compress them by up to 90% without visible quality loss."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '10px 24px', 
              background: 'white', 
              borderRadius: 16, 
              color: '#1d1d1f', 
              fontWeight: 500,
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              border: '1px solid #f5f5f7'
            }}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CompressMovBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#1d1d1f', textAlign: 'center', marginBottom: 64, letterSpacing: '-0.03em' }}>
          {safeData.benefitsTitle || "Reclaim Your iCloud Storage"}
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {/* Storage saving bento box */}
          <div style={{ background: '#f5f5f7', padding: '48px 32px', borderRadius: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <HardDrive size={32} color="#ff3b30" />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#1d1d1f', marginBottom: 16 }}>{safeData.benefitsItems?.[0] || "Save Gigabytes"}</h3>
            <p style={{ color: '#86868b', lineHeight: 1.6 }}>{safeData.benefitsDesc || "A single minute of 4K ProRes can be 6GB. We can crunch that down to under 100MB while keeping it stunning on a retina display."}</p>
          </div>
          
          {/* High quality bento box */}
          <div style={{ background: '#f5f5f7', padding: '48px 32px', borderRadius: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <Maximize size={32} color="#0071e3" />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#1d1d1f', marginBottom: 16 }}>{safeData.benefitsItems?.[1] || "Retina Ready"}</h3>
            <p style={{ color: '#86868b', lineHeight: 1.6 }}>We use advanced variable bitrate encoding. The video stays incredibly sharp, you just lose the bloated invisible data.</p>
          </div>

          {/* Sharing bento box */}
          <div style={{ background: '#f5f5f7', padding: '48px 32px', borderRadius: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <Zap size={32} color="#34c759" />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#1d1d1f', marginBottom: 16 }}>{safeData.benefitsItems?.[2] || "Easy iMessage Sharing"}</h3>
            <p style={{ color: '#86868b', lineHeight: 1.6 }}>Bypass the frustrating 'File Too Large' error when sending videos to friends and family over iMessage or WhatsApp.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CompressMovPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#000000', color: '#f5f5f7', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <ShieldCheck size={56} color="#0071e3" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 20 }}>
          {safeData.privacyTitle || "Processed Securely, Like Apple Intended"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#a1a1aa', lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>
          {safeData.privacyDesc || "Your private memories shouldn't sit on a random cloud server. Our tool runs strictly inside your web browser. No uploads, no servers, absolute privacy."}
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 40, padding: '12px 24px', background: '#1d1d1f', borderRadius: 12 }}>
          <CloudOff size={24} color="#34c759" />
          <span style={{ fontWeight: 600 }}>100% Offline Processing</span>
        </div>
      </div>
    </section>
  );
};

export const CompressMovPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#f5f5f7', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1d1d1f', marginBottom: 24, letterSpacing: '-0.03em' }}>
            {safeData.performanceTitle || "Optimized for Apple Silicon"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#86868b', lineHeight: 1.7, marginBottom: 32 }}>
            {safeData.performanceDesc || "Whether you're on an M1 Mac or an iPhone, our compressor taps directly into your device's native hardware encoder. It's incredibly fast and won't drain your battery."}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {safeData.performanceItems?.map((item: string, i: number) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '1.1rem', fontWeight: 500, color: '#1d1d1f' }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: '#e8e8ed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Cpu size={16} color="#0071e3" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          {/* Mockup of a chip/processor */}
          <div style={{ width: 250, height: 250, background: '#1d1d1f', borderRadius: 40, border: '4px solid #333', boxShadow: '0 30px 60px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 20, right: 20, width: 12, height: 12, borderRadius: '50%', background: '#34c759' }} />
            <Cpu size={100} color="#ffffff" style={{ opacity: 0.1, position: 'absolute' }} />
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', zIndex: 2 }}>WEB CODECS</div>
          </div>
        </div>
      </div>
    </section>
  );
};
