const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

const componentConfigs = {
  CompressVideo: {
    imports: `import { SecurityHeroSection, SecurityPrivacySection } from '../components/content-sections/SecurityGroup';`,
    jsx: `      <SecurityHeroSection 
        title="Compress Video Without Uploading" 
        description="Our browser-based compressor uses WebCodecs to shrink your MP4/WebM videos right inside your device. No waiting in server queues, and 100% private." 
        flipLayout={false} 
      />
      <SecurityPrivacySection 
        title="Zero Data Leaks Guaranteed" 
        description="Unlike cloud tools that upload your precious home videos to unknown servers, Media Compressor processes every frame locally in your memory." 
      />`
  },
  CompressAudio: {
    imports: `import { SecurityHeroSection, SecurityGeoSection } from '../components/content-sections/SecurityGroup';`,
    jsx: `      <SecurityHeroSection 
        title="Shrink Audio Size Instantly" 
        description="Save gigabytes of space by compressing your audio files. Perfect for podcast creators, voice notes, and music producers who need to share files quickly." 
        flipLayout={true} 
      />
      <SecurityGeoSection 
        title="100% Secure Local Execution" 
        description="Your audio files never leave your computer. WebAssembly technology enables us to deliver native-grade FFmpeg compression entirely in your browser." 
      />`
  },
  ConvertVideo: {
    imports: `import { HeroFeaturesSection, HowToStepsSection } from '../components/content-sections/FeatureGroup';`,
    jsx: `      <HeroFeaturesSection 
        title="Universal Video Converter" 
        description="Convert MKV, AVI, MOV, and WebM into standard MP4 formats effortlessly. Our multi-threaded WebAssembly engine handles it all without plugins." 
        flipLayout={false}
      />
      <HowToStepsSection 
        title="Convert in 3 Simple Steps" 
        steps={[
          {title: 'Select File', description: 'Drag and drop your bulky video format into the tool.'},
          {title: 'Process Locally', description: 'Our WASM engine transcodes your video securely.'},
          {title: 'Download Immediately', description: 'Save the converted MP4 directly to your device.'}
        ]}
      />`
  },
  ConvertAudio: {
    imports: `import { HeroFeaturesSection, HowToStepsSection } from '../components/content-sections/FeatureGroup';`,
    jsx: `      <HeroFeaturesSection 
        title="High-Fidelity Audio Converter" 
        description="Convert WAV to MP3, or OGG to AAC. We support a wide range of codecs to ensure you get the exact format you need for any project." 
        flipLayout={true}
      />
      <HowToStepsSection 
        title="How to Convert Audio" 
        steps={[
          {title: 'Upload Audio', description: 'Select any audio format from your computer.'},
          {title: 'Transcode', description: 'We instantly convert the stream without uploading.'},
          {title: 'Save File', description: 'Download the converted MP3 or WAV.'}
        ]}
      />`
  },
  ConvertVideoToAudio: {
    imports: `import { HeroFeaturesSection } from '../components/content-sections/FeatureGroup';\nimport { SecurityPrivacySection as PrivacyLog } from '../components/content-sections/SecurityGroup';`,
    jsx: `      <HeroFeaturesSection 
        title="Extract Audio from Video" 
        description="Pull the exact audio track (MP3 or WAV) from your favorite music videos, lectures, and movies without losing an ounce of quality." 
      />
      <PrivacyLog 
        title="Offline Audio Extraction" 
        description="No server needed. We split the audio and video streams right on your device motherboard using advanced Web Codecs." 
      />`
  },
  TranscribeMedia: {
    imports: `import { SplitHeroSection, SplitPerformanceSection } from '../components/content-sections/SplitGroup';`,
    jsx: `      <SplitHeroSection 
        title="AI Transcription directly in your Browser" 
        description="Using Whisper AI compiled to WebAssembly, we accurately convert your speech to text with unmatched privacy. The AI runs on your GPU." 
      />
      <SplitPerformanceSection 
        title="Blazing Fast GPU Acceleration" 
        description="We utilize WebGL and WebGPU to run Neural Networks directly on your hardware. It's free, unlimited, and offline." 
      />`
  },
  StudioRecorder: {
    imports: `import { SplitHeroSection, SplitPerformanceSection } from '../components/content-sections/SplitGroup';`,
    jsx: `      <SplitHeroSection 
        title="Professional Studio Recorder" 
        description="Record your screen, webcam, and microphone natively. Perfect for tutorials, presentations, and let's plays." 
      />
      <SplitPerformanceSection 
        title="Zero Latency Recording" 
        description="We capture raw media streams and mux them into standard formats locally. No lag, no buffering, just pure performance." 
      />`
  },
  ChangeVideoSpeed: {
    imports: `import { SecurityHeroSection, SecurityGeoSection } from '../components/content-sections/SecurityGroup';`,
    jsx: `      <SecurityHeroSection 
        title="Control Video Playback Speed" 
        description="Create smooth slow-motion effects or fast-forward timelapses. We process the frames in real-time." 
      />
      <SecurityGeoSection 
        title="Local Frame Processing" 
        description="Instead of uploading your video to alter its speed, we shift the PTS (Presentation Time Stamp) locally for instant results." 
      />`
  },
  MergeAudio: {
    imports: `import { HeroFeaturesSection } from '../components/content-sections/FeatureGroup';\nimport { SecurityPrivacySection } from '../components/content-sections/SecurityGroup';`,
    jsx: `      <HeroFeaturesSection 
        title="Merge Multiple Audio Tracks" 
        description="Combine voiceovers, background music, and sound effects into a single seamless audio file." 
      />
      <SecurityPrivacySection 
        title="Safe & Private" 
        description="Whether it's an unreleased song or a private podcast, your files remain strictly on your local disk during the merge process." 
      />`
  },
  WatermarkVideo: {
    imports: `import { HeroFeaturesSection, HowToStepsSection } from '../components/content-sections/FeatureGroup';`,
    jsx: `      <HeroFeaturesSection 
        title="Brand Your Videos" 
        description="Overlay your custom logo, text, or transparent PNG onto your video. Protect your copyright before sharing on social media." 
      />
      <HowToStepsSection 
        title="Add Watermark" 
        steps={[
          {title: 'Upload Video', description: 'Load your target video.'},
          {title: 'Add Logo', description: 'Upload your watermark image and position it.'},
          {title: 'Export', description: 'Render the final video locally.'}
        ]}
      />`
  }
};

const defaultConfigs = {
  imports: `import { SecurityHeroSection } from '../components/content-sections/SecurityGroup';\nimport { HeroFeaturesSection } from '../components/content-sections/FeatureGroup';`,
  jsx: `      <SecurityHeroSection 
        title="Secure & Private Processing" 
        description="All media operations happen directly inside your browser. No uploads, no servers, no privacy risks." 
      />
      <HeroFeaturesSection 
        title="Powered by WebAssembly" 
        description="Experience native-like performance for your media editing tasks thanks to our advanced WASM engine." 
        flipLayout={true}
      />`
};

for (const file of files) {
  if (file === 'Home.tsx') continue;
  
  const componentName = file.replace('.tsx', '');
  const config = componentConfigs[componentName] || defaultConfigs;
  
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if we already injected successfully
  if (content.includes('HeroFeaturesSection') || content.includes('SecurityHeroSection') || content.includes('SplitHeroSection')) {
      continue;
  }

  // Add imports if not present
  if (!content.includes('components/content-sections')) {
    // find last import
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfLine = content.indexOf('\\n', lastImportIndex) !== -1 ? content.indexOf('\\n', lastImportIndex) : content.indexOf('\n', lastImportIndex);
      content = content.slice(0, endOfLine + 1) + config.imports.replace(/\\n/g, '\n') + '\n' + content.slice(endOfLine + 1);
    } else {
      content = config.imports.replace(/\\n/g, '\n') + '\n\n' + content;
    }
  }

  // Inject JSX before final </>
  const endFragment = content.lastIndexOf('</>');
  if (endFragment !== -1) {
    content = content.slice(0, endFragment) + '\n' + config.jsx + '\n    ' + content.slice(endFragment);
  }

  fs.writeFileSync(filePath, content);
}

console.log('Sections injected FOR REAL.');
