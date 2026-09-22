const fs = require('fs');
const path = require('path');
const { translate } = require('google-translate-api-x');

// 1. All new keys to translate across all 30+ languages
const NEW_KEYS = {
  // Desktop container notice in MediaLivePreview.tsx (user reported)
  desktopContainerTitle: '.{ext} Container Ready',
  desktopContainerDesc: 'Web browsers only support inline playback for MP4 and WebM. Your .{ext} file is 100% encoded and ready to play in VLC, Windows Media Player, QuickTime, TVs, or your target device!',
  desktopContainerTip: '💡 Tip: To preview and play directly inside web browsers or websites, choose .mp4 or .webm.',
  downloadExtResult: 'Download .{ext} Result',
  
  // Desktop player notice in ConvertVideo.tsx (user reported)
  desktopPlayerNotice: '💡 .{ext} is optimized for desktop media players (VLC, Windows Media Player, TV, phones). For instant in-browser playback, select .mp4 or .webm.',
  
  // Advanced codec card in MediaLivePreview.tsx (user reported)
  advancedCodec: 'Advanced Codec',
  advancedCodecDesc: "Browser engines cannot preview this file's codec (such as HEVC/H.265 or 10-bit color) natively in the live player. Don't worry, SolveMyMedia's engine fully supports it and will process it into a universal web-compatible format!",
  readyToProcessPrompt: 'Ready to process — Click to start',
  nativePlayerCodecUnavailable: "Native player preview is unavailable for this file's codec (e.g. HEVC/H.265). It will be processed properly upon processing!",
  obscureContainerDesc: 'Browser engines do not natively decode .{ext} containers in the player, but it will be processed and playable once processed!',
  
  // Media live preview UI labels (user reported)
  liveVideoPreview: 'Live Video Preview',
  liveAudioPreview: 'Live Audio Preview',
  previewOriginalVideo: 'Original Video',
  previewOriginalAudio: 'Original Audio',
  previewResultVideo: 'Result Video',
  previewResultAudio: 'Result Audio',
  previewOriginal: 'Original',
  previewResult: 'Result',
  resultFile: 'Result File',
  highQualityAudioResult: 'High Quality Audio Result',
  readyToProcess: 'Ready to process',
  processingPercent: 'Processing',
  
  // Tool success titles in MediaLivePreview.tsx
  cropSuccess: 'Video Cropped Successfully! 🎉',
  wmSuccess: 'Watermark Applied Successfully! 🎉',
  mvSuccess: 'Audio Removed Successfully! 🎉',
  compVSuccess: 'Video Compressed Successfully! 🎉',
  compASuccess: 'Audio Compressed Successfully! 🎉',
  speedSuccess: 'Video Speed Adjusted! 🎉',
  convASuccess: 'Audio Converted Successfully! 🎉',
  v2aSuccess: 'Audio Extracted Successfully! 🎉',
  convVSuccess: 'File Converted Successfully! 🎉',
  genericSuccess: 'Processing Completed Successfully! 🎉',
  
  // Watermark video moving
  wmMoving: 'Moving / Bouncing',
  
  // Footer
  footerBrandDesc: 'Next-generation private browser media tools. Compress, convert, transcribe, and edit entirely in your browser memory.',
  footerVideoTools: 'Video Tools',
  footerAudioTools: 'Audio Tools',
  footerSolutions: 'Workflows',
  
  // Related tools
  relatedToolsBadge: 'Recommended Tools',
  relatedToolsTitle: 'Explore More Powerful Media Tools',
  relatedToolsDesc: 'All processing happens locally in your browser with WebAssembly. No file size limits, 100% private.',
  tryToolBtn: 'Open Tool',
  
  // Workspace common
  cwUploadDesc: 'Upload your media below to process it directly in your browser without compromising privacy.',
  
  // Mute video
  mvRemove: 'Remove Audio',
  mvDesc: 'This tool instantly strips all audio tracks from your video. The video quality is completely preserved.',
  mvFastDesc: 'This process does not re-encode your video, so it will finish in less than a second.',
  mvAction: 'Mute Video',

  // Crop presets
  cropPortrait: '4:5 Portrait',
  cropPortraitDesc: 'Instagram Feed Portrait',
  cropStandard: '4:3 Standard',
  cropStandardDesc: 'Classic TV & Tablets',
  cropUltrawide: '21:9 Ultrawide',
  cropUltrawideDesc: 'Cinematic CinemaScope',

  // Size cards in compression
  originalSize: 'Original Size',
  actualSize: 'Actual Size',
  targetSize: 'Target Size',
  actualResult: 'Actual Result',
  estimatedResult: 'Estimated Result',
  savedStorage: 'Saved {percent}% storage!',
  increasedStorage: 'Increased by {percent}%',

  // Audio format descriptions
  audFmtUniversal: 'Universal',
  audFmtLosslessPCM: 'Lossless PCM',
  audFmtAppleAAC: 'Apple AAC',
  audFmtHighQuality: 'High Quality',
  audFmtLosslessHD: 'Lossless HD',
  audFmtVorbisWeb: 'Vorbis Web',
  audFmtEfficient: 'Efficient',
  audFmtWindows: 'Windows',
  audFmtStudioAudio: 'Studio Audio',
  audFmtDolbySurround: 'Dolby Surround'
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
  console.log('🚀 Starting Translation & Injection for 30+ Languages...\n');

  const transTsPath = path.join(__dirname, '../src/i18n/translations.ts');
  let transContent = fs.readFileSync(transTsPath, 'utf8');

  // 1. Get all supported language codes
  const langTsPath = path.join(__dirname, '../src/i18n/languages.ts');
  const langTs = fs.readFileSync(langTsPath, 'utf8');
  const allLangCodes = [...langTs.matchAll(/code:\s*'([^']+)'/g)].map(m => m[1]);
  console.log(`Found ${allLangCodes.length} languages: ${allLangCodes.join(', ')}\n`);

  // 2. Add interface types to UiDictionary if missing
  console.log('Checking UiDictionary interface...');
  const interfaceEndIdx = transContent.indexOf('}\n\nconst baseDict:');
  if (interfaceEndIdx !== -1) {
    let interfaceAdditions = '';
    for (const key of Object.keys(NEW_KEYS)) {
      if (!transContent.includes(`  ${key}?: string;`)) {
        interfaceAdditions += `  ${key}?: string;\n`;
      }
    }
    if (interfaceAdditions) {
      transContent = transContent.slice(0, interfaceEndIdx) + interfaceAdditions + transContent.slice(interfaceEndIdx);
      console.log('Updated UiDictionary interface with new keys.');
    }
  }

  // 3. Add new keys to baseDict if missing
  console.log('Checking baseDict...');
  const baseDictEndIdx = transContent.indexOf('};\n\nexport const UI_TRANSLATIONS:');
  if (baseDictEndIdx !== -1) {
    let baseAdditions = '';
    for (const [key, val] of Object.entries(NEW_KEYS)) {
      if (!transContent.includes(`  ${key}: `)) {
        const escaped = val.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
        baseAdditions += `  ${key}: '${escaped}',\n`;
      }
    }
    if (baseAdditions) {
      transContent = transContent.slice(0, baseDictEndIdx) + baseAdditions + transContent.slice(baseDictEndIdx);
      console.log('Updated baseDict with new English keys.');
    }
  }

  // 4. Translate for each language and inject
  const keyList = Object.keys(NEW_KEYS);
  const textList = Object.values(NEW_KEYS);

  for (const langCode of allLangCodes) {
    if (langCode === 'en') continue;

    // Check where this language's dictionary is located in transContent
    // Language blocks look like: `'id': {` or `id: {`
    const langRegex = new RegExp(`(['"]?${langCode}['"]?:\\s*\\{[\\s\\S]*?\\n  \\},)`);
    const match = transContent.match(langRegex);

    if (!match) {
      console.warn(`Could not locate block for [${langCode}], skipping.`);
      continue;
    }

    const block = match[1];

    // Identify which keys are truly missing in this block
    const missingKeys = [];
    const missingTexts = [];

    keyList.forEach((k, idx) => {
      const kRegex = new RegExp(`\\b${k}\\s*:`);
      if (!kRegex.test(block)) {
        missingKeys.push(k);
        missingTexts.push(textList[idx]);
      }
    });

    if (missingKeys.length === 0) {
      console.log(`✨ [${langCode}] already has all ${keyList.length} keys.`);
      continue;
    }

    console.log(`Translating ${missingKeys.length} keys for [${langCode}]...`);
    const translatedTexts = await batchTranslate(missingTexts, langCode);

    // Build the lines to inject
    let injectLines = '';
    missingKeys.forEach((k, idx) => {
      let tText = translatedTexts[idx] || missingTexts[idx];
      
      // Clean up placeholder casing
      tText = tText.replace(/\{\s*ext\s*\}/gi, '{ext}')
                   .replace(/\{\s*percent\s*\}/gi, '{percent}');

      const escaped = tText.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
      injectLines += `    ${k}: '${escaped}',\n`;
    });

    // Replace the closing `  },` of this block with the new lines + `  },`
    const lastClosingIdx = block.lastIndexOf('\n  },');
    if (lastClosingIdx !== -1) {
      const newBlock = block.slice(0, lastClosingIdx) + '\n' + injectLines + '  },';
      transContent = transContent.replace(block, newBlock);
      console.log(`✅ [${langCode}] injected ${missingKeys.length} translated keys.`);
    }
  }

  // 5. Save updated translations.ts
  fs.writeFileSync(transTsPath, transContent, 'utf8');
  console.log('\n🎉 Successfully updated src/i18n/translations.ts with all 30+ languages!');
}

run().catch(console.error);
