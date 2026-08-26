import React from 'react';
import { Maximize2, ShieldCheck, Scale, Cpu, Network, Ratio } from 'lucide-react';

export const ResizeVideoHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: '#0a192f', // Navy blue
      backgroundImage: 'radial-gradient(#112240 1px, transparent 1px)',
      backgroundSize: '20px 20px', // Blueprint grid
      color: '#ccd6f6',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 24px', background: '#112240', borderRadius: 4, border: '1px solid #233554', color: '#64ffda', fontWeight: 600, marginBottom: 40, letterSpacing: '2px', textTransform: 'uppercase' }}>
          <Scale size={16} /> Resolution Scaling
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
          fontWeight: 800, 
          color: '#e6f1ff',
          lineHeight: 1.1,
          marginBottom: 24,
          letterSpacing: '-0.02em'
        }}>
          {h1 || "Resize Video Dimensions"}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#8892b0', 
          lineHeight: 1.7, 
          maxWidth: 700,
          margin: '0 auto 48px'
        }}>
          {description || "Downscale a massive 4K video to 1080p to save storage, or upscale a 720p clip to match your project sequence settings. Fast, local, and private."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '8px 20px', 
              background: '#0a192f', 
              border: '1px solid #64ffda',
              borderRadius: 4, 
              color: '#64ffda', 
              fontWeight: 500,
              fontSize: '0.9rem'
            }}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ResizeVideoBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0a192f', marginBottom: 24 }}>
            {safeData.benefitsTitle || "Standardize Your Media"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#495670', lineHeight: 1.7, marginBottom: 40 }}>
            {safeData.benefitsDesc || "Mixing 4K drone footage with a 1080p webcam recording in a video editor can cause performance issues. Standardizing your video resolutions before editing saves rendering time."}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
            {[
              { icon: <Maximize2 />, title: "Scale Down 4K", desc: safeData.benefitsItems?.[0] || "4K is often overkill for web videos. Downscale to 1920x1080 to reduce file size by up to 75% while keeping it sharp." },
              { icon: <Ratio />, title: "Maintain Aspect Ratio", desc: safeData.benefitsItems?.[1] || "Our scaler automatically calculates the correct height or width to ensure your video isn't stretched or squished." }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, padding: '24px', background: '#f8fafd', borderRadius: 16, border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#0369a1', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a192f', marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ color: '#495670', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
           {/* Mock Blueprint Box Graphic */}
           <div style={{ width: 400, height: 225, background: '#0a192f', border: '2px solid #64ffda', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ color: '#64ffda', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '2px' }}>3840 x 2160</div>
              {/* Inner box */}
              <div style={{ position: 'absolute', width: 200, height: 112.5, background: 'rgba(100, 255, 218, 0.1)', border: '2px dashed #64ffda', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ color: '#64ffda', fontWeight: 800, fontSize: '1rem', letterSpacing: '1px' }}>1920 x 1080</div>
              </div>
              {/* Corner markers */}
              <div style={{ position: 'absolute', top: -5, left: -5, width: 10, height: 10, background: '#64ffda' }} />
              <div style={{ position: 'absolute', top: -5, right: -5, width: 10, height: 10, background: '#64ffda' }} />
              <div style={{ position: 'absolute', bottom: -5, left: -5, width: 10, height: 10, background: '#64ffda' }} />
              <div style={{ position: 'absolute', bottom: -5, right: -5, width: 10, height: 10, background: '#64ffda' }} />
           </div>
        </div>
      </div>
    </section>
  );
};

export const ResizeVideoPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#112240', color: '#ccd6f6', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <ShieldCheck size={56} color="#64ffda" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 20, color: '#e6f1ff' }}>
          {safeData.privacyTitle || "No Network Required"}
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#8892b0', lineHeight: 1.8 }}>
          {safeData.privacyDesc || "Scaling a gigabyte-sized 4K video over the internet is a massive privacy risk and a waste of bandwidth. Our scaler uses your local hardware to interpolate the pixels directly in your browser."}
        </p>
      </div>
    </section>
  );
};

export const ResizeVideoPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#f8fafd', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <Cpu size={48} color="#0369a1" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0a192f', marginBottom: 24 }}>
          {safeData.performanceTitle || "Hardware Accelerated Interpolation"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#495670', maxWidth: 800, margin: '0 auto 48px', lineHeight: 1.7 }}>
          {safeData.performanceDesc || "Changing a video's resolution requires complex mathematical interpolation (Bicubic, Lanczos) for every single frame. We utilize WebAssembly to unlock near-native C++ performance."}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
             <div key={i} style={{ padding: '16px 32px', background: 'white', color: '#0369a1', borderRadius: 8, fontWeight: 700, fontSize: '1.1rem', border: '1px solid #e2e8f0' }}>
               {item}
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
