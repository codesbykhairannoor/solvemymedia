const fs = require('fs');
const path = require('path');

const LANGS = [
  'ar', 'cs', 'da', 'de', 'el', 'es', 'fi', 'fr', 'hi', 'hu', 
  'id', 'it', 'ja', 'ko', 'ms', 'nl', 'no', 'pl', 'pt', 'ro', 
  'ru', 'sv', 'th', 'tl', 'tr', 'uk', 'vi', 'zh-TW', 'zh'
];

const codeMap = {
  'zh': 'zh-CN'
};

const BATCH_STRINGS = {
  // Mp4ToMp3
  "mp4ToMp3_heroBadge": "Studio-Grade Extraction",
  "mp4ToMp3_heroTitle": "Lossless Audio Extraction Pipeline",
  "mp4ToMp3_heroDesc": "Unlike traditional converters that re-record the audio and ruin quality, our engine demuxes the MP4 container and pulls out the pristine audio stream.",
  "mp4ToMp3_perfTitle": "Client-Side Processing",
  "mp4ToMp3_perfDesc": "Harness the power of WebAssembly. Your MP4 is decoded and transcribed right inside your browser using your CPU, making it up to 10x faster than cloud services.",
  "mp4ToMp3_privTitle": "Strict Zero-Upload Privacy",
  "mp4ToMp3_privDesc": "Because the extraction runs locally, your videos are never uploaded to any server. Perfect for unreleased music, confidential recordings, and private videos.",
  
  // MovToMp4
  "movToMp4_heroBadge": "Made for Apple Ecosystem",
  "movToMp4_heroTitle": "Universal Playback Guaranteed",
  "movToMp4_heroDesc": "Stop dealing with format unsupported errors. Convert your MOV files to MP4 and watch them play seamlessly on any device in the world.",
  "movToMp4_perfTitle": "Lightning Fast Transcoding",
  "movToMp4_perfDesc": "Because MOV and MP4 use very similar internal structures, we can often remux your video instead of re-encoding it. This means a 1GB video can be converted in seconds.",
  "movToMp4_privTitle": "Offline & Secure",
  "movToMp4_privDesc": "Your family videos and private recordings never leave your device. We use WebAssembly to convert everything right here in your browser.",
  
  // MkvToMp4
  "mkvToMp4_heroBadge": "Heavy Duty Demuxing",
  "mkvToMp4_heroTitle": "The Smart Demuxing Pipeline",
  "mkvToMp4_heroDesc": "MKV is a container, not a codec. If your MKV already contains H.264 video, we simply extract the video track and package it into an MP4 container. No quality loss, zero rendering time.",
  "mkvToMp4_perfTitle": "Subtitle Support",
  "mkvToMp4_perfDesc": "Maintains video integrity and audio synchronization flawlessly. We preserve all primary video and audio tracks precisely as they were in the original MKV.",
  "mkvToMp4_privTitle": "Offline by Design",
  "mkvToMp4_privDesc": "MKV files are often huge movie rips or long recordings. Uploading a 5GB file to a cloud converter is impractical. We run the conversion locally, saving you hours of upload time and ensuring your files stay strictly on your hard drive.",
  
  // WebmToMp4
  "webmToMp4_heroBadge": "Web Optimized",
  "webmToMp4_heroTitle": "Bridge the Gap Between Web and Mobile",
  "webmToMp4_heroDesc": "WebM is fantastic for Chrome and Firefox, but it completely breaks on iPhones and iPads. We solve this by instantly converting WebM into universally accepted MP4 files.",
  "webmToMp4_perfTitle": "High-Speed WebCodecs",
  "webmToMp4_perfDesc": "Transcode VP8/VP9 streams to H.264 right inside your browser. We utilize your device's hardware acceleration to make the conversion incredibly fast.",
  "webmToMp4_privTitle": "Zero Server Dependency",
  "webmToMp4_privDesc": "Why wait in a server queue to convert a file you already downloaded? WebM to MP4 conversion runs 100% on your local machine, keeping your files completely private.",
  
  // AviToMp4
  "aviToMp4_heroBadge": "Legacy Format",
  "aviToMp4_heroTitle": "Modernize Your Legacy Media",
  "aviToMp4_heroDesc": "Bring your older digital camera or camcorder AVI files into the modern era. Convert to highly compressed MP4s that play anywhere.",
  "aviToMp4_perfTitle": "Massive Space Savings",
  "aviToMp4_perfDesc": "MP4 (H.264) compression is vastly superior to older AVI codecs. You can often reduce the file size of your old home videos by 70-80% without noticing any loss in quality.",
  "aviToMp4_privTitle": "Private Archives",
  "aviToMp4_privDesc": "Your old family videos from 2005 are private. Because our tool runs offline in your browser, those memories are never uploaded to our servers. Transcode them securely on your own device."
};

async function translateText(text, targetLang) {
  const tl = codeMap[targetLang] || targetLang;
  let retries = 3;
  while (retries > 0) {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Fetch failed: " + res.status);
      const data = await res.json();
      let translated = '';
      for (const chunk of data[0]) {
        translated += chunk[0];
      }
      return translated;
    } catch (err) {
      console.error(`Error translating to ${targetLang} (retries left: ${retries - 1}):`, err.message);
      retries--;
      if (retries === 0) return text; 
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

async function run() {
  const seoDir = path.join(__dirname, '..', 'src', 'locales', 'seo');
  
  // Update English first
  const enPath = path.join(seoDir, 'en.json');
  let enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  for (const [key, value] of Object.entries(BATCH_STRINGS)) {
    enData[key] = value;
  }
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  console.log("Updated en.json");

  // Translate to other languages
  for (const lang of LANGS) {
    const langPath = path.join(seoDir, `${lang}.json`);
    if (!fs.existsSync(langPath)) continue;
    
    console.log(`Translating for ${lang}...`);
    let langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));
    
    let modified = false;
    for (const [key, text] of Object.entries(BATCH_STRINGS)) {
      if (!langData[key] || langData[key] === text) {
        const translated = await translateText(text, lang);
        langData[key] = translated;
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(langPath, JSON.stringify(langData, null, 2));
      console.log(`✅ Updated ${lang}.json`);
    }
    await new Promise(r => setTimeout(r, 500)); // Rate limit pause
  }
  
  console.log("All languages translated successfully!");
}

run();
