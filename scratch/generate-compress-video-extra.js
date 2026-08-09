import fs from 'fs';
import path from 'path';
import translate from 'google-translate-api-x';

const langs = [
  'id','es','fr','de','it','pt','nl','pl','ru',
  'ja','ko','zh-cn','zh-tw','tr','vi','th','ar','hi','sv',
  'no','da','fi','cs','hu','el','ro','uk','ms','tl'
];

const toKey = (lang) => {
  if (lang === 'zh-cn') return 'zh';
  if (lang === 'zh-tw') return 'zh-TW';
  return lang;
};

const strings = [
  "Follow these simple steps to reduce your video file size instantly without compromising visual fidelity. Powered by advanced browser-based encoding.",
  "Pro Tip:",
  "Drag and drop directly into the workspace.",
  "Lower quality = significantly smaller size.",
  "Your file is processed securely.",
  "WebCodecs Accelerated",
  "Hardware Encoding (GPU)",
  "Direct Memory Access",
  "Web-Optimized Output",
  "Our engine prioritizes H.264 (MP4) and VP9 (WebM) outputs, ensuring maximum compatibility across all browsers and devices while achieving the lowest possible file sizes.",
  "Mobile Ready",
  "Automatically optimizes bitrates and resolutions for seamless playback on iOS and Android devices over cellular networks.",
  "4K & High Resolution Support",
  "Don't compromise on quality. Shrink massive 4K and 1080p source files down to manageable sizes without introducing heavy artifacts. Smart CRF encoding balances quality and size dynamically."
];

async function run() {
  const result = {
    "en": {
      howto_sub: strings[0],
      pro_tip: strings[1],
      tip1: strings[2],
      tip2: strings[3],
      tip3: strings[4],
      webcodecs: strings[5],
      hw_enc: strings[6],
      dma: strings[7],
      web_opt: strings[8],
      web_opt_desc: strings[9],
      mobile: strings[10],
      mobile_desc: strings[11],
      k4_sup: strings[12],
      k4_desc: strings[13]
    }
  };

  console.log("Starting translation...");
  
  for (const lang of langs) {
    try {
      console.log(`Translating to ${lang}...`);
      const res = await translate(strings, { to: lang, autoCorrect: true });
      const translated = Array.isArray(res) ? res.map(r => r.text) : [res.text];
      
      const localeKey = toKey(lang);
      result[localeKey] = {
        howto_sub: translated[0],
        pro_tip: translated[1],
        tip1: translated[2],
        tip2: translated[3],
        tip3: translated[4],
        webcodecs: translated[5],
        hw_enc: translated[6],
        dma: translated[7],
        web_opt: translated[8],
        web_opt_desc: translated[9],
        mobile: translated[10],
        mobile_desc: translated[11],
        k4_sup: translated[12],
        k4_desc: translated[13]
      };
    } catch (e) {
      console.error(`Error for ${lang}:`, e.message);
      result[toKey(lang)] = result["en"];
    }
  }

  const outPath = path.join(process.cwd(), 'src', 'utils', 'compressVideoExtraDictionary.ts');
  fs.writeFileSync(outPath, `export const COMPRESS_VIDEO_EXTRA: Record<string, Record<string, string>> = ${JSON.stringify(result, null, 2)};\n`, 'utf-8');
  console.log("Done! Written to", outPath);
}

run();
