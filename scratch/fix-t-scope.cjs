const fs = require('fs');

function fixScope(file) {
  let c = fs.readFileSync(file, 'utf8');
  
  // Replace `const { t: trans } = useLanguage();` with `const { t } = useLanguage();`
  c = c.replace(/const \{ t: trans \} = useLanguage\(\);/, 'const { t } = useLanguage();');
  
  // Rename local `const t = {` to `const sidebarStrings = {`
  c = c.replace(/const t = \{/, 'const sidebarStrings = {');
  
  // In ConvertVideo.tsx, it was `const ui = {`
  // so let's replace `trans(` with `t(` everywhere
  c = c.replace(/trans\(/g, 't(');
  
  // Update sidebar usage
  c = c.replace(/t\.settings/g, 'sidebarStrings.settings');
  c = c.replace(/t\.desc/g, 'sidebarStrings.desc');
  c = c.replace(/t\.extreme/g, 'sidebarStrings.extreme');
  c = c.replace(/t\.balanced/g, 'sidebarStrings.balanced');
  c = c.replace(/t\.high/g, 'sidebarStrings.high');
  c = c.replace(/t\.factor/g, 'sidebarStrings.factor');
  c = c.replace(/t\.slow/g, 'sidebarStrings.slow');
  c = c.replace(/t\.norm/g, 'sidebarStrings.norm');
  c = c.replace(/t\.fast/g, 'sidebarStrings.fast');
  c = c.replace(/t\.change/g, 'sidebarStrings.change');
  
  fs.writeFileSync(file, c);
}

fixScope('src/pages/ConvertVideo.tsx');
fixScope('src/pages/CompressVideo.tsx');
fixScope('src/pages/ChangeVideoSpeed.tsx');

console.log('Fixed scope issues');
