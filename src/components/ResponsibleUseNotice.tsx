import React from 'react';
import { ShieldCheck, Scale } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const ResponsibleUseNotice: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div style={{
      maxWidth: 1000,
      margin: '40px auto 0',
      padding: '18px 24px',
      borderRadius: 16,
      background: 'rgba(234, 179, 8, 0.04)',
      border: '1px solid rgba(234, 179, 8, 0.22)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16,
      textAlign: 'left',
      boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: 'rgba(234, 179, 8, 0.12)',
        color: '#eab308',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: 2
      }}>
        <Scale size={20} />
      </div>
      <div>
        <div style={{
          fontWeight: 800,
          fontSize: '0.92rem',
          color: '#eab308',
          letterSpacing: '-0.01em',
          marginBottom: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span>{t('ethicalNoticeTitle') || 'Responsible Use & Privacy Protection Policy'}</span>
          <span style={{
            fontSize: '0.68rem',
            padding: '2px 8px',
            borderRadius: 6,
            background: 'rgba(234, 179, 8, 0.15)',
            color: '#ca8a04',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            Ethical Standard
          </span>
        </div>
        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          margin: 0
        }}>
          {t('ethicalNoticeDesc') || 'SolveMyMedia is built strictly for personal privacy protection (sanitizing GPS geotags, hardware serials, and local user paths) and legitimate media cataloging. We do NOT endorse document forgery, identity deception, copyright evasion, or tampering with digital provenance. Users remain solely responsible for lawful and ethical use.'}
        </p>
      </div>
    </div>
  );
};
