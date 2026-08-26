/**
 * translate-longtail-bespoke.cjs
 * Translates all bespokeData strings in pseo-long-tail-translations.json
 * from English to all 30 supported languages.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const DB_PATH = path.join(__dirname, '../src/data/pseo-long-tail-translations.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

const LANGS = [
  'id','es','fr','de','it','pt','nl','pl','ru',
  'ja','ko','zh','zh-TW','tr','vi','th','ar','hi','sv',
  'no','da','fi','cs','hu','el','ro','uk','ms','tl','he'
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function gtx(text, target) {
  return new Promise((resolve) => {
    if (!text || typeof text !== 'string' || text.trim() === '') {
      resolve(text);
      return;
    }
    const encoded = encodeURIComponent(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encoded}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const translated = parsed[0].map(x => x[0]).join('');
          resolve(translated);
        } catch {
          resolve(text);
        }
      });
    }).on('error', () => resolve(text));
  });
}

async function translateBespokeData(bespoke, lang) {
  if (!bespoke) return bespoke;
  const result = {};
  for (const [key, value] of Object.entries(bespoke)) {
    if (typeof value === 'string') {
      result[key] = await gtx(value, lang);
      await sleep(120);
    } else if (Array.isArray(value)) {
      result[key] = [];
      for (const item of value) {
        if (typeof item === 'string') {
          result[key].push(await gtx(item, lang));
          await sleep(120);
        } else if (typeof item === 'object' && item !== null) {
          const translatedItem = {};
          for (const [k, v] of Object.entries(item)) {
            translatedItem[k] = typeof v === 'string' ? await gtx(v, lang) : v;
            await sleep(120);
          }
          result[key].push(translatedItem);
        } else {
          result[key].push(item);
        }
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}

async function translateDynamicSection(dynSection, lang) {
  if (!dynSection) return dynSection;
  const result = { ...dynSection };
  if (dynSection.heading) {
    result.heading = await gtx(dynSection.heading, lang);
    await sleep(120);
  }
  if (Array.isArray(dynSection.items)) {
    result.items = [];
    for (const item of dynSection.items) {
      const tItem = { ...item };
      if (item.title) { tItem.title = await gtx(item.title, lang); await sleep(120); }
      if (item.content) { tItem.content = await gtx(item.content, lang); await sleep(120); }
      result.items.push(tItem);
    }
  }
  return result;
}

async function main() {
  const enEntries = db['en'] || [];
  console.log(`Found ${enEntries.length} EN entries to process.`);

  for (const lang of LANGS) {
    console.log(`\n=== Processing lang: ${lang} ===`);
    if (!db[lang]) db[lang] = [];

    for (const enEntry of enEntries) {
      // Find matching entry for this lang by path
      const idx = db[lang].findIndex(e => e.path === enEntry.path);
      const langEntry = idx >= 0 ? db[lang][idx] : null;

      if (!langEntry) {
        console.log(`  [SKIP] No entry found for ${lang}:${enEntry.path}`);
        continue;
      }

      // Translate bespokeData if missing or empty
      if (enEntry.bespokeData && (!langEntry.bespokeData || Object.keys(langEntry.bespokeData).length === 0)) {
        console.log(`  [TRANSLATE bespokeData] ${lang}:${enEntry.path}`);
        langEntry.bespokeData = await translateBespokeData(enEntry.bespokeData, lang);
        db[lang][idx] = langEntry;
        // Save after each entry to avoid losing progress
        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
      } else if (enEntry.bespokeData) {
        console.log(`  [SKIP bespokeData already exists] ${lang}:${enEntry.path}`);
      }

      // Translate dynamicSection if missing
      if (enEntry.dynamicSection && (!langEntry.dynamicSection)) {
        console.log(`  [TRANSLATE dynamicSection] ${lang}:${enEntry.path}`);
        langEntry.dynamicSection = await translateDynamicSection(enEntry.dynamicSection, lang);
        db[lang][idx] = langEntry;
        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
      }
    }
  }

  console.log('\n✅ Translation complete! Saving final file...');
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  console.log('Done.');
}

main().catch(console.error);
