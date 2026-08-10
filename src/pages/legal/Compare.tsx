import React from 'react';
import { GitCompare, Zap, CloudOff, ShieldAlert, ShieldCheck, Scale, FileWarning, Timer, DollarSign, Target } from 'lucide-react';
import { smartHighlight } from '../../utils/textFormatting';

export const Compare: React.FC = () => {

  return (
    <div style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
      <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
        {/* Section 1: Hero */}
        <section className="seo-section hero" style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '12px 24px', background: 'var(--brand-gradient)', borderRadius: 100, color: 'white', fontWeight: 800, fontSize: '0.9rem', marginBottom: 40, gap: 12, alignItems: 'center' }}>
              <GitCompare size={18} /> A Better Way
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: 32, color: 'var(--text-main)', letterSpacing: '-0.04em', lineHeight: 1.1, fontFamily: 'Outfit, sans-serif' }}>
              {smartHighlight('Cloud vs Local Processing')}
            </h1>
            <p style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 800, margin: '0 auto' }}>
              For 15 years, online tools have relied on a broken paradigm: uploading huge files to distant servers just to make a small edit. We are changing that forever.
            </p>
          </div>
        </section>

        {/* Section 2: Speed comparison */}
        <section className="seo-section speed" style={{ padding: '80px 24px', background: 'var(--bg-card)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
             <div style={{ flex: '1 1 400px' }}>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>Speed is Everything</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  With a cloud tool, you have to wait to upload your 1GB file, wait for it to process, and then wait to download the result. With SolveMyMedia, processing starts the millisecond you drop the file.
                </p>
                <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ padding: '4px 12px', background: 'var(--error-color)', color: 'white', borderRadius: 100, fontWeight: 700, fontSize: '0.9rem', width: 60, textAlign: 'center' }}>Cloud</div>
                      <div style={{ flex: 1, background: 'rgba(239, 68, 68, 0.2)', height: 12, borderRadius: 100 }}>
                         <div style={{ width: '80%', background: 'var(--error-color)', height: '100%', borderRadius: 100 }} />
                      </div>
                      <div style={{ color: 'var(--error-color)', fontWeight: 700 }}>25 mins</div>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ padding: '4px 12px', background: 'var(--brand-primary)', color: 'white', borderRadius: 100, fontWeight: 700, fontSize: '0.9rem', width: 60, textAlign: 'center' }}>Local</div>
                      <div style={{ flex: 1, background: 'rgba(59, 130, 246, 0.2)', height: 12, borderRadius: 100 }}>
                         <div style={{ width: '15%', background: 'var(--brand-primary)', height: '100%', borderRadius: 100 }} />
                      </div>
                      <div style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>2 mins</div>
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
             <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>Who Controls Your Data?</h2>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
               <div style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <ShieldAlert size={48} color="var(--error-color)" style={{ marginBottom: 24 }} />
                 <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)' }}>Cloud Converters</h3>
                 <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12 }}>
                   <li style={{ color: 'var(--text-muted)' }}>- Uploads your files to unknown servers</li>
                   <li style={{ color: 'var(--text-muted)' }}>- Files can be intercepted during transfer</li>
                   <li style={{ color: 'var(--text-muted)' }}>- Risk of files remaining on their servers</li>
                 </ul>
               </div>
               <div style={{ padding: 40, background: 'var(--bg-app)', borderRadius: 24, border: '2px solid var(--brand-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                 <ShieldCheck size={48} color="var(--brand-primary)" style={{ marginBottom: 24 }} />
                 <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)' }}>SolveMyMedia</h3>
                 <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12 }}>
                   <li style={{ color: 'var(--text-main)' }}>+ Files never leave your local device</li>
                   <li style={{ color: 'var(--text-main)' }}>+ Mathematically immune to MITM data theft</li>
                   <li style={{ color: 'var(--text-main)' }}>+ Works entirely offline after loading</li>
                 </ul>
               </div>
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
                 <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>No Arbitrary File Limits</h2>
                 <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                   Traditional converters impose strict limits (like 100MB) because server bandwidth is incredibly expensive. Since we don't use server bandwidth, we don't have to restrict you. If your browser has enough memory, you can compress a 3GB 4K video easily.
                 </p>
              </div>
           </div>
        </section>

        {/* Section 5: Cost */}
        <section className="seo-section cost" style={{ padding: '80px 24px', background: 'var(--brand-gradient)', color: 'white' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
             <DollarSign size={64} style={{ marginBottom: 32, opacity: 0.9 }} />
             <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>The True Cost of Cloud</h2>
             <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8, maxWidth: 800, margin: '0 auto' }}>
               Cloud converters usually hook you with a free tier, then block your IP if you use it too much or demand a $15/month subscription. We have no hidden fees. We built this tool to break the cycle of expensive SaaS utilities.
             </p>
          </div>
        </section>

        {/* Section 6: Accuracy/Quality */}
        <section className="seo-section quality" style={{ padding: '80px 24px' }}>
           <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
              <div style={{ flex: '1 1 400px' }}>
                 <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>Same Engines, Better Experience</h2>
                 <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                   Don't mistake "local" for "low quality." Our web application uses the exact same industry-standard engines (FFmpeg and OpenAI Whisper) that the premium cloud services use on their backends. The only difference is we run them on your machine via WebAssembly.
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
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 48, color: 'var(--text-main)', lineHeight: 1.2 }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { q: "If it's running locally, won't it drain my battery?", a: "Processing heavy videos will utilize your CPU, which does consume battery, similar to playing a 3D game. However, it's often much faster than waiting for an upload/download cycle on a weak connection." },
                { q: "Is the output quality the same as paid cloud tools?", a: "Yes. We use the exact same FFmpeg libraries under the hood that major platforms use. The quality is identical." },
                { q: "Do I need a powerful computer to use this?", a: "While a faster computer will compress files much quicker, even older laptops can run our WebAssembly tools perfectly fine—it just might take a little longer." }
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
