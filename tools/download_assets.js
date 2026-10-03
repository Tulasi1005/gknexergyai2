const fs = require('fs');
const path = require('path');

async function main() {
  const tabsRes = await fetch('http://127.0.0.1:9222/json');
  const tabs = await tabsRes.json();
  const staticTab = tabs.find(t => t.url && t.url.includes('preview.static.emergentagent.com')) || tabs.find(t => t.title && t.title.includes('Nexergy'));
  if (!staticTab) {
    console.error('Target tab not found');
    return;
  }

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
  console.log('Connected to CDP');

  async function evaluate(fnString) {
    const res = await send('Runtime.evaluate', {
      expression: `(${fnString})()`,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result && res.result.result ? res.result.result.value : null;
  }

  // Fetch the css file and js bundle directly from within the browser page!
  const assets = await evaluate(`async () => {
    const cssHref = document.querySelector('link[rel="stylesheet"][href*="main"]')?.href;
    const jsSrc = document.querySelector('script[src*="main"]')?.src;
    
    let cssContent = '';
    let jsContent = '';
    
    if (cssHref) {
      const res = await fetch(cssHref);
      cssContent = await res.text();
    }
    
    if (jsSrc) {
      const res = await fetch(jsSrc);
      jsContent = await res.text();
    }
    
    return {
      cssHref,
      cssLength: cssContent.length,
      cssContent,
      jsSrc,
      jsLength: jsContent.length,
      jsContent
    };
  }`);

  console.log('Assets downloaded:');
  console.log('- CSS Href:', assets.cssHref, 'Length:', assets.cssLength);
  console.log('- JS Src:', assets.jsSrc, 'Length:', assets.jsLength);

  const outDir = path.join(__dirname, '..', 'extracted_assets');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  if (assets.cssContent) {
    fs.writeFileSync(path.join(outDir, 'main.css'), assets.cssContent);
  }
  if (assets.jsContent) {
    fs.writeFileSync(path.join(outDir, 'main.js'), assets.jsContent);
  }

  console.log('Saved extracted_assets/main.css and main.js');
  ws.close();
}

main().catch(console.error);
