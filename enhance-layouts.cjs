const fs = require('fs');
const path = require('path');

const target = 'C:/Users/Axioo/.gemini/antigravity-ide/brain/9618ee62-0ef4-4648-8421-fcfddef68980/scratch/generate-bespoke-components.js';
let content = fs.readFileSync(target, 'utf8');

// For Geo
const extraGeo = `
      // 3: Minimalist Cards
      \`export const \${compName}: React.FC<SectionProps> = ({ section }) => (
        <section className="section-global" style={{ padding: '60px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: '\${gradient}', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><\${icon1} size={32}/></div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, m: 0 }}>{section.title}</h2>
            </div>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: 40 }}>{section.content}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {section.features?.map((f:any, i:number) => (
                <div key={i} style={{ border: '1px solid var(--border-color)', padding: 32, borderRadius: 24 }}>
                  <h4 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 12, color: 'var(--brand-primary)' }}>{f.title}</h4>
                  <p style={{ color: 'var(--text-muted)' }}>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );\`,
      // 4: ZigZag Layout
      \`export const \${compName}: React.FC<SectionProps> = ({ section }) => (
        <section className="section-global" style={{ background: '\${bg}', borderRadius: 40 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                {section.features?.map((f:any, i:number) => (
                  <div key={i} style={{ background: 'var(--bg-app)', padding: 24, borderRadius: 16, boxShadow: '\${shadow}' }}>
                    <h4 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 8 }}>{f.title}</h4>
                    <p style={{ color: 'var(--text-muted)' }}>{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: '1 1 300px', textAlign: 'right' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: 24 }}>{section.title}</h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>{section.content}</p>
            </div>
          </div>
        </section>
      );\`,
`;
content = content.replace(/function getProceduralGeo\([\s\S]*?const layouts = \[/m, match => match + extraGeo);

// For Privacy
const extraPrivacy = `
      // 3: Center Alignment
      \`export const \${compName}: React.FC<SectionProps> = ({ section }) => (
        <section className="section-global" style={{ border: '2px dashed var(--border-color)', borderRadius: 32 }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: 24, color: 'var(--brand-secondary)' }}>{section.title}</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: 48 }}>{section.content}</p>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
              {section.features?.map((f:any, i:number) => (
                <div key={i} style={{ padding: 24, background: 'rgba(0,0,0,0.05)', borderRadius: 16, flex: '1 1 200px' }}>
                  <h4 style={{ fontWeight: 800, marginBottom: 8, fontSize: '1.1rem' }}>{f.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );\`,
`;
content = content.replace(/function getProceduralPrivacy\([\s\S]*?const layouts = \[/m, match => match + extraPrivacy);

// For Performance
const extraPerf = `
      // 3: Hero style performance
      \`export const \${compName}: React.FC<SectionProps> = ({ section }) => (
        <section className="section-global" style={{ background: 'var(--bg-input)', borderRadius: 48, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 40 }}>
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: 24 }}>{section.title}</h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: 40 }}>{section.content}</p>
          </div>
          <div style={{ flex: '1 1 300px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {section.stats?.map((s:any, i:number) => (
              <div key={i} style={{ flex: '1 1 150px', padding: 32, background: 'var(--bg-app)', borderRadius: 24, boxShadow: '\${shadow}' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 8, color: 'var(--brand-primary)' }}>{s.value}</div>
                <div style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      );\`,
`;
content = content.replace(/function getProceduralPerformance\([\s\S]*?const layouts = \[/m, match => match + extraPerf);

fs.writeFileSync(target, content);
console.log("Updated generator!");
