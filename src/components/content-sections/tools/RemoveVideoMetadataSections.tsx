// @ts-nocheck
import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, MapPin, EyeOff, Lock, CheckCircle2, ChevronDown, Zap, ServerOff, Video, AlertTriangle, Crosshair, Radio, Smartphone, Compass } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

/**
 * SECTION 1: Tactical Radar HUD & Live Threat Neutralizer
 * (Replaces redundant hero with an interactive tactical security visualizer)
 */
export const RemoveVideoRadarHudSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="seo-section tactical-radar-hud" style={{ maxWidth: 1200, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ background: '#0b1120', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 28, padding: '36px 32px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
        {/* Radar Ambient Glow */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* Left: Circular Tactical Radar Sweep Visual */}
          <div style={{ flex: '1 1 340px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, #0f172a 0%, #070b14 100%)', border: '2px solid rgba(244,63,94,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(244,63,94,0.15)' }}>
              {/* Concentric Radar Rings */}
              <div style={{ position: 'absolute', inset: 40, borderRadius: '50%', border: '1px dashed rgba(244,63,94,0.2)' }} />
              <div style={{ position: 'absolute', inset: 80, borderRadius: '50%', border: '1px solid rgba(244,63,94,0.25)' }} />
              <div style={{ position: 'absolute', inset: 120, borderRadius: '50%', border: '1px dashed rgba(244,63,94,0.3)' }} />

              {/* Crosshair Axes */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: 'rgba(244,63,94,0.25)' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: 'rgba(244,63,94,0.25)' }} />

              {/* Radar Target Points */}
              <div style={{ position: 'absolute', top: 60, left: 75, display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 10px #ef4444' }} />
                <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#f87171', background: 'rgba(0,0,0,0.6)', padding: '1px 4px', borderRadius: 3 }}>GPS: 37.77N</span>
              </div>
              <div style={{ position: 'absolute', bottom: 70, right: 65, display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 10px #ef4444' }} />
                <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#f87171', background: 'rgba(0,0,0,0.6)', padding: '1px 4px', borderRadius: 3 }}>IMEI_LEAK</span>
              </div>

              {/* Center Shield Core */}
              <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(244,63,94,0.15)', border: '2px solid #f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f43f5e' }}>
                <Crosshair size={24} />
              </div>
            </div>
          </div>

          {/* Right: Security Status & Threat Countermeasures */}
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 100, fontSize: '0.78rem', fontWeight: 800, color: '#f43f5e', marginBottom: 14 }}>
              <ShieldAlert size={14} />
              <span>RADAR SURVEILLANCE COUNTERMEASURE</span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#f8fafc', margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
              Eliminate Geolocation & Camera Identifiers
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              Smartphone and drone videos embed high-precision GPS coordinates, camera serial numbers, and exact timestamps inside hidden container atoms (<code>©xyz</code>, <code>udta</code>, and <code>XMP</code>). SolveMyMedia neutralizes them in browser RAM.
            </p>

            {/* Tactical Checklist */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
              <div style={{ background: '#070b14', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>GPS Coordinates Wiped</span>
              </div>
              <div style={{ background: '#070b14', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>Camera IMEI & Model Cleared</span>
              </div>
              <div style={{ background: '#070b14', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>Creation Timestamps Purged</span>
              </div>
              <div style={{ background: '#070b14', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>Lossless Stream Demux Copy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * SECTION 2: Alternating Security Threat Vectors
 * (Completely different alternating visual/text layout)
 */
export const RemoveVideoThreatVectorsSection: React.FC = () => {
  const vectors = [
    {
      title: 'Smartphone Geotagging & Home Location Leaks',
      desc: 'Smartphones record exact latitude, longitude, and elevation when recording clips. Uploading untreated footage to chat apps, forums, or cloud shares can inadvertently reveal your home address and daily routines.',
      tag: 'CRITICAL LEAK',
      icon: MapPin,
      badgeColor: '#ef4444'
    },
    {
      title: 'Drone Flight Logs & Altitude Telemetry',
      desc: 'DJI, Autel, and FPV drones embed flight path coordinates, takeoff locations, and pilot controller serials directly inside video atom headers. Our scrubber strips telemetry while keeping 4K 60fps video frames 100% intact.',
      tag: 'DRONE EXIF',
      icon: Compass,
      badgeColor: '#fbbf24'
    },
    {
      title: 'Journalist & Content Creator Privacy',
      desc: 'Investigative journalists and anonymous sources need bulletproof metadata scrubbing. By processing files 100% inside client-side WebAssembly, not a single video frame or byte of metadata ever touches a cloud server.',
      tag: 'SOURCE PROTECTION',
      icon: ShieldCheck,
      badgeColor: '#22c55e'
    }
  ];

  return (
    <section className="seo-section threat-vectors" style={{ maxWidth: 1100, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 900, color: 'var(--text-main)', marginBottom: 10 }}>
          Hidden Video Vulnerability Vectors
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Understanding what camera metadata exposes before you share videos publicly.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {vectors.map((vec, i) => {
          const IconComp = vec.icon;
          return (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ width: 54, height: 54, borderRadius: 16, background: `${vec.badgeColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: vec.badgeColor, flexShrink: 0 }}>
                <IconComp size={26} />
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    {vec.title}
                  </h4>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: 4, background: `${vec.badgeColor}18`, color: vec.badgeColor }}>
                    {vec.tag}
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                  {vec.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

/**
 * SECTION 3: Threat Elimination Metric Counters
 */
export const RemoveVideoPerformanceMetricsSection: React.FC = () => {
  return (
    <section className="seo-section performance-metrics" style={{ maxWidth: 1100, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', fontWeight: 900, color: '#f43f5e', marginBottom: 8, letterSpacing: '-0.03em' }}>
            0 Bytes
          </div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>
            Zero Server Uploads
          </h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            Files are scrubbed locally in your browser memory via WebAssembly. Complete privacy guaranteed.
          </p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', fontWeight: 900, color: '#22c55e', marginBottom: 8, letterSpacing: '-0.03em' }}>
            0 dB / 0 Loss
          </div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>
            Lossless Stream Copy
          </h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            Executes FFmpeg <code>-c copy</code> to strip tags instantly without re-encoding video frames.
          </p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', fontWeight: 900, color: '#38bdf8', marginBottom: 8, letterSpacing: '-0.03em' }}>
            100%
          </div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>
            GPS & EXIF Cleared
          </h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            Neutralizes QuickTime <code>udta</code>, <code>ilst</code>, and <code>XMP</code> tracking packets cleanly.
          </p>
        </div>
      </div>
    </section>
  );
};

/**
 * SECTION 4: Technical Comparison Table
 */
export const RemoveVideoComparisonTableSection: React.FC = () => {
  return (
    <section className="seo-section comparison-table" style={{ maxWidth: 1000, margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
          Video Privacy Inspection Matrix
        </h3>
      </div>

      <div style={{ overflowX: 'auto', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-app)' }}>
              <th style={{ padding: '16px 20px', color: 'var(--text-main)', fontWeight: 800 }}>Metadata Vector</th>
              <th style={{ padding: '16px 20px', color: '#ef4444', fontWeight: 800 }}>Unsanitized Raw Video</th>
              <th style={{ padding: '16px 20px', color: '#22c55e', fontWeight: 800 }}>SolveMyMedia Scrubbed Output</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.85rem' }}>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>GPS Geolocation (©xyz, xyz )</td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>Exact lat/long coordinate pinpoint</td>
              <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>✓ 100% Wiped Clean</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>Device Hardware Serial & Model</td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>Camera serial, phone model (A3084)</td>
              <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>✓ Zero hardware fingerprints</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>Exact Recording Timestamp</td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>Creation date & subsecond clock</td>
              <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>✓ Neutralized to null</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>C2PA / AI Watermark Manifests</td>
              <td style={{ padding: '14px 20px', color: '#ef4444' }}>Embedded AI provenance metadata</td>
              <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>✓ Stripped from container</td>
            </tr>
            <tr>
              <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>Video Visual Quality & Framerate</td>
              <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>Original 4K / 1080p stream</td>
              <td style={{ padding: '14px 20px', color: '#22c55e', fontWeight: 700 }}>✓ 100% Untouched (-c copy)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
