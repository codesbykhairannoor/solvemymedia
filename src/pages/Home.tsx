import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Music, Scissors, RefreshCw, Bot, MonitorPlay, ImagePlay, Gauge, Crop, VolumeX, Stamp, AudioLines } from 'lucide-react';
import { useSeoMeta } from '../hooks/useSeoMeta';
import { smartHighlight } from '../utils/textFormatting';

export const Home: React.FC = () => {
  
  useSeoMeta('Media Compressor | Next-Gen Browser Media Tools', 'Next-Gen Browser Media Tools');

  return (
    <div style={{ padding: '0 24px', maxWidth: 1000, margin: '64px auto 0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 60, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15, fontFamily: 'Outfit, sans-serif' }}>
        {smartHighlight('Next-Gen Browser Media Tools')}
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        
        <Link to={`/compress-video`} style={{ textDecoration: 'none' }}>
          <div className="glass-panel tool-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: 12, borderRadius: 'var(--radius-md)' }}>
                <Video size={32} className="text-brand-primary" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Compress Video</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Reduce video file size without losing significant quality. Uses blazing fast GPU acceleration.</p>
          </div>
        </Link>

        <Link to={`/compress-audio`} style={{ textDecoration: 'none' }}>
          <div className="glass-panel tool-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: 12, borderRadius: 'var(--radius-md)' }}>
                <Music size={32} color="var(--text-accent)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Compress Audio</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Shrink MP3, WAV, and other audio files to save space while maintaining clarity.</p>
          </div>
        </Link>

        <Link to={`/convert-video`} style={{ textDecoration: 'none' }}>
          <div className="glass-panel tool-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: 12, borderRadius: 'var(--radius-md)' }}>
                <RefreshCw size={32} className="text-brand-primary" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Convert Video</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Change video formats easily. Support for MP4, WebM, MKV, AVI, and more.</p>
          </div>
        </Link>

        <Link to={`/convert-audio`} style={{ textDecoration: 'none' }}>
          <div className="glass-panel tool-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: 12, borderRadius: 'var(--radius-md)' }}>
                <Scissors size={32} color="var(--text-accent)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Convert Audio</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Transform audio formats between MP3, WAV, AAC, OGG in high fidelity.</p>
          </div>
        </Link>

        <Link to={`/video-to-audio`} style={{ textDecoration: 'none' }}>
          <div className="glass-panel tool-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: 12, borderRadius: 'var(--radius-md)' }}>
                <Music size={32} color="var(--error-color)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Video to Audio</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Extract the audio track from any video file and save it as MP3, WAV, AAC, or OGG.</p>
          </div>
        </Link>

        <Link to={`/transcribe`} style={{ textDecoration: 'none' }}>
          <div className="glass-panel tool-card" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(168, 85, 247, 0.15))', borderColor: 'rgba(168, 85, 247, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ background: 'rgba(168, 85, 247, 0.2)', padding: 12, borderRadius: 'var(--radius-md)' }}>
                <Bot size={32} className="text-brand-primary" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>AI Media to Text</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Automatically transcribe audio or video to text using Whisper AI right in your browser. Fast and 100% private.</p>
          </div>
        </Link>

        <Link to={`/recorder`} style={{ textDecoration: 'none' }}>
          <div className="glass-panel tool-card" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.15))', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: 12, borderRadius: 'var(--radius-md)' }}>
                <MonitorPlay size={32} color="var(--error-color)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Studio Recorder</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Record your screen, webcam, and microphone natively. Includes blazing fast video trimmer.</p>
          </div>
        </Link>

        <Link to={`/create-gif`} style={{ textDecoration: 'none' }}>
          <div className="glass-panel tool-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: 12, borderRadius: 'var(--radius-md)' }}>
                <ImagePlay size={32} color="#ec4899" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Video to GIF</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Convert any video into an animated GIF. Perfect for memes, blogs, or social media sharing.</p>
          </div>
        </Link>

        <Link to={`/video-speed`} style={{ textDecoration: 'none' }}>
          <div className="glass-panel tool-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: 12, borderRadius: 'var(--radius-md)' }}>
                <Gauge size={32} color="#eab308" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Video Speed</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Speed up or slow down videos smoothly without distorting the pitch of the audio.</p>
          </div>
        </Link>

        <Link to={`/crop-video`} style={{ textDecoration: 'none' }}>
          <div className="glass-panel tool-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: 12, borderRadius: 'var(--radius-md)' }}>
                <Crop size={32} color="#22c55e" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Crop Video</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Center-crop your video to popular aspect ratios like 1:1, 16:9, or 9:16 for TikTok and Reels.</p>
          </div>
        </Link>

        <Link to={`/mute-video`} style={{ textDecoration: 'none' }}>
          <div className="glass-panel tool-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ background: 'rgba(100, 116, 139, 0.1)', padding: 12, borderRadius: 'var(--radius-md)' }}>
                <VolumeX size={32} color="#64748b" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Mute Video</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Instantly strip all audio tracks from your video in less than a second without quality loss.</p>
          </div>
        </Link>

        <Link to={`/watermark-video`} style={{ textDecoration: 'none' }}>
          <div className="glass-panel tool-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: 12, borderRadius: 'var(--radius-md)' }}>
                <Stamp size={32} color="#3b82f6" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Add Watermark</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Overlay your own transparent logo (PNG) onto any video to protect your brand.</p>
          </div>
        </Link>

        <Link to={`/merge-audio`} style={{ textDecoration: 'none' }}>
          <div className="glass-panel tool-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: 12, borderRadius: 'var(--radius-md)' }}>
                <AudioLines size={32} color="#f97316" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Merge Audio</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Combine multiple audio tracks sequentially into one single long continuous track.</p>
          </div>
        </Link>

      </div>
    </div>
  );
};
