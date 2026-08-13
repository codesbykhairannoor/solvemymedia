const fs = require('fs');
const path = require('path');

const components = [
  'HeroSplit.tsx', 'RoiCalculator.tsx', 'SecurityArchitecture.tsx', 'GamifiedProgressCTA.tsx',
  'BigTypographyHero.tsx', 'TimelineView.tsx', 'HighlightBox.tsx', 'BottomCTA.tsx',
  'BentoCards.tsx', 'AlertBox.tsx', 'FloatingCTA.tsx', 'QuoteBanner.tsx',
  'TerminalSteps.tsx', 'SplitScreenCTA.tsx', 'AccordionFeatures.tsx', 'StatBox.tsx',
  'IconList.tsx', 'ProgressStats.tsx', 'HowToSteps.tsx', 'TrustBadgeBanner.tsx'
];

let filesUpdated = 0;

components.forEach(file => {
  const p = path.join('./src/components/pseo', file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  let original = content;

  // Fix section titles
  content = content.replace(/fontSize:\s*'(clamp\([^)]+\)|[0-9.]+rem)'/g, (match, val) => {
    // If it's a huge hero title or similar, replace it
    if (val.includes('clamp(2.5rem') || val.includes('clamp(3rem') || val === '2rem' || val === '2.5rem' || val === '3rem') {
      return "fontSize: 'clamp(1.8rem, 4vw, 2.5rem)'";
    }
    // If it's a description
    if (val === '1.25rem' || val === '1.5rem' || val === '1.2rem') {
      return "fontSize: '1.15rem'";
    }
    return match;
  });

  // Fix font weights
  content = content.replace(/fontWeight:\s*900/g, 'fontWeight: 800');

  // Fix line heights for titles
  content = content.replace(/lineHeight:\s*(1|1\.1|1\.15)(?=[,}])/g, 'lineHeight: 1.2');

  // Fix line heights for descriptions
  content = content.replace(/lineHeight:\s*(1\.5|1\.6|1\.7)(?=[,}])/g, 'lineHeight: 1.8');

  // Inject font family explicitly to titles
  content = content.replace(/(fontSize:\s*'clamp\(1\.8rem,\s*4vw,\s*2\.5rem\)',\s*fontWeight:\s*800)/g, "$1, fontFamily: 'Outfit, sans-serif'");

  if (content !== original) {
    fs.writeFileSync(p, content);
    filesUpdated++;
  }
});
console.log('Fixed typography in ' + filesUpdated + ' components!');
