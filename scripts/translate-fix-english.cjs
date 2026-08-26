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
    console.log(`[API ERROR] ${err.message}. Retrying in 5 seconds...`);
    await sleep(5000);
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
  for (let i = 0; i < enArr.length; i++) {
    if (typeof enArr[i] === 'string') {
      if (!langArr[i] || langArr[i] === enArr[i]) {
        process.stdout.write(`    [TR-ARR] ${lang}: ${enArr[i].substring(0,20)}... `);
        langArr[i] = await gtx(enArr[i], lang);
        console.log(`-> ${langArr[i].substring(0,20)}`);
        await sleep(100);
      }
    }
  }
  return langArr;
}

async function main() {
  const enEntries = db['en'] || [];
  let totalFixed = 0;
  
  for (const lang of LANGS) {
    let changed = false;
    
    for (const enEntry of enEntries) {
      if (!enEntry.bespokeData) continue;
      
      const idx = db[lang].findIndex(e => e.path === enEntry.path);
      if (idx < 0) continue;
      const langEntry = db[lang][idx];
      if (!langEntry.bespokeData) langEntry.bespokeData = {};
      
      for (const [k, v] of Object.entries(enEntry.bespokeData)) {
        if (typeof v === 'string') {
          if (!langEntry.bespokeData[k] || langEntry.bespokeData[k] === v) {
             process.stdout.write(`  [TR-STR] ${lang} [${k}]: ${v.substring(0,20)}... `);
             langEntry.bespokeData[k] = await gtx(v, lang);
             console.log(`-> ${langEntry.bespokeData[k].substring(0,20)}`);
             changed = true;
             totalFixed++;
             await sleep(100);
          }
        } else if (Array.isArray(v)) {
          const oldArrStr = JSON.stringify(langEntry.bespokeData[k]);
          langEntry.bespokeData[k] = await fixArray(v, langEntry.bespokeData[k], lang);
          if (JSON.stringify(langEntry.bespokeData[k]) !== oldArrStr) {
            changed = true;
            totalFixed++;
          }
        }
      }
    }
    
    if (changed) {
      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
    }
  }
  console.log(`\n✅ Done! Successfully translated ${totalFixed} items that were stuck in English.`);
}

main().catch(console.error);
