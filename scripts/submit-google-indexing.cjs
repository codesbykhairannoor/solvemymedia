/**
 * submit-google-indexing.cjs
 * Submits website URLs directly to Google Indexing API (bypassing slow sitemap queue).
 * Uses 100% native Node.js built-in modules (crypto, https, fs, path) - Zero external dependencies!
 *
 * Daily Quota: 200 URLs per day per Google Cloud project.
 *
 * Setup:
 * 1. Go to Google Cloud Console (https://console.cloud.google.com/)
 * 2. Create a project and enable "Web Search Indexing API"
 * 3. Create a Service Account -> Create JSON Key -> Save as "service_account.json" in project root
 * 4. In Google Search Console -> Settings -> Users & Permissions -> Add Service Account email as "Owner"
 * 5. Run: node scripts/submit-google-indexing.cjs
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

function findKeyFile() {
  const candidates = [
    path.join(__dirname, 'solvemymedia-3e58209ad035.json'),
    path.join(__dirname, '../solvemymedia-3e58209ad035.json'),
    path.join(__dirname, '../service_account.json'),
    path.join(__dirname, 'service_account.json'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return path.join(__dirname, '../service_account.json');
}

const KEY_FILE = findKeyFile();
const SITEMAP_FILE = path.join(__dirname, '../public/sitemap.xml');
const STATE_FILE = path.join(__dirname, '../scratch/google-indexing-state.json');

const BATCH_SIZE = 200; // Google Indexing API daily quota per project

function base64url(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function postRequest(urlStr, headers, bodyData) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: 'POST',
      headers: headers,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (_) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (bodyData) {
      req.write(bodyData);
    }
    req.end();
  });
}

async function getAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const claimSet = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedClaim = base64url(JSON.stringify(claimSet));
  const signatureInput = `${encodedHeader}.${encodedClaim}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signatureInput);
  const signature = signer.sign(serviceAccount.private_key, 'base64url');

  const jwt = `${signatureInput}.${signature}`;

  const postData = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;
  const response = await postRequest(
    'https://oauth2.googleapis.com/token',
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
    },
    postData
  );

  if (response.status !== 200 || !response.data?.access_token) {
    throw new Error(`Failed to get OAuth token: ${JSON.stringify(response.data || response.raw)}`);
  }

  return response.data.access_token;
}

async function publishUrl(accessToken, urlToPublish) {
  const body = JSON.stringify({
    url: urlToPublish,
    type: 'URL_UPDATED',
  });

  return postRequest(
    'https://indexing.googleapis.com/v3/urlNotifications:publish',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Content-Length': Buffer.byteLength(body),
    },
    body
  );
}

function parseSitemapUrls() {
  if (!fs.existsSync(SITEMAP_FILE)) {
    throw new Error(`Sitemap not found at: ${SITEMAP_FILE}`);
  }
  const xml = fs.readFileSync(SITEMAP_FILE, 'utf8');
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((m) => m[1].trim());
}

function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    }
  } catch (_) {}
  return { submittedUrls: [], lastRunDate: null };
}

function saveState(state) {
  const dir = path.dirname(STATE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

async function main() {
  console.log('====================================================');
  console.log('  GOOGLE INDEXING API AUTOMATED BATCH SUBMITTER    ');
  console.log('====================================================\n');

  if (!fs.existsSync(KEY_FILE)) {
    console.log('⚠️  FILE service_account.json BELUM DITEMUKAN!\n');
    console.log('Langkah Cepat Setup Google Indexing API:');
    console.log('1. Buka: https://console.cloud.google.com/');
    console.log('2. Buat Project baru (misal: "SolveMyMedia Indexer")');
    console.log('3. Buka API & Services -> Library -> Cari "Web Search Indexing API" -> Klik ENABLE');
    console.log('4. Buka IAM & Admin -> Service Accounts -> Create Service Account');
    console.log('5. Klik Service Account yang dibuat -> tab KEYS -> Add Key -> Create new key -> JSON');
    console.log(`6. Simpan file JSON tersebut dengan nama:\n   -> "${KEY_FILE}"`);
    console.log('7. Buka Google Search Console (https://search.google.com/search-console)');
    console.log('8. Masuk ke Settings -> Users and permissions -> Add User:');
    console.log('   -> Masukkan email Service Account tersebut dan set Permission sebagai "Owner"');
    console.log('9. Jalankan kembali script ini:\n   -> node scripts/submit-google-indexing.cjs\n');
    process.exit(0);
  }

  const serviceAccount = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
  console.log(`🔑 Service Account: ${serviceAccount.client_email}`);

  console.log('📡 Generating OAuth2 Bearer Token...');
  const token = await getAccessToken(serviceAccount);
  console.log('✅ OAuth2 Bearer Token berhasil diperoleh!\n');

  const allUrls = parseSitemapUrls();
  console.log(`📋 Total URL di sitemap: ${allUrls.length}`);

  const state = loadState();
  const submittedSet = new Set(state.submittedUrls || []);

  const pendingUrls = allUrls.filter((u) => !submittedSet.has(u));
  console.log(`⏳ URL yang belum disubmit: ${pendingUrls.length}`);

  if (pendingUrls.length === 0) {
    console.log('🎉 Semua URL dari sitemap sudah disubmit ke Google Indexing API!');
    return;
  }

  const batch = pendingUrls.slice(0, BATCH_SIZE);
  console.log(`🚀 Mengirim batch hari ini (${batch.length} URL)...\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < batch.length; i++) {
    const targetUrl = batch[i];
    try {
      const res = await publishUrl(token, targetUrl);
      if (res.status === 200) {
        successCount++;
        submittedSet.add(targetUrl);
        process.stdout.write(` [${i + 1}/${batch.length}] ✅ ${targetUrl}\n`);
      } else {
        failCount++;
        process.stdout.write(` [${i + 1}/${batch.length}] ❌ (${res.status}) ${targetUrl}: ${JSON.stringify(res.data || res.raw)}\n`);
      }
    } catch (err) {
      failCount++;
      process.stdout.write(` [${i + 1}/${batch.length}] ❌ Error ${targetUrl}: ${err.message}\n`);
    }

    // Small delay to prevent API rate limits (10 req/sec limit)
    await new Promise((r) => setTimeout(r, 120));
  }

  state.submittedUrls = Array.from(submittedSet);
  state.lastRunDate = new Date().toISOString();
  saveState(state);

  console.log('\n====================================================');
  console.log(`📊 Hasil Batch: Berhasil = ${successCount}, Gagal = ${failCount}`);
  console.log(`📈 Total URL terkirim sejauh ini: ${state.submittedUrls.length} / ${allUrls.length}`);
  console.log(`Sisa URL yang belum disubmit: ${allUrls.length - state.submittedUrls.length}`);
  console.log('====================================================');
}

main().catch((err) => {
  console.error('\n❌ Fatal Error:', err.message);
  process.exit(1);
});
