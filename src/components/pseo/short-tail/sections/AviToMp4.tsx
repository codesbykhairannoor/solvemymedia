import React from 'react';
import { Film, MonitorPlay, History, Disc, ArrowUpRight, CheckSquare } from 'lucide-react';

export const AviToMp4Hero: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section style={{ 
      background: 'linear-gradient(to right, #1f2937, #111827)', 
      padding: '120px 24px 80px', 
      position: 'relative',
      overflow: 'hidden',
      color: 'white'
    }}>
      {/* Retro VHS scanline effect overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)', pointerEvents: 'none', opacity: 0.5 }} />
      
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(234, 179, 8, 0.1)', padding: '6px 20px', borderRadius: 6, marginBottom: 24, border: '1px solid rgba(234, 179, 8, 0.2)' }}>
          <History size={16} color="#eab308" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#fef08a' }}>Legacy Format</span>
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
  return (
    <section style={{ padding: '120px 24px', background: '#f3f4f6' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#111827', lineHeight: 1.1, marginBottom: 20 }}>
            {data.bespokeData?.benefitsTitle || "Modernize Your Legacy Media"}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', maxWidth: 700, margin: '0 auto' }}>
            {data.bespokeData?.benefitsDesc || "Bring your older digital camera or camcorder AVI files into the modern era. Convert to highly compressed MP4s that play anywhere."}
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
  return (
    <section style={{ padding: '80px 24px', background: 'white' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <Disc size={48} color="#eab308" style={{ marginBottom: 24 }} />
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: 24, color: '#111827' }}>
          {data.features?.[0]?.title || "Massive Space Savings"}
        </h2>
        <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#4b5563', padding: '24px', background: '#fef9c3', borderRadius: 16 }}>
          {data.features?.[0]?.desc || "MP4 (H.264) compression is vastly superior to older AVI codecs. You can often reduce the file size of your old home videos by 70-80% without noticing any loss in quality."}
        </p>
      </div>
    </section>
  );
};

export const AviToMp4Privacy: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section style={{ padding: '100px 24px', background: '#111827', color: 'white', textAlign: 'center' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: 24, color: '#f8fafc' }}>
          {data.features?.[1]?.title || "Private Archives"}
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af', lineHeight: 1.7 }}>
          {data.features?.[1]?.desc || "Your old family videos from 2005 are private. Because our tool runs offline in your browser, those memories are never uploaded to our servers. Transcode them securely on your own device."}
        </p>
      </div>
    </section>
  );
};
