const fs = require('fs');
const path = require('path');

const transData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/cut-video-translations.json'), 'utf8'));
const slugsPath = path.join(__dirname, '../src/i18n/slugs.ts');
let slugsContent = fs.readFileSync(slugsPath, 'utf8');

// Fix line 57-58 first if broken
slugsContent = slugsContent.replace(
  /"transcribe-zoom-meeting-recording-to-text": "transcribe-zoom-meeting-recording-to-text"\s*\n\s*"cut-video": "cut-video",},/g,
  '"transcribe-zoom-meeting-recording-to-text": "transcribe-zoom-meeting-recording-to-text"\n  },'
);

function slugify(text) {
  if (!text) return 'cut-video';
  const clean = text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return clean || 'cut-video';
}

const customSlugs = {
  en: 'cut-video',
  id: 'potong-video',
  es: 'cortar-video',
  fr: 'couper-video',
  de: 'video-schneiden',
  it: 'tagliare-video',
  pt: 'cortar-video',
  nl: 'video-knippen',
  pl: 'przytnij-wideo',
  ru: 'obrezat-video',
  ja: 'video-cut',
  ko: 'video-cut',
  zh: 'cut-video',
  'zh-TW': 'cut-video',
  tr: 'video-kes',
  vi: 'cat-video',
  th: 'tat-video',
  ar: 'qas-al-fidyu',
  hi: 'video-katein',
  sv: 'klipp-video',
  no: 'klipp-video',
  da: 'klip-video',
  fi: 'leikkaa-video',
  cs: 'oriznout-video',
  hu: 'video-vagas',
  el: 'kopste-to-vinteo',
  ro: 'taie-video',
  uk: 'obrizaty-video',
  ms: 'potong-video',
  tl: 'gupitin-ang-video',
  he: 'htoch-video',
  sk: 'orezat-video'
};

const languages = Object.keys(transData);

languages.forEach(lang => {
  const localizedTitle = transData[lang]?.toolCutVideo || 'Cut Video';
  const slug = customSlugs[lang] || slugify(localizedTitle);

  // We want to add "cut-video": "..." into SLUGS_MAP[lang]
  // Match `"${lang}": {\n` or `'${lang}': {\n`
  const regex = new RegExp(`("${lang}":\\s*{)([\\s\\S]*?)(^\\s*})`, 'm');
  const match = slugsContent.match(regex);
  if (match) {
    let block = match[2];
    if (!block.includes('"cut-video":')) {
      // Add cut-video before the closing brace
      // Check if previous line needs a comma
      const trimmedBlock = block.trimEnd();
      let newBlock;
      if (trimmedBlock.endsWith(',')) {
        newBlock = `${trimmedBlock}\n    "cut-video": "${slug}",\n  `;
      } else {
        newBlock = `${trimmedBlock},\n    "cut-video": "${slug}",\n  `;
      }
      slugsContent = slugsContent.replace(regex, `$1${newBlock}$3`);
      console.log(`[${lang}] Added slug: "cut-video" -> "${slug}"`);
    } else {
      console.log(`[${lang}] Already has cut-video slug`);
    }
  } else {
    console.warn(`Could not find language block for "${lang}"`);
  }
});

fs.writeFileSync(slugsPath, slugsContent, 'utf8');
console.log('✅ slugs.ts successfully updated with cut-video for all languages!');
