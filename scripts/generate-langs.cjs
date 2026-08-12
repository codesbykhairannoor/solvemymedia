const fs = require('fs');
const path = require('path');
const translate = require('google-translate-api-x');

const TARGET_FILE = path.join(__dirname, '..', 'src', 'i18n', 'translations.ts');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const langs = ['id','es','fr','de','ja','zh','pt','ru','ar','hi','it','ko','nl','tr','pl','vi','th','sv','cs','da','el','fi','he','hu','no','ro','sk','uk','ms'];

async function main() {
  let content = fs.readFileSync(TARGET_FILE, 'utf8');

  // Extract base dictionary
  const regex = /^\s*([a-zA-Z0-9_]+):\s*(['"])(.*?)\2,?$/gm;
  const enBlockMatch = content.match(/const baseDict: UiDictionary = \{([\s\S]*?)\n\};/);
  
  if (!enBlockMatch) {
    console.error("Could not find baseDict block in translations.ts");
    return;
  }

  const dict = {};
  let match;
  while ((match = regex.exec(enBlockMatch[1])) !== null) {
    dict[match[1]] = match[3].replace(/\\['"]/g, match[2]);
  }

  const keys = Object.keys(dict);
  const values = Object.values(dict);
  
  if (keys.length === 0) {
    console.log("No keys found to translate.");
    return;
  }

  let lines = content.split(/\r?\n/);

  for (let lang of langs) {
    const langKey = lang === 'zh-CN' ? 'zh' : lang;
    
    // Check if already translated
    if (lines.some(l => new RegExp(`^  ${langKey}:\\s*baseDict,`).test(l) || new RegExp(`^  ${langKey}:\\s*\\{`).test(l))) {
      console.log(`[${lang}] exists.`);
      continue;
    }

    console.log(`[${lang}] Translating full dictionary...`);
    try {
      const targetLang = lang === 'zh' ? 'zh-CN' : (lang === 'he' ? 'iw' : lang);
      const res = await translate(values, { to: targetLang, rejectOnPartialFail: false, forceBatch: false });
      const translatedValues = Array.isArray(res) ? res.map(r => r.text) : [res.text];
      
      let blockLines = [`  ${langKey}: {`];
      keys.forEach((key, index) => {
        const val = translatedValues[index] ? translatedValues[index].replace(/'/g, "\\'") : '';
        blockLines.push(`    ${key}: '${val}',`);
      });
      blockLines.push(`  },`);
      
      const insertIndex = lines.findIndex(l => l.includes('export const UI_TRANSLATIONS'));
      if (insertIndex > -1) {
        lines.splice(insertIndex + 2, 0, ...blockLines);
        fs.writeFileSync(TARGET_FILE, lines.join('\n'));
        console.log(`[${lang}] Inserted full block.`);
        await sleep(1500); 
      }
    } catch (err) {
      console.log(`[${lang}] Failed:`, err.message);
    }
  }
  
  console.log("Done generating all langs.");
}

main();
