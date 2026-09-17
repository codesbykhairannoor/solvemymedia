/**
 * ping-search-engines.cjs
 * Submits the latest sitemap to IndexNow (Bing, Yandex, Seznam, Naver) and Google Sitemap Ping
 */

const https = require('https');
const http = require('http');

const DOMAIN = 'https://solvemymedia.com';
const SITEMAP_URL = `${DOMAIN}/sitemap.xml`;

// IndexNow key and location (SolveMyMedia)
const INDEXNOW_KEY = '5e66496solvemymedia2026';
const INDEXNOW_KEY_LOCATION = `${DOMAIN}/${INDEXNOW_KEY}.txt`;

async function pingUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

async function pingIndexNow() {
  const indexNowEndpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow'
  ];

  const payload = JSON.stringify({
    host: 'solvemymedia.com',
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: [
      DOMAIN,
      `${DOMAIN}/compress-video`,
      `${DOMAIN}/compress-audio`,
      `${DOMAIN}/convert-video`,
      `${DOMAIN}/video-to-audio`,
      `${DOMAIN}/transcribe`,
      `${DOMAIN}/id/kompres-video`,
      `${DOMAIN}/es/comprimir-video`,
      `${DOMAIN}/fr/compresser-la-video`,
      `${DOMAIN}/de/video-komprimieren`,
      `${DOMAIN}/ja/bideowoya-suo-suru`,
      `${DOMAIN}/zh/ya-suo-shi-pin`
    ]
  });

  for (const endpoint of indexNowEndpoints) {
    try {
      const urlObj = new URL(endpoint);
      const req = https.request({
        hostname: urlObj.hostname,
        path: urlObj.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (res) => {
        console.log(`[IndexNow] ${urlObj.hostname}: HTTP ${res.statusCode}`);
      });
      req.on('error', (e) => {
        console.warn(`[IndexNow] ${urlObj.hostname} error:`, e.message);
      });
      req.write(payload);
      req.end();
    } catch (e) {
      console.warn(`[IndexNow] Exception on ${endpoint}:`, e.message);
    }
  }
}

async function run() {
  console.log('📡 Pinging Search Engines & IndexNow with latest sitemap...');
  
  // Google & Bing Sitemap ping endpoints
  const sitemapEndpoints = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  ];

  for (const ep of sitemapEndpoints) {
    const res = await pingUrl(ep);
    console.log(`[Sitemap Ping] ${res.url}: ${res.status || res.error}`);
  }

  await pingIndexNow();
  console.log('✅ Search engine ping routines dispatched.');
}

run();
