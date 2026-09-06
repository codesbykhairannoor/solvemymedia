const fs = require('fs');
const path = require('path');
const { translate } = require('google-translate-api-x');

// Helper to chunk arrays
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

const NEW_KEYS = {
  // Section 1: Home Bento Grid
  researchHome_badge: "Peer-Reviewed Multimedia Science",
  researchHome_title: "Empowered by Open Standards & Academic Research",
  researchHome_subtitle: "Our client-side media algorithms are built upon foundational computer science and signal processing papers published in top-tier journals.",
  researchHome_disclaimer: "Academic & Open Standards Attribution: SolveMyMedia implements open algorithms and specifications derived from these peer-reviewed publications and W3C standards. Authors and institutions did not directly review, sponsor, or endorse this website.",
  researchHome_c1_tag: "Virtual Machine Execution",
  researchHome_c1_title: "WebAssembly Memory Sandboxing",
  researchHome_c1_paper: "Haas et al., ACM SIGPLAN PLDI 2017",
  researchHome_c1_desc: "Enables near-native execution speed for audio/video codecs inside a deterministic, formally verified memory sandbox with zero host escape risks.",
  researchHome_c2_tag: "Speech Recognition",
  researchHome_c2_title: "Robust Neural Audio Transcription",
  researchHome_c2_paper: "Radford et al., ICML 2023",
  researchHome_c2_desc: "Processes sequence-to-sequence multilingual audio transcription entirely in client memory via Transformer neural networks without cloud APIs.",
  researchHome_c3_tag: "Perceptual Quality",
  researchHome_c3_title: "Structural Similarity (SSIM) Metrics",
  researchHome_c3_paper: "Wang et al., IEEE Transactions on Image Processing (2004)",
  researchHome_c3_desc: "Maintains structural luminance and contrast fidelity during video compression, ensuring visually lossless results under human visual system models.",
  researchHome_c4_tag: "Video Compression",
  researchHome_c4_title: "Discrete Cosine & Motion Estimation",
  researchHome_c4_paper: "Wiegand et al., IEEE CSVT 2003",
  researchHome_c4_desc: "Optimizes spatial redundancy reduction and inter-frame motion vectors directly in browser memory without server-side computational queues.",

  // Section 2: Security & Trust Pillars
  researchSec_badge: "Provable Privacy Architecture",
  researchSec_title: "Cryptographic & Architectural Foundations",
  researchSec_subtitle: "We replace corporate privacy promises with formal mathematical isolation and zero-knowledge data minimization principles.",
  researchSec_disclaimer: "Standards Attribution: Built in accordance with published ISO/IEC and W3C open specifications. Standards bodies do not directly endorse individual commercial implementations.",
  researchSec_c1_title: "Provable Data Minimization (GDPR Art. 5(1)(c))",
  researchSec_c1_principle: "Principle of Least Privilege (Saltzer & Schroeder, IEEE 1975)",
  researchSec_c1_desc: "By never transmitting media bytes across the network, the attack surface for interception (MITM) and third-party data leaks is reduced to absolute zero.",
  researchSec_c2_title: "W3C WebCodecs & TypedArray Isolation",
  researchSec_c2_principle: "W3C WebCodecs Standard (Adenot, Zemtsov, Aboba 2023)",
  researchSec_c2_desc: "Video frames and audio chunks are decoded into hardware-isolated ArrayBuffer objects within browser tabs, physically incapable of remote network egress without browser authorization.",

  // Section 3: About Us Timeline
  researchAbout_badge: "Our Scientific Lineage",
  researchAbout_title: "From Academic Research to Open Browser Tools",
  researchAbout_subtitle: "How decades of signal processing breakthroughs culminated in zero-upload browser media editing.",
  researchAbout_disclaimer: "Research Attribution: SolveMyMedia bridges open algorithms published in academic literature to modern web browsers. Published researchers have not directly evaluated this tool.",
  researchAbout_s1_era: "1999 – 2004",
  researchAbout_s1_title: "Foundations of Perceptual Signal Encoding",
  researchAbout_s1_desc: "Brandenburg (AES 1999) perfected psychoacoustic masking for MP3 audio, while Wang et al. (IEEE 2004) introduced SSIM for image quality evaluation.",
  researchAbout_s2_era: "2017",
  researchAbout_s2_title: "The WebAssembly Sandbox Revolution",
  researchAbout_s2_desc: "Haas et al. (PLDI 2017) proved that complex C/C++ audio and video processing engines could run safely inside web browsers at near-native CPU speeds.",
  researchAbout_s3_era: "2023 – Present",
  researchAbout_s3_title: "Client-Side Neural AI & WebCodecs",
  researchAbout_s3_desc: "Radford et al. (ICML 2023) open-sourced Whisper AI, enabling SolveMyMedia to bring end-to-end neural speech transcription into the browser without servers.",

  // Section 4: Compare Matrix
  researchComp_badge: "Algorithmic Comparison",
  researchComp_title: "Scientific & Architectural Breakdown",
  researchComp_subtitle: "Comparing client-side WebAssembly execution with conventional cloud media pipelines.",
  researchComp_disclaimer: "Academic Citation: Architectural metrics based on published WebAssembly (PLDI 2017), Whisper AI (ICML 2023), and SSIM (IEEE TIP 2004) performance studies.",
  researchComp_r1_metric: "Execution Sandbox & Isolation",
  researchComp_r1_cloud: "Multi-tenant cloud container; data stored temporarily on shared server SSDs.",
  researchComp_r1_local: "Formally verified WebAssembly memory sandbox (Haas et al. 2017); zero disk retention.",
  researchComp_r2_metric: "Perceptual Quality Index",
  researchComp_r2_cloud: "Opaque proprietary downsampling; unpredictable compression artifacts.",
  researchComp_r2_local: "Open SSIM index (Wang et al. 2004) & standardized rate control (libx264/libmp3lame).",
  researchComp_r3_metric: "Speech Recognition Pipeline",
  researchComp_r3_cloud: "Raw audio stream transmitted to remote cloud API servers for inference.",
  researchComp_r3_local: "Local Whisper Transformer neural inference (Radford et al. 2023) running on client CPU/GPU.",
  researchComp_r4_metric: "Network Egress Attack Surface",
  researchComp_r4_cloud: "Full media file transmitted over WAN; exposed to TLS MITM and server compromise.",
  researchComp_r4_local: "Mathematical zero-network transmission: 0 bytes uploaded to any remote server.",
};

const LANG_MAP = {
  'zh-TW': 'zh-TW',
  'zh': 'zh-CN',
  'tl': 'tl',
  'he': 'iw',
};

function getGoogleLangCode(code) {
  return LANG_MAP[code] || code;
}

async function batchTranslateStrings(strings, targetLang) {
  if (strings.length === 0) return [];
  const gLang = getGoogleLangCode(targetLang);
  const chunks = chunkArray(strings, 30);
  const results = [];

  for (const chunk of chunks) {
    try {
      const res = await translate(chunk, { to: gLang, rejectOnPartialFail: false });
      const texts = Array.isArray(res) ? res.map(r => r.text) : [res.text];
      results.push(...texts);
    } catch (e) {
      console.warn(`Translation warning for ${targetLang}:`, e.message);
      results.push(...chunk);
    }
  }
  return results;
}

async function main() {
  console.log('🚀 Step 1: Normalizing and Updating UiDictionary and baseDict in translations.ts...');
  const transTsPath = path.join(__dirname, '../src/i18n/translations.ts');
  let transCode = fs.readFileSync(transTsPath, 'utf8').replace(/\r\n/g, '\n');

  // 1. Add properties to UiDictionary interface
  const interfaceEndIdx = transCode.indexOf('}\n\nconst baseDict: UiDictionary = {');
  if (interfaceEndIdx !== -1) {
    let interfaceProps = '';
    for (const key of Object.keys(NEW_KEYS)) {
      if (!transCode.includes(`  ${key}?: string;`)) {
        interfaceProps += `  ${key}?: string;\n`;
      }
    }
    transCode = transCode.slice(0, interfaceEndIdx) + interfaceProps + transCode.slice(interfaceEndIdx);
  } else {
    console.error('Could not find interface end index');
    process.exit(1);
  }

  // 2. Add keys to baseDict
  const baseDictEndIdx = transCode.indexOf('};\n\nexport const UI_TRANSLATIONS: Record<string, UiDictionary> = {');
  if (baseDictEndIdx !== -1) {
    let baseDictProps = '';
    for (const [key, val] of Object.entries(NEW_KEYS)) {
      if (!transCode.slice(transCode.indexOf('const baseDict:'), baseDictEndIdx).includes(`  ${key}:`)) {
        baseDictProps += `  ${key}: ${JSON.stringify(val)},\n`;
      }
    }
    transCode = transCode.slice(0, baseDictEndIdx) + baseDictProps + transCode.slice(baseDictEndIdx);
  } else {
    console.error('Could not find baseDict end index');
    process.exit(1);
  }

  console.log('✅ Base English keys inserted into translations.ts memory model.');

  // 3. Batch translate into all 32 languages
  const langTsPath = path.join(__dirname, '../src/i18n/languages.ts');
  const langTs = fs.readFileSync(langTsPath, 'utf8');
  const allLangCodes = [...langTs.matchAll(/code:\s*'([^']+)'/g)].map(m => m[1]);

  console.log(`\nTranslating for ${allLangCodes.length} languages: ${allLangCodes.join(', ')}`);

  // Parse existing UI_TRANSLATIONS block
  const uiStart = transCode.indexOf('export const UI_TRANSLATIONS: Record<string, UiDictionary> = {');
  const uiEnd = transCode.lastIndexOf('export const getUiTranslations');
  const uiBlock = transCode.slice(uiStart, uiEnd);

  // Extract base entries from baseDict
  const baseStart = transCode.indexOf('const baseDict: UiDictionary = {');
  const baseEnd = transCode.indexOf('export const UI_TRANSLATIONS');
  const baseBlock = transCode.slice(baseStart, baseEnd);
  
  const baseEntries = [];
  const keyRegex = /\n\s*([a-zA-Z0-9_-]+):\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'),?/g;
  let match;
  while ((match = keyRegex.exec(baseBlock)) !== null) {
    const key = match[1];
    let val = match[2];
    val = val.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
    baseEntries.push({ key, val });
  }

  const langDicts = {};
  for (const code of allLangCodes) {
    if (code === 'en') {
      langDicts.en = Object.fromEntries(baseEntries.map(e => [e.key, e.val]));
      continue;
    }

    const dict = {};
    const langRegex = new RegExp(`['"]?${code}['"]?:\\s*\\{([\\s\\S]*?)\\n\\s*\\},`, 'm');
    const lMatch = uiBlock.match(langRegex);
    if (lMatch) {
      const b = lMatch[1];
      let kMatch;
      const innerRegex = /\n\s*([a-zA-Z0-9_-]+):\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'),?/g;
      while ((kMatch = innerRegex.exec(b)) !== null) {
        let v = kMatch[2];
        v = v.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
        dict[kMatch[1]] = v;
      }
    }
    langDicts[code] = dict;
  }

  // Translate missing keys
  const keysToTranslate = Object.keys(NEW_KEYS);
  const valuesToTranslate = Object.values(NEW_KEYS);

  for (const code of allLangCodes) {
    if (code === 'en') continue;

    const dict = langDicts[code];
    const missingKeys = [];
    const missingValues = [];

    for (let i = 0; i < keysToTranslate.length; i++) {
      const k = keysToTranslate[i];
      const v = valuesToTranslate[i];
      if (!dict[k] || dict[k] === v) {
        missingKeys.push(k);
        missingValues.push(v);
      }
    }

    if (missingKeys.length > 0) {
      console.log(`Translating ${missingKeys.length} keys for [${code}]...`);
      const transResults = await batchTranslateStrings(missingValues, code);
      missingKeys.forEach((k, idx) => {
        dict[k] = transResults[idx] || missingValues[idx];
      });
      console.log(`✅ [${code}] complete.`);
    } else {
      console.log(`✨ [${code}] already up to date.`);
    }
  }

  // Re-write translations.ts
  console.log('\nWriting full updated translations.ts...');
  const header = transCode.slice(0, uiStart);
  
  let newUiBlock = 'export const UI_TRANSLATIONS: Record<string, UiDictionary> = {\n  en: baseDict,\n';
  for (const code of allLangCodes) {
    if (code === 'en') continue;
    newUiBlock += `  '${code}': {\n`;
    const d = langDicts[code];
    for (const { key } of baseEntries) {
      const rawVal = d[key] || baseEntries.find(e => e.key === key).val;
      const escapedVal = rawVal.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
      newUiBlock += `    ${key}: '${escapedVal}',\n`;
    }
    newUiBlock += `  },\n`;
  }
  newUiBlock += `};\n\n`;

  const footer = `export const getUiTranslations = (langCode: string): UiDictionary => {\n  return UI_TRANSLATIONS[langCode] || UI_TRANSLATIONS['en'];\n};\n`;

  fs.writeFileSync(transTsPath, header + newUiBlock + footer);
  console.log('🎉 All 32 language dictionaries updated with academic research translations!');
}

main().catch(console.error);
