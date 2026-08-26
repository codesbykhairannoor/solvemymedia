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

async function fixArray(enArr, lang) {
  const langArr = [];
  const promises = [];
  for (let i = 0; i < enArr.length; i++) {
    if (typeof enArr[i] === 'string') {
      promises.push(
        gtx(enArr[i], lang).then(res => {
          langArr[i] = res;
        })
      );
    } else {
      langArr[i] = enArr[i];
    }
  }
  await Promise.all(promises);
  return langArr;
}

async function processLang(lang, enEntries) {
  const promises = [];
  
  for (const enEntry of enEntries) {
    if (!enEntry.bespokeData) continue;
    
    const idx = db[lang].findIndex(e => e.path === enEntry.path);
    if (idx < 0) continue;
    const langEntry = db[lang][idx];
    
    // FORCE CLEAR bespokeData and translate from EN to guarantee correctness
    langEntry.bespokeData = {};
    
    for (const [k, v] of Object.entries(enEntry.bespokeData)) {
      if (typeof v === 'string') {
        promises.push(
          gtx(v, lang).then(res => {
            langEntry.bespokeData[k] = res;
          })
        );
      } else if (Array.isArray(v)) {
        promises.push(
          fixArray(v, lang).then(resArr => {
            langEntry.bespokeData[k] = resArr;
          })
        );
      }
    }
  }
  
  await Promise.all(promises);
  console.log(`[DONE] ${lang}`);
  return true;
}

async function main() {
  console.log('Starting parallel FORCE translation for bespokeData...');
  const enEntries = db['en'] || [];
  
  const langPromises = LANGS.map(lang => processLang(lang, enEntries));
  await Promise.all(langPromises);
  
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  console.log('✅ Parallel force translation complete and saved!');
}

main().catch(console.error);
