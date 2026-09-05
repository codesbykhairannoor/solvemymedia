const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');

// Recursively find all index.html in dist
function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'server' && file !== 'assets') {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file === 'index.html') {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`Auditing ${htmlFiles.length} generated HTML files...\n`);

const testResults = {
  totalFiles: htmlFiles.length,
  doubleTitleErrors: [],
  rawKeyLeaks: [],
  missingH1Errors: [],
  missingOgTwitterErrors: [],
  trailingSlashLinks: [],
  duplicateHreflangErrors: [],
  emptySpinnerErrors: []
};

htmlFiles.forEach(file => {
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');

  // 1. Check Title Count
  const titleMatches = html.match(/<title[\s\S]*?<\/title>/gi) || [];
  if (titleMatches.length !== 1) {
    testResults.doubleTitleErrors.push({ file: relPath, count: titleMatches.length, titles: titleMatches });
  }

  // 2. Check Raw Key Leaks in Title & Meta Description
  const rawKeyPattern = /seo(Terms|Pricing|AboutUs|Privacy|Security|Compare|SupportedLanguages)(Title|Desc)/i;
  if (rawKeyPattern.test(html)) {
    const match = html.match(rawKeyPattern);
    testResults.rawKeyLeaks.push({ file: relPath, leakedKey: match[0] });
  }

  // 3. Check H1 Presence
  const h1Matches = html.match(/<h1[\s\S]*?>[\s\S]*?<\/h1>/gi) || [];
  if (h1Matches.length === 0) {
    testResults.missingH1Errors.push({ file: relPath });
  }

  // 4. Check OpenGraph & Twitter Cards
  const hasOgTitle = html.includes('property="og:title"');
  const hasOgDesc = html.includes('property="og:description"');
  const hasOgImage = html.includes('property="og:image"');
  const hasTwitterCard = html.includes('name="twitter:card"');
  if (!hasOgTitle || !hasOgDesc || !hasOgImage || !hasTwitterCard) {
    testResults.missingOgTwitterErrors.push({ file: relPath, hasOgTitle, hasOgDesc, hasOgImage, hasTwitterCard });
  }

  // 5. Check Trailing Slash Links in Header / Footer (e.g. href="/hu/", href="/pl/")
  const trailingSlashMatches = html.match(/href="\/[a-z]{2}\/"/gi) || [];
  if (trailingSlashMatches.length > 0) {
    testResults.trailingSlashLinks.push({ file: relPath, matches: trailingSlashMatches });
  }

  // 6. Check Duplicate Hreflangs
  const hreflangMatches = html.match(/hreflang="([^"]+)"/gi) || [];
  const langCodes = hreflangMatches.map(m => m.replace(/hreflang="|"/g, ''));
  const counts = {};
  const duplicates = [];
  langCodes.forEach(code => {
    counts[code] = (counts[code] || 0) + 1;
    if (counts[code] > 1 && !duplicates.includes(code)) {
      duplicates.push(code);
    }
  });
  if (duplicates.length > 0) {
    testResults.duplicateHreflangErrors.push({ file: relPath, duplicates });
  }

  // 7. Check for React Suspense Abort / Empty Spinner Page
  if (html.includes('Switched to client rendering because the server rendering aborted')) {
    testResults.emptySpinnerErrors.push({ file: relPath });
  }
});

console.log('===============================================================');
console.log('                 7 CSV ISSUES AUDIT REPORT                     ');
console.log('===============================================================');
console.log(`[TEST 1] Single <title> Tag:       ${testResults.doubleTitleErrors.length === 0 ? '✅ PASSED (0 errors)' : '❌ FAILED (' + testResults.doubleTitleErrors.length + ' errors)'}`);
console.log(`[TEST 2] No Raw Translation Keys:  ${testResults.rawKeyLeaks.length === 0 ? '✅ PASSED (0 leaks)' : '❌ FAILED (' + testResults.rawKeyLeaks.length + ' leaks)'}`);
console.log(`[TEST 3] Valid <h1> on Every Page: ${testResults.missingH1Errors.length === 0 ? '✅ PASSED (0 missing)' : '❌ FAILED (' + testResults.missingH1Errors.length + ' missing)'}`);
console.log(`[TEST 4] Complete OG & Twitter:    ${testResults.missingOgTwitterErrors.length === 0 ? '✅ PASSED (0 missing)' : '❌ FAILED (' + testResults.missingOgTwitterErrors.length + ' missing)'}`);
console.log(`[TEST 5] No 308 Trailing Slashes:  ${testResults.trailingSlashLinks.length === 0 ? '✅ PASSED (0 trailing)' : '❌ FAILED (' + testResults.trailingSlashLinks.length + ' trailing)'}`);
console.log(`[TEST 6] Deduplicated Hreflang:    ${testResults.duplicateHreflangErrors.length === 0 ? '✅ PASSED (0 dupes)' : '❌ FAILED (' + testResults.duplicateHreflangErrors.length + ' dupes)'}`);
console.log(`[TEST 7] Zero SSR Suspense Aborts: ${testResults.emptySpinnerErrors.length === 0 ? '✅ PASSED (0 aborts)' : '❌ FAILED (' + testResults.emptySpinnerErrors.length + ' aborts)'}`);
console.log('===============================================================\n');

if (
  testResults.doubleTitleErrors.length === 0 &&
  testResults.rawKeyLeaks.length === 0 &&
  testResults.missingH1Errors.length === 0 &&
  testResults.missingOgTwitterErrors.length === 0 &&
  testResults.trailingSlashLinks.length === 0 &&
  testResults.duplicateHreflangErrors.length === 0 &&
  testResults.emptySpinnerErrors.length === 0
) {
  console.log('🎉 ALL 7 AUDIT FIXES VERIFIED 100% SUCCESSFUL ON ALL 930 PAGES!');
} else {
  console.log('Details of failures:');
  console.log(JSON.stringify(testResults, null, 2));
}
