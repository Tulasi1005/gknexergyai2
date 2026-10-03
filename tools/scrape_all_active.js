const fs = require('fs');
const path = require('path');

const targetRoutes = [
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
  const pageTab = tabs.find(t => t.url.includes('nexergy-solutions') && t.type === 'page');
  if (!pageTab) {
    console.error('No tab found');
    return;
  }

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
  const send = (method, params = {}) => new Promise(res => {
    const msgId = id++;
    pending.set(msgId, res);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await new Promise(r => ws.onopen = r);
  console.log('Connected to CDP');

  // Navigate to foundation program to ensure full React bundle is running
  console.log('Initializing React app...');
  await send('Page.navigate', { url: 'https://nexergy-solutions.preview.emergentagent.com/academy/foundation-program' });
  await new Promise(r => setTimeout(r, 4000));

  async function evaluate(fnString) {
    const res = await send('Runtime.evaluate', {
      expression: `(${fnString})()`,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result && res.result.result ? res.result.result.value : null;
  }

  const outDir = path.join(__dirname, '..', 'scraped_pages');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const results = {};

  for (const route of targetRoutes) {
    console.log(`\n--- Loading route: ${route} ---`);
    
    // Use React Router link click or history navigation with react-router listener
    const navResult = await evaluate(`() => {
      // Try finding link first
      const links = Array.from(document.querySelectorAll('a'));
      const targetLink = links.find(a => {
        const h = a.getAttribute('href');
        return h === '${route}' || (h && h.endsWith('${route}') && !h.startsWith('http'));
      });
      if (targetLink) {
        targetLink.click();
        return 'Clicked link: ' + targetLink.getAttribute('href');
      }
      // Fallback: pushState + dispatch popstate
      window.history.pushState({}, '', '${route}');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return 'Dispatched popstate to ${route}';
    }`);
    console.log('Nav result:', navResult);

    // Wait for content render
    await new Promise(r => setTimeout(r, 1500));

    // Extract detailed DOM, styles, and typography
    const pageData = await evaluate(`() => {
      // Get all typography and elements
      const elements = [];
      const selectors = 'h1, h2, h3, h4, h5, h6, p, a, button, span, nav, header, footer, section, div[class*="text-"], div[class*="bg-"]';
      document.querySelectorAll(selectors).forEach((el, idx) => {
        if (idx > 200) return;
        const text = (el.innerText || '').trim();
        if (!text && !el.tagName.toLowerCase().match(/section|header|footer|nav/)) return;
        const style = window.getComputedStyle(el);
        elements.push({
          tag: el.tagName.toLowerCase(),
          id: el.id,
          className: el.className,
          text: text.substring(0, 100).replace(/\\s+/g, ' '),
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
          color: style.color,
          backgroundColor: style.backgroundColor,
          padding: style.padding,
          margin: style.margin,
          border: style.border,
          borderRadius: style.borderRadius,
          boxShadow: style.boxShadow,
          display: style.display,
          flexDirection: style.flexDirection,
          gap: style.gap
        });
      });

      // Get all images
      const images = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt,
        className: img.className,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height
      }));

      // Get all SVGs
      const svgs = Array.from(document.querySelectorAll('svg')).map((svg, i) => ({
        index: i,
        outerHTML: svg.outerHTML,
        parentTag: svg.parentElement?.tagName,
        parentText: (svg.parentElement?.innerText || '').trim().substring(0, 30)
      }));

      // Get root styles
      const root = window.getComputedStyle(document.documentElement);
      const body = window.getComputedStyle(document.body);

      return {
        url: window.location.href,
        pathname: window.location.pathname,
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.content || '',
        bodyStyles: {
          fontFamily: body.fontFamily,
          backgroundColor: body.backgroundColor,
          color: body.color
        },
        elementsCount: elements.length,
        elements,
        images,
        svgsCount: svgs.length,
        html: document.documentElement.outerHTML
      };
    }`);

    if (pageData) {
      console.log(`Page: ${pageData.title} | Path: ${pageData.pathname} | Elements: ${pageData.elementsCount} | Images: ${pageData.images.length}`);
      const filename = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '__');
      fs.writeFileSync(path.join(outDir, `${filename}.html`), pageData.html);
      delete pageData.html;
      fs.writeFileSync(path.join(outDir, `${filename}.json`), JSON.stringify(pageData, null, 2));
      results[route] = pageData;
    }
  }

  // Also dump all CSS stylesheets found in the document
  const cssRules = await evaluate(`() => {
    const allCss = [];
    for (let i = 0; i < document.styleSheets.length; i++) {
      try {
        const sheet = document.styleSheets[i];
        let rulesText = '';
        for (let j = 0; j < sheet.cssRules.length; j++) {
          rulesText += sheet.cssRules[j].cssText + '\\n';
        }
        allCss.push({
          href: sheet.href || 'inline-' + i,
          rulesText
        });
      } catch (e) {
        allCss.push({ href: sheet.href, error: e.message });
      }
    }
    return allCss;
  }`);

  fs.writeFileSync(path.join(outDir, 'all_stylesheets.json'), JSON.stringify(cssRules, null, 2));
  fs.writeFileSync(path.join(outDir, 'all_routes_summary.json'), JSON.stringify(results, null, 2));
  console.log('\n=========================================');
  console.log('Successfully crawled and exported all routes and styles!');
  console.log('=========================================');

  ws.close();
}

main().catch(console.error);
