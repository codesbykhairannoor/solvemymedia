const fs = require('fs');
const path = require('path');

// Simple robust CSV parser for RFC 4180
function parseCSV(text) {
  const p = [];
  let row = [''];
  let inQuotes = false;
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (c === '"' && next === '"') {
        row[row.length - 1] += '"';
        i += 2;
        continue;
      }
      if (c === '"') {
        inQuotes = false;
        i++;
        continue;
      }
      row[row.length - 1] += c;
      i++;
    } else {
      if (c === '"') {
        inQuotes = true;
        i++;
        continue;
      }
      if (c === ',') {
        row.push('');
        i++;
        continue;
      }
      if (c === '\r' && next === '\n') {
        p.push(row);
        row = [''];
        i += 2;
        continue;
      }
      if (c === '\n' || c === '\r') {
        p.push(row);
        row = [''];
        i++;
        continue;
      }
      row[row.length - 1] += c;
      i++;
    }
  }
  if (row.length > 1 || row[0] !== '') {
    p.push(row);
  }
  return p;
}

const csvDir = path.join(__dirname, '../csvsolve');
const files = fs.readdirSync(csvDir).filter(f => f.endsWith('.csv'));

const summary = [];

files.forEach((file, index) => {
  const filePath = path.join(csvDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const rows = parseCSV(content);
  const header = rows[0] || [];
  const dataRows = rows.slice(1);

  // Find URL column index
  const urlIdx = header.findIndex(h => h.toLowerCase() === 'url' || h.toLowerCase() === 'url');
  const statusIdx = header.findIndex(h => h.toLowerCase().includes('http status code') || h.toLowerCase().includes('status'));
  const titleIdx = header.findIndex(h => h.toLowerCase() === 'title');

  // Sample affected URLs (up to 5)
  const sampleUrls = dataRows.slice(0, 8).map(r => ({
    url: urlIdx !== -1 ? r[urlIdx] : r[1] || r[0],
    status: statusIdx !== -1 ? r[statusIdx] : '',
    title: titleIdx !== -1 ? (r[titleIdx] || '').slice(0, 60) : ''
  }));

  // Analyze URL patterns
  const urlPatterns = {};
  dataRows.forEach(r => {
    const u = (urlIdx !== -1 ? r[urlIdx] : r[1] || r[0]) || '';
    try {
      const parsed = new URL(u);
      const pathParts = parsed.pathname.split('/').filter(Boolean);
      const lang = pathParts.length > 0 && pathParts[0].length === 2 ? pathParts[0] : 'root/en';
      urlPatterns[lang] = (urlPatterns[lang] || 0) + 1;
    } catch (e) {
      urlPatterns['other'] = (urlPatterns['other'] || 0) + 1;
    }
  });

  summary.push({
    index: index + 1,
    filename: file,
    totalRecords: dataRows.length,
    columns: header,
    sampleUrls,
    urlPatterns
  });
});

console.log(JSON.stringify(summary, null, 2));
