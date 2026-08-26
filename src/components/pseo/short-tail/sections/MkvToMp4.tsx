import React from 'react';
import { Database, FileVideo, CheckCircle2, ChevronRight, PlaySquare, Workflow } from 'lucide-react';

export const MkvToMp4Hero: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section style={{ 
      background: '#09090b', 
      color: '#f8fafc', 
      padding: '120px 24px 80px', 
      borderBottom: '1px solid #27272a',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at top right, rgba(var(--brand-primary-rgb), 0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
      
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#18181b', padding: '6px 16px', borderRadius: 6, marginBottom: 24, border: '1px solid #3f3f46' }}>
          <Database size={16} color="var(--brand-secondary)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#a1a1aa' }}>Heavy Duty Demuxing</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: 24, textShadow: '0 4px 20px rgba(0,0,0,0.5)', letterSpacing: '-0.02em' }}>
          {data.h1}
        </h1>
        
        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', lineHeight: 1.6, color: '#a1a1aa', maxWidth: 700, marginBottom: 40 }}>
          {data.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {data.bespokeData?.heroTags?.map((tag: string, idx: number) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e4e4e7', fontSize: '1rem', fontWeight: 500 }}>
              <CheckCircle2 size={20} color="var(--brand-primary)" />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const MkvToMp4Benefits: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section style={{ padding: '120px 24px', background: '#18181b' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#f8fafc', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.03em' }}>
            {data.bespokeData?.benefitsTitle || "The Smart Demuxing Pipeline"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#a1a1aa', maxWidth: 800, margin: '0 auto' }}>
            {data.bespokeData?.benefitsDesc || "MKV is a container, not a codec. If your MKV already contains H.264 video, we simply extract the video track and package it into an MP4 container. No quality loss, zero rendering time."}
          </p>
        </div>

        {/* Pipeline Diagram */}
        <div style={{ background: '#09090b', padding: '60px 40px', borderRadius: 24, border: '1px solid #27272a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2vw', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 100, height: 100, background: '#27272a', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #3f3f46' }}>
              <FileVideo size={48} color="#f8fafc" />
            </div>
            <div style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.2rem' }}>Source MKV</div>
            <div style={{ color: '#71717a', fontSize: '0.9rem', textAlign: 'center' }}>H.264 Video<br/>+ AAC Audio</div>
          </div>

          <ChevronRight size={48} color="#3f3f46" />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 100, height: 100, background: 'rgba(var(--brand-primary-rgb), 0.1)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--brand-primary)' }}>
              <Workflow size={48} color="var(--brand-primary)" />
            </div>
            <div style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.2rem' }}>Remuxing Engine</div>
            <div style={{ color: '#71717a', fontSize: '0.9rem', textAlign: 'center' }}>Stream Copy<br/>(No Re-encoding)</div>
          </div>

          <ChevronRight size={48} color="#3f3f46" />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 100, height: 100, background: 'var(--brand-primary)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(var(--brand-primary-rgb), 0.4)' }}>
              <PlaySquare size={48} color="white" />
            </div>
            <div style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.2rem' }}>Target MP4</div>
            <div style={{ color: '#71717a', fontSize: '0.9rem', textAlign: 'center' }}>Universal Playback<br/>100% Original Quality</div>
          </div>

        </div>
      </div>
    </section>
  );
};

export const MkvToMp4Performance: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section style={{ padding: '80px 24px', background: '#09090b', borderTop: '1px solid #27272a' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: 24, color: '#f8fafc' }}>
          {data.features?.[0]?.title || "Subtitle Support"}
        </h2>
        <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#a1a1aa', borderLeft: '4px solid var(--brand-secondary)', paddingLeft: 24 }}>
          {data.features?.[0]?.desc || "Maintains video integrity and audio synchronization flawlessly. We preserve all primary video and audio tracks precisely as they were in the original MKV."}
        </p>
      </div>
    </section>
  );
};

export const MkvToMp4Privacy: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section style={{ padding: '100px 24px', background: '#18181b' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', background: '#27272a', borderRadius: 24, padding: '60px 40px', color: '#f8fafc' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 24 }}>
          {data.features?.[1]?.title || "Offline by Design"}
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#a1a1aa', maxWidth: 600, lineHeight: 1.7, marginBottom: 40 }}>
          {data.features?.[1]?.desc || "MKV files are often huge movie rips or long recordings. Uploading a 5GB file to a cloud converter is impractical. We run the conversion locally, saving you hours of upload time and ensuring your files stay strictly on your hard drive."}
        </p>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ background: '#09090b', padding: '12px 24px', borderRadius: 8, fontWeight: 700, color: 'var(--brand-secondary)', border: '1px solid #3f3f46' }}>Zero Upload</div>
          <div style={{ background: '#09090b', padding: '12px 24px', borderRadius: 8, fontWeight: 700, color: 'var(--brand-secondary)', border: '1px solid #3f3f46' }}>No Size Limits</div>
        </div>
      </div>
    </section>
  );
};
