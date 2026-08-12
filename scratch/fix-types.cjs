const fs = require('fs');

const content = fs.readFileSync('src/i18n/translations.ts', 'utf8');

const baseDictStart = content.indexOf('const baseDict: UiDictionary = {');
const baseDictEnd = content.indexOf('};\n\nexport const UI_TRANSLATIONS');

if (baseDictStart === -1 || baseDictEnd === -1) {
  console.error("Could not find baseDict block");
  process.exit(1);
}

const baseDictContent = content.substring(baseDictStart, baseDictEnd);
const keys = [];
const lines = baseDictContent.split('\n');
for (const line of lines) {
  const match = line.match(/^\s+([a-zA-Z0-9_]+):/);
  if (match) {
    keys.push(match[1]);
  }
}

console.log("Found " + keys.length + " keys in baseDict");

const newInterface = `export interface UiDictionary {\n` + keys.map(k => `  ${k}?: string;`).join('\n') + `\n}`;

const interfaceStart = content.indexOf('export interface UiDictionary {');
const interfaceEnd = content.indexOf('}\n\nconst baseDict: UiDictionary = {');

if (interfaceStart === -1 || interfaceEnd === -1) {
  console.error("Could not find interface block");
  process.exit(1);
}

const newContent = content.substring(0, interfaceStart) + newInterface + content.substring(interfaceEnd + 1);

fs.writeFileSync('src/i18n/translations.ts', newContent);
console.log("Successfully updated UiDictionary interface.");
