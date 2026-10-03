import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BRAIN_DIR = 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\3279cfc3-0ae6-40ee-8317-20207a3ea428';

async function captureOne(name, w, h, scrollY) {
  const uDir = path.resolve(`tmp_edge_${w}`);
  if (!fs.existsSync(uDir)) fs.mkdirSync(uDir, { recursive: true });

  const edge = spawn(EDGE_BIN, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9255',
    `--user-data-dir=${uDir}`,
    `--window-size=${w},${h}`,
    'http://localhost:3000/'
  ]);

  await new Promise(r => setTimeout(r, 2200));

  try {
    const res = await fetch('http://127.0.0.1:9255/json');
    const tabs = await res.json();
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);

    let id = 1;
    const callbacks = new Map();
    ws.onmessage = (e) => {
      const d = JSON.parse(e.data);
      if (d.id && callbacks.has(d.id)) {
        callbacks.get(d.id)(d);
        callbacks.delete(d.id);
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
    await new Promise(r => setTimeout(r, 800));

    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('pages-stack-section');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      `
    });

    await new Promise(r => setTimeout(r, 1200));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    if (shot?.result?.data) {
      const dest = path.join(BRAIN_DIR, name);
      fs.writeFileSync(dest, Buffer.from(shot.result.data, 'base64'));
      console.log(`Saved: ${name} (${fs.statSync(dest).size} bytes)`);
    }

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    edge.kill();
  }
}

async function main() {
  await captureOne('verified_tablet_768.png', 768, 1024);
  await new Promise(r => setTimeout(r, 1000));
  await captureOne('verified_desktop_1440.png', 1440, 900);
}

main();
