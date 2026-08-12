const fs = require('fs');
let c = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

if (!c.includes('handleLanguageChange')) {
  c = c.replace(/const \{ currentLang, t \} = useLanguage\(\);/, "const { currentLang, t, languages } = useLanguage();\n  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {\n    const newLang = e.target.value;\n    const currentPath = window.location.pathname;\n    let cleanPath = currentPath;\n    if (currentLang !== 'en' && cleanPath.startsWith(`/${currentLang}`)) {\n      cleanPath = cleanPath.slice(currentLang.length + 1);\n    }\n    if (newLang === 'en') {\n      window.location.href = cleanPath || '/';\n    } else {\n      window.location.href = `/${newLang}${cleanPath}`;\n    }\n  };");
  
  const injectHtml = `
        <select 
          value={currentLang} 
          onChange={handleLanguageChange}
          style={{ 
            padding: '6px 8px', 
            borderRadius: '8px', 
            border: '1.5px solid var(--border-color)',
            background: 'var(--bg-app)',
            color: 'var(--text-main)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.code.toUpperCase()}
            </option>
          ))}
        </select>
        
        <button `;
  
  c = c.replace(/<button [\s\n]*onClick=\{toggleTheme\}/, injectHtml);
  fs.writeFileSync('src/components/Navbar.tsx', c);
  console.log('Updated Navbar.tsx');
}
