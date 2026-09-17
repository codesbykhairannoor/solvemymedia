import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedSlug } from '../i18n/slugs';
import { ShieldCheck, Zap, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { currentLang, t, languages } = useLanguage();
  const prefix = currentLang === 'en' ? '' : `/${currentLang}`;

  const getToolUrl = (enSlug: string) => {
    const locSlug = getLocalizedSlug(enSlug, currentLang);
    return currentLang === 'en' ? `/${locSlug}` : `/${currentLang}/${locSlug}`;
  };

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

  const videoTools = [
    { slug: 'compress-video', labelKey: 'navbarCompressVideo', fallback: 'Compress Video' },
    { slug: 'convert-video', labelKey: 'toolConvertVideoName', fallback: 'Convert Video' },
    { slug: 'video-to-audio', labelKey: 'navbarVideoToAudio', fallback: 'Video to Audio' },
    { slug: 'crop-video', labelKey: 'navbarCropVideo', fallback: 'Crop Video' },
    { slug: 'video-speed', labelKey: 'navbarVideoSpeed', fallback: 'Video Speed' },
    { slug: 'mute-video', labelKey: 'navbarMuteVideo', fallback: 'Mute Video' },
    { slug: 'watermark-video', labelKey: 'toolWatermarkVideoName', fallback: 'Watermark Video' },
    { slug: 'create-gif', labelKey: 'navbarCreateGif', fallback: 'Video to GIF' },
  ];

  const audioTools = [
    { slug: 'compress-audio', labelKey: 'navbarCompressAudio', fallback: 'Compress Audio' },
    { slug: 'convert-audio', labelKey: 'navbarConvertAudio', fallback: 'Convert Audio' },
    { slug: 'merge-audio', labelKey: 'toolMergeAudioName', fallback: 'Merge Audio' },
    { slug: 'transcribe', labelKey: 'navbarTranscribe', fallback: 'Transcribe Media (AI)' },
    { slug: 'recorder', labelKey: 'navbarRecorder', fallback: 'Studio Recorder' },
  ];

  const popularWorkflows = [
    { slug: 'compress-large-video-for-whatsapp', fallback: 'Compress for WhatsApp' },
    { slug: 'reduce-mp4-video-size-for-email', fallback: 'Reduce MP4 for Email' },
    { slug: 'convert-mov-to-mp4-for-android', fallback: 'Convert MOV for Android' },
    { slug: 'extract-audio-from-video-for-podcast', fallback: 'Extract Audio for Podcast' },
    { slug: 'speed-up-video-for-tiktok', fallback: 'Speed Up Video for TikTok' },
  ];

  return (
    <footer style={{
      background: 'var(--bg-app)',
      borderTop: '1px solid var(--border-color)',
      padding: '70px 24px 40px',
      marginTop: 'auto'
    }}>
      <div style={{ 
        maxWidth: 1240, 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: 40,
        marginBottom: 48 
      }}>
        
        {/* Brand & Mission */}
        <div style={{ gridColumn: 'span 1' }}>
          <Link to={prefix || '/'} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--text-main)', marginBottom: 20 }}>
            <img src="/logoweb.png" alt="SolveMyMedia Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
            <span style={{ fontWeight: 900, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>
              SolveMy<span style={{ background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Media</span>
            </span>
          </Link>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.65, fontSize: '0.92rem', margin: '0 0 20px' }}>
            {t('footerBrandDesc') || 'Next-generation private browser media tools. Compress, convert, transcribe, and edit entirely in your browser memory.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>100% Zero-Upload Privacy</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--brand-secondary)', fontWeight: 600 }}>
              <Zap size={16} />
              <span>WebAssembly Powered</span>
            </div>
          </div>
        </div>

        {/* Video Tools */}
        <div>
          <h4 style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 18 }}>
            {t('footerVideoTools') || 'Video Tools'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {videoTools.map((tool) => (
              <li key={tool.slug}>
                <Link to={getToolUrl(tool.slug)} className="footer-link">
                  {(tool.labelKey && t(tool.labelKey as any)) || tool.fallback}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Audio Tools */}
        <div>
          <h4 style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 18 }}>
            {t('footerAudioTools') || 'Audio Tools'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {audioTools.map((tool) => (
              <li key={tool.slug}>
                <Link to={getToolUrl(tool.slug)} className="footer-link">
                  {(tool.labelKey && t(tool.labelKey as any)) || tool.fallback}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Solutions */}
        <div>
          <h4 style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 18 }}>
            {t('footerSolutions') || 'Workflows'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {popularWorkflows.map((flow) => (
              <li key={flow.slug}>
                <Link to={getToolUrl(flow.slug)} className="footer-link">
                  {flow.fallback}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company & Resources */}
        <div>
          <h4 style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 18 }}>
            {t('footerCompany') || 'Legal & Info'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
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
      
      {/* Bottom Bar: Copyright & Language Selector */}
      <div style={{ 
        maxWidth: 1240, 
        margin: '0 auto', 
        paddingTop: 24, 
        borderTop: '1px solid var(--border-color)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: 16 
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
          &copy; {new Date().getFullYear()} SolveMyMedia. {t('footerCopyright') || 'All rights reserved.'} • Free, Private Browser Tools.
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Globe size={16} style={{ color: 'var(--text-muted)' }} />
          <select 
            value={currentLang} 
            onChange={handleLanguageChange}
            aria-label="Select Language"
            style={{ 
              padding: '6px 14px', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-main)',
              fontSize: '0.88rem',
              cursor: 'pointer',
              outline: 'none'
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
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
          display: inline-block;
        }
        .footer-link:hover {
          color: var(--brand-primary);
          transform: translateX(2px);
        }
      `}</style>
    </footer>
  );
};
