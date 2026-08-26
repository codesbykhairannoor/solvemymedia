const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '../src/data/pseo-translations.json'),
  path.join(__dirname, '../src/data/pseo-long-tail-translations.json')
];

function fixObject(obj, enObj) {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj[i] === 'string' && obj[i].startsWith('Error 500')) {
        obj[i] = enObj[i] || '';
      } else if (typeof obj[i] === 'object' && obj[i] !== null) {
        fixObject(obj[i], enObj[i] || {});
      }
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (typeof obj[key] === 'string' && obj[key].startsWith('Error 500')) {
        obj[key] = enObj[key] || '';
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        fixObject(obj[key], enObj[key] || {});
      }
    }
  }
}

for (const file of files) {
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const enData = data['en'];
    
    if (enData) {
      for (const lang in data) {
        if (lang === 'en') continue;
        
        // enData is an array of route objects
        for (let i = 0; i < data[lang].length; i++) {
          const routeObj = data[lang][i];
          const enRouteObj = enData.find(e => e.tool === routeObj.tool) || enData[i];
          if (enRouteObj) {
            fixObject(routeObj, enRouteObj);
          }
        }
      }
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
      console.log(`Fixed ${file}`);
    }
  }
}
