const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/pseo-long-tail-translations.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let updated = 0;

for (const lang in data) {
  for (const entry of data[lang]) {
    
    // We expect dynamicSection to still be there from the original JSON
    // Or we extract data from the existing bentoSections we generated earlier
    // But since dynamicSection might have been removed if I overwrote it (wait, I did NOT delete dynamicSection in the previous script!)
    // Let's rely on entry.dynamicSection and entry.faqs
    if (!entry.dynamicSection) continue;
    
    const bento = [];
    const basePath = entry.path; // e.g. /reduce-mp4-video-size-for-email
    const h1 = entry.h1;
    const desc = entry.description;
    const stepsItems = entry.dynamicSection.items || [];
    const faqs = entry.faqs || [];

    // Helper functions to get safe text
    const getFaq = (idx) => faqs.length > idx ? faqs[idx] : {q: h1, a: desc};
    const getStep = (idx) => stepsItems.length > idx ? stepsItems[idx] : {title: h1, content: desc};
    const getAllSteps = () => stepsItems.map(s => ({ title: s.title, description: s.content }));

    switch(basePath) {
      case '/reduce-mp4-video-size-for-email':
        bento.push({
          type: 'hero-split',
          data: { title: h1, content: desc, buttonText: "Start" }
        });
        bento.push({
          type: 'roi-calculator',
          data: { 
            title: entry.dynamicSection.heading, 
            description: getStep(0).content,
            buttonText: getStep(1).title
          }
        });
        bento.push({
          type: 'security-arch',
          data: { title: getFaq(2).q, description: getFaq(2).a }
        });
        bento.push({
          type: 'gamified-progress',
          data: { title: getFaq(0).q, description: getFaq(0).a, buttonText: "→" }
        });
        break;

      case '/compress-large-video-for-whatsapp':
        bento.push({
          type: 'big-typo-hero',
          data: { title: h1, subtitle: desc }
        });
        bento.push({
          type: 'timeline-view',
          data: { 
            title: entry.dynamicSection.heading, 
            description: "",
            events: stepsItems.map(s => ({ date: "Step", title: s.title, description: s.content }))
          }
        });
        bento.push({
          type: 'highlight-box',
          data: { title: getFaq(1).q, description: getFaq(1).a, label: "✨" }
        });
        bento.push({
          type: 'bottom-cta',
          data: { title: getFaq(0).q, description: getFaq(0).a, buttonText: "Start" }
        });
        break;

      case '/convert-mov-to-mp4-for-android':
        bento.push({
          type: 'hero-split',
          data: { title: h1, content: desc, buttonText: "Start" }
        });
        bento.push({
          type: 'bento-cards',
          data: { 
            title: entry.dynamicSection.heading, 
            description: "",
            cards: stepsItems.map(s => ({ title: s.title, content: s.content }))
          }
        });
        bento.push({
          type: 'alert',
          data: { title: getFaq(2).q, description: getFaq(2).a }
        });
        bento.push({
          type: 'floating-cta',
          data: { title: getFaq(0).q, buttonText: "→" }
        });
        break;

      case '/extract-audio-from-video-for-podcast':
        bento.push({
          type: 'quote-banner',
          data: { quote: h1, author: "SolveMyMedia", role: "Tool" }
        });
        bento.push({
          type: 'terminal-steps',
          data: { 
            title: entry.dynamicSection.heading, 
            description: desc,
            steps: stepsItems.map(s => s.title + " - " + s.content)
          }
        });
        bento.push({
          type: 'security-arch',
          data: { title: getFaq(2).q, description: getFaq(2).a }
        });
        bento.push({
          type: 'split-screen-cta',
          data: { title: getFaq(0).q, description: getFaq(0).a, buttonText: "Start" }
        });
        break;

      case '/make-video-smaller-without-losing-quality':
        bento.push({
          type: 'hero-split',
          data: { title: h1, content: desc, buttonText: "Start" }
        });
        bento.push({
          type: 'accordion-features',
          data: { 
            title: entry.dynamicSection.heading, 
            description: "",
            items: stepsItems.map(s => ({ title: s.title, content: s.content }))
          }
        });
        bento.push({
          type: 'stat-box',
          data: { title: getFaq(2).q, description: getFaq(2).a, statValue: "100%", statLabel: "Private" }
        });
        bento.push({
          type: 'bottom-cta',
          data: { title: getFaq(0).q, description: getFaq(0).a, buttonText: "→" }
        });
        break;

      case '/remove-sound-from-video-completely':
        bento.push({
          type: 'big-typo-hero',
          data: { title: h1, subtitle: desc }
        });
        bento.push({
          type: 'icon-list',
          data: { 
            title: entry.dynamicSection.heading, 
            description: "",
            items: stepsItems.map(s => ({ title: s.title, content: s.content }))
          }
        });
        bento.push({
          type: 'security-arch',
          data: { title: getFaq(2).q, description: getFaq(2).a }
        });
        bento.push({
          type: 'gamified-progress',
          data: { title: getFaq(0).q, description: getFaq(0).a, buttonText: "Start" }
        });
        break;

      case '/speed-up-video-for-tiktok':
        bento.push({
          type: 'hero-split',
          data: { title: h1, content: desc, buttonText: "Start" }
        });
        bento.push({
          type: 'progress-stats',
          data: { 
            title: entry.dynamicSection.heading, 
            description: "",
            stats: stepsItems.map(s => ({ label: s.title, value: 100, suffix: "%" }))
          }
        });
        bento.push({
          type: 'highlight-box',
          data: { title: getFaq(1).q, description: getFaq(1).a, label: "✨" }
        });
        bento.push({
          type: 'bottom-cta',
          data: { title: getFaq(0).q, description: getFaq(0).a, buttonText: "Start" }
        });
        break;

      case '/crop-video-for-instagram-story':
        bento.push({
          type: 'big-typo-hero',
          data: { title: h1, subtitle: desc }
        });
        bento.push({
          type: 'how-to',
          data: { 
            title: entry.dynamicSection.heading, 
            description: "",
            steps: getAllSteps()
          }
        });
        bento.push({
          type: 'trust-badge-banner',
          data: { title: getFaq(2).q, description: getFaq(2).a }
        });
        bento.push({
          type: 'split-screen-cta',
          data: { title: getFaq(0).q, description: getFaq(0).a, buttonText: "→" }
        });
        break;

      case '/combine-multiple-voice-memos-into-one':
        bento.push({
          type: 'quote-banner',
          data: { quote: h1, author: "SolveMyMedia", role: "Tool" }
        });
        bento.push({
          type: 'timeline-view',
          data: { 
            title: entry.dynamicSection.heading, 
            description: "",
            events: stepsItems.map(s => ({ date: "Step", title: s.title, description: s.content }))
          }
        });
        bento.push({
          type: 'security-arch',
          data: { title: getFaq(2).q, description: getFaq(2).a }
        });
        bento.push({
          type: 'floating-cta',
          data: { title: getFaq(0).q, buttonText: "Start" }
        });
        break;

      case '/transcribe-zoom-meeting-recording-to-text':
        bento.push({
          type: 'hero-split',
          data: { title: h1, content: desc, buttonText: "Start" }
        });
        bento.push({
          type: 'terminal-steps',
          data: { 
            title: entry.dynamicSection.heading, 
            description: desc,
            steps: stepsItems.map(s => s.title + " - " + s.content)
          }
        });
        bento.push({
          type: 'alert',
          data: { title: getFaq(2).q, description: getFaq(2).a }
        });
        bento.push({
          type: 'bottom-cta',
          data: { title: getFaq(0).q, description: getFaq(0).a, buttonText: "→" }
        });
        break;
        
      default:
        // Fallback for any unknown path
        bento.push({
          type: 'hero-split',
          data: { title: h1, content: desc, buttonText: "Start" }
        });
        bento.push({
          type: 'how-to',
          data: { title: entry.dynamicSection.heading, description: "", steps: getAllSteps() }
        });
        bento.push({
          type: 'highlight-box',
          data: { title: getFaq(2).q, description: getFaq(2).a, label: "✨" }
        });
        bento.push({
          type: 'bottom-cta',
          data: { title: getFaq(0).q, description: getFaq(0).a, buttonText: "→" }
        });
        break;
    }

    entry.bentoSections = bento;
    updated++;
  }
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Updated ${updated} entries with UNIQUE bentoSections permutations!`);
