import { StudioRecorderHeroSection, StudioRecorderHowToSection, StudioRecorderPerformanceSection, StudioRecorderPrivacySection, StudioRecorderFAQSection } from '../components/content-sections/tools/StudioRecorderSections';
import React, { useState } from 'react';
import { Monitor, Video as VideoIcon, Mic, StopCircle, PlayCircle, Circle } from 'lucide-react';
import { smartHighlight } from '../utils/textFormatting';
import { useStudioRecorder } from '../hooks/useStudioRecorder';
import { VideoTrimmer } from '../components/VideoTrimmer';
import { useLanguage } from '../hooks/useLanguage';

export const StudioRecorder: React.FC<{ pseoData?: any }> = ({ pseoData }) => {
  const { isRecording, recordingTime, recordedBlobUrl, startRecording, stopRecording, resetRecording } = useStudioRecorder();
  
  const [screen, setScreen] = useState(true);
  const [webcam, setWebcam] = useState(true);
  const [audio, setAudio] = useState(true);
  
  const { t: translate } = useLanguage();
  
  const t = {
    desc: translate('recDesc') || "Record your screen, webcam, and audio simultaneously directly in your browser.",
    screen: translate('recScreen') || "Screen Share",
    sys_audio: translate('recSysAudio') || "Include System Audio",
    webcam: translate('recWebcam') || "Webcam",
    pip: translate('recPip') || "Picture-in-Picture",
    mic: translate('recMic') || "Microphone",
    voice: translate('recVoice') || "Voice Recording",
    start: translate('recStart') || "Start Recording",
    stop: translate('recStop') || "Stop Recording",
    settings: translate('recSettings') || "Settings",
    captureDesktop: translate('recCaptureDesktop') || "Capture Desktop"
  };


  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isRecording) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStart = () => {
    if (!screen && !webcam) {
      alert("Please enable at least Screen or Webcam to start recording.");
      return;
    }
    startRecording({
      screen,
      webcam,
      mic: audio,
      systemAudio: audio
    });
  };

  if (recordedBlobUrl) {
    return (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <VideoTrimmer videoUrl={recordedBlobUrl} onDiscard={resetRecording} />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', paddingTop: '64px' }}>
      
      <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: 1200, margin: '0 auto 40px auto', width: '100%' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 20, letterSpacing: '-0.03em', lineHeight: 1.15, fontFamily: 'Outfit, sans-serif' }}>
          {smartHighlight(pseoData ? pseoData.h1 : (translate('recTitle') || 'Professional Browser Studio Recorder'))}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>{pseoData ? pseoData.description : t.desc}</p>
      </div>

      <div className="tool-workspace-container" style={{ margin: '0 auto' }}>
        
        {/* Main Recorder Area */}
        <div className="tool-workspace-left glass-panel" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {isRecording && (
            <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error-color)', padding: '6px 12px', borderRadius: 20, fontWeight: 700, animation: 'pulse 2s infinite' }}>
              <Circle fill="var(--error-color)" size={12} /> REC {formatTime(recordingTime)}
            </div>
          )}

          <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg, var(--brand-primary), var(--text-accent))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3)' }}>
            <Monitor size={40} color="#fff" />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            {isRecording ? (
              <button 
                onClick={stopRecording}
                className="btn-primary"
                style={{ background: 'var(--error-color)', padding: '16px 48px', fontSize: '1.1rem', borderRadius: 30 }}
              >
                <StopCircle size={24} /> {t.stop}
              </button>
            ) : (
              <button 
                onClick={handleStart}
                className="btn-primary"
                style={{ padding: '16px 48px', fontSize: '1.1rem', borderRadius: 30 }}
              >
                <PlayCircle size={24} /> {t.start}
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="tool-workspace-right glass-panel">
          <h3 style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border-color)', fontWeight: 800 }}>
            {t.settings}
          </h3>
          <div className="sidebar-options">
            <button 
              onClick={() => !isRecording && setScreen(!screen)}
              disabled={isRecording}
              className={`option-btn ${screen ? 'active' : ''}`}
            >
              {screen ? <Monitor size={24} /> : <Monitor size={24} color="var(--text-muted)" />}
              <div>
                <div className="option-title">{t.screen}</div>
                <div className="option-subtitle">{t.captureDesktop}</div>
              </div>
            </button>
            
            {screen && (
              <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', marginBottom: 12 }}>
                <input type="checkbox" checked={audio} onChange={e => setAudio(e.target.checked)} disabled={isRecording} />
                {t.sys_audio}
              </label>
            )}

            <button 
              onClick={() => !isRecording && setWebcam(!webcam)}
              disabled={isRecording}
              className={`option-btn ${webcam ? 'active' : ''}`}
            >
              {webcam ? <VideoIcon size={24} /> : <VideoIcon size={24} color="var(--text-muted)" />}
              <div>
                <div className="option-title">{t.webcam}</div>
                <div className="option-subtitle">{t.pip}</div>
              </div>
            </button>

            <button 
              onClick={() => !isRecording && setAudio(!audio)}
              disabled={isRecording}
              className={`option-btn ${audio ? 'active' : ''}`}
            >
              {audio ? <Mic size={24} /> : <Mic size={24} color="var(--text-muted)" />}
              <div>
                <div className="option-title">{t.mic}</div>
                <div className="option-subtitle">{t.voice}</div>
              </div>
            </button>
          </div>
        </div>

      </div>

      
    
    
      <div className="seo-sections-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '80px', padding: '80px 0', background: 'var(--bg-main)' }}>
        <StudioRecorderHeroSection 
          section={{ type: 'hero', title: translate('recHeroTitle') || "Professional Browser Studio Recorder", content: translate('recHeroDesc') || "Record your screen, webcam, and microphone all at once without installing any software. Perfect for tutorials, presentations, and vlogs." }} 
        />
        <StudioRecorderHowToSection 
          section={{
            type: 'howto',
            title: translate('recHowTo') || "How to Record",
            steps: [
              { title: translate('recHowTo1') || "Select Sources", description: translate('recHowTo1Desc') || "Toggle your screen, webcam, and microphone on or off." },
              { title: translate('recHowTo2') || "Start Recording", description: translate('recHowTo2Desc') || "Hit record. You can capture multiple sources simultaneously." },
              { title: translate('recHowTo3') || "Save Video", description: translate('recHowTo3Desc') || "Stop recording and download the final video file immediately." }
            ]
          }} 
        />
        <StudioRecorderPerformanceSection 
          section={{ type: 'performance', title: translate('recPerfTitle') || "Zero Latency Capture", content: translate('recPerfDesc') || "Leveraging raw WebRTC APIs, we capture your screen and camera with absolutely zero network latency or server lag." }} 
        />
        <StudioRecorderPrivacySection 
          section={{ type: 'privacy', title: translate('recPrivTitle') || "Secure & Offline", content: translate('recPrivDesc') || "Your camera feed and screen recordings are processed and stored locally. They are never transmitted over the internet." }} 
        />
        <StudioRecorderFAQSection faqs={pseoData?.faqs} />
      </div>
  
    </div>
  );
};