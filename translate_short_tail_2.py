import json
from deep_translator import GoogleTranslator
import time

print("Loading JSON...")
with open("src/data/pseo-translations.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# English hardcoded strings mapping for the 20 remaining pages
bespoke_english = {
    "/compress-mov": {
        "heroTags": ['HEVC Optimization', 'Shrink iPhone Video', 'Offline Tool'],
        "benefitsTitle": "Fix Massive iPhone Video Files",
        "benefitsDesc": "iPhones record in incredible quality, but the resulting MOV files are often too large to share. Compress them effortlessly without losing visible detail.",
        "benefitsItems": ['Fix email limits', 'Save iCloud storage', 'Perfect for 4K video'],
        "privacyTitle": "100% Secure & Private",
        "privacyDesc": "Compressing private family videos? We never upload your recordings. Our engine shrinks your MOV files locally inside your browser.",
        "performanceTitle": "Hardware-Accelerated Compression",
        "performanceDesc": "We tap into your device's GPU to encode H.265/HEVC video significantly faster than traditional cloud-based tools.",
        "performanceItems": ['GPU-accelerated', 'Zero upload wait', 'Battery efficient']
    },
    "/compress-webm": {
        "heroTags": ['Web Optimized', 'Reduce Bandwidth', 'VP8/VP9 Support'],
        "benefitsTitle": "Make Your Website Faster",
        "benefitsDesc": "WebM videos are great for web backgrounds, but unoptimized files kill load times. Compress them to ensure a fast, smooth user experience.",
        "benefitsItems": ['Improve SEO scores', 'Reduce server costs', 'Smooth web playback'],
        "privacyTitle": "Client-Side Processing",
        "privacyDesc": "Don't leak unreleased corporate assets or screen recordings. Our WebAssembly engine processes WebM files securely offline.",
        "performanceTitle": "Efficient VP9 Encoding",
        "performanceDesc": "We intelligently drop the bitrate and framerate of your WebM files using advanced browser-based encoding techniques.",
        "performanceItems": ['Custom bitrates', 'No server queues', 'Free forever']
    },
    "/mp4-to-gif": {
        "heroTags": ['Looping Animation', 'Custom Framerate', 'No Watermarks'],
        "benefitsTitle": "Turn Videos into Viral GIFs",
        "benefitsDesc": "Convert any MP4 clip into a looping animated GIF for Twitter, Discord, or iMessage. Customize the size and speed perfectly.",
        "benefitsItems": ['Share on Discord', 'Use as forum avatars', 'Meme generator'],
        "privacyTitle": "Your Memes Stay Private",
        "privacyDesc": "Process your videos into GIFs entirely on your device. We don't store or track what you create.",
        "performanceTitle": "High-Quality Dithering",
        "performanceDesc": "GIFs are limited to 256 colors. Our advanced dithering algorithms ensure your animations still look fantastic.",
        "performanceItems": ['Advanced quantization', 'Instant rendering', 'Adjustable fps']
    },
    "/mov-to-gif": {
        "heroTags": ['iPhone to GIF', 'Social Ready', 'WebAssembly Powered'],
        "benefitsTitle": "Make iPhone Videos Shareable",
        "benefitsDesc": "Transform your personal MOV recordings into fun, looping GIFs that can be shared in any messaging app.",
        "benefitsItems": ['Share via iMessage', 'Perfect for WhatsApp', 'No app required'],
        "privacyTitle": "Local Privacy Guarantee",
        "privacyDesc": "Keep your personal moments private. Our tool converts MOV to GIF locally in your browser without any server uploads.",
        "performanceTitle": "Fast & Efficient",
        "performanceDesc": "Our local FFmpeg engine parses MOV containers instantly and generates lightweight GIFs in seconds.",
        "performanceItems": ['Zero wait time', 'No annoying watermarks', 'Free unlimited use']
    },
    "/compress-mp3": {
        "heroTags": ['Shrink Audio', 'Podcast Ready', 'Adjust Bitrate'],
        "benefitsTitle": "Reduce Audio File Sizes",
        "benefitsDesc": "Need to fit an audio file into an email or a game asset bundle? Compress MP3s by lowering the bitrate while keeping voices clear.",
        "benefitsItems": ['Perfect for voice notes', 'Fit email limits', 'Save server bandwidth'],
        "privacyTitle": "Total Audio Confidentiality",
        "privacyDesc": "Compressing unreleased music tracks or private interviews? Ensure they stay private by processing them completely offline.",
        "performanceTitle": "Blazing Fast LAME Encoder",
        "performanceDesc": "We utilize a WebAssembly port of the industry-standard LAME encoder to compress MP3 files instantly.",
        "performanceItems": ['Industry standard quality', 'Millisecond processing', 'Batch support']
    },
    "/compress-wav": {
        "heroTags": ['Compress Lossless', 'High Efficiency', 'Save Space'],
        "benefitsTitle": "Shrink Massive WAV Files",
        "benefitsDesc": "WAV files are huge because they are uncompressed. Shrink them down to a fraction of their size by converting to high-efficiency formats.",
        "benefitsItems": ['Save 90% space', 'Easier sharing', 'Perfect for archives'],
        "privacyTitle": "Secure Offline Engine",
        "privacyDesc": "Working on sensitive audio projects? Rest easy knowing our tool compresses your audio without sending it over the internet.",
        "performanceTitle": "Multi-threaded Encoding",
        "performanceDesc": "Our local engine leverages multiple CPU cores to chew through massive WAV files significantly faster than cloud solutions.",
        "performanceItems": ['Multi-core support', 'Zero upload bottlenecks', 'No file size limits']
    },
    "/transcribe-mp3": {
        "heroTags": ['AI Speech to Text', 'Offline Whisper', 'High Accuracy'],
        "benefitsTitle": "Transcribe Audio Instantly",
        "benefitsDesc": "Convert interviews, lectures, and podcasts into text automatically. Our AI model provides near-human accuracy completely free.",
        "benefitsItems": ['Generate meeting notes', 'Transcribe interviews', 'Save hours of typing'],
        "privacyTitle": "The Ultimate Privacy",
        "privacyDesc": "Most transcription services upload your audio to the cloud. We run the AI model directly on your device, ensuring 100% confidentiality.",
        "performanceTitle": "Powered by WebGPU",
        "performanceDesc": "We use WebGPU to run OpenAI's Whisper model directly on your graphics card for blazing fast, offline transcription.",
        "performanceItems": ['Hardware accelerated', 'No API costs', 'Multi-language detection']
    },
    "/transcribe-mp4": {
        "heroTags": ['Video to Text', 'Generate Subtitles', 'Free AI Tool'],
        "benefitsTitle": "Extract Speech from Video",
        "benefitsDesc": "Need subtitles for your YouTube video or a transcript of a recorded meeting? Our AI handles it instantly from the MP4 file.",
        "benefitsItems": ['Create SRT subtitles', 'Index video content', 'Improve accessibility'],
        "privacyTitle": "Zero Cloud Uploads",
        "privacyDesc": "Keep your unlisted videos and private meetings secure. The transcription AI runs entirely inside your browser.",
        "performanceTitle": "Local AI Processing",
        "performanceDesc": "Our tool extracts the audio track locally and feeds it into a highly optimized, browser-based neural network.",
        "performanceItems": ['Instant audio extraction', 'Highly accurate AI', 'Runs entirely offline']
    },
    "/screen-recorder": {
        "heroTags": ['Record Screen', 'No Watermarks', 'No Installation'],
        "benefitsTitle": "Capture Your Screen Effortlessly",
        "benefitsDesc": "Record tutorials, gameplay, or presentations directly from your browser. No sketchy software downloads or browser extensions required.",
        "benefitsItems": ['Record full screen or tab', 'Include microphone', 'Export in HD'],
        "privacyTitle": "Your Recordings, Your PC",
        "privacyDesc": "We don't have access to your screen. The recording stream is piped directly to your local hard drive.",
        "performanceTitle": "Hardware Encoding",
        "performanceDesc": "We utilize the MediaRecorder API to capture your screen with virtually zero impact on your system performance.",
        "performanceItems": ['Zero lag recording', 'Instant MP4/WebM save', 'Unlimited recording time']
    },
    "/audio-recorder": {
        "heroTags": ['Record Mic', 'High Fidelity', 'Instant Save'],
        "benefitsTitle": "Record Voice Notes Instantly",
        "benefitsDesc": "Capture high-quality audio directly from your microphone. Perfect for quick voice memos, podcast intros, or language practice.",
        "benefitsItems": ['Export as MP3 or WAV', 'Visual audio wave', 'No account needed'],
        "privacyTitle": "Complete Privacy",
        "privacyDesc": "Your microphone feed is processed locally and never leaves your computer. We guarantee 100% privacy.",
        "performanceTitle": "Low Latency Capture",
        "performanceDesc": "Our tool taps directly into your audio hardware via Web Audio API for crisp, uninterrupted recording.",
        "performanceItems": ['High sample rate', 'Zero server delay', 'Free forever']
    },
    "/speed-up-mp4": {
        "heroTags": ['Fast Forward', 'Change Speed', 'Pitch Correction'],
        "benefitsTitle": "Accelerate Your Videos",
        "benefitsDesc": "Make slow tutorials or long presentations fly by. Speed up your MP4 videos by 1.5x, 2x, or any custom multiplier.",
        "benefitsItems": ['Skip boring parts', 'Create timelapses', 'Adjustable speed'],
        "privacyTitle": "Private Video Editing",
        "privacyDesc": "Process your videos securely offline. No one else will ever see the files you edit on our platform.",
        "performanceTitle": "Instant Local Rendering",
        "performanceDesc": "We adjust the video presentation timestamps locally, allowing for blazing fast speed changes without full re-encoding.",
        "performanceItems": ['Smart audio pitch sync', 'Zero upload wait', 'Maintains quality']
    },
    "/slow-down-mp4": {
        "heroTags": ['Slow Motion', 'Dramatic Effect', 'Offline Editor'],
        "benefitsTitle": "Create Stunning Slow-Mo",
        "benefitsDesc": "Slow down fast-paced action shots or sports footage to see every detail. Easily reduce video speed with a single slider.",
        "benefitsItems": ['Analyze sports footage', 'Create dramatic edits', 'Smooth playback'],
        "privacyTitle": "Safe & Secure",
        "privacyDesc": "Don't risk uploading your personal footage to random servers. Our tool processes everything directly on your CPU.",
        "performanceTitle": "High-Efficiency Processing",
        "performanceDesc": "Our local WebAssembly engine seamlessly stretches the audio and video streams without destroying the file quality.",
        "performanceItems": ['Maintains audio pitch', 'Hardware accelerated', 'No size limits']
    },
    "/crop-mp4": {
        "heroTags": ['Resize Video', 'Remove Borders', 'Custom Aspect Ratio'],
        "benefitsTitle": "Crop Videos to Perfection",
        "benefitsDesc": "Remove black bars, watermarks, or unwanted objects from the edges of your MP4 videos with an intuitive visual cropper.",
        "benefitsItems": ['Fix framing issues', 'Remove watermarks', 'Freeform cropping'],
        "privacyTitle": "Your Edits Remain Private",
        "privacyDesc": "All video parsing and cropping happens natively in your browser. We never see your files.",
        "performanceTitle": "Precision Local Cropping",
        "performanceDesc": "We utilize a local FFmpeg port to accurately crop your video frame-by-frame while maintaining the original bitrate.",
        "performanceItems": ['Pixel-perfect accuracy', 'Zero cloud latency', 'High visual fidelity']
    },
    "/resize-video-for-tiktok": {
        "heroTags": ['9:16 Ratio', 'TikTok Ready', 'Social Media Tool'],
        "benefitsTitle": "Perfect Formatting for Social Media",
        "benefitsDesc": "Automatically crop landscape videos into the vertical 9:16 aspect ratio required for TikTok, Instagram Reels, and YouTube Shorts.",
        "benefitsItems": ['Grow your audience', 'Fix black bars', 'Maximize screen space'],
        "privacyTitle": "100% Offline Processing",
        "privacyDesc": "Keep your drafts unreleased. Our tool formats your videos securely offline before you upload them to TikTok.",
        "performanceTitle": "Instant Export",
        "performanceDesc": "Skip the heavy desktop editing software. Our browser-based tool resizes and exports your video in seconds.",
        "performanceItems": ['Smart center cropping', 'No watermarks added', 'Free and unlimited']
    },
    "/mute-mp4": {
        "heroTags": ['Remove Audio', 'Silent Video', 'Instant Mute'],
        "benefitsTitle": "Strip Sound from Videos",
        "benefitsDesc": "Need to share a video but the background audio is embarrassing or copyrighted? Remove the audio track instantly.",
        "benefitsItems": ['Avoid copyright strikes', 'Share silent clips', 'Prepare for editing'],
        "privacyTitle": "Secure & Local",
        "privacyDesc": "Your video is processed securely in your browser's memory. We guarantee complete data privacy.",
        "performanceTitle": "Zero Re-encoding",
        "performanceDesc": "We simply drop the audio stream and remux the video. This means the process takes less than a second regardless of file size.",
        "performanceItems": ['Instant processing', '100% original video quality', 'No upload required']
    },
    "/remove-audio-from-video": {
        "heroTags": ['Universal Mute', 'All Formats', 'Fast Processing'],
        "benefitsTitle": "Mute Any Video Format",
        "benefitsDesc": "Easily remove the audio track from MOV, MKV, AVI, and WebM files. Perfect for creating stock footage or silent B-roll.",
        "benefitsItems": ['Clean up B-roll footage', 'Create stock video', 'Multi-format support'],
        "privacyTitle": "Client-Side Processing",
        "privacyDesc": "Your footage never leaves your hard drive. Process massive video files securely and privately.",
        "performanceTitle": "Lightning Fast Remuxing",
        "performanceDesc": "By avoiding video re-encoding, our local engine can mute gigabytes of video almost instantaneously.",
        "performanceItems": ['No server limits', 'Maintains visual quality', 'Free forever']
    },
    "/add-watermark-to-mp4": {
        "heroTags": ['Protect Video', 'Add Logo', 'Custom Text'],
        "benefitsTitle": "Brand Your MP4 Videos",
        "benefitsDesc": "Protect your intellectual property by overlaying your logo or custom text onto your MP4 videos before sharing them online.",
        "benefitsItems": ['Prevent video theft', 'Increase brand awareness', 'Custom positioning'],
        "privacyTitle": "Keep Your Originals Safe",
        "privacyDesc": "Watermark unreleased footage without uploading it to a third-party server. Everything runs on your machine.",
        "performanceTitle": "Hardware-Accelerated Overlay",
        "performanceDesc": "We use WebCodecs to hardcode your watermark into the video frames utilizing your device's GPU for maximum speed.",
        "performanceItems": ['GPU-accelerated', 'Adjustable opacity', 'High-quality export']
    },
    "/join-audio-files": {
        "heroTags": ['Merge Audio', 'Seamless Splicing', 'Drag & Drop'],
        "benefitsTitle": "Combine Multiple Audio Tracks",
        "benefitsDesc": "Merge voice notes, songs, or podcast segments into a single seamless audio file. Arrange them in any order you want.",
        "benefitsItems": ['Create mixtapes', 'Join podcast segments', 'Combine voice notes'],
        "privacyTitle": "Your Audio Stays Local",
        "privacyDesc": "Process hours of audio securely. We never upload your files to our servers.",
        "performanceTitle": "High-Speed Concatenation",
        "performanceDesc": "If your files share the same format and bitrate, our engine merges them instantly without re-encoding.",
        "performanceItems": ['Instant merging', 'No file size limits', 'Cross-format support']
    },
    "/merge-mp3": {
        "heroTags": ['Combine MP3s', 'Audio Joiner', 'Free Tool'],
        "benefitsTitle": "Merge MP3 Files Easily",
        "benefitsDesc": "Stitch together multiple MP3 files to create continuous audiobooks, mixes, or long-form podcast episodes.",
        "benefitsItems": ['Perfect for audiobooks', 'Make DJ mixes', 'No audible gaps'],
        "privacyTitle": "100% Private Engine",
        "privacyDesc": "Keep your audio projects private. Our browser-based tool guarantees that your files never leave your device.",
        "performanceTitle": "Instant Local Processing",
        "performanceDesc": "By utilizing local WebAssembly, we bypass the need for slow uploads, allowing you to merge gigabytes of MP3s instantly.",
        "performanceItems": ['Zero upload time', 'Preserves audio quality', 'Completely free']
    },
    "/mp4-to-wav": {
        "heroTags": ['Uncompressed Audio', 'Highest Quality', 'Extract WAV'],
        "benefitsTitle": "Extract Lossless Audio from Video",
        "benefitsDesc": "Need the absolute highest quality audio from a video for professional editing? Extract it as an uncompressed WAV file.",
        "benefitsItems": ['Perfect for audio engineers', 'No compression artifacts', 'Import into DAWs'],
        "privacyTitle": "Secure Audio Extraction",
        "privacyDesc": "Process your video files locally. Your media is never uploaded to any cloud server.",
        "performanceTitle": "High-Speed Decoding",
        "performanceDesc": "Our local FFmpeg engine decodes the video's audio stream and writes uncompressed PCM WAV data at blazing speeds.",
        "performanceItems": ['Instant decoding', 'Zero upload wait', 'Preserves original sample rate']
    }
}

languages = list(data.keys())
print(f"Translating for {len(languages)} languages...")

# Cache translations to prevent duplicate calls
translation_cache = {}

def translate_str(text, dest_lang):
    if dest_lang == 'en':
        return text
    if not text:
        return text
        
    cache_key = f"{dest_lang}:{text}"
    if cache_key in translation_cache:
        return translation_cache[cache_key]
        
    target_lang = dest_lang
    if dest_lang == 'zh': target_lang = 'zh-CN'
    if dest_lang == 'he': target_lang = 'iw'
    
    try:
        translated = GoogleTranslator(source='auto', target=target_lang).translate(text)
        translation_cache[cache_key] = translated
        time.sleep(0.2)
        return translated
    except Exception as e:
        print(f"Error translating '{text}' to {target_lang}: {e}")
        return text

# Map each English text into the 'en' array first
for route in data['en']:
    path = route.get('path')
    if path in bespoke_english:
        route['bespokeData'] = bespoke_english[path]

# Translate for other languages
for lang in languages:
    if lang == 'en':
        continue
        
    print(f"Processing {lang}...")
    for route in data[lang]:
        path = None
        # Find corresponding english path using exact index
        try:
            index = data[lang].index(route)
            en_equivalent = data['en'][index]
            path = en_equivalent.get('path')
        except ValueError:
            continue
                
        if path and path in bespoke_english:
            en_bespoke = bespoke_english[path]
            translated_bespoke = {}
            
            translated_bespoke["heroTags"] = [translate_str(t, lang) for t in en_bespoke["heroTags"]]
            translated_bespoke["benefitsTitle"] = translate_str(en_bespoke["benefitsTitle"], lang)
            translated_bespoke["benefitsDesc"] = translate_str(en_bespoke["benefitsDesc"], lang)
            translated_bespoke["benefitsItems"] = [translate_str(t, lang) for t in en_bespoke["benefitsItems"]]
            
            translated_bespoke["privacyTitle"] = translate_str(en_bespoke["privacyTitle"], lang)
            translated_bespoke["privacyDesc"] = translate_str(en_bespoke["privacyDesc"], lang)
            
            translated_bespoke["performanceTitle"] = translate_str(en_bespoke["performanceTitle"], lang)
            translated_bespoke["performanceDesc"] = translate_str(en_bespoke["performanceDesc"], lang)
            translated_bespoke["performanceItems"] = [translate_str(t, lang) for t in en_bespoke["performanceItems"]]
            
            route['bespokeData'] = translated_bespoke

    # Incremental save
    with open("src/data/pseo-translations.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Saved progress for {lang}!")

with open("src/data/pseo-translations.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Translation complete!")
