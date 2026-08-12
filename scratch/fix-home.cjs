const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

c = c.replace(
  /<h3 style={{ fontSize: '1\.25rem', color: 'var\(--text-main\)' }}>Compress Video<\/h3>/,
  "<h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>{t('navbarCompressVideo') || 'Compress Video'}</h3>"
);

c = c.replace(
  /<p style={{ color: 'var\(--text-muted\)' }}>Reduce video file size without losing significant quality\. Uses blazing fast GPU acceleration\.<\/p>/,
  "<p style={{ color: 'var(--text-muted)' }}>{t('toolCompressVideoDesc') || 'Reduce video file size without losing significant quality. Uses blazing fast GPU acceleration.'}</p>"
);

c = c.replace(
  /<h3 style={{ fontSize: '1\.25rem', color: 'var\(--text-main\)' }}>Convert Video<\/h3>/,
  "<h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>{t('toolConvertVideoName') || 'Convert Video'}</h3>"
);

c = c.replace(
  /<p style={{ color: 'var\(--text-muted\)' }}>Change video formats easily\. Support for MP4, WebM, MKV, AVI, and more\.<\/p>/,
  "<p style={{ color: 'var(--text-muted)' }}>{t('toolConvertVideoDesc') || 'Change video formats easily. Support for MP4, WebM, MKV, AVI, and more.'}</p>"
);

fs.writeFileSync('src/pages/Home.tsx', c);
console.log('Fixed Home.tsx');
