const fs = require('fs');

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

  await new Promise((resolve) => {
    ws.onopen = resolve;
  });

  console.log('WebSocket connected');

  async function evaluateInBrowser(fnString) {
    const res = await send('Runtime.evaluate', {
      expression: `(${fnString})()`,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.result && res.result.result) {
      return res.result.result.value;
    }
    console.error('Eval error:', JSON.stringify(res));
    return null;
  }

  // Get current page data
  const pageData = await evaluateInBrowser(`() => {
    const links = Array.from(document.querySelectorAll('a')).map(a => ({
      href: a.getAttribute('href') || a.href,
      text: a.innerText.trim(),
      className: a.className
    }));

    const stylesheets = Array.from(document.styleSheets).map(sheet => {
      try {
        return Array.from(sheet.cssRules).map(r => r.cssText).join('\\n');
      } catch (e) {
        return sheet.href ? 'External: ' + sheet.href : '';
      }
    });

    const fonts = Array.from(document.fonts || []).map(f => ({
      family: f.family,
      weight: f.weight,
      style: f.style,
      status: f.status
    }));

    // Computed styles for sample elements
    const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, a, button, span, div[class*="font-"]')).slice(0, 50).map(el => {
      const s = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        text: el.innerText.substring(0, 30),
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        color: s.color,
        className: el.className
      };
    });

    return {
      url: window.location.href,
      title: document.title,
      links,
      fonts,
      elements,
      html: document.documentElement.outerHTML
    };
  }`);

  fs.writeFileSync('site_foundation_program.json', JSON.stringify(pageData, null, 2));
  fs.writeFileSync('site_foundation_program.html', pageData.html);
  console.log('Saved site_foundation_program.json and .html');

  // Now let's navigate to home page '/' and capture home page
  console.log('Navigating to home page...');
  await send('Page.navigate', { url: 'https://nexergy-solutions.preview.emergentagent.com/' });
  await new Promise(r => setTimeout(r, 4000));

  const homeData = await evaluateInBrowser(`() => {
    const links = Array.from(document.querySelectorAll('a')).map(a => ({
      href: a.getAttribute('href') || a.href,
      text: a.innerText.trim(),
      className: a.className
    }));

    const fonts = Array.from(document.fonts || []).map(f => ({
      family: f.family,
      weight: f.weight,
      style: f.style,
      status: f.status
    }));

    const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, a, button, span')).slice(0, 60).map(el => {
      const s = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        text: el.innerText.substring(0, 30),
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        color: s.color,
        className: el.className
      };
    });

    return {
      url: window.location.href,
      title: document.title,
      links,
      fonts,
      elements,
      html: document.documentElement.outerHTML
    };
  }`);

  fs.writeFileSync('site_home.json', JSON.stringify(homeData, null, 2));
  fs.writeFileSync('site_home.html', homeData.html);
  console.log('Saved site_home.json and .html');

  ws.close();
}

main().catch(console.error);
