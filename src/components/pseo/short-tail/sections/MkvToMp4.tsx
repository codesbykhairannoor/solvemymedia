import React from 'react';
import { Database, FileVideo, CheckCircle2, ChevronRight, PlaySquare, Workflow, Layers, Subtitles, Shield } from 'lucide-react';
import { useLanguage } from '../../../../hooks/useLanguage';

export const MkvToMp4Hero: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useLanguage();
  return (
    <section style={{ 
      background: '#09090b', 
      color: '#f8fafc', 
      padding: '120px 24px 80px', 
      borderBottom: '1px solid #27272a',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at top right, rgba(var(--brand-primary-rgb), 0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
      
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#18181b', padding: '6px 16px', borderRadius: 6, marginBottom: 24, border: '1px solid #3f3f46' }}>
          <Layers size={16} color="var(--brand-secondary)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#a1a1aa' }}>{t('mkvToMp4_heroBadge')}</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: 24, textShadow: '0 4px 20px rgba(0,0,0,0.5)', letterSpacing: '-0.02em' }}>
          {data.h1}
        </h1>
        
        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', lineHeight: 1.6, color: '#a1a1aa', maxWidth: 700, marginBottom: 40 }}>
          {data.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {data.bespokeData?.heroTags?.map((tag: string, idx: number) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e4e4e7', fontSize: '1rem', fontWeight: 500 }}>
              <CheckCircle2 size={20} color="var(--brand-primary)" />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const MkvToMp4Benefits: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useLanguage();
  return (
    <section style={{ padding: '120px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 24, padding: 60, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.1, marginBottom: 24 }}>
            {data.bespokeData?.benefitsTitle || t('mkvToMp4_heroTitle')}
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40, maxWidth: 800 }}>
            {data.bespokeData?.benefitsDesc || t('mkvToMp4_heroDesc')}
          </p>
        </div>

        {/* Pipeline Diagram */}
        <div style={{ background: '#09090b', padding: '60px 40px', borderRadius: 24, border: '1px solid #27272a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2vw', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 100, height: 100, background: '#27272a', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #3f3f46' }}>
              <FileVideo size={48} color="#f8fafc" />
            </div>
            <div style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.2rem' }}>Source MKV</div>
            <div style={{ color: '#71717a', fontSize: '0.9rem', textAlign: 'center' }}>H.264 Video<br/>+ AAC Audio</div>
          </div>

          <ChevronRight size={48} color="#3f3f46" />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 100, height: 100, background: 'rgba(var(--brand-primary-rgb), 0.1)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--brand-primary)' }}>
              <Workflow size={48} color="var(--brand-primary)" />
            </div>
            <div style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.2rem' }}>Remuxing Engine</div>
            <div style={{ color: '#71717a', fontSize: '0.9rem', textAlign: 'center' }}>Stream Copy<br/>(No Re-encoding)</div>
          </div>

          <ChevronRight size={48} color="#3f3f46" />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 100, height: 100, background: 'var(--brand-primary)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(var(--brand-primary-rgb), 0.4)' }}>
              <PlaySquare size={48} color="white" />
            </div>
            <div style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.2rem' }}>Target MP4</div>
            <div style={{ color: '#71717a', fontSize: '0.9rem', textAlign: 'center' }}>Universal Playback<br/>100% Original Quality</div>
          </div>

        </div>
      </div>
    </section>
  );
};

export const MkvToMp4Performance: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useLanguage();
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <Subtitles size={48} color="var(--brand-primary)" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: 24, color: 'var(--text-main)' }}>
          {data.features?.[0]?.title || t('mkvToMp4_perfTitle')}
        </h2>
        <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
          {data.features?.[0]?.desc || t('mkvToMp4_perfDesc')}
        </p>
      </div>
    </section>
  );
};

export const MkvToMp4Privacy: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useLanguage();
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <Shield size={64} color="var(--brand-secondary)" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 24, color: 'var(--text-main)' }}>
          {data.features?.[1]?.title || t('mkvToMp4_privTitle')}
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40 }}>
          {data.features?.[1]?.desc || t('mkvToMp4_privDesc')}
        </p>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ background: '#09090b', padding: '12px 24px', borderRadius: 8, fontWeight: 700, color: 'var(--brand-secondary)', border: '1px solid #3f3f46' }}>Zero Upload</div>
          <div style={{ background: '#09090b', padding: '12px 24px', borderRadius: 8, fontWeight: 700, color: 'var(--brand-secondary)', border: '1px solid #3f3f46' }}>No Size Limits</div>
        </div>
      </div>
    </section>
  );
};
