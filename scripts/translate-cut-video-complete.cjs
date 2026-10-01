const fs = require('fs');
const path = require('path');
const { translate } = require('google-translate-api-x');

const LANGUAGES = [
  'en', 'id', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ru',
  'ja', 'ko', 'zh', 'zh-TW', 'tr', 'vi', 'th', 'ar', 'hi', 'sv',
  'no', 'da', 'fi', 'cs', 'hu', 'el', 'ro', 'uk', 'ms', 'tl',
  'he', 'sk'
];

const LANG_MAP = {
  'zh-TW': 'zh-TW',
  'zh': 'zh-CN',
  'tl': 'tl',
  'he': 'iw'
};

function getGoogleLangCode(code) {
  return LANG_MAP[code] || code;
}

const MASTER_KEYS = {
  // Navigation & Metadata
  toolCutVideo: "Cut Video",
  toolCutVideoTitle: "Cut Video Online Fast & Lossless",
  cutVideoDesc: "Trim, slice, and cut video clips online without quality loss. 100% private in-browser WebAssembly processing.",
  seoCutVideoTitle: "Cut Video Online Free — Instant Lossless Video Trimmer",
  seoCutVideoDesc: "Trim and cut MP4, MOV, WebM, and MKV videos directly in your browser. Fast lossless cutting with zero server uploads and no watermark.",

  // Workspace Controls & Settings
  cutSettings: "Trimming Settings",
  cutSettingsDesc: "Set in and out cut points with frame precision or lossless stream copy.",
  cutStartTime: "Start Time",
  cutEndTime: "End Time",
  cutDuration: "Selected Duration",
  cutOriginalDuration: "Original Duration",
  cutSetStart: "Set In-Point",
  cutSetEnd: "Set Out-Point",
  cutPlaySelection: "Preview Selection",
  cutAction: "Cut Video Now",
  cutCutting: "Cutting Video...",
  cutProcessingWasm: "Processing with FFmpeg WASM...",
  cutModeLossless: "Lossless Stream Cut",
  cutModeLosslessDesc: "Cuts in 0.5s without re-encoding. 100% original quality preserved.",
  cutModeAccurate: "Frame-Accurate Cut",
  cutModeAccurateDesc: "Re-encodes cleanly at the exact millisecond frame.",
  cutPreset15s: "First 15s (Story)",
  cutPreset30s: "First 30s (Status)",
  cutPreset60s: "First 60s (Reel/TikTok)",
  cutPresetMid: "Middle 50%",
  cutReset: "Reset Range",
  cutTimelineHint: "Drag markers on timeline or nudge timestamps below",
  cutFormatMp4: "MP4 (Universal)",
  cutSpeedBadge: "Instant 0.4s Cut",
  cutSuccessTitle: "Video Trimmed Successfully!",
  cutSuccessDesc: "Your trimmed clip is ready to download.",
  cutTrimAnother: "Trim Another Part",
  cutPickNew: "Pick New Video",
  cutReplaceVideo: "Replace Video",
  cutMuteAudio: "Mute audio in clipped video",
  cutPlay: "Play",
  cutPause: "Pause",
  cutLoop: "Loop",

  // Section 1: Filmstrip Timeline & Speed Comparison
  cutSec1Badge: "Cinematic Timeline Engine",
  cutSec1Title: "High-Precision Video Trimming with Zero Server Lag",
  cutSec1Desc: "Skip frustrating 20-minute cloud upload queues. SolveMyMedia parses keyframe packets directly in browser memory, giving you instant scrubbing and zero-delay cuts.",
  cutSec1ComparisonCloud: "Cloud Converters: 15m upload + 5m queue = 20 mins wait",
  cutSec1ComparisonLocal: "SolveMyMedia: 0s upload + 0.4s stream copy = Instant!",
  cutSec1CloudTitle: "Traditional Cloud Cutters",
  cutSec1CloudPoint1: "Upload 1GB video over Wi-Fi: ~15-20 mins",
  cutSec1CloudPoint2: "Remote queue waiting time: 3-5 mins",
  cutSec1CloudPoint3: "Re-encoding degrades pixels & adds generation loss",
  cutSec1CloudPoint4: "Video stored on unknown third-party cloud servers",
  cutSec1CloudTotal: "Total Time: 20+ Minutes Wait",
  cutSec1LocalTitle: "SolveMyMedia Stream Copy",
  cutSec1LocalPoint1: "Server Upload: 0.00 seconds (Local RAM)",
  cutSec1LocalPoint2: "Stream Demuxing Execution: 0.4 seconds flat",
  cutSec1LocalPoint3: "Bit-Identical Quality: Zero re-encoding artifacts",
  cutSec1LocalPoint4: "100% Air-gapped privacy (Never touches the internet)",
  cutSec1LocalTotal: "Total Time: 0.4s (Instant Download)",

  // Section 2: 4-Stage Horizontal Pipeline
  cutSec2Badge: "Streamlined Workflow",
  cutSec2Title: "How to Cut Videos in 4 Simple Steps",
  cutStep1Title: "1. Select Video",
  cutStep1Desc: "Drag & drop any video file into your browser. It loads into local RAM immediately.",
  cutStep2Title: "2. Set In & Out Points",
  cutStep2Desc: "Use the visual timeline scrubber or type exact timestamps to isolate your desired scene.",
  cutStep3Title: "3. Stream Slice",
  cutStep3Desc: "WebAssembly extracts the chosen segment natively without re-encoding overhead.",
  cutStep4Title: "4. Instant Download",
  cutStep4Desc: "Save your freshly trimmed clip directly to your device with zero watermarks.",

  // Section 3: Bento Matrix of Cutting Presets & Features
  cutSec3Badge: "Engine Highlights",
  cutSec3Title: "Engineered for Speed, Precision, and Privacy",
  cutBento1Title: "Lossless Stream Copy Engine",
  cutBento1Desc: "Traditional video trimmers re-encode every single frame, causing generation loss and pixel blur. Our WebAssembly engine performs clean stream demuxing, preserving every bit of original video quality.",
  cutZeroGenLoss: "Zero Generation Loss",
  cutBento2Title: "Social Media Clip Presets",
  cutBento2Desc: "Instantly trim long videos into snackable 15s Instagram Stories, 30s WhatsApp Status clips, or 60s TikTok Reels with a single click.",
  cutOneClickPresets: "1-Click Presets",
  cutBento3Title: "100% Air-Gapped Privacy",
  cutBento3Desc: "Your clips never touch an external server. Feel confident cutting private family moments, confidential work interviews, or NDA footage.",
  cutZeroNetworkEgress: "Zero Network Egress",
  cutSandboxActive: "Browser Memory Sandbox Active",
  cutBento4Title: "Millisecond Micro-Nudge Precision",
  cutBento4Desc: "Fine-tune cut boundaries with 0.1-second precision buttons so you never clip a conversation or action scene awkwardly.",
  cutMicroNudge: "Micro-Nudge Controls",
  cutExactFrameLock: "Exact Frame Lock",

  // Section 4: Technical Specifications Table
  cutSec4Title: "Technical Specifications & Supported Standards",
  cutSec4Desc: "Deep engine architecture benchmarks and container compatibility",
  cutSpecFormats: "Supported Input Formats",
  cutSpecFormatsVal: "MP4, MOV, WebM, MKV, AVI, FLV, WMV, M4V, TS, 3GP",
  cutSpecMax: "Maximum File Size",
  cutSpecMaxVal: "Unlimited (Tested up to 4GB+ on modern devices)",
  cutSpecEngine: "Processing Engine",
  cutSpecEngineVal: "WebAssembly FFmpeg v0.12 + WebCodecs API",
  cutSpecQuality: "Visual Quality Retention",
  cutSpecQualityVal: "100% Bit-Identical (Lossless Stream Copy)",
  cutSpecServer: "Server Data Retention",
  cutSpecServerVal: "0 Bytes Uploaded (Air-Gapped Local Browser Execution)",

  // Section 5: FAQ Accordion
  cutFaqTitle: "Frequently Asked Questions About Video Cutting",
  cutFaqDesc: "Everything you need to know about lossless browser-side video trimming",
  cutFaq1Q: "Will cutting my video reduce its visual quality?",
  cutFaq1A: "No. When using the default Lossless Fast Cut mode, SolveMyMedia copies the original compressed bitstream directly from the source container into the target file without re-encoding pixels. Visual fidelity is 100% identical.",
  cutFaq2Q: "How long does it take to cut a 1-hour or 4K video?",
  cutFaq2A: "Usually less than a second! Because no server upload is required and pixels are not re-encoded, WebAssembly only reorganizes the container timestamps.",
  cutFaq3Q: "Can I cut videos on my phone or tablet?",
  cutFaq3A: "Yes, SolveMyMedia works seamlessly on mobile browsers including Chrome, Safari, Firefox, and Edge on iOS and Android without installing any app.",
  cutFaq4Q: "Are my private videos uploaded or saved on any server?",
  cutFaq4A: "Never. Everything runs purely within your browser tab's sandbox. Once you close the tab, the video data in RAM is completely cleared."
};

async function run() {
  console.log('Translating and merging Cut Video keys for all 32 languages...');
  const jsonPath = path.join(__dirname, '../src/data/cut-video-translations.json');
  let existingData = {};
  if (fs.existsSync(jsonPath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } catch (e) {}
  }

  const finalData = {};
  finalData['en'] = { ...MASTER_KEYS };

  for (const lang of LANGUAGES) {
    if (lang === 'en') continue;
    const currentDict = existingData[lang] || {};
    
    // Find missing keys
    const missingKeys = [];
    const missingEnglish = [];

    for (const [k, v] of Object.entries(MASTER_KEYS)) {
      if (!currentDict[k]) {
        missingKeys.push(k);
        missingEnglish.push(v);
      }
    }

    if (missingKeys.length > 0) {
      console.log(`[${lang}] Translating ${missingKeys.length} missing keys via google-translate-api-x...`);
      const gLang = getGoogleLangCode(lang);
      try {
        const translatedVals = [];
        for (let i = 0; i < missingEnglish.length; i += 10) {
          const chunk = missingEnglish.slice(i, i + 10);
          const res = await translate(chunk, { to: gLang, rejectOnPartialFail: false });
          const texts = Array.isArray(res) ? res.map(r => r.text) : [res.text];
          translatedVals.push(...texts);
          await new Promise(r => setTimeout(r, 60));
        }
        missingKeys.forEach((k, idx) => {
          currentDict[k] = translatedVals[idx] || MASTER_KEYS[k];
        });
      } catch (err) {
        console.warn(`[${lang}] Translation error: ${err.message}. Using fallback.`);
        missingKeys.forEach(k => {
          currentDict[k] = MASTER_KEYS[k];
        });
      }
    } else {
      console.log(`[${lang}] All keys already present.`);
    }

    finalData[lang] = { ...MASTER_KEYS, ...currentDict };
  }

  fs.writeFileSync(jsonPath, JSON.stringify(finalData, null, 2), 'utf8');
  console.log(`Saved updated JSON to ${jsonPath}`);

  // Inject into src/i18n/translations.ts
  const transPath = path.join(__dirname, '../src/i18n/translations.ts');
  let transContent = fs.readFileSync(transPath, 'utf8');

  for (const lang of LANGUAGES) {
    const dict = finalData[lang];
    if (!dict) continue;

    const regex = new RegExp(`(\\b${lang}:\\s*{)`, 'g');
    if (transContent.match(regex)) {
      let injection = '';
      for (const [k, v] of Object.entries(dict)) {
        if (!transContent.includes(`${k}:`)) {
          injection += `\n    ${k}: ${JSON.stringify(v)},`;
        }
      }
      if (injection) {
        transContent = transContent.replace(regex, `$1${injection}`);
      }
    }
  }

  fs.writeFileSync(transPath, transContent, 'utf8');
  console.log('translations.ts updated successfully!');
}

run().catch(console.error);
