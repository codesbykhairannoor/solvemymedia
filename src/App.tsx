import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { DynamicToolRoute } from './components/DynamicToolRoute';

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
        <div className="app-container" style={{ paddingTop: 60 }}>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              {/* English / Default routes */}
              <Route path="/" element={<Home />} />
              <Route path="/:slug" element={<DynamicToolRoute />} />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
