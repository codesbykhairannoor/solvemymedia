const fs = require('fs');
const path = require('path');
const translate = require('google-translate-api-x');

const langs = [
  'id','es','fr','de','it','pt','nl','pl','ru',
  'ja','ko','zh','zh-TW','tr','vi','th','ar','hi','sv',
  'no','da','fi','cs','hu','el','ro','uk','ms','tl'
];

const langMap = {
  'zh': 'zh-CN',
  'zh-TW': 'zh-TW'
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function run() {
  const slugsFilePath = path.join(__dirname, '../src/i18n/slugs.ts');
  const content = fs.readFileSync(slugsFilePath, 'utf8');
  
  const match = content.match(/export const SLUGS_MAP[^=]*=\s*({[\s\S]*?});/);
  if (!match) {
    console.error("Could not find SLUGS_MAP in slugs.ts");
    return;
  }
  
  const map = eval('(' + match[1] + ')');
  const enKeys = Object.keys(map['en']);
  
  console.log(`Found ${enKeys.length} slugs to translate.`);

  let modified = false;

  for (const lang of langs) {
    if (!map[lang]) map[lang] = {};
    const targetLang = langMap[lang] || lang;
    
    console.log(`Checking ${lang}...`);
    for (const key of enKeys) {
      // If the slug is missing OR if the slug is the exact same as the English key (and not English!)
      // Wait, some slugs might be the same in English and target lang (e.g., "compress-mp4").
      // But let's assume we want to translate them properly if they equal the english one!
      // Actually, if it's missing entirely, definitely translate.
      if (!map[lang][key] || map[lang][key] === key) {
        let str = key.replace(/-/g, ' ');
        try {
          const res = await translate(str, { to: targetLang });
          let finalStr = res.text;
          if (res.pronunciation && typeof res.pronunciation === 'string' && res.pronunciation.trim() !== '') {
            finalStr = res.pronunciation;
          }
          const slugified = slugify(finalStr);
          if (slugified && slugified.length > 0) {
            map[lang][key] = slugified;
            modified = true;
          }
          await sleep(100);
        } catch(e) {
          console.error(`Error for ${lang} key ${key}`);
          await sleep(2000);
        }
      }
    }
  }

  if (modified) {
    const newContent = content.replace(
      /export const SLUGS_MAP[^=]*=\s*({[\s\S]*?});/,
      `export const SLUGS_MAP: Record<string, Record<string, string>> = ${JSON.stringify(map, null, 2)};`
    );
    fs.writeFileSync(slugsFilePath, newContent);
    console.log("Updated slugs.ts successfully!");
  } else {
    console.log("No new slugs needed.");
  }
}

run();
