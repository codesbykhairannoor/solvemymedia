const fs = require('fs');
const path = require('path');
const { translate } = require('google-translate-api-x');

const KEYS = {
  navbarCropVideo: 'Crop Video',
  navbarVideoSpeed: 'Video Speed',
  navbarMuteVideo: 'Mute Video',
  navbarCreateGif: 'Video to GIF',
  navbarConvertAudio: 'Convert Audio',
  navbarTranscribe: 'Transcribe Media',
  navbarRecorder: 'Studio Recorder',
  toolCropVideoDesc: 'Resize and crop video framing for any aspect ratio.',
  toolVideoSpeedDesc: 'Speed up or slow down videos smoothly.',
  toolMuteVideoDesc: 'Strip audio tracks from video without re-encoding video frames.',
  toolCreateGifDesc: 'Turn video clips into lightweight, animated GIFs.',
  toolConvertAudioDesc: 'Convert audio between MP3, WAV, AAC, and FLAC instantly.',
  toolTranscribeDesc: 'Transcribe spoken words into text using client-side AI.',
  toolRecorderDesc: 'Record screen, webcam, and microphone with zero server upload.'
};

const LANG_MAP = {
  'zh-TW': 'zh-TW',
  'zh': 'zh-CN',
  'tl': 'tl',
  'he': 'iw'
};

function getGoogleLangCode(code) {
  return LANG_MAP[code] || code;
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

async function batchTranslate(strings, targetLang) {
  if (strings.length === 0) return [];
  const gLang = getGoogleLangCode(targetLang);
  const chunks = chunkArray(strings, 30);
  const results = [];

  for (const chunk of chunks) {
    try {
      const res = await translate(chunk, { to: gLang, rejectOnPartialFail: false });
      const texts = Array.isArray(res) ? res.map(r => r.text) : [res.text];
      results.push(...texts);
    } catch (e) {
      console.warn(`Translation warning for [${targetLang}]:`, e.message);
      results.push(...chunk);
    }
  }
  return results;
}

async function run() {
  console.log('🚀 Translating missing navbar and tool keys for 32 languages...\n');

  const transTsPath = path.join(__dirname, '../src/i18n/translations.ts');
  let transContent = fs.readFileSync(transTsPath, 'utf8');

  // 1. Add to UiDictionary interface
  const interfaceEndIdx = transContent.indexOf('}\n\nconst baseDict:');
  if (interfaceEndIdx !== -1) {
    let addTypes = '';
    for (const k of Object.keys(KEYS)) {
      if (!transContent.includes(`  ${k}?: string;`)) {
        addTypes += `  ${k}?: string;\n`;
      }
    }
    if (addTypes) {
      transContent = transContent.slice(0, interfaceEndIdx) + addTypes + transContent.slice(interfaceEndIdx);
    }
  }

  // 2. Add to baseDict
  for (const [k, v] of Object.entries(KEYS)) {
    const kRegex = new RegExp(`(\\n\\s*${k}:\\s*)['"][^'"]*['"]`);
    if (kRegex.test(transContent)) {
      transContent = transContent.replace(kRegex, `$1'${v}'`);
    } else {
      const baseDictEndIdx = transContent.indexOf('};\n\nexport const UI_TRANSLATIONS:');
      if (baseDictEndIdx !== -1) {
        transContent = transContent.slice(0, baseDictEndIdx) + `  ${k}: '${v}',\n` + transContent.slice(baseDictEndIdx);
      }
    }
  }

  // 3. For each language, translate and inject
  const langTsPath = path.join(__dirname, '../src/i18n/languages.ts');
  const langTs = fs.readFileSync(langTsPath, 'utf8');
  const allLangCodes = [...langTs.matchAll(/code:\s*'([^']+)'/g)].map(m => m[1]);

  const keyList = Object.keys(KEYS);
  const textList = Object.values(KEYS);

  for (const langCode of allLangCodes) {
    if (langCode === 'en') continue;

    console.log(`Translating navbar/tool keys for [${langCode}]...`);
    const translated = await batchTranslate(textList, langCode);

    const langRegex = new RegExp(`(['"]?${langCode}['"]?:\\s*\\{[\\s\\S]*?\\n  \\},)`);
    const match = transContent.match(langRegex);
    if (!match) continue;

    let block = match[1];

    keyList.forEach((k, idx) => {
      let tVal = translated[idx] || textList[idx];
      const escaped = tVal.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');

      const kRegex = new RegExp(`(\\n\\s*${k}:\\s*)['"][^'"]*['"]`);
      if (kRegex.test(block)) {
        block = block.replace(kRegex, `$1'${escaped}'`);
      } else {
        const lastClosingIdx = block.lastIndexOf('\n  },');
        block = block.slice(0, lastClosingIdx) + `\n    ${k}: '${escaped}',` + block.slice(lastClosingIdx);
      }
    });

    transContent = transContent.replace(match[1], block);
    console.log(`✅ [${langCode}] navbar/tool keys updated.`);
  }

  fs.writeFileSync(transTsPath, transContent, 'utf8');
  console.log('\n🎉 Successfully updated all navbar and tool translations!');
}

run().catch(console.error);
