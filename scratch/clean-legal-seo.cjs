const fs = require('fs');
const path = require('path');

const dir = 'src/pages/legal/';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let code = fs.readFileSync(filePath, 'utf8');
    
    // Remove the import
    code = code.replace(/import \{ useSeoMeta \} from '..\/..\/hooks\/useSeoMeta';\n/, '');
    
    // Remove the useSeoMeta(...) call
    code = code.replace(/\s+useSeoMeta\([^;]+;\n/, '\n');
    
    fs.writeFileSync(filePath, code);
    console.log('Cleaned ' + file);
  }
}
