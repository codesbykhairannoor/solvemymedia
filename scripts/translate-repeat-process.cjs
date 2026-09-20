const fs = require('fs');
const path = require('path');
const translate = require('google-translate-api-x');

const TRANSLATIONS_FILE = path.join(__dirname, '../src/i18n/translations.ts');

const LANG_MAP = {
  id: 'id',
  es: 'es',
  fr: 'fr',
  de: 'de',
  ja: 'ja',
  pt: 'pt',
  ru: 'ru',
  zh: 'zh-CN',
  'zh-TW': 'zh-TW',
  ar: 'ar',
  hi: 'hi',
  it: 'it',
  ko: 'ko',
  nl: 'nl',
  tr: 'tr',
  pl: 'pl',
  vi: 'vi',
  th: 'th',
  sv: 'sv',
  cs: 'cs',
  da: 'da',
  el: 'el',
  fi: 'fi',
  he: 'iw',
  hu: 'hu',
  no: 'no',
  ro: 'ro',
  sk: 'sk',
  uk: 'uk',
  ms: 'ms',
  tl: 'tl'
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateText(text, targetLang) {
  try {
    const res = await translate(text, { to: targetLang });
    return res.text;
  } catch (err) {
    await sleep(1000);
    try {
      const res2 = await translate(text, { to: targetLang });
      return res2.text;
    } catch (e) {
      console.warn(`Translation failed for ${targetLang}:`, e.message);
      return text;
    }
  }
}

async function main() {
  console.log('Translating repeatProcess across all 32 languages...');
  
  const translations = {
    en: 'Repeat Process',
    id: 'Ulangi Proses'
  };

  for (const [langCode, gtxLang] of Object.entries(LANG_MAP)) {
    if (langCode === 'id') continue;
    process.stdout.write(`Translating ${langCode}... `);
    const translated = await translateText('Repeat Process', gtxLang);
    translations[langCode] = translated;
    console.log(`"${translated}"`);
    await sleep(200);
  }

  console.log('\nAll translations obtained:');
  console.log(translations);

  let fileContent = fs.readFileSync(TRANSLATIONS_FILE, 'utf8');

  // 1. Add repeatProcess?: string; to UiDictionary interface if not present
  if (!fileContent.includes('repeatProcess?: string;')) {
    fileContent = fileContent.replace(
      'processAnother?: string;',
      'processAnother?: string;\n  repeatProcess?: string;'
    );
  }

  // 2. Add to baseDict (English)
  if (!fileContent.includes('repeatProcess: "Repeat Process"')) {
    fileContent = fileContent.replace(
      'processAnother: "Process Another File",',
      'processAnother: "Process Another File",\n  repeatProcess: "Repeat Process",'
    );
  }

  // 3. Add to each language dictionary
  for (const [langCode, val] of Object.entries(translations)) {
    if (langCode === 'en') continue;

    const escapedVal = val.replace(/"/g, '\\"');
    const regex = new RegExp(`(${langCode}:\\s*\\{[\\s\\S]*?processAnother:\\s*"[^"]*",)`, 'm');
    
    // Check if repeatProcess already exists in this language block
    const langBlockRegex = new RegExp(`${langCode}:\\s*\\{[\\s\\S]*?repeatProcess:`, 'm');
    if (!langBlockRegex.test(fileContent)) {
      fileContent = fileContent.replace(
        regex,
        `$1\n    repeatProcess: "${escapedVal}",`
      );
    }
  }

  fs.writeFileSync(TRANSLATIONS_FILE, fileContent, 'utf8');
  console.log('\n✅ Successfully injected repeatProcess into all 32 languages in translations.ts!');
}

main().catch(console.error);
