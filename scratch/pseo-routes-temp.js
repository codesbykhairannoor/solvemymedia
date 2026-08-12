const PSEO_ROUTES = [
  // Video to Audio / Video Converters
  {
    path: "/mp4-to-mp3",
    tool: "video-to-audio",
    h1: "Convert MP4 to MP3 Online",
    description: "Extract high-quality audio from your MP4 videos. Convert MP4 to MP3 instantly and securely in your browser.",
    features: [
      { title: "Lossless Audio Extraction", desc: "We extract the exact audio stream without re-encoding to preserve 100% of the original quality." },
      { title: "Instant Offline Conversion", desc: "Your MP4 file is never uploaded. The conversion to MP3 happens locally in your RAM using WebAssembly." }
    ],
    faqs: [
      { q: "Does converting MP4 to MP3 reduce audio quality?", a: "No, our tool extracts the original audio stream directly if possible, ensuring zero loss of sound quality." },
      { q: "Is it safe to convert private MP4 videos?", a: "Yes, 100% safe. Because we use client-side WebCodecs, your video never leaves your device." },
      { q: "How long does the conversion take?", a: "Since there is no uploading or downloading, it typically takes just seconds, depending on your CPU speed." }
    ]
  },
  {
    path: "/mov-to-mp4",
    tool: "convert-video",
    h1: "Convert MOV to MP4 Online",
    description: "Fast, secure, and offline MOV to MP4 converter. Make your Apple QuickTime videos universally compatible.",
    features: [
      { title: "Universal Compatibility", desc: "Transform Apple-specific MOV files into universally playable MP4 format." },
      { title: "Hardware Accelerated", desc: "Leverage your local GPU via WebCodecs for lightning-fast encoding." }
    ],
    faqs: [
      { q: "Why should I convert MOV to MP4?", a: "MP4 is the universal standard for web video. It plays natively on all modern browsers, Android devices, and smart TVs, whereas MOV is often restricted to Apple ecosystems." },
      { q: "Will I lose video quality?", a: "You can choose to maintain the original bitrate, resulting in virtually no perceptible loss of quality." },
      { q: "Is there a file size limit?", a: "No! You can convert massive 10GB+ MOV files directly in your browser without worrying about server upload limits." }
    ]
  },
  {
    path: "/mkv-to-mp4",
    tool: "convert-video",
    h1: "Convert MKV to MP4 Online",
    description: "Easily convert MKV videos to MP4 format for better device compatibility. 100% free and offline.",
    features: [
      { title: "Smart Demuxing", desc: "If the MKV contains H.264 video, we simply repackage it into MP4 in seconds without re-encoding." },
      { title: "Subtitle Support", desc: "Maintains video integrity and audio synchronization flawlessly." }
    ],
    faqs: [
      { q: "Why won't my TV play MKV files?", a: "MKV is a container format that many smart TVs and legacy media players do not support natively. MP4 is universally supported." },
      { q: "How fast is MKV to MP4 conversion?", a: "Extremely fast. If the internal codecs are compatible, we bypass re-encoding and remux the file instantly in your browser." },
      { q: "Is my data private?", a: "Absolutely. We process the MKV file completely offline using WebAssembly." }
    ]
  },
  {
    path: "/webm-to-mp4",
    tool: "convert-video",
    h1: "Convert WebM to MP4 Online",
    description: "Transform WebM files into MP4 format instantly. Ensure compatibility across all Apple devices and standard media players.",
    features: [
      { title: "Apple Compatibility", desc: "WebM files often fail to play on iPhones and Safari. Converting to MP4 fixes this instantly." },
      { title: "High-Speed WebCodecs", desc: "Transcode VP8/VP9 streams to H.264 right inside your browser." }
    ],
    faqs: [
      { q: "Why convert WebM to MP4?", a: "WebM is optimized for the web (specifically Chrome/Firefox), but lacks native playback support on iOS and macOS devices. MP4 solves this." },
      { q: "Is there any quality loss?", a: "Our intelligent encoder maximizes quality retention while compressing into the highly efficient H.264 format." },
      { q: "Are there file size restrictions?", a: "No, all processing happens locally on your machine, so you are only limited by your device's RAM." }
    ]
  },
  {
    path: "/avi-to-mp4",
    tool: "convert-video",
    h1: "Convert AVI to MP4 Online",
    description: "Modernize your old AVI video files by converting them to the highly efficient MP4 format for modern playback.",
    features: [
      { title: "Modernize Legacy Media", desc: "Bring your older digital camera or camcorder AVI files into the modern H.264 era." },
      { title: "Massive Space Savings", desc: "MP4 (H.264) compression is vastly superior to older AVI codecs, saving huge amounts of disk space." }
    ],
    faqs: [
      { q: "Will this reduce my file size?", a: "Yes! AVI is an older, less efficient container. Converting to MP4 with H.264 encoding will significantly reduce file size while maintaining visual quality." },
      { q: "Can I play MP4 files on my smartphone?", a: "Yes, MP4 is natively supported on 100% of modern iOS and Android smartphones." },
      { q: "Do you upload my AVI files?", a: "Never. The conversion happens strictly in your browser using local WebAssembly technology." }
    ]
  },
  // Audio Converters
  {
    path: "/wav-to-mp3",
    tool: "convert-audio",
    h1: "Convert WAV to MP3 Online",
    description: "Compress large, uncompressed WAV audio files into high-quality MP3s instantly. Save storage space securely.",
    features: [
      { title: "Variable Bitrate (VBR)", desc: "Choose between constant or variable bitrate encoding for the perfect balance of size and quality." },
      { title: "Batch Ready", desc: "Our local processing handles large audio files without freezing or uploading." }
    ],
    faqs: [
      { q: "How much smaller will the MP3 be?", a: "WAV is an uncompressed format. Converting to MP3 (e.g., at 192kbps) typically reduces the file size by 80-90%." },
      { q: "Will I lose audio quality?", a: 'MP3 is a "lossy" format, meaning some inaudible data is removed. However, at higher bitrates (256kbps+), the difference is indistinguishable to the human ear.' },
      { q: "Is this tool secure?", a: "Yes, the audio processing is done entirely in your browser using WebAssembly. No audio is ever uploaded." }
    ]
  },
  {
    path: "/m4a-to-mp3",
    tool: "convert-audio",
    h1: "Convert M4A to MP3 Online",
    description: "Convert Apple M4A audio files to universally compatible MP3 format without losing sound clarity.",
    features: [
      { title: "Universal Playback", desc: "Ensure your audio plays perfectly on older car stereos, generic MP3 players, and all operating systems." },
      { title: "Lightning Fast", desc: "Audio transcoding happens in milliseconds directly in your browser." }
    ],
    faqs: [
      { q: "What is the difference between M4A and MP3?", a: "M4A (AAC) is Apple's preferred audio format, offering slightly better quality at the same bitrate as MP3. However, MP3 has broader compatibility with older devices." },
      { q: "Does converting M4A to MP3 degrade quality?", a: "Because both are lossy formats, transcoding between them can cause minor generation loss, but our high-quality encoders minimize this effect." },
      { q: "Are my voice memos private?", a: "Yes. Processing happens 100% locally. Your M4A files never leave your device." }
    ]
  },
  {
    path: "/flac-to-mp3",
    tool: "convert-audio",
    h1: "Convert FLAC to MP3 Online",
    description: "Downsize lossless FLAC audio files to portable MP3 format for mobile listening and space-saving storage.",
    features: [
      { title: "Preserve Metadata", desc: "We retain ID3 tags like artist, album, and track names during the conversion process." },
      { title: "High Fidelity MP3", desc: "Encode up to 320kbps MP3 to capture as much detail from the original FLAC as possible." }
    ],
    faqs: [
      { q: "Why convert lossless FLAC to lossy MP3?", a: "FLAC files are massive. If you want to store a large music library on a smartphone with limited storage, converting to high-bitrate MP3 is the most practical solution." },
      { q: "Can I hear the difference?", a: "Most users listening on standard headphones or car speakers cannot distinguish between a FLAC and a 320kbps MP3." },
      { q: "How is this converter different?", a: "We process the audio locally using WebAssembly. There are no upload waits or server queues." }
    ]
  },
  {
    path: "/ogg-to-mp3",
    tool: "convert-audio",
    h1: "Convert OGG to MP3 Online",
    description: "Transform OGG Vorbis audio files into the standard MP3 format quickly and securely.",
    features: [
      { title: "Seamless Decoding", desc: "Fast decoding of OGG streams and instant re-encoding to MP3 using local hardware." },
      { title: "No Limits", desc: "Convert hours of podcast audio or large soundtracks without server timeouts." }
    ],
    faqs: [
      { q: "Is OGG better than MP3?", a: "Technically, OGG Vorbis often provides better sound quality at lower bitrates than MP3, but MP3 is far more universally supported across hardware devices." },
      { q: "Is it free?", a: "Yes, 100% free with no file size limits because we don't pay for server processing costs. Your device does the work." },
      { q: "How long does it take?", a: "Because it runs locally, it is significantly faster than cloud converters that require uploading the file first." }
    ]
  },
  // Video Compressors
  {
    path: "/compress-mp4",
    tool: "compress-video",
    h1: "Compress MP4 Video Online",
    description: "Reduce the file size of your MP4 videos without losing visible quality. Perfect for email, WhatsApp, and Discord.",
    features: [
      { title: "Smart Bitrate Reduction", desc: "Our algorithm intelligently lowers the bitrate in scenes with low motion to save massive amounts of space." },
      { title: "Local GPU Compression", desc: "We utilize WebCodecs to compress your MP4 using your device's hardware acceleration." }
    ],
    faqs: [
      { q: "How can I compress an MP4 without losing quality?", a: "By adjusting the compression slider, you can find the sweet spot where file size drops significantly before the human eye can detect quality loss." },
      { q: "Is this good for WhatsApp or Discord limits?", a: "Yes! Our tool is specifically designed to shrink large videos down to fit within the 25MB or 50MB attachment limits of messaging apps." },
      { q: "Is the compression safe for private videos?", a: "100% safe. The compression happens entirely in your browser. We never upload your videos to any server." }
    ]
  },
  {
    path: "/compress-mov",
    tool: "compress-video",
    h1: "Compress MOV Video Online",
    description: "Shrink massive iPhone MOV files easily. Compress MOV videos locally in your browser to save space.",
    features: [
      { title: "HEVC Optimization", desc: "Modern iPhones record in highly detailed HEVC (H.265). We compress this efficiently while maintaining visual fidelity." },
      { title: "Instant Offline Processing", desc: "No more waiting hours to upload a 4K MOV file. Processing starts instantly." }
    ],
    faqs: [
      { q: "Why are MOV files from my iPhone so large?", a: "iPhones record in extremely high bitrates (often 4K at 60fps) to capture maximum detail, which creates massive files." },
      { q: "Does this tool work on iOS?", a: "Yes! Thanks to WebCodecs support in modern Safari, you can compress videos directly on your iPhone." },
      { q: "Will the output remain MOV?", a: "To ensure maximum compression and compatibility, we typically output the compressed video as an MP4 (H.264/H.265)." }
    ]
  },
  {
    path: "/compress-webm",
    tool: "compress-video",
    h1: "Compress WebM Video Online",
    description: "Reduce WebM video sizes for faster web loading. Perfect for developers and web designers optimizing assets.",
    features: [
      { title: "Web Optimized", desc: "Further compress VP8/VP9 WebM streams to ensure your web pages load incredibly fast." },
      { title: "Privacy Guaranteed", desc: "Process sensitive internal corporate videos or screen recordings completely offline." }
    ],
    faqs: [
      { q: "Should I use WebM or MP4 for my website?", a: "WebM usually offers better compression for the web, but MP4 has broader native support on Apple devices." },
      { q: "Can I compress screen recordings?", a: "Yes, WebM is commonly used for screen recording. Our tool can drastically reduce these file sizes by dropping the framerate or bitrate." },
      { q: "Are there any hidden costs?", a: "No, because we don't process your video on our servers, we don't have high server costs. The tool is completely free." }
    ]
  },
  // Video to GIF
  {
    path: "/mp4-to-gif",
    tool: "create-gif",
    h1: "Convert MP4 to GIF Online",
    description: "Create high-quality, looping animated GIFs from MP4 videos. Customize framerate, size, and duration securely.",
    features: [
      { title: "Custom Framerates", desc: "Choose between smooth 30fps GIFs or lightweight 10fps GIFs depending on your needs." },
      { title: "No Watermarks", desc: "We generate clean, professional GIFs locally in your browser without adding any annoying watermarks." }
    ],
    faqs: [
      { q: "Why is the GIF file size larger than the MP4?", a: "GIF is a very old and inefficient format compared to modern MP4. To keep the GIF size small, lower the resolution and framerate." },
      { q: "Can I crop the video before converting?", a: "Yes, you can trim the exact start and end times of the video to create the perfect looping GIF." },
      { q: "Is the conversion private?", a: "Absolutely. WebAssembly processes the MP4 locally and generates the GIF entirely in your RAM." }
    ]
  },
  {
    path: "/mov-to-gif",
    tool: "create-gif",
    h1: "Convert MOV to GIF Online",
    description: "Turn your iPhone MOV recordings into fun, shareable animated GIFs directly in your browser.",
    features: [
      { title: "Native iOS Support", desc: "Process files directly from your iPhone's camera roll without needing an app." },
      { title: "High-Quality Dithering", desc: "Our local encoder uses advanced color quantization to make your GIFs look fantastic despite the 256-color limit." }
    ],
    faqs: [
      { q: "Can I share these GIFs on iMessage?", a: "Yes! The generated GIFs are fully standard and can be shared easily via iMessage, WhatsApp, or Twitter." },
      { q: "Is it free to use?", a: "Yes. By running the processing on your own device using WebAssembly, we provide this tool 100% free with no limits." },
      { q: "How do I reduce the GIF size?", a: "Reduce the video resolution (e.g., to 480p) and lower the framerate to 10 or 15 fps before exporting." }
    ]
  },
  // Compress Audio
  {
    path: "/compress-mp3",
    tool: "compress-audio",
    h1: "Compress MP3 Audio Online",
    description: "Reduce MP3 file size quickly and securely. Perfect for creating small audio files for email and web.",
    features: [
      { title: "Smart Bitrate Control", desc: "Easily lower the bitrate of your MP3 files to save massive amounts of space." },
      { title: "100% Local Processing", desc: "Your audio is compressed instantly in your browser without uploading to any server." }
    ],
    faqs: [
      { q: "Does compressing an MP3 reduce quality?", a: "Yes, MP3 is a lossy format, so lowering the bitrate will reduce quality, but often it is unnoticeable to the human ear." },
      { q: "Is this safe for voice recordings?", a: "Yes, all processing happens locally. Your voice notes never leave your device." },
      { q: "What is the best bitrate for spoken word?", a: "For podcasts and voice notes, 64kbps or 96kbps is usually sufficient and produces very small files." }
    ]
  },
  {
    path: "/compress-wav",
    tool: "compress-audio",
    h1: "Compress WAV Files Online",
    description: "Shrink massive, uncompressed WAV audio files down to manageable sizes right in your browser.",
    features: [
      { title: "Convert and Compress", desc: "WAV files are uncompressed. We compress them by converting them to high-efficiency formats." },
      { title: "Lightning Fast", desc: "Local WebAssembly handles large WAV files in seconds without long upload times." }
    ],
    faqs: [
      { q: "Why are WAV files so large?", a: "WAV is an uncompressed format containing exact audio data, making it very large compared to MP3 or AAC." },
      { q: "Can I keep it in WAV format but make it smaller?", a: "You can lower the sample rate or bit depth, but for significant size reduction, converting to MP3 or AAC is recommended." },
      { q: "Is my data secure?", a: "Yes. No servers are involved in the compression process." }
    ]
  },
  // Transcribe
  {
    path: "/transcribe-mp3",
    tool: "transcribe",
    h1: "Transcribe MP3 to Text Free",
    description: "Convert MP3 audio to text offline using AI. Highly accurate speech-to-text directly in your browser.",
    features: [
      { title: "Offline AI Transcription", desc: "We use a WebAssembly port of Whisper AI to transcribe audio directly on your CPU." },
      { title: "Ultimate Privacy", desc: "No API calls. No cloud processing. Perfect for confidential interviews and meetings." }
    ],
    faqs: [
      { q: "How accurate is the transcription?", a: "We use advanced AI models (Whisper) that provide near-human accuracy for clear audio." },
      { q: "Can I transcribe large MP3 files?", a: "Yes, since it runs locally, you are not limited by server upload limits, only by your device's processing power." },
      { q: "Does it support multiple languages?", a: "Yes, our AI model automatically detects and transcribes multiple languages." }
    ]
  },
  {
    path: "/transcribe-mp4",
    tool: "transcribe",
    h1: "Transcribe MP4 Video to Text",
    description: "Extract and transcribe speech from MP4 video files automatically without uploading them to the cloud.",
    features: [
      { title: "Direct Video Processing", desc: "You don't need to extract the audio first. Just upload the MP4 and we handle the rest." },
      { title: "Generate Subtitles", desc: "Easily convert the spoken words in your video into text for subtitles." }
    ],
    faqs: [
      { q: "Is it free to transcribe videos?", a: "Yes, 100% free because your device does the computing work, not our servers." },
      { q: "How long does transcription take?", a: "It depends on your CPU speed. Modern processors can transcribe audio faster than real-time." },
      { q: "Are my videos kept private?", a: "Absolutely. We never upload your videos. The AI model runs directly in your browser." }
    ]
  },
  // Recorder
  {
    path: "/screen-recorder",
    tool: "recorder",
    h1: "Free Online Screen Recorder",
    description: "Record your screen, webcam, and microphone directly from your browser. No software installation required.",
    features: [
      { title: "Zero Installation", desc: "Start recording instantly without downloading any sketchy software or browser extensions." },
      { title: "High-Quality Export", desc: "Record in HD and save directly to your device as a standard WebM or MP4 file." }
    ],
    faqs: [
      { q: "Is there a time limit on recordings?", a: "No artificial time limits. You can record as long as you have free disk space and RAM." },
      { q: "Does it record system audio?", a: "Yes, you can choose to include system audio when sharing a tab or screen." },
      { q: "Are my recordings uploaded?", a: "Never. The recording is saved directly to your local hard drive." }
    ]
  },
  {
    path: "/audio-recorder",
    tool: "recorder",
    h1: "Free Online Audio Recorder",
    description: "Record your microphone directly in the browser with high-quality audio. Save instantly as MP3 or WAV.",
    features: [
      { title: "Crystal Clear Audio", desc: "Capture high-fidelity audio from your microphone for podcasts or voice notes." },
      { title: "Instant Save", desc: "Download your recording immediately without waiting for rendering or server processing." }
    ],
    faqs: [
      { q: "Do I need an account to record?", a: "No, our tool is completely free and requires no sign-up." },
      { q: "Can I pause the recording?", a: "Yes, you can pause and resume your recording as needed." },
      { q: "Is it safe for private memos?", a: "100% safe. Your voice data never leaves your computer." }
    ]
  },
  // Video Speed
  {
    path: "/speed-up-mp4",
    tool: "video-speed",
    h1: "Speed Up MP4 Video Online",
    description: "Fast-forward your MP4 videos easily. Change video speed locally in your browser without uploading.",
    features: [
      { title: "Custom Multipliers", desc: "Speed up your video by 1.5x, 2x, or any custom value." },
      { title: "Pitch Correction", desc: "Advanced audio processing keeps the sound natural even when sped up." }
    ],
    faqs: [
      { q: "Will speeding up the video reduce its size?", a: "Yes, generally a shorter video with the same bitrate will have a smaller file size." },
      { q: "Does it affect video quality?", a: "No, the visual quality remains the same, just the playback speed changes." },
      { q: "Is it secure?", a: "Yes, all processing is done locally using WebAssembly." }
    ]
  },
  {
    path: "/slow-down-mp4",
    tool: "video-speed",
    h1: "Slow Down MP4 Video Online",
    description: "Create slow-motion effects for your MP4 videos instantly. 100% free and private local processing.",
    features: [
      { title: "Smooth Slow Motion", desc: "Easily reduce video speed for dramatic slow-motion effects." },
      { title: "Offline Processing", desc: "Process gigabytes of video without worrying about internet speed or data caps." }
    ],
    faqs: [
      { q: "Can I make it 0.5x speed?", a: "Yes, you can slow down the video to half speed or even slower." },
      { q: "Will the audio slow down too?", a: "Yes, the audio will automatically sync with the new video speed." },
      { q: "Do you keep a copy of my video?", a: "Never. The video is processed entirely on your device." }
    ]
  },
  // Crop Video
  {
    path: "/crop-mp4",
    tool: "crop-video",
    h1: "Crop MP4 Video Online",
    description: "Easily crop and resize your MP4 videos to any aspect ratio. Remove unwanted borders instantly.",
    features: [
      { title: "Visual Cropper", desc: "Intuitive interface to select exactly which part of the video you want to keep." },
      { title: "No Watermarks", desc: "We never add any branding or watermarks to your cropped videos." }
    ],
    faqs: [
      { q: "Can I crop for Instagram or TikTok?", a: "Yes, we provide standard presets like 1:1 (Square) and 9:16 (Vertical) for social media." },
      { q: "Does cropping reduce video quality?", a: "Cropping reduces the resolution, but we maintain the original bitrate to ensure high quality." },
      { q: "Is my video uploaded?", a: "No, the cropping happens entirely in your browser using local FFmpeg." }
    ]
  },
  {
    path: "/resize-video-for-tiktok",
    tool: "crop-video",
    h1: "Resize Video for TikTok Online",
    description: "Crop and format any video to the perfect 9:16 vertical aspect ratio for TikTok and Reels.",
    features: [
      { title: "Perfect 9:16 Ratio", desc: "Automatically crop landscape videos to fit the vertical format perfectly." },
      { title: "Instant Local Export", desc: "Process the video locally so you can upload it to TikTok immediately." }
    ],
    faqs: [
      { q: "What is the TikTok aspect ratio?", a: "TikTok uses a 9:16 vertical aspect ratio (e.g., 1080x1920 pixels)." },
      { q: "Will it cut off the sides of my video?", a: "Yes, converting a landscape video to vertical will crop out the left and right sides." },
      { q: "Is it completely free?", a: "Yes, 100% free with no limits." }
    ]
  },
  // Mute Video
  {
    path: "/mute-mp4",
    tool: "mute-video",
    h1: "Mute MP4 Video Online",
    description: "Remove the audio track from your MP4 videos instantly and securely. Perfect for sharing silent clips.",
    features: [
      { title: "Instant Audio Removal", desc: "We strip the audio track without re-encoding the video, so it takes less than a second." },
      { title: "Preserve Video Quality", desc: "The video stream remains untouched, ensuring 100% of the original quality." }
    ],
    faqs: [
      { q: "How fast is muting a video?", a: "Because we don't re-encode the video, it usually finishes in under a second." },
      { q: "Does muting reduce file size?", a: "Yes, removing the audio track will slightly reduce the overall file size." },
      { q: "Is my privacy guaranteed?", a: "Yes, the file is processed locally. We never see your videos." }
    ]
  },
  {
    path: "/remove-audio-from-video",
    tool: "mute-video",
    h1: "Remove Audio from Video Online",
    description: "Easily strip sound from any video format. Secure, local, and completely free.",
    features: [
      { title: "Broad Format Support", desc: "Mute MP4, MOV, MKV, AVI, and WebM files easily." },
      { title: "No Upload Required", desc: "Process massive video files directly in your browser without wasting bandwidth." }
    ],
    faqs: [
      { q: "Can I add a new audio track later?", a: "Yes, once the original audio is removed, you can easily overlay a new track using video editing software." },
      { q: "Is there a limit on video length?", a: "No, since it runs locally, you can mute videos of any length." },
      { q: "Are there any watermarks added?", a: "No, we never add watermarks to your files." }
    ]
  },
  // Watermark Video
  {
    path: "/add-watermark-to-mp4",
    tool: "watermark-video",
    h1: "Add Watermark to MP4 Online",
    description: "Protect your MP4 videos by adding custom text or image watermarks directly in your browser.",
    features: [
      { title: "Custom Text & Images", desc: "Overlay your logo or custom text anywhere on the video frame." },
      { title: "Secure Processing", desc: "Keep your unreleased or private footage secure by watermarking it completely offline." }
    ],
    faqs: [
      { q: "Can I change the watermark opacity?", a: "Yes, you can adjust the transparency so the watermark doesn't obstruct the video." },
      { q: "Will the watermark be permanent?", a: "Yes, the watermark is hardcoded into the video frames during processing." },
      { q: "Is my original video safe?", a: "We generate a new watermarked copy. Your original file remains untouched." }
    ]
  },
  // Merge Audio
  {
    path: "/join-audio-files",
    tool: "merge-audio",
    h1: "Join Audio Files Online",
    description: "Merge multiple audio tracks into a single seamless file. Fast, secure, and 100% offline.",
    features: [
      { title: "Seamless Splicing", desc: "Combine MP3s, WAVs, or AACs without any audible gaps." },
      { title: "Drag and Drop Reordering", desc: "Easily arrange your audio files in the exact order you want them to play." }
    ],
    faqs: [
      { q: "Can I join different audio formats together?", a: "Yes, our engine will automatically convert and merge them into a single output format." },
      { q: "Is there a limit to how many files I can join?", a: "You are only limited by your browser's memory. You can join dozens of files easily." },
      { q: "Does it cost money?", a: "No, it is completely free." }
    ]
  },
  {
    path: "/merge-mp3",
    tool: "merge-audio",
    h1: "Merge MP3 Files Online",
    description: "Combine multiple MP3 files into one long track. Perfect for podcasts, audiobooks, and mixtapes.",
    features: [
      { title: "Fast Concatenation", desc: "If the MP3s have the same bitrate, we can often merge them instantly without re-encoding." },
      { title: "Local Processing", desc: "Merge gigabytes of audio data without uploading anything to a server." }
    ],
    faqs: [
      { q: "Will merging MP3s reduce quality?", a: "If the files have different bitrates, some transcoding may occur, but generally quality is preserved." },
      { q: "How long does it take?", a: "Depending on the total duration, it usually takes just a few seconds." },
      { q: "Is this tool really private?", a: "Yes. All processing happens entirely within your web browser." }
    ]
  }
];
export {
  PSEO_ROUTES
};
