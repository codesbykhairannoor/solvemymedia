const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/i18n/translations.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The file is a TypeScript file containing an object:
// export const translations: Record<string, UiDictionary> = { ... }
// We can use a regex to match each block and update seoHomeTitle.

// We need to parse this properly or just use string manipulation.
// A simpler approach: we can use regex to find homeHeroTitle and then replace seoHomeTitle.

let updated = false;

// Regex to find homeHeroTitle: '...' or "..."
// Since we want to update the seoHomeTitle for each language, we can split by language blocks or just match both.
// Given the file structure is quite regular, let's use a regex to match language blocks.
const langBlockRegex = /'?[a-z]{2}'?:\s*{([^}]+)}/g;

// Wait, the block might contain nested objects (like `tools: { ... }`), so regex on block level is risky.
// Let's just do line-by-line or regex on the whole file.

// We know `homeHeroTitle: '...'` or `homeHeroTitle: "..."` and `seoHomeTitle: '...'` or `seoHomeTitle: "..."`
// exist in the file for each language. They are in the same object.

let lines = content.split('\n');
let currentHomeHero = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Try to find homeHeroTitle
  const heroMatch = line.match(/homeHeroTitle:\s*(['"`])(.*?)\1/);
  if (heroMatch) {
    currentHomeHero = heroMatch[2];
  }
  
  // Try to find seoHomeTitle
  const seoMatch = line.match(/seoHomeTitle:\s*(['"`])(.*?)\1/);
  if (seoMatch && currentHomeHero) {
    // Replace seoHomeTitle line
    // It should be 'SolveMyMedia | ' + currentHomeHero
    // Escape single quotes if necessary, or just use backticks/double quotes.
    const newTitle = `SolveMyMedia | ${currentHomeHero}`;
    // Reconstruct the line preserving indentation
    const indent = line.match(/^\s*/)[0];
    lines[i] = `${indent}seoHomeTitle: ${JSON.stringify(newTitle)},`;
    updated = true;
    currentHomeHero = ''; // reset after use
  }
}

if (updated) {
  fs.writeFileSync(filePath, lines.join('\n'));
  console.log('Updated seoHomeTitle successfully.');
} else {
  console.log('No updates made.');
}
