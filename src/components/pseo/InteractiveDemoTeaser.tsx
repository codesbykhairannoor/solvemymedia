import React from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';

interface InteractiveDemoTeaserProps {
  title: string;
  description: string;
}

export const InteractiveDemoTeaser: React.FC<InteractiveDemoTeaserProps> = ({ title, description }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: 700, margin: '0 auto' }}>{description}</p>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 24, padding: 32, boxShadow: '0 24px 48px rgba(0,0,0,0.2)' }}>
        <div style={{ border: '2px dashed var(--border-color)', borderRadius: 16, padding: '64px 24px', textAlign: 'center', background: 'rgba(168,85,247,0.02)', cursor: 'pointer', transition: 'border-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--brand-primary)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}>
          <UploadCloud size={48} style={{ color: 'var(--brand-primary)', margin: '0 auto 16px' }} />
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>Drag & drop fake file here</div>
          <div style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Try compressing a file (Simulated)</div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
          <div style={{ flex: 1, height: 8, background: 'var(--success-color)', borderRadius: 4 }} />
          <div style={{ flex: 1, height: 8, background: 'var(--bg-elevated)', borderRadius: 4 }} />
          <div style={{ flex: 1, height: 8, background: 'var(--bg-elevated)', borderRadius: 4 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}><CheckCircle size={14} style={{color: 'var(--success-color)'}}/> 100% Local</span>
          <span>Fast Compression</span>
        </div>
      </div>
    </div>
  );
};