import fs from 'fs';
import path from 'path';
import translate from 'google-translate-api-x';

const langs = [
  'id','es','fr','de','it','pt','nl','pl','ru',
  'ja','ko','zh','zh-TW','tr','vi','th','ar','hi','sv',
  'no','da','fi','cs','hu','el','ro','uk','ms','tl'
];

const langMap = {
  'zh': 'zh-cn',
  'zh-TW': 'zh-tw'
};

const PSEO_ROUTES = [
  'mp4-to-mp3', 'mov-to-mp4', 'mkv-to-mp4', 'webm-to-mp4', 'avi-to-mp4',
  'wav-to-mp3', 'm4a-to-mp3', 'flac-to-mp3', 'ogg-to-mp3',
  'compress-mp4', 'compress-mov', 'compress-webm',
  'mp4-to-gif', 'mov-to-gif',
  'compress-mp3', 'compress-wav',
  'transcribe-mp3', 'transcribe-mp4',
  'screen-recorder', 'audio-recorder',
  'speed-up-mp4', 'slow-down-mp4',
  'crop-mp4', 'resize-video-for-tiktok',
  'mute-mp4', 'remove-audio-from-video',
  'add-watermark-to-mp4',
  'join-audio-files', 'merge-mp3'
];

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
  const dictionary = {
    "en": PSEO_ROUTES
  };

  const baseStrings = PSEO_ROUTES.map(r => r.replace(/-/g, ' '));

  console.log("Starting translation for 29 pSEO slugs in 30 languages (one by one)...");

  for (let i = 0; i < langs.length; i++) {
    const lang = langs[i];
    const targetLang = langMap[lang] || lang;
    console.log(`[${i+1}/${langs.length}] Translating to ${lang}...`);
    
    let transliteratedArr = [];
    for(let str of baseStrings) {
      let retries = 3;
      let success = false;
      while (retries > 0 && !success) {
        try {
          const res = await translate(str, { to: targetLang });
          // Use pronunciation if available and different from english (helps non-latin)
          let finalStr = res.text;
          if (res.pronunciation && typeof res.pronunciation === 'string' && res.pronunciation.trim() !== '') {
            finalStr = res.pronunciation;
          }
          transliteratedArr.push(finalStr);
          success = true;
          await sleep(50); // small delay to prevent rate limit
        } catch (e) {
          retries--;
          if (retries === 0) {
            console.error(`Error translating "${str}" to ${lang}. Using english fallback.`);
            transliteratedArr.push(str);
          } else {
            await sleep(1000);
          }
        }
      }
    }
    
    dictionary[lang] = transliteratedArr.map(slugify);
  }

  fs.writeFileSync(
    path.join(process.cwd(), 'scratch', 'pseo-slugs-dictionary.json'), 
    JSON.stringify(dictionary, null, 2)
  );
  
  // Format it as a TS object for our SLUG_MAP
  let tsOutput = `// Generated pSEO Slug Map\n\n`;
  for (const lang of Object.keys(dictionary)) {
    if (lang === 'en') continue;
    
    dictionary[lang].forEach((localizedSlug, idx) => {
      const standardSlug = PSEO_ROUTES[idx];
      if (localizedSlug && localizedSlug !== standardSlug && localizedSlug.length > 0) {
        tsOutput += `  '${localizedSlug}': '${standardSlug}',\n`;
      }
    });
  }

  fs.writeFileSync(
    path.join(process.cwd(), 'scratch', 'pseo_slug_map_additions.ts'), 
    tsOutput
  );

  console.log("Done! Results written to scratch/pseo-slugs-dictionary.json and pseo_slug_map_additions.ts");
}

run();
