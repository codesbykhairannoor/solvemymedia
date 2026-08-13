import React from 'react';

interface TerminalStepsProps {
  title: string;
  steps: string[];
}

export const TerminalSteps: React.FC<TerminalStepsProps> = ({ title, steps }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        {/* Terminal Header */}
        <div style={{ height: 40, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8, borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ marginLeft: 8, fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>terminal</span>
        </div>
        {/* Terminal Content */}
        <div style={{ flex: 1, padding: 32, fontFamily: 'var(--font-main)', color: 'var(--text-main)', fontSize: '1.1rem', lineHeight: 1.6 }}>
          <div style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 24, letterSpacing: '-0.02em' }}>{title}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <span style={{ color: 'var(--brand-primary)', fontWeight: 700, fontFamily: 'monospace' }}>[{i+1}/{steps.length}]</span>
                <span style={{ color: 'var(--text-muted)' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};