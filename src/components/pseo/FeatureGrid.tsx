import React from 'react';
import { Sparkles, Shield, Zap, Lock, Cpu, Globe } from 'lucide-react';

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  title: string;
  description: string;
  features: FeatureItem[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  'sparkles': <Sparkles size={24} style={{ color: 'var(--brand-primary)' }} />,
  'shield': <Shield size={24} style={{ color: 'var(--success-color)' }} />,
  'zap': <Zap size={24} style={{ color: 'var(--warning-color)' }} />,
  'lock': <Lock size={24} style={{ color: 'var(--success-color)' }} />,
  'cpu': <Cpu size={24} style={{ color: 'var(--brand-primary)' }} />,
  'globe': <Globe size={24} style={{ color: 'var(--info-color)' }} />
};

export const FeatureGrid: React.FC<FeatureGridProps> = ({ title, description, features }) => {
  return (
    <div style={{
      marginBottom: '80px',
      padding: '0 24px',
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
      }}>
        {features.map((feat, index) => (
          <div key={index} style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            borderRadius: 20,
            padding: 32,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'default',
            boxShadow: 'var(--shadow-sm)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            e.currentTarget.style.borderColor = 'var(--brand-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}
          >
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'var(--bg-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              boxShadow: 'var(--shadow-sm)'
            }}>
              {ICON_MAP[feat.icon] || <Sparkles size={24} style={{ color: 'var(--brand-primary)' }} />}
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              marginBottom: 12
            }}>
              {feat.title}
            </h3>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6
            }}>
              {feat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
