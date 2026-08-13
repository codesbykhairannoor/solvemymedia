import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialBlockProps {
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
}

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({ quote, author, role, avatarUrl }) => {
  return (
    <div style={{
      marginBottom: '80px',
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: 800,
        width: '100%',
        background: 'var(--bg-elevated)',
        borderRadius: 32,
        padding: 'clamp(32px, 6vw, 64px)',
        position: 'relative',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden'
      }}>
        {/* Decorative Quote Mark */}
        <div style={{
          position: 'absolute',
          top: -20,
          left: -10,
          opacity: 0.05,
          color: 'var(--brand-primary)'
        }}>
          <Quote size={180} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 24 }}>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Star key={i} size={24} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
            ))}
          </div>
          
          <p style={{
            fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
            fontWeight: 500,
            lineHeight: 1.6,
            color: 'var(--text-main)',
            marginBottom: 40,
            fontStyle: 'italic'
          }}>
            "{quote}"
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            {avatarUrl ? (
              <img src={avatarUrl} alt={author} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--brand-primary), #EC4899)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '1.5rem', fontWeight: 700
              }}>
                {author.charAt(0)}
              </div>
            )}
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{author}</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
