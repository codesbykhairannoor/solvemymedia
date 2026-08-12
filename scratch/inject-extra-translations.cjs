const fs = require('fs');
const path = require('path');

const extraStrings = {
  // Footer
  footerResources: 'Resources',
  footerCopyright: 'All rights reserved.',
  
  // ConvertVideoSections hardcoded
  convVHeroPill: 'Universal Format to Anything',
  convVLogTitle: 'ffmpeg_worker.log',
  convVLog1: '[INFO] Starting video remuxing...',
  convVLog2: '[DATA] Found H.264 stream...',
  convVLog3: '[WARN] Transcoding to WebM VP9',
  convVContainerOut: 'Container Output',
  convVGpuTitle: 'WebCodecs GPU',
  convVWasmTitle: 'WebAssembly Transcoding Engine',
  convVWasmDesc: "We've ported industry-standard media frameworks directly into the browser. Unlike basic converters, SolveMyMedia utilizes SharedArrayBuffer and Web Workers to transcode gigabytes of video data blazingly fast without crashing your tab.",
  convVFeat1: 'No FFmpeg installation',
  convVFeat2: 'Preserves original quality',
  convVFeat3: 'Supports 4K and 60FPS',
  convVPrivTitle: 'Play Anywhere, On Any Device',
  convVPrivDesc: 'By converting your videos to MP4 (H.264/AAC), you ensure they will play flawlessly on iPhones, Androids, Smart TVs, and social media platforms.',
  
  // ConvertVideo page structure strings
  convVHowTo: 'How to Convert Videos Offline',
  convVHowTo1: 'Drop your Video',
  convVHowTo1Desc: 'Select any obscure video format from your local drive.',
  convVHowTo2: 'Choose Target',
  convVHowTo2Desc: 'Select MP4 for universal playback or WebM for web optimization.',
  convVHowTo3: 'Save File',
  convVHowTo3Desc: 'The conversion happens locally. Click download when done.',
  convVGeoTitle: '100% Local Execution',
  convVGeoDesc: 'No accounts, no software installation, and no upload limits. Just drag, drop, and convert.',
  convVGeoFeatTitle: 'Offline Security',
  convVGeoLi1: 'Prevent video leaks',
  convVGeoLi2: 'Safe for private media',
  convVGeoLi3: 'Absolute privacy',
  faqTitle: 'Frequently Asked Questions',
  convVFaq1Q: 'Why convert MKV to MP4?',
  convVFaq1A: 'MKV is a great container, but many default media players (like QuickTime on Mac) and social networks do not support it natively. Converting it to MP4 guarantees it can be viewed by anyone, anywhere.',
  convVFaq2Q: 'Is there a file size limit for conversion?',
  convVFaq2A: 'No! Because our tool runs locally on your browser using WebAssembly, there are no artificial limits. You can convert 10GB+ movies as long as you have enough disk space and memory.',
  convVFaq3Q: 'Does this conversion reduce the video quality?',
  convVFaq3A: 'By default, we set the target quality to 100% to ensure a virtually lossless conversion. The output MP4 will look identical to your original source file.',

  // CompressVideo page structure strings
  compVHero2Title: 'Reduce Video Size by up to 90%',
  compVHero2Desc: 'Optimize your MP4, WebM, and MOV files for Discord, WhatsApp, and email without noticeably degrading the visual quality.',
  compVPerfTitle: 'Blazing Fast GPU Encoding',
  compVPerfDesc: "Our compressor uses WebCodecs to tap directly into your device's hardware encoder. No servers involved.",
  compVFeat1Title: 'Hardware Accelerated',
  compVFeat1Desc: 'Uses your GPU for native-speed encoding',
  compVFeat2Title: 'Zero Uploads',
  compVFeat2Desc: 'Files are processed directly in browser memory',
  compVFeat3Title: 'Absolute Privacy',
  compVFeat3Desc: 'Your videos never leave your local machine',
  compVHowTo: 'How to Compress Video Offline',
  compVHowTo1: 'Select Video',
  compVHowTo1Desc: 'Drag and drop any massive video file into the compression zone.',
  compVHowTo2: 'Choose Quality',
  compVHowTo2Desc: 'Move the slider to find the perfect balance between size and quality.',
  compVHowTo3: 'Download Output',
  compVHowTo3Desc: 'Save the compressed file instantly to your device.',
  compVFaq1Q: 'Is the compression really done in my browser?',
  compVFaq1A: 'Yes! We use WebAssembly and WebCodecs to run the compression algorithms locally. Your video never leaves your device.',
  compVFaq2Q: 'Why does my compressed video look blurry?',
  compVFaq2A: 'If you set the quality slider too low (e.g., 10%), you will lose significant visual detail. We recommend starting at 60% for a good balance.',
  compVFaq3Q: 'What formats are supported?',
  compVFaq3A: 'You can compress MP4, WebM, MOV, and AVI files. The output will typically be formatted as MP4 for maximum compatibility.',

  // ChangeVideoSpeed page and sections strings
  speedVHeroPill: 'Cinematic Speed Adjustments',
  speedVMasterTime: 'Master Time',
  speedVPerfTitle: 'Precision Control Without Distortion',
  speedVPerfDesc: 'Adjusting video speed usually breaks the audio pitch. We use advanced FFmpeg atempo filters to preserve the natural sound of your audio track even at 2x speeds.',
  speedVPerfPill: 'Lightning Fast',
  speedVFeat1Title: 'Time Manipulation',
  speedVFeat1Desc: 'Speed up or slow down with frame-perfect accuracy',
  speedVFeat2Title: 'Pitch Correction',
  speedVFeat2Desc: 'Audio remains natural without sounding like chipmunks',
  speedVFeat3Title: 'Fast Export',
  speedVFeat3Desc: 'Direct memory access ensures near-instant rendering',
  speedVPrivTitle: 'Complete Privacy Protection',
  speedVPrivDesc: 'Your video content is never uploaded to any remote server. The entire speed adjustment process happens securely within your browser sandbox, keeping your media 100% private.',
  speedVGeoTitle: 'Process Videos Anywhere',
  speedVGeoDesc: 'No internet connection needed after the first load. Change video speeds even while completely offline.',
  speedVGeoPill: 'Local Processing',
  speedVHowTo: 'How to Adjust Video Speed',
  speedVHowTo1: 'Import Video',
  speedVHowTo1Desc: 'Select any MP4, WebM, or MOV file from your device.',
  speedVHowTo2: 'Set Speed Factor',
  speedVHowTo2Desc: 'Use the slider to set a speed between 0.5x (slow motion) and 2.0x (fast forward).',
  speedVHowTo3: 'Export Video',
  speedVHowTo3Desc: 'Click process to apply the changes and download the new video instantly.',
  speedVFaq1Q: 'Does changing speed affect the audio pitch?',
  speedVFaq1A: 'No! Unlike basic speed changers that make audio sound squeaky when sped up, we use an advanced pitch-correction algorithm (atempo) to maintain natural voices.',
  speedVFaq2Q: 'Can I go faster than 2.0x?',
  speedVFaq2A: 'Currently, the web-based FFmpeg engine supports stable pitch-corrected adjustments between 0.5x and 2.0x for the best possible quality.',
  speedVFaq3Q: 'Is this tool completely free and offline?',
  speedVFaq3A: 'Yes, it is 100% free with no watermarks and runs entirely inside your browser, meaning it works even without an active internet connection.'
};

// Update translations.ts
const tFile = path.join(__dirname, '../src/i18n/translations.ts');
let tContent = fs.readFileSync(tFile, 'utf8');

// Inject keys into interface and baseDict
let interfaceStrs = Object.keys(extraStrings).map(k => `  ${k}?: string;`).join('\\n');
let dictStrs = Object.entries(extraStrings).map(([k, v]) => `  ${k}: "${v.replace(/"/g, '\\"')}",`).join('\\n');

tContent = tContent.replace(/export interface UiDictionary \{/, `export interface UiDictionary {\n${interfaceStrs}`);
tContent = tContent.replace(/const baseDict: UiDictionary = \{/, `const baseDict: UiDictionary = {\n${dictStrs}`);

// Delete all languages except EN so they get re-generated
tContent = tContent.replace(/export const UI_TRANSLATIONS: Record<string, UiDictionary> = \{[\s\S]*?\};/, `export const UI_TRANSLATIONS: Record<string, UiDictionary> = {\n  en: baseDict,\n};`);

fs.writeFileSync(tFile, tContent);
console.log('Updated translations.ts');
