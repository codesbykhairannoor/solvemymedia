const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const http = require('http');

const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = 4173;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((request, response) => {
      let filePath = path.join(DIST_DIR, request.url === '/' ? 'index.html' : request.url);
      
      // If path doesn't have an extension and is not a file, serve index.html (SPA fallback)
      if (!path.extname(filePath)) {
        filePath = path.join(DIST_DIR, 'index.html');
      }

      fs.readFile(filePath, (error, content) => {
        if (error) {
          if (error.code === 'ENOENT') {
            fs.readFile(path.join(DIST_DIR, 'index.html'), (err, fallbackContent) => {
              if (err) {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + err.code + ' ..\n');
              } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(fallbackContent, 'utf-8');
              }
            });
          } else {
            response.writeHead(500);
            response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
          }
        } else {
          const extname = String(path.extname(filePath)).toLowerCase();
          const contentType = mimeTypes[extname] || 'application/octet-stream';
          
          response.writeHead(200, { 
            'Content-Type': contentType,
            'Cross-Origin-Opener-Policy': 'same-origin',
            'Cross-Origin-Embedder-Policy': 'credentialless'
          });
          response.end(content, 'utf-8');
        }
      });
    });

    server.listen(PORT, () => {
      resolve(server);
    });
  });
}

function extractUrlsFromSitemap() {
  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.warn('sitemap.xml not found in dist. Pre-rendering only the index page.');
    return ['/'];
  }
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(sitemapContent)) !== null) {
    const url = new URL(match[1]);
    urls.push(url.pathname);
  }
  
  // Filter URLs: Only prerender the core English tools and the home page to save build time.
  // Googlebot will render the rest (foreign languages and pSEO long-tail keywords) via Client-Side Rendering (CSR).
  const coreTools = [
    '/', '/compress-video', '/compress-audio', '/convert-video', 
    '/convert-audio', '/video-to-audio', '/transcribe', '/recorder', 
    '/create-gif', '/video-speed', '/crop-video', '/mute-video', 
    '/watermark-video', '/merge-audio'
  ];
  
  const filteredUrls = urls.filter(url => coreTools.includes(url));
  
  // Dedup and sort
  return [...new Set(filteredUrls)].sort((a, b) => a.length - b.length);
}

async function run() {
  console.log('Starting local static server for prerendering...');
  const server = await startServer();
  console.log(`Server listening on http://localhost:${PORT}`);

  let browser;
  if (process.env.VERCEL) {
    const chromium = require('@sparticuz/chromium');
    browser = await puppeteer.launch({
      args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  } else {
    browser = await puppeteer.launch({ 
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }
  
  const urls = extractUrlsFromSitemap();
  console.log(`Found ${urls.length} URLs to prerender.`);

  // Limit concurrency to avoid crashing puppeteer
  const CONCURRENCY = 10;
  
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(async (urlPath) => {
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const url = req.url();
        if (url.includes('google-analytics') || url.includes('googletagmanager')) {
          req.abort();
        } else {
          req.continue();
        }
      });

      try {
        const fullUrl = `http://localhost:${PORT}${urlPath}`;
        await page.goto(fullUrl, { waitUntil: 'networkidle0', timeout: 30000 });
        
        // Wait for React to render
        await page.waitForSelector('#root > *', { timeout: 10000 }).catch(() => {});
        
        let html = await page.content();
        
        // Remove scripts if you want pure static, but we want hydration, so keep scripts
        
        const targetPath = path.join(DIST_DIR, urlPath, 'index.html');
        // Because for root path, it would write to dist/index.html (overwriting the CSR template)
        // This is exactly what we want.
        
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        fs.writeFileSync(targetPath, html);
        
        console.log(`Prerendered: ${urlPath}`);
      } catch (err) {
        console.error(`Failed to prerender ${urlPath}:`, err.message);
      } finally {
        await page.close();
      }
    }));
  }

  await browser.close();
  server.close();
  console.log('Prerendering completed.');
}

run().catch(err => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
