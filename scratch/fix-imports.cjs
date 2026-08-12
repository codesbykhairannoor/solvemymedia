const fs = require('fs');
const path = require('path');
const dir = 'src/components/content-sections/tools';
const files = ['MergeAudioSections.tsx', 'OrganizePdfSections.tsx', 'PdfToImageSections.tsx', 'RemovePdfSections.tsx', 'RotatePdfSections.tsx', 'StudioRecorderSections.tsx', 'TranscribeMediaSections.tsx'];

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/import type \{ SectionProps \} from '\.\.\/types';/, "import type { SectionProps } from '../types';\nimport { useLanguage } from '../../../hooks/useLanguage';");
  fs.writeFileSync(filePath, content);
}
console.log('Fixed imports for', files.length, 'files');
