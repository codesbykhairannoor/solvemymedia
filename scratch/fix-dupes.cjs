const fs = require('fs');

const content = fs.readFileSync('src/i18n/translations.ts', 'utf8');

// The duplicate is 'faqTitle'. Let's find the second occurrence in baseDict and remove it.
let lines = content.split('\n');
let seenKeys = new Set();
let baseDictStart = -1;
let baseDictEnd = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const baseDict: UiDictionary = {')) {
    baseDictStart = i;
  }
  if (baseDictStart !== -1 && lines[i].includes('};') && lines[i+2] && lines[i+2].includes('export const UI_TRANSLATIONS')) {
    baseDictEnd = i;
    break;
  }
}

// Remove duplicates in baseDict
for (let i = baseDictStart + 1; i < baseDictEnd; i++) {
  const match = lines[i].match(/^\s+([a-zA-Z0-9_]+):/);
  if (match) {
    const key = match[1];
    if (seenKeys.has(key)) {
      console.log('Removing duplicate from baseDict at line ' + (i+1) + ': ' + key);
      lines[i] = ''; // remove line
    } else {
      seenKeys.add(key);
    }
  }
}

// Rebuild the UiDictionary interface properly WITH the missing keys from errors
const missingKeys = [
  'compVPerfPill', 'dragDrop', 'browseFiles'
];
for (const k of missingKeys) {
  if (!seenKeys.has(k)) {
    console.log('Adding missing key to baseDict: ' + k);
    lines[baseDictEnd-1] += `\n  ${k}: "${k}",`;
    seenKeys.add(k);
  }
}

const newInterface = `export interface UiDictionary {\n` + Array.from(seenKeys).map(k => `  ${k}?: string;`).join('\n') + `\n}`;

let intStart = -1;
let intEnd = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('export interface UiDictionary {')) intStart = i;
  if (intStart !== -1 && lines[i].includes('}') && lines[i+2] && lines[i+2].includes('const baseDict: UiDictionary = {')) {
    intEnd = i;
    break;
  }
}

const newLines = [
  ...lines.slice(0, intStart),
  newInterface,
  ...lines.slice(intEnd + 1)
];

fs.writeFileSync('src/i18n/translations.ts', newLines.join('\n'));
console.log('Fixed duplicates and added missing keys.');
