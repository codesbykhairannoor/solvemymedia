import React from 'react';
import { Mic, Smartphone, Share2, Shield, FastForward } from 'lucide-react';

export const M4aToMp3Hero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '100px 24px', 
      background: '#f5f5f7',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, margin: '0 auto 32px', background: '#ffffff', borderRadius: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Mic size={40} color="#ff3b30" />
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', 
          fontWeight: 700, 
          color: '#1d1d1f',
          lineHeight: 1.1,
          marginBottom: 24,
          letterSpacing: '-0.03em'
        }}>
          {h1 || "Convert Voice Memos to MP3"}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#86868b', 
          lineHeight: 1.6, 
          marginBottom: 40
        }}>
          {description || "Apple devices record audio in M4A format by default. Convert your iPhone voice memos or iTunes tracks to universal MP3s in a single click."}
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <span key={i} style={{ padding: '6px 16px', background: '#e8e8ed', borderRadius: 20, color: '#1d1d1f', fontSize: '0.95rem', fontWeight: 500 }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export const M4aToMp3Benefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 700, color: '#1d1d1f', marginBottom: 24, textAlign: 'center' }}>
          {safeData.benefitsTitle || "Share With Anyone, Anywhere"}
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#86868b', textAlign: 'center', marginBottom: 64, maxWidth: 600, margin: '0 auto 64px' }}>
          {safeData.benefitsDesc || "Not everyone uses an Apple device. Ensure your recordings can be played on Android phones, Windows PCs, and older car stereos."}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {[
            { icon: <Smartphone />, title: "Android Ready", desc: safeData.benefitsItems?.[0] || "Send memos to non-iOS users without playback errors." },
            { icon: <Share2 />, title: "Easy Sharing", desc: safeData.benefitsItems?.[1] || "MP3s are supported by every messaging app." },
            { icon: <FastForward />, title: "Batch Support", desc: safeData.benefitsItems?.[2] || "Convert your entire iTunes library at once." }
          ].map((item, i) => (
            <div key={i} style={{ padding: 40, background: '#f5f5f7', borderRadius: 32, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ffffff', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', color: '#0071e3' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#1d1d1f', marginBottom: 12 }}>{item.title}</h3>
              <p style={{ color: '#86868b', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const M4aToMp3Privacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#1d1d1f', color: '#f5f5f7', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <Shield size={56} color="#34c759" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 20 }}>
          {safeData.privacyTitle || "Your Voice Stays on Your Device"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#86868b', lineHeight: 1.6 }}>
          {safeData.privacyDesc || "Voice memos are deeply personal. Our converter never uploads your recordings. The conversion happens instantly in your browser cache, guaranteeing 100% privacy."}
        </p>
      </div>
    </section>
  );
};

export const M4aToMp3Performance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#f5f5f7', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#1d1d1f', marginBottom: 20 }}>
            {safeData.performanceTitle || "Instant Processing"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#86868b', lineHeight: 1.6, marginBottom: 32 }}>
            {safeData.performanceDesc || "Converting a 1-hour lecture recording takes seconds, not minutes. We use your device's native hardware capabilities to encode the MP3 instantly."}
          </p>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ background: '#ffffff', borderRadius: 24, padding: 32, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            {safeData.performanceItems?.map((item: string, i: number) => (
              <div key={i} style={{ padding: '16px 0', borderBottom: i !== safeData.performanceItems.length - 1 ? '1px solid #e8e8ed' : 'none', color: '#1d1d1f', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 12 }}>
                 <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0071e3' }} /> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
