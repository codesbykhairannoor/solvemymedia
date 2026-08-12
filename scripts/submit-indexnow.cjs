const fs = require('fs');
const path = require('path');
const https = require('https');

const HOST = 'solvemymedia.com';
const KEY = '8ec34957474f43cca685b8c711c72539';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Read sitemap
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('sitemap.xml not found at', sitemapPath);
  process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

// Simple regex to extract URLs from <loc>
const locRegex = /<loc>(.*?)<\/loc>/g;
const urlList = [];
let match;
while ((match = locRegex.exec(sitemapContent)) !== null) {
  urlList.push(match[1]);
}

if (urlList.length === 0) {
  console.log('No URLs found in sitemap.');
  process.exit(0);
}

console.log(`Found ${urlList.length} URLs to submit to IndexNow.`);

function submitUrls(urls) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    });

    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => { responseBody += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: responseBody
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// IndexNow allows max 10,000 URLs per request.
const CHUNK_SIZE = 10000;
(async () => {
  for (let i = 0; i < urlList.length; i += CHUNK_SIZE) {
    const chunk = urlList.slice(i, i + CHUNK_SIZE);
    try {
      console.log(`Submitting chunk of ${chunk.length} URLs...`);
      const response = await submitUrls(chunk);
      if (response.statusCode === 200 || response.statusCode === 202) {
        console.log(`Success! API responded with status ${response.statusCode}.`);
      } else {
        console.error(`IndexNow API error: ${response.statusCode}`);
        console.error(response.body);
      }
    } catch (err) {
      console.error('Failed to submit to IndexNow API:', err);
    }
  }
  console.log('IndexNow submission complete.');
})();
