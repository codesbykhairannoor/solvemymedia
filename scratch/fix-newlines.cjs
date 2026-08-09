const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  if (file === 'Home.tsx') continue;
  
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace literal '\n' with actual newline
  content = content.replace(/\\n/g, '\n');

  fs.writeFileSync(filePath, content);
}
console.log('Fixed newlines');
