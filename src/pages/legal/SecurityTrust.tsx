import React from 'react';
import { Shield, Fingerprint, Lock, Cpu, Globe, Search, Code, CheckCircle2, ShieldCheck, FileText, BookOpen } from 'lucide-react';
import { smartHighlight } from '../../utils/textFormatting';
import { useLanguage } from '../../hooks/useLanguage';

export const SecurityTrust: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
      <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
        {/* Section 1: Hero */}
        <section className="seo-section hero" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '12px 24px', background: 'var(--brand-gradient)', borderRadius: 100, color: 'white', fontWeight: 800, fontSize: '0.9rem', marginBottom: 40, gap: 12, alignItems: 'center' }}>
              <Shield size={18} /> {t('sec_heroBadge') || 'Enterprise-Grade Security'}
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.04em', lineHeight: 1.1, fontFamily: 'Outfit, sans-serif' }}>
              {smartHighlight(t('sec_heroTitle') || 'Trust Through Architecture')}
            </h1>
            <p style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 800, margin: '0 auto' }}>
              {t('sec_heroDesc') || "We didn't just write a privacy policy. We engineered a system where a data breach is mathematically and physically impossible."}
            </p>
          </div>
        </section>

        {/* Section 2: Zero-Trust Model */}
        <section className="seo-section zero-trust" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('sec_zeroTrustTitle') || 'Zero-Trust by Default'}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                {t('sec_zeroTrustDesc') || "In a standard web app, you must trust the server not to steal your data. In our Zero-Trust architecture, you don't even have to trust us. The web browser acts as an impenetrable sandbox. The files you select never leave your local environment."}
              </p>
            </div>
            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
               <div style={{ position: 'relative', width: 300, height: 300 }}>
                 <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px dashed var(--brand-primary)', animation: 'spin 20s linear infinite' }} />
                 <div style={{ position: 'absolute', inset: 20, borderRadius: '50%', background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                    <Fingerprint size={80} color="var(--brand-primary)" />
                 </div>
                 <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
               </div>
            </div>
          </div>
        </section>

        {/* Section 3: WebAssembly Security */}
        <section className="seo-section wasm" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('sec_wasmTitle') || 'WebAssembly Isolation'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
              <div style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', display: 'flex', gap: 24 }}>
                <Cpu size={40} color="var(--brand-primary)" style={{ flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 12, color: 'var(--text-main)' }}>{t('sec_wasm1Title') || 'Memory Sandboxing'}</h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{t('sec_wasm1Desc') || 'The FFmpeg and AI binaries run in a strict WebAssembly sandbox. They cannot access your file system or network without explicit permission.'}</p>
                </div>
              </div>
              <div style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', display: 'flex', gap: 24 }}>
                <Globe size={40} color="var(--brand-secondary)" style={{ flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 12, color: 'var(--text-main)' }}>{t('sec_wasm2Title') || 'Network Isolation'}</h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{t('sec_wasm2Desc') || 'Once the initial scripts are downloaded, the application can operate entirely offline. Try it yourself by turning off your Wi-Fi.'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: CRYPTOGRAPHIC & ARCHITECTURAL FOUNDATIONS */}
        <section className="seo-section research-security" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
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
                <ShieldCheck size={16} />
                {t('researchSec_badge') || 'Provable Privacy Architecture'}
              </div>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 800,
                marginBottom: 16,
                color: 'var(--text-main)',
                lineHeight: 1.2
              }}>
                {t('researchSec_title') || 'Cryptographic & Architectural Foundations'}
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                maxWidth: 800,
                margin: '0 auto'
              }}>
                {t('researchSec_subtitle') || 'We replace corporate privacy promises with formal mathematical isolation and zero-knowledge data minimization principles.'}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginBottom: 32 }}>
              {/* Pillar 1 */}
              <div style={{
                padding: 40,
                background: 'var(--bg-app)',
                borderRadius: 24,
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: 20 }}>
                    <Lock size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-main)' }}>
                    {t('researchSec_c1_title') || 'Provable Data Minimization (GDPR Art. 5(1)(c))'}
                  </h3>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FileText size={14} />
                    <span>{t('researchSec_c1_principle') || 'Principle of Least Privilege (Saltzer & Schroeder, IEEE 1975)'}</span>
                  </div>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>
                    {t('researchSec_c1_desc') || 'By never transmitting media bytes across the network, the attack surface for interception (MITM) and third-party data leaks is reduced to absolute zero.'}
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div style={{
                padding: 40,
                background: 'var(--bg-app)',
                borderRadius: 24,
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', marginBottom: 20 }}>
                    <Cpu size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-main)' }}>
                    {t('researchSec_c2_title') || 'W3C WebCodecs & TypedArray Isolation'}
                  </h3>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#8b5cf6', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FileText size={14} />
                    <span>{t('researchSec_c2_principle') || 'W3C WebCodecs Standard (Adenot, Zemtsov, Aboba 2023)'}</span>
                  </div>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>
                    {t('researchSec_c2_desc') || 'Video frames and audio chunks are decoded into hardware-isolated ArrayBuffer objects within browser tabs, physically incapable of remote network egress without browser authorization.'}
                  </p>
                </div>
              </div>
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
              <span>{t('researchSec_disclaimer') || 'Standards Attribution: Built in accordance with published ISO/IEC and W3C open specifications. Standards bodies do not directly endorse individual commercial implementations.'}</span>
            </div>
          </div>
        </section>

        {/* Section 4: Secure Delivery */}
        <section className="seo-section delivery" style={{ padding: '80px 24px', background: 'var(--brand-gradient)', color: 'white' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <Lock size={48} style={{ margin: '0 auto 32px' }} />
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>{t('sec_tlsTitle') || 'Secure Delivery (TLS 1.3)'}</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8, maxWidth: 800, margin: '0 auto' }}>
              {t('sec_tlsDesc') || 'The initial connection to download our web application is secured using enterprise-grade TLS 1.3 encryption. This guarantees that the code running in your browser has not been tampered with by man-in-the-middle attacks.'}
            </p>
          </div>
        </section>

        {/* Section 5: Compliance */}
        <section className="seo-section compliance" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
             <div style={{ flex: '1 1 400px' }}>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('sec_complianceTitle') || 'GDPR & CCPA Compliant'}</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  {t('sec_complianceDesc') || 'Because we process all user files locally, we are inherently compliant with the strictest data protection laws globally, including GDPR and CCPA.'}
                </p>
                <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                   <div style={{ padding: '8px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 100, fontWeight: 700 }}>{t('sec_compBadge1') || 'EU GDPR'}</div>
                   <div style={{ padding: '8px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 100, fontWeight: 700 }}>{t('sec_compBadge2') || 'US CCPA'}</div>
                   <div style={{ padding: '8px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 100, fontWeight: 700 }}>{t('sec_compBadge3') || 'HIPAA Ready'}</div>
                </div>
             </div>
             <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
               <div style={{ width: '100%', maxWidth: 350, padding: 48, background: 'var(--bg-app)', borderRadius: 32, border: '1px solid var(--border-color)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                  <Search size={64} color="var(--brand-primary)" style={{ marginBottom: 24 }} />
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>{t('sec_alwaysComp') || 'Always Compliant'}</div>
               </div>
             </div>
          </div>
        </section>

        {/* Section 6: Open Source Heritage */}
        <section className="seo-section opensource" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
           <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
              <Code size={48} color="var(--text-accent)" style={{ margin: '0 auto 32px' }} />
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('sec_openTitle') || 'Built on Open Source'}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                {t('sec_openDesc') || 'The core processing engines that power SolveMyMedia (like FFmpeg and ONNX Runtime) are open-source and regularly audited by thousands of developers and security researchers worldwide. This provides a level of security transparency that proprietary closed-source cloud services simply cannot match.'}
              </p>
           </div>
        </section>

        {/* FAQ Section */}
        <section className="seo-section faq" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('sec_faqTitle') || 'Frequently Asked Questions'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { q: t('sec_faq1Q') || "Is it safe to compress confidential legal or medical videos here?", a: t('sec_faq1A') || "Yes. Because the videos never leave your device, this tool is safe to use even in strict, highly regulated corporate environments like hospitals or law firms." },
                { q: t('sec_faq2Q') || "How do I know my files aren't being uploaded secretly?", a: t('sec_faq2A') || "You can verify this yourself! Open your browser's Developer Tools (F12), navigate to the Network tab, and watch the traffic while you compress a video. You will see zero outbound traffic." },
                { q: t('sec_faq3Q') || "Are your SSL certificates up to date?", a: t('sec_faq3A') || "Yes, our domain is secured with modern SSL/TLS certificates enforcing HTTPS for all connections." }
              ].map((faq, idx) => (
                <div key={idx} style={{ background: 'var(--bg-app)', padding: 32, borderRadius: 20, border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
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
