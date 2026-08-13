const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'pages');

const filesToFix = [
  'ConvertVideoToAudio.tsx',
  'CropVideo.tsx',
  'TranscribeMedia.tsx',
  'MuteVideo.tsx',
  'MergeAudio.tsx',
  'ConvertVideo.tsx',
  'ChangeVideoSpeed.tsx',
  'ConvertAudio.tsx',
  'CompressAudio.tsx',
  'CreateGif.tsx',
  'StudioRecorder.tsx',
  'WatermarkVideo.tsx'
];

filesToFix.forEach(file => {
  const filePath = path.join(srcDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace import
  content = content.replace(
    /import \{ BentoRenderer \} from '\.\.\/components\/pseo\/BentoRenderer';/g,
    `import { NativeLayoutRenderer } from '../components/pseo/NativeLayoutRenderer';`
  );
  
  // Replace usage
  content = content.replace(
    /\{\s*\/\*\s*DYNAMIC PSEO SECTION\s*\*\/\s*\}(?:\r?\n)*\s*\{\s*pseoData\s*&&\s*pseoData\.bentoSections\s*&&\s*\((?:\r?\n)*\s*<div[^>]*>(?:\r?\n)*\s*<BentoRenderer[^>]*\/>(?:\r?\n)*\s*<\/div>(?:\r?\n)*\s*\)\s*\}/g,
    `{/* DYNAMIC PSEO SECTION */}\n        {pseoData && (\n          <NativeLayoutRenderer data={pseoData} />\n        )}`
  );

  // Wrap FAQ
  // Some files have <VideoToAudioFAQSection faqs={pseoData?.faqs} />
  // some have <MuteVideoFAQSection faqs={pseoData?.faqs} />
  // We can just wrap it in {!pseoData && ( ... )} if it's not already wrapped.
  const faqRegex = /(<[A-Za-z]+FAQSection\s+faqs=\{pseoData\?\.faqs\}\s*\/>)/g;
  content = content.replace(faqRegex, `{!pseoData && (\n          $1\n        )}`);

  fs.writeFileSync(filePath, content);
  console.log('Fixed', file);
});
