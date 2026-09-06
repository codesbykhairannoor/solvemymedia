import React from 'react';
import { ScrollText, Gavel, Scale, AlertTriangle, PenTool, Mail, FileWarning } from 'lucide-react';
import { smartHighlight } from '../../utils/textFormatting';
import { useLanguage } from '../../hooks/useLanguage';

export const TermsOfService: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
      <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
        {/* Section 1: Hero */}
        <section className="seo-section hero" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '12px 24px', background: 'var(--brand-gradient)', borderRadius: 100, color: 'white', fontWeight: 800, fontSize: '0.9rem', marginBottom: 40, gap: 12, alignItems: 'center' }}>
              <ScrollText size={18} /> {t('terms_heroBadge') || 'Legal Agreement'}
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.04em', lineHeight: 1.1, fontFamily: 'Outfit, sans-serif' }}>
              {smartHighlight(t('terms_heroTitle') || 'Terms of Service')}
            </h1>
            <p style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 800, margin: '0 auto' }}>
              {t('terms_heroDesc') || "By accessing and using SolveMyMedia's tools, you agree to be bound by the following terms. We've kept them as simple and readable as possible."}
            </p>
          </div>
        </section>

        {/* Section 2: Acceptable Use */}
        <section className="seo-section acceptable-use" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px' }}>
              <div style={{ width: 80, height: 80, borderRadius: 24, background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
                <Gavel size={40} />
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('terms_useTitle') || 'Acceptable Use'}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                {t('terms_useDesc') || 'Our tools are provided for personal and commercial use. However, you must not use our services to process illegal content, infringe on intellectual property rights, or distribute malware. Since the processing is done locally, you bear full legal responsibility for the files you generate.'}
              </p>
            </div>
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: 16 }}>
               {[
                 t('terms_rule1') || 'No Illegal Content',
                 t('terms_rule2') || 'No Copyright Infringement',
                 t('terms_rule3') || 'No Reverse Engineering of UI'
               ].map((rule, idx) => (
                 <div key={idx} style={{ padding: 24, background: 'var(--bg-app)', borderLeft: '4px solid var(--error-color)', borderRadius: '0 16px 16px 0', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                   {rule}
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Section 3: Intellectual Property */}
        <section className="seo-section ip" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <PenTool size={48} color="var(--brand-primary)" style={{ margin: '0 auto 32px' }} />
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('terms_ipTitle') || 'Intellectual Property'}</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 800, margin: '0 auto' }}>
              {t('terms_ipDesc') || 'The website design, branding, logo, and original UI code belong to SolveMyMedia. The underlying media processing technologies (like FFmpeg.wasm, ONNX, and others) belong to their respective open-source creators and are used under their permissive licenses (MIT, Apache, etc.). You retain all rights to the media you process.'}
            </p>
          </div>
        </section>

        {/* Section 4: As-Is Warranty */}
        <section className="seo-section warranty" style={{ padding: '80px 24px', background: 'var(--brand-gradient)', color: 'white' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
             <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
               <div style={{ padding: 48, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: 32, border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center' }}>
                  <FileWarning size={64} style={{ marginBottom: 24 }} />
                  <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{t('terms_asIs') || '"AS-IS" BASIS'}</div>
               </div>
             </div>
             <div style={{ flex: '1 1 400px' }}>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>{t('terms_warrantyTitle') || 'No Warranty'}</h2>
                <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8, marginBottom: 16 }}>
                  {t('terms_warrantyDesc1') || 'Our services are provided on an "as is" and "as available" basis without any warranties of any kind. We do not guarantee that the service will be uninterrupted or error-free.'}
                </p>
                <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8 }}>
                  {t('terms_warrantyDesc2') || 'Experimental browser features (like WebCodecs) can crash tabs on older devices. Always keep a backup of your original files before processing them.'}
                </p>
             </div>
          </div>
        </section>

        {/* Section 5: Limitation of Liability */}
        <section className="seo-section liability" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
           <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
             <Scale size={48} color="var(--brand-secondary)" style={{ margin: '0 auto 32px' }} />
             <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('terms_liabilityTitle') || 'Limitation of Liability'}</h2>
             <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 800, margin: '0 auto' }}>
               {t('terms_liabilityDesc') || 'In no event shall SolveMyMedia, its developers, or its affiliates be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.'}
             </p>
           </div>
        </section>
        
        {/* Section 6: Modifications & Contact */}
        <section className="seo-section contact" style={{ padding: '80px 24px' }}>
           <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
              <div style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)' }}>
                 <AlertTriangle size={32} color="var(--warning-color)" style={{ marginBottom: 24 }} />
                 <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)' }}>{t('terms_modTitle') || 'Modifications'}</h3>
                 <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{t('terms_modDesc') || 'We reserve the right to modify or replace these Terms at any time. We will try to provide at least 30 days notice prior to any new terms taking effect.'}</p>
              </div>
              <div style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)' }}>
                 <Mail size={32} color="var(--brand-primary)" style={{ marginBottom: 24 }} />
                 <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)' }}>{t('terms_contactTitle') || 'Contact Us'}</h3>
                 <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{t('terms_contactDesc') || 'If you have any questions about these Terms, please contact us at legal@solvemymedia.com.'}</p>
              </div>
           </div>
        </section>

        {/* FAQ Section */}
        <section className="seo-section faq" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('terms_faqTitle') || 'Frequently Asked Questions'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { q: t('terms_faq1Q') || "Can I use the output videos for commercial purposes?", a: t('terms_faq1A') || "Yes. Since the processing is done locally on your machine, you retain all copyrights and commercial rights to the files you create and process using our tools." },
                { q: t('terms_faq2Q') || "Do you claim ownership of my uploaded media?", a: t('terms_faq2A') || "No. You retain all rights. Furthermore, because we do not have servers to receive your files, we literally cannot store, copy, or claim ownership of your media." },
                { q: t('terms_faq3Q') || "Can I use your website in an iframe on my own site?", a: t('terms_faq3A') || "No, embedding our tools inside iframes or redistributing our application as a white-label service without explicit written permission is prohibited." }
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
