import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACTS_DIR = 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\3279cfc3-0ae6-40ee-8317-20207a3ea428';

// Detect which port is responding (3000, 3001, 3002)
async function findActivePort() {
  for (const port of [3000, 3001, 3002]) {
    try {
      const res = await fetch(`http://localhost:${port}/home`);
      if (res.ok) {
        console.log(`Found active server on port ${port}`);
        return port;
      }
    } catch (e) {}
  }
  return 3000;
}

async function captureView(port, name, width, height) {
  const userDir = path.resolve(`tmp_edge_${width}_${height}`);
  if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

  const cdpPort = 9400 + Math.floor(Math.random() * 50);

  const edge = spawn(EDGE_BIN, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${userDir}`,
    `--window-size=${width},${height}`,
    `http://localhost:${port}/home`
  ]);

  try {
    let tabs = null;
    for (let attempt = 0; attempt < 20; attempt++) {
      try {
        const res = await fetch(`http://127.0.0.1:${cdpPort}/json`);
        tabs = await res.json();
        if (tabs && tabs.length > 0) break;
      } catch (e) {
        await new Promise(r => setTimeout(r, 300));
      }
    }

    if (!tabs || tabs.length === 0) {
      console.error(`Could not connect to Edge on port ${cdpPort}`);
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
    await send('Emulation.setDeviceMetricsOverride', {
      width: width,
      height: height,
      deviceScaleFactor: 2,
      mobile: width < 1024
    });

    await new Promise(r => setTimeout(r, 2000));

    // Scroll directly to pages-stack-section
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('pages-stack-section');
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'center' });
        }
      `
    });

    await new Promise(r => setTimeout(r, 1500));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    if (shot?.result?.data) {
      const dest = path.join(ARTIFACTS_DIR, name);
      fs.writeFileSync(dest, Buffer.from(shot.result.data, 'base64'));
      console.log(`[CAPTURED] ${name} (${fs.statSync(dest).size} bytes)`);
    }

    ws.close();
  } catch (err) {
    console.error(`Error capturing ${name}:`, err);
  } finally {
    edge.kill();
  }
}

async function run() {
  const port = await findActivePort();
  console.log(`Using dev server on port ${port}...`);

  await captureView(port, 'live_desktop_output.png', 1440, 950);
  await captureView(port, 'live_tablet_output.png', 768, 1024);
  await captureView(port, 'live_mobile_output.png', 375, 812);
  
  console.log('ALL SCREENSHOTS COMPLETED');
}

run();
