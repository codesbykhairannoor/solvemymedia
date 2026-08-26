import React from 'react';
import { Camera, Video, Smile, ShieldCheck, Download, Film } from 'lucide-react';

export const WebcamRecorderHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: 'linear-gradient(135deg, #f3f4f6, #fee2e2)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ 
          width: 80, height: 80, borderRadius: '50%', background: '#ef4444', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px',
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)'
        }}>
          <Camera size={40} color="white" />
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
          fontWeight: 900, 
          color: '#1f2937',
          lineHeight: 1.1,
          marginBottom: 24,
          letterSpacing: '-0.03em'
        }}>
          {h1 || "Record Your Webcam Instantly"}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#4b5563', 
          lineHeight: 1.7, 
          maxWidth: 700,
          margin: '0 auto 48px'
        }}>
          {description || "Need to record a quick video pitch, a message for a colleague, or a vlog intro? Use your browser to capture 1080p video directly from your webcam."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '10px 20px', 
              background: 'white', 
              borderRadius: 30, 
              color: '#ef4444', 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
            }}>
              <Smile size={18} /> {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WebcamRecorderBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#1f2937', marginBottom: 24 }}>
            {safeData.benefitsTitle || "Better Than Text"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#6b7280', lineHeight: 1.7, marginBottom: 40 }}>
            {safeData.benefitsDesc || "Some things are too complex to type out. A quick 60-second video message conveys emotion, context, and clarity that an email simply can't match."}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
            {[
              { icon: <Video />, title: "Asynchronous Meetings", desc: safeData.benefitsItems?.[0] || "Skip the Zoom call. Record your update and let your team watch it when they have time." },
              { icon: <Film />, title: "Vlog Intros & B-Roll", desc: safeData.benefitsItems?.[1] || "Perfect for YouTubers who need to grab a quick talking-head shot without setting up a DSLR." }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, padding: '24px', background: '#fef2f2', borderRadius: 24 }}>
                <div style={{ color: '#ef4444', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#991b1b', marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ color: '#b91c1c', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
           <div style={{ width: '100%', maxWidth: 400, aspectRatio: '3/4', background: '#e5e7eb', borderRadius: 32, border: '12px solid #1f2937', position: 'relative', overflow: 'hidden' }}>
             <div style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(0,0,0,0.5)', padding: '4px 12px', borderRadius: 20, color: 'white', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', fontWeight: 600 }}>
               <div style={{ width: 8, height: 8, background: '#ef4444', borderRadius: '50%' }} /> REC
             </div>
             {/* Mock face outline */}
             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 120, height: 150, border: '4px dashed #9ca3af', borderRadius: '60px 60px 40px 40px' }} />
           </div>
        </div>
      </div>
    </section>
  );
};

export const WebcamRecorderPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#1f2937', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <ShieldCheck size={56} color="#4ade80" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 20 }}>
          {safeData.privacyTitle || "Your Camera, Your Rules"}
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#9ca3af', lineHeight: 1.8 }}>
          {safeData.privacyDesc || "Giving a website camera access can be scary. That's why our tool never connects to an external server. The video feed is written directly to your local RAM and destroyed when you close the tab."}
        </p>
      </div>
    </section>
  );
};

export const WebcamRecorderPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#fef2f2', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <Download size={48} color="#ef4444" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#991b1b', marginBottom: 24 }}>
          {safeData.performanceTitle || "High-Quality WebM Export"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#7f1d1d', maxWidth: 800, margin: '0 auto 48px', lineHeight: 1.7 }}>
          {safeData.performanceDesc || "Record in crisp 720p or 1080p (depending on your hardware). When you're done, download the compressed WebM file instantly."}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
             <div key={i} style={{ padding: '16px 32px', background: 'white', color: '#ef4444', borderRadius: 12, fontWeight: 700, fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
               {item}
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
