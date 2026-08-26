import React from 'react';
import { Scissors, Music, Video, ArrowDownToLine, Zap, FileAudio } from 'lucide-react';

export const ExtractAudioFromVideoHero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: '#ffffff', // Crisp white
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 24px', background: '#eff6ff', borderRadius: 30, color: '#2563eb', fontWeight: 600, marginBottom: 32, letterSpacing: '1px' }}>
          <Scissors size={18} /> AUDIO EXTRACTION TOOL
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
          fontWeight: 900, 
          color: '#0f172a',
          lineHeight: 1.1,
          marginBottom: 24,
          letterSpacing: '-0.04em'
        }}>
          {h1 || "Rip Audio from Any Video"}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#475569', 
          lineHeight: 1.7, 
          maxWidth: 700,
          margin: '0 auto 48px'
        }}>
          {description || "Have a concert recording or a podcast that was uploaded as a video? Extract the high-quality MP3 or WAV audio track in one click, without losing fidelity."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '10px 24px', 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0',
              borderRadius: 30, 
              color: '#334155', 
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

export const ExtractAudioFromVideoBenefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          {/* Mock Surgical Extraction Graphic */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 200, height: 100, background: '#1e293b', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', position: 'relative' }}>
              <Video size={32} />
              <div style={{ position: 'absolute', bottom: -12, background: 'white', padding: '4px 12px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '0.8rem', fontWeight: 600 }}>.MP4 (500MB)</div>
            </div>
            
            <div style={{ height: 60, borderLeft: '2px dashed #94a3b8', position: 'relative' }}>
               <Scissors size={24} color="#3b82f6" style={{ position: 'absolute', top: '50%', left: -12, transform: 'translateY(-50%)' }} />
            </div>

            <div style={{ width: 120, height: 60, background: '#eff6ff', border: '2px solid #3b82f6', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', position: 'relative' }}>
              <Music size={24} />
              <div style={{ position: 'absolute', bottom: -12, background: 'white', padding: '4px 12px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: '0.8rem', fontWeight: 600 }}>.MP3 (5MB)</div>
            </div>
          </div>
        </div>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', marginBottom: 24, letterSpacing: '-0.03em' }}>
            {safeData.benefitsTitle || "Listen on the Go"}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.7, marginBottom: 40 }}>
            {safeData.benefitsDesc || "Videos drain your phone battery and can't be played when your screen is off. Extract the audio to listen to lectures, stand-up comedy, or music mixes like a podcast."}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
            {[
              { icon: <FileAudio />, title: "Original Quality", desc: safeData.benefitsItems?.[0] || "We extract the exact AAC or MP3 stream embedded in the video, meaning zero quality is lost." },
              { icon: <ArrowDownToLine />, title: "Save Storage", desc: safeData.benefitsItems?.[1] || "A 2GB video file becomes a 20MB audio file. Save massive amounts of space on your hard drive." }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, padding: '24px', background: 'white', borderRadius: 20, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                <div style={{ color: '#2563eb', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ color: '#475569', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ExtractAudioFromVideoPrivacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#eff6ff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1e3a8a', marginBottom: 20 }}>
          {safeData.privacyTitle || "Fast & Private"}
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#1e40af', lineHeight: 1.8 }}>
          {safeData.privacyDesc || "Uploading a massive video just to download a tiny audio file is a waste of time. Our tool extracts the audio track locally in your browser. No data ever hits our servers."}
        </p>
      </div>
    </section>
  );
};

export const ExtractAudioFromVideoPerformance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 64, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: 24 }}>
            {safeData.performanceTitle || "Instant Demuxing"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: 1.7, marginBottom: 32 }}>
            {safeData.performanceDesc || "Separating audio from video is called 'demuxing'. Because we aren't re-encoding the video, the process takes literally seconds using WebAssembly."}
          </p>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {safeData.performanceItems?.map((item: string, i: number) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <Zap size={24} color="#3b82f6" />
                <span style={{ color: '#0f172a', fontWeight: 600, fontSize: '1.1rem' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
