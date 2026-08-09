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

const keys = [
  "cat_video_opt", "compress_video", "convert_video", "speed",
  "cat_video_edit", "gif", "crop", "mute", "watermark",
  "cat_audio", "compress_audio", "convert_audio", "video_to_audio", "merge_audio",
  "cat_ai", "transcribe", "studio_recorder"
];

const englishStrings = [
  "Video Optimization", "Compress Video", "Convert Video", "Change Speed",
  "Video Editing", "Video to GIF", "Crop Video", "Mute Video", "Add Watermark",
  "Audio Tools", "Compress Audio", "Convert Audio", "Video to Audio", "Merge Audio",
  "AI & Studio", "AI Media to Text", "Studio Recorder"
];

const DELIM = ' _|||_ ';
const joined = englishStrings.join(DELIM);
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  const srcDir = 'd:/audiovideo/media-compressor/src';
  const uiLocalesDir = path.join(srcDir, 'locales', 'ui');
  
  // First, do english manually
  const enPath = path.join(uiLocalesDir, 'en.json');
  if (fs.existsSync(enPath)) {
     const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
     if (!enJson.nav) enJson.nav = {};
     for (let i = 0; i < keys.length; i++) {
        enJson.nav[keys[i]] = englishStrings[i];
     }
     fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2));
  }

  for (let i = 0; i < langs.length; i++) {
    const lang = langs[i];
    const targetLang = langMap[lang] || lang;
    console.log(`[${i+1}/${langs.length}] Translating Mega Menu to ${lang}...`);
    
    let retries = 3;
    let translatedStrings = englishStrings;
    while(retries > 0) {
      try {
        const res = await translate(joined, { to: targetLang });
        let translatedArray = res.text.split(DELIM);
        if (translatedArray.length !== englishStrings.length) {
          translatedArray = res.text.split(/_\|\|\|_|_ \|\|\| _/g).map(s => s.trim());
        }
        if (translatedArray.length === englishStrings.length) {
          translatedStrings = translatedArray;
        } else {
          console.error(`Delimiter mismatch for ${lang}. Falling back to English.`);
        }
        break;
      } catch (e) {
        retries--;
        console.error(`Error translating to ${lang}. Retries left: ${retries}`);
        await sleep(2000);
      }
    }
    
    // Inject into JSON
    const filePath = path.join(uiLocalesDir, `${lang}.json`);
    if (fs.existsSync(filePath)) {
      const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (!json.nav) json.nav = {};
      for (let j = 0; j < keys.length; j++) {
        json.nav[keys[j]] = translatedStrings[j];
      }
      fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
    }
    
    await sleep(500);
  }
  
  console.log("Successfully updated all UI locales with Mega Menu translations!");
}

run().catch(console.error);
