const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/pseo-long-tail-translations.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let updated = 0;

for (const lang in data) {
  for (const entry of data[lang]) {
    if (!entry.bentoSections && entry.dynamicSection) {
      const bento = [];

      // 1. Hero Split
      bento.push({
        type: 'hero-split',
        data: {
          title: entry.h1,
          content: entry.description,
          buttonText: "Start", // Generic, or we can leave it out if optional
        }
      });

      // 2. Dynamic Section -> Bento
      if (entry.dynamicSection.type === 'steps') {
        bento.push({
          type: 'how-to',
          data: {
            title: entry.dynamicSection.heading,
            description: "",
            steps: entry.dynamicSection.items.map(item => ({
              title: item.title,
              description: item.content
            }))
          }
        });
      } else if (entry.dynamicSection.type === 'comparison') {
        bento.push({
          type: 'pros-cons',
          data: {
            title: entry.dynamicSection.heading,
            description: "",
            pros: entry.dynamicSection.items.length > 0 ? [entry.dynamicSection.items[0].title + ": " + entry.dynamicSection.items[0].content] : [],
            cons: entry.dynamicSection.items.length > 1 ? [entry.dynamicSection.items[1].title + ": " + entry.dynamicSection.items[1].content] : []
          }
        });
      } else {
        // benefits or use-cases
        bento.push({
          type: 'feature-grid',
          data: {
            title: entry.dynamicSection.heading,
            description: "",
            features: entry.dynamicSection.items.map(item => ({
              icon: "zap",
              title: item.title,
              description: item.content
            }))
          }
        });
      }

      // 3. Highlight Box (using FAQ 3 - Privacy/Safety)
      if (entry.faqs && entry.faqs.length >= 3) {
        bento.push({
          type: 'highlight-box',
          data: {
            title: entry.faqs[2].q,
            description: entry.faqs[2].a,
            label: "✨"
          }
        });
      }

      // 4. Bottom CTA (using FAQ 1 or description)
      bento.push({
        type: 'bottom-cta',
        data: {
          title: entry.h1,
          description: entry.faqs && entry.faqs.length > 0 ? entry.faqs[0].a : entry.description,
          buttonText: "→"
        }
      });

      entry.bentoSections = bento;
      updated++;
    }
  }
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Updated ${updated} entries with bentoSections!`);
