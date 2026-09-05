const fs = require('fs');
const path = require('path');

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

const report = [];

files.forEach((file, index) => {
  const filePath = path.join(csvDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const rows = parseCSV(content);
  const header = rows[0] || [];
  const dataRows = rows.slice(1);

  // Extract columns
  const urlIdx = header.findIndex(h => h.toLowerCase() === 'url');
  const statusIdx = header.findIndex(h => h.toLowerCase().includes('http status code') || h.toLowerCase().includes('status'));
  const titleIdx = header.findIndex(h => h.toLowerCase() === 'title');

  const urls = dataRows.map(r => urlIdx !== -1 ? r[urlIdx] : r[1] || r[0]).filter(Boolean);
  const uniqueUrls = Array.from(new Set(urls));

  // Determine issue type
  const match = file.match(/solvemymedia_05-sep-2026_(.+?)_2026-09-05/);
  const rawIssue = match ? match[1] : file;

  report.push({
    index: index + 1,
    file,
    rawIssue,
    rowCount: dataRows.length,
    uniqueUrlsCount: uniqueUrls.length,
    header,
    sampleUrls: uniqueUrls.slice(0, 5)
  });
});

fs.writeFileSync(path.join(__dirname, 'csv_audit_report.json'), JSON.stringify(report, null, 2));
console.log('Processed all', report.length, 'CSV files.');
report.forEach(r => {
  console.log(`[#${r.index}] ${r.rawIssue}: ${r.rowCount} rows (${r.uniqueUrlsCount} unique URLs)`);
});
