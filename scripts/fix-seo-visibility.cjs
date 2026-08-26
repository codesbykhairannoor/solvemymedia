const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'Home.tsx');

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('{!pseoData && (')) {
    continue;
  }

  // Find the exact div start
  const divStartMatch = content.match(/<div (className="seo-sections-wrapper" )?style=\{\{ display: 'flex', flexDirection: 'column', (?:[^>]+)\}\}>/);
  if (divStartMatch) {
    // We want to wrap this div in {!pseoData && ( ... )}
    content = content.replace(divStartMatch[0], `{!pseoData && (\n      ${divStartMatch[0]}`);
    
    // Find the closing tags at the very end of the file
    const endMatch = content.match(/<\/div>\s*<\/>\s*\);\s*};?\s*$/);
    if (endMatch) {
      content = content.replace(/<\/div>\s*<\/>\s*\);\s*};?\s*$/, '</div>\n      )}\n    </>\n  );\n};\n');
      fs.writeFileSync(filePath, content);
      console.log(`Patched ${file}`);
    } else {
      console.log(`Failed to find end for ${file}`);
    }
  } else {
    console.log(`Failed to find div start for ${file}`);
  }
}
