import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Video, Music, Scissors, RefreshCw, Bot, MonitorPlay, ImagePlay, Gauge, Crop, 
  VolumeX, Stamp, AudioLines, Search, X, ShieldCheck, Zap, ServerOff, Database, Quote,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedSlug } from '../i18n/slugs';
import { smartHighlight } from '../utils/textFormatting';

export const Home: React.FC = () => {
  const { currentLang, t } = useLanguage();
  const navigate = useNavigate();
  const prefix = currentLang === 'en' ? '' : `/${currentLang}`;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getToolName = (toolId: string) => {
    const localized = getLocalizedSlug(toolId, currentLang);
    return localized.replace(/-/g, " ");
  };

  const ALL_TOOLS = [
    { id: 'compress-video', icon: Video, color: '#a855f7', category: 'optimization', name: getToolName('compress-video'), desc: t('seoCompressVideoDesc') },
    { id: 'convert-video', icon: RefreshCw, color: '#a855f7', category: 'optimization', name: getToolName('convert-video'), desc: t('seoConvertVideoDesc') },
    { id: 'video-speed', icon: Gauge, color: '#eab308', category: 'optimization', name: getToolName('video-speed'), desc: t('seoVideoSpeedDesc') },
    { id: 'create-gif', icon: ImagePlay, color: '#ec4899', category: 'editing', name: getToolName('create-gif'), desc: t('seoCreateGifDesc') },
    { id: 'crop-video', icon: Crop, color: '#22c55e', category: 'editing', name: getToolName('crop-video'), desc: t('seoCropVideoDesc') },
    { id: 'mute-video', icon: VolumeX, color: '#64748b', category: 'editing', name: getToolName('mute-video'), desc: t('seoMuteVideoDesc') },
    { id: 'watermark-video', icon: Stamp, color: '#3b82f6', category: 'editing', name: getToolName('watermark-video'), desc: t('seoWatermarkVideoDesc') },
    { id: 'compress-audio', icon: Music, color: '#06b6d4', category: 'audio', name: getToolName('compress-audio'), desc: t('seoCompressAudioDesc') },
    { id: 'convert-audio', icon: Scissors, color: '#06b6d4', category: 'audio', name: getToolName('convert-audio'), desc: t('seoConvertAudioDesc') },
    { id: 'video-to-audio', icon: Music, color: '#ef4444', category: 'audio', name: getToolName('video-to-audio'), desc: t('seoVideoToAudioDesc') },
    { id: 'merge-audio', icon: AudioLines, color: '#f97316', category: 'audio', name: getToolName('merge-audio'), desc: t('seoMergeAudioDesc') },
    { id: 'transcribe', icon: Bot, color: '#a855f7', category: 'ai', name: getToolName('transcribe'), desc: t('seoTranscribeDesc'), badge: 'AI' },
    { id: 'recorder', icon: MonitorPlay, color: '#ef4444', category: 'ai', name: getToolName('recorder'), desc: t('seoRecorderDesc'), badge: 'Studio' },
  ];

  const filteredTools = ALL_TOOLS.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (tool.desc && tool.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main style={{ width: '100%', position: 'relative', overflowX: 'hidden' }}>
      <SEO titleKey="seoHomeTitle" descKey="seoHomeDesc" />
      
      {/* SECTION 1: HERO & FINDER */}
      <section style={{ 
        position: 'relative',
        paddingTop: 'clamp(40px, 6vw, 70px)', 
        paddingBottom: '80px',
        textAlign: 'center',
      }}>
        {/* Ambient Glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 1000, height: '100%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, rgba(239,68,68,0.03) 50%, transparent 100%)',
          filter: 'blur(80px)',
          zIndex: -1,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          <h1 
            className="hero-title"
            style={{ 
              fontSize: 'clamp(2.7rem, 6vw, 5.3rem)', 
              fontWeight: 800, 
              letterSpacing: '-0.03em', 
              lineHeight: 1.15,
              color: 'var(--text-main)',
              maxWidth: 1000,
              margin: '0 auto 24px auto',
              textWrap: 'balance',
              fontFamily: 'var(--font-display)'
            }}
          >
            {smartHighlight(t('homeHeroTitle') || 'All Media Tools in One Place')}
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            maxWidth: 780,
            margin: '0 auto 48px',
            fontWeight: 500
          }}>
            {t('homeHeroSubtitle') || 'Compress, convert, merge, and edit audio and video files directly in your browser. 100% processed offline via WebCodecs. Free, no limits, and highly secure.'}
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            background: 'var(--bg-elevated)',
            borderRadius: 9999,
            border: '1px solid var(--border-color)',
            marginBottom: 48,
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--text-main)',
            fontSize: '0.95rem',
            fontWeight: 600,
          }}>
            <ShieldCheck size={18} style={{ color: 'var(--success-color)' }} />
            <span>{t('homeSecurityBadge') || 'Security Architecture: 100% Client-Side Processing • 0 Bytes Uploaded'}</span>
          </div>

          <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative' }}>
            <Search size={22} style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 2 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder') || 'Search for a tool...'}
              style={{
                width: '100%',
                padding: '20px 24px 20px 64px',
                borderRadius: 9999,
                border: '1.5px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                fontSize: '1.05rem',
                fontWeight: 500,
                outline: 'none',
                boxShadow: 'var(--shadow-lg)',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--brand-primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(168, 85, 247, 0.2)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'var(--shadow-lg)'; }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'var(--bg-input)', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', cursor: 'pointer', zIndex: 2
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 48 }}>
            {[
              { id: 'all', label: t('allTools') || 'All Tools' },
              { id: 'optimization', label: t('videoOptTools') || 'Optimization' },
              { id: 'editing', label: t('videoEditTools') || 'Editing' },
              { id: 'audio', label: t('audioTools') || 'Audio' },
              { id: 'ai', label: t('aiStudioTools') || 'AI Studio' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '10px 24px',
                  borderRadius: 9999,
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: selectedCategory === cat.id ? 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))' : 'var(--bg-card)',
                  color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-main)',
                  border: selectedCategory === cat.id ? 'none' : '1px solid var(--border-color)',
                  boxShadow: selectedCategory === cat.id ? '0 8px 25px rgba(168, 85, 247, 0.3)' : '0 2px 8px rgba(0,0,0,0.05)',
                  transform: selectedCategory === cat.id ? 'translateY(-2px)' : 'none'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: TOOLS GRID */}
      <section style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.02)', marginBottom: '80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {filteredTools.length === 0 ? (
            <div style={{ background: 'var(--bg-card)', padding: '60px 24px', borderRadius: 40, border: '1px solid var(--border-color)', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
              <Search size={36} style={{ color: 'var(--text-muted)', marginBottom: 24 }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 12 }}>{t('homeSearchNotFound') || 'No tools found matching'} "{searchQuery}"</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>{t('homeSearchNotFoundDesc') || 'Try using different keywords or select the All Tools category.'}</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => navigate(`${prefix}/${getLocalizedSlug(tool.id, currentLang)}`)}
                  className="glass-panel"
                  style={{
                    padding: 32,
                    borderRadius: 32,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    border: '1px solid var(--border-color)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = tool.color;
                    e.currentTarget.style.boxShadow = `0 12px 30px ${tool.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div style={{ width: 56, height: 56, background: `${tool.color}15`, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${tool.color}30` }}>
                      <tool.icon size={24} color={tool.color} />
                    </div>
                    {tool.badge && (
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', padding: '6px 12px', borderRadius: 9999, background: `linear-gradient(135deg, ${tool.color}90, ${tool.color})`, color: '#fff' }}>
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 12, fontFamily: 'Outfit, sans-serif', textTransform: 'capitalize' }}>
                      {tool.name}
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 500 }}>
                      {tool.desc}
                    </p>
                  </div>
                  <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    <span>{t('homeTryNow') || 'Try Now Offline'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: ARCHITECTURE */}
      <section style={{ padding: '80px 24px', marginBottom: '80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--text-main)', marginBottom: 24 }}>
              {t('homeArchTitle') || 'The WebCodecs Advantage'}
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 40 }}>
              {t('homeArchDesc') || "We harness the raw power of your device's motherboard. By tapping directly into native WebCodecs and WebAssembly, we bypass servers entirely."}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { icon: ServerOff, title: t('homeArchCard1Title') || 'Zero Uploads', desc: t('homeArchCard1Desc') || 'Your sensitive media never touches the internet. It is processed exclusively inside your device\'s RAM.', color: '#ef4444' },
                { icon: Zap, title: t('homeArchCard2Title') || 'Hardware Accelerated', desc: t('homeArchCard2Desc') || 'We utilize WebGPU to accelerate rendering and encoding using your dedicated graphics card.', color: '#eab308' },
                { icon: Database, title: t('homeArchCard3Title') || 'No File Size Limits', desc: t('homeArchCard3Desc') || 'Compress 4K videos or massive 10GB raw files without worrying about artificial server limits.', color: '#3b82f6' }
              ].map((feature, i) => (
                <div key={i} style={{ display: 'flex', gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${feature.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <feature.icon size={24} color={feature.color} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 4 }}>{feature.title}</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: 500, aspectRatio: '1/1', background: 'var(--bg-card)', borderRadius: 32, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: '200%', height: '200%', background: 'conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.2), transparent)', animation: 'spin 10s linear infinite' }} />
              <div style={{ width: '98%', height: '98%', background: 'var(--bg-app)', borderRadius: 31, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MonitorPlay size={80} color="var(--brand-primary)" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INSTITUTION QUOTE */}
      <section style={{ padding: '80px 24px', marginBottom: '80px', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <Quote size={48} style={{ color: 'var(--brand-primary)', margin: '0 auto 32px', opacity: 0.5 }} />
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, lineHeight: 1.4, color: 'var(--text-main)', marginBottom: 24, fontStyle: 'italic' }}>
            {t('homeInstQuote') || '"Moving processing from the cloud back to the client edge is the single most effective way to eliminate data-in-transit vulnerabilities for sensitive media."'}
          </h2>
          <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--brand-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {t('homeInstAuthor') || '- Global Digital Privacy Foundation'}
          </div>
          <div style={{ marginTop: 40, paddingTop: 40, borderTop: '1px dashed var(--border-color)', maxWidth: 600, margin: '40px auto 0' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 12 }}>{t('homeInstTitle') || 'Trusted Architecture'}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {t('homeInstDesc') || 'Adopted by leading cyber-security frameworks, client-side processing represents the pinnacle of modern data protection.'}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ */}
      <section style={{ padding: '80px 24px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--text-main)', marginBottom: 48, textAlign: 'center' }}>
          {t('homeFaqTitle') || 'Frequently Asked Questions'}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { q: t('homeFaq1Q') || 'Do I need to install any software?', a: t('homeFaq1A') || 'No! SolveMyMedia runs entirely inside your modern web browser without requiring any downloads or extensions.' },
            { q: t('homeFaq2Q') || 'Are my files uploaded to your servers?', a: t('homeFaq2A') || 'Never. We use WebAssembly (WASM) and WebCodecs to process all audio and video files entirely locally on your device.' },
            { q: t('homeFaq3Q') || 'Why is the compression so fast?', a: t('homeFaq3A') || 'Because you don\'t have to wait for massive gigabyte files to upload and download from a server. Processing happens instantly on your local hardware.' },
            { q: t('homeFaq4Q') || 'Is there a limit on file size?', a: t('homeFaq4A') || 'Since processing happens locally, the only limit is the available RAM and storage on your specific device. There are no artificial limits from our end.' },
            { q: t('homeFaq5Q') || 'Does it work on mobile phones?', a: t('homeFaq5A') || 'Yes! Modern smartphones have incredibly powerful processors that can handle WebCodecs natively for on-the-go media editing.' }
          ].map((faq, i) => (
            <div 
              key={i} 
              className="glass-panel"
              style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border-color)', cursor: 'pointer' }}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: openFaq === i ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>{faq.q}</h3>
                {openFaq === i ? <ChevronUp size={20} color="var(--brand-primary)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
              </div>
              {openFaq === i && (
                <div style={{ padding: '0 24px 24px', color: 'var(--text-muted)', lineHeight: 1.7, borderTop: '1px dashed var(--border-color)', paddingTop: 20 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hero-title {
          white-space: nowrap;
        }
        @media (max-width: 800px) {
          .hero-title {
            white-space: normal;
          }
        }
      `}</style>
    </main>
  );
};
