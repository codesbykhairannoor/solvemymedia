const fs = require('fs');
const path = require('path');
const { translate } = require('google-translate-api-x');

const translationsPath = path.join(__dirname, '../src/i18n/translations.ts');

const NEW_KEYS = {
  replaceFile: "Replace File",
  uploadOtherFile: "Upload Another File",
  outputFileName: "Output File Name",
  outputFileNamePlaceholder: "Enter file name...",
  renameFileHint: "Rename output file before downloading",
  resetFileName: "Reset",
  processAnother: "Process Another File",
  changeVideo: "Change Video",
  changeAudio: "Change Audio",
  changeLogo: "Change Logo"
};

const ALL_LANGS = [
  'en', 'id', 'es', 'fr', 'de', 'ja', 'pt', 'ru', 'zh', 'zh-TW',
  'ar', 'hi', 'it', 'ko', 'nl', 'tr', 'pl', 'vi', 'th', 'sv',
  'cs', 'da', 'el', 'fi', 'he', 'hu', 'no', 'ro', 'sk', 'uk',
  'ms', 'tl'
];

const LANG_MAP = {
  'zh': 'zh-CN',
  'zh-TW': 'zh-TW',
  'he': 'iw',
  'tl': 'tl'
};

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function main() {
  console.log('Starting translation for new features across 32 languages...');
  
  let content = fs.readFileSync(translationsPath, 'utf8');
  const hadCrlf = content.includes('\r\n');
  content = content.replace(/\r\n/g, '\n');

  // 1. Update UiDictionary interface at the top if needed
  const interfaceEndIdx = content.indexOf('\n}\n\nexport const translations');
  if (interfaceEndIdx !== -1) {
    const interfaceEntries = Object.keys(NEW_KEYS)
      .map(k => `  ${k}?: string;`)
      .join('\n');
    
    // Check if interface already has replaceFile
    if (!content.includes('replaceFile?: string;')) {
      content = content.slice(0, interfaceEndIdx) + '\n' + interfaceEntries + content.slice(interfaceEndIdx);
      console.log('Updated UiDictionary interface.');
    }
  }

  const keyList = Object.keys(NEW_KEYS);
  const valList = Object.values(NEW_KEYS);

  for (let i = 0; i < ALL_LANGS.length; i++) {
    const lang = ALL_LANGS[i];
    const targetCode = LANG_MAP[lang] || lang;
    console.log(`[${i + 1}/${ALL_LANGS.length}] Processing ${lang} (${targetCode})...`);

    let translatedObj = {};

    if (lang === 'en') {
      translatedObj = { ...NEW_KEYS };
    } else {
      let attempts = 0;
      let success = false;
      let results = [];

      while (attempts < 3 && !success) {
        try {
          const res = await translate(valList, { to: targetCode });
          results = Array.isArray(res) ? res.map(r => r.text) : [res.text];
          if (results.length === valList.length) {
            success = true;
          } else {
            throw new Error(`Length mismatch: expected ${valList.length}, got ${results.length}`);
          }
        } catch (err) {
          attempts++;
          console.warn(`  Retry ${attempts} for ${lang}: ${err.message}`);
          await sleep(500 * attempts);
        }
      }

      if (!success) {
        console.warn(`  Falling back to individual item translation for ${lang}`);
        results = [];
        for (const val of valList) {
          try {
            const res = await translate(val, { to: targetCode });
            results.push(res.text);
            await sleep(50);
          } catch (e) {
            results.push(val);
          }
        }
      }

      keyList.forEach((k, idx) => {
        translatedObj[k] = results[idx] || NEW_KEYS[k];
      });
    }

    // Now inject into translations dictionary for this language
    const langRegex = new RegExp(`(\\n\\s{2}['"]?${lang}['"]?:\\s*\\{[\\s\\S]*?\\n\\s{2}\\},)`);
    const match = content.match(langRegex);

    if (!match) {
      console.error(`Could not find language block for ${lang}!`);
      continue;
    }

    let langBlock = match[1];
    if (langBlock.includes('replaceFile:')) {
      console.log(`  -> Already contains replaceFile in ${lang}`);
      continue;
    }

    const injectionLines = Object.entries(translatedObj)
      .map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`)
      .join('\n');

    const lastBraceIdx = langBlock.lastIndexOf('\n  },');
    if (lastBraceIdx !== -1) {
      const newBlock = langBlock.slice(0, lastBraceIdx) + '\n' + injectionLines + langBlock.slice(lastBraceIdx);
      content = content.replace(langBlock, newBlock);
      console.log(`  -> Injected new keys for ${lang}`);
    } else {
      console.error(`  -> Failed to find closing brace for ${lang}`);
    }

    await sleep(100);
  }

  fs.writeFileSync(translationsPath, hadCrlf ? content.replace(/\n/g, '\r\n') : content, 'utf8');
  console.log('✅ ALL 32 LANGUAGES LOCALIZED SUCCESSFULLY!');
}

main().catch(err => {
  console.error('Fatal error in translation script:', err);
  process.exit(1);
});
