import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatBoxProps {
  title: string;
  description: string;
  statValue: string;
  statLabel: string;
}

export const StatBox: React.FC<StatBoxProps> = ({ title, description, statValue, statLabel }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
      padding: 'clamp(32px, 5vw, 64px)',
      background: 'var(--bg-elevated)',
      borderRadius: 24,
      border: '1px solid var(--border-color)',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      marginBottom: '80px'
    }}>
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-10%',
        width: '80%',
        height: '150%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 800, fontFamily: 'Outfit, sans-serif',
            lineHeight: 1.2,
            color: 'var(--text-main)',
            marginBottom: 16
          }}>
            {title}
          </h2>
          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.8,
            color: 'var(--text-muted)'
          }}>
            {description}
          </p>
        </div>

        <div style={{
          flex: '0 0 auto',
          background: 'rgba(168,85,247,0.05)',
          border: '1px solid rgba(168,85,247,0.2)',
          borderRadius: 20,
          padding: '32px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'var(--bg-card)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: 8
          }}>
            <TrendingUp size={24} style={{ color: 'var(--brand-primary)' }} />
          </div>
          <div style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 800, fontFamily: 'Outfit, sans-serif',
            color: 'var(--text-main)',
            lineHeight: 1.2,
            letterSpacing: '-0.03em'
          }}>
            {statValue}
          </div>
          <div style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--brand-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {statLabel}
          </div>
        </div>
      </div>
    </div>
  );
};
