import json
from deep_translator import GoogleTranslator
import time
import os

print("Loading JSON...")
with open("src/data/pseo-translations.json", "r", encoding="utf-8") as f:
    data = json.load(f)

languages = list(data.keys())
print(f"Translating for {len(languages)} languages...")

translation_cache = {}

def translate_str(text, dest_lang):
    if dest_lang == 'en':
        return text
    if not text:
        return text
    if "Error 500" not in text and text.strip() != "":
        # If it's already translated (i.e. doesn't have Error 500), should we re-translate?
        # Actually, all of them have "Error 500" because of the rate limit earlier.
        pass
        
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

for lang in languages:
    if lang == 'en':
        continue
        
    print(f"Processing {lang}...")
    updated_any = False
    
    for route in data[lang]:
        # Need to retranslate bespokeData if it contains Error 500
        # Find corresponding en route
        en_route = next((r for r in data['en'] if r.get('path') == route.get('path')), None)
        
        if en_route and "bespokeData" in en_route:
            en_bespoke = en_route["bespokeData"]
            
            # Check if this route needs fixing
            needs_fix = False
            if "bespokeData" not in route:
                needs_fix = True
            else:
                for k, v in route["bespokeData"].items():
                    if isinstance(v, str) and "Error 500" in v:
                        needs_fix = True
                    elif isinstance(v, list) and any("Error 500" in item for item in v):
                        needs_fix = True
                        
            if needs_fix:
                translated_bespoke = {}
                
                translated_bespoke["heroTags"] = [translate_str(t, lang) for t in en_bespoke.get("heroTags", [])]
                translated_bespoke["benefitsTitle"] = translate_str(en_bespoke.get("benefitsTitle", ""), lang)
                translated_bespoke["benefitsDesc"] = translate_str(en_bespoke.get("benefitsDesc", ""), lang)
                translated_bespoke["benefitsItems"] = [translate_str(t, lang) for t in en_bespoke.get("benefitsItems", [])]
                
                translated_bespoke["privacyTitle"] = translate_str(en_bespoke.get("privacyTitle", ""), lang)
                translated_bespoke["privacyDesc"] = translate_str(en_bespoke.get("privacyDesc", ""), lang)
                
                translated_bespoke["performanceTitle"] = translate_str(en_bespoke.get("performanceTitle", ""), lang)
                translated_bespoke["performanceDesc"] = translate_str(en_bespoke.get("performanceDesc", ""), lang)
                translated_bespoke["performanceItems"] = [translate_str(t, lang) for t in en_bespoke.get("performanceItems", [])]
                
                route['bespokeData'] = translated_bespoke
                updated_any = True
                
    if updated_any:
        with open("src/data/pseo-translations.json", "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Saved progress for {lang}!")
    else:
        print(f"{lang} already clean.")

with open("src/data/pseo-translations.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Translation complete!")
