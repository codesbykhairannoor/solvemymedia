const fs = require('fs');
const translate = require('google-translate-api-x');

const translationsPath = './src/i18n/translations.ts';

const langs = [
  'en', 'id', 'es', 'fr', 'de', 'ja', 'pt', 'ru', 'zh', 'hi',
  'ar', 'tr', 'it', 'nl', 'pl', 'vi', 'th', 'ko', 'ms', 'uk',
  'ro', 'el', 'hu', 'cs', 'sv', 'da', 'fi', 'no', 'sk', 'he'
];

const texts = {
  ratingScore: '4.9/5 Rating',
  ratingReviews: '(from 1,250 reviews)'
};

async function processTranslations() {
  let content = fs.readFileSync(translationsPath, 'utf8');

  for (const lang of langs) {
    if (lang === 'en') {
      content = content.replace(
        new RegExp(`(${lang}:\\s*{[\\s\\S]*?)(};)`),
        `$1  ratingScore: "${texts.ratingScore}",\n    ratingReviews: "${texts.ratingReviews}",\n  $2`
      );
      continue;
    }

    try {
      console.log(`Translating for ${lang}...`);
      const resScore = await translate(texts.ratingScore, { to: lang === 'zh' ? 'zh-CN' : lang });
      const resReviews = await translate(texts.ratingReviews, { to: lang === 'zh' ? 'zh-CN' : lang });

      content = content.replace(
        new RegExp(`(${lang}:\\s*{[\\s\\S]*?)(},|};)`),
        `$1  ratingScore: "${resScore.text.replace(/"/g, '\\"')}",\n    ratingReviews: "${resReviews.text.replace(/"/g, '\\"')}",\n  $2`
      );
    } catch (e) {
      console.error(`Error for ${lang}:`, e.message);
    }
  }

  fs.writeFileSync(translationsPath, content);
  console.log('Translations updated.');
}

processTranslations();
