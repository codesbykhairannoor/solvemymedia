import React from 'react';
import { Archive, Video, Clock, HardDrive, ShieldAlert, FastForward } from 'lucide-react';

export const AviToMp4Hero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: '#fdf6e3', // warm retro background
      borderBottom: '4px solid #d4c5b0',
      fontFamily: '"Roboto Slab", serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700;900&display=swap');
      `}</style>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <Archive size={48} color="#b45309" style={{ margin: '0 auto 24px' }} />
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          fontWeight: 900, 
          color: '#451a03',
          lineHeight: 1.1,
          marginBottom: 24
        }}>
          {h1 || "Modernize Your Old AVI Files"}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#78350f', 
          lineHeight: 1.7, 
          maxWidth: 700,
          margin: '0 auto 48px',
          fontFamily: 'system-ui, sans-serif'
        }}>
          {description || "AVI was the king of video in the 90s and 2000s. Today, it struggles to play on modern devices. Convert your archives to MP4 instantly."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              background: '#fef3c7', 
              padding: '8px 20px', 
              borderRadius: 30, 
              color: '#92400e', 
              fontWeight: 600,
              border: '1px solid #fde68a'
            }}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AviToMp4Benefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#fffbeb', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#451a03', marginBottom: 24, fontFamily: '"Roboto Slab", serif' }}>
            {safeData.benefitsTitle || "Rescue Your Digital Memories"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#78350f', lineHeight: 1.7, marginBottom: 32 }}>
            {safeData.benefitsDesc || "Old home videos stored in AVI format take up too much space and are often incompatible with iOS and modern Smart TVs. Convert them to MP4 to preserve them forever in a compressed, universal format."}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              { icon: <Clock />, text: safeData.benefitsItems?.[0] || "Future-proof format" },
              { icon: <Video />, text: safeData.benefitsItems?.[1] || "Mobile playback" },
              { icon: <HardDrive />, text: safeData.benefitsItems?.[2] || "Saves hard drive space" }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#92400e', fontWeight: 600 }}>
                {item.icon} {item.text}
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
           <div style={{ width: 300, height: 400, background: '#d4c5b0', borderRadius: 16, position: 'relative', boxShadow: '20px 20px 0 #b45309' }}>
             <div style={{ position: 'absolute', top: 20, left: 20, right: 20, bottom: 20, background: '#fff', borderRadius: 8, display: 'flex', flexDirection: 'column', padding: 24 }}>
               <div style={{ flex: 1, background: '#f5f5f5', borderRadius: 4, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                 <Video size={48} />
               </div>
               <div style={{ height: 16, background: '#e5e5e5', borderRadius: 4, width: '80%', marginBottom: 8 }} />
               <div style={{ height: 16, background: '#e5e5e5', borderRadius: 4, width: '60%' }} />
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export const AviToMp4Privacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#fdf6e3', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '64px', background: 'white', borderRadius: 32, boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #fde68a' }}>
        <ShieldAlert size={56} color="#b45309" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#451a03', marginBottom: 20, fontFamily: '"Roboto Slab", serif' }}>
          {safeData.privacyTitle || "Keep Family Archives Private"}
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#78350f', lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
          {safeData.privacyDesc || "Your 20-year-old family videos shouldn't be uploaded to a random server. Our converter works 100% offline in your browser. We never see your files."}
        </p>
      </div>
    </section>
  );
};

export const AviToMp4Performance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#451a03', color: '#fef3c7', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: 24, fontFamily: '"Roboto Slab", serif' }}>
              {safeData.performanceTitle || "Hardware Accelerated Decoding"}
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#fcd34d', lineHeight: 1.8, marginBottom: 32 }}>
              {safeData.performanceDesc || "Decoding ancient AVI codecs (like DivX or Xvid) can be slow. We leverage modern WebAssembly to decode them efficiently and re-encode to crisp H.264 MP4 using your device's hardware."}
            </p>
          </div>
          <div style={{ flex: '1 1 400px' }}>
             <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
               {safeData.performanceItems?.map((item: string, i: number) => (
                 <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: 16 }}>
                   <FastForward size={24} color="#fcd34d" />
                   <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{item}</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
