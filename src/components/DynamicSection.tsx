import React from 'react';
import { CheckCircle2, ListChecks, ChevronRight, MessageSquare, Zap, Activity, Info } from 'lucide-react';

export interface DynamicSectionProps {
  data?: {
    type: 'steps' | 'comparison' | 'benefits' | 'use-cases';
    heading: string;
    items: { title: string; content: string }[];
  };
}

export const DynamicSection: React.FC<DynamicSectionProps> = ({ data }) => {
  if (!data || !data.items || data.items.length === 0) return null;

  return (
    <section className="content-section dynamic-section" style={{ padding: '80px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 60, color: 'var(--text-main)', lineHeight: 1.2 }}>
            {data.heading}
          </h2>

          {data.type === 'steps' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>
              {data.items.map((item, idx) => (
                <div key={idx} style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -24, left: 40, width: 48, height: 48, borderRadius: '50%', background: 'var(--brand-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 900, boxShadow: '0 8px 16px rgba(var(--brand-primary-rgb), 0.3)' }}>
                    {idx + 1}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)', marginTop: 12 }}>{item.title}</h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{item.content}</p>
                </div>
              ))}
            </div>
          )}

          {data.type === 'comparison' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 800, margin: '0 auto' }}>
              {data.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 32, padding: 40, background: idx === 0 ? 'var(--bg-card)' : 'linear-gradient(135deg, rgba(var(--brand-primary-rgb), 0.1), rgba(var(--brand-secondary-rgb), 0.05))', borderRadius: 24, border: idx === 0 ? '1px solid var(--border-color)' : '1px solid rgba(var(--brand-primary-rgb), 0.3)' }}>
                  <div style={{ flexShrink: 0, width: 64, height: 64, borderRadius: 20, background: idx === 0 ? 'var(--bg-app)' : 'var(--brand-primary)', color: idx === 0 ? 'var(--text-muted)' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {idx === 0 ? <Info size={32} /> : <Zap size={32} />}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 12, color: idx === 0 ? 'var(--text-main)' : 'var(--brand-primary)' }}>{item.title}</h3>
                    <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.type === 'benefits' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
              {data.items.map((item, idx) => (
                <div key={idx} style={{ padding: 40, background: 'var(--bg-card)', borderRadius: 20, borderLeft: '6px solid var(--brand-secondary)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                    <CheckCircle2 color="var(--success-color)" size={32} />
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>{item.title}</h3>
                  </div>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{item.content}</p>
                </div>
              ))}
            </div>
          )}

          {data.type === 'use-cases' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'center' }}>
              {data.items.map((item, idx) => (
                <div key={idx} style={{ flex: '1 1 300px', padding: 48, background: 'var(--bg-card)', borderRadius: 32, textAlign: 'center', border: '1px solid var(--border-color)' }}>
                  <div style={{ width: 80, height: 80, margin: '0 auto 32px', borderRadius: 24, background: 'rgba(var(--brand-secondary-rgb), 0.1)', color: 'var(--brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {idx === 0 ? <MessageSquare size={40} /> : idx === 1 ? <Activity size={40} /> : <ListChecks size={40} />}
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 20, color: 'var(--text-main)' }}>{item.title}</h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{item.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
