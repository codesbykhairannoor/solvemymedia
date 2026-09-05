const fs = require('fs');
const path = require('path');

const csvDir = path.join(__dirname, '../csvsolve');
const files = fs.readdirSync(csvDir).filter(f => f.endsWith('.csv'));

console.log('Total CSV files found:', files.length);

const results = [];

files.forEach((f, idx) => {
  const filePath = path.join(csvDir, f);
  const content = fs.readFileSync(filePath, 'utf8');
  // Handle CSV multiline properly or simple line split
  const lines = content.split('\r\n').join('\n').split('\n').filter(l => l.trim().length > 0);
  const header = lines[0] || '';
  const rowCount = Math.max(0, lines.length - 1);
  
  // Extract issue name from filename
  // solvemymedia_05-sep-2026_<issue-name>_2026-09-05_...
  const match = f.match(/solvemymedia_05-sep-2026_(.+?)_2026-09-05/);
  const issueName = match ? match[1] : f;

  const sampleRows = lines.slice(1, 4);

  results.push({
    index: idx + 1,
    filename: f,
    issueName,
    rowCount,
    sizeBytes: fs.statSync(filePath).size,
    header,
    sampleRows
  });
});

console.log(JSON.stringify(results, null, 2));
