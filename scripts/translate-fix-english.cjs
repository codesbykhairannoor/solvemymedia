const fs = require('fs');
const path = require('path');
const https = require('https');

const DB_PATH = path.join(__dirname, '../src/data/pseo-long-tail-translations.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const LANGS = Object.keys(db).filter(l => l !== 'en');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function gtx(text, target) {
  return new Promise((resolve) => {
    if (!text || typeof text !== 'string' || text.trim() === '') return resolve(text);
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
        } catch { resolve(text); }
      });
    }).on('error', () => resolve(text));
  });
}

async function fixArray(enArr, langArr, lang) {
  if (!langArr) langArr = [];
  for (let i = 0; i < enArr.length; i++) {
    if (typeof enArr[i] === 'string') {
      if (!langArr[i] || langArr[i] === enArr[i]) {
        console.log(`    [RE-TRANSLATE array item] ${enArr[i]}`);
        langArr[i] = await gtx(enArr[i], lang);
        await sleep(150);
      }
    }
  }
  return langArr;
}

async function main() {
  const enEntries = db['en'] || [];
  
  for (const lang of LANGS) {
    console.log(`\n=== Fixing lang: ${lang} ===`);
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
             console.log(`  [RE-TRANSLATE ${k}] ${v}`);
             langEntry.bespokeData[k] = await gtx(v, lang);
             changed = true;
             await sleep(150);
          }
        } else if (Array.isArray(v)) {
          const oldArrStr = JSON.stringify(langEntry.bespokeData[k]);
          langEntry.bespokeData[k] = await fixArray(v, langEntry.bespokeData[k], lang);
          if (JSON.stringify(langEntry.bespokeData[k]) !== oldArrStr) changed = true;
        }
      }
    }
    
    if (changed) {
      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
      console.log(`  -> Saved ${lang}`);
    }
  }
  console.log('Done fixing!');
}
main().catch(console.error);
