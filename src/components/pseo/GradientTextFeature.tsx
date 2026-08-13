import React from 'react';

interface GradientTextFeatureProps {
  text: string;
}

export const GradientTextFeature: React.FC<GradientTextFeatureProps> = ({ text }) => {
  return (
    <div style={{ marginBottom: '80px', padding: '80px 24px', textAlign: 'center' }}>
      <h2 style={{ 
        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
        fontWeight: 900, 
        lineHeight: 1.2,
        background: 'linear-gradient(270deg, #A855F7, #EC4899, #3B82F6, #A855F7)',
        backgroundSize: '300% 300%',
        animation: 'gradient 8s ease infinite',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        maxWidth: 1000,
        margin: '0 auto'
      }}>
        {text}
      </h2>
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};