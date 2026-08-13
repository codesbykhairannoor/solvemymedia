import React from 'react';
import { Terminal } from 'lucide-react';

interface CodeSnippetProps {
  title: string;
  description: string;
  code: string;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({ title, description, code }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: 700, margin: '0 auto' }}>{description}</p>
      </div>
      <div style={{ background: '#0D1117', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: '#161B22' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F' }} />
          <Terminal size={16} style={{ color: '#8B949E', marginLeft: 'auto' }} />
        </div>
        <div style={{ padding: '24px', overflowX: 'auto' }}>
          <pre style={{ margin: 0, color: '#C9D1D9', fontSize: '1rem', fontFamily: 'monospace', lineHeight: 1.6 }}>
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};