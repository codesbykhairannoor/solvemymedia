const fs = require('fs');
const path = require('path');
const translate = require('google-translate-api-x');

const DB_PATH = path.join(__dirname, '../src/data/pseo-long-tail-translations.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const LANGS = Object.keys(db).filter(l => l !== 'en');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function gtx(text, target) {
  if (!text || typeof text !== 'string' || text.trim() === '') return text;
  try {
    const res = await translate(text, { to: target, rejectOnPartialFail: false });
    return res.text;
  } catch (err) {
    await sleep(2000);
    try {
      const res2 = await translate(text, { to: target, rejectOnPartialFail: false });
      return res2.text;
    } catch (e) {
      return text;
    }
  }
}

async function fixArray(enArr, langArr, lang) {
  if (!langArr) langArr = [];
  const promises = [];
  for (let i = 0; i < enArr.length; i++) {
    if (typeof enArr[i] === 'string') {
      if (!langArr[i] || langArr[i] === enArr[i]) {
        promises.push(
          gtx(enArr[i], lang).then(res => {
            langArr[i] = res;
          })
        );
      }
    }
  }
  await Promise.all(promises);
  return langArr;
}

async function processLang(lang, enEntries) {
  let changed = false;
  const promises = [];
  
  for (const enEntry of enEntries) {
    if (!enEntry.bespokeData) continue;
    
    const idx = db[lang].findIndex(e => e.path === enEntry.path);
    if (idx < 0) continue;
    const langEntry = db[lang][idx];
    if (!langEntry.bespokeData) langEntry.bespokeData = {};
    
    for (const [k, v] of Object.entries(enEntry.bespokeData)) {
      if (typeof v === 'string') {
        if (!langEntry.bespokeData[k] || langEntry.bespokeData[k] === v) {
           promises.push(
             gtx(v, lang).then(res => {
               langEntry.bespokeData[k] = res;
               changed = true;
             })
           );
        }
      } else if (Array.isArray(v)) {
        promises.push(
          fixArray(v, langEntry.bespokeData[k], lang).then(resArr => {
            const oldStr = JSON.stringify(langEntry.bespokeData[k]);
            langEntry.bespokeData[k] = resArr;
            if (JSON.stringify(resArr) !== oldStr) changed = true;
          })
        );
      }
    }
  }
  
  await Promise.all(promises);
  if (changed) console.log(`[DONE] ${lang}`);
  return changed;
}

async function main() {
  console.log('Starting parallel translation...');
  const enEntries = db['en'] || [];
  
  const langPromises = LANGS.map(lang => processLang(lang, enEntries));
  const results = await Promise.all(langPromises);
  
  if (results.some(r => r)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
    console.log('✅ Parallel translation complete and saved!');
  } else {
    console.log('✅ Everything is already fully translated.');
  }
}

main().catch(console.error);
