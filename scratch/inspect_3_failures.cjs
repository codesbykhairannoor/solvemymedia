const fs = require('fs');
const path = require('path');
const distDir = path.join(__dirname, '../dist');

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

const allFiles = getAllHtmlFiles(distDir);
const validRoutes = new Set(allFiles.map(f => f === 'index.html' ? '/' : '/' + f.replace(/\/index\.html$/, '')));

console.log('--- HREFLANG 404 / REDIRECT ERRORS (WITH DECODE) ---');
let hreflangErrors = [];
allFiles.forEach(f => {
  const html = fs.readFileSync(path.join(distDir, f), 'utf8');
  const hreflangTags = [...html.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang="([^"]*)"[^>]*href="([^"]*)"/gi)];
  hreflangTags.forEach(t => {
    const urlObj = new URL(t[2]);
    let p = decodeURIComponent(urlObj.pathname);
    if (p.length > 1 && p.endsWith('/')) {
      hreflangErrors.push(`${f} -> ${t[2]} (trailing slash)`);
    } else if (!validRoutes.has(p)) {
      hreflangErrors.push(`${f} -> ${t[2]} (404 route: ${p})`);
    }
  });
});

console.log(`Total hreflang errors (decoded): ${hreflangErrors.length}`);
if (hreflangErrors.length > 0) {
  console.log('Sample errors:', hreflangErrors.slice(0, 10));
}
