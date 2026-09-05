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

  console.log(`✅ SSG Complete! Generated ${generatedCount} static HTML files in seconds.`);
}

async function generatePage(urlPath, lang, translations, serverRender, baseHtml, distDir) {
  try {
    global.window.location = { pathname: urlPath, search: '', hash: '' };
    global.location = global.window.location;
    
    // Call SSR Render
    const { appHtml, headPayload } = await serverRender(urlPath, lang, translations);
    
    let newHtml = baseHtml.replace('<!--ssr-outlet-->', appHtml);
    
    // Clean any pre-existing title tag from baseHtml to prevent double title tags
    newHtml = newHtml.replace(/<title>[\s\S]*?<\/title>/gi, '');

    // Inject @unhead/ssr tags
    if (headPayload && headPayload.headTags) {
      newHtml = newHtml.replace('</head>', `\n${headPayload.headTags}\n</head>`);
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

run();
