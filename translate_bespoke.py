import json
from deep_translator import GoogleTranslator
import time
import os

print("Loading JSON...")
with open("src/data/pseo-long-tail-translations.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# English hardcoded strings mapping
bespoke_english = {
    "/reduce-mp4-video-size-for-email": {
        "heroTags": ['Under 25MB', 'No Upload Needed', 'Gmail & Outlook Ready'],
        "benefitsTitle": "Stop Getting \"File Too Large\" Errors",
        "benefitsDesc": "Every email provider imposes strict size limits. Compress your video privately in your browser before sending — no cloud storage required.",
        "benefitsItems": ['Gmail 25MB attachment limit', 'Outlook 20MB attachment limit', 'Yahoo Mail 25MB limit'],
        "privacyTitle": "Your Video Never Leaves Your Device",
        "privacyDesc": "Unlike cloud-based compressors, we process everything inside your browser using WebAssembly. Your private family videos, business pitches, and recordings stay 100% on your computer.",
        "performanceTitle": "Compress a 500MB Video in Under a Minute",
        "performanceDesc": "Our engine uses native WebAssembly FFmpeg. No cloud round-trips. Hardware-level speed, right on your CPU.",
        "performanceItems": ['Zero Upload Latency', 'GPU-Accelerated Encoding', 'No App Installation']
    },
    "/crop-video-for-instagram-story": {
        "heroTags": ['Perfect 9:16 Ratio', 'No Watermark', 'High Quality Export'],
        "benefitsTitle": "Stop Dealing with Black Bars",
        "benefitsDesc": "Landscape videos look terrible on Instagram Stories and Reels. Crop them perfectly to 9:16 in seconds, keeping the important action centered.",
        "benefitsItems": ['Vertical 9:16 cropping', 'No weird black bars', 'Full resolution retained'],
        "privacyTitle": "Your Edits Stay on Your Device",
        "privacyDesc": "Don't send your personal footage to sketchy cloud services. Our WebAssembly engine processes your video directly in your browser. Complete privacy, zero uploads.",
        "performanceTitle": "Hardware-Accelerated Cropping",
        "performanceDesc": "Crop a 4K video instantly using your device's native CPU. No waiting for uploads or server queues. Faster than opening a heavy editing app.",
        "performanceItems": ['Instant preview playback', 'Zero upload latency', 'No watermarks ever']
    },
    "/make-video-smaller-without-losing-quality": {
        "heroTags": ['Advanced HEVC/H.265', 'Zero Visual Loss', 'Free & Private'],
        "benefitsTitle": "Free Up Storage Space Instantly",
        "benefitsDesc": "4K videos from your iPhone or camera eat up gigabytes of storage. Compress them using advanced H.265 encoding to save up to 80% space while looking visually identical.",
        "benefitsItems": ['Saves gigabytes of storage', 'Visually identical quality', 'Advanced H.265 encoding'],
        "privacyTitle": "Maximum Privacy. Zero Servers.",
        "privacyDesc": "Your family memories and business videos are yours alone. Our tool works entirely offline in your browser. We never see, touch, or store your files.",
        "performanceTitle": "Desktop-Class Compression Speed",
        "performanceDesc": "Why wait for cloud uploads? By running natively on your hardware via WebAssembly, we encode your video significantly faster than online tools.",
        "performanceItems": ['Multi-threaded encoding', 'Works completely offline', 'No file size limit']
    },
    "/combine-multiple-voice-memos-into-one": {
        "heroTags": ['Gapless Merging', 'M4A/MP3/WAV', '100% Private'],
        "benefitsTitle": "From Scattered Memos to One Clean Track",
        "benefitsDesc": "Merge dozens of separate iPhone voice memos, dictated notes, and recorded interviews into a single seamless audio file — ready for editing or sharing.",
        "benefitsItems": ["iPhone M4A voice memos", "Android voice recorder files", "Zoom or Meet audio recordings"],
        "privacyTitle": "Your Private Recordings Stay Private",
        "privacyDesc": "Medical dictations, legal notes, business meetings — audio recordings are highly sensitive. We merge your audio entirely in your browser with WebAssembly. Zero server transmission.",
        "performanceTitle": "Merge Dozens of Recordings Instantly",
        "performanceDesc": "No upload limit. No timeout. Combine as many recordings as your device's RAM can hold. Our engine stitches them together gaplessly in seconds.",
        "performanceItems": ["Gapless audio stitching", "Cross-format: M4A, MP3, WAV", "No file count limit"]
    },
    "/convert-mov-to-mp4-for-android": {
        "heroTags": ['Universal MP4', 'Perfect for Android', 'Works Offline'],
        "benefitsTitle": "Stop Fixing 'Can't Play Video' Errors",
        "benefitsDesc": "Apple's MOV files often fail to play on Android devices or Windows PCs. Convert them to the universally supported MP4 format in seconds to share effortlessly.",
        "benefitsItems": ['Plays on any Android device', 'Windows PC compatible', 'Universal MP4 format'],
        "privacyTitle": "Your Videos Remain on Your Device",
        "privacyDesc": "Converting personal videos online can be risky. We eliminate that risk entirely by processing your MOV files directly inside your browser sandbox. No uploads. No servers.",
        "performanceTitle": "Instant Format Remuxing",
        "performanceDesc": "Most MOV to MP4 conversions don't even need re-encoding. Our tool 'remuxes' the file, swapping the container instantly for lighting-fast conversion without quality loss.",
        "performanceItems": ['Instant remuxing technology', 'Zero quality loss', 'Files process instantly']
    },
    "/remove-sound-from-video-completely": {
        "heroTags": ['Perfect Silence', 'Removes All Audio', 'Zero Quality Loss'],
        "benefitsTitle": "Remove Unwanted Background Noise",
        "benefitsDesc": "Did you record a great video but the wind noise or background chatter is awful? Strip the audio track entirely in one click before posting to social media.",
        "benefitsItems": ['Removes wind noise completely', 'Prepares video for TikTok sounds', 'Zero video quality loss'],
        "privacyTitle": "Your Original Video is Safe",
        "privacyDesc": "Don't send your files to random servers just to mute them. Our WebAssembly engine strips the audio track directly on your device, ensuring total privacy.",
        "performanceTitle": "Mute a 4K Video in Seconds",
        "performanceDesc": "Removing an audio track doesn't require re-encoding the video. Our engine just drops the audio stream, meaning even a 5GB 4K file can be muted instantly.",
        "performanceItems": ['Instant audio stripping', 'No video re-encoding', 'Handles 10GB+ files easily']
    },
    "/extract-audio-from-video-for-podcast": {
        "heroTags": ['Lossless Extraction', 'MP3 & WAV', 'No Size Limit'],
        "benefitsTitle": "Turn Video Interviews into Podcasts",
        "benefitsDesc": "Don't let a great Zoom interview go to waste. Extract the high-quality audio track from any video file to use for your podcast, transcriptions, or audio notes.",
        "benefitsItems": ['Zoom recordings support', 'Camera & DSLR footage', 'Screen recording rips'],
        "privacyTitle": "Your Unreleased Episodes Are Safe",
        "privacyDesc": "Podcast exclusives and pre-release interviews are incredibly sensitive. We process everything locally — your unreleased content never touches the internet until you decide to publish it.",
        "performanceTitle": "Extract a 2-Hour Zoom in Seconds",
        "performanceDesc": "Our direct stream copy engine extracts audio without re-encoding. A 2-hour podcast interview takes the same time as a 2-minute video — almost instant.",
        "performanceItems": ['Direct stream copy (no re-encoding)', 'Handles 10GB+ recordings', 'No timeout for long files']
    },
    "/speed-up-video-for-tiktok": {
        "heroTags": ['Pitch Correction', 'Up to 4x Speed', 'TikTok MP4 Output'],
        "benefitsTitle": "Faster Videos = Higher Watch Completion",
        "benefitsDesc": "Studies show that slightly sped-up videos have significantly higher completion rates on TikTok. Speed up long tutorials or vlogs to keep the audience hooked to the very end.",
        "benefitsItems": ['Increases audience retention', 'Fits more content into 60s', 'Pitch-corrected audio sounds natural'],
        "privacyTitle": "Your Pre-Release Content Stays Safe",
        "privacyDesc": "Your future viral video is your exclusive asset. Process it locally before it ever touches the internet. We never receive your content — only you do.",
        "performanceTitle": "Better Than TikTok's Built-In Editor",
        "performanceDesc": "TikTok's in-app speed tools are limited to specific presets. Our FFmpeg engine lets you fine-tune speed from 0.5x to 4x, with pitch correction that keeps audio natural.",
        "performanceItems": ['Fine-tune 0.5x to 4x speed', 'Automatic pitch correction', 'Export as TikTok-compatible MP4']
    },
    "/compress-large-video-for-whatsapp": {
        "heroTags": ['Fits 16MB Limit', 'No Data Waste', 'Audio Stays Synced'],
        "benefitsTitle": "Send Without Burning Your Data Plan",
        "benefitsDesc": "Uploading a 1GB video through WhatsApp wastes enormous mobile data. We compress locally so you send a tiny file that still looks great.",
        "benefitsItems": ['4K video compressed in seconds', 'Audio stays perfectly synced', 'Works on mobile browsers'],
        "privacyTitle": "Safer Than a WhatsApp App",
        "privacyDesc": "Many third-party apps ask for intrusive device permissions. Our web-based tool runs entirely in your secure browser sandbox. No permissions. No account. No video upload. Just results.",
        "performanceTitle": "Compress 4K to WhatsApp-Ready in Seconds",
        "performanceDesc": "Our WebAssembly engine taps directly into your device's native CPU. Even on mobile, you get desktop-class compression speed without burning data.",
        "performanceItems": ['No data upload required', 'Works fully offline', 'Instant compression on-device']
    },
    "/transcribe-zoom-meeting-recording-to-text": {
        "heroTags": ['AI-Powered Whisper', 'Near-Human Accuracy', '100% Local Processing'],
        "benefitsTitle": "Never Take Manual Meeting Notes Again",
        "benefitsDesc": "Stop pausing recordings to jot things down. Get a full, searchable transcript of your entire Zoom meeting automatically, then feed it into ChatGPT for an instant summary.",
        "benefitsItems": ['Generate meeting minutes instantly', 'Searchable text archives', 'Feed into AI for summaries'],
        "privacyTitle": "Confidential Meetings Stay Confidential",
        "privacyDesc": "Unlike cloud transcription services, our Whisper AI model runs entirely on your CPU. Your boardroom conversations, medical consultations, and legal calls are never transmitted to our servers.",
        "performanceTitle": "Upload the Video Directly — No Pre-Processing",
        "performanceDesc": "Skip the audio extraction step. Just drop your Zoom MP4 recording and our tool automatically extracts the audio and runs it through Whisper AI in one seamless pipeline.",
        "performanceItems": ['Direct video-to-text pipeline', 'Near-human accuracy with Whisper', 'No timeout for long recordings']
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
        
    # zh needs to map to zh-CN or zh-TW in some libraries, deep-translator usually takes 'zh-CN' for zh
    # 'ms' for malay
    target_lang = dest_lang
    if dest_lang == 'zh': target_lang = 'zh-CN'
    if dest_lang == 'he': target_lang = 'iw' # deep-translator uses iw for hebrew
    
    try:
        translated = GoogleTranslator(source='auto', target=target_lang).translate(text)
        translation_cache[cache_key] = translated
        time.sleep(0.2) # Avoid rate limit
        return translated
    except Exception as e:
        print(f"Error translating '{text}' to {target_lang}: {e}")
        return text

# Map each English text into the 'en' array first
for route in data['en']:
    path = route.get('path')
    if path in bespoke_english:
        route['bespokeData'] = bespoke_english[path]

# Now for all other languages, find the path and translate the bespokeData
for lang in languages:
    if lang == 'en':
        continue
        
    print(f"Processing {lang}...")
    for route in data[lang]:
        # Match using the 'tool' key because path is translated
        path = None
        for en_route in data['en']:
            if en_route.get('tool') == route.get('tool'):
                path = en_route.get('path')
                break
                
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

    with open("src/data/pseo-long-tail-translations.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Saved progress for {lang}!")

with open("src/data/pseo-long-tail-translations.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Translation complete!")
