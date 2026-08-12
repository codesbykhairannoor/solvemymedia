const fs = require('fs');

const path = 'src/pages/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

// Ensure getLocalizedSlug is imported
if (!content.includes('getLocalizedSlug')) {
  content = content.replace(
    "import { useLanguage } from '../hooks/useLanguage';",
    "import { useLanguage } from '../hooks/useLanguage';\nimport { getLocalizedSlug } from '../i18n/slugs';"
  );
}

// Replace all links
const standardSlugs = [
  'compress-video', 'compress-audio', 'convert-video', 'convert-audio', 
  'video-to-audio', 'transcribe', 'recorder', 'create-gif', 'video-speed', 
  'crop-video', 'mute-video', 'watermark-video', 'merge-audio'
];

standardSlugs.forEach(slug => {
  // some have prefix, some don't
  const regex = new RegExp(`<Link to={\\\`(?:\\$\\{prefix\\})?/?${slug}\\\`} style=\\{\\{ textDecoration: 'none' \\}\\}>`, 'g');
  content = content.replace(regex, `<Link to={\\\`\${prefix}/\${getLocalizedSlug('${slug}', currentLang)}\\\`} style={{ textDecoration: 'none' }}>`);
});

fs.writeFileSync(path, content);
console.log('Home links patched!');
