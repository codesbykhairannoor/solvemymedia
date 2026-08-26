import json
from deep_translator import GoogleTranslator
import time

print("Loading JSON...")
with open("src/data/pseo-translations.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# English hardcoded strings mapping
bespoke_english = {
    "/mp4-to-mp3": {
        "heroTags": ['Fast Audio Rip', 'Zero Quality Loss', 'Browser Based'],
        "benefitsTitle": "Extract Songs and Podcasts Instantly",
        "benefitsDesc": "Don't keep massive MP4 files when you only need the audio. Extract high-quality MP3s for your music library or podcast edits.",
        "benefitsItems": ['Perfect for music videos', 'Extract podcast audio', 'Save storage space'],
        "privacyTitle": "Your Media is Never Uploaded",
        "privacyDesc": "Unlike other tools, our converter runs entirely in your browser. We never see your files, ensuring 100% privacy.",
        "performanceTitle": "Direct Stream Copy",
        "performanceDesc": "We extract the exact audio stream without re-encoding, making the process virtually instant.",
        "performanceItems": ['Zero upload time', 'No quality degradation', 'Handles huge files']
    },
    "/mov-to-mp4": {
        "heroTags": ['Fix Playback Errors', 'Instant Remux', 'Universal MP4'],
        "benefitsTitle": "Make iPhone Videos Play Everywhere",
        "benefitsDesc": "Apple's MOV files often fail on Android or Windows. Convert them to universally accepted MP4 format effortlessly.",
        "benefitsItems": ['Play on any TV', 'Share on Android', 'Windows compatible'],
        "privacyTitle": "Maximum Privacy for Personal Clips",
        "privacyDesc": "Keep your personal recordings out of the cloud. Our WebAssembly engine processes your MOV files safely offline.",
        "performanceTitle": "Lightning Fast Conversion",
        "performanceDesc": "We intelligently 'remux' the video container when possible, changing format without re-encoding.",
        "performanceItems": ['Instant remuxing', 'No server queues', 'Preserves original quality']
    },
    "/mkv-to-mp4": {
        "heroTags": ['Play MKV on TV', 'Preserve Subtitles', 'No Re-encoding'],
        "benefitsTitle": "Watch Movies on Any Device",
        "benefitsDesc": "MKV files often lack support on smart TVs and older media players. Convert to MP4 to ensure seamless playback.",
        "benefitsItems": ['Smart TV compatible', 'Playstation/Xbox ready', 'Mobile friendly'],
        "privacyTitle": "Total Privacy for Your Media",
        "privacyDesc": "Process your entire movie library offline. We don't track what you convert and files never leave your device.",
        "performanceTitle": "Remuxing Magic",
        "performanceDesc": "Instead of waiting hours for a video to re-encode, we just swap the MKV container for MP4 in seconds.",
        "performanceItems": ['Seconds instead of hours', 'Maintains 4K quality', 'Works entirely locally']
    },
    "/webm-to-mp4": {
        "heroTags": ['Browser to Mobile', 'High Compatibility', 'WebM Converter'],
        "benefitsTitle": "Share Web Animations Easily",
        "benefitsDesc": "WebM is great for browsers but terrible for sharing on WhatsApp or Instagram. Convert them to MP4 for maximum compatibility.",
        "benefitsItems": ['Share to social media', 'Send via messaging apps', 'Edit in Premiere/Final Cut'],
        "privacyTitle": "Client-Side Processing",
        "privacyDesc": "Don't trust third-party servers. Our tool uses your device's memory and CPU to securely translate the video format.",
        "performanceTitle": "Hardware Accelerated Encoding",
        "performanceDesc": "We leverage WebCodecs to tap into your device's GPU, delivering blazing fast WebM to MP4 transcoding.",
        "performanceItems": ['GPU acceleration', 'Zero server wait', 'High efficiency']
    },
    "/avi-to-mp4": {
        "heroTags": ['Modernize Old Videos', 'Reduce File Size', 'Legacy Format Fix'],
        "benefitsTitle": "Update Legacy AVI Files",
        "benefitsDesc": "AVI is an outdated format that creates massive files and lacks support on modern devices. Modernize them to H.264 MP4.",
        "benefitsItems": ['Shrink massive files', 'Play on modern smartphones', 'Archive efficiently'],
        "privacyTitle": "Safe Offline Conversion",
        "privacyDesc": "Converting old family videos? Ensure they stay private by processing them locally without any network uploads.",
        "performanceTitle": "Optimized WASM Engine",
        "performanceDesc": "Our finely-tuned WebAssembly FFmpeg engine crunches through old AVI codecs faster than most desktop apps.",
        "performanceItems": ['Multi-threaded decoding', 'Fast H.264 encoding', 'No app installation']
    },
    "/wav-to-mp3": {
        "heroTags": ['Studio to Web', 'Adjust Bitrate', 'Compress Audio'],
        "benefitsTitle": "Shrink Massive Audio Files",
        "benefitsDesc": "WAV files are uncompressed and huge. Convert them to MP3 to save 90% of your disk space while maintaining great sound.",
        "benefitsItems": ['Save 90% storage', 'Perfect for websites', 'Share via email'],
        "privacyTitle": "Private Audio Processing",
        "privacyDesc": "Working on unreleased music tracks or confidential voiceovers? Convert them securely offline.",
        "performanceTitle": "High-Speed LAME Encoder",
        "performanceDesc": "We compile the industry-standard LAME MP3 encoder directly into your browser for instant, high-quality compression.",
        "performanceItems": ['Industry-standard quality', 'Instant processing', 'Works completely offline']
    },
    "/m4a-to-mp3": {
        "heroTags": ['Universal Audio', 'Voice Memo Fix', 'M4A Converter'],
        "benefitsTitle": "Make iPhone Voice Memos Shareable",
        "benefitsDesc": "Apple's M4A voice recordings can be tricky to play on older PCs or non-Apple devices. Convert to MP3 to ensure everyone can listen.",
        "benefitsItems": ['Windows compatible', 'Android friendly', 'Perfect for archiving'],
        "privacyTitle": "Keep Your Voice Notes Private",
        "privacyDesc": "Voice memos often contain personal thoughts or business ideas. Our tool guarantees privacy by running 100% locally.",
        "performanceTitle": "Instant Conversion",
        "performanceDesc": "Audio files are small and our local engine is fast. Convert a 1-hour voice memo in just a few seconds.",
        "performanceItems": ['Lightning fast', 'Zero upload required', 'Batch processing capable']
    },
    "/flac-to-mp3": {
        "heroTags": ['Lossless to Lossy', 'Save Space', 'Keep Metadata'],
        "benefitsTitle": "Create Mobile-Friendly Music",
        "benefitsDesc": "FLAC is amazing for archiving, but overkill for listening on the go. Convert to 320kbps MP3 to fit more music on your phone.",
        "benefitsItems": ['Fit more songs on mobile', 'Preserve ID3 tags', 'High-quality 320kbps option'],
        "privacyTitle": "Your Library Stays Yours",
        "privacyDesc": "Don't upload your entire music library to the cloud just to convert it. Process gigabytes of FLAC files locally.",
        "performanceTitle": "Optimized Audio Transcoding",
        "performanceDesc": "Our local engine utilizes your device's CPU cores to chew through audio transcoding significantly faster than cloud solutions.",
        "performanceItems": ['Multi-core processing', 'No file size limits', 'Completely free']
    },
    "/ogg-to-mp3": {
        "heroTags": ['Game Audio to MP3', 'High Quality', 'Universal Format'],
        "benefitsTitle": "Make OGG Files Usable Everywhere",
        "benefitsDesc": "OGG files are common in games and some messaging apps like WhatsApp, but lack universal support in music players. Convert them to MP3.",
        "benefitsItems": ['Play in standard music apps', 'Edit in basic software', 'Wide device support'],
        "privacyTitle": "Total Confidentiality",
        "privacyDesc": "Whether it's private WhatsApp voice notes or proprietary game assets, keep them secure by processing them offline in your browser.",
        "performanceTitle": "Fast & Efficient",
        "performanceDesc": "The conversion from OGG to MP3 is computationally light. Enjoy blazing fast conversion speeds right on your device.",
        "performanceItems": ['Instant results', 'No software to install', 'Cross-platform compatible']
    },
    "/compress-mp4": {
        "heroTags": ['Shrink Video', 'Save Data', 'Fix Size Limits'],
        "benefitsTitle": "Bypass File Size Limits Easily",
        "benefitsDesc": "Struggling to send a video over email, Discord, or WhatsApp? Compress your MP4 files significantly without ruining the visual quality.",
        "benefitsItems": ['Fit within email attachments', 'Save mobile data', 'Faster uploads to social media'],
        "privacyTitle": "Your Videos, Your Privacy",
        "privacyDesc": "Compressing personal moments? Don't risk uploading them to shady servers. Our engine shrinks your video natively inside your browser.",
        "performanceTitle": "Hardware-Accelerated Compression",
        "performanceDesc": "We use WebCodecs and WebAssembly to leverage your device's hardware, meaning we compress video significantly faster than online tools.",
        "performanceItems": ['GPU-accelerated encoding', 'No upload bottlenecks', 'Smart variable bitrate']
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
        # Find corresponding english path using exact index since the arrays are isomorphic
        index = data[lang].index(route)
        en_equivalent = data['en'][index]
        path = en_equivalent.get('path')
                
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
