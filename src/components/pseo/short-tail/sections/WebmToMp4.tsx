import React from 'react';
import { Globe, Smartphone, ArrowRight, Video, Link2, DownloadCloud } from 'lucide-react';
import { useLanguage } from '../../../../hooks/useLanguage';

export const WebmToMp4Hero: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useLanguage();
  return (
    <section style={{ 
      background: 'linear-gradient(135deg, #fdf4ff 0%, #f3e8ff 100%)', 
      padding: '100px 24px 80px', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative abstract elements */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: 120, height: 120, background: 'linear-gradient(135deg, #c084fc, #9333ea)', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', opacity: 0.6, filter: 'blur(10px)', transform: 'rotate(45deg)' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 150, height: 150, background: 'linear-gradient(135deg, #f472b6, #db2777)', borderRadius: '50%', opacity: 0.5, filter: 'blur(15px)' }} />

      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.7)', padding: '8px 24px', borderRadius: 999, marginBottom: 32, border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 4px 20px rgba(147, 51, 234, 0.1)', backdropFilter: 'blur(10px)' }}>
          <Globe size={18} color="#9333ea" />
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#9333ea', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('webmToMp4_heroBadge')}</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24, color: '#4c1d95', letterSpacing: '-0.03em' }}>
          {data.h1}
        </h1>
        
        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', lineHeight: 1.6, color: '#6b21a8', maxWidth: 700, margin: '0 auto 40px', fontWeight: 500 }}>
          {data.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
          {data.bespokeData?.heroTags?.map((tag: string, idx: number) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', padding: '12px 24px', borderRadius: 16, color: '#4c1d95', fontSize: '1rem', fontWeight: 700, boxShadow: '0 10px 30px rgba(147, 51, 234, 0.05)' }}>
              <Link2 size={18} color="#c084fc" />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WebmToMp4Benefits: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useLanguage();
  return (
    <section style={{ padding: '120px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#111827', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em' }}>
            {data.bespokeData?.benefitsTitle || t('webmToMp4_heroTitle')}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', maxWidth: 800, margin: '0 auto', lineHeight: 1.8 }}>
            {data.bespokeData?.benefitsDesc || t('webmToMp4_heroDesc')}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3vw', flexWrap: 'wrap' }}>
          {/* WebM Side */}
          <div style={{ background: '#fdf4ff', border: '2px solid #f3e8ff', borderRadius: 32, padding: 40, flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, background: 'white', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 10px 30px rgba(147, 51, 234, 0.1)' }}>
              <Globe size={40} color="#9333ea" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4c1d95', marginBottom: 16 }}>Source WebM</h3>
            <p style={{ color: '#7e22ce', fontSize: '1.05rem', lineHeight: 1.6 }}>Plays on Chrome/Firefox. Often downloaded from Discord or 4chan. Fails on iOS.</p>
          </div>

          <div style={{ background: 'white', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(147, 51, 234, 0.1)', zIndex: 2 }}>
            <ArrowRight size={30} color="#c084fc" />
          </div>

          {/* MP4 Side */}
          <div style={{ background: 'linear-gradient(135deg, #9333ea, #4c1d95)', borderRadius: 32, padding: 40, flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: 'white', boxShadow: '0 20px 40px rgba(147, 51, 234, 0.2)' }}>
            <div style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <Smartphone size={40} color="white" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: 16 }}>Target MP4</h3>
            <p style={{ color: '#e9d5ff', fontSize: '1.05rem', lineHeight: 1.6 }}>Plays natively everywhere. Shareable on WhatsApp, iMessage, and Instagram.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WebmToMp4Performance: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useLanguage();
  return (
    <section style={{ padding: '100px 24px', background: '#faf5ff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, background: 'rgba(147, 51, 234, 0.1)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Zap size={40} color="#9333ea" />
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: 24, color: '#4c1d95', letterSpacing: '-0.02em' }}>
          {data.features?.[0]?.title || t('webmToMp4_perfTitle')}
        </h2>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#6b21a8' }}>
          {data.features?.[0]?.desc || t('webmToMp4_perfDesc')}
        </p>
      </div>
    </section>
  );
};

export const WebmToMp4Privacy: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useLanguage();
  return (
    <section style={{ padding: '120px 24px', background: 'white' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: 20, background: '#fdf4ff', borderRadius: '50%', marginBottom: 32 }}>
          <Lock size={48} color="#c026d3" />
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 24, color: '#4c1d95', letterSpacing: '-0.02em' }}>
          {data.features?.[1]?.title || t('webmToMp4_privTitle')}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#6b21a8', lineHeight: 1.8, marginBottom: 40, maxWidth: 700, margin: '0 auto 40px' }}>
          {data.features?.[1]?.desc || t('webmToMp4_privDesc')}
        </p>
      </div>
    </section>
  );
};
