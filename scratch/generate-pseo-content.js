import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import translate from 'google-translate-api-x';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We will dynamically import the built pseo-routes.js
import { PSEO_ROUTES } from './pseo-routes-temp.js';

const langs = [
  'id','es','fr','de','it','pt','nl','pl','ru',
  'ja','ko','zh','zh-TW','tr','vi','th','ar','hi','sv',
  'no','da','fi','cs','hu','el','ro','uk','ms','tl'
];

const langMap = {
  'zh': 'zh-cn',
  'zh-TW': 'zh-tw'
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  const dictionary = {
    "en": PSEO_ROUTES
  };

  console.log(`Starting deep translation for ${PSEO_ROUTES.length} pSEO routes in ${langs.length} languages...`);

  for (let i = 0; i < langs.length; i++) {
    const lang = langs[i];
    const targetLang = langMap[lang] || lang;
    console.log(`[${i+1}/${langs.length}] Translating to ${lang}...`);
    
    // Extract ALL strings for all routes into a single flat array (480 strings)
    const allStringsToTranslate = [];
    for (const route of PSEO_ROUTES) {
      allStringsToTranslate.push(route.h1);
      allStringsToTranslate.push(route.description);
      for (const f of route.features) {
        allStringsToTranslate.push(f.title, f.desc);
      }
      for (const f of route.faqs) {
        allStringsToTranslate.push(f.q, f.a);
      }
    }

    let success = false;
    let retries = 3;
    let translatedStrings = [];
    
    // Chunk by character length (< 4500)
    let chunks = [];
    let currentChunk = [];
    let currentLen = 0;
    for(const str of allStringsToTranslate) {
      if (currentLen + str.length > 4000) {
        chunks.push(currentChunk);
        currentChunk = [];
        currentLen = 0;
      }
      currentChunk.push(str);
      currentLen += str.length + 1; // +1 for newline
    }
    if (currentChunk.length > 0) chunks.push(currentChunk);

    let chunkSuccess = true;
    for (let c = 0; c < chunks.length; c++) {
      const chunk = chunks[c];
      const joinedChunk = chunk.join('\n');
      
      let reqSuccess = false;
      let reqRetries = 3;
      
      while (reqRetries > 0 && !reqSuccess) {
        try {
          const res = await translate(joinedChunk, { to: targetLang });
          const resLines = res.text.split('\n').map(s => s.trim());
          
          if (resLines.length === chunk.length) {
             translatedStrings.push(...resLines);
          } else {
             // fallback to original chunk if lines don't match
             translatedStrings.push(...chunk);
          }
          reqSuccess = true;
          await sleep(500); 
        } catch (e) {
          reqRetries--;
          if (reqRetries === 0) {
            console.error(`  Error translating chunk ${c} to ${lang}. Using english fallback.`);
            translatedStrings.push(...chunk);
            chunkSuccess = false;
          } else {
            await sleep(1500);
          }
        }
      }
    }

    // Reconstruct the objects from the flat translated array
    let strIdx = 0;
    const translatedRoutes = [];
    
    for (const route of PSEO_ROUTES) {
      const localizedRoute = {
        path: route.path,
        tool: route.tool,
        h1: translatedStrings[strIdx++] || route.h1,
        description: translatedStrings[strIdx++] || route.description,
        features: route.features.map(() => ({
          title: translatedStrings[strIdx++] || '',
          desc: translatedStrings[strIdx++] || ''
        })),
        faqs: route.faqs.map(() => ({
          q: translatedStrings[strIdx++] || '',
          a: translatedStrings[strIdx++] || ''
        }))
      };
      
      translatedRoutes.push(localizedRoute);
    }
    
    dictionary[lang] = translatedRoutes;
  }

  // Save the massive dictionary
  const outPath = path.join(process.cwd(), 'src', 'data', 'pseo-translations.json');
  fs.writeFileSync(outPath, JSON.stringify(dictionary, null, 2));
  console.log(`Done! Results written to ${outPath}`);
}

run();
