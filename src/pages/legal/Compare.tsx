import React from 'react';
import { GitCompare, CloudOff, ShieldAlert, ShieldCheck, Scale, Timer, DollarSign, Target, BookOpen } from 'lucide-react';
import { smartHighlight } from '../../utils/textFormatting';
import { useLanguage } from '../../hooks/useLanguage';

export const Compare: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
      <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
        {/* Section 1: Hero */}
        <section className="seo-section hero" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '12px 24px', background: 'var(--brand-gradient)', borderRadius: 100, color: 'white', fontWeight: 800, fontSize: '0.9rem', marginBottom: 40, gap: 12, alignItems: 'center' }}>
              <GitCompare size={18} /> {t('cmp_heroBadge') || 'A Better Way'}
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.04em', lineHeight: 1.1, fontFamily: 'Outfit, sans-serif' }}>
              {smartHighlight(t('cmp_heroTitle') || 'Cloud vs Local Processing')}
            </h1>
            <p style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 800, margin: '0 auto' }}>
              {t('cmp_heroDesc') || "For 15 years, online tools have relied on a broken paradigm: uploading huge files to distant servers just to make a small edit. We are changing that forever."}
            </p>
          </div>
        </section>

        {/* Section 2: Speed comparison */}
        <section className="seo-section speed" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
             <div style={{ flex: '1 1 400px' }}>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('cmp_speedTitle') || 'Speed is Everything'}</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  {t('cmp_speedDesc') || 'With a cloud tool, you have to wait to upload your 1GB file, wait for it to process, and then wait to download the result. With SolveMyMedia, processing starts the millisecond you drop the file.'}
                </p>
                <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ padding: '4px 12px', background: 'var(--error-color)', color: 'white', borderRadius: 100, fontWeight: 700, fontSize: '0.9rem', width: 60, textAlign: 'center' }}>{t('cmp_cloudLabel') || 'Cloud'}</div>
                      <div style={{ flex: 1, background: 'rgba(239, 68, 68, 0.2)', height: 12, borderRadius: 100 }}>
                         <div style={{ width: '80%', background: 'var(--error-color)', height: '100%', borderRadius: 100 }} />
                      </div>
                      <div style={{ color: 'var(--error-color)', fontWeight: 700 }}>{t('cmp_cloudTime') || '25 mins'}</div>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ padding: '4px 12px', background: 'var(--brand-primary)', color: 'white', borderRadius: 100, fontWeight: 700, fontSize: '0.9rem', width: 60, textAlign: 'center' }}>{t('cmp_localLabel') || 'Local'}</div>
                      <div style={{ flex: 1, background: 'rgba(59, 130, 246, 0.2)', height: 12, borderRadius: 100 }}>
                         <div style={{ width: '15%', background: 'var(--brand-primary)', height: '100%', borderRadius: 100 }} />
                      </div>
                      <div style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>{t('cmp_localTime') || '2 mins'}</div>
                   </div>
                </div>
             </div>
             <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                <Timer size={120} color="var(--brand-secondary)" style={{ opacity: 0.8 }} />
             </div>
          </div>
        </section>

        {/* Section 3: Privacy comparison */}
        <section className="seo-section privacy" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
             <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('cmp_privacyTitle') || 'Who Controls Your Data?'}</h2>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
               <div style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <ShieldAlert size={48} color="var(--error-color)" style={{ marginBottom: 24 }} />
                 <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)' }}>{t('cmp_cloudCardTitle') || 'Cloud Converters'}</h3>
                 <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12 }}>
                   <li style={{ color: 'var(--text-muted)' }}>- {t('cmp_cloudPoint1') || 'Uploads your files to unknown servers'}</li>
                   <li style={{ color: 'var(--text-muted)' }}>- {t('cmp_cloudPoint2') || 'Files can be intercepted during transfer'}</li>
                   <li style={{ color: 'var(--text-muted)' }}>- {t('cmp_cloudPoint3') || 'Risk of files remaining on their servers'}</li>
                 </ul>
               </div>
               <div style={{ padding: 40, background: 'var(--bg-app)', borderRadius: 24, border: '2px solid var(--brand-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                 <ShieldCheck size={48} color="var(--brand-primary)" style={{ marginBottom: 24 }} />
                 <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)' }}>{t('cmp_ourCardTitle') || 'SolveMyMedia'}</h3>
                 <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12 }}>
                   <li style={{ color: 'var(--text-main)' }}>+ {t('cmp_ourPoint1') || 'Files never leave your local device'}</li>
                   <li style={{ color: 'var(--text-main)' }}>+ {t('cmp_ourPoint2') || 'Mathematically immune to MITM data theft'}</li>
                   <li style={{ color: 'var(--text-main)' }}>+ {t('cmp_ourPoint3') || 'Works entirely offline after loading'}</li>
                 </ul>
               </div>
             </div>
          </div>
        </section>

        {/* SECTION: SCIENTIFIC & ARCHITECTURAL COMPARISON MATRIX */}
        <section className="seo-section research-matrix" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 20px',
                borderRadius: 100,
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                color: 'var(--brand-primary)',
                fontSize: '0.85rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                marginBottom: 20
              }}>
                <Scale size={16} />
                {t('researchComp_badge') || 'Algorithmic Comparison'}
              </div>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 800,
                marginBottom: 16,
                color: 'var(--text-main)',
                lineHeight: 1.2
              }}>
                {t('researchComp_title') || 'Scientific & Architectural Breakdown'}
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                maxWidth: 800,
                margin: '0 auto'
              }}>
                {t('researchComp_subtitle') || 'Comparing client-side WebAssembly execution with conventional cloud media pipelines.'}
              </p>
            </div>

            {/* Responsive Table / Card Matrix */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              marginBottom: 32
            }}>
              {[
                {
                  metric: t('researchComp_r1_metric') || 'Execution Sandbox & Isolation',
                  cloud: t('researchComp_r1_cloud') || 'Multi-tenant cloud container; data stored temporarily on shared server SSDs.',
                  local: t('researchComp_r1_local') || 'Formally verified WebAssembly memory sandbox (Haas et al. 2017); zero disk retention.'
                },
                {
                  metric: t('researchComp_r2_metric') || 'Perceptual Quality Index',
                  cloud: t('researchComp_r2_cloud') || 'Opaque proprietary downsampling; unpredictable compression artifacts.',
                  local: t('researchComp_r2_local') || 'Open SSIM index (Wang et al. 2004) & standardized rate control (libx264/libmp3lame).'
                },
                {
                  metric: t('researchComp_r3_metric') || 'Speech Recognition Pipeline',
                  cloud: t('researchComp_r3_cloud') || 'Raw audio stream transmitted to remote cloud API servers for inference.',
                  local: t('researchComp_r3_local') || 'Local Whisper Transformer neural inference (Radford et al. 2023) running on client CPU/GPU.'
                },
                {
                  metric: t('researchComp_r4_metric') || 'Network Egress Attack Surface',
                  cloud: t('researchComp_r4_cloud') || 'Full media file transmitted over WAN; exposed to TLS MITM and server compromise.',
                  local: t('researchComp_r4_local') || 'Mathematical zero-network transmission: 0 bytes uploaded to any remote server.'
                }
              ].map((row, idx) => (
                <div key={idx} style={{
                  padding: 24,
                  background: 'var(--bg-app)',
                  borderRadius: 20,
                  border: '1px solid var(--border-color)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 20,
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 4 }}>
                      {row.metric}
                    </h3>
                  </div>
                  <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.06)', borderRadius: 12, border: '1px solid rgba(239, 68, 68, 0.15)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--error-color)', textTransform: 'uppercase', marginBottom: 4 }}>Cloud Paradigm</div>
                    <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{row.cloud}</div>
                  </div>
                  <div style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.06)', borderRadius: 12, border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', marginBottom: 4 }}>SolveMyMedia Local</div>
                    <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', fontWeight: 600, lineHeight: 1.5 }}>{row.local}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div style={{
              padding: '20px 24px',
              borderRadius: 16,
              background: 'var(--bg-app)',
              border: '1px dashed var(--border-color)',
              fontSize: '0.88rem',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
              <BookOpen size={18} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
              <span>{t('researchComp_disclaimer') || 'Academic Citation: Architectural metrics based on published WebAssembly (PLDI 2017), Whisper AI (ICML 2023), and SSIM (IEEE TIP 2004) performance studies.'}</span>
            </div>
          </div>
        </section>

        {/* Section 4: File size limits */}
        <section className="seo-section limits" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
           <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
              <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <CloudOff size={100} color="var(--error-color)" style={{ opacity: 0.2 }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <Scale size={50} color="var(--text-main)" />
                  </div>
                </div>
              </div>
              <div style={{ flex: '1 1 400px' }}>
                 <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('cmp_limitsTitle') || 'No Arbitrary File Limits'}</h2>
                 <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                   {t('cmp_limitsDesc') || "Traditional converters impose strict limits (like 100MB) because server bandwidth is incredibly expensive. Since we don't use server bandwidth, we don't have to restrict you. If your browser has enough memory, you can compress a 3GB 4K video easily."}
                 </p>
              </div>
           </div>
        </section>

        {/* Section 5: Cost */}
        <section className="seo-section cost" style={{ padding: '80px 24px', background: 'var(--brand-gradient)', color: 'white' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
             <DollarSign size={64} style={{ marginBottom: 32, opacity: 0.9 }} />
             <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>{t('cmp_costTitle') || 'The True Cost of Cloud'}</h2>
             <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8, maxWidth: 800, margin: '0 auto' }}>
               {t('cmp_costDesc') || 'Cloud converters usually hook you with a free tier, then block your IP if you use it too much or demand a $15/month subscription. We have no hidden fees. We built this tool to break the cycle of expensive SaaS utilities.'}
             </p>
          </div>
        </section>

        {/* Section 6: Accuracy/Quality */}
        <section className="seo-section quality" style={{ padding: '80px 24px' }}>
           <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
              <div style={{ flex: '1 1 400px' }}>
                 <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('cmp_qualTitle') || 'Same Engines, Better Experience'}</h2>
                 <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                   {t('cmp_qualDesc') || 'Don\'t mistake "local" for "low quality." Our web application uses the exact same industry-standard engines (FFmpeg and OpenAI Whisper) that the premium cloud services use on their backends. The only difference is we run them on your machine via WebAssembly.'}
                 </p>
              </div>
              <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                 <div style={{ padding: 48, background: 'var(--bg-card)', borderRadius: 32, border: '1px solid var(--border-color)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                    <Target size={80} color="var(--brand-secondary)" />
                 </div>
              </div>
           </div>
        </section>

        {/* FAQ Section */}
        <section className="seo-section faq" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('cmp_faqTitle') || 'Frequently Asked Questions'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { q: t('cmp_faq1Q') || "If it's running locally, won't it drain my battery?", a: t('cmp_faq1A') || "Processing heavy videos will utilize your CPU, which does consume battery, similar to playing a 3D game. However, it's often much faster than waiting for an upload/download cycle on a weak connection." },
                { q: t('cmp_faq2Q') || "Is the output quality the same as paid cloud tools?", a: t('cmp_faq2A') || "Yes. We use the exact same FFmpeg libraries under the hood that major platforms use. The quality is identical." },
                { q: t('cmp_faq3Q') || "Do I need a powerful computer to use this?", a: t('cmp_faq3A') || "While a faster computer will compress files much quicker, even older laptops can run our WebAssembly tools perfectly fine—it just might take a little longer." }
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
