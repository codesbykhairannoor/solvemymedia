const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'i18n', 'translations.ts');

const newKeys = {
  faqTitle: "Frequently Asked Questions",
  
  cwDragDrop: "Drag & drop file or",
  cwBrowse: "Browse Files",
  cwProcessing: "Processing...",
  cwDownload: "Download Result",

  cgViralReady: "Viral Ready",
  cgLocalHardware: "Local Hardware",
  cgZeroLatency: "Zero latency",
  cgLossless: "Lossless framerates",
  cgWasm: "WASM-powered rendering",
  cgOfflinePrivacy: "Absolute Offline Privacy",

  cvQuickGuide: "Quick Guide",
  cvSocialReady: "Social Ready",
  cvCropUploads: "Crop Without Uploads",
  cvExtract: "Extract visual data or trim sensitive margins off a video completely within your browser's private memory.",
  cvSecurityFirst: "Security First",

  mvTitle: "Remove Audio from Video Completely",
  mvSub: "Quickly remove the audio track from any video file. Perfect for creating silent clips or preparing footage for social media.",
  mvAbsoluteSilence: "Absolute Silence",
  mvNoDecode: "No Video Decoding",
  mvStreamCopy: "Stream Copy Engine",
  mvZeroLoss: "Zero Quality Loss",
  mvInstant: "Instant Output",
  mvFast: "Fast",
  mvFaq1Q: "Will it reduce the file size?",
  mvFaq1A: "Yes, removing the audio track entirely will reduce the file size. However, audio data usually takes up a very small percentage of a video file compared to the visual data.",
  mvFaq2Q: "Does it change video quality?",
  mvFaq2A: "No. Our tool strips out the audio stream without re-encoding the video stream. The visual quality remains 100% identical to the original.",
  mvFaq3Q: "Can I restore the audio later?",
  mvFaq3A: "No, once the audio is removed and you download the new file, the audio is permanently gone from that specific file. You should always keep a backup of your original video if you might need the audio later.",

  wvInstant: "Instant Brand Protection",
  wvBranded: "BRANDED",
  wvLogoSupport: "Logo Support",
  wvLogoDesc: "Type custom text as a watermark and burn it directly into your video files instantly."
};

let content = fs.readFileSync(targetFile, 'utf8');

let interfaceEnd = content.indexOf('}');
let newInterfaceLines = Object.keys(newKeys).map(k => `  ${k}?: string;`).join('\n');
content = content.slice(0, interfaceEnd) + newInterfaceLines + '\n' + content.slice(interfaceEnd);

let baseDictEnd = content.indexOf('};', interfaceEnd);
let newBaseDictLines = Object.entries(newKeys).map(([k, v]) => `  ${k}: "${v.replace(/"/g, '\\"')}"`).join(',\n');
content = content.slice(0, baseDictEnd - 1) + ',\n' + newBaseDictLines + '\n' + content.slice(baseDictEnd);

fs.writeFileSync(targetFile, content);
console.log("Added keys to translations.ts");
