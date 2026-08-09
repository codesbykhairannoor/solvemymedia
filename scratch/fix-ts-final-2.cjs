const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. processMedia(file, 'high', targetFormat) -> processMedia(file, 100, targetFormat)
  content = content.replace(/processMedia\(file, 'high', /g, 'processMedia(file, 100, ');
  
  // 2. setFile in CenteredActionWorkspace -> onFileSelect
  content = content.replace(/<CenteredActionWorkspace([\s\S]*?)setFile=\{/g, '<CenteredActionWorkspace$1onFileSelect={');

  // 3. Add accept="video/*" if it's missing in DualColumnWorkspace/CenteredActionWorkspace
  // For files with "Audio" in name -> accept="audio/*", else accept="video/*"
  const acceptStr = file.includes('Audio') ? 'accept="audio/*"' : 'accept="video/*"';
  
  if (!content.includes('accept=')) {
    content = content.replace(/<DualColumnWorkspace/g, `<DualColumnWorkspace\n      ${acceptStr}`);
    content = content.replace(/<CenteredActionWorkspace/g, `<CenteredActionWorkspace\n      ${acceptStr}`);
  }

  // 4. Any lingering dict usages
  content = content.replace(/dict\.tools\?\.compress\?\.settings \|\| /g, '');
  content = content.replace(/dict\.tools\?\.compress\?\.balanced \|\| /g, '');
  content = content.replace(/\{dict\.hero\?\.([a-z_]+) \|\| '([^']+)'\}/g, "'$2'");
  content = content.replace(/\{smartHighlight\(dict\.hero\?\.([a-z_]+) \|\| '([^']+)'\)\}/g, "{smartHighlight('$2')}");
  content = content.replace(/dict\.hero\?\.([a-z_]+) \|\| '([^']+)'/g, "'$2'");
  
  // 5. Clean targetFormat={targetFormat} if outputUrl type error happens? No, the type error was that outputUrl={outputUrl} was passed, but outputUrl was useState<string | null>(null), and outputUrl in props was string. Wait, in CenteredActionWorkspace it is string | null. DualColumnWorkspaceProps is string | null.
  // Wait, let's check the error: `Type 'string | null' is not assignable to type 'string'.` for property... wait!
  // It's `CompressVideo.tsx(138,7): error TS2322: Type 'string | null' is not assignable to type 'string'.`
  // Line 138 in CompressVideo is `outputUrl={outputUrl}`! Wait, if DualColumnWorkspaceProps expects `outputUrl: string | null`, why error?
  // Let's check `DualColumnWorkspace.tsx` line 13.
  // Actually, DualColumnWorkspace was replaced/cleaned. Let's make sure it is `string | null` in DualColumnWorkspace!
  
  fs.writeFileSync(filePath, content);
}

// Ensure DualColumnWorkspace accepts string | null
let dwPath = path.join(__dirname, '../src/components/workspaces/DualColumnWorkspace.tsx');
if (fs.existsSync(dwPath)) {
  let dwContent = fs.readFileSync(dwPath, 'utf8');
  dwContent = dwContent.replace(/outputUrl: string;/g, 'outputUrl: string | null;');
  fs.writeFileSync(dwPath, dwContent);
}

// Check ToolLayout
let tlPath = path.join(__dirname, '../src/components/ToolLayout.tsx');
if (fs.existsSync(tlPath)) {
  let tlContent = fs.readFileSync(tlPath, 'utf8');
  tlContent = tlContent.replace(/outputUrl: string;/g, 'outputUrl: string | null;');
  fs.writeFileSync(tlPath, tlContent);
}

console.log('Fixed more typescript errors');
