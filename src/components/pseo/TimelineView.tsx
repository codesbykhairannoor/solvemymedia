import React from 'react';

interface TimelineViewProps {
  title: string;
  description: string;
  events: { title: string; desc: string; time: string }[];
}

export const TimelineView: React.FC<TimelineViewProps> = ({ title, description, events }) => {
  return (
    <div style={{ marginBottom: '80px', padding: 'clamp(32px, 5vw, 64px)', background: 'var(--bg-card)', borderRadius: 32, border: '1px solid var(--border-color)' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)', marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)' }}>{description}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, position: 'relative', paddingLeft: 32 }}>
        <div style={{ position: 'absolute', left: 40, top: 0, bottom: 0, width: 2, background: 'var(--border-color)' }} />
        {events.map((ev, i) => (
          <div key={i} style={{ position: 'relative', paddingLeft: 48 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: 18, height: 18, borderRadius: '50%', background: 'var(--brand-primary)', transform: 'translateX(-45%)', border: '4px solid var(--bg-card)', boxShadow: '0 0 0 4px rgba(168,85,247,0.2)' }} />
            <div style={{ fontSize: '0.95rem', color: 'var(--brand-primary)', fontWeight: 700, marginBottom: 8 }}>{ev.time}</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 8 }}>{ev.title}</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{ev.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};