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

const LONG_TAIL_PATHS = [
  '/reduce-mp4-video-size-for-email',
  '/compress-large-video-for-whatsapp',
  '/convert-mov-to-mp4-for-android',
  '/extract-audio-from-video-for-podcast',
  '/make-video-smaller-without-losing-quality',
  '/remove-sound-from-video-completely',
  '/speed-up-video-for-tiktok',
  '/crop-video-for-instagram-story',
  '/combine-multiple-voice-memos-into-one',
  '/transcribe-zoom-meeting-recording-to-text'
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  const filePath = path.join(__dirname, '../src/data/pseo-long-tail-translations.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const lang of langs) {
    const targetLang = langMap[lang] || lang;
    console.log(`Ensuring bento parity for ${lang}...`);
    
    for (const p of LONG_TAIL_PATHS) {
      const enEntry = data['en'].find(e => e.path === p);
      const targetEntry = data[lang].find(e => e.path === p);
      if (!enEntry || !targetEntry) continue;

      // Clone bentoSections from EN to target
      targetEntry.bentoSections = JSON.parse(JSON.stringify(enEntry.bentoSections));

      // Now traverse the cloned bentoSections and translate every string value
      for (const section of targetEntry.bentoSections) {
        if (!section.data) continue;
        for (const [key, val] of Object.entries(section.data)) {
          if (typeof val === 'string') {
            // Do not translate empty strings or very short codes (like emojis or single characters) unless needed
            if (val.trim() === '' || val.trim().length <= 1) continue;
            
            // Do not translate "Start" or "Step" if we already have a hardcoded dictionary. We can just translate it all!
            try {
              const res = await translate(val, { to: targetLang });
              section.data[key] = res.text;
              await sleep(100);
            } catch(e) {
              console.error(`Error translating bento parity for ${lang}: ${val}`);
              await sleep(2000);
            }
          }
        }
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("Done fixing bento parity across all 30 languages!");
}

run();
