import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read original SLUGS_MAP structure
const originalSlugsPath = path.join(process.cwd(), 'src', 'i18n', 'slugs.ts');
let originalCode = fs.readFileSync(originalSlugsPath, 'utf8');

// Parse the SLUGS_MAP object (it's hard to parse arbitrary JS, but we can evaluate it if we strip the export const part)
// Actually it's easier to just rebuild it if we have the original dictionaries, but we don't have them easily accessible.
// Let's use a regex to extract the object.
const match = originalCode.match(/export const SLUGS_MAP: Record<string, Record<string, string>> = (\{[\s\S]*?\});/);
if (!match) {
  throw new Error("Could not find SLUGS_MAP");
}

let slugsMap;
eval(`slugsMap = ${match[1]};`);

// Read new pseo dictionary
const pseoDictPath = path.join(process.cwd(), 'scratch', 'pseo-slugs-dictionary.json');
const pseoDict = JSON.parse(fs.readFileSync(pseoDictPath, 'utf8'));

// The PSEO_ROUTES standard slugs are needed. Wait, the dictionary values are the translated slugs in order.
// The PSEO_ROUTES are:
const PSEO_ROUTES = [
  'mp4-to-mp3', 'mov-to-mp4', 'mkv-to-mp4', 'webm-to-mp4', 'avi-to-mp4',
  'wav-to-mp3', 'm4a-to-mp3', 'flac-to-mp3', 'ogg-to-mp3',
  'compress-mp4', 'compress-mov', 'compress-webm',
  'mp4-to-gif', 'mov-to-gif',
  'compress-mp3', 'compress-wav',
  'transcribe-mp3', 'transcribe-mp4',
  'screen-recorder', 'audio-recorder',
  'speed-up-mp4', 'slow-down-mp4',
  'crop-mp4', 'resize-video-for-tiktok',
  'mute-mp4', 'remove-audio-from-video',
  'add-watermark-to-mp4',
  'join-audio-files', 'merge-mp3'
];

for (const lang of Object.keys(pseoDict)) {
  if (lang === 'en') {
    if (!slugsMap['en']) slugsMap['en'] = {};
    for (const route of PSEO_ROUTES) {
      slugsMap['en'][route] = route;
    }
    continue;
  }
  
  if (!slugsMap[lang]) slugsMap[lang] = {};
  
  const localizedArr = pseoDict[lang];
  localizedArr.forEach((localizedSlug, idx) => {
    const standardSlug = PSEO_ROUTES[idx];
    if (localizedSlug) {
      slugsMap[lang][localizedSlug] = standardSlug;
    }
  });
}

const newCode = originalCode.replace(
  /export const SLUGS_MAP: Record<string, Record<string, string>> = \{[\s\S]*?\};\n/,
  `export const SLUGS_MAP: Record<string, Record<string, string>> = ${JSON.stringify(slugsMap, null, 2)};\n`
);

fs.writeFileSync(originalSlugsPath, newCode);
console.log("Successfully merged pSEO slugs into src/i18n/slugs.ts");
