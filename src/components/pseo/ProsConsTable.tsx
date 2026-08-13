import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ProsConsProps {
  title: string;
  description: string;
  pros: string[];
  cons: string[];
}

export const ProsConsTable: React.FC<ProsConsProps> = ({ title, description, pros, cons }) => {
  return (
    <div style={{
      marginBottom: '80px',
      padding: 'clamp(32px, 5vw, 64px)',
      background: 'var(--bg-card)',
      borderRadius: 24,
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: 800,
          lineHeight: 1.2,
          color: 'var(--text-main)',
          marginBottom: 16
        }}>
          {title}
        </h2>
        <p style={{
          fontSize: '1.15rem',
          lineHeight: 1.8,
          color: 'var(--text-muted)',
          maxWidth: 700,
          margin: '0 auto'
        }}>
          {description}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
        {/* PROS */}
        <div style={{
          background: 'rgba(34, 197, 94, 0.05)',
          border: '1px solid rgba(34, 197, 94, 0.2)',
          borderRadius: 16,
          padding: 32
        }}>
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--text-main)',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <CheckCircle2 style={{ color: 'var(--success-color)' }} />
            Pros
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {pros.map((pro, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-color)', flexShrink: 0, marginTop: 4 }} />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CONS */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.05)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: 16,
          padding: 32
        }}>
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--text-main)',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <XCircle style={{ color: 'var(--danger-color)' }} />
            Cons
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cons.map((con, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                <XCircle size={18} style={{ color: 'var(--danger-color)', flexShrink: 0, marginTop: 4 }} />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
