import React from 'react';
import { Scissors, Volume2, ShieldCheck, PlayCircle, FastForward, Sliders } from 'lucide-react';

export const TrimAudioHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: '#111827', // Deep slate
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 20px', background: '#374151', borderRadius: 8, color: '#4ade80', fontWeight: 700, marginBottom: 32, letterSpacing: '1px' }}>
          <Scissors size={18} /> AUDIO CUTTER
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
          fontWeight: 800, 
          color: '#f9fafb',
          lineHeight: 1.1,
          marginBottom: 24,
          textAlign: 'center',
          letterSpacing: '-0.02em'
        }}>
          {h1 || "Trim Your Audio Files"}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#9ca3af', 
          lineHeight: 1.7, 
          maxWidth: 650,
          textAlign: 'center',
          marginBottom: 48
        }}>
          {description || "Cut out the silence at the beginning of a podcast, or isolate the chorus of a song to make a ringtone. Precision audio trimming right in your browser."}
        </p>

        {/* Mock Trimmer UI */}
        <div style={{ width: '100%', maxWidth: 800, height: 120, background: '#1f2937', borderRadius: 16, border: '2px solid #374151', position: 'relative', overflow: 'hidden', padding: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Waveform mock */}
          <div style={{ width: '90%', height: '80%', display: 'flex', alignItems: 'center', gap: 4, opacity: 0.3 }}>
            {Array.from({length: 40}).map((_, i) => (
              <div key={i} style={{ flex: 1, height: `${Math.max(10, Math.random() * 100)}%`, background: '#9ca3af', borderRadius: 4 }} />
            ))}
          </div>
          {/* Active trim area */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '25%', right: '35%', background: 'rgba(74, 222, 128, 0.1)', borderLeft: '4px solid #4ade80', borderRight: '4px solid #4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#4ade80', color: '#000', padding: '4px 12px', borderRadius: 20, fontSize: '0.85rem', fontWeight: 800 }}>ACTIVE REGION</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 48 }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '10px 20px', 
              background: '#064e3b', 
              border: '1px solid #059669',
              borderRadius: 4, 
              color: '#34d399', 
              fontWeight: 600,
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

export const TrimAudioBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#1f2937', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#f9fafb', textAlign: 'center', marginBottom: 64 }}>
          {safeData.benefitsTitle || "What Can You Make?"}
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {[
            { icon: <Volume2 />, title: "Custom Ringtones", desc: safeData.benefitsItems?.[0] || "Don't pay for ringtones. Upload your favorite MP3 and cut out the exact 30-second chorus loop you want." },
            { icon: <PlayCircle />, title: "Podcast Snippets", desc: safeData.benefitsItems?.[1] || "Create short teaser clips of your long-form podcasts to share on Twitter or Instagram." },
            { icon: <Sliders />, title: "Remove Dead Air", desc: safeData.benefitsItems?.[2] || "Trim off the long silent intros or outros from voice memos and lecture recordings." }
          ].map((item, i) => (
            <div key={i} style={{ padding: 32, background: '#111827', borderRadius: 16, borderTop: '4px solid #4ade80' }}>
              <div style={{ marginBottom: 24, color: '#4ade80' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f9fafb', marginBottom: 16 }}>{item.title}</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TrimAudioPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#111827', color: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '64px 32px', background: '#374151', borderRadius: 32 }}>
        <ShieldCheck size={64} color="#4ade80" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 20 }}>
          {safeData.privacyTitle || "Secure Local Cutting"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#d1d5db', lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>
          {safeData.privacyDesc || "Trimming a 100MB WAV file shouldn't require a 100MB upload. We utilize your browser's local RAM to slice the audio file securely without it ever touching our servers."}
        </p>
      </div>
    </section>
  );
};

export const TrimAudioPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: '#1f2937', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 64, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f9fafb', marginBottom: 24 }}>
            {safeData.performanceTitle || "Millisecond Precision"}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#9ca3af', lineHeight: 1.7, marginBottom: 32 }}>
            {safeData.performanceDesc || "Use our intuitive waveform scrubber to find the exact millisecond you want to cut. Powered by the high-performance WebAudio API."}
          </p>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            {safeData.performanceItems?.map((item: string, i: number) => (
              <div key={i} style={{ background: '#111827', padding: '24px', borderRadius: 12, borderLeft: '4px solid #4ade80', display: 'flex', alignItems: 'center', gap: 16 }}>
                <FastForward size={24} color="#4ade80" />
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f9fafb' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
