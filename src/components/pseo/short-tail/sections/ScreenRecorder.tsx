import React from 'react';
import { MonitorPlay, Bug, Laptop, ShieldCheck, Download, Video } from 'lucide-react';

export const ScreenRecorderHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: 'linear-gradient(to bottom, #eff6ff, #ffffff)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 24px', background: 'white', borderRadius: 30, color: '#3b82f6', fontWeight: 700, marginBottom: 32, boxShadow: '0 4px 15px rgba(59, 130, 246, 0.1)', border: '1px solid #bfdbfe' }}>
          <MonitorPlay size={18} /> IN-BROWSER CAPTURE
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', 
          fontWeight: 900, 
          color: '#1e3a8a',
          lineHeight: 1.1,
          marginBottom: 24,
          letterSpacing: '-0.03em'
        }}>
          {h1 || "Record Your Screen Instantly"}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#475569', 
          lineHeight: 1.7, 
          maxWidth: 700,
          margin: '0 auto 48px'
        }}>
          {description || "Don't download clunky software just to record a 30-second tutorial. Capture your screen, window, or tab directly from your browser, completely free."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '10px 24px', 
              background: '#2563eb', 
              borderRadius: 30, 
              color: 'white', 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
            }}>
              <Video size={16} /> {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ScreenRecorderBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#1e3a8a', textAlign: 'center', marginBottom: 20 }}>
          {safeData.benefitsTitle || "Built for Support & Tutorials"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#64748b', textAlign: 'center', marginBottom: 64, maxWidth: 700, margin: '0 auto 64px' }}>
          {safeData.benefitsDesc || "Whether you're showing your grandma how to use Facebook or reporting a bug to your developers, a video is worth a million words."}
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ flex: '1 1 300px', padding: 40, background: '#f8fafc', borderRadius: 24, border: '1px solid #e2e8f0' }}>
            <div style={{ width: 64, height: 64, background: '#dbeafe', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: '#2563eb' }}>
              <Bug size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e3a8a', marginBottom: 16 }}>{safeData.benefitsItems?.[0] || "Perfect Bug Reports"}</h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>Record exactly what steps reproduce an issue. Developers can fix bugs 10x faster when they can see it happening.</p>
          </div>
          
          <div style={{ flex: '1 1 300px', padding: 40, background: '#f8fafc', borderRadius: 24, border: '1px solid #e2e8f0' }}>
            <div style={{ width: 64, height: 64, background: '#dbeafe', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: '#2563eb' }}>
              <Laptop size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e3a8a', marginBottom: 16 }}>{safeData.benefitsItems?.[1] || "No Watermarks"}</h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>Other free recorders limit you to 5 minutes or slap a huge watermark on your video. We have zero restrictions.</p>
          </div>

          <div style={{ flex: '1 1 300px', padding: 40, background: '#f8fafc', borderRadius: 24, border: '1px solid #e2e8f0' }}>
            <div style={{ width: 64, height: 64, background: '#dbeafe', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: '#2563eb' }}>
              <Download size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e3a8a', marginBottom: 16 }}>{safeData.benefitsItems?.[2] || "Instant Download"}</h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>As soon as you hit stop, the WebM or MP4 file is ready to download to your desktop instantly. No rendering time.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ScreenRecorderPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#1e3a8a', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <ShieldCheck size={64} color="#60a5fa" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 24 }}>
          {safeData.privacyTitle || "We Can't See Your Screen"}
        </h2>
        <p style={{ fontSize: '1.25rem', color: '#bfdbfe', lineHeight: 1.7, maxWidth: 650, margin: '0 auto' }}>
          {safeData.privacyDesc || "The recording is piped directly into your browser's local memory. The video never leaves your computer, ensuring absolute privacy for sensitive documents or emails."}
        </p>
      </div>
    </section>
  );
};

export const ScreenRecorderPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 64, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e3a8a', marginBottom: 24 }}>
            {safeData.performanceTitle || "Native MediaRecorder API"}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#64748b', lineHeight: 1.7, marginBottom: 32 }}>
            {safeData.performanceDesc || "We harness the power of modern web standards. By utilizing your browser's native MediaRecorder API, we can capture high-framerate video without lagging your computer."}
          </p>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {safeData.performanceItems?.map((item: string, i: number) => (
              <div key={i} style={{ background: 'white', padding: '24px', borderRadius: 16, boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#3b82f6' }} />
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
