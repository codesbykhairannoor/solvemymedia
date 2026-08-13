/**
 * translate-pseo-free.mjs
 * 
 * Strategy (komunitas):
 * 1. PRIMARY: MyMemory API (gratis, no key, limit 50k chars/hari dengan email param)
 *    - URL: https://api.mymemory.translated.net/get?q=TEXT&langpair=en|LANG&de=EMAIL
 *    - Max 500 bytes per request -> kita kirim per field
 *    - Delay 200ms antar request untuk jaga rate limit
 * 
 * 2. FALLBACK: LibreTranslate public instances (rotate 4 server)
 *    - translate.argosopentech.com
 *    - lt.vern.cc  
 *    - trans.zillyhuhn.com
 *    - translate.fedilab.app
 * 
 * 3. RESUME CAPABILITY: Skip bahasa yang sudah selesai
 * 4. Save progress setiap 1 bahasa selesai
 */

import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, "..", "src", "data", "pseo-translations.json");
const ROUTES_PATH = path.join(__dirname, "..", "src", "data", "pseo-routes-simple.json");

// ── CONFIG ──────────────────────────────────────────────────────────────────
const EMAIL = "translate@solvemymedia.com"; // Email untuk unlock 50k chars/hari MyMemory
const DELAY_MS = 350; // Jeda antar request agar tidak kena rate limit

// Daftar server LibreTranslate fallback (rotate)
const LIBRE_SERVERS = [
  "https://translate.argosopentech.com",
  "https://lt.vern.cc",
  "https://trans.zillyhuhn.com",
  "https://translate.fedilab.app",
];
let libreServerIdx = 0;

// ── LANGUAGES ───────────────────────────────────────────────────────────────
const LANGUAGES = {
  id: "id", es: "es", fr: "fr", de: "de", it: "it",
  pt: "pt", nl: "nl", pl: "pl", ru: "ru", ja: "ja",
  ko: "ko", zh: "zh", "zh-TW": "zh-TW", tr: "tr",
  vi: "vi", th: "th", ar: "ar", hi: "hi", sv: "sv",
  no: "no", da: "da", fi: "fi", cs: "cs", hu: "hu",
  el: "el", ro: "ro", uk: "uk", ms: "ms", tl: "tl", he: "he"
};

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ── PRIMARY: MyMemory ────────────────────────────────────────────────────────
async function translateMyMemory(text, targetLang) {
  // MyMemory max 500 bytes per request, tapi kita kirim field pendek jadi aman
  const url = "https://api.mymemory.translated.net/get";
  const response = await axios.get(url, {
    params: { q: text, langpair: `en|${targetLang}`, de: EMAIL },
    timeout: 10000
  });
  
  if (response.data.responseStatus === 200 || response.data.responseStatus === "200") {
    const translated = response.data.responseData.translatedText;
    // Cek apakah MyMemory mengembalikan teks yang valid (bukan error message)
    if (translated && !translated.includes("QUERY LENGTH LIMIT EXCEDEED") && !translated.includes("MYMEMORY WARNING")) {
      return translated;
    }
  }
  throw new Error(`MyMemory failed: ${JSON.stringify(response.data.responseStatus)}`);
}

// ── FALLBACK: LibreTranslate ─────────────────────────────────────────────────
async function translateLibre(text, targetLang) {
  // Rotate server
  const server = LIBRE_SERVERS[libreServerIdx % LIBRE_SERVERS.length];
  libreServerIdx++;
  
  // LibreTranslate pakai zh-TW -> zh tidak didukung semua server
  const libreTarget = targetLang === "zh-TW" ? "zh" : targetLang;
  
  const response = await axios.post(`${server}/translate`, {
    q: text, source: "en", target: libreTarget, format: "text"
  }, { timeout: 15000 });
  
  if (response.data && response.data.translatedText) {
    return response.data.translatedText;
  }
  throw new Error(`LibreTranslate failed on ${server}`);
}

// ── MAIN TRANSLATE FUNCTION (dengan fallback) ────────────────────────────────
async function translateText(text, targetLang, context = "") {
  if (!text || text.trim() === "") return text;
  
  // Coba MyMemory dulu
  try {
    const result = await translateMyMemory(text, targetLang);
    await sleep(DELAY_MS);
    return result;
  } catch(e) {
    // Fallback ke LibreTranslate
    try {
      const result = await translateLibre(text, targetLang);
      await sleep(DELAY_MS);
      return result;
    } catch(e2) {
      process.stdout.write("!");
      return text; // Fallback ke English
    }
  }
}

// ── TRANSLATE SATU ROUTE ─────────────────────────────────────────────────────
async function translateRoute(route, langCode) {
  // Translate semua field secara sequential (bukan parallel, untuk jaga rate limit)
  const h1 = await translateText(route.h1, langCode, "h1");
  const description = await translateText(route.description, langCode, "description");
  
  const features = [];
  for (const feat of route.features) {
    const title = await translateText(feat.title, langCode, "feat.title");
    const desc = await translateText(feat.desc, langCode, "feat.desc");
    features.push({ title, desc });
  }
  
  const faqs = [];
  for (const faq of route.faqs) {
    const q = await translateText(faq.q, langCode, "faq.q");
    const a = await translateText(faq.a, langCode, "faq.a");
    faqs.push({ q, a });
  }
  
  return { path: route.path, tool: route.tool, h1, description, features, faqs };
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  const PSEO_ROUTES = JSON.parse(fs.readFileSync(ROUTES_PATH, "utf8"));
  
  // Load existing progress
  let result = {};
  if (fs.existsSync(OUT_PATH)) {
    result = JSON.parse(fs.readFileSync(OUT_PATH, "utf8"));
    const done = Object.keys(result).filter(k => k !== "en");
    if (done.length > 0) {
      console.log(`Resuming... already done: ${done.join(", ")}`);
    }
  }
  
  // English source
  result["en"] = PSEO_ROUTES;
  
  const langEntries = Object.entries(LANGUAGES);
  console.log(`Translating ${PSEO_ROUTES.length} routes x ${langEntries.length} languages...`);
  console.log(`Using: MyMemory API (primary) + LibreTranslate (fallback)`);
  console.log(`Estimasi waktu: ~${Math.ceil(PSEO_ROUTES.length * langEntries.length * 10 * DELAY_MS / 60000)} menit\n`);
  
  for (let langIdx = 0; langIdx < langEntries.length; langIdx++) {
    const [langCode, mmCode] = langEntries[langIdx];
    
    // Skip kalau sudah done dan jumlahnya benar
    if (result[langCode] && result[langCode].length === PSEO_ROUTES.length) {
      console.log(`[${langIdx+1}/${langEntries.length}] ${langCode} - sudah ada, skip`);
      continue;
    }
    
    process.stdout.write(`[${langIdx+1}/${langEntries.length}] ${langCode}: `);
    const translatedRoutes = [];
    
    for (const route of PSEO_ROUTES) {
      try {
        const translated = await translateRoute(route, mmCode);
        translatedRoutes.push(translated);
        process.stdout.write(".");
      } catch (e) {
        translatedRoutes.push({ ...route }); // fallback English
        process.stdout.write("x");
      }
    }
    
    result[langCode] = translatedRoutes;
    fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2));
    console.log(` DONE`);
    
    // Jeda lebih panjang antar bahasa
    await sleep(2000);
  }
  
  console.log(`\n\nSELESAI! File disimpan di: ${OUT_PATH}`);
  console.log(`Total: ${Object.keys(result).length} bahasa, ${PSEO_ROUTES.length} rute masing-masing`);
}

main().catch(e => { console.error("Fatal:", e.message); process.exit(1); });
