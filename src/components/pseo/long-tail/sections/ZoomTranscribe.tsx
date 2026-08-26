// @ts-nocheck
import React from 'react';
import { FileText, Video, Shield, Zap, CheckCircle2, Brain, Search } from 'lucide-react';

interface SD { h1?: string; description?: string; dynamicSection?: any; }

export const ZoomTranscribeHero: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '80px 24px', background: 'var(--bg-card)', borderRadius: 40, border: '1px solid var(--border-color)', margin: '40px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 30%, rgba(59,130,246,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ flex: '1 1 360px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 280 }}>
          {/* Video thumbnail */}
          <div style={{ width: '100%', height: 160, background: 'var(--bg-main)', borderRadius: 18, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, position: 'relative', overflow: 'hidden' }}>
            <Video size={48} color="var(--text-muted)" />
            <div style={{ position: 'absolute', top: 8, left: 8, padding: '4px 10px', background: '#0ea5e9', borderRadius: 100, fontSize: '0.7rem', fontWeight: 800, color: '#fff' }}>Zoom Meeting.mp4</div>
            <div style={{ position: 'absolute', bottom: 8, right: 8, padding: '4px 10px', background: 'rgba(0,0,0,0.5)', borderRadius: 100, fontSize: '0.7rem', color: '#fff' }}>2:14:33</div>
          </div>
          {/* Transcript lines */}
          <div style={{ background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['[00:01] Good morning everyone...', '[00:15] Today we will discuss...', '[00:42] The Q3 targets are...'].map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', marginTop: 5, flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{line}</span>
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', top: 16, right: -18, width: 48, height: 48, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(59,130,246,0.4)' }}>
            <Brain size={22} color="#fff" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', borderRadius: 100, fontWeight: 700, fontSize: '0.85rem', marginBottom: 24, border: '1px solid rgba(59,130,246,0.2)' }}>
          <Brain size={14} /> AI Whisper Transcription
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>{data.h1 || 'Transcribe Zoom Meeting to Text'}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{data.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
          {['AI-Powered Whisper', 'Near-Human Accuracy', '100% Local Processing'].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'var(--bg-main)', borderRadius: 100, border: '1px solid var(--border-color)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
              <CheckCircle2 size={12} color="#3b82f6" /> {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const ZoomTranscribeHowTo: React.FC<{ data: SD }> = ({ data }) => {
  const items = data.dynamicSection?.items || [];
  return (
    <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, textAlign: 'center', marginBottom: 64, color: 'var(--text-main)', lineHeight: 1.2 }}>{data.dynamicSection?.heading || 'Maximize Meeting Productivity'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {items.map((item: any, i: number) => (
            <div key={i} style={{ padding: '36px 32px', background: 'var(--bg-card)', borderRadius: 28, border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }} className="hover-lift">
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                {i === 0 ? <FileText size={22} color="#3b82f6" /> : i === 1 ? <Search size={22} color="#3b82f6" /> : <Brain size={22} color="#3b82f6" />}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 10, color: 'var(--text-main)' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ZoomTranscribeBenefits: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 60px rgba(59,130,246,0.25)', position: 'relative' }}>
          <FileText size={96} color="rgba(255,255,255,0.9)" />
          <div style={{ position: 'absolute', bottom: 16, right: 16, width: 64, height: 64, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Search size={28} color="#3b82f6" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 420px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>Never Take Manual Meeting Notes Again</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>Stop pausing recordings to jot things down. Get a full, searchable transcript of your entire Zoom meeting automatically, then feed it into ChatGPT for an instant summary.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {['Generate meeting minutes instantly', 'Searchable text archives', 'Feed into AI for summaries'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#3b82f6" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const ZoomTranscribePrivacy: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-main)' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: 40, padding: '72px 48px', border: '1px solid var(--border-color)' }}>
        <div style={{ width: 72, height: 72, margin: '0 auto 24px', borderRadius: 22, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={36} color="#fff" />
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>Confidential Meetings Stay Confidential</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>Unlike cloud transcription services (Otter.ai, etc.), our Whisper AI model runs entirely on your CPU. Your boardroom conversations, medical consultations, and legal calls are never transmitted to our servers.</p>
      </div>
    </div>
  </section>
);

export const ZoomTranscribePerformance: React.FC<{ data: SD }> = ({ data }) => (
  <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 64, alignItems: 'center' }}>
      <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 240, height: 240, borderRadius: '50%', background: 'var(--bg-main)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Zap size={90} color="rgba(59,130,246,0.1)" />
          <div style={{ position: 'absolute', bottom: 24, right: 24, width: 70, height: 70, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={30} color="#fff" />
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 440px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 20, color: 'var(--text-main)', lineHeight: 1.2 }}>Upload the Video Directly — No Pre-Processing</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28 }}>Skip the audio extraction step. Just drop your Zoom MP4 recording and our tool automatically extracts the audio and runs it through Whisper AI in one seamless pipeline.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['Direct video-to-text pipeline', 'Near-human accuracy with Whisper', 'No timeout for long recordings'].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
              <CheckCircle2 size={16} color="#3b82f6" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
