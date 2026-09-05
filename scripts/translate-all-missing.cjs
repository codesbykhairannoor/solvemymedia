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

// Map project language codes to google-translate-api-x language codes
const LANG_MAP = {
  'zh-TW': 'zh-TW',
  'zh': 'zh-CN',
  'tl': 'tl',
  'he': 'iw', // Google translate uses iw or he
};

function getGoogleLangCode(code) {
  return LANG_MAP[code] || code;
}

async function batchTranslateStrings(strings, targetLang) {
  if (strings.length === 0) return [];
  const gLang = getGoogleLangCode(targetLang);
  const chunks = chunkArray(strings, 40);
  const results = [];

  for (const chunk of chunks) {
    try {
      const res = await translate(chunk, { to: gLang, rejectOnPartialFail: false });
      const texts = Array.isArray(res) ? res.map(r => r.text) : [res.text];
      results.push(...texts);
    } catch (e) {
      console.warn(`Translation warning for ${targetLang}:`, e.message);
      // Fallback to original
      results.push(...chunk);
    }
  }
  return results;
}

async function run() {
  console.log('🚀 Starting Google Translate API X Batch Translation...\n');

  // 1. Load translations.ts
  const transTsPath = path.join(__dirname, '../src/i18n/translations.ts');
  const transCode = fs.readFileSync(transTsPath, 'utf8');

  // Extract baseDict
  const baseStart = transCode.indexOf('const baseDict: UiDictionary = {');
  const baseEnd = transCode.indexOf('const UI_TRANSLATIONS');
  const baseBlock = transCode.slice(baseStart, baseEnd);
  
  // Parse baseDict key-value pairs
  const baseEntries = [];
  const keyRegex = /\n\s*([a-zA-Z0-9_-]+):\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'),?/g;
  let match;
  while ((match = keyRegex.exec(baseBlock)) !== null) {
    const key = match[1];
    let val = match[2];
    // Unquote
    val = val.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
    baseEntries.push({ key, val });
  }

  console.log(`Loaded ${baseEntries.length} base English keys from translations.ts.`);

  // Load existing UI_TRANSLATIONS
  const uiStart = transCode.indexOf('const UI_TRANSLATIONS: Record<string, UiDictionary> = {');
  const uiEnd = transCode.lastIndexOf('export const getUiTranslations');
  const uiBlock = transCode.slice(uiStart, uiEnd);

  // Extract all 32 languages from languages.ts
  const langTsPath = path.join(__dirname, '../src/i18n/languages.ts');
  const langTs = fs.readFileSync(langTsPath, 'utf8');
  const allLangCodes = [...langTs.matchAll(/code:\s*'([^']+)'/g)].map(m => m[1]);

  console.log(`Target languages (${allLangCodes.length}): ${allLangCodes.join(', ')}\n`);

  // Parse existing language dictionaries
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

  // 2. Translate missing keys for each language
  for (const code of allLangCodes) {
    if (code === 'en') continue;

    const dict = langDicts[code];
    const missingKeys = [];
    const missingValues = [];

    for (const { key, val } of baseEntries) {
      if (!dict[key] || dict[key] === val) {
        missingKeys.push(key);
        missingValues.push(val);
      }
    }

    if (missingKeys.length > 0) {
      console.log(`Translating ${missingKeys.length} missing keys for [${code}]...`);
      const translatedValues = await batchTranslateStrings(missingValues, code);
      missingKeys.forEach((k, idx) => {
        dict[k] = translatedValues[idx] || missingValues[idx];
      });
      console.log(`✅ [${code}] now has ${Object.keys(dict).length} keys complete.`);
    } else {
      console.log(`✨ [${code}] already 100% complete (${Object.keys(dict).length} keys).`);
    }
  }

  // 3. Reconstruct src/i18n/translations.ts with all 32 language dictionaries
  console.log('\nWriting updated translations.ts...');
  const header = transCode.slice(0, uiStart);
  
  let newUiBlock = 'const UI_TRANSLATIONS: Record<string, UiDictionary> = {\n  en: baseDict,\n';
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
  console.log('✅ translations.ts updated successfully with 32 full language dictionaries!');

  // 4. Also update pseo-long-tail-translations.json for missing strings
  const pseoDbPath = path.join(__dirname, '../src/data/pseo-long-tail-translations.json');
  if (fs.existsSync(pseoDbPath)) {
    console.log('\nChecking pseo-long-tail-translations.json for untranslated content...');
    const pseoDb = JSON.parse(fs.readFileSync(pseoDbPath, 'utf8'));
    const enItems = pseoDb.en;

    for (const code of allLangCodes) {
      if (code === 'en') continue;
      if (!pseoDb[code]) {
        pseoDb[code] = JSON.parse(JSON.stringify(enItems));
      }

      const langItems = pseoDb[code];
      const untranslatedTexts = [];
      const mapping = [];

      langItems.forEach((item, itemIdx) => {
        // Check faqs
        if (item.faqs) {
          item.faqs.forEach((faq, faqIdx) => {
            const enFaq = enItems[itemIdx] && enItems[itemIdx].faqs && enItems[itemIdx].faqs[faqIdx];
            if (enFaq && (faq.q === enFaq.q || faq.a === enFaq.a)) {
              untranslatedTexts.push(enFaq.q, enFaq.a);
              mapping.push({ itemIdx, type: 'faq', faqIdx });
            }
          });
        }
        // Check bento
        if (item.bentoSections) {
          item.bentoSections.forEach((bento, bentoIdx) => {
            const enBento = enItems[itemIdx] && enItems[itemIdx].bentoSections && enItems[itemIdx].bentoSections[bentoIdx];
            if (enBento && bento.data && enBento.data && (bento.data.title === enBento.data.title || bento.data.description === enBento.data.description)) {
              if (enBento.data.title) {
                untranslatedTexts.push(enBento.data.title);
                mapping.push({ itemIdx, type: 'bento_title', bentoIdx });
              }
              if (enBento.data.description) {
                untranslatedTexts.push(enBento.data.description);
                mapping.push({ itemIdx, type: 'bento_desc', bentoIdx });
              }
            }
          });
        }
      });

      if (untranslatedTexts.length > 0) {
        console.log(`Translating ${untranslatedTexts.length} pSEO items for [${code}]...`);
        const translated = await batchTranslateStrings(untranslatedTexts, code);
        let tIdx = 0;
        mapping.forEach(m => {
          const item = langItems[m.itemIdx];
          if (m.type === 'faq') {
            item.faqs[m.faqIdx].q = translated[tIdx++] || item.faqs[m.faqIdx].q;
            item.faqs[m.faqIdx].a = translated[tIdx++] || item.faqs[m.faqIdx].a;
          } else if (m.type === 'bento_title') {
            item.bentoSections[m.bentoIdx].data.title = translated[tIdx++] || item.bentoSections[m.bentoIdx].data.title;
          } else if (m.type === 'bento_desc') {
            item.bentoSections[m.bentoIdx].data.description = translated[tIdx++] || item.bentoSections[m.bentoIdx].data.description;
          }
        });
        console.log(`✅ [${code}] pSEO data fully translated.`);
      }
    }

    fs.writeFileSync(pseoDbPath, JSON.stringify(pseoDb, null, 2));
    console.log('✅ pseo-long-tail-translations.json updated successfully!');
  }

  console.log('\n🎉 ALL TRANSLATIONS COMPLETED WITH GOOGLE TRANSLATE API X!');
}

run().catch(console.error);
