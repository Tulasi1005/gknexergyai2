import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACTS_DIR = 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\3279cfc3-0ae6-40ee-8317-20207a3ea428';

async function main() {
  const userDir = path.resolve('tmp_edge_snap');
  if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

  const cdpPort = 9522;
  const edge = spawn(EDGE_BIN, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${userDir}`,
    '--window-size=1440,900',
    'http://localhost:3002/home'
  ]);

  try {
    let tabs = null;
    for (let i = 0; i < 25; i++) {
      try {
        const res = await fetch(`http://127.0.0.1:${cdpPort}/json`);
        tabs = await res.json();
        if (tabs && tabs.length > 0) break;
      } catch(e) {
        await new Promise(r => setTimeout(r, 200));
      }
    }

    if (!tabs || tabs.length === 0) {
      console.log('NO_TABS');
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

    await new Promise(r => setTimeout(r, 2000));

    // Scroll to section
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('pages-stack-section');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      `
    });

    await new Promise(r => setTimeout(r, 1000));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    if (shot?.result?.data) {
      const dest = path.join(ARTIFACTS_DIR, 'verified_nav_stack_now_visible.png');
      fs.writeFileSync(dest, Buffer.from(shot.result.data, 'base64'));
      console.log('SUCCESS_WRITTEN_TO:', dest);
    }

    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    edge.kill();
  }
}

main();
