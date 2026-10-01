import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sun, Moon, ChevronDown, ChevronUp, Search, Menu, X,
  Video, Music, Scissors, Minimize2, Image,
  Mic, FileAudio, RotateCw, Crop, VolumeX, Stamp, FastForward,
  ShieldCheck, Zap, Sparkles
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedSlug, getStandardSlug } from '../i18n/slugs';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const TOOL_DISPLAY_NAMES: Record<string, Record<string, string>> = {
  id: {
    'compress-video': 'Kompres Video',
    'cut-video': 'Potong Video',
    'convert-video': 'Konversi Video',
    'video-speed': 'Kecepatan Video',
    'crop-video': 'Pangkas Video',
    'create-gif': 'Buat GIF',
    'mute-video': 'Bisukan Video',
    'watermark-video': 'Watermark Video',
    'compress-audio': 'Kompres Audio',
    'convert-audio': 'Konversi Audio',
    'video-to-audio': 'Video ke Audio',
    'merge-audio': 'Gabung Audio',
    'transcribe': 'Transkripsi AI',
    'recorder': 'Perekam Layar',
  },
  ms: {
    'compress-video': 'Mampatkan Video',
    'cut-video': 'Potong Video',
    'convert-video': 'Tukar Video',
    'video-speed': 'Kelajuan Video',
    'crop-video': 'Pangkas Video',
    'create-gif': 'Buat GIF',
    'mute-video': 'Bisukan Video',
    'watermark-video': 'Watermark Video',
    'compress-audio': 'Mampatkan Audio',
    'convert-audio': 'Tukar Audio',
    'video-to-audio': 'Video ke Audio',
    'merge-audio': 'Gabung Audio',
    'transcribe': 'Transkripsi AI',
    'recorder': 'Perakam Skrin',
  },
  en: {
    'compress-video': 'Compress Video',
    'cut-video': 'Cut Video',
    'convert-video': 'Convert Video',
    'video-speed': 'Video Speed',
    'crop-video': 'Crop Video',
    'create-gif': 'Create GIF',
    'mute-video': 'Mute Video',
    'watermark-video': 'Watermark Video',
    'compress-audio': 'Compress Audio',
    'convert-audio': 'Convert Audio',
    'video-to-audio': 'Video to Audio',
    'merge-audio': 'Merge Audio',
    'transcribe': 'AI Transcribe',
    'recorder': 'Screen Recorder',
  }
};

const MI: React.FC<{
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  highlight?: boolean;
  badge?: string;
}> = ({ icon: Icon, label, onClick, highlight, badge }) => (
  <div
    onClick={onClick}
    className="mega-menu-item"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '7px 10px',
      borderRadius: 9,
      cursor: 'pointer',
      transition: 'all 0.18s ease',
      border: '1px solid transparent',
      ...(highlight ? { background: 'rgba(168,85,247,0.06)', borderColor: 'rgba(168,85,247,0.22)' } : {})
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flex: 1 }}>
      <Icon size={15} color="var(--brand-primary)" style={{ flexShrink: 0 }} />
      <span className="item-title" style={{
        fontSize: '0.82rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.01em',
        color: highlight ? 'var(--brand-primary)' : 'var(--text-main)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {label}
      </span>
    </div>
    {badge && (
      <span style={{
        fontSize: '0.62rem',
        fontWeight: 800,
        padding: '2px 5px',
        borderRadius: 5,
        background: highlight ? 'var(--brand-gradient)' : 'rgba(var(--brand-secondary-rgb), 0.15)',
        color: highlight ? '#ffffff' : 'var(--brand-secondary)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        flexShrink: 0,
        marginLeft: 6
      }}>
        {badge}
      </span>
    )}
  </div>
);

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLang, t, languages } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const langRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLang: string) => {
    setIsLangOpen(false);
    setLangSearch('');
    if (newLang === currentLang) return;
    
    const currentPath = location.pathname;
    let cleanPath = currentPath;
    if (currentLang !== 'en' && cleanPath.startsWith(`/${currentLang}`)) {
      cleanPath = cleanPath.slice(currentLang.length + 1) || '/';
    }
    
    // Convert current localized slug to standard, then to new localized slug
    if (cleanPath !== '/') {
      const parts = cleanPath.split('/').filter(Boolean);
      const slugCandidate = parts[0];
      if (slugCandidate) {
        const standardSlug = getStandardSlug(slugCandidate, currentLang);
        const newLocalizedSlug = getLocalizedSlug(standardSlug, newLang);
        cleanPath = `/${newLocalizedSlug}`;
      }
    }
    
    const newPath = newLang === 'en' ? (cleanPath || '/') : `/${newLang}${cleanPath === '/' ? '' : cleanPath}`;
    navigate(newPath, { replace: true, state: { skipScroll: true } });
  };
  
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAllOpen, setIsMobileAllOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  const getToolName = (toolId: string) => {
    if (TOOL_DISPLAY_NAMES[currentLang]?.[toolId]) {
      return TOOL_DISPLAY_NAMES[currentLang][toolId];
    }
    const localized = getLocalizedSlug(toolId, currentLang);
    return localized.replace(/-/g, " ");
  };

  const handleToolClick = (path: string) => {
    setIsMegaOpen(false);
    setIsMobileMenuOpen(false);
    const localizedSlug = getLocalizedSlug(path, currentLang);
    const prefix = currentLang === 'en' ? '' : `/${currentLang}`;
    navigate(`${prefix}/${localizedSlug}`);
  };

  const handleMegaEnter = () => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    setIsMegaOpen(true);
  };

  const handleMegaLeave = () => {
    megaTimerRef.current = setTimeout(() => setIsMegaOpen(false), 120);
  };

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMegaOpen(false);
        setIsMobileMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const isLightMode = theme === 'light';
  const prefix = currentLang === 'en' ? '' : `/${currentLang}`;

  return (
    <nav ref={navRef} aria-label="Main Site Header" style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 60,
      background: 'var(--bg-app)', borderBottom: '1px solid var(--border-color)',
      backdropFilter: 'blur(20px)', boxShadow: '0 4px 28px rgba(0,0,0,0.12)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ maxWidth: 1200, width: '100%', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
        <Link to={prefix || '/'} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--text-main)' }}>
          <img src="/logoweb.png" alt="SolveMyMedia Logo" width={32} height={32} fetchPriority="high" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          <span style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
            SolveMy<span style={{ background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Media</span>
          </span>
        </Link>
      </div>

      <div aria-label="Desktop Quick Navigation" className="desktop-only" style={{ flex: '0 1 auto', display: 'flex', alignItems: 'center', gap: 4 }}>
        {[
          { id: 'compress-video', label: getToolName('compress-video') },
          { id: 'compress-audio', label: getToolName('compress-audio') },
          { id: 'video-to-audio', label: getToolName('video-to-audio') },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleToolClick(id)}
            className="nav-tab-btn"
            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', padding: '6px 12px', borderRadius: 8, fontSize: '0.84rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.02em', textTransform: 'uppercase' }}
          >{label}</button>
        ))}

        {/* ALL TOOLS - hover dropdown trigger */}
        <div
          style={{ position: 'relative' }}
          onMouseEnter={handleMegaEnter}
          onMouseLeave={handleMegaLeave}
        >
          <button
            style={{
              background: isMegaOpen ? 'var(--brand-gradient)' : 'rgba(225,29,72,0.1)',
              color: isMegaOpen ? '#fff' : 'var(--text-accent)',
              border: '1px solid rgba(225,29,72,0.3)',
              display: 'flex', alignItems: 'center', gap: 6,
              fontWeight: 800, fontSize: '0.84rem', letterSpacing: '0.02em',
              cursor: 'pointer', padding: '6px 14px', borderRadius: 8,
              transition: 'all 0.2s', marginLeft: 8
            }}
          >
            {t('navbarAllTools') || 'ALL TOOLS'} <ChevronDown size={14} style={{ transform: isMegaOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>

          {isMegaOpen && (
            <div style={{
              position: 'fixed', top: 60, left: 0, right: 0,
              background: 'var(--bg-app)', borderBottom: '1px solid var(--border-color)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
              padding: '32px', display: 'flex', justifyContent: 'center',
              animation: 'fadeInDown 0.2s ease forwards'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, width: '100%', maxWidth: 1080 }}>
                {/* Column 1: Video Essentials (4 items) */}
                <div className="mega-menu-col">
                  <div className="mega-menu-title">{t('navCatVideoOpt') || 'OPTIMASI VIDEO'}</div>
                  <MI icon={Minimize2} label={getToolName('compress-video')} onClick={() => handleToolClick('compress-video')} />
                  <MI icon={RotateCw} label={getToolName('convert-video')} onClick={() => handleToolClick('convert-video')} />
                  <MI icon={FastForward} label={getToolName('video-speed')} onClick={() => handleToolClick('video-speed')} />
                  <MI icon={VolumeX} label={getToolName('mute-video')} onClick={() => handleToolClick('mute-video')} />
                </div>
                
                {/* Column 2: Video Editing (4 items) */}
                <div className="mega-menu-col">
                  <div className="mega-menu-title">{t('navCatVideoEdit') || 'PENGEDITAN VIDEO'}</div>
                  <MI icon={Scissors} label={getToolName('cut-video')} onClick={() => handleToolClick('cut-video')} highlight badge={currentLang === 'id' ? 'Populer' : 'Popular'} />
                  <MI icon={Crop} label={getToolName('crop-video')} onClick={() => handleToolClick('crop-video')} />
                  <MI icon={Image} label={getToolName('create-gif')} onClick={() => handleToolClick('create-gif')} />
                  <MI icon={Stamp} label={getToolName('watermark-video')} onClick={() => handleToolClick('watermark-video')} />
                </div>

                {/* Column 3: Audio Tools (4 items) */}
                <div className="mega-menu-col">
                  <div className="mega-menu-title">{t('navCatAudio') || 'ALAT AUDIO'}</div>
                  <MI icon={Minimize2} label={getToolName('compress-audio')} onClick={() => handleToolClick('compress-audio')} />
                  <MI icon={Music} label={getToolName('convert-audio')} onClick={() => handleToolClick('convert-audio')} />
                  <MI icon={FileAudio} label={getToolName('video-to-audio')} onClick={() => handleToolClick('video-to-audio')} />
                  <MI icon={Scissors} label={getToolName('merge-audio')} onClick={() => handleToolClick('merge-audio')} />
                </div>

                {/* Column 4: AI & Studio (2 items + Feature Showcase Card) */}
                <div className="mega-menu-col">
                  <div className="mega-menu-title">{t('navCatAiStudio') || 'AI & STUDIO'}</div>
                  <MI icon={Mic} label={getToolName('transcribe')} onClick={() => handleToolClick('transcribe')} badge="AI" />
                  <MI icon={Video} label={getToolName('recorder')} onClick={() => handleToolClick('recorder')} badge="Studio" />
                  
                  {/* Feature Showcase Box - Matches exact height of 2 items */}
                  <div 
                    onClick={() => { setIsMegaOpen(false); navigate(prefix ? `${prefix}/security` : '/security'); }}
                    className="mega-menu-feature-box"
                    style={{
                      marginTop: 6,
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(6,182,212,0.08) 100%)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <ShieldCheck size={16} color="var(--brand-primary)" />
                      <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                        {currentLang === 'id' ? '100% Privasi Klien' : '100% Client-Side'}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                      {currentLang === 'id' ? 'Tanpa upload cloud. Pemrosesan lokal aman di memori perangkat.' : 'Zero cloud uploads. Fast offline execution in your browser.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Theme + Lang */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, justifyContent: 'flex-end' }}>
        
        <div ref={langRef} style={{ position: 'relative' }}>
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            style={{ 
              padding: '6px 12px', 
              borderRadius: '8px', 
              border: '1.5px solid var(--border-color)',
              background: 'var(--bg-app)',
              color: 'var(--text-main)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            {languages.find(l => l.code === currentLang)?.flag} {currentLang.toUpperCase()}
            <ChevronDown size={14} style={{ transform: isLangOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', marginLeft: 4 }} />
          </button>
          
          {isLangOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 8,
              width: 200,
              background: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              borderRadius: 12,
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Search size={14} color="var(--text-muted)" />
                <input 
                  type="text" 
                  placeholder={t('navbarAllTools') ? 'Search...' : 'Search...'} 
                  value={langSearch}
                  onChange={(e) => setLangSearch(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    width: '100%'
                  }}
                  autoFocus
                />
              </div>
              <div style={{ maxHeight: 300, overflowY: 'auto' }} className="custom-scrollbar">
                {languages.filter(l => l.name.toLowerCase().includes(langSearch.toLowerCase()) || l.code.includes(langSearch.toLowerCase())).map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      background: currentLang === lang.code ? 'rgba(225,29,72,0.1)' : 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      color: currentLang === lang.code ? 'var(--brand-primary)' : 'var(--text-main)'
                    }}
                    className="hover-bg-subtle"
                  >
                    <span style={{ fontSize: '1.1rem' }}>{lang.flag}</span>
                    <span style={{ fontWeight: currentLang === lang.code ? 700 : 500 }}>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <button 
          onClick={toggleTheme}
          style={{
            background: isLightMode ? '#fef3c7' : '#1e1b4b', color: isLightMode ? '#d97706' : '#a855f7',
            border: `1.5px solid ${isLightMode ? '#f59e0b' : '#6366f1'}`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.2s',
            flexShrink: 0
          }}
          title={isLightMode ? 'Dark Mode' : 'Light Mode'}
          aria-label={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {isLightMode ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        
        {/* Mobile Hamburger Button */}
        <button
          className="mobile-only"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4
          }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-container" style={{ position: 'absolute', top: 60, left: 0, right: 0, background: 'var(--bg-app)', borderBottom: '1px solid var(--border-color)', padding: '16px 16px 28px', maxHeight: 'calc(100vh - 60px)', overflowY: 'auto', zIndex: 40, boxShadow: '0 12px 30px rgba(0,0,0,0.15)' }}>
          {/* Quick 3 buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
            {[
              { id: 'compress-video', label: getToolName('compress-video') },
              { id: 'compress-audio', label: getToolName('compress-audio') },
              { id: 'video-to-audio', label: getToolName('video-to-audio') },
            ].map(({ id, label }) => (
              <button key={id} onClick={() => handleToolClick(id)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '10px', borderRadius: 8, fontWeight: 700, color: 'var(--text-main)', fontSize: '0.82rem', cursor: 'pointer', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</button>
            ))}
          </div>

          {/* Accordion: All Tools */}
          <button
            onClick={() => setIsMobileAllOpen(!isMobileAllOpen)}
            style={{ width: '100%', background: 'var(--brand-gradient)', color: '#fff', border: 'none', padding: '11px 16px', borderRadius: 8, fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: isMobileAllOpen ? 12 : 0 }}
          >
            <span style={{ textTransform: 'uppercase' }}>{t('allTools') || 'ALL MEDIA TOOLS'}</span>
            {isMobileAllOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {isMobileAllOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { section: t('navCatVideoOpt') || 'OPTIMASI VIDEO', tools: [
                  { id: 'compress-video', Icon: Minimize2 },
                  { id: 'convert-video', Icon: RotateCw },
                  { id: 'video-speed', Icon: FastForward },
                  { id: 'mute-video', Icon: VolumeX },
                ]},
                { section: t('navCatVideoEdit') || 'PENGEDITAN VIDEO', tools: [
                  { id: 'cut-video', Icon: Scissors },
                  { id: 'crop-video', Icon: Crop },
                  { id: 'create-gif', Icon: Image },
                  { id: 'watermark-video', Icon: Stamp },
                ]},
                { section: t('navCatAudio') || 'ALAT AUDIO', tools: [
                  { id: 'compress-audio', Icon: Minimize2 },
                  { id: 'convert-audio', Icon: Music },
                  { id: 'video-to-audio', Icon: FileAudio },
                  { id: 'merge-audio', Icon: Scissors },
                ]},
                { section: t('navCatAiStudio') || 'AI & STUDIO', tools: [
                  { id: 'transcribe', Icon: Mic },
                  { id: 'recorder', Icon: Video },
                ]},
              ].map(group => (
                <div key={group.section}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-accent)', letterSpacing: '0.06em', marginTop: 8, marginBottom: 8, paddingBottom: 6, borderBottom: '1px dashed var(--border-color)', textTransform: 'uppercase' }}>
                    {group.section}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {group.tools.map(({ id, Icon }) => (
                      <button
                        key={id}
                        onClick={() => handleToolClick(id)}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '9px 11px', borderRadius: 8, fontWeight: 600, color: 'var(--text-main)', fontSize: '0.79rem', cursor: 'pointer', textAlign: 'left', textTransform: 'uppercase' }}
                      >
                        <Icon size={14} color="var(--brand-primary)" />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{getToolName(id)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mobile Theme Toggle Row */}
          <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
              {isLightMode ? <Sun size={16} color="#d97706" /> : <Moon size={16} color="#a855f7" />}
              <span>{isLightMode ? 'Light Theme' : 'Dark Theme'}</span>
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              style={{
                background: isLightMode ? '#fef3c7' : '#1e1b4b',
                color: isLightMode ? '#d97706' : '#a855f7',
                border: `1.5px solid ${isLightMode ? '#f59e0b' : '#6366f1'}`,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: '0.8rem',
                fontWeight: 700,
                transition: 'all 0.2s ease'
              }}
            >
              {isLightMode ? <Moon size={13} /> : <Sun size={13} />}
              <span>{isLightMode ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .nav-tab-btn:hover {
          color: var(--text-accent) !important;
          background: rgba(225, 29, 72, 0.08) !important;
        }
        .mega-menu-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .mega-menu-title {
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--text-accent);
          letter-spacing: 0.06em;
          margin-bottom: 4px;
          border-bottom: 1px dashed var(--border-color);
          padding-bottom: 7px;
        }
        .mega-menu-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 7px 9px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
          color: var(--text-main);
          border: 1px solid transparent;
        }
        .mega-menu-item:hover {
          background: var(--bg-card-hover, rgba(225,29,72,0.05));
          border-color: rgba(225,29,72,0.25);
          transform: translateX(3px);
        }
        .mega-menu-item .item-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.2;
        }
        .mega-menu-item:hover .item-title {
          color: var(--text-accent);
        }
        .mega-menu-feature-box:hover {
          border-color: var(--brand-primary) !important;
          box-shadow: 0 4px 20px rgba(168, 85, 247, 0.15);
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
          .mobile-menu-container { display: block !important; }
          .mega-menu-item { padding: 4px 6px; }
          .mega-menu-item .item-title { font-size: 0.84rem; }
        }
        @media (min-width: 769px) {
          .desktop-only { display: flex !important; }
          .mobile-only, .mobile-menu-container { display: none !important; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};
