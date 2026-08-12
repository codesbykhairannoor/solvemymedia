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
    console.error("Could not find baseDict block");
    return;
  }

  const baseDict = {};
  let match;
  while ((match = regex.exec(enBlockMatch[1])) !== null) {
    baseDict[match[1]] = match[3].replace(/\\['"]/g, match[2]);
  }
  const baseKeys = Object.keys(baseDict);

  let lines = content.split(/\r?\n/);
  let hasChanges = false;

  for (let lang of langs) {
    const langKey = lang === 'zh-CN' ? 'zh' : lang;
    
    // Find where the block for this language starts and ends
    const startIndex = lines.findIndex(l => new RegExp(`^  ${langKey}:\\s*\\{`).test(l));
    if (startIndex === -1) {
      console.log(`[${lang}] block not found. Use generate-langs.cjs instead.`);
      continue;
    }
    
    let endIndex = startIndex + 1;
    let blockString = '';
    while (endIndex < lines.length && !lines[endIndex].trim().startsWith('},')) {
      blockString += lines[endIndex] + '\n';
      endIndex++;
    }

    const currentDict = {};
    const localRegex = /^\s*([a-zA-Z0-9_]+):\s*(['"])(.*?)\2,?$/gm;
    let localMatch;
    while ((localMatch = localRegex.exec(blockString)) !== null) {
      currentDict[localMatch[1]] = localMatch[3].replace(/\\['"]/g, localMatch[2]);
    }

    const missingKeys = baseKeys.filter(k => !currentDict[k]);
    if (missingKeys.length === 0) {
      continue;
    }

    console.log(`[${lang}] Missing ${missingKeys.length} keys. Translating...`);
    const valuesToTranslate = missingKeys.map(k => baseDict[k]);
    
    try {
      const targetLang = lang === 'zh' ? 'zh-CN' : (lang === 'he' ? 'iw' : lang);
      const res = await translate(valuesToTranslate, { to: targetLang, rejectOnPartialFail: false, forceBatch: false });
      const translatedValues = Array.isArray(res) ? res.map(r => r.text) : [res.text];
      
      let newLines = [];
      missingKeys.forEach((key, idx) => {
        const val = translatedValues[idx] ? translatedValues[idx].replace(/'/g, "\\'") : '';
        newLines.push(`    ${key}: '${val}',`);
      });

      // Insert right before the closing },
      lines.splice(endIndex, 0, ...newLines);
      hasChanges = true;
      
      fs.writeFileSync(TARGET_FILE, lines.join('\n'));
      console.log(`[${lang}] Patched missing keys.`);
      await sleep(1000); 
    } catch (err) {
      console.log(`[${lang}] Failed to patch:`, err.message);
    }
  }
  
  console.log("Done patching langs.");
}

main();
