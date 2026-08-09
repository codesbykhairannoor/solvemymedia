const fs = require('fs');

const content = `import React, { useState } from 'react';
import { Wand2, FileAudio, Split, ChevronRight, Activity, Cpu, ShieldCheck } from 'lucide-react';
import type { SectionProps } from '../types';

// Reusable Minimalist Border-Left Accordion Component
const ExtractAccordionItem: React.FC<{ 
  title: React.ReactNode, 
  content: React.ReactNode, 
  isOpen: boolean, 
  onToggle: () => void,
  index?: number
}> = ({ title, content, isOpen, onToggle, index }) => {
  return (
    <div style={{
      background: isOpen ? 'var(--bg-app)' : 'transparent',
      borderLeft: isOpen ? '4px solid var(--brand-primary)' : '4px solid transparent',
      borderRadius: '0 16px 16px 0',
      marginBottom: 8,
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      boxShadow: isOpen ? '0 10px 30px rgba(0,0,0,0.03)' : 'none'
    }}>
      <button 
        onClick={onToggle}
        style={{
          width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
          color: isOpen ? 'var(--brand-primary)' : 'var(--text-main)', fontSize: '1.2rem', fontWeight: 700
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {index !== undefined && (
            <span style={{ opacity: 0.5, fontSize: '1.5rem', fontWeight: 900, fontFamily: 'monospace' }}>
              {(index + 1).toString().padStart(2, '0')}
            </span>
          )}
          {title}
        </div>
        <ChevronRight 
          size={24} 
          style={{ 
            transform: isOpen ? 'rotate(90deg)' : 'none', 
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            color: isOpen ? 'var(--brand-primary)' : 'var(--text-muted)',
            opacity: isOpen ? 1 : 0.3
          }} 
        />
      </button>
      <div 
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div style={{ padding: '0 24px 24px', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, opacity: isOpen ? 1 : 0, transition: 'opacity 0.3s ease', paddingLeft: index !== undefined ? 64 : 24 }}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ExtractAudioHeroSection: React.FC<SectionProps> = ({ section }) => (
  <section className="section-global" style={{ margin: '40px auto', padding: '0 24px' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'inline-flex', gap: 16, marginBottom: 40 }}>
        <div style={{ width: 100, height: 100, background: 'var(--bg-card)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}><Wand2 size={48} color="var(--text-muted)"/></div>
        <div style={{ width: 100, height: 100, background: 'linear-gradient(to right, #ec4899, #f43f5e)', color: '#fff', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)' }}><FileAudio size={48}/></div>
      </div>
      <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.1 }}>
        {section.title}
      </h2>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>
        {section.content}
      </p>
    </div>
  </section>
);

export const ExtractAudioHowToSection: React.FC<SectionProps> = ({ section }) => {
  const [activeItem, setActiveItem] = useState<number | null>(0);
  
  return (
    <section className="section-global" style={{ padding: '80px 24px', background: 'var(--bg-card)', borderRadius: 40 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: 16 }}>{section.title}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{section.content || "Extract audio from your videos effortlessly in seconds."}</p>
        </div>
        <div>
          {section.steps?.slice(0,4).map((s:any, i:number) => (
            <ExtractAccordionItem 
              key={i} 
              index={i}
              title={s.title} 
              content={s.description || s.desc} 
              isOpen={activeItem === i} 
              onToggle={() => setActiveItem(activeItem === i ? null : i)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const ExtractAudioGeoSection: React.FC<SectionProps> = ({ section }) => {
  const [activeItem, setActiveItem] = useState<number | null>(0);
  const fallbackFeatures = [
    { title: 'Offline Capable', desc: 'Works entirely without internet after first load.' },
    { title: 'Zero Ping', desc: 'No waiting for server queues or uploads.' },
    { title: 'Local Processing', desc: 'Process unlimited gigabytes locally without strict caps.' }
  ];
  const features = section.features?.length ? section.features : fallbackFeatures;

  return (
    <section className="section-global" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'center' }}>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: 100, fontWeight: 700, fontSize: '0.9rem', marginBottom: 24 }}>
            <Activity size={18} /> {section.title}
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: 20 }}>{section.title}</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 40 }}>{section.content}</p>
        </div>
        <div style={{ flex: '1 1 500px' }}>
          {features.slice(0,4).map((f:any, i:number) => (
            <ExtractAccordionItem 
              key={i} 
              title={f.title} 
              content={f.desc || f.description} 
              isOpen={activeItem === i} 
              onToggle={() => setActiveItem(activeItem === i ? null : i)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const ExtractAudioPrivacySection: React.FC<SectionProps> = ({ section }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const fallbackFeatures = [
    { title: 'Local Encoding', desc: 'WebAssembly ensures audio never leaves your device' },
    { title: 'No Data Collection', desc: 'Zero metrics are recorded on your media files' },
    { title: 'Instant Purge', desc: 'Memory is cleared immediately after compression finishes' }
  ];
  const features = section.features?.length ? section.features : fallbackFeatures;

  return (
    <section className="section-global" style={{ padding: '80px 24px', background: 'var(--bg-input)', borderRadius: 40 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <ShieldCheck size={48} color="var(--brand-primary)" style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: 20 }}>{section.title}</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>{section.content}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {features.map((f:any, i:number) => (
            <ExtractAccordionItem 
              key={i} 
              title={f.title} 
              content={f.desc || f.description} 
              isOpen={activeItem === i} 
              onToggle={() => setActiveItem(activeItem === i ? null : i)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const ExtractAudioPerformanceSection: React.FC<SectionProps> = ({ section }) => {
  const [activeItem, setActiveItem] = useState<number | null>(0);
  const fallbackStats = [
    { label: 'FASTER', value: '4x' },
    { label: 'LATENCY', value: '0ms' },
    { label: 'RESOLUTION', value: 'HQ' },
    { label: 'LOCAL', value: '100%' }
  ];
  const stats = section.stats?.length ? section.stats : fallbackStats;

  return (
    <section className="section-global" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'flex-start', flexDirection: 'row-reverse' }}>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', borderRadius: 100, fontWeight: 700, fontSize: '0.9rem', marginBottom: 24 }}>
            <Cpu size={18} /> {section.title}
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: 20 }}>{section.title}</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 40 }}>{section.content}</p>
        </div>
        <div style={{ flex: '1 1 500px' }}>
          {stats.slice(0,4).map((s:any, i:number) => (
            <ExtractAccordionItem 
              key={i} 
              title={s.label} 
              content={\`Extract audio with \${s.value} efficiency compared to traditional cloud processors, keeping everything strictly inside your local browser memory.\`}
              isOpen={activeItem === i} 
              onToggle={() => setActiveItem(activeItem === i ? null : i)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
\`;

fs.writeFileSync('d:/audiovideo/media-compressor/src/components/seo-sections/tools/ExtractAudioSections.tsx', content, 'utf-8');
console.log('ExtractAudioSections updated!');
