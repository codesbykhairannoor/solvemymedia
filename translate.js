import fs from 'fs';
import path from 'path';
import translate from 'google-translate-api-x';

const langs = [
  'id','es','fr','de','it','pt','nl','pl','ru',
  'ja','ko','zh-cn','zh-tw','tr','vi','th','ar','hi','sv',
  'no','da','fi','cs','hu','el','ro','uk','ms','tl'
];

// Re-map back to standard locale keys
const toKey = (lang) => {
  if (lang === 'zh-cn') return 'zh';
  if (lang === 'zh-tw') return 'zh-TW';
  return lang;
};

const baseStrings = [
  "Compress Video Size Without Quality Loss",
  "Convert Video Formats Instantly",
  "Change Video Speed & Pace",
  "Convert Video to High Quality GIF",
  "Crop and Resize Video Dimensions",
  "Remove Audio from Video Completely",
  "Add Custom Watermark to Video",
  "Compress Audio File Size Efficiently",
  "Convert Audio Formats (MP3, WAV)",
  "Extract Audio from Video",
  "Merge Multiple Audio Files into One",
  "AI Powered Media Transcription",
  "Professional Studio Recorder",
  "The fastest browser-based tool. 100% free, private, zero server uploads.",
  "How to use",
  "Select File",
  "Choose your media file.",
  "Process",
  "Processed instantly in browser.",
  "Download",
  "Save the optimized file.",
  "Local Processing",
  "Enjoy zero server ping and instant processing.",
  "100% Privacy Guaranteed",
  "Operations happen within your browser sandbox.",
  "Blazing Fast Performance",
  "Delivering results in milliseconds.",
  "Frequently Asked Questions",
  "Is it completely free?",
  "Yes, 100% free.",
  "Are my files safe?",
  "Absolutely. Everything runs locally.",
  // UI and Layout
  "Top Tier Tool",
  "Performance Metrics",
  "Support Center",
  "Upload Time",
  "Privacy",
  "Target Format",
  "Select the format you want to convert this video into.",
  "Convert to MP4",
  "Drag & drop video or",
  "Browse Files",
  "Upload your media below to process it directly in your browser without compromising privacy.",
  "Processing...",
  "Download Result",
  // Geo & Privacy features
  "Zero Ping",
  "No network latency.",
  "Offline Ready",
  "Works without internet.",
  "Local Processing",
  "Files never uploaded.",
  "WASM Engine",
  "Secure sandbox.",
  // Tool Sidebars
  "Record your screen, webcam, and audio simultaneously directly in your browser.",
  "Screen Share",
  "Include System Audio",
  "Webcam",
  "Picture-in-Picture",
  "Microphone",
  "Voice Recording",
  "Start Recording",
  "Speed Factor",
  "Change video playback speed without distorting audio pitch.",
  "Slow (0.5x)",
  "Normal (1.0x)",
  "Fast (2.0x)",
  "Change Speed",
  "Compression Settings",
  "Choose compression target. Lower quality means smaller file size.",
  "Extreme Size",
  "Balanced",
  "High Quality",
  "GIF Settings",
  "Customize the frame rate and size of your GIF.",
  "Small & Fast (Meme)",
  "10 FPS, 320px width",
  "15 FPS, 480px width",
  "24 FPS, 640px width",
  "Generate GIF",
  // Crop Video
  "Crop Aspect Ratio",
  "Center-crop your video to a specific social media aspect ratio.",
  "1:1 (Square)",
  "Perfect for Instagram Feed",
  "9:16 (Vertical)",
  "For TikTok, Reels, Shorts",
  "16:9 (Landscape)",
  "For YouTube or TV",
  "Crop Video",
  // Mute Video
  "Remove Audio",
  "This tool instantly strips all audio tracks from your video. The video quality is completely preserved.",
  "Lightning Fast! ⚡",
  "This process does not re-encode your video, so it will finish in less than a second.",
  "Mute Video",
  // Watermark
  "Position",
  "Choose where the logo should appear on the video.",
  "Top Left",
  "Top Right",
  "Bottom Left",
  "Bottom Right",
  "Center",
  "Tiled",
  "Scale",
  "Opacity",
  "Add Watermark",
  // Compress Audio
  "Choose compression target for audio.",
  "Small (64k)",
  "HQ (192k)",
  "Compress Audio",
  // Convert Audio
  "Target Format",
  "Select the format you want to convert this audio into.",
  "Convert to",
  // Extract Audio
  "Target Audio Format",
  "Select the format you want to extract the audio into.",
  "Extract to",
  // Merge Audio
  "Upload multiple audio files below to merge them into a single file directly in your browser without compromising privacy.",
  "Add Audio File",
  "Join Audio Files",
  "Combine multiple audio tracks sequentially into a single file.",
  "Merge Audio",
  // Transcribe
  "Upload your audio or video file below to transcribe it to text securely in your browser using AI.",
  "Transcription Result",
  "Transcription will appear here.",
  "Start Transcription"
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  const dictionary = {
    "en": baseStrings
  };

  console.log("Starting reliable batch translation for 30 languages...");

  for (let i = 0; i < langs.length; i++) {
    const targetLang = langs[i];
    const key = toKey(targetLang);
    console.log(`[${i+1}/${langs.length}] Translating to ${key}...`);
    
    let retries = 3;
    while(retries > 0) {
      try {
        const res = await translate(baseStrings, { to: targetLang, forceTo: true });
        // res is an array of objects
        
        const translatedArray = res.map(r => r.text);

        if (translatedArray.length === baseStrings.length) {
          dictionary[key] = translatedArray;
        } else {
          console.error(`Array length mismatch for ${key}. Expected ${baseStrings.length}, got ${translatedArray.length}. Falling back to English.`);
          dictionary[key] = baseStrings;
        }
        break;
      } catch (e) {
        retries--;
        console.error(`Error translating to ${key}. Retries left: ${retries} - ${e.message}`);
        if (retries === 0) {
          dictionary[key] = baseStrings;
        }
        await sleep(3000);
      }
    }
    
    await sleep(2000); // Wait 2s to avoid rate limit
  }

  console.log("Translation complete. Generating seoDictionary.ts...");

  const allLangs = Object.keys(dictionary);
  let dictOutput = "export const SEO_DICTIONARY: Record<string, Record<string, any>> = {\n";

  for (const lang of allLangs) {
    const s = dictionary[lang] || dictionary['en'];
    
    const lDict = {
      hero: {
        compress_video: s[0],
        convert_video: s[1],
        video_speed: s[2],
        create_gif: s[3],
        crop_video: s[4],
        mute_video: s[5],
        watermark_video: s[6],
        compress_audio: s[7],
        convert_audio: s[8],
        video_to_audio: s[9],
        merge_audio: s[10],
        transcribe: s[11],
        recorder: s[12]
      },
      desc: s[13],
      howto: {
        title: s[14],
        steps: [
          { title: s[15], desc: s[16] },
          { title: s[17], desc: s[18] },
          { title: s[19], desc: s[20] }
        ]
      },
      geo: {
        title: s[21],
        content: s[22]
      },
      privacy: {
        title: s[23],
        content: s[24]
      },
      performance: {
        title: s[25],
        content: s[26]
      },
      faq: {
        title: s[27],
        items: [
          { q: s[28], a: s[29] },
          { q: s[30], a: s[31] }
        ]
      },
      ui: {
        top_tier: s[32],
        perf_metrics: s[33],
        support: s[34],
        upload_time: s[35],
        privacy: s[36],
        target_format: s[37],
        select_format: s[38],
        convert_mp4: s[39],
        drag_drop: s[40],
        browse_files: s[41],
        upload_desc: s[42],
        processing: s[43],
        download_result: s[44],
      },
      feat: {
        zero_ping: { t: s[45], d: s[46] },
        offline: { t: s[47], d: s[48] },
        local: { t: s[49], d: s[50] },
        wasm: { t: s[51], d: s[52] }
      },
      tools: {
        recorder: {
          desc: s[53],
          screen: s[54],
          sys_audio: s[55],
          webcam: s[56],
          pip: s[57],
          mic: s[58],
          voice: s[59],
          start: s[60]
        },
        speed: {
          factor: s[61],
          desc: s[62],
          slow: s[63],
          norm: s[64],
          fast: s[65],
          change: s[66]
        },
        compress: {
          settings: s[67],
          desc: s[68],
          extreme: s[69],
          balanced: s[70],
          high: s[71]
        },
        gif: {
          settings: s[72],
          desc: s[73],
          small: s[74],
          fps10: s[75],
          fps15: s[76],
          fps24: s[77],
          gen: s[78]
        },
        crop: {
          ratio: s[79],
          desc: s[80],
          square: s[81],
          square_desc: s[82],
          vert: s[83],
          vert_desc: s[84],
          land: s[85],
          land_desc: s[86],
          action: s[87]
        },
        mute: {
          remove: s[88],
          desc: s[89],
          fast: s[90],
          fast_desc: s[91],
          action: s[92]
        },
        watermark: {
          pos: s[93],
          desc: s[94],
          tl: s[95],
          tr: s[96],
          bl: s[97],
          br: s[98],
          c: s[99],
          tiled: s[100],
          scale: s[101],
          opacity: s[102],
          action: s[103]
        },
        compress_audio: {
          desc: s[104],
          small: s[105],
          hq: s[106],
          action: s[107]
        },
        convert_audio: {
          format: s[108],
          desc: s[109],
          action: s[110]
        },
        extract: {
          format: s[111],
          desc: s[112],
          action: s[113]
        },
        merge: {
          upload: s[114],
          add: s[115],
          join: s[116],
          desc: s[117],
          action: s[118]
        },
        transcribe: {
          upload: s[119],
          result: s[120],
          placeholder: s[121],
          action: s[122]
        }
      }
    };

    dictOutput += '  "' + lang + '": ' + JSON.stringify(lDict, null, 4) + ',\n';
  }

  dictOutput += '};\n';

  const srcDir = 'd:/audiovideo/media-compressor/src';
  const utilsDir = path.join(srcDir, 'utils');
  fs.writeFileSync(path.join(utilsDir, 'seoDictionary.ts'), dictOutput);

  console.log("Successfully generated fully translated seoDictionary.ts!");
}

run().catch(console.error);
