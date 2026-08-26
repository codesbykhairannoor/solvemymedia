import React from 'react';
import { ArrowRight, AudioWaveform, Cpu, Download, FileAudio, Lock, Settings, ShieldCheck, Zap } from 'lucide-react';

export const Mp4ToMp3Hero: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)', color: 'white', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: 'var(--brand-primary)', filter: 'blur(150px)', opacity: 0.15, borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: -50, left: -50, width: 300, height: 300, background: 'var(--brand-secondary)', filter: 'blur(120px)', opacity: 0.1, borderRadius: '50%' }} />
      
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: 999, marginBottom: 24, border: '1px solid rgba(255,255,255,0.05)' }}>
          <AudioWaveform size={16} color="var(--brand-primary)" />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Studio-Grade Extraction</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          {data.h1}
        </h1>
        
        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', maxWidth: 700, margin: '0 auto 40px' }}>
          {data.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
          {data.bespokeData?.heroTags?.map((tag: string, idx: number) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.3)', padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
              <ShieldCheck size={16} color="var(--brand-secondary)" />
              <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Mp4ToMp3Benefits: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.1, marginBottom: 24 }}>
              {data.bespokeData?.benefitsTitle || "Lossless Audio Extraction Pipeline"}
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40 }}>
              {data.bespokeData?.benefitsDesc || "Unlike traditional converters that re-record the audio and ruin quality, our engine demuxes the MP4 container and pulls out the pristine audio stream."}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {data.bespokeData?.benefitsItems?.map((item: string, idx: number) => (
                <div key={idx} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4 }}>
                    <Zap size={18} color="white" />
                  </div>
                  <div style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 600, lineHeight: 1.6 }}>
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ flex: '1 1 400px', background: '#0f172a', padding: 40, borderRadius: 32, position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 20, marginBottom: 30 }}>
              <div style={{ color: 'white', fontWeight: 700, display: 'flex', gap: 12, alignItems: 'center' }}>
                <FileAudio color="var(--brand-primary)" /> MP4 Container
              </div>
              <Settings color="rgba(255,255,255,0.3)" />
            </div>
            
            <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
              <div style={{ flex: 1, height: 60, background: 'rgba(255,255,255,0.05)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)' }}>H.264 Video Track</div>
              <div style={{ flex: 1, height: 60, background: 'rgba(var(--brand-primary-rgb), 0.2)', border: '1px solid var(--brand-primary)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>AAC Audio Track</div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
              <ArrowRight color="var(--brand-secondary)" size={32} style={{ transform: 'rotate(90deg)' }} />
            </div>
            
            <div style={{ background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))', height: 80, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.2rem', boxShadow: '0 10px 20px rgba(var(--brand-primary-rgb), 0.3)' }}>
              MP3 / AAC Export
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Mp4ToMp3Performance: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section style={{ padding: '80px 24px', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, margin: '0 auto 24px', background: 'rgba(var(--brand-primary-rgb), 0.1)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Cpu size={32} color="var(--brand-primary)" />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: 24, color: 'var(--text-main)' }}>
          {data.features?.[0]?.title || "Client-Side Processing"}
        </h2>
        <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
          {data.features?.[0]?.desc || "Harness the power of WebAssembly. Your MP4 is decoded and transcribed right inside your browser using your CPU, making it up to 10x faster than cloud services."}
        </p>
      </div>
    </section>
  );
};

export const Mp4ToMp3Privacy: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', background: 'linear-gradient(135deg, #0f172a, #020617)', borderRadius: 40, padding: '60px 40px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 0%, rgba(var(--brand-secondary-rgb), 0.15) 0%, transparent 70%)' }} />
        
        <Lock size={48} color="var(--brand-secondary)" style={{ marginBottom: 24, position: 'relative', zIndex: 1 }} />
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 24, position: 'relative', zIndex: 1 }}>
          {data.features?.[1]?.title || "Strict Zero-Upload Privacy"}
        </h2>
        <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.7)', maxWidth: 600, lineHeight: 1.7, marginBottom: 40, position: 'relative', zIndex: 1 }}>
          {data.features?.[1]?.desc || "Because the extraction runs locally, your videos are never uploaded to any server. Perfect for unreleased music, confidential recordings, and private videos."}
        </p>
        
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px 24px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontWeight: 600 }}>No Servers</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px 24px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontWeight: 600 }}>No Tracking</span>
          </div>
        </div>
      </div>
    </section>
  );
};
