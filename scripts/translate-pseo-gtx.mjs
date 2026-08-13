/**
 * translate-pseo-gtx.mjs
 * Pakai google-translate-api-x dengan strategi:
 * - Skip bahasa yang sudah benar (bukan English fallback)
 * - Delay 800ms antar field, 3000ms antar route, 5000ms antar bahasa
 * - Retry dengan exponential backoff jika 429
 * - Save progress setiap route selesai (bukan per bahasa)
 */
import translate from "google-translate-api-x";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, "..", "src", "data", "pseo-translations.json");
const ROUTES_PATH = path.join(__dirname, "..", "src", "data", "pseo-routes-simple.json");

const FIELD_DELAY = 700;   // ms antar field
const ROUTE_DELAY = 2500;  // ms antar route
const LANG_DELAY = 5000;   // ms antar bahasa

const LANGUAGES = [
  "id","es","fr","de","it","pt","nl","pl","ru","ja",
  "ko","zh-cn","zh-tw","tr","vi","th","ar","hi","sv",
  "no","da","fi","cs","hu","el","ro","uk","ms","tl","he"
];

// Mapping langCode ke key di result JSON
const LANG_KEY_MAP = { "zh-cn": "zh", "zh-tw": "zh-TW" };
const getLangKey = (lc) => LANG_KEY_MAP[lc] || lc;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function translateWithRetry(text, to, retries = 4) {
  if (!text || text.trim() === "") return text;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const result = await translate(text, { to, client: "gtx" });
      return result.text;
    } catch (e) {
      const is429 = e.message && (e.message.includes("429") || e.message.includes("Too Many"));
      const wait = is429 ? (attempt + 1) * 5000 : 2000;
      if (attempt < retries - 1) {
        process.stdout.write(`[wait${wait/1000}s]`);
        await sleep(wait);
      } else {
        return text; // English fallback
      }
    }
  }
  return text;
}

async function translateRoute(route, to) {
  const h1 = await translateWithRetry(route.h1, to);
  await sleep(FIELD_DELAY);
  const description = await translateWithRetry(route.description, to);
  await sleep(FIELD_DELAY);

  const features = [];
  for (const feat of route.features) {
    const title = await translateWithRetry(feat.title, to);
    await sleep(FIELD_DELAY);
    const desc = await translateWithRetry(feat.desc, to);
    await sleep(FIELD_DELAY);
    features.push({ title, desc });
  }

  const faqs = [];
  for (const faq of route.faqs) {
    const q = await translateWithRetry(faq.q, to);
    await sleep(FIELD_DELAY);
    const a = await translateWithRetry(faq.a, to);
    await sleep(FIELD_DELAY);
    faqs.push({ q, a });
  }

  return { path: route.path, tool: route.tool, h1, description, features, faqs };
}

async function main() {
  const PSEO_ROUTES = JSON.parse(fs.readFileSync(ROUTES_PATH, "utf8"));
  let result = {};
  if (fs.existsSync(OUT_PATH)) {
    result = JSON.parse(fs.readFileSync(OUT_PATH, "utf8"));
  }
  result["en"] = PSEO_ROUTES;

  console.log("=== pSEO Translator (google-translate-api-x) ===");
  console.log(`Routes: ${PSEO_ROUTES.length} | Languages: ${LANGUAGES.length}`);
  console.log(`Strategy: 700ms/field, 2500ms/route, 5000ms/lang\n`);

  for (let langIdx = 0; langIdx < LANGUAGES.length; langIdx++) {
    const langCode = LANGUAGES[langIdx];
    const langKey = getLangKey(langCode);

    // Cek apakah sudah benar-benar ditranslasi (bukan English fallback)
    const existing = result[langKey];
    if (existing && existing.length === PSEO_ROUTES.length) {
      const firstH1 = existing[0]?.h1;
      const isEnglish = firstH1 === PSEO_ROUTES[0].h1;
      if (!isEnglish) {
        console.log(`[${langIdx+1}/${LANGUAGES.length}] ${langKey} - DONE (translated), skip`);
        continue;
      }
      // Jika English fallback, hapus dan ulangi
      console.log(`[${langIdx+1}/${LANGUAGES.length}] ${langKey} - was fallback, retranslating...`);
    }

    process.stdout.write(`[${langIdx+1}/${LANGUAGES.length}] ${langKey}: `);
    const translatedRoutes = [];

    for (let rIdx = 0; rIdx < PSEO_ROUTES.length; rIdx++) {
      const route = PSEO_ROUTES[rIdx];
      const translated = await translateRoute(route, langCode);
      translatedRoutes.push(translated);
      process.stdout.write(".");

      // Save progress setiap 5 route
      if ((rIdx + 1) % 5 === 0) {
        result[langKey] = translatedRoutes;
        fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2));
      }

      if (rIdx < PSEO_ROUTES.length - 1) await sleep(ROUTE_DELAY);
    }

    result[langKey] = translatedRoutes;
    fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2));
    console.log(` DONE (saved)`);

    if (langIdx < LANGUAGES.length - 1) await sleep(LANG_DELAY);
  }

  console.log("\n\nSELESAI! Semua bahasa sudah ditranslasi.");
  console.log(`File: ${OUT_PATH}`);

  // Summary
  const finalData = JSON.parse(fs.readFileSync(OUT_PATH, "utf8"));
  let realTranslated = 0;
  for (const lang of Object.keys(finalData)) {
    if (lang === "en") continue;
    if (finalData[lang][0]?.h1 !== PSEO_ROUTES[0].h1) realTranslated++;
  }
  console.log(`Real translations: ${realTranslated}/${LANGUAGES.length} languages`);
}

main().catch(e => { console.error("Fatal:", e.message); process.exit(1); });
