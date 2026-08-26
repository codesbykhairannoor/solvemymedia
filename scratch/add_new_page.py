import json

new_page = {
    "path": "/mp4-to-wav",
    "tool": "convert-audio",
    "h1": "Convert MP4 to WAV Online",
    "description": "Extract uncompressed WAV audio from MP4 video securely and instantly in your browser.",
    "features": [
        {"title": "Uncompressed Audio Extraction", "desc": "Extract the highest quality WAV file from your video stream."},
        {"title": "100% Local Processing", "desc": "Your video is never uploaded. Conversion happens offline."}
    ],
    "faqs": [
        {"q": "Will extracting WAV improve audio quality?", "a": "WAV is uncompressed, but the quality cannot exceed the original MP4's audio track."},
        {"q": "Is it safe?", "a": "Yes, it is entirely local processing."}
    ]
}

with open("src/data/pseo-translations.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Append to en
if not any(r.get("path") == "/mp4-to-wav" for r in data["en"]):
    data["en"].append(new_page)

# For other languages, append the english version for now, our translator script will translate it
for lang, routes in data.items():
    if lang == "en":
        continue
    if not any(r.get("path") == "/mp4-to-wav" for r in routes):
        routes.append(new_page.copy())

with open("src/data/pseo-translations.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Added /mp4-to-wav to pseo-translations.json")
