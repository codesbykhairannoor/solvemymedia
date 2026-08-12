const fs = require('fs');

const extraCompressStrings = {
  compVPrivacyTitle: 'Bank-Grade Privacy for Your Media',
  compVPrivacyDesc: 'When you compress a home video or a sensitive corporate presentation, it should stay private. Media Compressor acts as a purely local tool, effectively cutting the cord to the internet.',
  compVPrivacyBadge1: 'No Cloud Storage',
  compVPrivacyBadge2: 'No Cookies',
  compVPrivacyBadge3: '100% Offline',
  compVHowToTitle: 'Compress Video in 3 Steps',
  compVHowToStep1: 'Select File',
  compVHowToStep1Desc: 'Drag and drop any MP4, MOV, or WebM video.',
  compVHowToStep2: 'Adjust Quality',
  compVHowToStep2Desc: 'Move the slider to choose between Extreme Size or High Quality.',
  compVHowToStep3: 'Save Immediately',
  compVHowToStep3Desc: 'Click compress and download your video in seconds.',
  compVGeoTitle2: 'Unmatched Offline Capabilities',
  compVGeoDesc2: "We built the world's most advanced in-browser media compression engine.",
  compVGeoFeat1Title: 'Works Without Internet',
  compVGeoFeat1Desc: 'Try disconnecting your Wi-Fi right now. This page and the compressor will continue to work perfectly.',
  compVGeoFeat2Title: 'Global Processing',
  compVGeoFeat2Desc: 'No upload queues.',
  compVGeoFeat3Title: 'Instant Access',
  compVGeoFeat3Desc: 'Bypass server limits.'
};

let c = fs.readFileSync('src/i18n/translations.ts', 'utf8');

// Inject keys into interface and baseDict
let interfaceStrs = Object.keys(extraCompressStrings).map(k => `  ${k}?: string;`).join('\n');
let dictStrs = Object.entries(extraCompressStrings).map(([k, v]) => `  ${k}: "${v.replace(/"/g, '\\"')}",`).join('\n');

c = c.replace(/export interface UiDictionary \{/, `export interface UiDictionary {\n${interfaceStrs}`);
c = c.replace(/const baseDict: UiDictionary = \{/, `const baseDict: UiDictionary = {\n${dictStrs}`);

// Delete all languages except EN
c = c.replace(/export const UI_TRANSLATIONS: Record<string, UiDictionary> = \{[\s\S]*?\};/, `export const UI_TRANSLATIONS: Record<string, UiDictionary> = {\n  en: baseDict,\n};`);

fs.writeFileSync('src/i18n/translations.ts', c);

// Replace inside CompressVideo.tsx
let comp = fs.readFileSync('src/pages/CompressVideo.tsx', 'utf8');
comp = comp.replace(/Bank-Grade Privacy for Your Media/, "{t('compVPrivacyTitle') || 'Bank-Grade Privacy for Your Media'}");
comp = comp.replace(/>When you compress a home video or a sensitive corporate presentation, it should stay private\. Media Compressor acts as a purely local tool, effectively cutting the cord to the internet\.</, ">{t('compVPrivacyDesc') || 'When you compress a home video or a sensitive corporate presentation, it should stay private. Media Compressor acts as a purely local tool, effectively cutting the cord to the internet.'}<");
comp = comp.replace(/'No Cloud Storage', 'No Cookies', '100% Offline'/, "t('compVPrivacyBadge1') || 'No Cloud Storage', t('compVPrivacyBadge2') || 'No Cookies', t('compVPrivacyBadge3') || '100% Offline'");
comp = comp.replace(/Compress Video in 3 Steps/, "{t('compVHowToTitle') || 'Compress Video in 3 Steps'}");
comp = comp.replace(/title: "Select File"/, "title: t('compVHowToStep1') || 'Select File'");
comp = comp.replace(/description: "Drag and drop any MP4, MOV, or WebM video\."/, "description: t('compVHowToStep1Desc') || 'Drag and drop any MP4, MOV, or WebM video.'");
comp = comp.replace(/title: "Adjust Quality"/, "title: t('compVHowToStep2') || 'Adjust Quality'");
comp = comp.replace(/description: "Move the slider to choose between Extreme Size or High Quality\."/, "description: t('compVHowToStep2Desc') || 'Move the slider to choose between Extreme Size or High Quality.'");
comp = comp.replace(/title: "Save Immediately"/, "title: t('compVHowToStep3') || 'Save Immediately'");
comp = comp.replace(/description: "Click compress and download your video in seconds\."/, "description: t('compVHowToStep3Desc') || 'Click compress and download your video in seconds.'");
comp = comp.replace(/Unmatched Offline Capabilities/, "{t('compVGeoTitle2') || 'Unmatched Offline Capabilities'}");
comp = comp.replace(/>We built the world's most advanced in-browser media compression engine\.</, ">{t('compVGeoDesc2') || \"We built the world's most advanced in-browser media compression engine.\"}<");
comp = comp.replace(/>Works Without Internet</, ">{t('compVGeoFeat1Title') || 'Works Without Internet'}<");
comp = comp.replace(/>Try disconnecting your Wi-Fi right now\. This page and the compressor will continue to work perfectly\.</, ">{t('compVGeoFeat1Desc') || 'Try disconnecting your Wi-Fi right now. This page and the compressor will continue to work perfectly.'}<");

fs.writeFileSync('src/pages/CompressVideo.tsx', comp);

console.log('Injected missing CompressVideo translations');
