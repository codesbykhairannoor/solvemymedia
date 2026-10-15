// @ts-nocheck
import React from 'react';
import { 
  Radar, 
  ShieldAlert, 
  ShieldCheck, 
  MapPin, 
  Camera, 
  Clock, 
  Sparkles, 
  Lock, 
  Layers, 
  CheckCircle2, 
  Zap, 
  ServerOff,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

/**
 * SECTION 1: Tactical Radar HUD & Threat Visualizer
 */
export const RemoveVideoRadarHudSection: React.FC = () => {
  const { t } = useLanguage();

  const threats = [
    {
      icon: <MapPin size={22} color="#ef4444" />,
      title: t('rmvThreatGpsTitle') || 'GPS Geotag Coordinates',
      desc: t('rmvThreatGpsDesc') || 'Exact latitude, longitude, and altitude atoms recorded by camera GPS sensors.'
    },
    {
      icon: <Camera size={22} color="#3b82f6" />,
      title: t('rmvThreatDevTitle') || 'Camera Hardware & Serial',
      desc: t('rmvThreatDevDesc') || 'iPhone model (e.g. A3084), lens serial, and camera hardware firmware.'
    },
    {
      icon: <Clock size={22} color="#a855f7" />,
      title: t('rmvThreatTimeTitle') || 'Subsecond Timestamps',
      desc: t('rmvThreatTimeDesc') || 'Creation date, modification clock, and precise timecode of recording.'
    }
  ];

  return (
    <section className="seo-section video-radar-hud" style={{ maxWidth: 1200, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 100, color: '#ef4444', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: 16 }}>
          <Radar size={15} />
          <span>{t('rmvRadarBadge') || 'THREAT RADAR: REAL-TIME SCANNER'}</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 16, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {t('rmvRadarTitle') || 'Hidden Forensic Footprints Inside Video Files'}
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 760, margin: '0 auto', lineHeight: 1.7 }}>
          {t('rmvRadarSubtitle') || 'Smartphones and video cameras embed intrusive tracking metadata inside MP4, MOV, and MKV files. Our client-side scanner pinpoints and eliminates threats instantly.'}
        </p>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 28, padding: '36px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: 36, boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
        {/* Radar Scanner Graphic */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(239,68,68,0.05) 0%, var(--bg-app) 70%)', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {/* Concentric Radar Rings */}
            <div style={{ position: 'absolute', width: 160, height: 160, borderRadius: '50%', border: '1px dashed var(--border-color)' }} />
            <div style={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', border: '1px solid var(--border-color)' }} />
            <div style={{ position: 'absolute', width: 40, height: 40, borderRadius: '50%', background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444' }} />
            
            {/* Crosshairs */}
            <div style={{ position: 'absolute', width: '100%', height: 1, background: 'var(--border-color)' }} />
            <div style={{ position: 'absolute', height: '100%', width: 1, background: 'var(--border-color)' }} />
            
            {/* Rotating Radar Sweep Needle */}
            <div style={{ position: 'absolute', width: '50%', height: 2, background: 'linear-gradient(90deg, transparent, #ef4444)', top: '50%', left: '50%', transformOrigin: '0% 0%', animation: 'radarSweep 4s linear infinite' }} />
          </div>
          <style>{`@keyframes radarSweep { 100% { transform: rotate(360deg); } }`}</style>
          <span style={{ fontSize: '0.78rem', color: '#ef4444', fontWeight: 700, fontFamily: 'monospace' }}>
            {t('rmvRadarIdentified') || '3 TRACKING ATOMS IDENTIFIED'}
          </span>
        </div>

        {/* Threat Cards */}
        <div style={{ flex: '1 1 360px', maxWidth: 540, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {threats.map((th, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 18, background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 16 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {th.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                  {th.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                  {th.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * SECTION 2: Alternating Security Threat Vectors
 */
export const RemoveVideoThreatVectorsSection: React.FC = () => {
  const { t } = useLanguage();

  const vectors = [
    {
      num: '01',
      title: t('rmvVector1Title') || 'Home & Workplace Location Tracking',
      desc: t('rmvVector1Desc') || 'Smartphones automatically tag videos with GPS coordinates accurate within 3 meters. Sharing unscrubbed videos exposes your home, workplace, or travel routes.'
    },
    {
      num: '02',
      title: t('rmvVector2Title') || 'Hardware Fingerprinting & Device Serials',
      desc: t('rmvVector2Desc') || 'Camera make, lens model, serial numbers, and firmware versions are baked into container atoms, uniquely identifying your physical camera device across platforms.'
    },
    {
      num: '03',
      title: t('rmvVector3Title') || 'Temporal & Digital Timeline Profiling',
      desc: t('rmvVector3Desc') || 'Creation timestamps and editing history reveal your sleep patterns, work schedule, and internal project file naming schemes.'
    }
  ];

  return (
    <section className="seo-section threat-vectors" style={{ maxWidth: 1000, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--brand-glow)', border: '1px solid var(--brand-primary)', borderRadius: 100, color: 'var(--brand-primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: 16 }}>
          <ShieldAlert size={15} />
          <span>{t('rmvVectorsBadge') || 'SECURITY THREAT VECTORS'}</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: 16, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
          {t('rmvVectorsTitle') || 'Why Scrubbing Video Metadata is Essential'}
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 760, margin: '0 auto', lineHeight: 1.7 }}>
          {t('rmvVectorsSubtitle') || 'Avoid privacy leaks before posting videos to social media, messaging apps, or journalism outlets.'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {vectors.map((vec, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 24, padding: 32, background: 'var(--bg-card)', borderRadius: 24, border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: 'var(--brand-gradient)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>
              {vec.num}
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                {vec.title}
              </h3>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                {vec.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * SECTION 3: Performance Metric Counters
 */
export const RemoveVideoPerformanceMetricsSection: React.FC = () => {
  const { t } = useLanguage();

  const metrics = [
    {
      val: t('rmvMetric1Val') || '0 Bytes',
      title: t('rmvMetric1Title') || 'Cloud Uploads',
      desc: t('rmvMetric1Desc') || 'Files never leave your browser RAM. 100% GDPR & privacy compliant.'
    },
    {
      val: t('rmvMetric2Val') || '0.00 dB',
      title: t('rmvMetric2Title') || 'Quality Delta',
      desc: t('rmvMetric2Desc') || 'Lossless stream copy (-c copy). Zero transcoding, zero re-compression.'
    },
    {
      val: t('rmvMetric3Val') || '100%',
      title: t('rmvMetric3Title') || 'GPS & EXIF Cleared',
      desc: t('rmvMetric3Desc') || 'Neutralizes QuickTime udta, ilst, and XMP tracking packets cleanly.'
    }
  ];

  return (
    <section className="seo-section metric-counters" style={{ maxWidth: 1100, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 24, padding: '36px 28px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.2rem)', fontWeight: 900, color: 'var(--brand-primary)', marginBottom: 8, letterSpacing: '-0.03em' }}>
              {m.val}
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 8 }}>
              {m.title}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              {m.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * SECTION 4: Technical Comparison Table
 */
export const RemoveVideoComparisonTableSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section comparison-table" style={{ maxWidth: 1000, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.2, margin: 0 }}>
          {t('rmvMatrixTitle') || 'Video Privacy Inspection Matrix'}
        </h2>
      </div>

      <div style={{ overflowX: 'auto', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-app)' }}>
              <th style={{ padding: '16px 20px', color: 'var(--text-main)', fontWeight: 800 }}>
                {t('rmvMatrixColVector') || 'Metadata Vector'}
              </th>
              <th style={{ padding: '16px 20px', color: '#ef4444', fontWeight: 800 }}>
                {t('rmvMatrixColRaw') || 'Unsanitized Raw Video'}
              </th>
              <th style={{ padding: '16px 20px', color: '#10b981', fontWeight: 800 }}>
                {t('rmvMatrixColClean') || 'SolveMyMedia Scrubbed Output'}
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.88rem' }}>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('rmvMatrixRow1Vector') || 'GPS Geolocation (©xyz, xyz )'}
              </td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>
                {t('rmvMatrixRow1Raw') || 'Exact lat/long coordinate pinpoint'}
              </td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                {t('rmvMatrixRow1Clean') || '✓ 100% Wiped Clean'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('rmvMatrixRow2Vector') || 'Device Hardware Serial & Model'}
              </td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>
                {t('rmvMatrixRow2Raw') || 'Camera serial, phone model (A3084)'}
              </td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                {t('rmvMatrixRow2Clean') || '✓ Zero hardware fingerprints'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('rmvMatrixRow3Vector') || 'Exact Recording Timestamp'}
              </td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>
                {t('rmvMatrixRow3Raw') || 'Creation date & subsecond clock'}
              </td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                {t('rmvMatrixRow3Clean') || '✓ Neutralized to null'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('rmvMatrixRow4Vector') || 'C2PA / AI Watermark Manifests'}
              </td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>
                {t('rmvMatrixRow4Raw') || 'Embedded AI provenance metadata'}
              </td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                {t('rmvMatrixRow4Clean') || '✓ Stripped from container'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                {t('rmvMatrixRow5Vector') || 'Video Visual Quality & Framerate'}
              </td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                {t('rmvMatrixRow5Raw') || 'Original 4K / 1080p stream'}
              </td>
              <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 700 }}>
                {t('rmvMatrixRow5Clean') || '✓ 100% Untouched (-c copy)'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
