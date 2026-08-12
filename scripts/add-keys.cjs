const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'i18n', 'translations.ts');

const newKeys = {
  // Create GIF
  gifSettings: "GIF Settings",
  gifDesc: "Customize the frame rate and size of your GIF.",
  gifSmall: "Small & Fast (Meme)",
  gifFps10: "10 FPS, 320px width",
  gifBalanced: "Balanced",
  gifFps15: "15 FPS, 480px width",
  gifHigh: "High Quality (Heavy)",
  gifFps24: "24 FPS, 640px width",
  gifTitle: "Create GIF from Video",
  gifSub: "Convert any video into an optimized animated GIF in seconds. Customize frame rate and size without uploading your files to the cloud.",
  gifGen: "Generate GIF",
  gifHero: "Turn Videos into Viral GIFs",
  gifHeroDesc: "Convert MP4, WebM, and MOV to animated GIFs in seconds. No watermarks, no signups, completely free.",
  gifHowTo: "How to Make a GIF",
  gifHowTo1: "Upload Video",
  gifHowTo1Desc: "Select any video file from your device.",
  gifHowTo2: "Set Framerate",
  gifHowTo2Desc: "Choose the FPS and output size to balance quality and file size.",
  gifHowTo3: "Generate & Download",
  gifHowTo3Desc: "Instantly create and save your animated GIF.",
  gifPerf: "Built for Speed",
  gifPerfDesc: "Our advanced WebAssembly engine compiles video frames directly in your browser without communicating with external servers.",
  gifPriv: "Your Files Stay Yours",
  gifPrivDesc: "Because everything runs locally, your sensitive videos are completely safe. Disconnect from the internet and watch it still work.",
  gifFaqTitle: "Frequently Asked Questions",
  gifFaq1Q: "Is this really free?",
  gifFaq1A: "Yes, completely free with no watermarks.",
  gifFaq2Q: "Why does it happen instantly?",
  gifFaq2A: "Everything is processed locally.",
  gifFaq3Q: "Do you store my GIF?",
  gifFaq3A: "No, we don't have access to it.",

  // Crop Video
  cropRatio: "Crop Aspect Ratio",
  cropDesc: "Center-crop your video to a specific social media aspect ratio.",
  cropSquare: "1:1 (Square)",
  cropSquareDesc: "Perfect for Instagram Feed",
  cropVert: "9:16 (Vertical)",
  cropVertDesc: "For TikTok, Reels, Shorts",
  cropLand: "16:9 (Landscape)",
  cropLandDesc: "For YouTube or TV",
  cropAction: "Crop Video",
  cropTitle: "Crop Video Dimensions to Any Aspect Ratio",
  cropSub: "Crop and resize your videos easily with our visual cropper. All processing happens securely on your own device.",
  cropHero: "Crop Video Perfectly",
  cropHeroDesc: "Trim out the edges of your video for TikTok, Reels, and YouTube Shorts instantly without watermarks.",
  cropHowTo: "How to Crop Videos",
  cropHowTo1: "Select a Video",
  cropHowTo1Desc: "Choose any video file from your local device.",
  cropHowTo2: "Pick Aspect Ratio",
  cropHowTo2Desc: "Select the desired format like 9:16 vertical or 1:1 square.",
  cropHowTo3: "Crop & Export",
  cropHowTo3Desc: "Hit crop and your video will be instantly ready for download.",
  cropPlat: "Social Media Ready",
  cropPlatDesc: "Perfectly align your video dimensions for any social platform and ensure it looks professional.",
  cropPriv: "Secure Local Processing",
  cropPrivDesc: "Your video files are strictly kept on your local machine and never uploaded or stored anywhere else.",
  cropFaqTitle: "Frequently Asked Questions",
  cropFaq1Q: "Does cropping reduce video quality?",
  cropFaq1A: "Cropping technically re-encodes the video, but we use high-quality presets to ensure the cropped area retains its original sharpness.",
  cropFaq2Q: "Can I do custom free-form cropping?",
  cropFaq2A: "Currently we only support center-cropping to standard social media aspect ratios (1:1, 9:16, 16:9) to keep the process lightning fast and simple.",
  cropFaq3Q: "Is it really private?",
  cropFaq3A: "Absolutely. Everything happens directly inside your web browser. Try turning off your Wi-Fi before clicking 'Crop'!",

  // Watermark Video
  wmPos: "Position",
  wmDesc: "Choose where the logo should appear on the video.",
  wmTL: "Top Left",
  wmTR: "Top Right",
  wmBL: "Bottom Left",
  wmBR: "Bottom Right",
  wmC: "Center",
  wmTiled: "Tiled",
  wmScale: "Scale",
  wmOpac: "Opacity",
  wmAction: "Add Watermark",
  wmTitle: "Add Custom Watermark Logo to Video",
  wmSub: "Protect your creative work by overlaying custom text or image watermarks onto your videos before sharing them online.",
  wmAddMain: "Add Main Video",
  wmAddLogo: "Add Watermark Logo (PNG/JPG)",
  wmApplying: "Applying Watermark",
  wmHeroTitle: "Instant Brand Protection",
  wmHero: "Add Custom Watermark Logo to Video",
  wmHeroDesc: "Protect your creative work by overlaying custom text or image watermarks onto your videos before sharing them online.",
  wmHowTo: "How to Add a Watermark",
  wmHowTo1: "Upload Media",
  wmHowTo1Desc: "Select your main video and your logo image file.",
  wmHowTo2: "Position Logo",
  wmHowTo2Desc: "Choose where you want the watermark to appear and set opacity.",
  wmHowTo3: "Process",
  wmHowTo3Desc: "Export your video with the watermark permanently burned in.",
  wmBrand: "Permanent Branding",
  wmBrandDesc: "Once burned into the video, your watermark cannot be removed by simple cropping or metadata stripping.",
  wmBrandCardTitle: "Logo Support",
  wmBrandCardDesc: "Overlay transparent PNGs or JPGs as watermarks easily.",
  wmPriv: "100% Secure & Private",
  wmPrivDesc: "Your videos are never uploaded to any cloud server. The entire watermarking process runs securely inside your device.",
  wmFaqTitle: "Frequently Asked Questions",
  wmFaq1Q: "Can I remove the watermark later?",
  wmFaq1A: "No, this tool permanently burns the image watermark into the video frames (hard-subbing). This is specifically designed to protect your copyright.",
  wmFaq2Q: "Does it support transparent PNGs?",
  wmFaq2A: "Yes! Using a transparent PNG logo will overlay perfectly with the specified opacity settings.",
  wmFaq3Q: "Does adding a watermark re-encode my video?",
  wmFaq3A: "Yes, in order to burn the watermark into the actual video frames permanently, the video stream must be re-encoded."
};

let content = fs.readFileSync(targetFile, 'utf8');

let interfaceEnd = content.indexOf('}');
let newInterfaceLines = Object.keys(newKeys).map(k => `  ${k}?: string;`).join('\n');
content = content.slice(0, interfaceEnd) + newInterfaceLines + '\n' + content.slice(interfaceEnd);

let baseDictEnd = content.indexOf('};', interfaceEnd);
let newBaseDictLines = Object.entries(newKeys).map(([k, v]) => `  ${k}: "${v.replace(/"/g, '\\"')}"`).join(',\n');
content = content.slice(0, baseDictEnd - 1) + ',\n' + newBaseDictLines + '\n' + content.slice(baseDictEnd);

fs.writeFileSync(targetFile, content);
console.log("Added keys to translations.ts");
