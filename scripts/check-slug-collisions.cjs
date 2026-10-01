const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/i18n/slugs.ts'), 'utf8');

// Parse SLUGS_MAP using regex or JSON-like extraction
const matches = content.matchAll(/"([a-zA-Z-]+)":\s*{([^}]*)}/g);

for (const match of matches) {
  const lang = match[1];
  const block = match[2];
  const entries = [...block.matchAll(/"([^"]+)":\s*"([^"]+)"/g)];
  
  const valMap = {};
  entries.forEach(([_, key, val]) => {
    if (!valMap[val]) valMap[val] = [];
    valMap[val].push(key);
  });

  const duplicates = Object.entries(valMap).filter(([val, keys]) => keys.length > 1);
  if (duplicates.length > 0) {
    console.log(`Lang [${lang}] duplicate slugs:`, duplicates);
  }
}
