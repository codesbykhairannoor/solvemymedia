const fs = require('fs');
const cssPath = './src/index.css';
let css = fs.readFileSync(cssPath, 'utf8');

const globalOverrides = `
/* GLOBAL BENTO OVERRIDES TO ENFORCE TYPOGRAPHY STANDARDS */

/* Force standard title sizes on typical title elements within Bento */
.bento-container h1,
.bento-container h2,
.bento-container h3,
.bento-container h4 {
  font-family: var(--font-display) !important;
  font-size: clamp(1.8rem, 4vw, 2.5rem) !important;
  font-weight: 800 !important;
  line-height: 1.2 !important;
  color: var(--text-main) !important;
  margin-bottom: 24px !important;
}

/* Force descriptions to be 1.1rem muted */
.bento-container p {
  font-size: 1.1rem !important;
  line-height: 1.8 !important;
  color: var(--text-muted) !important;
}

/* Ensure sections themselves have 80px 24px padding if they are root elements inside bento-container */
.bento-container > div {
  padding: 80px 24px !important;
}
`;

if (!css.includes('GLOBAL BENTO OVERRIDES')) {
  fs.writeFileSync(cssPath, css + '\n\n' + globalOverrides);
}
console.log('Injected global CSS overrides');
