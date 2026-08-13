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

const WORDS_TO_TRANSLATE = [
  "Start",
  "Step",
  "Private",
  "Tool",
  "Free"
];

const HOW_TO_PREFIX = "How to ";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  const filePath = path.join(__dirname, '../src/data/pseo-long-tail-translations.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const lang of langs) {
    const targetLang = langMap[lang] || lang;
    console.log(`Fixing bento hardcoded for ${lang}...`);
    
    // Fetch generic translations
    const dict = {};
    for (const w of WORDS_TO_TRANSLATE) {
      try {
        const res = await translate(w, { to: targetLang });
        dict[w] = res.text;
      } catch(e) { dict[w] = w; }
    }
    
    try {
      const resHow = await translate(HOW_TO_PREFIX, { to: targetLang });
      dict[HOW_TO_PREFIX] = resHow.text + ' '; // sometimes it strips space
    } catch(e) { dict[HOW_TO_PREFIX] = HOW_TO_PREFIX; }

    for (const entry of data[lang]) {
      if (!entry.bentoSections) continue;

      for (const section of entry.bentoSections) {
        if (!section.data) continue;

        // Translate buttonText if it's exactly "Start"
        if (section.data.buttonText === "Start") {
          section.data.buttonText = dict["Start"];
        }

        // Translate "Step X" or "date": "Step"
        if (section.data.date === "Step") {
          section.data.date = dict["Step"];
        }
        
        // Translate "Private"
        if (section.data.statLabel === "Private" || section.data.label === "Private") {
          if (section.data.statLabel === "Private") section.data.statLabel = dict["Private"];
          if (section.data.label === "Private") section.data.label = dict["Private"];
        }

        // Translate "Tool"
        if (section.data.role === "Tool") {
          section.data.role = dict["Tool"];
        }

        // Translate "How to " prefix
        if (typeof section.data.title === 'string' && section.data.title.startsWith(HOW_TO_PREFIX)) {
          const rest = section.data.title.substring(HOW_TO_PREFIX.length);
          section.data.title = dict[HOW_TO_PREFIX].trim() + " " + rest;
        }
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("Done updating hardcoded bento translations!");
}

run();
