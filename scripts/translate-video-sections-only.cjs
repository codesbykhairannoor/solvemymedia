const fs = require('fs');
const path = require('path');
const { translate } = require('google-translate-api-x');

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

const NEW_VIDEO_KEYS = {
  rmvFlipDetail: "Forensic Details (Flip) 🔄",
  rmvFlipBack: "Return to Cleaner ➔",
  rmvDetailTitle: "Video Forensic Sheet (Reverse Side)",
  rmvDetailSubtitle: "Complete forensics of video container atoms and metadata",
  rmvTimeLabel: "Time & Date:",
  rmvAiLabel: "AI Watermark (C2PA):",
  rmvEncoderLabel: "Software / Encoder:",
  rmvNotFound: "Not found",
  rmvCleanNone: "Clean / None",
  rmvNotEmbedded: "Not embedded",
  rmvResLabel: "Resolution:",
  rmvDurationLabel: "Duration:",
  rmvFormatLabel: "Container:",

  rmvRadarBadge: "THREAT RADAR: REAL-TIME SCANNER",
  rmvRadarTitle: "Hidden Forensic Footprints Inside Video Files",
  rmvRadarSubtitle: "Smartphones and video cameras embed intrusive tracking metadata inside MP4, MOV, and MKV files. Our client-side scanner pinpoints and eliminates threats instantly.",
  rmvThreatGpsTitle: "GPS Geotag Coordinates",
  rmvThreatGpsDesc: "Exact latitude, longitude, and altitude atoms recorded by camera GPS sensors.",
  rmvThreatDevTitle: "Camera Hardware & Serial",
  rmvThreatDevDesc: "iPhone model (e.g. A3084), lens serial, and camera hardware firmware.",
  rmvThreatTimeTitle: "Subsecond Timestamps",
  rmvThreatTimeDesc: "Creation date, modification clock, and precise timecode of recording.",

  rmvVectorsBadge: "SECURITY THREAT VECTORS",
  rmvVectorsTitle: "Why Scrubbing Video Metadata is Essential",
  rmvVectorsSubtitle: "Avoid privacy leaks before posting videos to social media, messaging apps, or journalism outlets.",
  rmvVector1Title: "Home & Workplace Location Tracking",
  rmvVector1Desc: "Smartphones automatically tag videos with GPS coordinates accurate within 3 meters. Sharing unscrubbed videos exposes your home, workplace, or travel routes.",
  rmvVector2Title: "Hardware Fingerprinting & Device Serials",
  rmvVector2Desc: "Camera make, lens model, serial numbers, and firmware versions are baked into container atoms, uniquely identifying your physical camera device across platforms.",
  rmvVector3Title: "Temporal & Digital Timeline Profiling",
  rmvVector3Desc: "Creation timestamps and editing history reveal your sleep patterns, work schedule, and internal project file naming schemes.",

  rmvMetric1Val: "0 Bytes",
  rmvMetric1Title: "Cloud Uploads",
  rmvMetric1Desc: "Files never leave your browser RAM. 100% GDPR & privacy compliant.",
  rmvMetric2Val: "0.00 dB",
  rmvMetric2Title: "Quality Delta",
  rmvMetric2Desc: "Lossless stream copy (-c copy). Zero transcoding, zero re-compression.",
  rmvMetric3Val: "100%",
  rmvMetric3Title: "GPS & EXIF Cleared",
  rmvMetric3Desc: "Neutralizes QuickTime udta, ilst, and XMP tracking packets cleanly.",

  rmvMatrixTitle: "Video Privacy Inspection Matrix",
  rmvMatrixColVector: "Metadata Vector",
  rmvMatrixColRaw: "Unsanitized Raw Video",
  rmvMatrixColClean: "SolveMyMedia Scrubbed Output",
  rmvMatrixRow1Vector: "GPS Geolocation (©xyz, xyz )",
  rmvMatrixRow1Raw: "Exact lat/long coordinate pinpoint",
  rmvMatrixRow1Clean: "✓ 100% Wiped Clean",
  rmvMatrixRow2Vector: "Device Hardware Serial & Model",
  rmvMatrixRow2Raw: "Camera serial, phone model (A3084)",
  rmvMatrixRow2Clean: "✓ Zero hardware fingerprints",
  rmvMatrixRow3Vector: "Exact Recording Timestamp",
  rmvMatrixRow3Raw: "Creation date & subsecond clock",
  rmvMatrixRow3Clean: "✓ Neutralized to null",
  rmvMatrixRow4Vector: "C2PA / AI Watermark Manifests",
  rmvMatrixRow4Raw: "Embedded AI provenance metadata",
  rmvMatrixRow4Clean: "✓ Stripped from container",
  rmvMatrixRow5Vector: "Video Visual Quality & Framerate",
  rmvMatrixRow5Raw: "Original 4K / 1080p stream",
  rmvMatrixRow5Clean: "✓ 100% Untouched (-c copy)",

  edtClapperBadge: "HOLLYWOOD SLATE • CONTAINER TAG STUDIO",
  edtClapperTitle: "Professional Video Tag & Atom Editor",
  edtClapperSubtitle: "Inject standard title, artist, director, release year, and genre tags into MP4, MOV, and MKV video files losslessly in seconds.",
  edtClapperProd: "PRODUCTION",
  edtClapperProdVal: "SolveMyMedia Cinema",
  edtClapperScene: "SCENE: 01",
  edtClapperTake: "TAKE: 01",
  edtClapperFps: "FPS: 24.00",
  edtClapperTitleLbl: "Title",
  edtClapperTitleVal: "Afternoon Cinematic Reel",
  edtClapperDirLbl: "Director / Artist",
  edtClapperDirVal: "Studio Master",
  edtClapperYearLbl: "Release Year",
  edtClapperYearVal: "2026",
  edtClapperGenreLbl: "Genre",
  edtClapperGenreVal: "Cinematic Documentary",
  edtClapperFmtLbl: "Format",
  edtClapperFmtVal: "MP4 H.264 • 4K UHD • Lossless Remux",

  edtFilmstripBadge: "35MM PRODUCTION WORKFLOW",
  edtFilmstripTitle: "3-Step Video Tagging Pipeline",
  edtFilmstripSubtitle: "Modern container atom injection without re-encoding video frames.",
  edtFilmStep1Title: "FRAME 01 / Import Video",
  edtFilmStep1Desc: "Drop your MP4, MOV, or MKV file. Our scanner instantly extracts existing udta, ilst, and EBML metadata.",
  edtFilmStep2Title: "FRAME 02 / Edit Metadata",
  edtFilmStep2Desc: "Set title, artist/director, release year, and genre. Use auto-fill to instantly clean up messy filenames.",
  edtFilmStep3Title: "FRAME 03 / Instant Stream Copy",
  edtFilmStep3Desc: "FFmpeg WebAssembly writes new metadata atoms directly into the file header in under 1 second with 0 re-encoding.",

  edtCompatBadge: "MEDIA SERVER ECOSYSTEM",
  edtCompatTitle: "Seamless Home Theater & Streaming Indexing",
  edtCompatSubtitle: "Metadata injected by SolveMyMedia conforms to strict media server standards for automatic poster matching, sorting, and indexing.",
  edtCompat1Title: "Apple TV & QuickTime",
  edtCompat1Desc: "Native iTunes ilst metadata tags ensure movies and home videos appear with correct titles and cover details in iOS and macOS.",
  edtCompat2Title: "Plex Media Server",
  edtCompat2Desc: "Standardized year and title atoms allow Plex to instantly match movies and TV shows without manual metadata fixing.",
  edtCompat3Title: "Jellyfin & Kodi",
  edtCompat3Desc: "Fully compatible with open-source home theater servers. Clean container tags prevent scanning errors and mismatched titles.",
  edtCompat4Title: "VLC & Windows Media Player",
  edtCompat4Desc: "Display accurate track titles, artists, and release years in desktop playlists and file property dialogs.",

  edtSpecsTitle: "Video Container Tag Standard Matrix",
  edtSpecsColContainer: "Container",
  edtSpecsColSpec: "Tag Specification",
  edtSpecsColFields: "Supported Fields",
  edtSpecsColFidelity: "Fidelity",
  edtSpecsFmt1: "MP4 (.mp4)",
  edtSpecsSpec1: "ISO BMFF ilst Atoms",
  edtSpecsFields1: "©nam (Title), ©ART (Artist), ©day, ©gen",
  edtSpecsFid1: "Stream Copy",
  edtSpecsFmt2: "QuickTime (.mov)",
  edtSpecsSpec2: "QuickTime udta Atoms",
  edtSpecsFields2: "titl, auth, yrrc, gnre, dscp, cprt",
  edtSpecsFid2: "ProRes Preserved",
  edtSpecsFmt3: "Matroska (.mkv)",
  edtSpecsSpec3: "EBML Info & Tags",
  edtSpecsFields3: "TITLE, ARTIST, DATE_RELEASED, COMMENT",
  edtSpecsFid3: "Bit-Exact Remux",
  edtSpecsFmt4: "WebM (.webm)",
  edtSpecsSpec4: "EBML Segment Info",
  edtSpecsFields4: "Title, MuxingApp, WritingApp",
  edtSpecsFid4: "VP9 / AV1 Untouched",
  edtResetBtn: "Reset",
  edtResetTitle: "Reset fields to original detected tags"
};

async function translateChunkWithTimeout(texts, targetLang) {
  const gLang = getGoogleLangCode(targetLang);
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Translation timeout after 6s')), 6000)
  );
  
  const transPromise = translate(texts, { to: gLang, rejectOnPartialFail: false });
  const res = await Promise.race([transPromise, timeoutPromise]);
  if (Array.isArray(res)) {
    return res.map(r => r.text);
  }
  return [res.text];
}

async function translateArraySafe(texts, targetLang) {
  const CHUNK = 15;
  const results = [];

  for (let i = 0; i < texts.length; i += CHUNK) {
    const slice = texts.slice(i, i + CHUNK);
    try {
      const textsResult = await translateChunkWithTimeout(slice, targetLang);
      results.push(...textsResult);
    } catch (e) {
      for (const item of slice) {
        try {
          const single = await translateChunkWithTimeout([item], targetLang);
          results.push(single[0]);
        } catch (_) {
          results.push(item);
        }
      }
    }
    await new Promise(r => setTimeout(r, 60));
  }
  return results;
}

async function main() {
  const videoPath = path.join(__dirname, '../src/data/metadata-video-translations.json');
  console.log('Starting Video Metadata translations in parallel...');

  let data = {};
  if (fs.existsSync(videoPath)) {
    data = JSON.parse(fs.readFileSync(videoPath, 'utf8'));
  }

  if (!data['en']) data['en'] = {};
  Object.assign(data['en'], NEW_VIDEO_KEYS);

  const keys = Object.keys(NEW_VIDEO_KEYS);
  const values = Object.values(NEW_VIDEO_KEYS);

  for (const lang of LANGUAGES) {
    if (lang === 'en') continue;
    if (!data[lang]) data[lang] = {};

    const neededIndices = [];
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (!data[lang][k] || data[lang][k] === values[i]) {
        neededIndices.push(i);
      }
    }

    if (neededIndices.length === 0) {
      console.log(`✓ [${lang}] video already complete.`);
      continue;
    }

    console.log(`Translating video [${lang}]: ${neededIndices.length} keys...`);
    const sliceTexts = neededIndices.map(idx => values[idx]);
    const translated = await translateArraySafe(sliceTexts, lang);

    for (let j = 0; j < neededIndices.length; j++) {
      const originalIndex = neededIndices[j];
      data[lang][keys[originalIndex]] = translated[j] || values[originalIndex];
    }

    fs.writeFileSync(videoPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✓ [${lang}] video saved.`);
  }

  console.log('All video translations complete!');
}

main().catch(console.error);
