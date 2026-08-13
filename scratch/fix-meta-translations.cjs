const fs = require('fs');
const path = require('path');
const translate = require('google-translate-api-x');

const langs = [
  'id','es','fr','de','it','pt','nl','pl','ru',
  'ja','ko','zh','zh-TW','tr','vi','th','ar','hi','sv',
  'no','da','fi','cs','hu','el','ro','uk','ms','tl'
];

const langMap = {
  'zh': 'zh-CN',
  'zh-TW': 'zh-TW'
};

const LONG_TAIL_EN = [
  {
    path: '/reduce-mp4-video-size-for-email',
    meta_title: 'Reduce MP4 Video Size for Email | Free Online Tool',
    meta_description: 'Easily compress large MP4 video files to fit within the 25MB email attachment limit. 100% free, private, and works in your browser.'
  },
  {
    path: '/compress-large-video-for-whatsapp',
    meta_title: 'Compress Large Video for WhatsApp | Free Online Tool',
    meta_description: 'Compress video files to bypass WhatsApp\'s 16MB limit. Send high-quality videos instantly without losing visual clarity.'
  },
  {
    path: '/convert-mov-to-mp4-for-android',
    meta_title: 'Convert iPhone MOV to MP4 for Android | Free Online Tool',
    meta_description: 'Fix playback issues by converting Apple MOV videos into universally compatible MP4 format for Android devices and Smart TVs.'
  },
  {
    path: '/extract-audio-from-video-for-podcast',
    meta_title: 'Extract Audio from Video for Podcasts | Free Online Tool',
    meta_description: 'Strip the audio track from any video interview or recording and save it as a high-quality MP3 or WAV file for your podcast.'
  },
  {
    path: '/make-video-smaller-without-losing-quality',
    meta_title: 'Make Video Smaller Without Losing Quality | Free Online Tool',
    meta_description: 'Use advanced WebCodecs compression to shrink your video file size by up to 90% while retaining crisp, HD visual quality.'
  },
  {
    path: '/remove-sound-from-video-completely',
    meta_title: 'Remove Sound from Video Completely | Free Online Tool',
    meta_description: 'Mute your videos and completely remove the audio track. Perfect for uploading to social media or creating silent background loops.'
  },
  {
    path: '/speed-up-video-for-tiktok',
    meta_title: 'Speed Up Video for TikTok Fast | Free Online Tool',
    meta_description: 'Accelerate your video playback speed for TikTok, Instagram Reels, and YouTube Shorts. Create fast-forward effects instantly.'
  },
  {
    path: '/crop-video-for-instagram-story',
    meta_title: 'Crop Video for Instagram Story 9:16 | Free Online Tool',
    meta_description: 'Resize and crop any landscape video into the perfect 9:16 vertical aspect ratio for Instagram Stories, Reels, and TikTok.'
  },
  {
    path: '/combine-multiple-voice-memos-into-one',
    meta_title: 'Combine Multiple Voice Memos into One | Free Online Tool',
    meta_description: 'Merge and stitch together multiple audio recordings or voice memos into a single, continuous audio file.'
  },
  {
    path: '/transcribe-zoom-meeting-recording-to-text',
    meta_title: 'Transcribe Zoom Meeting to Text | Free Online Tool',
    meta_description: 'Upload your Zoom meeting recording and use local AI to automatically transcribe the speech to text with high accuracy.'
  }
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function run() {
  const filePath = path.join(__dirname, '../src/data/pseo-long-tail-translations.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // First, inject the English ones
  for (const enItem of LONG_TAIL_EN) {
    const entry = data['en'].find(e => e.path === enItem.path);
    if (entry) {
      entry.meta_title = enItem.meta_title;
      entry.meta_description = enItem.meta_description;
    }
  }

  for (const lang of langs) {
    const targetLang = langMap[lang] || lang;
    console.log(`Translating for ${lang}...`);
    
    for (const enItem of LONG_TAIL_EN) {
      const entry = data[lang].find(e => e.path === enItem.path);
      if (!entry) continue;

      let h1ToTranslate = entry.h1;
      let needsH1Fix = (lang === 'zh' || lang === 'zh-TW' || entry.h1 === data['en'].find(e=>e.path===entry.path).h1);
      
      try {
        if (needsH1Fix) {
          const resH1 = await translate(data['en'].find(e=>e.path===entry.path).h1, { to: targetLang });
          entry.h1 = resH1.text;
          await sleep(200);
        }

        // Meta Title
        const resMT = await translate(enItem.meta_title, { to: targetLang });
        entry.meta_title = resMT.text;
        await sleep(200);

        // Meta Description
        const resMD = await translate(enItem.meta_description, { to: targetLang });
        entry.meta_description = resMD.text;
        await sleep(200);

        // Also fix bentoSections hero title
        const heroSection = entry.bentoSections.find(s => s.type === 'hero-split' || s.type === 'big-typo-hero' || s.type === 'quote-banner');
        if (heroSection && heroSection.data && heroSection.data.title) {
          heroSection.data.title = entry.h1; // Sync with fixed H1
        }
        
      } catch (e) {
        console.error(`Error translating for ${lang} on path ${enItem.path}: ${e.message}`);
        await sleep(2000);
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("Done updating pseo-long-tail-translations.json!");
}

run();
