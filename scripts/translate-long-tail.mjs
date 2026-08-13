import translate from "google-translate-api-x";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, "..", "src", "data", "pseo-long-tail-translations.json");
const ROUTES_PATH = path.join(__dirname, "..", "src", "data", "pseo-long-tail.json");

const ROUTE_DELAY = 1500;  // ms antar route
const LANG_DELAY = 3000;   // ms antar bahasa

const LANGUAGES = [
  "id","es","fr","de","it","pt","nl","pl","ru","ja",
  "ko","zh-cn","zh-tw","tr","vi","th","ar","hi","sv",
  "no","da","fi","cs","hu","el","ro","uk","ms","tl","he"
];

const LANG_KEY_MAP = { "zh-cn": "zh", "zh-tw": "zh-TW" };
const getLangKey = (lc) => LANG_KEY_MAP[lc] || lc;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function translateBatchWithRetry(texts, to, retries = 4) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await translate(texts, { to, client: "gtx", forceBatch: false, rejectOnPartialFail: false });
      return Array.isArray(res) ? res.map(r => r.text) : [res.text];
    } catch (e) {
      const is429 = e.message && (e.message.includes("429") || e.message.includes("Too Many"));
      const wait = is429 ? (attempt + 1) * 4000 : 2000;
      if (attempt < retries - 1) {
        process.stdout.write(`[wait]`);
        await sleep(wait);
      } else {
        return texts; // English fallback on total failure
      }
    }
  }
  return texts;
}

async function translateRoute(route, to) {
  // Collect all strings
  const textsToTranslate = [];
  textsToTranslate.push(route.h1);
  textsToTranslate.push(route.description);
  textsToTranslate.push(route.dynamicSection.heading);
  
  for (const item of route.dynamicSection.items) {
    textsToTranslate.push(item.title);
    textsToTranslate.push(item.content);
  }
  
  for (const faq of route.faqs) {
    textsToTranslate.push(faq.q);
    textsToTranslate.push(faq.a);
  }

  const translatedTexts = await translateBatchWithRetry(textsToTranslate, to);
  
  // Reconstruct
  let idx = 0;
  const h1 = translatedTexts[idx++];
  const description = translatedTexts[idx++];
  
  const dynamicSection = { type: route.dynamicSection.type, heading: '', items: [] };
  dynamicSection.heading = translatedTexts[idx++];
  
  for (const item of route.dynamicSection.items) {
    dynamicSection.items.push({
      title: translatedTexts[idx++],
      content: translatedTexts[idx++]
    });
  }

  const faqs = [];
  for (const faq of route.faqs) {
    faqs.push({
      q: translatedTexts[idx++],
      a: translatedTexts[idx++]
    });
  }

  return { path: route.path, tool: route.tool, h1, description, dynamicSection, faqs };
}

async function main() {
  const PSEO_ROUTES = JSON.parse(fs.readFileSync(ROUTES_PATH, "utf8"));
  let result = {};
  if (fs.existsSync(OUT_PATH)) {
    result = JSON.parse(fs.readFileSync(OUT_PATH, "utf8"));
  }
  result["en"] = PSEO_ROUTES;

  console.log("=== Long-Tail pSEO Translator (Batched) ===");
  console.log(`Routes: ${PSEO_ROUTES.length} | Languages: ${LANGUAGES.length}`);

  for (let langIdx = 0; langIdx < LANGUAGES.length; langIdx++) {
    const langCode = LANGUAGES[langIdx];
    const langKey = getLangKey(langCode);

    const existing = result[langKey];
    if (existing && existing.length === PSEO_ROUTES.length) {
      const firstH1 = existing[0]?.h1;
      const isEnglish = firstH1 === PSEO_ROUTES[0].h1;
      if (!isEnglish) {
        console.log(`[${langIdx+1}/${LANGUAGES.length}] ${langKey} - DONE, skip`);
        continue;
      }
    }

    process.stdout.write(`[${langIdx+1}/${LANGUAGES.length}] ${langKey}: `);
    const translatedRoutes = [];

    for (let rIdx = 0; rIdx < PSEO_ROUTES.length; rIdx++) {
      const route = PSEO_ROUTES[rIdx];
      const translated = await translateRoute(route, langCode);
      translatedRoutes.push(translated);
      process.stdout.write(".");
      
      if ((rIdx + 1) % 5 === 0) {
        result[langKey] = translatedRoutes;
        fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2));
      }

      if (rIdx < PSEO_ROUTES.length - 1) await sleep(ROUTE_DELAY);
    }

    result[langKey] = translatedRoutes;
    fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2));
    console.log(` DONE`);

    if (langIdx < LANGUAGES.length - 1) await sleep(LANG_DELAY);
  }

  console.log("\n\nSELESAI! Semua 10 long-tail keyword sudah ditranslasi ke 30 bahasa.");
}

main().catch(e => { console.error("Fatal:", e.message); process.exit(1); });
