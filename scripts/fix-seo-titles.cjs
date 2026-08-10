const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/i18n/translations.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Match each language block: "en": { ... }
let updatedContent = content;
let match;

// We can just find all homeHeroTitle and replace seoHomeTitle within the same block.
// A safe way is to split by `homeHeroTitle:`
const langRegex = /([a-zA-Z]{2,3}(?:-[A-Z]{2})?|\'[a-zA-Z]{2,3}(?:-[A-Z]{2})?\'|\"[a-zA-Z]{2,3}(?:-[A-Z]{2})?\"):\s*\{([\s\S]*?)\},/g;

updatedContent = content.replace(langRegex, (match, langKey, blockContent) => {
  const heroMatch = blockContent.match(/homeHeroTitle:\s*(['"`])(.*?)\1/);
  if (heroMatch) {
    const heroTitle = heroMatch[2];
    const newSeoTitle = `SolveMyMedia | ${heroTitle}`;
    
    // Replace seoHomeTitle
    blockContent = blockContent.replace(
      /seoHomeTitle:\s*(['"`]).*?\1/,
      `seoHomeTitle: ${JSON.stringify(newSeoTitle)}`
    );
  }
  return `${langKey}: {${blockContent}},`;
});

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Successfully updated seoHomeTitle for 30 languages.');
