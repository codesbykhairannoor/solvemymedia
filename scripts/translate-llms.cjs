const fs = require('fs');
const path = require('path');

const LANGS = [
  'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar', 'hi', 'it', 'ko', 'nl', 'tr', 'pl', 'vi', 'th', 'sv', 'cs', 'da', 'el', 'fi', 'he', 'hu', 'no', 'ro', 'sk', 'uk', 'ms'
];

const codeMap = {
  'zh': 'zh-CN',
  'he': 'iw'
};

async function translateText(text, targetLang) {
  const tl = codeMap[targetLang] || targetLang;
  let retries = 3;
  while (retries > 0) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        if (res.status === 429) {
          console.log("Rate limited, waiting 3s...");
          await new Promise(r => setTimeout(r, 3000));
          retries--;
          continue;
        }
        throw new Error("Fetch failed: " + res.status);
      }
      
      const data = await res.json();
      let translated = '';
      for (const chunk of data[0]) {
        translated += chunk[0];
      }
      return translated;
    } catch (err) {
      console.error(`Error translating to ${targetLang} (retries left: ${retries - 1}):`, err.message);
      retries--;
      if (retries === 0) return text; // Fallback to original
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

async function run() {
  console.log("Starting translation of llms-*.txt using Google Translate API...");
  
  const publicDir = path.join(__dirname, '..', 'public');
  const masterPath = path.join(publicDir, 'llms-en.txt');
  
  if (!fs.existsSync(masterPath)) {
    console.error("Master file llms-en.txt not found!");
    return;
  }
  
  const masterText = fs.readFileSync(masterPath, 'utf-8');
  
  // Since the file is 100 lines long, Google Translate might choke on it if it exceeds URL limits (2000 chars).
  // The llms-en.txt is probably around 3500 chars. We need to chunk it.
  
  const paragraphs = masterText.split('\n\n');
  
  for (const lang of LANGS) {
    const destPath = path.join(publicDir, `llms-${lang}.txt`);
    console.log(`Translating prompt for ${lang}...`);
    
    let translatedFull = '';
    for (const p of paragraphs) {
      if (p.trim() === '' || p.trim() === '---') {
        translatedFull += p + '\n\n';
        continue;
      }
      const translatedP = await translateText(p, lang);
      translatedFull += translatedP + '\n\n';
      // tiny sleep
      await new Promise(res => setTimeout(res, 100));
    }
    
    fs.writeFileSync(destPath, translatedFull.trim(), 'utf-8');
    console.log(`✅ Generated llms-${lang}.txt`);
    
    // Prevent rate limit
    await new Promise(res => setTimeout(res, 800));
  }
  
  console.log("🎉 ALL TRANSLATIONS DONE!");
}

run();
