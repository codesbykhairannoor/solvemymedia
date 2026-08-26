import React from 'react';
import { FileText, Mic, FileSignature, Languages, Clock, ShieldCheck, Zap } from 'lucide-react';

export const TranscribeMp3Hero: React.FC<{ data: any }> = ({ data }) => {
  const { h1, description, bespokeData } = data;
  const safeData = bespokeData || {};

  return (
    <section style={{ 
      padding: '120px 24px', 
      background: '#f9f9fb', // Off-white paper feel
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;700;900&display=swap');
      `}</style>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 24px', background: 'white', borderRadius: 30, color: '#4b5563', fontWeight: 600, marginBottom: 40, border: '1px solid #e5e7eb', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <FileText size={16} color="#3b82f6" /> AI-POWERED TRANSCRIPTION
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
          fontWeight: 900, 
          color: '#111827',
          lineHeight: 1.1,
          marginBottom: 32,
          fontFamily: '"Merriweather", serif'
        }}>
          {h1 || "Turn MP3 Audio Into Text, Instantly."}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#4b5563', 
          lineHeight: 1.8, 
          maxWidth: 700,
          margin: '0 auto 48px'
        }}>
          {description || "Stop typing out interviews manually. Upload your MP3 podcasts, lectures, or voice memos and let our AI generate highly accurate text documents in seconds."}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {safeData.heroTags?.map((tag: string, i: number) => (
            <div key={i} style={{ 
              padding: '8px 20px', 
              background: '#f3f4f6', 
              borderRadius: 8, 
              color: '#374151', 
              fontWeight: 500,
              fontSize: '0.9rem'
            }}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TranscribeMp3Benefits: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, color: '#111827', textAlign: 'center', marginBottom: 64, fontFamily: '"Merriweather", serif' }}>
          {safeData.benefitsTitle || "The Journalist's Best Friend"}
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
          {[
            { icon: <Clock />, title: "Save Hours of Work", desc: safeData.benefitsItems?.[0] || "Transcribing a 1-hour interview takes 4 hours manually. Our AI does it in 2 minutes." },
            { icon: <Languages />, title: "Multi-Language Support", desc: safeData.benefitsItems?.[1] || "Automatically recognizes English, Spanish, French, Indonesian, and 50+ other languages." },
            { icon: <FileSignature />, title: "Export to Doc", desc: safeData.benefitsItems?.[2] || "Copy the text directly or export it as a clean TXT/DOCX file with timestamps." }
          ].map((item, i) => (
            <div key={i} style={{ padding: 40, background: '#f9f9fb', borderRadius: 24, border: '1px solid #f3f4f6' }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827', marginBottom: 16 }}>{item.title}</h3>
              <p style={{ color: '#4b5563', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TranscribeMp3Privacy: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '80px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 250px', display: 'flex', justifyContent: 'center' }}>
          <ShieldCheck size={80} color="#10b981" />
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: 16, fontFamily: '"Merriweather", serif' }}>
            {safeData.privacyTitle || "Confidential Audio Stays Private"}
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: 1.8 }}>
            {safeData.privacyDesc || "Journalistic sources and business meetings require strict confidentiality. We run state-of-the-art speech recognition directly in your browser. Your MP3 file is never sent to our servers."}
          </p>
        </div>
      </div>
    </section>
  );
};

export const TranscribeMp3Performance: React.FC<{ data: any }> = ({ data }) => {
  const safeData = data.bespokeData || {};
  return (
    <section style={{ padding: '100px 24px', background: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <Zap size={48} color="#f59e0b" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#111827', marginBottom: 24, fontFamily: '"Merriweather", serif' }}>
          {safeData.performanceTitle || "Powered by Web Speech API"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#4b5563', maxWidth: 800, margin: '0 auto 48px', lineHeight: 1.7 }}>
          {safeData.performanceDesc || "We harness the built-in AI capabilities of modern browsers like Chrome and Edge to transcribe your audio in real-time, completely free."}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {safeData.performanceItems?.map((item: string, i: number) => (
             <div key={i} style={{ padding: '16px 32px', background: '#fffbeb', color: '#b45309', borderRadius: 30, fontWeight: 700, fontSize: '1.1rem' }}>
               {item}
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};
