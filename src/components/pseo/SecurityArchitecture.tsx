import React from 'react';
import { Lock, Smartphone, ArrowRight, ServerOff } from 'lucide-react';

interface SecurityArchitectureProps {
  title: string;
  description: string;
}

export const SecurityArchitecture: React.FC<SecurityArchitectureProps> = ({ title, description }) => {
  return (
    <div style={{ marginBottom: '80px', padding: 'clamp(32px, 5vw, 64px)', background: 'var(--bg-elevated)', borderRadius: 32, border: '1px solid var(--border-color)' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)' }}>{description}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <div style={{ padding: 32, background: 'var(--bg-card)', borderRadius: 24, border: '2px solid var(--brand-primary)', textAlign: 'center' }}>
          <Smartphone size={48} style={{ color: 'var(--brand-primary)', margin: '0 auto 16px' }} />
          <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Your Device</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--success-color)' }}>100% Processing</div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--danger-color)' }}>
          <ServerOff size={32} />
          <div style={{ fontWeight: 600 }}>Blocked</div>
        </div>
        
        <div style={{ padding: 32, background: 'rgba(239, 68, 68, 0.05)', borderRadius: 24, border: '1px dashed var(--danger-color)', textAlign: 'center', opacity: 0.5 }}>
          <Lock size={48} style={{ color: 'var(--danger-color)', margin: '0 auto 16px' }} />
          <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Cloud Servers</div>
          <div style={{ fontSize: '0.9rem' }}>0 Bytes Uploaded</div>
        </div>
      </div>
    </div>
  );
};