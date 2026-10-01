import React, { useState } from 'react';
import { 
  Scissors, 
  Film, 
  Zap, 
  ShieldCheck, 
  Clock, 
  ChevronDown, 
  Share2, 
  Layers, 
  Sliders, 
  CheckCircle2, 
  XCircle,
  Cpu,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

export interface SectionProps {
  section?: any;
}

/**
 * SECTION 1: Filmstrip Timeline & Velocity Benchmark Showcase
 * Layout: 100% Unique - Cinematic sprocket filmstrip with interactive cut range preview
 * + Dual Architecture Velocity Benchmark (Cloud Queue vs Local Stream Demux)
 */
export const CutVideoFilmstripBenchmarkSection: React.FC<SectionProps> = ({ section }) => {
  const { t } = useLanguage();

  return (
    <section 
      className="seo-section cut-filmstrip-section" 
      style={{ 
        padding: '100px 24px 80px', 
        margin: '60px 0 40px',
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%)', 
        borderRadius: 36, 
        position: 'relative', 
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Background ambient glow */}
      <div 
        style={{ 
          position: 'absolute', 
          top: '-20%', 
          left: '20%', 
          width: '60%', 
          height: '60%', 
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', 
          filter: 'blur(80px)', 
          pointerEvents: 'none' 
        }} 
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Header Pill & Title */}
        <div style={{ textAlign: 'center', maxWidth: 850, margin: '0 auto 56px' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 8, 
              padding: '8px 20px', 
              background: 'rgba(99, 102, 241, 0.12)', 
              border: '1px solid rgba(99, 102, 241, 0.3)', 
              borderRadius: 100, 
              color: '#818cf8', 
              fontWeight: 800, 
              fontSize: '0.88rem', 
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: 20
            }}
          >
            <Scissors size={16} />
            <span>{t('cutSec1Badge') || 'Cinematic Timeline Engine'}</span>
          </div>

          <h2 
            style={{ 
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', 
              fontWeight: 900, 
              color: '#ffffff', 
              letterSpacing: '-0.03em', 
              lineHeight: 1.15,
              marginBottom: 20
            }}
          >
            {t('cutSec1Title') || 'High-Precision Video Trimming with Zero Server Lag'}
          </h2>

          <p 
            style={{ 
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', 
              color: '#94a3b8', 
              lineHeight: 1.75,
              margin: 0
            }}
          >
            {t('cutSec1Desc') || 'Skip frustrating 20-minute cloud upload queues. SolveMyMedia parses keyframe packets directly in browser memory, giving you instant scrubbing and zero-delay cuts.'}
          </p>
        </div>

        {/* Visual Filmstrip Graphic (Unique to Cut Video) */}
        <div 
          style={{ 
            background: '#070b14', 
            borderRadius: 24, 
            padding: '24px 20px', 
            border: '1px solid rgba(255, 255, 255, 0.1)', 
            marginBottom: 64,
            boxShadow: 'inset 0 2px 20px rgba(0,0,0,0.8)'
          }}
        >
          {/* Top Film Sprockets */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px 14px', borderBottom: '1px dashed rgba(255, 255, 255, 0.12)' }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <div 
                key={i} 
                style={{ 
                  width: 14, 
                  height: 10, 
                  background: 'rgba(255, 255, 255, 0.15)', 
                  borderRadius: 2 
                }} 
              />
            ))}
          </div>

          {/* Film Timeline Frames Track */}
          <div 
            style={{ 
              position: 'relative', 
              height: 100, 
              margin: '16px 0', 
              background: 'linear-gradient(90deg, #111827 0%, #1e293b 50%, #111827 100%)', 
              borderRadius: 12, 
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {/* Visual Frame Slices */}
            <div style={{ display: 'flex', width: '100%', height: '100%', opacity: 0.25 }}>
              {['00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45'].map((time, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    flex: 1, 
                    borderRight: '1px solid rgba(255, 255, 255, 0.3)', 
                    padding: '8px', 
                    fontSize: '0.75rem', 
                    color: '#64748b', 
                    fontFamily: 'monospace' 
                  }}
                >
                  {time}
                </div>
              ))}
            </div>

            {/* Glowing Active Cut Segment (The Selection) */}
            <div 
              style={{ 
                position: 'absolute', 
                left: '25%', 
                width: '45%', 
                height: '80%', 
                background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25))', 
                border: '2px solid #818cf8', 
                borderRadius: 8, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '0 12px',
                boxShadow: '0 0 25px rgba(99, 102, 241, 0.4)'
              }}
            >
              {/* Left Handle */}
              <div 
                style={{ 
                  background: '#818cf8', 
                  color: '#0f172a', 
                  fontWeight: 900, 
                  fontSize: '0.75rem', 
                  padding: '4px 8px', 
                  borderRadius: 4, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 4 
                }}
              >
                <span>[ IN: 00:22</span>
              </div>

              {/* Center Badge */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 8, 
                  background: 'rgba(15, 23, 42, 0.85)', 
                  padding: '6px 14px', 
                  borderRadius: 100, 
                  border: '1px solid rgba(129, 140, 248, 0.4)',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 700
                }}
              >
                <Scissors size={14} color="#818cf8" />
                <span>{t('cutModeLossless') || 'Lossless Cut Zone'}</span>
              </div>

              {/* Right Handle */}
              <div 
                style={{ 
                  background: '#a855f7', 
                  color: '#ffffff', 
                  fontWeight: 900, 
                  fontSize: '0.75rem', 
                  padding: '4px 8px', 
                  borderRadius: 4, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 4 
                }}
              >
                <span>OUT: 01:05 ]</span>
              </div>
            </div>
          </div>

          {/* Bottom Film Sprockets */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 8px 0', borderTop: '1px dashed rgba(255, 255, 255, 0.12)' }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <div 
                key={i} 
                style={{ 
                  width: 14, 
                  height: 10, 
                  background: 'rgba(255, 255, 255, 0.15)', 
                  borderRadius: 2 
                }} 
              />
            ))}
          </div>
        </div>

        {/* Dual Velocity Benchmark Matrix */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {/* Cloud Converter Column */}
          <div 
            style={{ 
              background: 'rgba(239, 68, 68, 0.04)', 
              borderRadius: 24, 
              padding: 32, 
              border: '1px solid rgba(239, 68, 68, 0.2)' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <XCircle size={22} color="#ef4444" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f87171', margin: 0 }}>
                Traditional Cloud Cutters
              </h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8', fontSize: '0.95rem' }}>
                <span style={{ color: '#ef4444' }}>✕</span> Upload 1GB video over Wi-Fi: <strong>~15-20 mins</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8', fontSize: '0.95rem' }}>
                <span style={{ color: '#ef4444' }}>✕</span> Remote queue waiting time: <strong>3-5 mins</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8', fontSize: '0.95rem' }}>
                <span style={{ color: '#ef4444' }}>✕</span> Re-encoding degrades pixels & adds generation loss
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8', fontSize: '0.95rem' }}>
                <span style={{ color: '#ef4444' }}>✕</span> Video stored on unknown third-party cloud servers
              </li>
            </ul>
            <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 12, color: '#fca5a5', fontSize: '0.88rem', fontWeight: 700 }}>
              ⏱️ Total Time: 20+ Minutes Wait
            </div>
          </div>

          {/* SolveMyMedia Column */}
          <div 
            style={{ 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)', 
              borderRadius: 24, 
              padding: 32, 
              border: '1px solid rgba(16, 185, 129, 0.3)',
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <CheckCircle2 size={22} color="#10b981" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399', margin: 0 }}>
                SolveMyMedia Stream Copy
              </h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#e2e8f0', fontSize: '0.95rem' }}>
                <span style={{ color: '#10b981' }}>✓</span> Server Upload: <strong>0.00 seconds (Local RAM)</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#e2e8f0', fontSize: '0.95rem' }}>
                <span style={{ color: '#10b981' }}>✓</span> Stream Demuxing Execution: <strong>0.4 seconds flat</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#e2e8f0', fontSize: '0.95rem' }}>
                <span style={{ color: '#10b981' }}>✓</span> Bit-Identical Quality: Zero re-encoding artifacts
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#e2e8f0', fontSize: '0.95rem' }}>
                <span style={{ color: '#10b981' }}>✓</span> 100% Air-gapped privacy (Never touches the internet)
              </li>
            </ul>
            <div style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: 12, color: '#a7f3d0', fontSize: '0.88rem', fontWeight: 800 }}>
              ⚡ Total Time: 0.4s (Instant Download)
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

/**
 * SECTION 2: Horizontal 4-Stage Connected Workflow Ribbon
 * Layout: 100% Unique - Connected step ribbon with timeline tickmarks & glowing neon cables
 */
export const CutVideoWorkflowRibbonSection: React.FC<SectionProps> = ({ section }) => {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t('cutStep1Title') || '1. Select Video',
      desc: t('cutStep1Desc') || 'Drag & drop any video file into your browser. It loads into local RAM immediately.',
      icon: Film,
      badge: 'Multi-Format'
    },
    {
      num: '02',
      title: t('cutStep2Title') || '2. Set In & Out Points',
      desc: t('cutStep2Desc') || 'Use the visual timeline scrubber or type exact timestamps to isolate your desired scene.',
      icon: Sliders,
      badge: '±0.1s Nudge'
    },
    {
      num: '03',
      title: t('cutStep3Title') || '3. Stream Slice',
      desc: t('cutStep3Desc') || 'WebAssembly extracts the chosen segment natively without re-encoding overhead.',
      icon: Scissors,
      badge: '0.4s Bitstream'
    },
    {
      num: '04',
      title: t('cutStep4Title') || '4. Instant Download',
      desc: t('cutStep4Desc') || 'Save your freshly trimmed clip directly to your device with zero watermarks.',
      icon: Sparkles,
      badge: '100% Lossless'
    }
  ];

  return (
    <section 
      className="seo-section cut-workflow-section" 
      style={{ 
        padding: '90px 24px', 
        background: 'var(--bg-card)', 
        position: 'relative',
        borderRadius: 36,
        margin: '40px 0'
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 8, 
              padding: '6px 18px', 
              background: 'rgba(var(--brand-primary-rgb, 99, 102, 241), 0.1)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 100, 
              color: 'var(--brand-primary)', 
              fontWeight: 800, 
              fontSize: '0.85rem',
              marginBottom: 16
            }}
          >
            <Clock size={16} />
            <span>{t('cutSec2Badge') || 'Streamlined Workflow'}</span>
          </div>

          <h2 
            style={{ 
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', 
              fontWeight: 900, 
              color: 'var(--text-main)', 
              letterSpacing: '-0.03em', 
              lineHeight: 1.15 
            }}
          >
            {t('cutSec2Title') || 'How to Cut Videos in 4 Simple Steps'}
          </h2>
        </div>

        {/* Horizontal Pipeline Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 24, 
            position: 'relative' 
          }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                style={{ 
                  background: 'var(--bg-app)', 
                  borderRadius: 24, 
                  padding: 28, 
                  border: '1px solid var(--border-color)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Top Step Number & Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span 
                    style={{ 
                      fontSize: '2rem', 
                      fontWeight: 900, 
                      color: 'var(--brand-primary)', 
                      fontFamily: 'Outfit, sans-serif',
                      lineHeight: 1
                    }}
                  >
                    {step.num}
                  </span>
                  <span 
                    style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      padding: '4px 10px', 
                      background: 'var(--bg-card)', 
                      borderRadius: 100, 
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {step.badge}
                  </span>
                </div>

                {/* Step Icon */}
                <div 
                  style={{ 
                    width: 52, 
                    height: 52, 
                    borderRadius: 16, 
                    background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: 20,
                    boxShadow: '0 8px 20px rgba(var(--brand-primary-rgb, 99, 102, 241), 0.25)'
                  }}
                >
                  <Icon size={24} color="#ffffff" />
                </div>

                {/* Step Title & Desc */}
                <h3 
                  style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 800, 
                    color: 'var(--text-main)', 
                    marginBottom: 10,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {step.title}
                </h3>

                <p 
                  style={{ 
                    fontSize: '0.95rem', 
                    color: 'var(--text-muted)', 
                    lineHeight: 1.65, 
                    margin: 0,
                    flex: 1
                  }}
                >
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

/**
 * SECTION 3: Asymmetric Cutting Bento Matrix (4 Unique Cards)
 * Layout: 100% Unique - Box 1 Spans 2 cols with Visual Codec Remuxing Flow Diagram
 * + Social presets card + Local air-gapped sandbox card + Millisecond micro-nudge card
 */
export const CutVideoAsymmetricBentoSection: React.FC<SectionProps> = ({ section }) => {
  const { t } = useLanguage();

  return (
    <section 
      className="seo-section cut-bento-section" 
      style={{ 
        padding: '100px 24px', 
        background: 'var(--bg-app)', 
        position: 'relative' 
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 60px' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 8, 
              padding: '6px 18px', 
              background: 'rgba(99, 102, 241, 0.1)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 100, 
              color: 'var(--brand-primary)', 
              fontWeight: 800, 
              fontSize: '0.85rem',
              marginBottom: 16
            }}
          >
            <Zap size={16} />
            <span>{t('cutSec3Badge') || 'Engine Highlights'}</span>
          </div>

          <h2 
            style={{ 
              fontSize: 'clamp(2.3rem, 4.5vw, 3.6rem)', 
              fontWeight: 900, 
              color: 'var(--text-main)', 
              letterSpacing: '-0.03em', 
              lineHeight: 1.15 
            }}
          >
            {t('cutSec3Title') || 'Engineered for Speed, Precision, and Privacy'}
          </h2>
        </div>

        {/* Asymmetric Bento Matrix */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(12, 1fr)', 
            gap: 24 
          }}
        >
          {/* Card 1: Wide Spanning Card (Columns 1-7) - Lossless Stream Demuxing Architecture */}
          <div 
            style={{ 
              gridColumn: 'span 7', 
              background: 'var(--bg-card)', 
              borderRadius: 28, 
              padding: 36, 
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
            className="cut-bento-wide"
          >
            <div>
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 8, 
                  padding: '6px 14px', 
                  background: 'rgba(16, 185, 129, 0.12)', 
                  border: '1px solid rgba(16, 185, 129, 0.25)', 
                  borderRadius: 100, 
                  color: '#10b981', 
                  fontWeight: 800, 
                  fontSize: '0.8rem',
                  marginBottom: 18
                }}
              >
                <Cpu size={14} />
                <span>Zero Generation Loss</span>
              </div>

              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 14 }}>
                {t('cutBento1Title') || 'Lossless Stream Copy Engine'}
              </h3>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 28 }}>
                {t('cutBento1Desc') || 'Traditional video trimmers re-encode every single frame, causing generation loss and pixel blur. Our WebAssembly engine performs clean stream demuxing, preserving every bit of original video quality.'}
              </p>
            </div>

            {/* Visual Stream Demuxing Flowchart Graphic */}
            <div 
              style={{ 
                background: 'var(--bg-app)', 
                borderRadius: 16, 
                padding: '20px 24px', 
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 4 }}>Raw Stream</div>
                <div style={{ padding: '6px 12px', background: 'var(--bg-card)', borderRadius: 8, fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}>
                  GOP Packets
                </div>
              </div>

              <ArrowRight size={18} color="var(--brand-primary)" />

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.78rem', color: '#10b981', marginBottom: 4 }}>WASM Slicer</div>
                <div style={{ padding: '6px 12px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: 8, fontWeight: 800, fontSize: '0.85rem', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  -c copy Demux
                </div>
              </div>

              <ArrowRight size={18} color="var(--brand-primary)" />

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 4 }}>Target Clip</div>
                <div style={{ padding: '6px 12px', background: 'var(--bg-card)', borderRadius: 8, fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}>
                  100% Bit-Identical
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Preset Chips Card (Columns 8-12) */}
          <div 
            style={{ 
              gridColumn: 'span 5', 
              background: 'var(--bg-card)', 
              borderRadius: 28, 
              padding: 36, 
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            className="cut-bento-narrow"
          >
            <div>
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 8, 
                  padding: '6px 14px', 
                  background: 'rgba(236, 72, 153, 0.12)', 
                  border: '1px solid rgba(236, 72, 153, 0.25)', 
                  borderRadius: 100, 
                  color: '#ec4899', 
                  fontWeight: 800, 
                  fontSize: '0.8rem',
                  marginBottom: 18
                }}
              >
                <Share2 size={14} />
                <span>1-Click Presets</span>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 12 }}>
                {t('cutBento2Title') || 'Social Media Clip Presets'}
              </h3>

              <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 24 }}>
                {t('cutBento2Desc') || 'Instantly trim long videos into snackable 15s Instagram Stories, 30s WhatsApp Status clips, or 60s TikTok Reels with a single click.'}
              </p>
            </div>

            {/* Visual Preset Tags */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ padding: '10px 14px', background: 'var(--bg-app)', borderRadius: 12, border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', textAlign: 'center' }}>
                📸 15s Story
              </div>
              <div style={{ padding: '10px 14px', background: 'var(--bg-app)', borderRadius: 12, border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', textAlign: 'center' }}>
                💬 30s Status
              </div>
              <div style={{ padding: '10px 14px', background: 'var(--bg-app)', borderRadius: 12, border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', textAlign: 'center' }}>
                🎵 60s TikTok
              </div>
              <div style={{ padding: '10px 14px', background: 'var(--bg-app)', borderRadius: 12, border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', textAlign: 'center' }}>
                ▶️ 90s Shorts
              </div>
            </div>
          </div>

          {/* Card 3: Air-Gapped Privacy Card (Columns 1-5) */}
          <div 
            style={{ 
              gridColumn: 'span 5', 
              background: 'var(--bg-card)', 
              borderRadius: 28, 
              padding: 36, 
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            className="cut-bento-narrow"
          >
            <div>
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 8, 
                  padding: '6px 14px', 
                  background: 'rgba(59, 130, 246, 0.12)', 
                  border: '1px solid rgba(59, 130, 246, 0.25)', 
                  borderRadius: 100, 
                  color: '#3b82f6', 
                  fontWeight: 800, 
                  fontSize: '0.8rem',
                  marginBottom: 18
                }}
              >
                <ShieldCheck size={14} />
                <span>Zero Network Egress</span>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 12 }}>
                {t('cutBento3Title') || '100% Air-Gapped Privacy'}
              </h3>

              <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
                {t('cutBento3Desc') || 'Your clips never touch an external server. Feel confident cutting private family moments, confidential work interviews, or NDA footage.'}
              </p>
            </div>

            <div style={{ marginTop: 24, padding: '14px 18px', background: 'var(--bg-app)', borderRadius: 14, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Browser Memory Sandbox Active</span>
            </div>
          </div>

          {/* Card 4: Millisecond Precision Nudge Card (Columns 6-12) */}
          <div 
            style={{ 
              gridColumn: 'span 7', 
              background: 'var(--bg-card)', 
              borderRadius: 28, 
              padding: 36, 
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            className="cut-bento-wide"
          >
            <div>
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 8, 
                  padding: '6px 14px', 
                  background: 'rgba(168, 85, 247, 0.12)', 
                  border: '1px solid rgba(168, 85, 247, 0.25)', 
                  borderRadius: 100, 
                  color: '#a855f7', 
                  fontWeight: 800, 
                  fontSize: '0.8rem',
                  marginBottom: 18
                }}
              >
                <Sliders size={14} />
                <span>Micro-Nudge Controls</span>
              </div>

              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 14 }}>
                {t('cutBento4Title') || 'Millisecond Micro-Nudge Precision'}
              </h3>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>
                {t('cutBento4Desc') || 'Fine-tune cut boundaries with 0.1-second precision buttons so you never clip a conversation or action scene awkwardly.'}
              </p>
            </div>

            {/* Precision Micro-Control Preview Strip */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ padding: '8px 16px', background: 'var(--bg-app)', borderRadius: 10, border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
                ◀ -1.0s
              </div>
              <div style={{ padding: '8px 16px', background: 'var(--bg-app)', borderRadius: 10, border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
                ◀ -0.1s
              </div>
              <div style={{ padding: '8px 20px', background: 'linear-gradient(90deg, var(--brand-primary), var(--brand-secondary))', borderRadius: 10, color: '#ffffff', fontSize: '0.85rem', fontWeight: 800 }}>
                Exact Frame Lock
              </div>
              <div style={{ padding: '8px 16px', background: 'var(--bg-app)', borderRadius: 10, border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
                +0.1s ▶
              </div>
              <div style={{ padding: '8px 16px', background: 'var(--bg-app)', borderRadius: 10, border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
                +1.0s ▶
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Responsive styling hook for bento grid */}
      <style>{`
        @media (max-width: 900px) {
          .cut-bento-wide, .cut-bento-narrow {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
};

/**
 * SECTION 4: Technical Specifications & Format Compatibility Table
 * Layout: 100% Unique - Glassmorphic high-density technical specifications matrix
 */
export const CutVideoTechnicalSpecsSection: React.FC<SectionProps> = ({ section }) => {
  const { t } = useLanguage();

  const specs = [
    { label: t('cutSpecFormats') || 'Supported Input Formats', val: t('cutSpecFormatsVal') || 'MP4, MOV, WebM, MKV, AVI, FLV, WMV, M4V, TS, 3GP' },
    { label: t('cutSpecMax') || 'Maximum File Size', val: t('cutSpecMaxVal') || 'Unlimited (Tested up to 4GB+ on modern devices)' },
    { label: t('cutSpecEngine') || 'Processing Engine', val: t('cutSpecEngineVal') || 'WebAssembly FFmpeg v0.12 + WebCodecs API' },
    { label: t('cutSpecQuality') || 'Visual Quality Retention', val: t('cutSpecQualityVal') || '100% Bit-Identical (Lossless Stream Copy)' },
    { label: t('cutSpecServer') || 'Server Data Retention', val: t('cutSpecServerVal') || '0 Bytes Uploaded (Air-Gapped Local Browser Execution)' }
  ];

  return (
    <section 
      className="seo-section cut-specs-section" 
      style={{ 
        padding: '90px 24px', 
        background: 'var(--bg-card)', 
        position: 'relative',
        borderRadius: 36,
        margin: '40px 0'
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 
            style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: 900, 
              color: 'var(--text-main)', 
              letterSpacing: '-0.03em', 
              lineHeight: 1.15,
              marginBottom: 12 
            }}
          >
            {t('cutSec4Title') || 'Technical Specifications & Supported Standards'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: 0 }}>
            Deep engine architecture benchmarks and container compatibility
          </p>
        </div>

        {/* Specifications Matrix Table */}
        <div 
          style={{ 
            background: 'var(--bg-app)', 
            borderRadius: 24, 
            border: '1px solid var(--border-color)', 
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0,0,0,0.03)'
          }}
        >
          {specs.map((item, idx) => (
            <div 
              key={idx} 
              style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '24px 32px', 
                borderBottom: idx === specs.length - 1 ? 'none' : '1px solid var(--border-color)',
                gap: 16
              }}
            >
              <span style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 size={18} color="var(--brand-primary)" />
                {item.label}
              </span>
              <span style={{ color: 'var(--brand-secondary)', fontWeight: 700, fontSize: '1rem', textAlign: 'right' }}>
                {item.val}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

/**
 * SECTION 5: Video Cutting FAQ Accordion
 * Layout: 100% Unique - Interactive expandable accordion with glowing numbered indicators
 */
export const CutVideoFaqSection: React.FC<SectionProps> = ({ section }) => {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: t('cutFaq1Q') || 'Will cutting my video reduce its visual quality?',
      a: t('cutFaq1A') || 'No. When using the default Lossless Fast Cut mode, SolveMyMedia copies the original compressed bitstream directly from the source container into the target file without re-encoding pixels. Visual fidelity is 100% identical.'
    },
    {
      q: t('cutFaq2Q') || 'How long does it take to cut a 1-hour or 4K video?',
      a: t('cutFaq2A') || 'Usually less than a second! Because no server upload is required and pixels are not re-encoded, WebAssembly only reorganizes the container timestamps.'
    },
    {
      q: t('cutFaq3Q') || 'Can I cut videos on my phone or tablet?',
      a: t('cutFaq3A') || 'Yes, SolveMyMedia works seamlessly on mobile browsers including Chrome, Safari, Firefox, and Edge on iOS and Android without installing any app.'
    },
    {
      q: t('cutFaq4Q') || 'Are my private videos uploaded or saved on any server?',
      a: t('cutFaq4A') || 'Never. Everything runs purely within your browser tab\'s sandbox. Once you close the tab, the video data in RAM is completely cleared.'
    }
  ];

  return (
    <section 
      className="seo-section cut-faq-section" 
      style={{ 
        padding: '100px 24px', 
        background: 'var(--bg-app)', 
        position: 'relative' 
      }}
    >
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 
            style={{ 
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', 
              fontWeight: 900, 
              color: 'var(--text-main)', 
              letterSpacing: '-0.03em', 
              lineHeight: 1.15,
              marginBottom: 16 
            }}
          >
            {t('cutFaqTitle') || 'Frequently Asked Questions About Video Cutting'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: 0 }}>
            Everything you need to know about lossless browser-side video trimming
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                style={{ 
                  background: 'var(--bg-card)', 
                  borderRadius: 20, 
                  border: isOpen ? '1px solid var(--brand-primary)' : '1px solid var(--border-color)', 
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  boxShadow: isOpen ? '0 8px 30px rgba(var(--brand-primary-rgb, 99, 102, 241), 0.1)' : 'none'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{ 
                    width: '100%', 
                    padding: '24px 28px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: 16
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span 
                      style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: 900, 
                        color: isOpen ? 'var(--brand-primary)' : 'var(--text-muted)', 
                        fontFamily: 'monospace' 
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {faq.q}
                    </span>
                  </div>

                  <div 
                    style={{ 
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                      transition: 'transform 0.25s ease',
                      flexShrink: 0
                    }}
                  >
                    <ChevronDown size={20} color={isOpen ? 'var(--brand-primary)' : 'var(--text-muted)'} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 28px 24px 60px' }}>
                    <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
