import json
from deep_translator import GoogleTranslator
import time

print("Loading JSON...")
with open("src/data/pseo-translations.json", "r", encoding="utf-8") as f:
    data = json.load(f)

languages = list(data.keys())
print(f"Translating for {len(languages)} languages...")

translation_cache = {}

consecutive_errors = 0

def translate_str(text, dest_lang):
    global consecutive_errors
    if dest_lang == 'en': return text
    if not text: return text
    if consecutive_errors > 3: return text # Circuit breaker! Skip translating
        
    cache_key = f"{dest_lang}:{text}"
    if cache_key in translation_cache:
        return translation_cache[cache_key]
        
    target_lang = dest_lang
    if dest_lang == 'zh': target_lang = 'zh-CN'
    if dest_lang == 'he': target_lang = 'iw'
    
    try:
        import concurrent.futures
        with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
            future = executor.submit(GoogleTranslator(source='auto', target=target_lang).translate, text)
            translated = future.result(timeout=5) # 5 seconds timeout
            
        translation_cache[cache_key] = translated
        consecutive_errors = 0
        time.sleep(0.1)
        return translated
    except Exception as e:
        print(f"Error translating '{text}' to {target_lang}: {e}")
        consecutive_errors += 1
        return text

# Get all bespoke data from English
en_bespoke_map = {}
for r in data['en']:
    path = r.get('path')
    if path and 'bespokeData' in r:
        en_bespoke_map[path] = r['bespokeData']

print(f"Found {len(en_bespoke_map)} pages with bespoke data in English.")

total_missing = 0
for lang in languages:
    if lang == 'en': continue
    for route in data[lang]:
        path = route.get('path')
        if path in en_bespoke_map and 'bespokeData' not in route:
            total_missing += 1

print(f"Found {total_missing} total missing bespokeData entries across all languages.")

for lang in languages:
    if lang == 'en': continue
    
    missing_for_lang = [r for r in data[lang] if r.get('path') in en_bespoke_map and 'bespokeData' not in r]
    if not missing_for_lang:
        continue
        
    print(f"Processing {lang} ({len(missing_for_lang)} missing)...")
    for route in missing_for_lang:
        path = route.get('path')
        en_bespoke = en_bespoke_map[path]
        
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

    with open("src/data/pseo-translations.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Saved progress for {lang}!")

print("All translations complete!")
