import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BRAIN_DIR = 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\3279cfc3-0ae6-40ee-8317-20207a3ea428';

async function captureViewport(name, width, height, scrollTarget) {
  const userDir = path.resolve(`tmp_edge_${width}_${height}`);
  if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

  const port = 9300 + Math.floor(Math.random() * 50);

  const edge = spawn(EDGE_BIN, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDir}`,
    `--window-size=${width},${height}`,
    'http://localhost:3000/'
  ]);

  try {
    let tabs = null;
    for (let attempt = 0; attempt < 15; attempt++) {
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json`);
        tabs = await res.json();
        if (tabs && tabs.length > 0) break;
      } catch (e) {
        await new Promise(r => setTimeout(r, 400));
      }
    }

    if (!tabs || tabs.length === 0) {
      console.error(`Could not connect to Edge on port ${port}`);
      return;
    }

    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
    let id = 1;
    const callbacks = new Map();
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.id && callbacks.has(data.id)) {
        callbacks.get(data.id)(data);
        callbacks.delete(data.id);
      }
    };

    await new Promise(r => ws.onopen = r);
    const send = (method, params = {}) => new Promise(resolve => {
      const reqId = id++;
      callbacks.set(reqId, resolve);
      ws.send(JSON.stringify({ id: reqId, method, params }));
    });

    await send('Page.enable');
    await send('Runtime.enable');
    await new Promise(r => setTimeout(r, 1000));

    if (scrollTarget === 'section') {
      await send('Runtime.evaluate', {
        expression: `
          const el = document.getElementById('pages-stack-section');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        `
      });
    } else if (typeof scrollTarget === 'number') {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${scrollTarget})` });
    }

    await new Promise(r => setTimeout(r, 1500));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    if (shot?.result?.data) {
      const dest = path.join(BRAIN_DIR, name);
      fs.writeFileSync(dest, Buffer.from(shot.result.data, 'base64'));
      console.log(`SUCCESS: Captured ${name} (${fs.statSync(dest).size} bytes)`);
    }

    ws.close();
  } catch (err) {
    console.error(`Error capturing ${name}:`, err);
  } finally {
    edge.kill();
  }
}

async function main() {
  await captureViewport('verified_tablet_768_nav_stack.png', 768, 1024, 'section');
  await new Promise(r => setTimeout(r, 1000));
  await captureViewport('verified_desktop_1440_nav_stack.png', 1440, 900, 'section');
}

main();
