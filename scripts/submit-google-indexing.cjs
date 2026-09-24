/**
 * submit-google-indexing.cjs
 * Submits website URLs directly to Google Indexing API (bypassing slow crawler queues).
 * Uses 100% native Node.js built-in modules (crypto, https, fs, path) - Zero external dependencies!
 *
 * Daily Quota: 200 URLs per day per Google Cloud project.
 *
 * Authentication:
 * 1. Environment Variable: GOOGLE_SERVICE_ACCOUNT_KEY (JSON string or base64) - Ideal for GitHub Actions CI/CD.
 * 2. Local File: scripts/solvemymedia-*.json or service_account.json - Ideal for local execution.
 *
 * CLI Flags:
 * --dry-run      Simulates submission without sending requests to Google (shows URL list & stats)
 * --limit=N      Custom batch size (default: 200)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

// Parse CLI flags
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find((a) => a.startsWith('--limit='));
const BATCH_SIZE = limitArg ? parseInt(limitArg.split('=')[1], 10) : 200;

const STATE_FILE = path.join(__dirname, 'google-indexing-state.json');

function getServiceAccount() {
  // 1. Check environment variable (for GitHub Actions or cloud environments)
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    try {
      const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY.trim();
      if (raw.startsWith('{')) {
        return JSON.parse(raw);
      }
      // Attempt base64 decode if not plain JSON
      const decoded = Buffer.from(raw, 'base64').toString('utf8');
      return JSON.parse(decoded);
    } catch (err) {
      throw new Error(`Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY env var: ${err.message}`);
    }
  }

  // 2. Check local key file candidates
  const candidates = [
    path.join(__dirname, 'solvemymedia-3e58209ad035.json'),
    path.join(__dirname, '../solvemymedia-3e58209ad035.json'),
    path.join(__dirname, 'service_account.json'),
    path.join(__dirname, '../service_account.json'),
  ];

  // Also check wildcard in scripts/
  try {
    const scriptsDir = __dirname;
    const files = fs.readdirSync(scriptsDir);
    for (const f of files) {
      if (f.startsWith('solvemymedia-') && f.endsWith('.json')) {
        candidates.unshift(path.join(scriptsDir, f));
      }
    }
  } catch (_) {}

  for (const c of candidates) {
    if (fs.existsSync(c)) {
      try {
        return JSON.parse(fs.readFileSync(c, 'utf8'));
      } catch (e) {
        console.warn(`Could not parse JSON file at ${c}: ${e.message}`);
      }
    }
  }

  return null;
}

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
  const publicDir = path.join(__dirname, '../public');
  const sitemapAll = path.join(publicDir, 'sitemap-all.xml');
  const sitemapMaster = path.join(publicDir, 'sitemap.xml');

  const collectedUrls = new Set();

  if (fs.existsSync(sitemapAll)) {
    const xml = fs.readFileSync(sitemapAll, 'utf8');
    const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
    for (const m of matches) {
      const u = m[1].trim();
      if (!u.endsWith('.xml')) {
        collectedUrls.add(u);
      }
    }
  } else {
    // Read all sitemap-*.xml files in public/
    const files = fs.readdirSync(publicDir).filter((f) => f.startsWith('sitemap') && f.endsWith('.xml'));
    for (const f of files) {
      const fullPath = path.join(publicDir, f);
      const xml = fs.readFileSync(fullPath, 'utf8');
      const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
      for (const m of matches) {
        const u = m[1].trim();
        if (!u.endsWith('.xml')) {
          collectedUrls.add(u);
        }
      }
    }
  }

  // Priority sorting:
  // 1. Language Homepages (https://solvemymedia.com, /id, /es, etc.)
  // 2. High-Intent Core Tools (compress-video, compress-image, trim-video, etc.)
  // 3. Informational Pages (about-us, privacy-policy, etc.)
  return Array.from(collectedUrls).sort((a, b) => {
    const pathA = a.replace(/https?:\/\/[^\/]+/, '').replace(/^\//, '');
    const pathB = b.replace(/https?:\/\/[^\/]+/, '').replace(/^\//, '');

    const segmentsA = pathA.split('/').filter(Boolean);
    const segmentsB = pathB.split('/').filter(Boolean);

    // Root home (https://solvemymedia.com)
    if (segmentsA.length === 0 && segmentsB.length > 0) return -1;
    if (segmentsB.length === 0 && segmentsA.length > 0) return 1;

    // Language roots (e.g. /id, /es, /de)
    if (segmentsA.length === 1 && segmentsB.length > 1) return -1;
    if (segmentsB.length === 1 && segmentsA.length > 1) return 1;

    return a.localeCompare(b);
  });
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
  console.log('  SOLVEMYMEDIA — GOOGLE INDEXING AUTOMATION ENGINE  ');
  console.log('====================================================\n');

  if (isDryRun) {
    console.log('ℹ️  MODE: DRY-RUN (No real requests will be dispatched to Google)\n');
  }

  const serviceAccount = getServiceAccount();
  if (!serviceAccount && !isDryRun) {
    console.error('❌ Service Account Credentials not found!');
    console.error('Please either:');
    console.error('  1. Set the GOOGLE_SERVICE_ACCOUNT_KEY environment variable (in GitHub Actions Secrets)');
    console.error('  2. Place solvemymedia-*.json in the scripts/ directory for local execution.\n');
    process.exit(1);
  }

  if (serviceAccount) {
    console.log(`🔑 Service Account: ${serviceAccount.client_email}`);
  }

  const allUrls = parseSitemapUrls();
  console.log(`📋 Total Page URLs identified across sitemaps: ${allUrls.length}`);

  const state = loadState();
  const submittedSet = new Set(state.submittedUrls || []);
  console.log(`📦 Previously submitted URLs in state file: ${submittedSet.size}`);

  const pendingUrls = allUrls.filter((u) => !submittedSet.has(u));
  console.log(`⏳ Remaining pending URLs to index: ${pendingUrls.length}`);

  if (pendingUrls.length === 0) {
    console.log('\n🎉 ALL SITEMAP URLS ARE 100% SUBMITTED TO GOOGLE INDEXING API!');
    console.log('No remaining pages need submission today.');
    return;
  }

  const batch = pendingUrls.slice(0, BATCH_SIZE);
  console.log(`🚀 Preparing daily batch of ${batch.length} URLs (Limit: ${BATCH_SIZE})...\n`);

  if (isDryRun) {
    console.log('--- Dry Run URL Sample (First 10) ---');
    batch.slice(0, 10).forEach((u, i) => console.log(`  [${i + 1}] ${u}`));
    console.log(`  ... and ${Math.max(0, batch.length - 10)} more URLs.`);
    console.log('\n✅ Dry run completed successfully.');
    return;
  }

  console.log('📡 Generating OAuth2 Bearer Token...');
  const token = await getAccessToken(serviceAccount);
  console.log('✅ OAuth2 Bearer Token acquired successfully!\n');

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
        process.stdout.write(
          ` [${i + 1}/${batch.length}] ❌ (${res.status}) ${targetUrl}: ${JSON.stringify(res.data || res.raw)}\n`
        );
      }
    } catch (err) {
      failCount++;
      process.stdout.write(` [${i + 1}/${batch.length}] ❌ Error ${targetUrl}: ${err.message}\n`);
    }

    // Rate limiting delay (120ms between requests to stay well within 10 req/sec quota)
    await new Promise((r) => setTimeout(r, 120));
  }

  state.submittedUrls = Array.from(submittedSet);
  state.lastRunDate = new Date().toISOString();
  saveState(state);

  console.log('\n====================================================');
  console.log(`📊 Batch Results: Success = ${successCount}, Failed = ${failCount}`);
  console.log(`📈 Overall Progress: ${state.submittedUrls.length} / ${allUrls.length} URLs submitted (${((state.submittedUrls.length / allUrls.length) * 100).toFixed(1)}%)`);
  console.log(`⏳ Remaining URLs: ${allUrls.length - state.submittedUrls.length}`);
  console.log(`📁 State updated in: ${STATE_FILE}`);
  console.log('====================================================');
}

main().catch((err) => {
  console.error('\n❌ Fatal Error:', err.message);
  process.exit(1);
});
