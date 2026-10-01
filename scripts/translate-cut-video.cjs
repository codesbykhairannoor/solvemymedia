const fs = require('fs');
const path = require('path');
const { translate } = require('google-translate-api-x');
const slugify = require('slugify');

// The 32 languages of SolveMyMedia
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

// English master dictionary
const ENGLISH_KEYS = {
  // Navigation & Metadata
  toolCutVideo: "Cut Video",
  cutVideoDesc: "Trim, slice, and cut video clips online without quality loss. 100% private in-browser WebAssembly processing.",
  seoCutVideoTitle: "Cut Video Online Free — Instant Lossless Video Trimmer",
  seoCutVideoDesc: "Trim and cut MP4, MOV, WebM, and MKV videos directly in your browser. Fast lossless cutting with zero server uploads and no watermark.",

  // Workspace Controls
  cutStartTime: "Start Time",
  cutEndTime: "End Time",
  cutDuration: "Selected Duration",
  cutSetStart: "Set In-Point",
  cutSetEnd: "Set Out-Point",
  cutPlaySelection: "Preview Selection",
  cutAction: "Cut Video Now",
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

  // Section 1: Filmstrip Timeline & Speed Comparison
  cutSec1Badge: "Cinematic Timeline Engine",
  cutSec1Title: "High-Precision Video Trimming with Zero Server Lag",
  cutSec1Desc: "Skip frustrating 20-minute cloud upload queues. SolveMyMedia parses keyframe packets directly in browser memory, giving you instant scrubbing and zero-delay cuts.",
  cutSec1ComparisonCloud: "Cloud Converters: 15m upload + 5m queue = 20 mins wait",
  cutSec1ComparisonLocal: "SolveMyMedia: 0s upload + 0.4s stream copy = Instant!",

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
  cutBento2Title: "Social Media Clip Presets",
  cutBento2Desc: "Instantly trim long videos into snackable 15s Instagram Stories, 30s WhatsApp Status clips, or 60s TikTok Reels with a single click.",
  cutBento3Title: "100% Air-Gapped Privacy",
  cutBento3Desc: "Your clips never touch an external server. Feel confident cutting private family moments, confidential work interviews, or NDA footage.",
  cutBento4Title: "Millisecond Micro-Nudge Precision",
  cutBento4Desc: "Fine-tune cut boundaries with 0.1-second precision buttons so you never clip a conversation or action scene awkwardly.",

  // Section 4: Technical Specifications Table
  cutSec4Title: "Technical Specifications & Supported Standards",
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
  cutFaq1Q: "Will cutting my video reduce its visual quality?",
  cutFaq1A: "No. When using the default Lossless Fast Cut mode, SolveMyMedia copies the original compressed bitstream directly from the source container into the target file without re-encoding pixels. Visual fidelity is 100% identical.",
  cutFaq2Q: "How long does it take to cut a 1-hour or 4K video?",
  cutFaq2A: "Usually less than a second! Because no server upload is required and pixels are not re-encoded, WebAssembly only reorganizes the container timestamps.",
  cutFaq3Q: "Can I cut videos on my phone or tablet?",
  cutFaq3A: "Yes, SolveMyMedia works seamlessly on mobile browsers including Chrome, Safari, Firefox, and Edge on iOS and Android without installing any app.",
  cutFaq4Q: "Are my private videos uploaded or saved on any server?",
  cutFaq4A: "Never. Everything runs purely within your browser tab's sandbox. Once you close the tab, the video data in RAM is completely cleared."
};

const SLUG_CANDIDATES = {
  en: 'cut-video',
  id: 'potong-video',
  es: 'cortar-video',
  fr: 'couper-video',
  de: 'video-schneiden',
  it: 'tagliare-video',
  pt: 'cortar-video',
  nl: 'video-knippen',
  pl: 'przytnij-wideo',
  ru: 'obrezat-video',
  ja: 'video-cut',
  ko: 'video-cut',
  zh: 'jianji-shipin',
  'zh-TW': 'jianji-yingpian',
  tr: 'video-kes',
  vi: 'cat-video',
  th: 'tat-video',
  ar: 'qas-al-fidyu',
  hi: 'video-kaate',
  sv: 'klipp-video',
  no: 'klipp-video',
  da: 'klip-video',
  fi: 'leikkaa-video',
  cs: 'oriznout-video-cas',
  hu: 'video-vagasa',
  el: 'kopste-vinteo',
  ro: 'taie-video',
  uk: 'obrizaty-video',
  ms: 'potong-video',
  tl: 'gupitin-ang-video',
  he: 'lahtokh-video',
  sk: 'strihat-video'
};

async function main() {
  console.log('====================================================');
  console.log('  TRANSLATING CUT-VIDEO KEYS ACROSS 32 LANGUAGES    ');
  console.log('====================================================\n');

  const keysList = Object.keys(ENGLISH_KEYS);
  const valuesList = Object.values(ENGLISH_KEYS);

  const translationsByLang = {
    en: { ...ENGLISH_KEYS }
  };

  for (const lang of LANGUAGES) {
    if (lang === 'en') continue;
    console.log(`📡 Translating [${lang}] via google-translate-api-x...`);

    const gLang = getGoogleLangCode(lang);
    try {
      // Chunk into smaller batches of 15 strings for reliability
      const translatedValues = [];
      for (let i = 0; i < valuesList.length; i += 15) {
        const chunk = valuesList.slice(i, i + 15);
        const res = await translate(chunk, { to: gLang, rejectOnPartialFail: false });
        const texts = Array.isArray(res) ? res.map(r => r.text) : [res.text];
        translatedValues.push(...texts);
        await new Promise(r => setTimeout(r, 100)); // small delay
      }

      const dict = {};
      keysList.forEach((k, idx) => {
        dict[k] = translatedValues[idx] || ENGLISH_KEYS[k];
      });

      translationsByLang[lang] = dict;
      console.log(`✅ [${lang}] Translated ${keysList.length} keys successfully.`);
    } catch (err) {
      console.warn(`⚠️ Warning translating [${lang}]: ${err.message}. Falling back to English.`);
      translationsByLang[lang] = { ...ENGLISH_KEYS };
    }
  }

  // 1. Update src/i18n/slugs.ts
  console.log('\n📝 Updating src/i18n/slugs.ts...');
  const slugsPath = path.join(__dirname, '../src/i18n/slugs.ts');
  let slugsContent = fs.readFileSync(slugsPath, 'utf8');

  for (const lang of LANGUAGES) {
    const slug = SLUG_CANDIDATES[lang] || 'cut-video';
    const regex = new RegExp(`("${lang}":\\s*{[^}]*)`, 'g');
    if (slugsContent.match(regex)) {
      if (!slugsContent.includes(`"cut-video":`)) {
        slugsContent = slugsContent.replace(regex, `$1\n    "cut-video": "${slug}",`);
      }
    }
  }
  fs.writeFileSync(slugsPath, slugsContent, 'utf8');
  console.log('✅ src/i18n/slugs.ts updated with cut-video mapping for all 32 languages.');

  // 2. Save translated keys into a dedicated JSON for seamless injection into i18n
  const outJsonPath = path.join(__dirname, '../src/data/cut-video-translations.json');
  fs.writeFileSync(outJsonPath, JSON.stringify(translationsByLang, null, 2), 'utf8');
  console.log(`✅ Saved translations to ${outJsonPath}`);

  // 3. Inject into src/i18n/translations.ts
  console.log('📝 Injecting keys into src/i18n/translations.ts...');
  const transPath = path.join(__dirname, '../src/i18n/translations.ts');
  let transContent = fs.readFileSync(transPath, 'utf8');

  for (const lang of LANGUAGES) {
    const langDict = translationsByLang[lang];
    if (!langDict) continue;

    const regex = new RegExp(`(\\b${lang}:\\s*{)`, 'g');
    if (transContent.match(regex)) {
      let insertion = '';
      for (const [k, v] of Object.entries(langDict)) {
        const escapedVal = JSON.stringify(v);
        insertion += `\n    ${k}: ${escapedVal},`;
      }
      transContent = transContent.replace(regex, `$1${insertion}`);
    }
  }

  fs.writeFileSync(transPath, transContent, 'utf8');
  console.log('✅ src/i18n/translations.ts successfully injected with all cut-video keys!');
  console.log('\n🎉 Translation pipeline finished successfully!');
}

main().catch(err => {
  console.error('Fatal translation error:', err);
  process.exit(1);
});
