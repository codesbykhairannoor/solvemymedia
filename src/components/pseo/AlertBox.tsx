import React from 'react';
import { Lightbulb } from 'lucide-react';

interface AlertBoxProps {
  title: string;
  description: string;
}

export const AlertBox: React.FC<AlertBoxProps> = ({ title, description }) => {
  return (
    <div style={{
      marginBottom: '80px',
      padding: '0 24px',
    }}>
      <div style={{
        background: 'linear-gradient(145deg, rgba(168,85,247,0.1) 0%, rgba(168,85,247,0.02) 100%)',
        border: '1px solid rgba(168,85,247,0.3)',
        borderRadius: 24,
        padding: 'clamp(24px, 4vw, 40px)',
        display: 'flex',
        gap: 24,
        alignItems: 'flex-start',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--brand-primary)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 12px rgba(168,85,247,0.3)'
        }}>
          <Lightbulb size={28} />
        </div>
        
        <div>
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            color: 'var(--text-main)',
            marginBottom: 12
          }}>
            {title}
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6
          }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
