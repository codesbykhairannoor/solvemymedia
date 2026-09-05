import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet, useParams } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LanguageProvider } from './hooks/useLanguage';
import { SEO } from './components/seo/SEO';
import { isValidLanguageCode, SUPPORTED_LANGUAGES } from './i18n/languages';

import { Home } from './pages/Home';
import { DynamicToolRoute } from './components/DynamicToolRoute';
import { AboutUs } from './pages/legal/AboutUs';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsOfService } from './pages/legal/TermsOfService';
import { SecurityTrust } from './pages/legal/SecurityTrust';
import { Pricing } from './pages/legal/Pricing';
import { Compare } from './pages/legal/Compare';
import { SupportedLanguages } from './pages/legal/SupportedLanguages';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.skipScroll) return;
    window.scrollTo(0, 0);
  }, [location.pathname, location.state]);
  return null;
}

const getLegalSeoKeys = (pathname: string) => {
  if (pathname.includes('/about-us')) return { title: 'seoAboutUsTitle', desc: 'seoAboutUsDesc' };
  if (pathname.includes('/privacy-policy')) return { title: 'seoPrivacyTitle', desc: 'seoPrivacyDesc' };
  if (pathname.includes('/terms-of-service')) return { title: 'seoTermsTitle', desc: 'seoTermsDesc' };
  if (pathname.includes('/security')) return { title: 'seoSecurityTitle', desc: 'seoSecurityDesc' };
  if (pathname.includes('/pricing')) return { title: 'seoPricingTitle', desc: 'seoPricingDesc' };
  if (pathname.includes('/compare')) return { title: 'seoCompareTitle', desc: 'seoCompareDesc' };
  if (pathname.includes('/supported-languages')) return { title: 'seoSupportedLanguagesTitle', desc: 'seoSupportedLanguagesDesc' };
  return null;
};

// Simple Fallback Loader for Route Transitions
const RouteFallback = () => (
  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div className="loader-spinner" style={{ width: 40, height: 40, border: '3px solid var(--border-color)', borderTopColor: 'var(--brand-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  </div>
);

function LanguageLayout({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) {
  const location = useLocation();
  const firstPathSegment = location.pathname.split('/')[1];
  const isLangCode = isValidLanguageCode(firstPathSegment) && firstPathSegment !== 'en';
  
  const currentLang = isLangCode ? firstPathSegment : 'en';
  const seoKeys = getLegalSeoKeys(location.pathname);

  return (
    <LanguageProvider currentLang={currentLang}>
      {seoKeys && <SEO titleKey={seoKeys.title} descKey={seoKeys.desc} />}
      <div className="app-container" style={{ paddingTop: 60 }}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </div>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const langCodes = SUPPORTED_LANGUAGES.map(l => l.code).filter(c => c !== 'en');

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LanguageLayout theme={theme} toggleTheme={toggleTheme} />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="security" element={<SecurityTrust />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="compare" element={<Compare />} />
          <Route path="supported-languages" element={<SupportedLanguages />} />
          <Route path=":slug" element={<DynamicToolRoute />} />
        </Route>
        
        {langCodes.map(code => (
          <Route key={code} path={`/${code}`} element={<LanguageLayout theme={theme} toggleTheme={toggleTheme} />}>
            <Route index element={<Home />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="security" element={<SecurityTrust />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="compare" element={<Compare />} />
            <Route path="supported-languages" element={<SupportedLanguages />} />
            <Route path=":slug" element={<DynamicToolRoute />} />
          </Route>
        ))}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
