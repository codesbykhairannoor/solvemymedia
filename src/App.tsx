import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { DynamicToolRoute } from './components/DynamicToolRoute';
import { Footer } from './components/Footer';
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
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
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

  return (
    <Router>
      <ScrollToTop />
        <div className="app-container" style={{ paddingTop: 60 }}>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              {/* English / Default routes */}
              <Route path="/" element={<Home />} />
              <Route path="/:slug" element={<DynamicToolRoute />} />
              
              {/* Legal Pages */}
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/security" element={<SecurityTrust />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/supported-languages" element={<SupportedLanguages />} />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          
          <Footer />
        </div>
    </Router>
  );
}

export default App;
