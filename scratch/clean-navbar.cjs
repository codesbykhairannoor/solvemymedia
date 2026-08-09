const fs = require('fs');
const path = require('path');

const navbarPath = path.join(__dirname, '../src/components/Navbar.tsx');
let content = fs.readFileSync(navbarPath, 'utf8');

// 1. Remove Imports
content = content.replace(/import \{ LocaleSwitcher \} from '\.\/LocaleSwitcher';\r?\n?/, '');
content = content.replace(/import \{ useLanguage \} from '\.\.\/context\/LanguageContext';\r?\n?/, '');
content = content.replace(/import \{ SEO_DICTIONARY \} from '\.\.\/utils\/seoDictionary';\r?\n?/, '');

// 2. Remove Hooks
content = content.replace(/const \{ currentLang, setLanguage \} = useLanguage\(\);\r?\n?/, '');
content = content.replace(/const dict = SEO_DICTIONARY.*?\r?\n?/, '');

// 3. Remove LocaleSwitcher state and component
content = content.replace(/const \[isLangOpen, setIsLangOpen\] = useState\(false\);\r?\n?/, '');
content = content.replace(/<LocaleSwitcher[\s\S]*?\/>/, '');

// 4. Fix Link
content = content.replace(/<Link to=\{`\/\$\{currentLang\}`\}/, '<Link to="/"');

// 5. Fix handleToolClick
content = content.replace(/navigate\(`\/\$\{currentLang\}\/\$\{path\}`\);/, 'navigate(`/${path}`);');

// 6. Fix getSlug and Labels
// The navbar maps: getSlug(id, currentLang).replace(/-/g, ' ').toUpperCase()
content = content.replace(/\{getSlug\(id, currentLang\)\.replace\(\/-\/g, ' '\)\.toUpperCase\(\)\}/g, '{id.replace(/-/g, " ").toUpperCase()}');
content = content.replace(/\{dict\.ui\?.tools\?.toUpperCase\(\) \|\| 'ALL TOOLS'\}/, "'ALL TOOLS'");

// 7. Fix Mega Menu Titles
content = content.replace(/\{dict\.ui\?.video_optimization \|\| 'VIDEO OPTIMIZATION'\}/g, "'VIDEO OPTIMIZATION'");
content = content.replace(/\{dict\.ui\?.video_editing \|\| 'VIDEO EDITING'\}/g, "'VIDEO EDITING'");
content = content.replace(/\{dict\.ui\?.audio_tools \|\| 'AUDIO TOOLS'\}/g, "'AUDIO TOOLS'");
content = content.replace(/\{dict\.ui\?.ai_studio \|\| 'AI & STUDIO'\}/g, "'AI & STUDIO'");

// 8. Fix getToolName
content = content.replace(/const getToolName = \(toolId: string\) => \{\r?\n\s+return getSlug\(toolId, currentLang\)\.replace\(\/-\/g, ' '\);\r?\n\s+\};\r?\n?/, 'const getToolName = (toolId: string) => toolId.replace(/-/g, " ");\n');

fs.writeFileSync(navbarPath, content);
console.log('Cleaned Navbar.tsx');
