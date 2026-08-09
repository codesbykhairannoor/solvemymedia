import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sun, Moon, ChevronDown, 
  Video, Music, Scissors, Minimize2, Image,
  Mic, FileAudio, RotateCw, Crop, VolumeX, Stamp, FastForward
} from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const MI: React.FC<{
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  highlight?: boolean;
}> = ({ icon: Icon, label, onClick, highlight }) => (
  <div
    onClick={onClick}
    className="mega-menu-item"
    style={highlight ? { background: 'rgba(225,29,72,0.04)', borderColor: 'rgba(225,29,72,0.15)' } : {}}
  >
    <Icon size={15} style={{ flexShrink: 0, color: highlight ? 'var(--brand-primary)' : undefined }} />
    <span className="item-title" style={{ textTransform: 'capitalize', ...(highlight ? { color: 'var(--brand-primary)' } : {}) }}>{label}</span>
  </div>
);

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
    const navigate = useNavigate();
  
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  const getToolName = (toolId: string) => toolId.replace(/-/g, " ");

  const handleToolClick = (path: string) => {
    setIsMegaOpen(false);
    setIsMobileMenuOpen(false);
    navigate(`/${path}`);
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
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const isLightMode = theme === 'light';

  return (
    <nav ref={navRef} aria-label="Main Site Header" style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 60,
      background: 'var(--bg-app)', borderBottom: '1px solid var(--border-color)',
      backdropFilter: 'blur(20px)', boxShadow: '0 4px 28px rgba(0,0,0,0.12)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--text-main)' }}>
          <div style={{ background: 'var(--brand-gradient)', padding: 6, borderRadius: 8, color: '#fff' }}>
            <Video size={20} />
          </div>
          <span style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>MediaCompressor</span>
        </Link>
      </div>

      <div aria-label="Desktop Quick Navigation" className="desktop-only" style={{ flex: '0 1 auto', display: 'flex', alignItems: 'center', gap: 4 }}>
        {[
          { id: 'compress-video', label: 'COMPRESS VIDEO' },
          { id: 'compress-audio', label: 'COMPRESS AUDIO' },
          { id: 'video-to-audio', label: 'VIDEO TO AUDIO' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleToolClick(id)}
            className="nav-tab-btn"
            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', padding: '6px 12px', borderRadius: 8, fontSize: '0.84rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.02em' }}
          >{id.replace(/-/g, " ").toUpperCase()}</button>
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
            'ALL TOOLS' <ChevronDown size={14} style={{ transform: isMegaOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>

          {isMegaOpen && (
            <div style={{
              position: 'fixed', top: 60, left: 0, right: 0,
              background: 'var(--bg-app)', borderBottom: '1px solid var(--border-color)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
              padding: '32px', display: 'flex', justifyContent: 'center',
              animation: 'fadeInDown 0.2s ease forwards'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, width: '100%', maxWidth: 1000 }}>
                <div className="mega-menu-col">
                  <div className="mega-menu-title">'VIDEO OPTIMIZATION'</div>
                  <MI icon={Minimize2} label={getToolName('compress-video')} onClick={() => handleToolClick('compress-video')} />
                  <MI icon={RotateCw} label={getToolName('convert-video')} onClick={() => handleToolClick('convert-video')} />
                  <MI icon={FastForward} label={getToolName('video-speed')} onClick={() => handleToolClick('video-speed')} />
                </div>
                
                <div className="mega-menu-col">
                  <div className="mega-menu-title">'VIDEO EDITING'</div>
                  <MI icon={Image} label={getToolName('create-gif')} onClick={() => handleToolClick('create-gif')} />
                  <MI icon={Crop} label={getToolName('crop-video')} onClick={() => handleToolClick('crop-video')} />
                  <MI icon={VolumeX} label={getToolName('mute-video')} onClick={() => handleToolClick('mute-video')} />
                  <MI icon={Stamp} label={getToolName('watermark-video')} onClick={() => handleToolClick('watermark-video')} />
                </div>

                <div className="mega-menu-col">
                  <div className="mega-menu-title">'AUDIO TOOLS'</div>
                  <MI icon={Minimize2} label={getToolName('compress-audio')} onClick={() => handleToolClick('compress-audio')} />
                  <MI icon={Music} label={getToolName('convert-audio')} onClick={() => handleToolClick('convert-audio')} />
                  <MI icon={FileAudio} label={getToolName('video-to-audio')} onClick={() => handleToolClick('video-to-audio')} />
                  <MI icon={Scissors} label={getToolName('merge-audio')} onClick={() => handleToolClick('merge-audio')} />
                </div>

                <div className="mega-menu-col">
                  <div className="mega-menu-title">'AI & STUDIO'</div>
                  <MI icon={Mic} label={getToolName('transcribe')} onClick={() => handleToolClick('transcribe')} />
                  <MI icon={Video} label={getToolName('recorder')} onClick={() => handleToolClick('recorder')} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Theme + Lang */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, justifyContent: 'flex-end' }}>
        <button 
          onClick={toggleTheme}
          style={{
            background: isLightMode ? '#fef3c7' : '#1e1b4b', color: isLightMode ? '#d97706' : '#a855f7',
            border: `1.5px solid ${isLightMode ? '#f59e0b' : '#6366f1'}`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.2s'
          }}
          title={isLightMode ? 'Dark Mode' : 'Light Mode'}
        >
          {isLightMode ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        
        
      </div>

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
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.2;
        }
        .mega-menu-item:hover .item-title {
          color: var(--text-accent);
        }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 769px) {
          .desktop-only { display: flex !important; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};
