import React from 'react';
import { Crop, Smartphone, Monitor, ShieldAlert, Cpu, Maximize, Frame } from 'lucide-react';

export const CropVideoHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: 'linear-gradient(135deg, #fdf4ff 0%, #fff1f2 100%)',
      fontFamily: '"Outfit", system-ui, sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;900&display=swap');
      `}</style>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        
        {/* Mock Aspect Ratio Graphic */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 24, margin: '0 auto 40px', height: 120 }}>
          {/* 16:9 */}
          <div style={{ width: 160, height: 90, border: '3px solid #e11d48', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e11d48', fontWeight: 900, fontSize: '1.2rem', position: 'relative' }}>
            <Monitor size={20} style={{ position: 'absolute', top: 8, left: 8, opacity: 0.5 }} />
            16:9
          </div>
          {/* 1:1 */}
          <div style={{ width: 100, height: 100, border: '3px solid #db2777', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777', fontWeight: 900, fontSize: '1.2rem', position: 'relative' }}>
            1:1
          </div>
          {/* 9:16 */}
          <div style={{ width: 67, height: 120, border: '3px solid #c026d3', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c026d3', fontWeight: 900, fontSize: '1.2rem', position: 'relative', background: 'rgba(192, 38, 211, 0.1)' }}>
            <Smartphone size={20} style={{ position: 'absolute', top: 8, opacity: 0.5 }} />
            <span style={{ transform: 'rotate(-90deg)' }}>9:16</span>
          </div>
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.8rem, 6vw, 5rem)', 
          fontWeight: 900, 
          color: '#831843',
          lineHeight: 1.1,
          marginBottom: 24,
          letterSpacing: '-0.03em'
        }}>
          {h1 || "Crop Videos for Every Screen"}
        </h1>
        
        <p style={{ 
          fontSize: '1.3rem', 
          color: '#9f1239', 
          lineHeight: 1.6, 
          maxWidth: 700,
          margin: '0 auto 48px',
          fontWeight: 500
        }}>
          {description || "Have a landscape YouTube video but need a portrait TikTok? Reframe your shot, remove black bars, or crop out annoying watermarks in seconds."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '10px 24px', 
              background: 'linear-gradient(90deg, #db2777, #e11d48)', 
              borderRadius: 30, 
              color: 'white', 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 15px rgba(225, 29, 72, 0.3)'
            }}>
              <Crop size={18} /> {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CropVideoBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'white', fontFamily: '"Outfit", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#831843', textAlign: 'center', marginBottom: 24 }}>
          {safeData.benefitsTitle || "Repurpose Your Content"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#be123c', textAlign: 'center', marginBottom: 64, maxWidth: 700, margin: '0 auto 64px' }}>
          {safeData.benefitsDesc || "Don't shoot the same video twice. Shoot in high resolution once, and use our cropping tool to extract the perfect framing for every platform."}
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {[
            { icon: <Smartphone />, title: "Landscape to Portrait", desc: safeData.benefitsItems?.[0] || "Select the 9:16 aspect ratio preset to perfectly frame your widescreen video for Instagram Reels or TikTok." },
            { icon: <Frame />, title: "Remove Watermarks", desc: safeData.benefitsItems?.[1] || "Got a video from a free editor that slapped a logo on the bottom? Just crop the bottom 10% off the video." },
            { icon: <Maximize />, title: "Remove Black Bars", desc: safeData.benefitsItems?.[2] || "Letterboxing ruins the mobile viewing experience. Crop into the center of the frame to fill the entire screen." }
          ].map((item, i) => (
            <div key={i} style={{ padding: 40, background: '#fff1f2', borderRadius: 32, border: '2px solid #ffe4e6' }}>
              <div style={{ width: 64, height: 64, background: '#fce7f3', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: '#db2777' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#881337', marginBottom: 16 }}>{item.title}</h3>
              <p style={{ color: '#9f1239', lineHeight: 1.6, fontSize: '1.1rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CropVideoPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#db2777', color: 'white', fontFamily: '"Outfit", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <ShieldAlert size={80} color="#fbcfe8" />
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 20 }}>
            {safeData.privacyTitle || "No Cloud Processing"}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#fce7f3', lineHeight: 1.8 }}>
            {safeData.privacyDesc || "Uploading 4K video to a cloud server to crop it takes forever and exposes your data. Our tool re-renders the pixels locally on your machine using your browser's resources."}
          </p>
        </div>
      </div>
    </section>
  );
};

export const CropVideoPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#fff1f2', fontFamily: '"Outfit", system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <Cpu size={48} color="#e11d48" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#881337', marginBottom: 24 }}>
          {safeData.performanceTitle || "WASM Pixel Re-encoding"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#be123c', maxWidth: 800, margin: '0 auto 48px', lineHeight: 1.7 }}>
          {safeData.performanceDesc || "Unlike trimming, cropping requires physically changing the pixel dimensions of every frame. We use a compiled version of FFmpeg in WebAssembly to process this heavily intensive task."}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
             <div key={i} style={{ padding: '16px 32px', background: 'white', color: '#e11d48', borderRadius: 16, fontWeight: 700, fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(225, 29, 72, 0.1)' }}>
               {item}
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
