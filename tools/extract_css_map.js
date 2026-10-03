const fs = require('fs');

async function test() {
  const tabsRes = await fetch('http://127.0.0.1:9222/json');
  const tabs = await tabsRes.json();
  const staticTab = tabs.find(t => t.url && t.url.includes('preview.static.emergentagent.com')) || tabs.find(t => t.title && t.title.includes('Nexergy'));
  if (!staticTab) { console.log('No tab'); return; }
  const ws = new WebSocket(staticTab.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);
  let id = 1;
  const send = (method, params = {}) => new Promise(res => {
    const msgId = id++;
    const handler = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id === msgId) {
        ws.removeEventListener('message', handler);
        res(data);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  const res = await send('Runtime.evaluate', {
    expression: `(async () => {
      const cssLink = document.querySelector('link[rel="stylesheet"][href*="main"]')?.href;
      if (!cssLink) return 'no css link';
      const mapUrl = cssLink + '.map';
      const r = await fetch(mapUrl);
      if (r.ok) {
        const json = await r.json();
        return { mapUrl, sources: json.sources, hasSourcesContent: !!json.sourcesContent, sourcesContentLength: json.sourcesContent?.length };
      }
      return { mapUrl, status: r.status, ok: r.ok };
    })()`,
    returnByValue: true,
    awaitPromise: true
  });

  console.log('CSS Map Check:', res.result?.result?.value);

  if (res.result?.result?.value?.hasSourcesContent) {
    const fullCssMap = await send('Runtime.evaluate', {
      expression: `(async () => {
        const cssLink = document.querySelector('link[rel="stylesheet"][href*="main"]')?.href;
        const r = await fetch(cssLink + '.map');
        return await r.json();
      })()`,
      returnByValue: true,
      awaitPromise: true
    });
    const map = fullCssMap.result.result.value;
    console.log('Sources in CSS map:', map.sources);
    for (let i = 0; i < map.sources.length; i++) {
      const src = map.sources[i];
      const content = map.sourcesContent[i];
      console.log('Source:', src, 'Content length:', content?.length);
      const cleanPath = src.replace(/^webpack:\/\/[^\/]*\//, '').replace(/^webpack:\/\//, '');
      const targetFile = path.join(__dirname, '..', 'original_source', cleanPath);
      fs.mkdirSync(path.dirname(targetFile), { recursive: true });
      fs.writeFileSync(targetFile, content);
    }
    console.log('Extracted CSS files!');
  }

  ws.close();
}

test().catch(console.error);
