import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load API key from .env.local
const envPath = path.join(__dirname, "..", ".env.local");
const envContent = fs.readFileSync(envPath, "utf8");
const apiKeyMatch = envContent.match(/GEMINI_API_KEY=(.+)/);
if (!apiKeyMatch) throw new Error("GEMINI_API_KEY not found in .env.local");
const API_KEY = apiKeyMatch[1].trim();

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const LANGUAGES = {
  id: "Indonesian", es: "Spanish", fr: "French", de: "German", it: "Italian",
  pt: "Portuguese (Brazilian)", nl: "Dutch", pl: "Polish", ru: "Russian",
  ja: "Japanese", ko: "Korean", zh: "Simplified Chinese", "zh-TW": "Traditional Chinese",
  tr: "Turkish", vi: "Vietnamese", th: "Thai", ar: "Arabic", hi: "Hindi",
  sv: "Swedish", no: "Norwegian", da: "Danish", fi: "Finnish", cs: "Czech",
  hu: "Hungarian", el: "Greek", ro: "Romanian", uk: "Ukrainian", ms: "Malay",
  tl: "Filipino (Tagalog)", he: "Hebrew"
};

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function translateRoute(route, langCode, langName) {
  const prompt = `You are a professional SEO translator. Translate the following JSON content from English to ${langName}.

RULES:
- Preserve ALL JSON keys exactly (do NOT translate keys)
- Translate ONLY the string values
- Keep technical terms unchanged: MP4, MP3, MOV, GIF, WAV, FLAC, OGG, WebM, WebAssembly, WebCodecs, HEVC, H.264, H.265, AAC, VBR, AI, CPU, GPU, RAM, HD, 4K, TikTok, Instagram, WhatsApp, Discord, iMessage, Twitter
- Keep numbers and percentages unchanged (e.g. 80-90%, 25MB)
- "h1" must be under 70 chars and SEO-friendly
- "description" must be under 160 chars
- Sound natural and fluent, not like machine translation
- Return ONLY valid JSON, no markdown fences, no explanation

Input JSON:
${JSON.stringify({ h1: route.h1, description: route.description, features: route.features, faqs: route.faqs }, null, 2)}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const clean = text.replace(/^` + '```' + `(?:json)?\s*/i, "").replace(/\s*` + '```' + `$/i, "").trim();
  const parsed = JSON.parse(clean);
  return { path: route.path, tool: route.tool, h1: parsed.h1, description: parsed.description, features: parsed.features, faqs: parsed.faqs };
}

const PSEO_ROUTES = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "src", "data", "pseo-routes-simple.json"), "utf8"));

async function main() {
  const outPath = path.join(__dirname, "..", "src", "data", "pseo-translations.json");
  let result = {};
  if (fs.existsSync(outPath)) {
    result = JSON.parse(fs.readFileSync(outPath, "utf8"));
    console.log(`Resuming. Already done: ${Object.keys(result).filter(k => k !== "en").join(", ")}`);
  }
  result["en"] = PSEO_ROUTES;

  const langEntries = Object.entries(LANGUAGES);
  for (let langIdx = 0; langIdx < langEntries.length; langIdx++) {
    const [langCode, langName] = langEntries[langIdx];
    if (result[langCode] && result[langCode].length === PSEO_ROUTES.length) {
      console.log(`[${langIdx+1}/${langEntries.length}] ${langCode} - already done, skipping`);
      continue;
    }
    console.log(`\n[${langIdx+1}/${langEntries.length}] Translating to ${langCode} (${langName})...`);
    const translatedRoutes = [];
    for (let rIdx = 0; rIdx < PSEO_ROUTES.length; rIdx++) {
      const route = PSEO_ROUTES[rIdx];
      let translated = null;
      let retries = 3;
      while (retries > 0 && !translated) {
        try {
          translated = await translateRoute(route, langCode, langName);
          translatedRoutes.push(translated);
          process.stdout.write(".");
        } catch (e) {
          retries--;
          if (retries === 0) {
            console.error(`\n  FAILED ${route.path} for ${langCode}: ${e.message}. Fallback.`);
            translatedRoutes.push({ ...route });
          } else {
            process.stdout.write("r");
            await sleep(2000);
          }
        }
      }
      await sleep(400);
    }
    result[langCode] = translatedRoutes;
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
    console.log(`\n  DONE ${langCode}! Saved.`);
    await sleep(1500);
  }
  console.log("\n\nAll done! Translations saved to", outPath);
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
