import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sun, Moon, ChevronDown, ChevronUp, ChevronRight, Search, Menu, X,
  Video, Music, Scissors, Minimize2, Image,
  Mic, FileAudio, RotateCw, Crop, VolumeX, Stamp, FastForward,
  ShieldCheck, Zap, Sparkles, Tag, Layers
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
    'remove-video-metadata': 'Hapus Metadata Video',
    'edit-video-metadata': 'Edit Metadata Video',
    'remove-audio-metadata': 'Hapus Metadata Audio',
    'edit-audio-metadata': 'Edit Metadata Audio',
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
    'remove-video-metadata': 'Buang Metadata Video',
    'edit-video-metadata': 'Edit Metadata Video',
    'remove-audio-metadata': 'Buang Metadata Audio',
    'edit-audio-metadata': 'Edit Metadata Audio',
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
    'remove-video-metadata': 'Remove Video Metadata',
    'edit-video-metadata': 'Edit Video Metadata',
    'remove-audio-metadata': 'Remove Audio Metadata',
    'edit-audio-metadata': 'Edit Audio Metadata',
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
  const [mobileSearch, setMobileSearch] = useState('');
  const navRef = useRef<HTMLDivElement>(null);
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const TOOL_CATEGORIES = [
    {
      name: t('navCatVideoOpt') || 'Video Optimization',
      tools: [
        { id: 'compress-video', Icon: Minimize2, color: '#a855f7' },
        { id: 'convert-video', Icon: RotateCw, color: '#06b6d4' },
        { id: 'remove-video-metadata', Icon: ShieldCheck, color: '#10b981' },
        { id: 'edit-video-metadata', Icon: Tag, color: '#f59e0b' },
        { id: 'video-speed', Icon: FastForward, color: '#ec4899' },
      ]
    },
    {
      name: t('navCatVideoEdit') || 'Video Editing',
      tools: [
        { id: 'cut-video', Icon: Scissors, color: '#ef4444' },
        { id: 'crop-video', Icon: Crop, color: '#3b82f6' },
        { id: 'create-gif', Icon: Image, color: '#8b5cf6' },
        { id: 'mute-video', Icon: VolumeX, color: '#64748b' },
      ]
    },
    {
      name: t('navCatAudio') || 'Audio Tools',
      tools: [
        { id: 'compress-audio', Icon: Minimize2, color: '#a855f7' },
        { id: 'convert-audio', Icon: Music, color: '#06b6d4' },
        { id: 'remove-audio-metadata', Icon: ShieldCheck, color: '#10b981' },
        { id: 'edit-audio-metadata', Icon: Tag, color: '#f59e0b' },
        { id: 'merge-audio', Icon: Layers, color: '#f97316' },
      ]
    },
    {
      name: t('navCatAiStudio') || 'AI & Studio',
      tools: [
        { id: 'watermark-video', Icon: Stamp, color: '#ec4899' },
        { id: 'video-to-audio', Icon: FileAudio, color: '#3b82f6' },
        { id: 'transcribe', Icon: Mic, color: '#8b5cf6', badge: 'AI' },
        { id: 'recorder', Icon: Video, color: '#10b981', badge: 'Studio' },
      ]
    }
  ];


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
      position: 'fixed', top: 0, left: 0, right: 0, height: 'var(--navbar-height, 60px)',
      background: 'var(--bg-app)', borderBottom: '1px solid var(--border-color)',
      backdropFilter: 'blur(20px)', boxShadow: '0 4px 28px rgba(0,0,0,0.12)',
      zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div className="navbar-container" style={{ maxWidth: 1200, width: '100%', padding: '0 clamp(12px, 3vw, 24px)', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
        <Link to={prefix || '/'} className="navbar-brand-link" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--text-main)' }}>
          <img src="/logoweb.png" alt="SolveMyMedia Logo" width={32} height={32} fetchPriority="high" className="navbar-logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          <span className="navbar-brand-text" style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
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
              position: 'fixed', top: 'var(--navbar-height, 60px)', left: 0, right: 0,
              background: 'var(--bg-app)', borderBottom: '1px solid var(--border-color)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
              padding: '32px', display: 'flex', justifyContent: 'center',
              animation: 'fadeInDown 0.2s ease forwards'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, width: '100%', maxWidth: 1080 }}>
                {/* Column 1: Video Essentials (5 items) */}
                <div className="mega-menu-col">
                  <div className="mega-menu-title">{t('navCatVideoOpt') || 'OPTIMASI VIDEO'}</div>
                  <MI icon={Minimize2} label={getToolName('compress-video')} onClick={() => handleToolClick('compress-video')} />
                  <MI icon={RotateCw} label={getToolName('convert-video')} onClick={() => handleToolClick('convert-video')} />
                  <MI icon={ShieldCheck} label={getToolName('remove-video-metadata')} onClick={() => handleToolClick('remove-video-metadata')} />
                  <MI icon={Tag} label={getToolName('edit-video-metadata')} onClick={() => handleToolClick('edit-video-metadata')} />
                  <MI icon={FastForward} label={getToolName('video-speed')} onClick={() => handleToolClick('video-speed')} />
                </div>
                
                {/* Column 2: Video Editing (4 items) */}
                <div className="mega-menu-col">
                  <div className="mega-menu-title">{t('navCatVideoEdit') || 'PENGEDITAN VIDEO'}</div>
                  <MI icon={Scissors} label={getToolName('cut-video')} onClick={() => handleToolClick('cut-video')} />
                  <MI icon={Crop} label={getToolName('crop-video')} onClick={() => handleToolClick('crop-video')} />
                  <MI icon={Image} label={getToolName('create-gif')} onClick={() => handleToolClick('create-gif')} />
                  <MI icon={VolumeX} label={getToolName('mute-video')} onClick={() => handleToolClick('mute-video')} />
                </div>

                {/* Column 3: Audio Tools (5 items) */}
                <div className="mega-menu-col">
                  <div className="mega-menu-title">{t('navCatAudio') || 'ALAT AUDIO'}</div>
                  <MI icon={Minimize2} label={getToolName('compress-audio')} onClick={() => handleToolClick('compress-audio')} />
                  <MI icon={Music} label={getToolName('convert-audio')} onClick={() => handleToolClick('convert-audio')} />
                  <MI icon={ShieldCheck} label={getToolName('remove-audio-metadata')} onClick={() => handleToolClick('remove-audio-metadata')} />
                  <MI icon={Tag} label={getToolName('edit-audio-metadata')} onClick={() => handleToolClick('edit-audio-metadata')} />
                  <MI icon={Scissors} label={getToolName('merge-audio')} onClick={() => handleToolClick('merge-audio')} />
                </div>

                {/* Column 4: AI & Studio (4 items) */}
                <div className="mega-menu-col">
                  <div className="mega-menu-title">{t('navCatAiStudio') || 'AI & STUDIO'}</div>
                  <MI icon={Stamp} label={getToolName('watermark-video')} onClick={() => handleToolClick('watermark-video')} />
                  <MI icon={FileAudio} label={getToolName('video-to-audio')} onClick={() => handleToolClick('video-to-audio')} />
                  <MI icon={Mic} label={getToolName('transcribe')} onClick={() => handleToolClick('transcribe')} badge="AI" />
                  <MI icon={Video} label={getToolName('recorder')} onClick={() => handleToolClick('recorder')} badge="Studio" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Theme + Lang */}
      <div className="navbar-right-controls" style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, justifyContent: 'flex-end' }}>
        
        <div ref={langRef} style={{ position: 'relative' }}>
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="navbar-lang-btn"
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
          className="desktop-only navbar-theme-btn"
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
        
        {/* Mobile Hamburger Button (Apple HIG / Material 3 standard min 44x44px touch target) */}
        <button
          className="mobile-only navbar-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            transition: 'all 0.2s ease',
            flexShrink: 0,
            padding: 0
          }}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      </div>
      
      {/* Mobile Nav Drawer (shadcn / Apple HIG Standard 1-Column Stack rendered in Portal) */}
      {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <>
          <div
            className="mobile-nav-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            className="mobile-nav-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Quick Search Tool Input */}
            <div className="mobile-nav-search-bar">
              <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder={currentLang === 'id' ? 'Cari dari 18 alat media...' : (currentLang === 'ms' ? 'Cari semua 18 alat media...' : 'Search all 18 tools...')}
                value={mobileSearch}
                onChange={(e) => setMobileSearch(e.target.value)}
              />
              {mobileSearch && (
                <button
                  type="button"
                  onClick={() => setMobileSearch('')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Search Result or Category Lists */}
            {mobileSearch.trim() ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div className="mobile-nav-section-label">
                  {currentLang === 'id' ? 'HASIL PENCARIAN' : (currentLang === 'ms' ? 'KEPUTUSAN CARIAN' : 'SEARCH RESULTS')}
                </div>
                <div className="mobile-nav-list">
                  {TOOL_CATEGORIES.flatMap(c => c.tools)
                    .filter(tool => {
                      const name = getToolName(tool.id).toLowerCase();
                      const query = mobileSearch.toLowerCase().trim();
                      return name.includes(query) || tool.id.includes(query);
                    })
                    .map(tool => (
                      <button
                        key={tool.id}
                        onClick={() => handleToolClick(tool.id)}
                        className="mobile-nav-item"
                      >
                        <div className="mobile-nav-icon-wrap" style={{ color: tool.color, background: `${tool.color}18` }}>
                          <tool.Icon size={18} />
                        </div>
                        <div className="mobile-nav-text-wrap">
                          <span className="mobile-nav-title">{getToolName(tool.id)}</span>
                        </div>
                        {tool.badge && <span className="mobile-nav-badge">{tool.badge}</span>}
                        <ChevronRight size={16} className="mobile-nav-arrow" />
                      </button>
                    ))}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {TOOL_CATEGORIES.map(group => (
                  <div key={group.name}>
                    <div className="mobile-nav-section-label">
                      {group.name}
                    </div>
                    <div className="mobile-nav-list">
                      {group.tools.map(tool => (
                        <button
                          key={tool.id}
                          onClick={() => handleToolClick(tool.id)}
                          className="mobile-nav-item"
                        >
                          <div className="mobile-nav-icon-wrap" style={{ color: tool.color, background: `${tool.color}18` }}>
                            <tool.Icon size={18} />
                          </div>
                          <div className="mobile-nav-text-wrap">
                            <span className="mobile-nav-title">{getToolName(tool.id)}</span>
                          </div>
                          {tool.badge && <span className="mobile-nav-badge">{tool.badge}</span>}
                          <ChevronRight size={16} className="mobile-nav-arrow" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Theme Card */}
            <div className="mobile-nav-theme-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {isLightMode ? <Sun size={18} color="#d97706" /> : <Moon size={18} color="#a855f7" />}
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {isLightMode ? 'Light Mode' : 'Dark Mode'}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {currentLang === 'id' ? 'Ubah tema tampilan' : 'Switch appearance'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  borderRadius: 9999,
                  border: `1.5px solid ${isLightMode ? '#f59e0b' : '#6366f1'}`,
                  background: isLightMode ? '#fef3c7' : '#1e1b4b',
                  color: isLightMode ? '#d97706' : '#a855f7',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {isLightMode ? <Moon size={14} /> : <Sun size={14} />}
                <span>{isLightMode ? 'Dark' : 'Light'}</span>
              </button>
            </div>
          </div>
        </>,
        document.body
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
          .mobile-nav-drawer { display: flex !important; }
          .navbar-container { padding: 0 14px !important; }

          /* Skala Ramping Nyaman di Mobile (Elegan, Sleek, Tanpa Theme Button di Header) */
          .navbar-brand-link { gap: 8px !important; }
          .navbar-logo { width: 28px !important; height: 28px !important; }
          .navbar-brand-text { font-size: 1.15rem !important; }
          .navbar-right-controls { gap: 8px !important; }
          .navbar-lang-btn { padding: 6px 12px !important; font-size: 0.82rem !important; border-radius: 8px !important; gap: 4px !important; }
          .navbar-menu-btn { width: 44px !important; height: 44px !important; padding: 0 !important; border-radius: 12px !important; }
          .navbar-menu-btn svg { width: 20px !important; height: 20px !important; }
        }
        @media (min-width: 769px) {
          .desktop-only { display: flex !important; }
          .mobile-only, .mobile-nav-drawer { display: none !important; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};
