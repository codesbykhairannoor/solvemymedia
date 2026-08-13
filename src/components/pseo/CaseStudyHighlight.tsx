import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CaseStudyHighlightProps {
  title: string;
  metrics: { value: string; label: string }[];
  quote: string;
  author: string;
}

export const CaseStudyHighlight: React.FC<CaseStudyHighlightProps> = ({ title, metrics, quote, author }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '0 24px' }}>
      <div style={{ background: 'linear-gradient(135deg, var(--bg-card), var(--bg-elevated))', borderRadius: 32, border: '1px solid var(--border-color)', padding: 'clamp(32px, 5vw, 64px)', display: 'flex', flexWrap: 'wrap', gap: 48 }}>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ color: 'var(--brand-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Case Study</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-main)', marginBottom: 32, lineHeight: 1.2 }}>{title}</h2>
          <div style={{ fontSize: '1.25rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 24, borderLeft: '4px solid var(--brand-primary)', paddingLeft: 24 }}>"{quote}"</div>
          <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>— {author}</div>
        </div>
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'center' }}>
          {metrics.map((m, i) => (
            <div key={i} style={{ background: 'rgba(168,85,247,0.05)', padding: 24, borderRadius: 16, border: '1px solid rgba(168,85,247,0.2)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--brand-primary)', marginBottom: 8 }}>{m.value}</div>
              <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 500 }}>{m.label}</div>
            </div>
          ))}
          <button style={{ background: 'transparent', color: 'var(--text-main)', border: 'none', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '16px 0' }}>
            Read Full Case Study <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};