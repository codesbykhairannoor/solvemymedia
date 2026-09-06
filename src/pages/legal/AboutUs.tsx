import React from 'react';
import { ShieldCheck, Heart, Zap, CheckCircle2, Globe, Users, Code, Lock, History, Sparkles, Cpu, Bot, BookOpen } from 'lucide-react';
import { smartHighlight } from '../../utils/textFormatting';
import { useLanguage } from '../../hooks/useLanguage';

export const AboutUs: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
      <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
        {/* Section 1: Hero */}
        <section className="seo-section hero" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '12px 24px', background: 'var(--brand-gradient)', borderRadius: 100, color: 'white', fontWeight: 800, fontSize: '0.9rem', marginBottom: 40, gap: 12, alignItems: 'center' }}>
              <Users size={18} /> Our Story
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.04em', lineHeight: 1.1, fontFamily: 'Outfit, sans-serif' }}>
              {smartHighlight('Building the Future of Local Software')}
            </h1>
            <p style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 800, margin: '0 auto' }}>
              We believe powerful media tools shouldn't cost a subscription fee or compromise your privacy. That's why we're bringing desktop-class processing directly to your browser.
            </p>
          </div>
        </section>

        {/* Section 2: Mission */}
        <section className="seo-section mission" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px' }}>
              <div style={{ width: 80, height: 80, borderRadius: 24, background: 'var(--brand-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
                <Globe size={40} />
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>Our Mission</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                The internet is saturated with shady online converters that harvest your files, bombard you with ads, and demand monthly fees. Our mission is to democratize media creation by providing free, private, and open-source-powered tools that run 100% locally on your machine.
              </p>
            </div>
            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
               <div style={{ width: '100%', padding: 48, background: 'var(--bg-app)', borderRadius: 32, border: '1px solid var(--border-color)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--brand-secondary)', marginBottom: 16 }}>0</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>Files uploaded to our servers. Ever.</div>
               </div>
            </div>
          </div>
        </section>

        {/* Section 3: Core Values Grid */}
        <section className="seo-section values" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', lineHeight: 1.2 }}>Our Core Values</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
              {[
                { icon: ShieldCheck, title: "Absolute Privacy", desc: "Your files never leave your device." },
                { icon: Zap, title: "Unmatched Speed", desc: "We utilize your hardware, not sluggish cloud servers." },
                { icon: Heart, title: "Free for Everyone", desc: "No hidden fees, no watermarks, no subscriptions." }
              ].map((val, idx) => (
                <div key={idx} style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)' }}>
                  <val.icon size={32} color="var(--brand-primary)" style={{ marginBottom: 24 }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)' }}>{val.title}</h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: ACADEMIC RESEARCH TIMELINE */}
        <section className="seo-section research-timeline" style={{ padding: '80px 24px', background: 'var(--bg-app)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 20px',
                borderRadius: 100,
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.25)',
                color: 'var(--brand-primary)',
                fontSize: '0.85rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                marginBottom: 20
              }}>
                <History size={16} />
                {t('researchAbout_badge') || 'Our Scientific Lineage'}
              </div>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 800,
                marginBottom: 16,
                color: 'var(--text-main)',
                lineHeight: 1.2
              }}>
                {t('researchAbout_title') || 'From Academic Research to Open Browser Tools'}
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                maxWidth: 800,
                margin: '0 auto'
              }}>
                {t('researchAbout_subtitle') || 'How decades of signal processing breakthroughs culminated in zero-upload browser media editing.'}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
              {[
                {
                  era: t('researchAbout_s1_era') || '1999 – 2004',
                  title: t('researchAbout_s1_title') || 'Foundations of Perceptual Signal Encoding',
                  desc: t('researchAbout_s1_desc') || 'Brandenburg (AES 1999) perfected psychoacoustic masking for MP3 audio, while Wang et al. (IEEE 2004) introduced SSIM for image quality evaluation.',
                  icon: Sparkles,
                  color: '#eab308'
                },
                {
                  era: t('researchAbout_s2_era') || '2017',
                  title: t('researchAbout_s2_title') || 'The WebAssembly Sandbox Revolution',
                  desc: t('researchAbout_s2_desc') || 'Haas et al. (PLDI 2017) proved that complex C/C++ audio and video processing engines could run safely inside web browsers at near-native CPU speeds.',
                  icon: Cpu,
                  color: '#8b5cf6'
                },
                {
                  era: t('researchAbout_s3_era') || '2023 – Present',
                  title: t('researchAbout_s3_title') || 'Client-Side Neural AI & WebCodecs',
                  desc: t('researchAbout_s3_desc') || 'Radford et al. (ICML 2023) open-sourced Whisper AI, enabling SolveMyMedia to bring end-to-end neural speech transcription into the browser without servers.',
                  icon: Bot,
                  color: '#ec4899'
                }
              ].map((step, idx) => (
                <div key={idx} style={{
                  padding: 32,
                  background: 'var(--bg-card)',
                  borderRadius: 24,
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  gap: 24,
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: `${step.color}15`,
                    border: `1px solid ${step.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: step.color,
                    flexShrink: 0
                  }}>
                    <step.icon size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: step.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                      {step.era}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 8 }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div style={{
              padding: '20px 24px',
              borderRadius: 16,
              background: 'var(--bg-card)',
              border: '1px dashed var(--border-color)',
              fontSize: '0.88rem',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
              <BookOpen size={18} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
              <span>{t('researchAbout_disclaimer') || 'Research Attribution: SolveMyMedia bridges open algorithms published in academic literature to modern web browsers. Published researchers have not directly evaluated this tool.'}</span>
            </div>
          </div>
        </section>

        {/* Section 4: Technology Highlights */}
        <section className="seo-section technology" style={{ padding: '80px 24px', background: 'var(--brand-gradient)', color: 'white' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <Code size={48} style={{ marginBottom: 32, opacity: 0.9 }} />
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>Powered by Modern Web Standards</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8, maxWidth: 700, margin: '0 auto 48px' }}>
              We harness the bleeding edge of web technology—WebAssembly, WebCodecs, and WebGPU—to port complex C++ algorithms directly into JavaScript.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
              {['WebAssembly (WASM)', 'FFmpeg.wasm', 'ONNX Runtime', 'WebCodecs API'].map(tech => (
                <div key={tech} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.1)', borderRadius: 100, fontWeight: 700, border: '1px solid rgba(255,255,255,0.2)' }}>
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: The Problem */}
        <section className="seo-section problem" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
             <div style={{ flex: '1 1 400px', display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
                <div style={{ padding: 32, background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border-color)', display: 'flex', gap: 24, alignItems: 'center' }}>
                   <div style={{ color: 'var(--error-color)', fontWeight: 900, fontSize: '2rem' }}>X</div>
                   <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Cloud limits and long wait times</div>
                </div>
                <div style={{ padding: 32, background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border-color)', display: 'flex', gap: 24, alignItems: 'center' }}>
                   <div style={{ color: 'var(--error-color)', fontWeight: 900, fontSize: '2rem' }}>X</div>
                   <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Paying $15/mo for basic compression</div>
                </div>
             </div>
             <div style={{ flex: '1 1 400px' }}>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>Why We Built This</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  Have you ever tried to compress a 2GB video online? You have to wait 20 minutes to upload it, pay a fee to bypass the 500MB limit, wait for it to process, and then wait to download it. It's broken. By running everything locally, we bypass the cloud entirely.
                </p>
             </div>
          </div>
        </section>

        {/* Section 6: Security Focus */}
        <section className="seo-section security" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
             <div style={{ display: 'inline-flex', padding: 24, background: 'var(--bg-app)', borderRadius: '50%', marginBottom: 32, border: '1px solid var(--border-color)' }}>
               <Lock size={48} color="var(--brand-secondary)" />
             </div>
             <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>Security by Design</h2>
             <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
               Because our app runs completely client-side, we don't need complex data processing agreements or privacy policies to explain what we do with your data. We simply don't have your data. You can disconnect from the internet and continue using the app.
             </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="seo-section faq" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { q: "How does the company make money?", a: "Currently, SolveMyMedia is completely free and funded out of pocket. We believe in building great tools first. In the future, we may introduce opt-in premium features for power users, but the core tools will remain free." },
                { q: "Can I contribute to the project?", a: "Yes! We are huge advocates for the open-source community. You can reach out to our team to find ways to contribute or report issues." },
                { q: "Where is the team based?", a: "We are a distributed team of engineers passionate about pushing the limits of what a web browser can do, operating globally across multiple time zones." }
              ].map((faq, idx) => (
                <div key={idx} style={{ background: 'var(--bg-card)', padding: 32, borderRadius: 20, border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12, color: 'var(--text-main)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ color: 'var(--brand-primary)' }}>Q:</span> {faq.q}
                  </h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>
                    <strong style={{ color: 'var(--brand-secondary)' }}>A:</strong> {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
