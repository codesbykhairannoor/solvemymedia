const fs = require('fs');
const path = require('path');

const CORE_TOOLS = [
  '/', '/compress-video', '/compress-audio', '/convert-video', 
  '/convert-audio', '/video-to-audio', '/transcribe', '/recorder', 
  '/create-gif', '/video-speed', '/crop-video', '/mute-video', 
  '/watermark-video', '/merge-audio'
];

async function run() {
  // Polyfills for SSR
  global.window = { location: { pathname: '/', search: '', hash: '' }, matchMedia: () => ({ matches: false }) };
  global.document = {
    documentElement: { dir: 'ltr', setAttribute: () => {} },
    querySelector: () => null,
    createElement: () => ({}),
    cookie: '',
    getElementById: () => null,
  };
  global.location = global.window.location;
  global.localStorage = { getItem: () => null, setItem: () => {} };
  global.navigator = { language: 'en', userAgent: 'Node' };

  let serverRender = null;
  try {
    const serverEntryPath = path.join(__dirname, '../dist/server/entry-server.js');
    if (fs.existsSync(serverEntryPath)) {
      const serverModule = await import('file://' + serverEntryPath.replace(/\\/g, '/'));
      serverRender = serverModule.render;
      console.log('✅ Loaded React Server-Side Rendering (SSR) bundle.');
    } else {
      console.error('SSR bundle not found at', serverEntryPath);
      process.exit(1);
    }
  } catch (e) {
    console.error('Failed to load SSR bundle:', e);
    process.exit(1);
  }

  const distDir = path.join(__dirname, '../dist');
  const indexPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.error('dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf8');

  const langCodes = [
    'en','id','es','fr','de','it','pt','nl','pl','ru',
    'ja','ko','zh','zh-TW','tr','vi','th','ar','hi','sv',
    'no','da','fi','cs','hu','el','ro','uk','ms','tl',
    'he','sk'
  ];

  // Load pSEO Long Tail data
  const pseoDbPath = path.join(__dirname, '../src/data/pseo-long-tail-translations.json');
  let pseoDb = {};
  if (fs.existsSync(pseoDbPath)) {
    pseoDb = JSON.parse(fs.readFileSync(pseoDbPath, 'utf8'));
  }


  let slugsMap = {};
  try {
    const slugsTsPath = path.join(__dirname, '../src/i18n/slugs.ts');
    if (fs.existsSync(slugsTsPath)) {
      const slugsTs = fs.readFileSync(slugsTsPath, 'utf8');
      const match = slugsTs.match(/export const SLUGS_MAP[^=]*= (\{[\s\S]*?\});/);
      if (match) {
        // Evaluate the object strictly, it's just a JS object literal
        slugsMap = eval('(' + match[1] + ')');
      }
    }
  } catch (e) {
    console.warn("Could not parse SLUGS_MAP", e.message);
  }

  const getLocalizedSlug = (enSlug, lang) => {
    const cleanEn = enSlug.replace(/^\//, '');
    if (lang === 'en' || !cleanEn) return cleanEn; // root path returns ''
    
    if (slugsMap[lang]) {
      for (const [enKey, locVal] of Object.entries(slugsMap[lang])) {
        if (enKey === cleanEn) {
          return locVal;
        }
      }
    }
    return cleanEn;
  };

  let generatedCount = 0;

  for (const lang of langCodes) {
    let translations = null;

    // 1. Generate Core Tools
    for (const tool of CORE_TOOLS) {
      const locSlug = getLocalizedSlug(tool, lang);
      const urlPath = lang === 'en' ? (locSlug ? `/${locSlug}` : '/') : `/${lang}${locSlug ? `/${locSlug}` : ''}`;
      await generatePage(urlPath, lang, translations, serverRender, baseHtml, distDir);
      generatedCount++;
    }

    // 2. Generate pSEO Long Tail pages
    const langPseo = pseoDb[lang] || [];
    for (const pseoItem of langPseo) {
      const toolSlug = pseoItem.path.startsWith('/') ? pseoItem.path : `/${pseoItem.path}`;
      const locSlug = getLocalizedSlug(toolSlug, lang);
      const urlPath = lang === 'en' ? `/${locSlug}` : `/${lang}/${locSlug}`;
      await generatePage(urlPath, lang, translations, serverRender, baseHtml, distDir);
      generatedCount++;
    }

    if (generatedCount % 100 === 0 || lang === 'en' || lang === 'id') {
      console.log(`... Generated ${generatedCount} pages (processed lang: ${lang})`);
    }
  }

  // Generate legal pages (English only for now, or multi if needed)
  const staticRoutes = [
    '/about-us', '/privacy-policy', '/terms-of-service', '/security', '/pricing', '/compare', '/supported-languages'
  ];
  for (const lang of langCodes) {
    let translations = null;
    for (const route of staticRoutes) {
      const urlPath = lang === 'en' ? route : `/${lang}${route}`;
      await generatePage(urlPath, lang, translations, serverRender, baseHtml, distDir);
      generatedCount++;
    }
  }

  // Generate legacy slug redirects to eliminate 404 errors permanently
  const LEGACY_REDIRECTS = {
    'mp4-to-gif': 'create-gif',
    'mov-to-gif': 'create-gif',
    'm4a-to-mp3': 'video-to-audio',
    'ogg-to-mp3': 'video-to-audio',
    'wav-to-mp3': 'video-to-audio',
    'flac-to-mp3': 'video-to-audio',
    'mp4-to-mp3': 'video-to-audio',
    'crop-mp4': 'crop-video',
    'resize-video-for-tiktok': 'crop-video',
    'remove-audio-from-video': 'mute-video',
    'mute-mp4': 'mute-video',
    'slow-down-mp4': 'video-speed',
    'speed-up-mp4': 'video-speed',
    'add-watermark-to-mp4': 'watermark-video',
    'join-audio-files': 'merge-audio',
    'merge-mp3': 'merge-audio',
    'screen-recorder': 'recorder',
    'audio-recorder': 'recorder',
    'transcribe-mp3': 'transcribe',
    'transcribe-mp4': 'transcribe',
    'compress-mov': 'compress-video',
    'compress-mp4': 'compress-video',
    'compress-webm': 'compress-video',
    'compress-mp3': 'compress-audio',
    'compress-wav': 'compress-audio',
    'mov-to-mp4': 'convert-video',
    'mkv-to-mp4': 'convert-video',
    'webm-to-mp4': 'convert-video',
    'avi-to-mp4': 'convert-video',
  };

  for (const [legacy, target] of Object.entries(LEGACY_REDIRECTS)) {
    const redirectHtml = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/${target}"><link rel="canonical" href="https://solvemymedia.com/${target}"><script>window.location.replace('/${target}');</script></head><body><p>Redirecting to <a href="/${target}">/${target}</a>...</p></body></html>`;
    const targetDir = path.join(distDir, legacy);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(path.join(targetDir, 'index.html'), redirectHtml);
  }

  console.log(`✅ SSG Complete! Generated ${generatedCount} static HTML files and ${Object.keys(LEGACY_REDIRECTS).length} legacy redirect aliases.`);
}

async function generatePage(urlPath, lang, translations, serverRender, baseHtml, distDir) {
  try {
    global.window.location = { pathname: urlPath, search: '', hash: '' };
    global.location = global.window.location;
    
    // Call SSR Render
    const { appHtml, headPayload } = await serverRender(urlPath, lang, translations);
    
    // Separate any hoisted tags (<link>, <meta>, <style>, <title>) emitted by React 19 at start of appHtml
    // These belong in <head> and MUST NOT remain inside <div id="root"> (which causes React Error #418 hydration mismatch)
    let hoistedTags = '';
    let cleanAppHtml = appHtml ? appHtml.trim() : '';
    
    const tagRegex = /^<(?:link|meta)\b[^>]*\/?>|^<(?:style|title)\b[^>]*>[\s\S]*?<\/(?:style|title)>/i;
    while (true) {
      const match = cleanAppHtml.match(tagRegex);
      if (!match) break;
      hoistedTags += match[0] + '\n';
      cleanAppHtml = cleanAppHtml.slice(match[0].length).trim();
    }

    let newHtml = baseHtml.replace('<!--ssr-outlet-->', cleanAppHtml);
    
    // Clean any pre-existing title tag from baseHtml to prevent double title tags
    newHtml = newHtml.replace(/<title>[\s\S]*?<\/title>/gi, '');

    // Inject any hoisted tags and @unhead/ssr tags into <head>
    const extraHead = [hoistedTags.trim(), headPayload && headPayload.headTags ? headPayload.headTags.trim() : ''].filter(Boolean).join('\n');
    if (extraHead) {
      newHtml = newHtml.replace('</head>', `\n${extraHead}\n</head>`);
    }

    // Replace html lang attribute
    newHtml = newHtml.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);

    // Write to dist
    const routePath = urlPath === '/' ? '' : urlPath;
    const targetDir = path.join(distDir, routePath.startsWith('/') ? routePath.substring(1) : routePath);
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(targetDir, 'index.html'), newHtml);
  } catch (e) {
    console.error(`Error SSR rendering ${urlPath}:`, e);
  }
}

run().then(() => {
  process.exit(0);
}).catch((err) => {
  console.error("SSG Error:", err);
  process.exit(1);
});
