const fs = require('fs');
const path = require('path');

const transTs = fs.readFileSync('src/i18n/translations.ts', 'utf8');
const baseStart = transTs.indexOf('const baseDict: UiDictionary = {');
const baseEnd = transTs.indexOf('const UI_TRANSLATIONS');
const baseBlock = transTs.slice(baseStart, baseEnd);

const baseKeys = new Set();
const keyRegex = /\n\s*([a-zA-Z0-9_-]+):/g;
let m;
while ((m = keyRegex.exec(baseBlock)) !== null) {
  baseKeys.add(m[1]);
}
console.log('baseDict has keys:', baseKeys.size);

function scanDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const missing = new Map();
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name === 'node_modules' || f.name === 'dist') continue;
      const sub = scanDir(full);
      for (const [k, v] of sub.entries()) {
        missing.set(k, v);
      }
    } else if (f.name.endsWith('.tsx') || f.name.endsWith('.ts')) {
      if (f.name === 'translations.ts') continue;
      const content = fs.readFileSync(full, 'utf8');
      const tCalls = content.matchAll(/\bt\(['"]([a-zA-Z0-9_-]+)['"]\)/g);
      for (const tc of tCalls) {
        const k = tc[1];
        if (!baseKeys.has(k)) {
          missing.set(k, f.name);
        }
      }
    }
  }
  return missing;
}

const missingFromSrc = scanDir('src');
console.log('t() keys missing from baseDict:');
for (const [k, file] of missingFromSrc.entries()) {
  console.log(`- ${k} (in ${file})`);
}
