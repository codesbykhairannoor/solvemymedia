const fs = require('fs');
const path = require('path');

const slugsPath = path.join(__dirname, '../src/i18n/slugs.ts');
let content = fs.readFileSync(slugsPath, 'utf8');

// Disambiguate crop-video vs cut-video
const updates = [
  // id: crop-video -> pangkas-video, cut-video -> potong-video
  {
    regex: /("id":\s*{[\s\S]*?"crop-video":\s*)"potong-video"/,
    replacement: '$1"pangkas-video"'
  },
  // pt: crop-video -> recortar-video, cut-video -> cortar-video
  {
    regex: /("pt":\s*{[\s\S]*?"crop-video":\s*)"cortar-video"/,
    replacement: '$1"recortar-video"'
  },
  // ru: crop-video -> kadrirovat-video, cut-video -> obrezat-video
  {
    regex: /("ru":\s*{[\s\S]*?"crop-video":\s*)"obrezat-video"/,
    replacement: '$1"kadrirovat-video"'
  },
  // pl: crop-video -> kadruj-wideo, cut-video -> przytnij-wideo
  {
    regex: /("pl":\s*{[\s\S]*?"crop-video":\s*)"przytnij-wideo"/,
    replacement: '$1"kadruj-wideo"'
  },
  // vi: crop-video -> xen-video, cut-video -> cat-video
  {
    regex: /("vi":\s*{[\s\S]*?"crop-video":\s*)"cat-video"/,
    replacement: '$1"xen-video"'
  },
  // cs: crop-video -> vyriznout-video, cut-video -> oriznout-video
  {
    regex: /("cs":\s*{[\s\S]*?"crop-video":\s*)"oriznout-video"/,
    replacement: '$1"vyriznout-video"'
  },
  // sk: crop-video -> vyrezat-video, cut-video -> orezat-video
  {
    regex: /("sk":\s*{[\s\S]*?"crop-video":\s*)"orezat-video"/,
    replacement: '$1"vyrezat-video"'
  }
];

updates.forEach(({ regex, replacement }) => {
  content = content.replace(regex, replacement);
});

fs.writeFileSync(slugsPath, content, 'utf8');
console.log('✅ Disambiguated crop vs cut slugs successfully!');
