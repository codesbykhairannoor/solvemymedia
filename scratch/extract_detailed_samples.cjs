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

const detailedAnalysis = {};

files.forEach(file => {
  const content = fs.readFileSync(path.join(csvDir, file), 'utf8');
  const rows = parseCSV(content);
  const header = rows[0] || [];
  const data = rows.slice(1);
  
  const urlIdx = header.findIndex(h => h.toLowerCase() === 'url');
  const titleIdx = header.findIndex(h => h.toLowerCase() === 'title');
  const codeIdx = header.findIndex(h => h.toLowerCase().includes('http status code') || h.toLowerCase().includes('status'));

  detailedAnalysis[file] = {
    totalRows: data.length,
    header,
    first5Rows: data.slice(0, 10).map(r => {
      const obj = {};
      header.forEach((h, i) => {
        if (r[i] !== undefined && r[i] !== '') {
          obj[h] = r[i].length > 100 ? r[i].slice(0, 100) + '...' : r[i];
        }
      });
      return obj;
    })
  };
});

fs.writeFileSync(path.join(__dirname, 'detailed_csv_samples.json'), JSON.stringify(detailedAnalysis, null, 2));
console.log('Saved detailed samples for all 22 files.');
