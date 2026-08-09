const fs = require('fs');
const path = require('path');

// 1. DualColumnWorkspace.tsx - Fix engine type
let dwPath = path.join(__dirname, '../src/components/workspaces/DualColumnWorkspace.tsx');
if (fs.existsSync(dwPath)) {
  let dwContent = fs.readFileSync(dwPath, 'utf8');
  dwContent = dwContent.replace(/engine: string;/g, 'engine: string | null;');
  fs.writeFileSync(dwPath, dwContent);
}

// 2. CenteredActionWorkspace.tsx - Fix engine type
let cawPath = path.join(__dirname, '../src/components/workspaces/CenteredActionWorkspace.tsx');
if (fs.existsSync(cawPath)) {
  let cawContent = fs.readFileSync(cawPath, 'utf8');
  cawContent = cawContent.replace(/engine: string;/g, 'engine: string | null;');
  fs.writeFileSync(cawPath, cawContent);
}

// 3. Remove accept="" from CenteredActionWorkspace usages
const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('<CenteredActionWorkspace')) {
    content = content.replace(/<CenteredActionWorkspace\s+accept="[^"]*"/g, '<CenteredActionWorkspace');
  }

  // 4. Fix TranscribeMedia dict usage
  if (file === 'TranscribeMedia.tsx') {
    content = content.replace(/\{dict\.ui\?\.browse_files \? `or \$\{"\"\}` : 'or Browse Files'\}/g, "{'or Browse Files'}");
  }

  fs.writeFileSync(filePath, content);
}

console.log('Final repair done');
