const fs = require('fs');
const path = require('path');
const translate = require('google-translate-api-x');

const DB_PATH = path.join(__dirname, '../src/data/pseo-long-tail-translations.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

async function translateObject(obj, targetLang) {
  const stringsToTranslate = [];
  const mapData = [];

  function collectStrings(node, currentPath) {
    if (typeof node === 'string') {
      // Don't translate paths or slugs
      if (currentPath[currentPath.length - 1] === 'path' || currentPath[currentPath.length - 1] === 'tool') {
        return;
      }
      mapData.push([...currentPath]);
      stringsToTranslate.push(node);
    } else if (Array.isArray(node)) {
      node.forEach((item, i) => collectStrings(item, [...currentPath, i]));
    } else if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) {
        collectStrings(v, [...currentPath, k]);
      }
    }
  }

  collectStrings(obj, []);
  
  if (stringsToTranslate.length === 0) return obj;

  console.log(`Translating ${stringsToTranslate.length} strings to ${targetLang}...`);
  // Batch size 100 to avoid any limits
  const translatedStrings = [];
  for (let i = 0; i < stringsToTranslate.length; i += 100) {
    const chunk = stringsToTranslate.slice(i, i + 100);
    const res = await translate(chunk, { to: targetLang, rejectOnPartialFail: false });
    translatedStrings.push(...res.map(r => r.text));
    await new Promise(r => setTimeout(r, 1000));
  }

  // Map back
  const translatedObj = JSON.parse(JSON.stringify(obj));
  
  for (let i = 0; i < mapData.length; i++) {
    const p = mapData[i];
    let curr = translatedObj;
    for (let j = 0; j < p.length - 1; j++) {
      curr = curr[p[j]];
    }
    curr[p[p.length - 1]] = translatedStrings[i];
  }

  return translatedObj;
}

async function main() {
  console.log('Generating full translations for Slovak (sk)...');
  const enData = db['en'];
  
  const skData = await translateObject(enData, 'sk');
  
  db['sk'] = skData;
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  console.log('✅ Slovak (sk) completely translated and saved!');
}

main().catch(console.error);
