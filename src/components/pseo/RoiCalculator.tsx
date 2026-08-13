import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

interface RoiCalculatorProps {
  title: string;
  description: string;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ title, description }) => {
  const [value, setValue] = useState(10);
  
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ display: 'inline-flex', padding: 16, background: 'rgba(34,197,94,0.1)', color: 'var(--success-color)', borderRadius: '50%', marginBottom: 16 }}><Calculator size={32} /></div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)' }}>{description}</p>
      </div>
      <div style={{ maxWidth: 600, margin: '0 auto', background: 'var(--bg-elevated)', padding: 40, borderRadius: 32, border: '1px solid var(--border-color)', textAlign: 'center' }}>
        <div style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 600, marginBottom: 24 }}>Files compressed per day: <strong>{value}</strong></div>
        <input type="range" min="1" max="100" value={value} onChange={e => setValue(Number(e.target.value))} style={{ width: '100%', marginBottom: 48, accentColor: 'var(--brand-primary)' }} />
        
        <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: 12 }}>Bandwidth Saved Monthly</div>
        <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--success-color)', lineHeight: 1 }}>{Math.round(value * 15 * 30 / 1024)} <span style={{fontSize: '2rem'}}>GB</span></div>
      </div>
    </div>
  );
};