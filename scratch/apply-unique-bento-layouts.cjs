const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/pseo-long-tail-translations.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let updated = 0;

for (const lang in data) {
  for (const entry of data[lang]) {
    
    let stepsItems = [];
    let headingStr = "";

    // If dynamicSection exists, use it
    if (entry.dynamicSection && entry.dynamicSection.items) {
      stepsItems = entry.dynamicSection.items;
      headingStr = entry.dynamicSection.heading;
    } 
    // Otherwise try to reconstruct from the previous fallback bentoSections
    else if (entry.bentoSections) {
      const howTo = entry.bentoSections.find(s => s.type === 'how-to' || s.type === 'timeline-view' || s.type === 'accordion-features' || s.type === 'terminal-steps' || s.type === 'icon-list' || s.type === 'progress-stats' || s.type === 'bento-cards');
      if (howTo && howTo.data) {
        headingStr = howTo.data.title;
        // Depending on the layout type that was previously assigned, the items might be in different keys
        if (howTo.data.steps) {
          stepsItems = howTo.data.steps.map(s => ({ title: s.title, content: s.description || s.content || '' }));
        } else if (howTo.data.events) {
          stepsItems = howTo.data.events.map(s => ({ title: s.title, content: s.description || s.content || '' }));
        } else if (howTo.data.items) {
          stepsItems = howTo.data.items.map(s => ({ title: s.title, content: s.description || s.content || '' }));
        } else if (howTo.data.cards) {
          stepsItems = howTo.data.cards.map(s => ({ title: s.title, content: s.description || s.content || '' }));
        } else if (howTo.data.stats) {
          stepsItems = howTo.data.stats.map(s => ({ title: s.label, content: '' }));
        } else if (howTo.data.commands) { // old bug had commands
          stepsItems = howTo.data.commands.map(s => {
            const parts = s.split(' - ');
            return { title: parts[0], content: parts[1] || '' };
          });
        }
      }
    }

    if (!stepsItems.length) {
      // Fallback if absolutely no steps found
      stepsItems = [
        {title: "Step 1", content: "Do this first"},
        {title: "Step 2", content: "Do this second"},
        {title: "Step 3", content: "Do this third"}
      ];
    }
    if (!headingStr) {
      headingStr = "How to " + entry.h1;
    }
    
    const bento = [];
    const basePath = entry.path; 
    const h1 = entry.h1;
    const desc = entry.description;
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
            title: headingStr, 
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
            title: headingStr, 
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
            title: headingStr, 
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
            title: headingStr, 
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
            title: headingStr, 
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
            title: headingStr, 
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
            title: headingStr, 
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
            title: headingStr, 
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
            title: headingStr, 
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
            title: headingStr, 
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
          data: { title: headingStr, description: "", steps: getAllSteps() }
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
console.log(`Updated ${updated} entries with UNIQUE bentoSections permutations FOR ALL LANGUAGES!`);
