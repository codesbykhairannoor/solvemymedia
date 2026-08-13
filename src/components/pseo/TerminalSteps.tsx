import React from 'react';

interface TerminalStepsProps {
  title: string;
  steps: string[];
}

export const TerminalSteps: React.FC<TerminalStepsProps> = ({ title, steps }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ background: '#000', borderRadius: 16, border: '1px solid #333', padding: 32, fontFamily: 'monospace', color: '#0f0', fontSize: '1.1rem' }}>
        <div style={{ color: '#fff', fontWeight: 800, marginBottom: 24, fontSize: '1.3rem' }}>$ {title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {steps.map((s, i) => (
            <div key={i}>
              <span style={{ color: '#888' }}>[{i+1}/{steps.length}]</span> {s}
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <span style={{ display: 'inline-block', width: 10, height: 20, background: '#0f0', animation: 'blink 1s step-end infinite' }}></span>
          </div>
        </div>
      </div>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
};