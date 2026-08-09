import React, { useState, useRef } from 'react';
import { Scissors, Download, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useFFmpeg } from '../hooks/useFFmpeg';

interface VideoTrimmerProps {
  videoUrl: string;
  onDiscard: () => void;
}

export const VideoTrimmer: React.FC<VideoTrimmerProps> = ({ videoUrl, onDiscard }) => {
  const { ready, processing, trimMedia, fixWebmMetadata } = useFFmpeg();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [finalVideoUrl, setFinalVideoUrl] = useState<string | null>(null);
  const [fixedVideoUrl, setFixedVideoUrl] = useState<string | null>(null);
  const [isFixing, setIsFixing] = useState(true);

  React.useEffect(() => {
    if (ready && videoUrl && !fixedVideoUrl) {
      const fix = async () => {
        setIsFixing(true);
        const url = await fixWebmMetadata(videoUrl);
        setFixedVideoUrl(url || videoUrl);
        setIsFixing(false);
      };
      fix();
    }
  }, [ready, videoUrl, fixedVideoUrl, fixWebmMetadata]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const d = videoRef.current.duration;
      setDuration(d);
      setEndTime(d);
    }
  };

  const handleTrim = async () => {
    if (startTime === 0 && endTime === duration) {
      // No trimming needed
      setFinalVideoUrl(fixedVideoUrl || videoUrl);
      return;
    }
    
    const resultUrl = await trimMedia(fixedVideoUrl || videoUrl, startTime, endTime);
    if (resultUrl) {
      setFinalVideoUrl(resultUrl);
    }
  };

  const downloadVideo = () => {
    const a = document.createElement('a');
    a.href = finalVideoUrl || videoUrl;
    a.download = `recording_${new Date().getTime()}.webm`;
    a.click();
  };

  if (finalVideoUrl) {
    return (
      <div className="glass-panel" style={{ padding: 32, textAlign: 'center' }}>
        <CheckCircle2 size={64} color="var(--success-color)" style={{ marginBottom: 16, margin: '0 auto' }} />
        <h3 style={{ fontSize: '1.5rem', marginBottom: 16 }}>Your video is ready!</h3>
        <video 
          src={finalVideoUrl} 
          controls 
          style={{ width: '100%', maxHeight: 400, borderRadius: 'var(--radius-md)', marginBottom: 24, background: '#000' }} 
        />
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button onClick={downloadVideo} className="btn-primary" style={{ padding: '12px 32px' }}>
            <Download size={20} /> Download WebM
          </button>
          <button onClick={onDiscard} className="tab-btn">
            Record Another
          </button>
        </div>
      </div>
    );
  }

  const getPercent = (value: number) => {
    if (!duration) return 0;
    return Math.round((value / duration) * 100);
  };

  if (isFixing) {
    return (
      <div className="glass-panel" style={{ padding: 48, textAlign: 'center' }}>
        <RefreshCw size={48} color="var(--brand-primary)" style={{ animation: 'spin 1s linear infinite', marginBottom: 16, margin: '0 auto' }} />
        <h3 style={{ fontSize: '1.25rem' }}>Fixing Video Metadata...</h3>
        <p style={{ color: 'var(--text-muted)' }}>Preparing video for high-speed trimming</p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Scissors size={20} className="text-brand-primary" /> Trim Recording
        </h3>
        {!ready && <span style={{ color: 'var(--warning-color)', fontSize: '0.9rem' }}>Loading Trimmer Engine...</span>}
      </div>

      <video 
        ref={videoRef}
        src={fixedVideoUrl || videoUrl}
        controls
        onLoadedMetadata={handleLoadedMetadata}
        style={{ width: '100%', maxHeight: 400, borderRadius: 'var(--radius-md)', background: '#000', marginBottom: 24 }}
      />

      <div style={{ background: 'var(--bg-input)', padding: 24, borderRadius: 'var(--radius-md)', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontWeight: 600 }}>
          <span>{startTime.toFixed(1)}s</span>
          <span style={{ color: 'var(--brand-primary)' }}>Selected: {(endTime - startTime).toFixed(1)}s</span>
          <span>{endTime.toFixed(1)}s</span>
        </div>
        
        {/* Dual Range Slider Container */}
        <div style={{ position: 'relative', height: 40, display: 'flex', alignItems: 'center' }}>
          {/* Background Track */}
          <div style={{ position: 'absolute', width: '100%', height: 8, background: 'var(--border-color)', borderRadius: 4, zIndex: 1 }} />
          
          {/* Active Highlight Track */}
          <div 
            style={{ 
              position: 'absolute', 
              height: 8, 
              background: 'var(--brand-primary)', 
              borderRadius: 4, 
              zIndex: 2,
              left: `${getPercent(startTime)}%`,
              width: `${getPercent(endTime) - getPercent(startTime)}%`
            }} 
          />

          {/* Start Handle */}
          <input 
            type="range" 
            min={0} max={duration || 100} step={0.1} 
            value={startTime}
            onChange={(e) => {
              const val = Math.min(parseFloat(e.target.value), endTime - 0.5);
              setStartTime(val);
              if (videoRef.current) videoRef.current.currentTime = val;
            }}
            style={{ 
              position: 'absolute', width: '100%', zIndex: 3, opacity: 0, cursor: 'pointer', pointerEvents: 'none' 
            }}
            className="dual-slider"
          />
          <div 
            style={{
              position: 'absolute', width: 20, height: 20, background: 'var(--text-main)', borderRadius: '50%',
              left: `calc(${getPercent(startTime)}% - 10px)`, zIndex: 4, pointerEvents: 'none',
              boxShadow: '0 0 5px rgba(0,0,0,0.5)', border: '3px solid var(--brand-primary)'
            }}
          />

          {/* End Handle */}
          <input 
            type="range" 
            min={0} max={duration || 100} step={0.1} 
            value={endTime}
            onChange={(e) => {
              const val = Math.max(parseFloat(e.target.value), startTime + 0.5);
              setEndTime(val);
              if (videoRef.current) videoRef.current.currentTime = val;
            }}
            style={{ 
              position: 'absolute', width: '100%', zIndex: 5, opacity: 0, cursor: 'pointer', pointerEvents: 'none' 
            }}
            className="dual-slider"
          />
          <div 
            style={{
              position: 'absolute', width: 20, height: 20, background: 'var(--text-main)', borderRadius: '50%',
              left: `calc(${getPercent(endTime)}% - 10px)`, zIndex: 6, pointerEvents: 'none',
              boxShadow: '0 0 5px rgba(0,0,0,0.5)', border: '3px solid var(--brand-primary)'
            }}
          />
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 16 }}>Drag the handles to trim your video</p>
      </div>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
        <button onClick={onDiscard} className="tab-btn" disabled={processing}>
          Discard
        </button>
        <button 
          onClick={handleTrim} 
          className="btn-primary" 
          disabled={processing || !ready}
          style={{ opacity: processing || !ready ? 0.5 : 1 }}
        >
          {processing ? (
            <><RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</>
          ) : (
            <><CheckCircle2 size={18} /> Save Video</>
          )}
        </button>
      </div>
    </div>
  );
};
