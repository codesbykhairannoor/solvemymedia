import React from 'react';
import { useSeoMeta } from '../../hooks/useSeoMeta';
import { Shield, Fingerprint, Lock, Cpu, Globe, Search, Code, CheckCircle2 } from 'lucide-react';
import { smartHighlight } from '../../utils/textFormatting';

export const SecurityTrust: React.FC = () => {
  useSeoMeta('Security & Trust | SolveMyMedia', 'Discover the technical architecture that makes SolveMyMedia the most secure media tool on the web.');

  return (
    <div style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
      <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
        {/* Section 1: Hero */}
        <section className="seo-section hero" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '12px 24px', background: 'var(--brand-gradient)', borderRadius: 100, color: 'white', fontWeight: 800, fontSize: '0.9rem', marginBottom: 40, gap: 12, alignItems: 'center' }}>
              <Shield size={18} /> Enterprise-Grade Security
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.04em', lineHeight: 1.1, fontFamily: 'Outfit, sans-serif' }}>
              {smartHighlight('Trust Through Architecture')}
            </h1>
            <p style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 800, margin: '0 auto' }}>
              We didn't just write a privacy policy. We engineered a system where a data breach is mathematically and physically impossible.
            </p>
          </div>
        </section>

        {/* Section 2: Zero-Trust Model */}
        <section className="seo-section zero-trust" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>Zero-Trust by Default</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                In a standard web app, you must trust the server not to steal your data. In our Zero-Trust architecture, you don't even have to trust us. The web browser acts as an impenetrable sandbox. The files you select never leave your local environment.
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
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', lineHeight: 1.2 }}>WebAssembly Isolation</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
              <div style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', display: 'flex', gap: 24 }}>
                <Cpu size={40} color="var(--brand-primary)" style={{ flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 12, color: 'var(--text-main)' }}>Memory Sandboxing</h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>The FFmpeg and AI binaries run in a strict WebAssembly sandbox. They cannot access your file system or network without explicit permission.</p>
                </div>
              </div>
              <div style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', display: 'flex', gap: 24 }}>
                <Globe size={40} color="var(--brand-secondary)" style={{ flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 12, color: 'var(--text-main)' }}>Network Isolation</h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>Once the initial scripts are downloaded, the application can operate entirely offline. Try it yourself by turning off your Wi-Fi.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Secure Delivery */}
        <section className="seo-section delivery" style={{ padding: '80px 24px', background: 'var(--brand-gradient)', color: 'white' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <Lock size={48} style={{ margin: '0 auto 32px' }} />
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>Secure Delivery (TLS 1.3)</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8, maxWidth: 800, margin: '0 auto' }}>
              The initial connection to download our web application is secured using enterprise-grade TLS 1.3 encryption. This guarantees that the code running in your browser has not been tampered with by man-in-the-middle attacks.
            </p>
          </div>
        </section>

        {/* Section 5: Compliance */}
        <section className="seo-section compliance" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
             <div style={{ flex: '1 1 400px' }}>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>GDPR & CCPA Compliant</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  Because we process all user files locally, we are inherently compliant with the strictest data protection laws globally, including GDPR and CCPA.
                </p>
                <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                   <div style={{ padding: '8px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 100, fontWeight: 700 }}>EU GDPR</div>
                   <div style={{ padding: '8px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 100, fontWeight: 700 }}>US CCPA</div>
                   <div style={{ padding: '8px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 100, fontWeight: 700 }}>HIPAA Ready</div>
                </div>
             </div>
             <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
               <div style={{ width: '100%', maxWidth: 350, padding: 48, background: 'var(--bg-app)', borderRadius: 32, border: '1px solid var(--border-color)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                  <Search size={64} color="var(--brand-primary)" style={{ marginBottom: 24 }} />
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>Always Compliant</div>
               </div>
             </div>
          </div>
        </section>

        {/* Section 6: Open Source Heritage */}
        <section className="seo-section opensource" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
           <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
              <Code size={48} color="var(--text-accent)" style={{ margin: '0 auto 32px' }} />
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>Built on Open Source</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                The core processing engines that power SolveMyMedia (like FFmpeg and ONNX Runtime) are open-source and regularly audited by thousands of developers and security researchers worldwide. This provides a level of security transparency that proprietary closed-source cloud services simply cannot match.
              </p>
           </div>
        </section>

        {/* FAQ Section */}
        <section className="seo-section faq" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { q: "Is it safe to compress confidential legal or medical videos here?", a: "Yes. Because the videos never leave your device, this tool is safe to use even in strict, highly regulated corporate environments like hospitals or law firms." },
                { q: "How do I know my files aren't being uploaded secretly?", a: "You can verify this yourself! Open your browser's Developer Tools (F12), navigate to the Network tab, and watch the traffic while you compress a video. You will see zero outbound traffic." },
                { q: "Are your SSL certificates up to date?", a: "Yes, our domain is secured with modern SSL/TLS certificates enforcing HTTPS for all connections." }
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
