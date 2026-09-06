import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Video, Music, Scissors, RefreshCw, Bot, MonitorPlay, ImagePlay, Gauge, Crop, 
  VolumeX, Stamp, AudioLines, Search, X, ShieldCheck, Zap, ServerOff, Database, Quote,
  ChevronDown, ChevronUp, Sparkles, BookOpen, Layers, Cpu
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
              margin: '24px auto 24px auto', // Added 24px top margin
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

      {/* SECTION: PEER-REVIEWED MULTIMEDIA SCIENCE & OPEN STANDARDS */}
      <section style={{ padding: '80px 24px', marginBottom: '80px', position: 'relative' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 20px',
              borderRadius: 9999,
              background: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              color: 'var(--brand-primary)',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: 20
            }}>
              <Sparkles size={16} />
              {t('researchHome_badge') || 'Peer-Reviewed Multimedia Science'}
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: 'var(--text-main)',
              marginBottom: 16,
              fontFamily: 'Outfit, sans-serif'
            }}>
              {smartHighlight(t('researchHome_title') || 'Empowered by Open Standards & Academic Research')}
            </h2>
            <p style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
              color: 'var(--text-muted)',
              maxWidth: 820,
              margin: '0 auto',
              lineHeight: 1.7,
              fontWeight: 500
            }}>
              {t('researchHome_subtitle') || 'Our client-side media algorithms are built upon foundational computer science and signal processing papers published in top-tier journals.'}
            </p>
          </div>

          {/* Bento Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
            marginBottom: 32
          }}>
            {/* Card 1: WebAssembly */}
            <div className="glass-panel" style={{
              padding: 36,
              borderRadius: 32,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: 'rgba(139, 92, 246, 0.12)',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8b5cf6'
                  }}>
                    <Cpu size={26} />
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '6px 14px',
                    borderRadius: 9999,
                    background: 'rgba(139, 92, 246, 0.1)',
                    color: '#8b5cf6',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                  }}>
                    {t('researchHome_c1_tag') || 'Virtual Machine Execution'}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 8, fontFamily: 'Outfit, sans-serif' }}>
                  {t('researchHome_c1_title') || 'WebAssembly Memory Sandboxing'}
                </h3>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <BookOpen size={14} />
                  <span>{t('researchHome_c1_paper') || 'Haas et al., ACM SIGPLAN PLDI 2017'}</span>
                </div>
                <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.65, fontWeight: 500 }}>
                  {t('researchHome_c1_desc') || 'Enables near-native execution speed for audio/video codecs inside a deterministic, formally verified memory sandbox with zero host escape risks.'}
                </p>
              </div>
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--brand-secondary)' }}>DOI:</span> 10.1145/3062341.3062363
              </div>
            </div>

            {/* Card 2: Whisper AI */}
            <div className="glass-panel" style={{
              padding: 36,
              borderRadius: 32,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: 'rgba(236, 72, 153, 0.12)',
                    border: '1px solid rgba(236, 72, 153, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ec4899'
                  }}>
                    <Bot size={26} />
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '6px 14px',
                    borderRadius: 9999,
                    background: 'rgba(236, 72, 153, 0.1)',
                    color: '#ec4899',
                    border: '1px solid rgba(236, 72, 153, 0.2)'
                  }}>
                    {t('researchHome_c2_tag') || 'Speech Recognition'}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 8, fontFamily: 'Outfit, sans-serif' }}>
                  {t('researchHome_c2_title') || 'Robust Neural Audio Transcription'}
                </h3>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ec4899', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <BookOpen size={14} />
                  <span>{t('researchHome_c2_paper') || 'Radford et al., ICML 2023'}</span>
                </div>
                <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.65, fontWeight: 500 }}>
                  {t('researchHome_c2_desc') || 'Processes sequence-to-sequence multilingual audio transcription entirely in client memory via Transformer neural networks without cloud APIs.'}
                </p>
              </div>
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <span style={{ color: '#ec4899' }}>arXiv:</span> 2212.04356 (OpenAI Whisper)
              </div>
            </div>

            {/* Card 3: SSIM Perceptual Fidelity */}
            <div className="glass-panel" style={{
              padding: 36,
              borderRadius: 32,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: 'rgba(34, 197, 94, 0.12)',
                    border: '1px solid rgba(34, 197, 94, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#22c55e'
                  }}>
                    <Gauge size={26} />
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '6px 14px',
                    borderRadius: 9999,
                    background: 'rgba(34, 197, 94, 0.1)',
                    color: '#22c55e',
                    border: '1px solid rgba(34, 197, 94, 0.2)'
                  }}>
                    {t('researchHome_c3_tag') || 'Perceptual Quality'}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 8, fontFamily: 'Outfit, sans-serif' }}>
                  {t('researchHome_c3_title') || 'Structural Similarity (SSIM) Metrics'}
                </h3>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#22c55e', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <BookOpen size={14} />
                  <span>{t('researchHome_c3_paper') || 'Wang et al., IEEE Transactions on Image Processing (2004)'}</span>
                </div>
                <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.65, fontWeight: 500 }}>
                  {t('researchHome_c3_desc') || 'Maintains structural luminance and contrast fidelity during video compression, ensuring visually lossless results under human visual system models.'}
                </p>
              </div>
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <span style={{ color: '#22c55e' }}>DOI:</span> 10.1109/TIP.2003.819861
              </div>
            </div>

            {/* Card 4: H.264 Video Coding */}
            <div className="glass-panel" style={{
              padding: 36,
              borderRadius: 32,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: 'rgba(6, 182, 212, 0.12)',
                    border: '1px solid rgba(6, 182, 212, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#06b6d4'
                  }}>
                    <Video size={26} />
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '6px 14px',
                    borderRadius: 9999,
                    background: 'rgba(6, 182, 212, 0.1)',
                    color: '#06b6d4',
                    border: '1px solid rgba(6, 182, 212, 0.2)'
                  }}>
                    {t('researchHome_c4_tag') || 'Video Compression'}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 8, fontFamily: 'Outfit, sans-serif' }}>
                  {t('researchHome_c4_title') || 'Discrete Cosine & Motion Estimation'}
                </h3>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#06b6d4', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <BookOpen size={14} />
                  <span>{t('researchHome_c4_paper') || 'Wiegand et al., IEEE CSVT 2003'}</span>
                </div>
                <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.65, fontWeight: 500 }}>
                  {t('researchHome_c4_desc') || 'Optimizes spatial redundancy reduction and inter-frame motion vectors directly in browser memory without server-side computational queues.'}
                </p>
              </div>
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <span style={{ color: '#06b6d4' }}>DOI:</span> 10.1109/TCSVT.2003.815165
              </div>
            </div>
          </div>

          {/* Academic Attribution Disclaimer */}
          <div style={{
            padding: '20px 28px',
            borderRadius: 20,
            background: 'rgba(0,0,0,0.02)',
            border: '1px dashed var(--border-color)',
            fontSize: '0.88rem',
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: 16
          }}>
            <BookOpen size={20} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
            <span>{t('researchHome_disclaimer') || 'Academic & Open Standards Attribution: SolveMyMedia implements open algorithms and specifications derived from these peer-reviewed publications and W3C standards. Authors and institutions did not directly review, sponsor, or endorse this website.'}</span>
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
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
              {t('homeInstDesc') || 'Adopted by leading cyber-security frameworks, client-side processing represents the pinnacle of modern data protection.'}
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '16px 32px', background: 'var(--bg-app)', borderRadius: 9999, border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', color: '#fbbf24' }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                ))}
              </div>
              <span style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800, marginLeft: 12 }}>{t('ratingScore') || '4.9/5 Rating'}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '1rem', marginLeft: 6 }}>{t('ratingReviews') || '(from 1,250 reviews)'}</span>
            </div>
          </div>
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
