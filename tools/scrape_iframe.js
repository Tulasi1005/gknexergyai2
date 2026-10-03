const fs = require('fs');
const path = require('path');

async function main() {
  const tabsRes = await fetch('http://127.0.0.1:9222/json');
  const tabs = await tabsRes.json();
  console.log('All tabs/frames:');
  tabs.forEach(t => console.log(`- [${t.type}] ${t.id}: ${t.title || t.url}`));

  // Find the static frame target
  let staticTab = tabs.find(t => t.url && t.url.includes('preview.static.emergentagent.com'));
  if (!staticTab) {
    // If not found, find any iframe or non-page target
    staticTab = tabs.find(t => t.title && t.title.includes('Nexergy'));
  }

  if (!staticTab) {
    console.error('Static app target not found!');
    return;
  }

  console.log('\nConnecting to real app target:', staticTab.id, staticTab.url);
  const ws = new WebSocket(staticTab.webSocketDebuggerUrl);
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
  console.log('Connected to App WebSocket!');

  async function evaluate(fnString) {
    const res = await send('Runtime.evaluate', {
      expression: `(${fnString})()`,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result && res.result.result ? res.result.result.value : null;
  }

  const check = await evaluate(`() => {
    return {
      title: document.title,
      url: window.location.href,
      htmlLen: document.documentElement.outerHTML.length,
      links: Array.from(document.querySelectorAll('a')).map(a => ({ href: a.getAttribute('href'), text: (a.innerText || '').trim() })),
      h1s: Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim()),
      h2s: Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim())
    };
  }`);

  console.log('App Target Check:', check);

  // Now crawl all internal links
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

  const outDir = path.join(__dirname, '..', 'scraped_pages');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const allPagesData = {};

  for (const route of targetRoutes) {
    console.log(`\n=== Crawling route: ${route} ===`);
    // Navigate inside the React app
    await evaluate(`() => {
      // Find matching anchor tag first
      const links = Array.from(document.querySelectorAll('a'));
      const targetLink = links.find(a => a.getAttribute('href') === '${route}');
      if (targetLink) {
        targetLink.click();
      } else {
        window.history.pushState({}, '', '${route}');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }`);

    await new Promise(r => setTimeout(r, 1200));

    const pageInfo = await evaluate(`() => {
      // Gather fonts
      const fonts = Array.from(document.fonts || []).map(f => ({
        family: f.family,
        weight: f.weight,
        style: f.style
      }));

      // Gather elements typography and layout
      const elements = [];
      const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button', 'input', 'label', 'li', 'nav', 'header', 'footer', 'section'];
      document.querySelectorAll(tags.join(',')).forEach((el, idx) => {
        if (idx > 250) return;
        const text = (el.innerText || '').trim();
        if (!text && !['section', 'header', 'footer', 'nav'].includes(el.tagName.toLowerCase())) return;
        const s = window.getComputedStyle(el);
        elements.push({
          tag: el.tagName.toLowerCase(),
          id: el.id,
          className: el.className,
          text: text.substring(0, 120).replace(/\\s+/g, ' '),
          fontFamily: s.fontFamily,
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          lineHeight: s.lineHeight,
          letterSpacing: s.letterSpacing,
          color: s.color,
          backgroundColor: s.backgroundColor,
          padding: s.padding,
          borderRadius: s.borderRadius
        });
      });

      // Gather images
      const images = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt,
        className: img.className
      }));

      return {
        url: window.location.href,
        pathname: window.location.pathname,
        title: document.title,
        metaDesc: document.querySelector('meta[name="description"]')?.content || '',
        fonts,
        elements,
        images,
        html: document.documentElement.outerHTML
      };
    }`);

    if (pageInfo) {
      console.log(`✓ Scraped [${route}]: Title="${pageInfo.title}", Elements=${pageInfo.elements.length}, Images=${pageInfo.images.length}`);
      const filename = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '__');
      fs.writeFileSync(path.join(outDir, `${filename}.html`), pageInfo.html);
      delete pageInfo.html;
      fs.writeFileSync(path.join(outDir, `${filename}.json`), JSON.stringify(pageInfo, null, 2));
      allPagesData[route] = pageInfo;
    }
  }

  fs.writeFileSync(path.join(outDir, 'all_routes_summary.json'), JSON.stringify(allPagesData, null, 2));
  console.log('\nAll pages crawled successfully!');
  ws.close();
}

main().catch(console.error);
