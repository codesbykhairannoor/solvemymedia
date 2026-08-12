const fs = require('fs');
const path = require('path');
const dir = 'src/components/content-sections/tools';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Sections.tsx'));
let fixedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  if (content.includes('t(') && !content.includes('useLanguage')) {
    content = content.replace(/import type \{ SectionProps \} from '\.\.\/types';/, "import type { SectionProps } from '../types';\nimport { useLanguage } from '../../../hooks/useLanguage';");
    changed = true;
  }
  
  // Regex to match arrow functions returning JSX directly
  const regex = /export const (\w+): React\.FC<([^>]+)> = \(([^)]+)\) => \(\s*<section/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, (match, name, props, args) => {
      return `export const ${name}: React.FC<${props}> = (${args}) => {\n  const { t } = useLanguage();\n  return (\n    <section`;
    });
    
    // Now we need to replace the closing \n); with \n  );\n};
    // But we need to be careful not to replace ); inside the component.
    // In these files, top-level components end with \n);\n or \n); at EOF.
    // A safer way is to replace </section>\n); with </section>\n  );\n};
    content = content.replace(/<\/section>\r?\n\);/g, '</section>\n  );\n};');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    fixedCount++;
  }
}
console.log('Fixed', fixedCount, 'files');
