const fs = require('fs');
const path = require('path');

// 1. Home.tsx
const homePath = path.join(__dirname, '../src/pages/Home.tsx');
let home = fs.readFileSync(homePath, 'utf8');
home = home.replace(/import \{ getSlug \} from '\.\.\/utils\/urlSlugs';\r?\n?/g, '');
home = home.replace(/\+ \(dict\.desc \|\| 'Next-Gen Browser Media Tools'\), dict\.desc \|\| 'Next-Gen Browser Media Tools'/g, '", "Next-Gen Browser Media Tools"');
home = home.replace(/\$\{getSlug\('([^']+)', currentLang\)\}/g, '$1');
fs.writeFileSync(homePath, home);
console.log('Cleaned Home.tsx');

// 2. ToolLayout.tsx
const layoutPath = path.join(__dirname, '../src/components/ToolLayout.tsx');
if (fs.existsSync(layoutPath)) {
    let layout = fs.readFileSync(layoutPath, 'utf8');
    layout = layout.replace(/import \{ useLanguage \} from '\.\.\/context\/LanguageContext';\r?\n?/g, '');
    layout = layout.replace(/import \{ SEO_DICTIONARY \} from '\.\.\/utils\/seoDictionary';\r?\n?/g, '');
    layout = layout.replace(/^[ \t]*const \{ currentLang \} = useLanguage\(\);\r?\n?/gm, '');
    layout = layout.replace(/^[ \t]*const dict = SEO_DICTIONARY\[currentLang\] \|\| SEO_DICTIONARY\['en'\];\r?\n?/gm, '');
    layout = layout.replace(/dict\.ui\.tools/g, '"Tools"');
    layout = layout.replace(/dict\.ui\.convert_video/g, '"Convert Video"');
    fs.writeFileSync(layoutPath, layout);
    console.log('Cleaned ToolLayout.tsx');
}

// 3. Navbar.tsx (leftovers)
const navPath = path.join(__dirname, '../src/components/Navbar.tsx');
let nav = fs.readFileSync(navPath, 'utf8');
nav = nav.replace(/import \{ getSlug \} from '\.\.\/utils\/urlSlugs';\r?\n?/g, '');
nav = nav.replace(/^[ \t]*\[currentLang\] \|\| SEO_DICTIONARY\['en'\];\r?\n?/gm, '');
fs.writeFileSync(navPath, nav);
console.log('Cleaned Navbar.tsx leftovers');

// 4. Delete LanguageDropdown
try {
    fs.unlinkSync(path.join(__dirname, '../src/components/LanguageDropdown.tsx'));
} catch (e) {}

