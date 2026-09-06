const fs = require('fs');
const path = require('path');
const { translate } = require('google-translate-api-x');

const translationsPath = path.join(__dirname, '../src/i18n/translations.ts');

const EN_FAQS = {
  compAFaq1Q: "Does compressing audio reduce sound quality?",
  compAFaq1A: "We use advanced perceptual audio encoding (VBR/CBR) to remove frequencies inaudible to human ears, keeping your podcasts, music, and voice notes crisp while shrinking file size.",
  compAFaq2Q: "Are my audio files uploaded to any server?",
  compAFaq2A: "Never. All audio compression is executed directly in your browser using local WebAssembly (FFmpeg WASM). Your voice recordings and tracks remain 100% private.",
  compAFaq3Q: "Which audio formats are supported for compression?",
  compAFaq3A: "You can compress MP3, WAV, AAC, M4A, FLAC, and OGG files easily without installing any software or plugins.",

  convAFaq1Q: "Can I convert WAV to MP3 without quality loss?",
  convAFaq1A: "Yes! You can choose high-bitrate MP3 presets (like 320kbps) to maintain maximum acoustic fidelity while achieving high compatibility across devices.",
  convAFaq2Q: "Is there a limit on file size for audio conversion?",
  convAFaq2A: "Since processing runs locally on your computer hardware, there are no artificial file size limits or paywalls. You can convert long audiobooks and high-res recordings.",
  convAFaq3Q: "Do I need an internet connection to convert audio?",
  convAFaq3A: "Once the page is loaded, the entire audio conversion engine runs completely offline inside your browser sandbox."
};

const LANG_MAP = {
  'zh': 'zh-CN',
  'zh-TW': 'zh-TW',
  'he': 'iw'
};

const ALL_LANGS = [
  'id', 'es', 'fr', 'de', 'ja', 'pt', 'ru', 'zh', 'zh-TW', 'ar', 'hi',
  'it', 'ko', 'nl', 'tr', 'pl', 'vi', 'th', 'sv', 'cs', 'da', 'el',
  'fi', 'he', 'hu', 'no', 'ro', 'sk', 'uk', 'ms', 'tl'
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
  console.log('Reading translations.ts...');
  let content = fs.readFileSync(translationsPath, 'utf8');
  const hadCrlf = content.includes('\r\n');
  content = content.replace(/\r\n/g, '\n');

  // 1. Add to UiDictionary interface if not already present
  if (!content.includes('compAFaq1Q?: string;')) {
    const target = '  caPrivDesc?: string;\n';
    const addition = '  caPrivDesc?: string;\n' +
      '  compAFaq1Q?: string;\n' +
      '  compAFaq1A?: string;\n' +
      '  compAFaq2Q?: string;\n' +
      '  compAFaq2A?: string;\n' +
      '  compAFaq3Q?: string;\n' +
      '  compAFaq3A?: string;\n';
    content = content.replace(target, addition);
  }

  if (!content.includes('convAFaq1Q?: string;')) {
    const target = '  cvaPrivDesc?: string;\n';
    const addition = '  cvaPrivDesc?: string;\n' +
      '  convAFaq1Q?: string;\n' +
      '  convAFaq1A?: string;\n' +
      '  convAFaq2Q?: string;\n' +
      '  convAFaq2A?: string;\n' +
      '  convAFaq3Q?: string;\n' +
      '  convAFaq3A?: string;\n';
    content = content.replace(target, addition);
  }

  // 2. Add to baseDict (English)
  if (!content.includes('compAFaq1Q: "Does compressing audio reduce sound quality?",')) {
    const target = '  caPrivDesc: "Your audio files never leave your computer. We process everything locally so your private recordings remain strictly confidential.",\n';
    const addition = target +
      `  compAFaq1Q: ${JSON.stringify(EN_FAQS.compAFaq1Q)},\n` +
      `  compAFaq1A: ${JSON.stringify(EN_FAQS.compAFaq1A)},\n` +
      `  compAFaq2Q: ${JSON.stringify(EN_FAQS.compAFaq2Q)},\n` +
      `  compAFaq2A: ${JSON.stringify(EN_FAQS.compAFaq2A)},\n` +
      `  compAFaq3Q: ${JSON.stringify(EN_FAQS.compAFaq3Q)},\n` +
      `  compAFaq3A: ${JSON.stringify(EN_FAQS.compAFaq3A)},\n`;
    content = content.replace(target, addition);
  }

  if (!content.includes('convAFaq1Q: "Can I convert WAV to MP3 without quality loss?",')) {
    const target = '  cvaPrivDesc: "Your media is never uploaded. Period.",\n';
    const addition = target +
      `  convAFaq1Q: ${JSON.stringify(EN_FAQS.convAFaq1Q)},\n` +
      `  convAFaq1A: ${JSON.stringify(EN_FAQS.convAFaq1A)},\n` +
      `  convAFaq2Q: ${JSON.stringify(EN_FAQS.convAFaq2Q)},\n` +
      `  convAFaq2A: ${JSON.stringify(EN_FAQS.convAFaq2A)},\n` +
      `  convAFaq3Q: ${JSON.stringify(EN_FAQS.convAFaq3Q)},\n` +
      `  convAFaq3A: ${JSON.stringify(EN_FAQS.convAFaq3A)},\n`;
    content = content.replace(target, addition);
  }

  fs.writeFileSync(translationsPath, hadCrlf ? content.replace(/\n/g, '\r\n') : content, 'utf8');
  console.log('Ensured UiDictionary and baseDict definitions.');

  const faqKeys = Object.keys(EN_FAQS);
  const faqValues = Object.values(EN_FAQS);

  for (let i = 0; i < ALL_LANGS.length; i++) {
    const lang = ALL_LANGS[i];
    const targetCode = LANG_MAP[lang] || lang;
    
    // Check if already injected
    content = fs.readFileSync(translationsPath, 'utf8').replace(/\r\n/g, '\n');
    const langRegex = new RegExp(`(\\n\\s{2}['"]?${lang}['"]?:\\s*\\{[\\s\\S]*?\\n\\s{2}\\},)`);
    const match = content.match(langRegex);

    if (!match) {
      console.error(`Could not find language block for ${lang}!`);
      continue;
    }

    let langBlock = match[1];
    if (langBlock.includes('compAFaq1Q:')) {
      console.log(`[${i + 1}/${ALL_LANGS.length}] FAQs already present for ${lang}`);
      continue;
    }

    console.log(`[${i + 1}/${ALL_LANGS.length}] Translating array for ${lang} (${targetCode})...`);

    let translatedValues = [];
    let attempts = 0;
    let success = false;
    while (attempts < 3 && !success) {
      try {
        const res = await translate(faqValues, { to: targetCode });
        translatedValues = Array.isArray(res) ? res.map(r => r.text) : [res.text];
        if (translatedValues.length === faqValues.length) {
          success = true;
        } else {
          throw new Error(`Length mismatch: expected ${faqValues.length}, got ${translatedValues.length}`);
        }
      } catch (err) {
        attempts++;
        console.warn(`Retry ${attempts} for ${lang}: ${err.message}`);
        await sleep(600 * attempts);
      }
    }

    if (!success) {
      console.error(`Failed array translation for ${lang}, falling back to single items`);
      translatedValues = [];
      for (const text of faqValues) {
        try {
          const res = await translate(text, { to: targetCode });
          translatedValues.push(res.text);
          await sleep(50);
        } catch (e) {
          translatedValues.push(text);
        }
      }
    }

    const translatedObj = {};
    faqKeys.forEach((key, idx) => {
      translatedObj[key] = translatedValues[idx] || EN_FAQS[key];
    });

    const injectionLines = Object.entries(translatedObj)
      .map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`)
      .join('\n');

    const lastBraceIdx = langBlock.lastIndexOf('\n  },');
    if (lastBraceIdx !== -1) {
      const newBlock = langBlock.slice(0, lastBraceIdx) + '\n' + injectionLines + langBlock.slice(lastBraceIdx);
      content = content.replace(langBlock, newBlock);
      fs.writeFileSync(translationsPath, hadCrlf ? content.replace(/\n/g, '\r\n') : content, 'utf8');
      console.log(`  -> Successfully injected 12 FAQ keys for ${lang}`);
    }
    await sleep(200);
  }

  console.log('ALL 32 LANGUAGES FAQ TRANSLATION COMPLETED!');
}

main().catch(console.error);
