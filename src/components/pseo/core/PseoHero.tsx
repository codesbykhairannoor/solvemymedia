import React from 'react';
import { Sparkles } from 'lucide-react';
import { smartHighlight } from '../../../utils/textFormatting';

interface PseoHeroProps {
  title: string;
  description: string;
  badgeText?: string;
  icon?: React.ElementType;
}

export const PseoHero: React.FC<PseoHeroProps> = ({ 
  title, 
  description, 
  badgeText = "Fast & Private", 
  icon: Icon = Sparkles 
}) => {
  return (
    <section className="seo-section hero" style={{ padding: '100px 24px', margin: '80px 0 60px', background: 'var(--bg-card)', borderRadius: 40, border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
      {/* Floating Objects */}
      <div className="floating-object hidden-mobile" style={{ position: 'absolute', top: '10%', left: '5%', width: 64, height: 64, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid rgba(255,255,255,0.8)', zIndex: 20, transform: 'rotate(6deg)', animation: 'float 6s ease-in-out infinite' }}>
        🚀
      </div>
      <div className="floating-object hidden-mobile" style={{ position: 'absolute', bottom: '15%', right: '8%', width: 80, height: 80, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: 32, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', border: '1px solid rgba(255,255,255,0.8)', zIndex: 20, transform: 'rotate(-12deg)', animation: 'float 8s ease-in-out infinite' }}>
        ✨
      </div>
      <div className="floating-object hidden-tablet" style={{ position: 'absolute', top: '20%', right: '12%', width: 56, height: 56, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: 20, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', border: '1px solid rgba(255,255,255,0.8)', zIndex: 20, transform: 'rotate(15deg)', animation: 'float 7s ease-in-out infinite reverse' }}>
        ⚡
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 30 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: '50%', background: 'var(--brand-gradient)', color: 'white', marginBottom: 32, boxShadow: '0 10px 30px rgba(225, 29, 72, 0.2)' }}>
          <Icon size={40} />
        </div>
        
        {badgeText && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
             <div style={{ display: 'inline-flex', padding: '8px 16px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 100, color: 'var(--text-main)', fontWeight: 700, fontSize: '0.85rem', gap: 8, alignItems: 'center' }}>
                <span style={{ color: 'var(--brand-primary)' }}>•</span> {badgeText}
             </div>
          </div>
        )}
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: 24, color: 'var(--text-main)', letterSpacing: '-0.04em', lineHeight: 1.1, fontFamily: 'Outfit, sans-serif' }}>
          {smartHighlight(title)}
        </h1>
        <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 800, margin: '0 auto' }}>
          {description}
        </p>
      </div>
    </section>
  );
};
