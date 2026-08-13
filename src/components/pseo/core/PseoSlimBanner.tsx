import React from 'react';
import { Code } from 'lucide-react';

interface PseoSlimBannerProps {
  title: string;
  description?: string;
  tags?: string[];
}

export const PseoSlimBanner: React.FC<PseoSlimBannerProps> = ({
  title,
  description,
  tags = ['Offline Processing', 'No Uploads', 'Browser Sandbox']
}) => {
  return (
    <section className="seo-section technology" style={{ padding: '80px 24px', background: 'var(--brand-gradient)', color: 'white' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <Code size={48} style={{ marginBottom: 32, opacity: 0.9, margin: '0 auto 32px auto' }} />
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          {title}
        </h2>
        {description && (
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8, maxWidth: 700, margin: '0 auto 48px' }}>
            {description}
          </p>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          {tags.map(tech => (
            <div key={tech} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.1)', borderRadius: 100, fontWeight: 700, border: '1px solid rgba(255,255,255,0.2)' }}>
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
