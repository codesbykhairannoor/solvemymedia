import React from 'react';
import { Mail } from 'lucide-react';

interface NewsletterSignupProps {
  title: string;
  description: string;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ title, description }) => {
  return (
    <div style={{ marginBottom: '80px', padding: 'clamp(48px, 6vw, 80px) 24px', background: 'var(--bg-card)', borderRadius: 32, border: '1px solid var(--border-color)', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', padding: 16, background: 'rgba(168,85,247,0.1)', borderRadius: '50%', color: 'var(--brand-primary)', marginBottom: 24 }}>
        <Mail size={32} />
      </div>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
      <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto 40px' }}>{description}</p>
      <form style={{ display: 'flex', gap: 12, maxWidth: 500, margin: '0 auto' }} onSubmit={e => e.preventDefault()}>
        <input type="email" placeholder="Enter your email..." style={{ flex: 1, padding: '16px 24px', borderRadius: 99, border: '1px solid var(--border-color)', background: 'var(--bg-elevated)', color: 'var(--text-main)', fontSize: '1.1rem', outline: 'none' }} />
        <button type="submit" style={{ padding: '16px 32px', borderRadius: 99, background: 'var(--text-main)', color: 'var(--bg-main)', border: 'none', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}>Subscribe</button>
      </form>
    </div>
  );
};