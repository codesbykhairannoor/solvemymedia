const fs = require('fs');
const path = require('path');
const translate = require('google-translate-api-x');

const DB_PATH = path.join(__dirname, '../src/data/pseo-long-tail-translations.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const LANGS = Object.keys(db).filter(l => l !== 'en');

async function processLang(lang, enEntries) {
  console.log(`Processing ${lang}...`);
  const stringsToTranslate = [];
  const mapData = [];

  for (const enEntry of enEntries) {
    if (!enEntry.bespokeData) continue;
    
    const idx = db[lang].findIndex(e => e.path === enEntry.path);
    if (idx < 0) continue;
    
    // Clear bespokeData
    db[lang][idx].bespokeData = {};

    for (const [k, v] of Object.entries(enEntry.bespokeData)) {
      if (typeof v === 'string') {
        mapData.push({ idx, key: k, type: 'string' });
        stringsToTranslate.push(v);
      } else if (Array.isArray(v)) {
        v.forEach((item, arrIdx) => {
          mapData.push({ idx, key: k, type: 'array', arrIdx });
          stringsToTranslate.push(item);
        });
      }
    }
  }

  if (stringsToTranslate.length === 0) return;

  try {
    const res = await translate(stringsToTranslate, { to: lang, rejectOnPartialFail: false });
    
    res.forEach((r, i) => {
      const meta = mapData[i];
      const translatedText = r.text;
      const langEntry = db[lang][meta.idx];

      if (meta.type === 'string') {
        langEntry.bespokeData[meta.key] = translatedText;
      } else if (meta.type === 'array') {
        if (!langEntry.bespokeData[meta.key]) {
          langEntry.bespokeData[meta.key] = [];
        }
        langEntry.bespokeData[meta.key][meta.arrIdx] = translatedText;
      }
    });
    console.log(`[DONE] ${lang}`);
  } catch (err) {
    console.error(`[ERROR] ${lang}: ${err.message}`);
  }
}

async function main() {
  console.log('Starting BATCHED translation for all languages...');
  const enEntries = db['en'] || [];
  
  for (const lang of LANGS) {
    await processLang(lang, enEntries);
    await new Promise(r => setTimeout(r, 1000));
  }
  
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  console.log('✅ Batched translation complete and saved!');
}

main().catch(console.error);
