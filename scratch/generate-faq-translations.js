import fs from 'fs';
import path from 'path';
import translate from 'google-translate-api-x';

const langs = [
  'id','es','fr','de','it','pt','nl','pl','ru',
  'ja','ko','zh-cn','zh-tw','tr','vi','th','ar','hi','sv',
  'no','da','fi','cs','hu','el','ro','uk','ms','tl'
];

const toKey = (lang) => {
  if (lang === 'zh-cn') return 'zh';
  if (lang === 'zh-tw') return 'zh-TW';
  return lang;
};

const texts = [
  "Is there a file size limit?",
  "You can process up to 2GB files directly in your browser without any strict limitations.",
  "Which formats are supported?",
  "We support all major formats including MP4, WebM, MOV, and AVI for maximum compatibility."
];

async function run() {
  const result = {
    "en": [
      { q: texts[0], a: texts[1] },
      { q: texts[2], a: texts[3] }
    ]
  };

  console.log("Starting translation...");
  
  // To avoid rate limits, translate in small chunks or all at once?
  // google-translate-api-x allows batch translation!
  for (const lang of langs) {
    try {
      console.log(`Translating to ${lang}...`);
      const res = await translate(texts, { to: lang, autoCorrect: true });
      const translated = Array.isArray(res) ? res.map(r => r.text) : [res.text]; // if batch, res is array
      
      const localeKey = toKey(lang);
      result[localeKey] = [
        { q: translated[0], a: translated[1] },
        { q: translated[2], a: translated[3] }
      ];
    } catch (e) {
      console.error(`Error for ${lang}:`, e.message);
      // fallback to english
      result[toKey(lang)] = result["en"];
    }
  }

  const outPath = path.join(process.cwd(), 'src', 'utils', 'faqExtraDictionary.ts');
  fs.writeFileSync(outPath, `export const FAQ_EXTRA: Record<string, {q: string, a: string}[]> = ${JSON.stringify(result, null, 2)};\n`, 'utf-8');
  console.log("Done! Written to", outPath);
}

run();
