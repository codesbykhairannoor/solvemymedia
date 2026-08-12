const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

if (!c.includes('useLanguage')) {
  c = c.replace(/import \{ useSeoMeta \} from '\.\.\/hooks\/useSeoMeta';/g, "import { useSeoMeta } from '../hooks/useSeoMeta';\nimport { useLanguage } from '../hooks/useLanguage';");
  
  c = c.replace(/export const Home: React\.FC = \(\) => \{/g, "export const Home: React.FC = () => {\n  const { currentLang, t } = useLanguage();\n  const prefix = currentLang === 'en' ? '' : `/${currentLang}`;");
  
  c = c.replace(/<Link to={`\//g, "<Link to={`${prefix}/");
  
  c = c.replace(/\{smartHighlight\('Next-Gen Browser Media Tools'\)\}/g, "{smartHighlight(t('homeHeroTitle') || 'Next-Gen Browser Media Tools')}");
  
  fs.writeFileSync('src/pages/Home.tsx', c);
  console.log('Updated Home.tsx');
}
