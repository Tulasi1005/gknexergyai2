const fs = require('fs');
const path = require('path');

const routes = [
  '/',
  '/about',
  '/vision',
  '/why-gk-nexergy',
  '/industries',
  '/projects',
  '/careers',
  '/contact',
  '/academy',
  '/academy/courses',
  '/academy/foundation-program',
  '/academy/cyber-security',
  '/academy/ai-digital-marketing',
  '/academy/databases',
  '/solutions/software-development',
  '/solutions/mobile-development',
  '/solutions/digital-transformation',
  '/solutions/ai-automation',
  '/solutions/data-analytics',
  '/solutions/digital-growth'
];

async function main() {
  const tabsRes = await fetch('http://127.0.0.1:9222/json');
  const tabs = await tabsRes.json();
  const pageTab = tabs.find(t => t.url.includes('nexergy-solutions.preview.emergentagent.com') && t.type === 'page');
  if (!pageTab) {
    console.error('No nexergy tab found');
    return;
  }
  console.log('Connecting to:', pageTab.title, pageTab.url);

  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();
  
  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.id && pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
    }
  };

  const send = (method, params = {}) => {
    return new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  };

  await new Promise((resolve) => { ws.onopen = resolve; });
  console.log('Connected to CDP');

  async function evaluate(fnString) {
    const res = await send('Runtime.evaluate', {
      expression: `(${fnString})()`,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.result && res.result.result) {
      return res.result.result.value;
    }
    return null;
  }

  const outDir = path.join(__dirname, '..', 'scraped_pages');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const allPageData = {};

  for (const route of routes) {
    console.log(`Navigating to ${route}...`);
    await evaluate(`() => {
      window.history.pushState({}, '', '${route}');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo(0, 0);
    }`);
    
    await new Promise(r => setTimeout(r, 1200));

    const pageInfo = await evaluate(`() => {
      // Find all loaded fonts
      const fonts = Array.from(document.fonts || []).map(f => ({
        family: f.family,
        weight: f.weight,
        style: f.style
      }));

      // Gather distinct font families, weights and elements
      const elementsSummary = [];
      const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button', 'input', 'textarea', 'label', 'li'];
      tags.forEach(tag => {
        const els = Array.from(document.querySelectorAll(tag));
        els.slice(0, 8).forEach(el => {
          const s = window.getComputedStyle(el);
          elementsSummary.push({
            tag,
            text: (el.innerText || '').substring(0, 40).replace(/\\n/g, ' '),
            fontFamily: s.fontFamily,
            fontSize: s.fontSize,
            fontWeight: s.fontWeight,
            lineHeight: s.lineHeight,
            letterSpacing: s.letterSpacing,
            color: s.color,
            backgroundColor: s.backgroundColor,
            className: el.className
          });
        });
      });

      return {
        url: window.location.href,
        pathname: window.location.pathname,
        title: document.title,
        metaDesc: document.querySelector('meta[name="description"]')?.content || '',
        fonts,
        elementsSummary,
        html: document.documentElement.outerHTML
      };
    }`);

    if (pageInfo) {
      const filename = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_');
      fs.writeFileSync(path.join(outDir, `${filename}.html`), pageInfo.html);
      delete pageInfo.html;
      allPageData[route] = pageInfo;
      console.log(`✓ Scraped ${route} -> ${pageInfo.title}`);
    } else {
      console.error(`✗ Failed to scrape ${route}`);
    }
  }

  // Also extract global styles, CSS variables, theme config
  const globalStyles = await evaluate(`() => {
    const rootStyles = window.getComputedStyle(document.documentElement);
    const bodyStyles = window.getComputedStyle(document.body);
    const customProps = {};
    for (let i = 0; i < document.styleSheets.length; i++) {
      try {
        const sheet = document.styleSheets[i];
        for (let j = 0; j < sheet.cssRules.length; j++) {
          const rule = sheet.cssRules[j];
          if (rule.selectorText === ':root' || rule.selectorText === 'body') {
            for (let k = 0; k < rule.style.length; k++) {
              const name = rule.style[k];
              customProps[name] = rule.style.getPropertyValue(name);
            }
          }
        }
      } catch (e) {}
    }

    return {
      bodyFontFamily: bodyStyles.fontFamily,
      bodyColor: bodyStyles.color,
      bodyBg: bodyStyles.backgroundColor,
      customProps
    };
  }`);

  fs.writeFileSync(path.join(outDir, 'metadata.json'), JSON.stringify({ routes: allPageData, globalStyles }, null, 2));
  console.log('Saved all scraped pages and metadata.json!');

  ws.close();
}

main().catch(console.error);
