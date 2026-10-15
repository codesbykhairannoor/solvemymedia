const fs = require('fs');
const path = require('path');
const { translate } = require('google-translate-api-x');

// The 32 languages of SolveMyMedia
const LANGUAGES = [
  'en', 'id', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ru',
  'ja', 'ko', 'zh', 'zh-TW', 'tr', 'vi', 'th', 'ar', 'hi', 'sv',
  'no', 'da', 'fi', 'cs', 'hu', 'el', 'ro', 'uk', 'ms', 'tl',
  'he', 'sk'
];

const LANG_MAP = {
  'zh-TW': 'zh-TW',
  'zh': 'zh-CN',
  'tl': 'tl',
  'he': 'iw'
};

function getGoogleLangCode(code) {
  return LANG_MAP[code] || code;
}

const ENGLISH_KEYS = {
  toolRemoveAudioMetadata: "Remove Audio Metadata",
  removeAudioMetadataDesc: "Strip ID3 tags, C2PA AI manifests, SynthID watermarks, DAW signatures, and album artwork from MP3, WAV, and FLAC files. 100% private in-browser cleaner.",
  seoRemoveAudioMetadataTitle: "Remove Audio Metadata Online Free — Strip ID3, C2PA & SynthID Tags",
  seoRemoveAudioMetadataDesc: "Clean MP3, WAV, FLAC, and AAC audio files by removing ID3 tags, artist names, DAW timestamps, and AI watermarks. Pure lossless copy with zero re-encoding.",
  navbarRemoveAudioMetadata: "Remove Audio Metadata",

  rmaFileInspector: "Audio Metadata Scrubber",
  rmaSubtitle: "Select audio tracking tags to strip without re-encoding.",
  rmaOptId3: "Strip ID3 & Vorbis Tags",
  rmaOptAi: "Remove C2PA & AI Watermarks",
  rmaOptDaw: "Clear DAW & Encoder Signatures",
  rmaOptArt: "Remove Embedded Artwork & Lyrics",
  rmaFlipDetail: "Forensic Details (Flip) 🔄",
  rmaFlipBack: "Return to Settings ➔",
  rmaDetailTitle: "Audio Forensic Sheet (Reverse Side)",
  rmaDetailSubtitle: "Deep container analysis & embedded atom audit",
  rmaCleanContainer: "Clean container with no tracking tags",
  rmaDetected: "Detected:",
  rmaActionBtn: "Remove Audio Metadata",
  rmaProcessing: "Stripping Audio Metadata...",
  rmaSuccess: "Audio Sanitized Successfully!",
  rmaDownload: "Download Clean Audio",
  rmaError: "Failed to strip audio metadata. Please ensure the audio file is valid.",

  rmaHeroPill: "100% Client-Side Audio Privacy",
  rmaHeroTitle: "Wipe ID3 Tags, AI Watermarks, and DAW Signatures from Any Audio",
  rmaHeroDesc: "Audio files often store your computer username, DAW project path, SynthID provenance, and embedded artist data. SolveMyMedia cleans all hidden tags directly in browser memory before you distribute or share.",
  rmaStep1Title: "Upload Audio File",
  rmaStep1Desc: "Drop your MP3, WAV, FLAC, AAC, or OGG file directly into the browser. No files are ever sent to external cloud servers.",
  rmaStep2Title: "Deep Audio Tag Audit",
  rmaStep2Desc: "Our binary scanner audits ID3v2, C2PA manifests, SynthID watermarks, and RIFF INFO chunks in real-time.",
  rmaStep3Title: "Lossless Stream Strip",
  rmaStep3Desc: "FFmpeg executes in WebAssembly to strip metadata losslessly with -c:a copy, retaining 100% original acoustic bit depth and frequency.",
  rmaBentoTitle: "Engineered for Acoustic Purity & Privacy",
  rmaBentoCard1Title: "Bit-for-Bit Lossless Copy",
  rmaBentoCard1Desc: "No re-encoding or audio compression. Your audio spectrum, bit rate (320kbps or 24-bit PCM), and dynamics stay completely untouched.",
  rmaBentoCard2Title: "AI Audio & SynthID Scrubber",
  rmaBentoCard2Desc: "Removes C2PA manifests, Google SynthID metadata, Suno AI tags, Udio prompts, and ElevenLabs voice identifiers.",
  rmaBentoCard3Title: "DAW Privacy Protection",
  rmaBentoCard3Desc: "Eliminates Ableton Live, Logic Pro, Pro Tools, and FL Studio project paths, software serials, and machine usernames.",
  rmaBentoCard4Title: "Store & Streaming Compliant",
  rmaBentoCard4Desc: "Prepare pristine audio files ready for commercial release, podcast distribution, or anonymous online uploads.",
  rmaFaq1Q: "Does removing audio metadata change the sound quality?",
  rmaFaq1A: "Not at all. We use lossless stream copy (-c:a copy) which only strips the container tags and header chunks without touching a single audio frame.",
  rmaFaq2Q: "Can it detect and remove Google SynthID and AI music tags?",
  rmaFaq2A: "Yes. It inspects ID3v2 GEOB frames and C2PA manifests to remove Google SynthID, Suno AI, Udio, and ElevenLabs provenance signatures.",
  rmaFaq3Q: "Which audio formats are supported?",
  rmaFaq3A: "We support all common audio containers including MP3, WAV, FLAC, AAC, M4A, OGG, and OPUS.",
  rmaFaq4Q: "Are my private audio recordings uploaded to any server?",
  rmaFaq4A: "Never. All inspection and stripping processes run completely inside your device's browser using WebAssembly. Your files never leave your computer.",

  toolEditAudioMetadata: "Edit Audio Metadata",
  editAudioMetadataDesc: "Edit ID3 tags, song title, artist, album, year, genre, and cover details online. Fast, lossless tag editor running 100% inside your browser.",
  seoEditAudioMetadataTitle: "Edit Audio Metadata Online Free — Lossless MP3 & ID3 Tag Editor",
  seoEditAudioMetadataDesc: "Update ID3 tags, song titles, artists, albums, and release years on MP3, WAV, and FLAC tracks. Fast, browser-based metadata editor with smart auto-fill.",
  navbarEditAudioMetadata: "Edit Audio Metadata",

  edaFileInspector: "Audio ID3 Tag Editor",
  edaSubtitle: "Losslessly modify track title, artist, album, year, and genre tags.",
  edaAutoFilled: "Auto-filled {count} fields from audio analysis",
  edaFieldTitle: "Track Title",
  edaFieldArtist: "Artist / Performer",
  edaFieldAlbum: "Album Name",
  edaFieldYear: "Year / Date",
  edaFieldGenre: "Genre",
  edaFieldTrack: "Track Number",
  edaFieldComposer: "Composer / Producer",
  edaFieldComment: "Comment / Copyright Notes",
  edaActionBtn: "Save & Update Audio Tags",
  edaResetBtn: "Reset to Original",
  edaProcessing: "Injecting ID3 Tags...",
  edaSuccess: "Audio Tags Updated Successfully!",
  edaDownload: "Download Tagged Audio",
  edaError: "Failed to update audio metadata. Please ensure the audio file is valid.",

  edaHeroPill: "Lossless Studio Tag Editor",
  edaHeroTitle: "Organize, Edit, and Brand Your Audio Tracks with Ease",
  edaHeroDesc: "Correct misspelled titles, update artist names, add release years, and embed genre tags across your music library. Works client-side without re-encoding audio.",
  edaStep1Title: "Select Track or Voice Memo",
  edaStep1Desc: "Import any MP3, WAV, FLAC, or M4A audio file from your device. The editor parses existing ID3 tags instantly.",
  edaStep2Title: "Customize Track Metadata",
  edaStep2Desc: "Fine-tune song title, artist, album, genre, release year, track number, and producer credits.",
  edaStep3Title: "Export Clean Tagged Audio",
  edaStep3Desc: "Download your updated audio file with newly injected metadata, fully compatible with Spotify, Apple Music, and DJ software.",
  edaBentoTitle: "Built for Musicians, Podcasters & Sound Engineers",
  edaBentoCard1Title: "Zero Re-encoding Artifacts",
  edaBentoCard1Desc: "Unlike traditional converters that recompress your music, our editor injects tags directly into the container header for 100% audio fidelity.",
  edaBentoCard2Title: "Smart Auto-Fill Intelligence",
  edaBentoCard2Desc: "Automatically detects song titles from clean filenames and suggests artist, year, and genre tags to save you time.",
  edaBentoCard3Title: "DJ & Car Stereo Compatibility",
  edaBentoCard3Desc: "Formats ID3v2.3 and ID3v2.4 tags for flawless display in Pioneer CDJs, Rekordbox, Serato, Traktor, and vehicle infotainment screens.",
  edaBentoCard4Title: "Podcast & Audiobook Chaptering",
  edaBentoCard4Desc: "Embed standardized episode numbers, release dates, and creator credits for Apple Podcasts and Spotify compliance.",
  edaFaq1Q: "Which ID3 tag version is written to MP3 files?",
  edaFaq1A: "We write industry-standard ID3v2.3 and ID3v2.4 tags with UTF-8 encoding, ensuring maximum compatibility across all modern players and older hardware.",
  edaFaq2Q: "Does editing tags re-encode my audio track?",
  edaFaq2A: "No. We copy the raw audio bitstream without re-encoding (-c:a copy), so your audio remains 100% lossless.",
  edaFaq3Q: "Can I edit metadata for WAV and FLAC files?",
  edaFaq3A: "Yes! We support WAV RIFF INFO chunks, FLAC Vorbis comments, and MP4/M4A audio tags in addition to standard MP3 ID3 tags.",
  edaFaq4Q: "Can I use this for DJ software like Rekordbox and Serato?",
  edaFaq4A: "Absolutely. Tags edited here will immediately reflect in Rekordbox, Serato DJ, Traktor, and iTunes libraries."
};

async function translateBatch(texts, targetLang) {
  try {
    const res = await translate(texts, { to: getGoogleLangCode(targetLang) });
    if (Array.isArray(res)) {
      return res.map(r => r.text);
    } else if (res && res.text) {
      return [res.text];
    }
  } catch (err) {
    console.warn(`Batch translation failed for ${targetLang}, falling back:`, err.message);
  }
  return texts; // fallback to english
}

async function run() {
  console.log('Starting Audio Metadata translation across 32 languages...');
  const outPath = path.join(__dirname, '../src/data/metadata-audio-translations.json');
  
  let result = {};
  if (fs.existsSync(outPath)) {
    try {
      result = JSON.parse(fs.readFileSync(outPath, 'utf8'));
    } catch (_) {}
  }

  // English is base
  result['en'] = { ...ENGLISH_KEYS };

  const keys = Object.keys(ENGLISH_KEYS);
  const values = Object.values(ENGLISH_KEYS);

  for (const lang of LANGUAGES) {
    if (lang === 'en') continue;

    // Check if lang already fully translated
    if (result[lang] && keys.every(k => result[lang][k])) {
      console.log(`Lang [${lang}] already completed. Skipping.`);
      continue;
    }

    console.log(`Translating [${lang}] (${keys.length} keys)...`);
    
    // Chunk requests into batches of 15 to prevent rate limits
    const chunkSize = 15;
    const translatedValues = [];

    for (let i = 0; i < values.length; i += chunkSize) {
      const slice = values.slice(i, i + chunkSize);
      const translatedSlice = await translateBatch(slice, lang);
      translatedValues.push(...translatedSlice);
      // Small pause between chunks
      await new Promise(r => setTimeout(r, 200));
    }

    result[lang] = {};
    for (let i = 0; i < keys.length; i++) {
      result[lang][keys[i]] = translatedValues[i] || values[i];
    }

    console.log(`✓ Completed [${lang}]`);
    // Save incrementally
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  }

  console.log('All 32 languages successfully translated and saved to:', outPath);
}

run().catch(console.error);
