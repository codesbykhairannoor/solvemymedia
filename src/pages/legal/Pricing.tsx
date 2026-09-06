import React from 'react';
import { Wallet, Check, X, CreditCard, Infinity, Heart, Crown, CheckCircle2 } from 'lucide-react';
import { smartHighlight } from '../../utils/textFormatting';
import { useLanguage } from '../../hooks/useLanguage';

export const Pricing: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
      <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
        {/* Section 1: Hero */}
        <section className="seo-section hero" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '12px 24px', background: 'var(--brand-gradient)', borderRadius: 100, color: 'white', fontWeight: 800, fontSize: '0.9rem', marginBottom: 40, gap: 12, alignItems: 'center' }}>
              <Wallet size={18} /> {t('price_heroBadge') || 'Transparent Pricing'}
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.04em', lineHeight: 1.1, fontFamily: 'Outfit, sans-serif' }}>
              {smartHighlight(t('price_heroTitle') || 'Everything is 100% Free')}
            </h1>
            <p style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 800, margin: '0 auto' }}>
              {t('price_heroDesc') || "No monthly subscriptions. No credit cards required. No watermarks on your exports. Because you are using your own hardware to process the files, we have zero server costs—and we pass those savings entirely to you."}
            </p>
          </div>
        </section>

        {/* Section 2: Pricing Table */}
        <section className="seo-section pricing-table" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
             <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('price_tableTitle') || 'Why Pay for Cloud?'}</h2>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
                {/* Competitor */}
                <div style={{ flex: '1 1 350px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 24, padding: 40, opacity: 0.7 }}>
                   <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>{t('price_compTitle') || 'Typical Cloud Converter'}</div>
                   <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: 24 }}>{t('price_compPrice') || '$15'}<span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: 500 }}>{t('price_compPeriod') || '/mo'}</span></div>
                   <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                     {[
                       t('price_comp1') || 'Upload limits (usually 500MB)',
                       t('price_comp2') || 'Wait in processing queues',
                       t('price_comp3') || 'Risk data breaches',
                       t('price_comp4') || 'Slow download speeds'
                     ].map((item, i) => (
                       <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-muted)' }}><X size={20} color="var(--error-color)" /> {item}</li>
                     ))}
                   </ul>
                </div>

                {/* Us */}
                <div style={{ flex: '1 1 350px', background: 'var(--bg-app)', border: '2px solid var(--brand-primary)', borderRadius: 24, padding: 40, position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                   <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', background: 'var(--brand-gradient)', color: 'white', padding: '8px 24px', borderRadius: 100, fontWeight: 800, fontSize: '0.9rem' }}>{t('price_ourBadge') || 'YOUR BEST OPTION'}</div>
                   <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: 8 }}>{t('price_ourTitle') || 'SolveMyMedia'}</div>
                   <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: 24 }}>{t('price_ourPrice') || '$0'}<span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: 500 }}>{t('price_ourPeriod') || '/forever'}</span></div>
                   <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                     {[
                       t('price_our1') || 'No upload limits (up to 2GB tested)',
                       t('price_our2') || 'Instant processing start',
                       t('price_our3') || 'Zero-Trust Local Privacy',
                       t('price_our4') || 'Instant downloads'
                     ].map((item, i) => (
                       <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-main)', fontWeight: 500 }}><Check size={20} color="var(--brand-primary)" /> {item}</li>
                     ))}
                   </ul>
                </div>
             </div>
          </div>
        </section>

        {/* Section 3: No Subscriptions */}
        <section className="seo-section no-subs" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px' }}>
              <div style={{ width: 80, height: 80, borderRadius: 24, background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
                <CreditCard size={40} />
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('price_noSubsTitle') || 'Ditch the Subscriptions'}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                {t('price_noSubsDesc') || 'Subscription fatigue is real. Why should you pay a monthly fee to compress a single video or convert an audio file twice a year? We believe utility software should be free and accessible whenever you need it, without forcing you to remember to cancel a trial.'}
              </p>
            </div>
            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
               <div style={{ padding: 48, background: 'var(--bg-card)', borderRadius: 32, border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                 <div style={{ position: 'relative' }}>
                   <Crown size={80} color="var(--brand-secondary)" style={{ opacity: 0.2 }} />
                   <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <X size={64} color="var(--error-color)" />
                   </div>
                 </div>
                 <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: 24 }}>{t('price_noPremium') || 'No Premium Tiers'}</div>
               </div>
            </div>
          </div>
        </section>

        {/* Section 4: Unlimited Limits */}
        <section className="seo-section limits" style={{ padding: '80px 24px', background: 'var(--brand-gradient)', color: 'white' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <Infinity size={64} style={{ marginBottom: 32, opacity: 0.9 }} />
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>{t('price_limitsTitle') || 'Unlimited File Sizes'}</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8, maxWidth: 800, margin: '0 auto' }}>
              {t('price_limitsDesc') || "Unlike cloud services that restrict you to 100MB or 500MB unless you pay, our limits are strictly dictated by your browser's memory. If your device has enough RAM, you can process massive 2GB+ files completely for free."}
            </p>
          </div>
        </section>

        {/* Section 5: Why it's free */}
        <section className="seo-section why-free" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
             <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
               <div style={{ width: '100%', maxWidth: 350, padding: 48, background: 'var(--bg-app)', borderRadius: 32, border: '1px solid var(--border-color)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                  <Heart size={64} color="var(--error-color)" fill="var(--error-color)" style={{ marginBottom: 24 }} />
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>{t('price_openCore') || 'Open Source Core'}</div>
               </div>
             </div>
             <div style={{ flex: '1 1 400px' }}>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('price_whyFreeTitle') || 'How Can We Afford This?'}</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  {t('price_whyFreeDesc') || 'Hosting large file processing servers costs thousands of dollars a month. Hosting a static web application that offloads all the processing to your local computer costs mere pennies. By utilizing your device\'s power, we completely eliminate our largest overhead, allowing us to keep this service free forever.'}
                </p>
             </div>
          </div>
        </section>

        {/* Section 6: Included Features Grid */}
        <section className="seo-section features" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('price_inclTitle') || 'Everything Included'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
              {[
                t('price_feat1') || "No Watermarks on any exports",
                t('price_feat2') || "Unlimited processing queues",
                t('price_feat3') || "Full privacy & data security",
                t('price_feat4') || "Advanced AI tools (Whisper)",
                t('price_feat5') || "Full WebCodecs acceleration"
              ].map((feat, idx) => (
                <div key={idx} style={{ padding: 32, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 24 }}>
                  <CheckCircle2 size={32} color="var(--brand-primary)" style={{ flexShrink: 0 }} />
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{feat}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="seo-section faq" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('price_faqTitle') || 'Frequently Asked Questions'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { q: t('price_faq1Q') || "Is there really no hidden catch?", a: t('price_faq1A') || "No catch. Our app executes the logic on your machine. You supply the processing power, so we don't have to pay for expensive cloud servers." },
                { q: t('price_faq2Q') || "Will you ever charge for this?", a: t('price_faq2A') || "The core tools you see today will always remain free. We may introduce optional, completely separate premium features later, but we will never restrict what's already free." },
                { q: t('price_faq3Q') || "Do I need to create an account?", a: t('price_faq3A') || "No! Since we don't charge you or save your files, there is absolutely no need for an account system." }
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
