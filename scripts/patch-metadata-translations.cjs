const fs = require('fs');
const path = require('path');
const { translate } = require('google-translate-api-x');

const dataPath = path.join(__dirname, '../src/data/metadata-video-translations.json');
const MISSING_LANGS = [
  { code: 'de', gCode: 'de' },
  { code: 'zh-TW', gCode: 'zh-TW' },
  { code: 'th', gCode: 'th' },
  { code: 'he', gCode: 'iw' }
];

async function patch() {
  if (!fs.existsSync(dataPath)) {
    console.log('JSON not ready yet');
    return;
  }

  const all = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const enDict = all.en;
  const keys = Object.keys(enDict);
  const values = Object.values(enDict);

  for (const { code, gCode } of MISSING_LANGS) {
    console.log(`📡 Patching [${code}]...`);
    try {
      // Translate in smaller chunk size 5 for high reliability
      const translated = [];
      for (let i = 0; i < values.length; i += 5) {
        const chunk = values.slice(i, i + 5);
        const res = await translate(chunk, { to: gCode, rejectOnPartialFail: false });
        const texts = Array.isArray(res) ? res.map(r => r.text) : [res.text];
        translated.push(...texts);
        await new Promise(r => setTimeout(r, 200));
      }

      const dict = {};
      keys.forEach((k, idx) => {
        dict[k] = translated[idx] || enDict[k];
      });
      all[code] = dict;
      console.log(`✅ [${code}] Patched ${keys.length} keys successfully.`);
    } catch (err) {
      console.error(`Error patching [${code}]:`, err.message);
    }
  }

  fs.writeFileSync(dataPath, JSON.stringify(all, null, 2), 'utf8');
  console.log('🎉 Patch complete and saved to JSON!');
}

patch();
