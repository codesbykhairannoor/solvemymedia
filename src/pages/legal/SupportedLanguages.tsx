import React from 'react';
import { useSeoMeta } from '../../hooks/useSeoMeta';
import { Languages, Globe2, Captions, MessageSquare, MapPin, SearchCheck, CheckCircle2 } from 'lucide-react';
import { smartHighlight } from '../../utils/textFormatting';

export const SupportedLanguages: React.FC = () => {
  useSeoMeta('Supported Languages | SolveMyMedia', 'See all the languages supported by our UI and AI transcription models.');

  return (
    <div style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
      <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
        {/* Section 1: Hero */}
        <section className="seo-section hero" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '12px 24px', background: 'var(--brand-gradient)', borderRadius: 100, color: 'white', fontWeight: 800, fontSize: '0.9rem', marginBottom: 40, gap: 12, alignItems: 'center' }}>
              <Languages size={18} /> Global Reach
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.04em', lineHeight: 1.1, fontFamily: 'Outfit, sans-serif' }}>
              {smartHighlight('Built for a Global Audience')}
            </h1>
            <p style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 800, margin: '0 auto' }}>
              Whether you are transcribing a Spanish interview or navigating the app in Indonesian, SolveMyMedia is designed to break down language barriers locally.
            </p>
          </div>
        </section>

        {/* Section 2: UI Localization */}
        <section className="seo-section localization" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>App Interface Localization</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>
                We are actively working to translate our entire user interface so you can compress and edit your videos in your native language. Currently, the app interface fully supports:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
                 {['English (Default)', 'Indonesian', 'Spanish', 'French', 'German', 'Portuguese'].map((lang, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 12, fontWeight: 600, color: 'var(--text-main)' }}>
                       <CheckCircle2 size={18} color="var(--brand-primary)" /> {lang}
                    </div>
                 ))}
              </div>
            </div>
            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
               <Globe2 size={120} color="var(--brand-secondary)" style={{ opacity: 0.8 }} />
            </div>
          </div>
        </section>

        {/* Section 3: AI Transcription (Whisper) */}
        <section className="seo-section transcription" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <Captions size={48} color="var(--brand-primary)" style={{ margin: '0 auto 24px' }} />
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>AI Transcription Capabilities</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 800, margin: '0 auto' }}>
                Our Transcribe tool uses optimized Whisper models via WebAssembly. It can automatically detect and transcribe over 90 languages with near-human accuracy directly in your browser.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
               <div style={{ padding: 32, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: 12 }}>90+</div>
                  <div style={{ color: 'var(--text-muted)' }}>Languages Detected Automatically</div>
               </div>
               <div style={{ padding: 32, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: 12 }}>100%</div>
                  <div style={{ color: 'var(--text-muted)' }}>Offline Processing (No APIs)</div>
               </div>
               <div style={{ padding: 32, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: 12 }}>4</div>
                  <div style={{ color: 'var(--text-muted)' }}>Export Formats (SRT, VTT, TXT, JSON)</div>
               </div>
            </div>
          </div>
        </section>

        {/* Section 4: Accuracy Note */}
        <section className="seo-section accuracy" style={{ padding: '80px 24px', background: 'var(--brand-gradient)', color: 'white' }}>
           <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
              <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                 <div style={{ padding: 48, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: 32, border: '1px solid rgba(255,255,255,0.2)' }}>
                    <SearchCheck size={80} />
                 </div>
              </div>
              <div style={{ flex: '1 1 400px' }}>
                 <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>A Note on Accuracy</h2>
                 <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8 }}>
                   Because the AI models are running directly on your CPU/GPU inside a web browser, we use heavily quantized (compressed) versions of the Whisper model to prevent your computer from freezing.
                 </p>
                 <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8, marginTop: 16 }}>
                   While accuracy is incredibly high for major languages like English, Spanish, and French, some niche dialects may experience lower transcription accuracy compared to massive cloud models.
                 </p>
              </div>
           </div>
        </section>

        {/* Section 5: Suggest a Language */}
        <section className="seo-section suggest" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
           <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
              <MessageSquare size={48} color="var(--brand-primary)" style={{ margin: '0 auto 32px' }} />
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>Help Us Translate</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>
                SolveMyMedia is built by the community, for the community. If you don't see your native language in our UI localization list and want to help translate the interface, we would love your help!
              </p>
              <button style={{ padding: '16px 32px', background: 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', transition: 'opacity 0.2s' }}>
                 Contribute on GitHub
              </button>
           </div>
        </section>
        
        {/* Section 6: Translation Map */}
        <section className="seo-section map" style={{ padding: '80px 24px' }}>
           <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <MapPin size={40} color="var(--brand-secondary)" style={{ marginBottom: 24 }} />
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>Global Delivery</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, textAlign: 'center', maxWidth: 800, marginBottom: 48 }}>
                No matter where you are in the world, the application files are delivered via an ultra-fast global CDN. Once downloaded (usually under 2 seconds), you have a full desktop-class media suite running entirely offline in your location.
              </p>
           </div>
        </section>

        {/* FAQ Section */}
        <section className="seo-section faq" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { q: "Can I translate from one language to another?", a: "Currently, the AI transcribe tool focuses on transcribing spoken audio into text in its native language. Translation features (e.g., spoken Spanish to English text) are on our roadmap." },
                { q: "Why is the AI getting some words wrong in my language?", a: "To run inside a browser, we use a smaller 30MB AI model instead of a 3GB cloud model. It's incredibly fast and private, but it sacrifices a tiny bit of vocabulary depth for niche languages." },
                { q: "How do I change the UI language?", a: "You can change the language using the language dropdown located in the Navbar. Your preference will be saved locally for your next visit." }
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
