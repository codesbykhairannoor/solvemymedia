const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'detailed_csv_samples.json'), 'utf8'));
const filenames = Object.keys(data);

filenames.slice(0, 7).forEach((filename, idx) => {
  const item = data[filename];
  console.log(`\n======================================================`);
  console.log(`[${idx+1}/22] FILE: ${filename}`);
  console.log(`TOTAL RECORDS: ${item.totalRows}`);
  console.log(`COLUMNS: ${item.header.join(' | ')}`);
  console.log(`SAMPLES:`);
  console.log(JSON.stringify(item.first5Rows.slice(0, 3), null, 2));
});
