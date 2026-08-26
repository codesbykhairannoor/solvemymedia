import React from 'react';
import { Archive, ArrowRight, Save, Clock, History, Disc, MonitorPlay, ArrowUpRight, CheckSquare, Film } from 'lucide-react';
import { useLanguage } from '../../../../hooks/useLanguage';

export const AviToMp4Hero: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useLanguage();
  return (
    <section style={{ 
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', 
      padding: '120px 24px 100px', 
      position: 'relative', 
      overflow: 'hidden',
      color: 'white'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', color: '#c7d2fe', padding: '6px 20px', borderRadius: 999, marginBottom: 24, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <History size={16} />
          <span style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>{t('aviToMp4_heroBadge')}</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24, textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
          {data.h1}
        </h1>
        
        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', lineHeight: 1.6, color: '#9ca3af', maxWidth: 650, margin: '0 auto 40px' }}>
          {data.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
          {data.bespokeData?.heroTags?.map((tag: string, idx: number) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#374151', padding: '8px 16px', borderRadius: 8, color: '#e5e7eb', fontSize: '0.9rem', fontWeight: 600 }}>
              <CheckSquare size={16} color="#eab308" />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AviToMp4Benefits: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useLanguage();
  return (
    <section style={{ padding: '120px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em' }}>
            {data.bespokeData?.benefitsTitle || t('aviToMp4_heroTitle')}
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: 800, margin: '0 auto', lineHeight: 1.8 }}>
            {data.bespokeData?.benefitsDesc || t('aviToMp4_heroDesc')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Before: AVI */}
          <div style={{ flex: '1 1 300px', background: 'white', padding: 40, borderRadius: 16, border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -20, left: 40, background: '#ef4444', color: 'white', padding: '4px 12px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700 }}>PAST</div>
            <Film size={48} color="#9ca3af" style={{ marginBottom: 24 }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: 12 }}>.AVI Format</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ color: '#ef4444', display: 'flex', gap: 8 }}><span style={{ fontWeight: 800 }}>×</span> Huge file sizes</li>
              <li style={{ color: '#ef4444', display: 'flex', gap: 8 }}><span style={{ fontWeight: 800 }}>×</span> Unsupported on iPhones</li>
              <li style={{ color: '#ef4444', display: 'flex', gap: 8 }}><span style={{ fontWeight: 800 }}>×</span> Won't play on Smart TVs</li>
            </ul>
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowUpRight size={48} color="#eab308" />
          </div>

          {/* After: MP4 */}
          <div style={{ flex: '1 1 300px', background: 'white', padding: 40, borderRadius: 16, border: '2px solid #eab308', boxShadow: '0 20px 40px rgba(234, 179, 8, 0.15)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -20, left: 40, background: '#eab308', color: '#111827', padding: '4px 12px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700 }}>PRESENT</div>
            <MonitorPlay size={48} color="#111827" style={{ marginBottom: 24 }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: 12 }}>.MP4 Format</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ color: '#10b981', display: 'flex', gap: 8 }}><span style={{ fontWeight: 800 }}>✓</span> Tiny file sizes (H.264)</li>
              <li style={{ color: '#10b981', display: 'flex', gap: 8 }}><span style={{ fontWeight: 800 }}>✓</span> Natively supported on iOS</li>
              <li style={{ color: '#10b981', display: 'flex', gap: 8 }}><span style={{ fontWeight: 800 }}>✓</span> Perfect for WhatsApp/Web</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AviToMp4Performance: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useLanguage();
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, background: 'rgba(var(--brand-primary-rgb), 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Save size={40} color="var(--brand-primary)" />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: 24, color: 'var(--text-main)' }}>
          {data.features?.[0]?.title || t('aviToMp4_perfTitle')}
        </h2>
        <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
          {data.features?.[0]?.desc || t('aviToMp4_perfDesc')}
        </p>
      </div>
    </section>
  );
};

export const AviToMp4Privacy: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useLanguage();
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: 20, background: 'rgba(var(--brand-secondary-rgb), 0.1)', borderRadius: '50%', marginBottom: 32 }}>
          <Shield size={48} color="var(--brand-secondary)" />
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 24, color: 'var(--text-main)' }}>
          {data.features?.[1]?.title || t('aviToMp4_privTitle')}
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40, maxWidth: 700, margin: '0 auto' }}>
          {data.features?.[1]?.desc || t('aviToMp4_privDesc')}
        </p>
      </div>
    </section>
  );
};
