const fs = require('fs');
const path = require('path');

async function main() {
  const tabsRes = await fetch('http://127.0.0.1:9222/json');
  const tabs = await tabsRes.json();
  const staticTab = tabs.find(t => t.url && t.url.includes('preview.static.emergentagent.com')) || tabs.find(t => t.title && t.title.includes('Nexergy'));

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

  async function evaluate(fnString) {
    const res = await send('Runtime.evaluate', {
      expression: `(${fnString})()`,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result && res.result.result ? res.result.result.value : null;
  }

  const mapData = await evaluate(`async () => {
    try {
      const res = await fetch('/pod-backups/nexergy-solutions/build/static/js/main.ba65d180.js.map');
      if (!res.ok) return { error: res.status };
      const json = await res.json();
      return {
        sources: json.sources,
        sourcesContentLength: json.sourcesContent ? json.sourcesContent.length : 0,
        hasSourcesContent: !!json.sourcesContent
      };
    } catch (e) {
      return { error: e.message };
    }
  }`);

  console.log('Source map result:', mapData);

  if (mapData && mapData.hasSourcesContent) {
    console.log('Fetching full source map to extract exact original source code...');
    const fullMap = await evaluate(`async () => {
      const res = await fetch('/pod-backups/nexergy-solutions/build/static/js/main.ba65d180.js.map');
      return await res.json();
    }`);

    if (fullMap && fullMap.sources && fullMap.sourcesContent) {
      const extractedSrcDir = path.join(__dirname, '..', 'original_source');
      for (let i = 0; i < fullMap.sources.length; i++) {
        const srcPath = fullMap.sources[i];
        const content = fullMap.sourcesContent[i];
        if (content) {
          // Clean path
          const cleanPath = srcPath.replace(/^webpack:\/\/[^\/]*\//, '').replace(/^webpack:\/\//, '');
          const targetFile = path.join(extractedSrcDir, cleanPath);
          fs.mkdirSync(path.dirname(targetFile), { recursive: true });
          fs.writeFileSync(targetFile, content);
        }
      }
      console.log('Successfully extracted all original source files into original_source/ !');
    }
  }

  ws.close();
}

main().catch(console.error);
