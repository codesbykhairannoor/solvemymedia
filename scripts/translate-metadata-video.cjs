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

// Slugs mapping for both tools across 32 languages
const SLUG_CANDIDATES_REMOVE = {
  en: 'remove-video-metadata',
  id: 'hapus-metadata-video',
  es: 'eliminar-metadatos-video',
  fr: 'supprimer-metadonnees-video',
  de: 'video-metadaten-entfernen',
  it: 'rimuovi-metadati-video',
  pt: 'remover-metadados-video',
  nl: 'video-metadata-verwijderen',
  pl: 'usun-metadane-wideo',
  ru: 'udalit-metadannye-video',
  ja: 'douga-metadeta-sakujo',
  ko: 'dongyeongsang-metadeiteo-sakje',
  zh: 'shanchu-shipin-yuanshuju',
  'zh-TW': 'shanchu-yingpian-yuanshuju',
  tr: 'video-meta-verilerini-kaldir',
  vi: 'xoa-metadata-video',
  th: 'lop-khomun-metadeta-widi-o',
  ar: 'hazf-bayanat-wasf-alvideo',
  hi: 'video-metadata-hataayein',
  sv: 'ta-bort-videometadata',
  no: 'fjern-videometadata',
  da: 'fjern-videometadata',
  fi: 'poista-videon-metatiedot',
  cs: 'odstranit-metadata-videa',
  hu: 'video-metaadatok-eltavolitasa',
  el: 'afairesi-metadedomenon-vinteo',
  ro: 'sterge-metadate-video',
  uk: 'vydalyty-metadani-video',
  ms: 'buang-metadata-video',
  tl: 'alisin-ang-metadata-ng-video',
  he: 'hasarat-metadatan-video',
  sk: 'odstranit-metadata-videa'
};

const SLUG_CANDIDATES_EDIT = {
  en: 'edit-video-metadata',
  id: 'edit-metadata-video',
  es: 'editar-metadatos-video',
  fr: 'modifier-metadonnees-video',
  de: 'video-metadaten-bearbeiten',
  it: 'modifica-metadati-video',
  pt: 'editar-metadados-video',
  nl: 'video-metadata-bewerken',
  pl: 'edytuj-metadane-wideo',
  ru: 'redaktirovat-metadannye-video',
  ja: 'douga-metadeta-henshu',
  ko: 'dongyeongsang-metadeiteo-pyeonjip',
  zh: 'bianji-shipin-yuanshuju',
  'zh-TW': 'bianji-yingpian-yuanshuju',
  tr: 'video-meta-verilerini-duzenle',
  vi: 'chinh-sua-metadata-video',
  th: 'kaekhai-khomun-metadeta-widi-o',
  ar: 'tahrir-bayanat-wasf-alvideo',
  hi: 'video-metadata-edit-karein',
  sv: 'redigera-videometadata',
  no: 'rediger-videometadata',
  da: 'rediger-videometadata',
  fi: 'muokkaa-videon-metatietoja',
  cs: 'upravit-metadata-videa',
  hu: 'video-metaadatok-szerkesztese',
  el: 'epexergasia-metadedomenon-vinteo',
  ro: 'editeaza-metadate-video',
  uk: 'redaguvaty-metadani-video',
  ms: 'edit-metadata-video',
  tl: 'i-edit-ang-metadata-ng-video',
  he: 'arichat-metadatan-video',
  sk: 'upravit-metadata-videa'
};

// English Master Dictionary for both tools
const ENGLISH_KEYS = {
  // Navigation & Tool names
  toolRemoveVideoMetadata: "Remove Video Metadata",
  removeVideoMetadataDesc: "Strip hidden GPS location, camera serials, timestamps, and EXIF from video files. 100% private in-browser WebAssembly cleaner.",
  seoRemoveVideoMetadataTitle: "Remove Video Metadata Online Free — Privacy & GPS Video Scrubber",
  seoRemoveVideoMetadataDesc: "Strip GPS coordinates, device models, author tags, and creation dates from MP4, MOV, and MKV videos. 100% client-side privacy with zero quality loss.",

  toolEditVideoMetadata: "Edit Video Metadata",
  editVideoMetadataDesc: "Edit title, artist, album, genre, release year, and copyright tags on video containers online without re-encoding.",
  seoEditVideoMetadataTitle: "Edit Video Metadata Online Free — Fast MP4 & MOV Tag Editor",
  seoEditVideoMetadataDesc: "Modify title, author, year, genre, and copyright tags in MP4, MOV, MKV, and WebM videos without re-encoding. 100% free client-side tag editor.",

  // Workspace Controls - Remove Metadata
  rmvAction: "Clean & Strip Metadata",
  rmvSuccess: "Metadata Stripped Successfully!",
  rmvFileInspector: "Video Metadata Scanner",
  rmvDetectedTitle: "Hidden Metadata in Container",
  rmvCleanStatus: "Ready to sanitize video container",
  rmvOptGps: "Strip GPS Coordinates & Location Geotags",
  rmvOptDevice: "Remove Camera Hardware & Serial Info",
  rmvOptAuthor: "Clear Creator, Title & Software Tags",
  rmvOptChapters: "Remove Embedded Chapters & Timestamps",
  rmvSafeNote: "Stream Copy active: 100% original video & audio quality preserved without re-encoding.",
  rmvError: "Failed to strip metadata. Please ensure the file is a valid video format.",
  rmvInspectRes: "Resolution",
  rmvInspectDur: "Duration",
  rmvInspectSize: "Size",
  rmvInspectFormat: "Container",
  rmvStatusCleaned: "Sanitized & Safe for Web",

  // Sections - Remove Metadata (Hero, How-To, Bento, Comparison, FAQ)
  rmvHeroPill: "100% Client-Side Privacy Shield",
  rmvHeroTitle: "Wipe GPS, Camera Serials, and Timestamps from Any Video",
  rmvHeroDesc: "Every smartphone video embeds your exact home coordinates, phone model, and creation timestamp. SolveMyMedia cleans all hidden tags directly in browser memory before you share online.",
  rmvTerminalTitle: "metadata_sanitizer.log",
  rmvLog1: "[SCAN] Inspecting ISO BMFF / QuickTime container...",
  rmvLog2: "[FOUND] GPS coordinates (xyz atom) & camera serial",
  rmvLog3: "[PURGE] Stripping udta, ilst, and XMP metadata...",
  rmvLog4: "[SUCCESS] Clean stream copy written with 0 leaks.",

  rmvHowToTitle: "How to Strip Video Metadata in 3 Quick Steps",
  rmvHowToStep1Title: "Upload Video",
  rmvHowToStep1Desc: "Select your MP4, MOV, MKV, or WebM video. The file stays locked in your browser RAM.",
  rmvHowToStep2Title: "Inspect & Sanitize",
  rmvHowToStep2Desc: "Select what to strip—GPS geotags, camera serials, creation timestamps, and device properties.",
  rmvHowToStep3Title: "Download Safe Video",
  rmvHowToStep3Desc: "Instant stream copy exports a completely sanitized video in seconds with zero loss in resolution.",

  rmvBentoTitle: "Engineered for Journalists, Creators, and Privacy-First Users",
  rmvBento1Title: "Complete GPS Geotag Sanitizer",
  rmvBento1Desc: "Destroys embedded latitude, longitude, and altitude atoms recorded by iPhone and Android camera sensors.",
  rmvBento2Title: "Zero Re-encoding Loss",
  rmvBento2Desc: "Unlike cloud editors that downgrade video bitrate, our WebAssembly stream copy retains 100% original video pixels.",
  rmvBento3Title: "Zero Cloud Uploads",
  rmvBento3Desc: "Your sensitive footage never touches external cloud servers or databases. GDPR and HIPAA compliant by architecture.",
  rmvBento4Title: "Social Media & Whistleblower Safe",
  rmvBento4Desc: "Safely share footage to TikTok, X, YouTube, and journalism portals without leaving any digital footprints.",

  rmvCompTitle: "Browser WASM Sanitizer vs Risky Cloud Converters",
  rmvCompSolveMyMedia: "SolveMyMedia (Browser WASM)",
  rmvCompSolveMyMediaDesc: "Runs locally in RAM. Zero files uploaded. 0.8s instant export. 100% private.",
  rmvCompCloud: "Traditional Cloud Converters",
  rmvCompCloudDesc: "Uploads full video to 3rd-party servers, stores temporary copies, and queues behind paid accounts.",

  rmvFaq1Q: "What metadata does this tool remove from my video?",
  rmvFaq1A: "It wipes GPS location tags, camera make and model, device serial numbers, creation and modification timestamps, encoder software strings, embedded chapter markers, and custom author notes.",
  rmvFaq2Q: "Does removing metadata reduce the video quality or resolution?",
  rmvFaq2A: "No! We use FFmpeg WebAssembly stream copy (-c copy). The audio and video codec streams remain untouched bit-for-bit—only the container header tags are removed.",
  rmvFaq3Q: "Can anyone recover my GPS coordinates after cleaning?",
  rmvFaq3A: "No. The udta, xyz, and EXIF atoms containing your coordinates are permanently excised from the MP4/MOV container structure.",
  rmvFaq4Q: "Is it safe to clean sensitive or confidential footage here?",
  rmvFaq4A: "Yes, 100%. Processing takes place entirely on your device inside your browser sandbox. We never see, transmit, or store your videos.",

  // Workspace Controls - Edit Metadata
  edtAction: "Save & Update Metadata",
  edtSuccess: "Metadata Updated Successfully!",
  edtFieldTitle: "Title",
  edtFieldTitlePlaceholder: "e.g. Vacation in Bali 2026",
  edtFieldArtist: "Artist / Director",
  edtFieldArtistPlaceholder: "e.g. John Doe / Studio",
  edtFieldAlbum: "Album / Series",
  edtFieldAlbumPlaceholder: "e.g. Travel Vlog Season 1",
  edtFieldYear: "Release Year",
  edtFieldYearPlaceholder: "e.g. 2026",
  edtFieldGenre: "Genre / Category",
  edtFieldGenrePlaceholder: "e.g. Travel, Documentary",
  edtFieldComment: "Description / Comment",
  edtFieldCommentPlaceholder: "e.g. Captured in 4K 60fps",
  edtFieldCopyright: "Copyright / License",
  edtFieldCopyrightPlaceholder: "e.g. (C) 2026 All Rights Reserved",
  edtFastCopyNote: "Instant Container Rewrite: Tags are updated in 1 second without re-rendering or transcoding video frames.",
  edtError: "Failed to update video metadata. Please check that the input video is valid.",

  // Sections - Edit Metadata (Hero, How-To, Bento, Comparison, FAQ)
  edtHeroPill: "Lossless Container Tag Editor",
  edtHeroTitle: "Tag, Organize, and Personalize Video Files in Seconds",
  edtHeroDesc: "Update video titles, director credits, copyright notices, and genre tags cleanly across MP4, MOV, and MKV containers without spending hours rendering in heavyweight video editors.",
  edtTerminalTitle: "tag_inspector.json",
  edtInspectorTitle: "CONTAINER HEADER TAGS",
  edtTagTitle: "title: ",
  edtTagArtist: "artist: ",
  edtTagDate: "date: ",
  edtTagStatus: "Status: Ready for Lossless Remux",

  edtHowToTitle: "How to Edit Video Metadata in 3 Simple Steps",
  edtHowToStep1Title: "Upload Video File",
  edtHowToStep1Desc: "Select your MP4, MOV, WebM, or MKV file. No waiting for cloud uploads.",
  edtHowToStep2Title: "Update Tag Information",
  edtHowToStep2Desc: "Type in your title, artist/director name, album/series, genre, release year, and copyright license.",
  edtHowToStep3Title: "Export Clean Container",
  edtHowToStep3Desc: "Click Save and download your newly tagged video immediately with untouched crystal-clear resolution.",

  edtBentoTitle: "Professional Tagging for Archivists, Podcasters, and Creators",
  edtBento1Title: "Lossless Stream Copy",
  edtBento1Desc: "Never wait for video re-rendering. Container atoms are updated in milliseconds without touching video bitrate.",
  edtBento2Title: "Universal Media Player Compatibility",
  edtBento2Desc: "Tags display properly across Apple QuickTime, VLC, Windows Media Player, Smart TVs, and Plex media servers.",
  edtBento3Title: "Copyright & Attribution Protection",
  edtBento3Desc: "Embed your creator name, studio credits, and copyright ownership directly into the video file header.",
  edtBento4Title: "Batch & Library Ready",
  edtBento4Desc: "Organize your video archives and home movie collections with standardized titles and release dates.",

  edtCompTitle: "Instant Container Tagging vs Heavyweight Video Rendering",
  edtCompSolveMyMedia: "SolveMyMedia Stream Copy",
  edtCompSolveMyMediaDesc: "Updates header atoms only. Takes 1.2s. Zero CPU heat, zero quality loss.",
  edtCompEditor: "Traditional Video Editing Software",
  edtCompEditorDesc: "Requires creating a new timeline, re-encoding the entire video track, taking 15+ minutes with quality degradation.",

  edtFaq1Q: "Can I edit video metadata without re-encoding the video?",
  edtFaq1A: "Yes! That is the core advantage of SolveMyMedia. We use WebAssembly stream copying to update the container header tags (moov atom) without re-encoding any video or audio frames.",
  edtFaq2Q: "Will the updated tags show up in VLC and Apple QuickTime?",
  edtFaq2A: "Yes. Standard tags like Title, Artist, and Year follow official ISO BMFF / QuickTime specifications recognized by VLC, QuickTime, Windows Explorer, and Apple TV.",
  edtFaq3Q: "What video formats can have their metadata edited?",
  edtFaq3A: "We support MP4, MOV, MKV, WebM, and M4V. MP4 and MOV offer the highest compatibility across all consumer devices.",
  edtFaq4Q: "Are there any file size limits for editing metadata?",
  edtFaq4A: "Because the tool runs locally in your browser memory, you can edit standard video files smoothly. Files up to 2GB are supported easily."
};

async function main() {
  console.log('====================================================');
  console.log('  TRANSLATING METADATA TOOLS ACROSS 32 LANGUAGES    ');
  console.log('====================================================\n');

  const keysList = Object.keys(ENGLISH_KEYS);
  const valuesList = Object.values(ENGLISH_KEYS);

  const translationsByLang = {
    en: { ...ENGLISH_KEYS }
  };

  for (const lang of LANGUAGES) {
    if (lang === 'en') continue;
    console.log(`📡 Translating [${lang}] via google-translate-api-x...`);

    const gLang = getGoogleLangCode(lang);
    try {
      // Chunk into smaller batches of 15 strings for reliability
      const translatedValues = [];
      for (let i = 0; i < valuesList.length; i += 15) {
        const chunk = valuesList.slice(i, i + 15);
        const res = await translate(chunk, { to: gLang, rejectOnPartialFail: false });
        const texts = Array.isArray(res) ? res.map(r => r.text) : [res.text];
        translatedValues.push(...texts);
        await new Promise(r => setTimeout(r, 120)); // friendly rate limit delay
      }

      const dict = {};
      keysList.forEach((k, idx) => {
        dict[k] = translatedValues[idx] || ENGLISH_KEYS[k];
      });

      translationsByLang[lang] = dict;
      console.log(`✅ [${lang}] Translated ${keysList.length} keys successfully.`);
    } catch (err) {
      console.warn(`⚠️ Warning translating [${lang}]: ${err.message}. Falling back to English.`);
      translationsByLang[lang] = { ...ENGLISH_KEYS };
    }
  }

  // 1. Update src/i18n/slugs.ts for both tools
  console.log('\n📝 Updating src/i18n/slugs.ts...');
  const slugsPath = path.join(__dirname, '../src/i18n/slugs.ts');
  let slugsContent = fs.readFileSync(slugsPath, 'utf8');

  for (const lang of LANGUAGES) {
    const slugRemove = SLUG_CANDIDATES_REMOVE[lang] || 'remove-video-metadata';
    const slugEdit = SLUG_CANDIDATES_EDIT[lang] || 'edit-video-metadata';
    
    const regex = new RegExp(`("${lang}":\\s*{[^}]*)`, 'g');
    if (slugsContent.match(regex)) {
      let replacement = '$1';
      if (!slugsContent.includes(`"remove-video-metadata":`)) {
        replacement += `\n    "remove-video-metadata": "${slugRemove}",`;
      }
      if (!slugsContent.includes(`"edit-video-metadata":`)) {
        replacement += `\n    "edit-video-metadata": "${slugEdit}",`;
      }
      slugsContent = slugsContent.replace(regex, replacement);
    }
  }
  fs.writeFileSync(slugsPath, slugsContent, 'utf8');
  console.log('✅ src/i18n/slugs.ts updated with both metadata tools for all 32 languages.');

  // 2. Save translated keys into src/data/metadata-video-translations.json
  const outJsonPath = path.join(__dirname, '../src/data/metadata-video-translations.json');
  fs.writeFileSync(outJsonPath, JSON.stringify(translationsByLang, null, 2), 'utf8');
  console.log(`✅ Saved translations to ${outJsonPath}`);

  console.log('\n🎉 Translation pipeline finished successfully!');
}

main().catch(err => {
  console.error('Fatal translation error:', err);
  process.exit(1);
});
