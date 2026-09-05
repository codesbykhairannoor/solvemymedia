import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

export const Footer: React.FC = () => {
  const { currentLang, t, languages } = useLanguage();
  const navigate = useNavigate();
  const prefix = currentLang === 'en' ? '' : `/${currentLang}`;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    const currentPath = window.location.pathname;
    
    // Remove the current language prefix if it exists
    let cleanPath = currentPath;
    if (currentLang !== 'en' && cleanPath.startsWith(`/${currentLang}`)) {
      cleanPath = cleanPath.slice(currentLang.length + 1);
    }
    
    // Add the new language prefix
    if (newLang === 'en') {
      window.location.href = cleanPath || '/';
    } else {
      window.location.href = `/${newLang}${cleanPath}`;
    }
  };

  return (
    <footer style={{
      background: 'var(--bg-app)',
      borderTop: '1px solid var(--border-color)',
      padding: '60px 24px',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, justifyContent: 'space-between' }}>
        
        <div style={{ flex: '1 1 300px' }}>
          <Link to={prefix || '/'} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--text-main)', marginBottom: 24 }}>
            <img src="/logoweb.png" alt="SolveMyMedia Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
            <span style={{ fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.02em' }}>
              SolveMy<span style={{ background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Media</span>
            </span>
          </Link>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1rem', maxWidth: 400 }}>
            The next-generation browser media tools. Compress, convert, edit, and transcribe your media files entirely in your browser without ever sending them to the cloud.
          </p>
        </div>

        <div style={{ flex: '1 1 200px' }}>
          <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 24 }}>{t('footerCompany') || 'Legal'}</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <li>
              <Link to={`${prefix}/about-us`} className="footer-link">{t('footerAboutUs') || 'About Us'}</Link>
            </li>
            <li>
              <Link to={`${prefix}/privacy-policy`} className="footer-link">{t('footerPrivacyPolicy') || 'Privacy Policy'}</Link>
            </li>
            <li>
              <Link to={`${prefix}/terms-of-service`} className="footer-link">{t('footerTermsOfService') || 'Terms of Service'}</Link>
            </li>
            <li>
              <Link to={`${prefix}/security`} className="footer-link">{t('footerSecurity') || 'Security & Trust'}</Link>
            </li>
          </ul>
        </div>

        <div style={{ flex: '1 1 200px' }}>
          <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 24 }}>{t('footerResources') || 'Resources'}</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <li>
              <Link to={`${prefix}/pricing`} className="footer-link">{t('footerPricing') || 'Pricing'}</Link>
            </li>
            <li>
              <Link to={`${prefix}/compare`} className="footer-link">{t('footerCompare') || 'Compare'}</Link>
            </li>
            <li>
              <Link to={`${prefix}/supported-languages`} className="footer-link">{t('footerSupportedLanguages') || 'Supported Languages'}</Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div style={{ maxWidth: 1200, margin: '48px auto 0', paddingTop: 24, borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
          &copy; {new Date().getFullYear()} SolveMyMedia. {t('footerCopyright') || 'All rights reserved.'}
        </p>
        
        <div>
          <select 
            value={currentLang} 
            onChange={handleLanguageChange}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)',
              background: 'var(--bg-app)',
              color: 'var(--text-main)',
              cursor: 'pointer'
            }}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

      </div>
      
      <style>{`
        .footer-link {
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
        }
        .footer-link:hover {
          color: var(--brand-primary);
        }
      `}</style>
    </footer>
  );
};
