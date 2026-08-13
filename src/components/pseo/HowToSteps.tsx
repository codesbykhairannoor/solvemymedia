import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StepItem {
  title: string;
  description: string;
}

interface HowToStepsProps {
  title: string;
  description: string;
  steps: StepItem[];
}

export const HowToSteps: React.FC<HowToStepsProps> = ({ title, description, steps }) => {
  return (
    <div style={{
      marginBottom: '80px',
      padding: 'clamp(32px, 5vw, 64px)',
      background: 'transparent'
    }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
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

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 32,
        position: 'relative'
      }}>
        {steps.map((step, index) => (
          <div key={index} style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            borderRadius: 20,
            padding: 32,
            position: 'relative',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'var(--brand-primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: 800,
              marginBottom: 24,
              boxShadow: '0 4px 12px rgba(168,85,247,0.3)'
            }}>
              {index + 1}
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              marginBottom: 12
            }}>
              {step.title}
            </h3>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6
            }}>
              {step.description}
            </p>
            
            {index < steps.length - 1 && (
              <div style={{
                position: 'absolute',
                top: 56,
                right: -28,
                color: 'var(--border-color)',
                display: 'none', // Hidden on mobile, ideally shown on desktop via CSS query, but we can just use inline styles for now
              }} className="step-arrow">
                <ArrowRight size={24} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
