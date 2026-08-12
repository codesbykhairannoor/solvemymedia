const fs = require('fs');

// ConvertVideoSections.tsx
let conv = fs.readFileSync('src/components/content-sections/tools/ConvertVideoSections.tsx', 'utf8');

conv = conv.replace(
  /import type \{ SectionProps \} from '\.\.\/types';/,
  "import type { SectionProps } from '../types';\nimport { useLanguage } from '../../../hooks/useLanguage';"
);

conv = conv.replace(/export const ([a-zA-Z]+): React\.FC<SectionProps> = \(\{ section([^}]*)\}\) => \(/g, 
"export const $1: React.FC<SectionProps> = ({ section$2}) => {\n  const { t } = useLanguage();\n  return (");

conv = conv.replace(/<\/section>\n\);/g, "</section>\n  );\n};");

// Then replace the strings
conv = conv.replace(/Universal Format to Anything/, "{t('convVHeroPill') || 'Universal Format to Anything'}");
conv = conv.replace(/ffmpeg_worker\.log/, "{t('convVLogTitle') || 'ffmpeg_worker.log'}");
conv = conv.replace(/\[INFO\] Starting video remuxing\.\.\./, "{t('convVLog1') || '[INFO] Starting video remuxing...'}");
conv = conv.replace(/\[DATA\] Found H\.264 stream\.\.\./, "{t('convVLog2') || '[DATA] Found H.264 stream...'}");
conv = conv.replace(/\[WARN\] Transcoding to WebM VP9/, "{t('convVLog3') || '[WARN] Transcoding to WebM VP9'}");
conv = conv.replace(/Container Output/, "{t('convVContainerOut') || 'Container Output'}");
conv = conv.replace(/WebCodecs GPU/, "{t('convVGpuTitle') || 'WebCodecs GPU'}");
conv = conv.replace(/WebAssembly Transcoding Engine/, "{t('convVWasmTitle') || 'WebAssembly Transcoding Engine'}");
conv = conv.replace(/>We've ported industry-standard media frameworks directly into the browser\. Unlike basic converters, SolveMyMedia utilizes SharedArrayBuffer and Web Workers to transcode gigabytes of video data blazingly fast without crashing your tab\.</, ">{t('convVWasmDesc') || \"We've ported industry-standard media frameworks directly into the browser. Unlike basic converters, SolveMyMedia utilizes SharedArrayBuffer and Web Workers to transcode gigabytes of video data blazingly fast without crashing your tab.\"}<");
conv = conv.replace(/No FFmpeg installation/, "{t('convVFeat1') || 'No FFmpeg installation'}");
conv = conv.replace(/Preserves original quality/, "{t('convVFeat2') || 'Preserves original quality'}");
conv = conv.replace(/Supports 4K and 60FPS/, "{t('convVFeat3') || 'Supports 4K and 60FPS'}");
conv = conv.replace(/Play Anywhere, On Any Device/, "{t('convVPrivTitle') || 'Play Anywhere, On Any Device'}");
conv = conv.replace(/>By converting your videos to MP4 \(H\.264\/AAC\), you ensure they will play flawlessly on iPhones, Androids, Smart TVs, and social media platforms\.</, ">{t('convVPrivDesc') || 'By converting your videos to MP4 (H.264/AAC), you ensure they will play flawlessly on iPhones, Androids, Smart TVs, and social media platforms.'}<");

fs.writeFileSync('src/components/content-sections/tools/ConvertVideoSections.tsx', conv);

// CompressVideo.tsx
let comp = fs.readFileSync('src/pages/CompressVideo.tsx', 'utf8');

comp = comp.replace(/Reduce Video Size by up to 90%/, "{t('compVHero2Title') || 'Reduce Video Size by up to 90%'}");
comp = comp.replace(/>Optimize your MP4, WebM, and MOV files for Discord, WhatsApp, and email without noticeably degrading the visual quality\.</, ">{t('compVHero2Desc') || 'Optimize your MP4, WebM, and MOV files for Discord, WhatsApp, and email without noticeably degrading the visual quality.'}<");

comp = comp.replace(/Blazing Fast GPU Encoding/, "{t('compVPerfTitle') || 'Blazing Fast GPU Encoding'}");
comp = comp.replace(/>Our compressor uses WebCodecs to tap directly into your device's hardware encoder\. No servers involved\.</, ">{t('compVPerfDesc') || \"Our compressor uses WebCodecs to tap directly into your device's hardware encoder. No servers involved.\"}<");

comp = comp.replace(/'Hardware Accelerated'/, "t('compVFeat1Title') || 'Hardware Accelerated'");
comp = comp.replace(/'Uses your GPU for native-speed encoding'/, "t('compVFeat1Desc') || 'Uses your GPU for native-speed encoding'");
comp = comp.replace(/'Zero Uploads'/, "t('compVFeat2Title') || 'Zero Uploads'");
comp = comp.replace(/'Files are processed directly in browser memory'/, "t('compVFeat2Desc') || 'Files are processed directly in browser memory'");
comp = comp.replace(/'Absolute Privacy'/, "t('compVFeat3Title') || 'Absolute Privacy'");
comp = comp.replace(/'Your videos never leave your local machine'/, "t('compVFeat3Desc') || 'Your videos never leave your local machine'");

comp = comp.replace(/How to Compress Video Offline/, "{t('compVHowTo') || 'How to Compress Video Offline'}");
comp = comp.replace(/>Select Video</, ">{t('compVHowTo1') || 'Select Video'}<");
comp = comp.replace(/>Drag and drop any massive video file into the compression zone\.</, ">{t('compVHowTo1Desc') || 'Drag and drop any massive video file into the compression zone.'}<");
comp = comp.replace(/>Choose Quality</, ">{t('compVHowTo2') || 'Choose Quality'}<");
comp = comp.replace(/>Move the slider to find the perfect balance between size and quality\.</, ">{t('compVHowTo2Desc') || 'Move the slider to find the perfect balance between size and quality.'}<");
comp = comp.replace(/>Download Output</, ">{t('compVHowTo3') || 'Download Output'}<");
comp = comp.replace(/>Save the compressed file instantly to your device\.</, ">{t('compVHowTo3Desc') || 'Save the compressed file instantly to your device.'}<");

comp = comp.replace(/Frequently Asked Questions/, "{t('faqTitle') || 'Frequently Asked Questions'}");
comp = comp.replace(/q: "Is the compression really done in my browser\?"/, "q: t('compVFaq1Q') || \"Is the compression really done in my browser?\"");
comp = comp.replace(/a: "Yes! We use WebAssembly and WebCodecs to run the compression algorithms locally\. Your video never leaves your device\."/, "a: t('compVFaq1A') || \"Yes! We use WebAssembly and WebCodecs to run the compression algorithms locally. Your video never leaves your device.\"");
comp = comp.replace(/q: "Why does my compressed video look blurry\?"/, "q: t('compVFaq2Q') || \"Why does my compressed video look blurry?\"");
comp = comp.replace(/a: "If you set the quality slider too low \(e\.g\., 10%\), you will lose significant visual detail\. We recommend starting at 60% for a good balance\."/, "a: t('compVFaq2A') || \"If you set the quality slider too low (e.g., 10%), you will lose significant visual detail. We recommend starting at 60% for a good balance.\"");
comp = comp.replace(/q: "What formats are supported\?"/, "q: t('compVFaq3Q') || \"What formats are supported?\"");
comp = comp.replace(/a: "You can compress MP4, WebM, MOV, and AVI files\. The output will typically be formatted as MP4 for maximum compatibility\."/, "a: t('compVFaq3A') || \"You can compress MP4, WebM, MOV, and AVI files. The output will typically be formatted as MP4 for maximum compatibility.\"");

fs.writeFileSync('src/pages/CompressVideo.tsx', comp);

// ChangeVideoSpeedSections.tsx
let sp = fs.readFileSync('src/components/content-sections/tools/ChangeVideoSpeedSections.tsx', 'utf8');

sp = sp.replace(
  /import type \{ SectionProps \} from '\.\.\/types';/,
  "import type { SectionProps } from '../types';\nimport { useLanguage } from '../../../hooks/useLanguage';"
);

sp = sp.replace(/export const ([a-zA-Z]+): React\.FC<SectionProps> = \(\{ section([^}]*)\}\) => \(/g, 
"export const $1: React.FC<SectionProps> = ({ section$2}) => {\n  const { t } = useLanguage();\n  return (");

sp = sp.replace(/<\/section>\n\);/g, "</section>\n  );\n};");

sp = sp.replace(/Cinematic Speed Adjustments/, "{t('speedVHeroPill') || 'Cinematic Speed Adjustments'}");
sp = sp.replace(/Master Time/, "{t('speedVMasterTime') || 'Master Time'}");
sp = sp.replace(/Lightning Fast/, "{t('speedVPerfPill') || 'Lightning Fast'}");

fs.writeFileSync('src/components/content-sections/tools/ChangeVideoSpeedSections.tsx', sp);
console.log('Updated components');
