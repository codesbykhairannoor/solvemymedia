const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const sitemapPath = path.join(distDir, 'sitemap.xml');

console.log('====================================================');
console.log('🚀 RUNNING COMPREHENSIVE BATCH 2 SEO VERIFICATION TEST');
console.log('====================================================\n');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`✅ PASS: ${message}`);
  } else {
    failedChecks++;
    console.error(`❌ FAIL: ${message}`);
  }
}

// 1. SITEMAP 404 CHECK (Issue 8)
console.log('--- TEST 1 & 2: SITEMAP 404 & INDEXABLE PARITY (Issues 8 & 9) ---');
if (!fs.existsSync(sitemapPath)) {
  console.error('sitemap.xml not found in dist!');
  process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const locMatches = [...sitemapContent.matchAll(/<loc>https:\/\/solvemymedia\.com([^<]*)<\/loc>/g)].map(m => m[1]);
console.log(`Found ${locMatches.length} URLs in sitemap.xml.`);

let sitemap404s = [];
for (const rawUrl of locMatches) {
  const cleanUrl = rawUrl.replace(/^\//, '');
  const targetHtmlPath = cleanUrl === '' 
    ? path.join(distDir, 'index.html') 
    : path.join(distDir, cleanUrl, 'index.html');
  
  if (!fs.existsSync(targetHtmlPath)) {
    sitemap404s.push(rawUrl);
  }
}

assert(sitemap404s.length === 0, `0 broken/404 URLs in sitemap (Found: ${sitemap404s.length} errors: ${sitemap404s.slice(0, 5).join(', ')})`);

// 2. ALL INDEXABLE HTML IN SITEMAP CHECK (Issue 9)
function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'server' || file === 'assets' || file === 'node_modules') continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file === 'index.html') {
      const relPath = path.relative(distDir, fullPath).replace(/\\/g, '/');
      fileList.push(relPath);
    }
  }
  return fileList;
}

const allHtmlFiles = getAllHtmlFiles(distDir);
console.log(`Found ${allHtmlFiles.length} static index.html pages in dist.`);

let unindexedPages = [];
for (const relHtml of allHtmlFiles) {
  const route = relHtml === 'index.html' ? '' : '/' + relHtml.replace(/\/index\.html$/, '');
  const expectedUrl1 = `https://solvemymedia.com${route}`;
  const expectedUrl2 = `https://solvemymedia.com${route}/`;
  if (!sitemapContent.includes(expectedUrl1) && !sitemapContent.includes(expectedUrl2)) {
    unindexedPages.push(route);
  }
}

assert(unindexedPages.length === 0, `All generated SSG pages are in sitemap (Unindexed: ${unindexedPages.length})`);

// 3. TITLE LENGTH CHECK (Issue 10)
console.log('\n--- TEST 3: TITLE TAG LENGTH (Issue 10 - Max 65 Chars) ---');
let titlesOver65 = [];
let titlesUnder10 = [];
let doubleTitles = [];

for (const relHtml of allHtmlFiles) {
  const filePath = path.join(distDir, relHtml);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const titleMatches = [...content.matchAll(/<title>([^<]*)<\/title>/gi)];
  if (titleMatches.length > 1) {
    doubleTitles.push({ relHtml, count: titleMatches.length });
  }
  
  if (titleMatches.length > 0) {
    const titleText = titleMatches[0][1].trim();
    if (titleText.length > 65) {
      titlesOver65.push({ relHtml, len: titleText.length, title: titleText });
    }
    if (titleText.length < 10) {
      titlesUnder10.push({ relHtml, len: titleText.length, title: titleText });
    }
  }
}

assert(doubleTitles.length === 0, `0 pages with double <title> tags (Found: ${doubleTitles.length})`);
assert(titlesOver65.length === 0, `0 pages with title > 65 chars (Found ${titlesOver65.length} over limit: ${titlesOver65.slice(0, 3).map(t => `${t.relHtml} (${t.len}c: "${t.title}")`).join('; ')})`);
assert(titlesUnder10.length === 0, `0 pages with title < 10 chars (Found ${titlesUnder10.length})`);

// 4. META DESCRIPTION LENGTH CHECK (Issue 11)
console.log('\n--- TEST 4: META DESCRIPTION LENGTH (Issue 11 - Max 155 Chars) ---');
let descriptionsOver155 = [];
let descriptionsUnder20 = [];

for (const relHtml of allHtmlFiles) {
  const filePath = path.join(distDir, relHtml);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const metaDescMatch = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i) 
    || content.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
    
  if (metaDescMatch) {
    const desc = metaDescMatch[1].trim();
    if (desc.length > 155) {
      descriptionsOver155.push({ relHtml, len: desc.length, desc });
    }
    if (desc.length < 20) {
      descriptionsUnder20.push({ relHtml, len: desc.length, desc });
    }
  }
}

assert(descriptionsOver155.length === 0, `0 pages with meta description > 155 chars (Found: ${descriptionsOver155.length} over limit: ${descriptionsOver155.slice(0, 3).map(d => `${d.relHtml} (${d.len}c: "${d.desc}")`).join('; ')})`);
assert(descriptionsUnder20.length === 0, `0 pages with meta description < 20 chars (Found: ${descriptionsUnder20.length})`);

// 5. REDIRECT CHAINS & VERCEL CONFIG (Issue 13)
console.log('\n--- TEST 5: VERCEL REDIRECT CHAINS (Issue 13) ---');
const vercelConfigPath = path.join(__dirname, '../vercel.json');
let vercelValid = false;
if (fs.existsSync(vercelConfigPath)) {
  const vercelJson = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
  const hasWwwRedirect = vercelJson.redirects && vercelJson.redirects.some(r => 
    r.has && r.has.some(h => h.value === 'www.solvemymedia.com') && r.destination === 'https://solvemymedia.com/:path*' && r.permanent === true
  );
  const cleanUrls = vercelJson.cleanUrls === true;
  const trailingSlash = vercelJson.trailingSlash === false;
  vercelValid = hasWwwRedirect && cleanUrls && trailingSlash;
}
assert(vercelValid, 'vercel.json has non-chaining direct 301 www -> non-www redirect, cleanUrls: true, trailingSlash: false');

// 6. CANONICAL & HREFLANG INTEGRITY (Issue 14)
console.log('\n--- TEST 6: CANONICAL & HREFLANG RECIPROCITY (Issue 14) ---');
let canonicalErrors = [];
let samplePages = ['index.html', 'es/comprimir-video/index.html', 'de/video-komprimieren/index.html', 'ja/index.html'];

for (const sample of samplePages) {
  const samplePath = path.join(distDir, sample);
  if (fs.existsSync(samplePath)) {
    const html = fs.readFileSync(samplePath, 'utf8');
    const hasCanonical = html.includes('<link rel="canonical"') || html.includes('<link href="https://solvemymedia.com');
    const hasHreflangEn = html.includes('hreflang="en"');
    const hasXDefault = html.includes('hreflang="x-default"');
    if (!hasCanonical || !hasHreflangEn || !hasXDefault) {
      canonicalErrors.push(sample);
    }
  }
}
assert(canonicalErrors.length === 0, `Canonical and hreflang reciprocals present on sample pages (Errors: ${canonicalErrors.length})`);

console.log('\n====================================================');
console.log(`TOTAL CHECKS: ${totalChecks} | PASSED: ${passedChecks} | FAILED: ${failedChecks}`);
console.log('====================================================');

if (failedChecks > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL BATCH 2 SEO TESTS PASSED 100% PERFECTLY!');
}
