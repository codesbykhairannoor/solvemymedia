/**
 * ping-search-engines.cjs
 * Submits the latest sitemap to IndexNow gateways with strict timeout.
 * Note: Google & Bing deprecated /ping endpoints (return 404/410),
 * so modern indexing uses IndexNow and Google Indexing API.
 */

const https = require('https');

const DOMAIN = 'https://solvemymedia.com';
const INDEXNOW_KEY = '8ec34957474f43cca685b8c711c72539';
const INDEXNOW_KEY_LOCATION = `${DOMAIN}/${INDEXNOW_KEY}.txt`;

async function pingIndexNowEndpoint(endpoint, payload) {
  return new Promise((resolve) => {
    try {
      const urlObj = new URL(endpoint);
      const req = https.request({
        hostname: urlObj.hostname,
        path: urlObj.pathname,
        method: 'POST',
        timeout: 8000, // 8 second strict timeout
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          console.log(`[IndexNow] ${urlObj.hostname}: HTTP ${res.statusCode}`);
          resolve({ endpoint, status: res.statusCode });
        });
      });

      req.on('timeout', () => {
        req.destroy();
        console.warn(`[IndexNow] ${urlObj.hostname} timed out after 8s`);
        resolve({ endpoint, error: 'timeout' });
      });

      req.on('error', (e) => {
        console.warn(`[IndexNow] ${urlObj.hostname} error:`, e.message);
        resolve({ endpoint, error: e.message });
      });

      req.write(payload);
      req.end();
    } catch (e) {
      console.warn(`[IndexNow] Exception on ${endpoint}:`, e.message);
      resolve({ endpoint, error: e.message });
    }
  });
}

async function run() {
  console.log('📡 Pinging IndexNow gateways with core URLs...');

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

  const indexNowEndpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow'
  ];

  for (const endpoint of indexNowEndpoints) {
    await pingIndexNowEndpoint(endpoint, payload);
  }

  console.log('✅ IndexNow ping routines completed.');
}

run();
