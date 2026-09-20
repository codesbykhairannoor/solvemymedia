import React, { useState } from 'react';
import { Settings2, Shield, CheckCircle, Zap, Activity, Wifi, Star, ShieldCheck, Monitor } from 'lucide-react';
import { DualColumnWorkspace } from '../components/workspaces/DualColumnWorkspace';
import { useUniversalCompressor } from '../hooks/useUniversalCompressor';
import { useLanguage } from '../hooks/useLanguage';
import type { Quality } from '../hooks/useUniversalCompressor';

export const CompressVideo: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { processing, progress, engine, processMedia } = useUniversalCompressor();
  const { t } = useLanguage();
  
  const initialFormat = pseoData && pseoData.path.includes('compress-') ? pseoData.path.split('compress-')[1] : 'mp4';
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<Quality>(60);
  const [realSizeMB, setRealSizeMB] = useState<number | null>(null);
  
  // Note: we can use initialFormat to set target format if CompressVideo supported it, but it outputs MP4.
  // Actually, we pass 'mp4' to processMedia below anyway.
  
  const sidebarStrings = {
    settings: t('cvSettings') || "Compression Settings",
    desc: t('cvSettingsDesc') || "Choose compression target. Lower quality means smaller file size.",
    extreme: t('cvExtreme') || "Extreme Size",
    balanced: t('cvBalanced') || "Balanced",
    high: t('cvHigh') || "High Quality"
  };

  React.useEffect(() => {
    if (outputUrl) {
      fetch(outputUrl)
        .then(res => res.blob())
        .then(blob => setRealSizeMB(blob.size / (1024 * 1024)))
        .catch(() => setRealSizeMB(null));
    } else {
      setRealSizeMB(null);
    }
  }, [outputUrl]);

  const handleProcess = async () => {
    if (!file) return;
    const url = await processMedia(file, quality, 'mp4');
    if (url) setOutputUrl(url);
  };

  const getEstimatedSize = () => {
    if (!file) return null;
    const origMB = file.size / (1024 * 1024);
    
    if (realSizeMB !== null) {
      const savedPercent = Math.round((1 - (realSizeMB / origMB)) * 100);
      return {
        orig: origMB,
        est: realSizeMB,
        saved: savedPercent,
        isReal: true
      };
    }
    
    const ratio = 0.3 + (0.7 * (quality / 100)); // 0.3 to 1.0
    return {
      orig: origMB,
      est: origMB * ratio,
      saved: Math.round((1 - ratio) * 100),
      isReal: false
    };
  };

  const est = getEstimatedSize();

  const sidebarContent = (
    <>
      {est && (
        <div style={{ background: 'var(--bg-input)', padding: 16, borderRadius: 'var(--radius-md)', marginBottom: 24, border: '1px solid var(--brand-glow)' }}>
          <h4 style={{ fontSize: '0.9rem', color: est.isReal ? 'var(--brand-primary)' : 'var(--text-muted)', marginBottom: 12, fontWeight: est.isReal ? 700 : 500 }}>
            {est.isReal ? '🎉 Actual Result' : 'Estimated Result'}
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Original Size</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)', textDecoration: 'line-through' }}>{est.orig.toFixed(1)} MB</div>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand-secondary)' }}>👉</div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{est.isReal ? 'Actual Size' : 'Target Size'}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: est.saved > 0 ? 'var(--success-color)' : 'var(--warning-color)' }}>
                {est.isReal ? '' : '~'}{est.est.toFixed(1)} MB
              </div>
            </div>
          </div>
          <div style={{ fontSize: '0.8rem', color: est.saved > 0 ? 'var(--success-color)' : 'var(--warning-color)', textAlign: 'center', background: est.saved > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', padding: '4px 8px', borderRadius: 4, fontWeight: 600 }}>
            {est.saved > 0 ? `Saved ${est.saved}% storage!` : `Increased by ${Math.abs(est.saved)}%`}
          </div>
        </div>
      )}
      <div>
        <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings2 size={18} className="text-brand-primary" />
          <span>{sidebarStrings.settings}</span>
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 12 }}>{sidebarStrings.desc}</p>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontWeight: 700, color: 'var(--text-main)' }}>
          <span>{t('cvQuality') || "Quality"}: {quality}%</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="100" 
          step="1" 
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          disabled={processing || !!outputUrl}
          style={{
            width: '100%',
            cursor: processing || !!outputUrl ? 'not-allowed' : 'pointer',
            opacity: processing || !!outputUrl ? 0.6 : 1,
            accentColor: 'var(--brand-primary)'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>{sidebarStrings.extreme}</span>
          <span>{sidebarStrings.balanced}</span>
          <span>{sidebarStrings.high}</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      <DualColumnWorkspace
        accept="video/*"
        title={pseoData ? pseoData.h1 : (t('cvTitle') || "Compress Video Files without Losing Quality")}
        description={pseoData ? pseoData.description : (t('cvDesc') || "Shrink massive video files down to manageable sizes in seconds. Advanced local compression keeps visual quality high and file size low.")}
        toolId="compress-video"
        file={file}
        setFile={(f) => { setFile(f); setOutputUrl(null); }}
        outputUrl={outputUrl}
        processing={processing}
        progress={progress}
        engine={engine}
        onProcess={handleProcess}
        processActionText={t('cvAction') || "Compress Video"}
        sidebarContent={sidebarContent}
        targetFormat="mp4"
      />

      <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px', paddingTop: '40px', background: 'var(--bg-main)' }}>
        {!pseoData && (
          <>
            {/* SECTION 2: FAST, PRIVATE, SECURE */}
            <section className="content-section feature-cards" style={{ padding: '0 24px' }}>
              <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
                <div style={{ flex: '1 1 400px' }}>
                  <div style={{ padding: '8px 16px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--brand-primary)', borderRadius: 20, display: 'inline-block', fontWeight: 700, marginBottom: 24 }}>{t('compVPerfPill') || 'Lightning Fast'}</div>
                  <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.1 }}>{t('compVPerfTitle') || 'Fast. Private. Secure.'}</h2>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 680 }}>{t('compVPerfDesc') || "Our compressor uses WebCodecs to tap directly into your device's hardware encoder. No servers involved."}</p>
                </div>
              </div>
            </section>

            {/* SECTION 1: HERO FEATURES */}
            <section className="content-section hero-features" style={{ padding: '80px 24px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 48 }}>
                <div style={{ flex: '1 1 400px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 16, background: 'rgba(var(--brand-secondary-rgb), 0.1)', color: 'var(--brand-secondary)', marginBottom: 24 }}>
                    <Star size={32} />
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('compVHero2Title') || "Reduce Video Size by up to 90%"}</h2>
                  <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{t('compVHero2Desc') || "Optimize your MP4, WebM, and MOV files for Discord, WhatsApp, and email without noticeably degrading the visual quality."}</p>
                </div>
                <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '100%', aspectRatio: '16/9', background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                    <div style={{ width: '80%', height: '60%', background: 'var(--bg-main)', borderRadius: 12, border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(var(--brand-secondary-rgb), 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--brand-secondary)' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: PERFORMANCE STRIP */}
            <section className="content-section performance" style={{ padding: '40px 24px' }}>
              <div style={{ maxWidth: 960, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 48, flexWrap: 'wrap' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--brand-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 8px 20px rgba(var(--brand-primary-rgb),0.35)' }}>
                    <Zap size={28} color="white" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 12, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('compVPerfTitle') || "Blazing Fast GPU Encoding"}</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 680 }}>{t('compVPerfDesc') || "Our compressor uses WebCodecs to tap directly into your device's hardware encoder. No servers involved."}</p>
                  </div>
                </div>
                <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  {[
                    { icon: '⚡', label: t('compVFeat1Title') || 'Hardware Accelerated', sub: t('compVFeat1Desc') || 'Uses your GPU for native-speed encoding', bg: 'var(--bg-card)' },
                    { icon: '📡', label: t('compVFeat2Title') || 'Zero Uploads', sub: t('compVFeat2Desc') || 'Files are processed directly in browser memory', bg: 'var(--bg-main)' },
                    { icon: '🔒', label: t('compVFeat3Title') || 'Absolute Privacy', sub: t('compVFeat3Desc') || 'Your videos never leave your local machine', bg: 'var(--bg-card)' },
                  ].map(({ icon, label, sub, bg }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 28px', background: bg, borderBottom: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{icon}</div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: 2 }}>{label}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 3: PRIVACY SHIELD */}
            <section className="content-section privacy-security" style={{ padding: '0 24px', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
              <div style={{ background: 'linear-gradient(to right, rgba(var(--brand-primary-rgb),0.05), transparent)', borderRadius: 32, borderLeft: '8px solid var(--brand-primary)', padding: '60px 40px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 40 }}>
                <div style={{ width: 80, height: 80, borderRadius: 24, background: 'var(--brand-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 10px 25px rgba(var(--brand-primary-rgb),0.3)' }}>
                  <Shield size={40} />
                </div>
                <div style={{ flex: 1, minWidth: 300 }}>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)' }}>{t('compVPrivacyTitle') || 'Bank-Grade Privacy for Your Media'}</h2>
                  <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>{t('compVPrivacyDesc') || 'When you compress a home video or a sensitive corporate presentation, it should stay private. Media Compressor acts as a purely local tool, effectively cutting the cord to the internet.'}</p>
                  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    {[t('compVPrivacyBadge1') || 'No Cloud Storage', t('compVPrivacyBadge2') || 'No Cookies', t('compVPrivacyBadge3') || '100% Offline'].map(badge => (
                      <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)', fontWeight: 600 }}>
                        <CheckCircle size={20} color="var(--brand-primary)" /> {badge}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </div>
            </section>

            {/* SECTION 4: HOW TO STEPS */}
            <section className="content-section security-how-to" style={{ padding: '0 24px' }}>
              <div style={{ background: 'var(--bg-card)', borderRadius: 32, padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 60, color: 'var(--text-main)' }}>{t('compVHowToTitle') || 'Compress Video in 3 Steps'}</h2>
              <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 0, flexWrap: 'wrap', justifyContent: 'center' }}>
                {[
                  {title: t('compVHowToStep1') || 'Select File', description: t('compVHowToStep1Desc') || 'Drag and drop any MP4, MOV, or WebM video.'},
                  {title: t('compVHowToStep2') || 'Adjust Quality', description: t('compVHowToStep2Desc') || 'Move the slider to choose between Extreme Size or High Quality.'},
                  {title: t('compVHowToStep3') || 'Save Immediately', description: t('compVHowToStep3Desc') || 'Click compress and download your video in seconds.'}
                ].map((step, i) => (
                  <div key={i} style={{ flex: '1 1 200px', textAlign: 'center', padding: '0 24px 40px' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(var(--brand-secondary-rgb),0.1)', border: '2px solid var(--brand-secondary)', color: 'var(--brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.2rem', fontWeight: 900 }}>{i + 1}</div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 10, color: 'var(--text-main)' }}>{step.title}</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.description}</p>
                  </div>
                ))}
              </div>
              </div>
            </section>

            {/* SECTION 5: BENTO GRID GEO/OFFLINE */}
            <section className="content-section security-geo" style={{ padding: '0 24px' }}>
              <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)', lineHeight: 1.2 }}>{t('compVGeoTitle2') || 'Unmatched Offline Capabilities'}</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40, maxWidth: 600 }}>{t('compVGeoDesc2') || "We built the world's most advanced in-browser media compression engine."}</p>
                <div className="bento-grid">
                  <div className="bento-item-wide-left" style={{ padding: 32, background: 'linear-gradient(135deg, rgba(var(--brand-primary-rgb),0.12), rgba(var(--brand-secondary-rgb),0.06))', borderRadius: 20, border: '1px solid rgba(var(--brand-primary-rgb),0.2)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <Wifi size={32} color="var(--brand-primary)" />
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-main)' }}>{t('compVGeoFeat1Title') || 'Works Without Internet'}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{t('compVGeoFeat1Desc') || 'Try disconnecting your Wi-Fi right now. This page and the compressor will continue to work perfectly.'}</div>
                  </div>
                  <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--brand-primary)' }}>0</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{t('compVBytesUploaded') || 'Bytes Uploaded'}</div>
                  </div>
                  <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--brand-secondary)' }}>∞</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{t('compVFileSizeLimit') || 'File Size Limit'}</div>
                  </div>
                  <div className="bento-item-wide-right" style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Activity size={28} color="var(--text-accent)" style={{ flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>{t('compVWasmTitle') || 'WASM Multi-threading'}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('compVWasmDesc') || 'We utilize all available CPU cores on your device for maximum encoding speed.'}</div>
                    </div>
                  </div>
                  <div className="bento-item-full">
                    <div className="bento-item-half">
                      <div style={{ background: 'var(--bg-app)', padding: 32, borderRadius: 24, border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }} className="hover-lift">
                        <ShieldCheck size={40} color="var(--brand-primary)" style={{ marginBottom: 16 }} />
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 12 }}>{t('compVNoServerTitle') || 'No Servers'}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>{t('compVNoServerDesc') || "We don't have servers to store your videos even if we wanted to."}</p>
                      </div>
                      <div style={{ background: 'var(--bg-app)', padding: 32, borderRadius: 24, border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }} className="hover-lift">
                        <Monitor size={40} color="var(--brand-primary)" style={{ marginBottom: 16 }} />
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 12 }}>{t('compVLocalMemTitle') || 'Local Memory'}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>{t('compVLocalMemDesc') || "Everything happens directly inside your device's RAM and CPU."}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        

        
      </div>
    </>
  );
};