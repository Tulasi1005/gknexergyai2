import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const USER_DATA_DIR = path.resolve('tmp_edge_verify_resp');
const BRAIN_DIR = 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\3279cfc3-0ae6-40ee-8317-20207a3ea428';

if (!fs.existsSync(USER_DATA_DIR)) {
  fs.mkdirSync(USER_DATA_DIR, { recursive: true });
}

async function run() {
  console.log('--- Verifying Responsive Views on Port 3000 ---');

  const edgeProcess = spawn(EDGE_BIN, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9230',
    `--user-data-dir=${USER_DATA_DIR}`,
    'http://localhost:3000/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const res = await fetch('http://127.0.0.1:9230/json');
    const tabs = await res.json();
    const pageTab = tabs.find(t => t.type === 'page') || tabs[0];

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        callbacks.get(msg.id)(msg);
        callbacks.delete(msg.id);
      }
    };

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    const sendCDP = (method, params = {}) => {
      return new Promise((resolve) => {
        const reqId = id++;
        callbacks.set(reqId, resolve);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });
    };

    const evaluate = async (expression) => {
      const resp = await sendCDP('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true,
      });
      return resp?.result?.result?.value !== undefined ? resp.result.result.value : null;
    };

    const capture = async (name) => {
      const res = await sendCDP('Page.captureScreenshot', { format: 'png' });
      if (res && res.result && res.result.data) {
        const brainDest = path.join(BRAIN_DIR, name);
        fs.writeFileSync(brainDest, Buffer.from(res.result.data, 'base64'));
        console.log(`Saved screenshot: ${name}`);
      }
    };

    await sendCDP('Page.enable');
    await sendCDP('Runtime.enable');

    // 1. MOBILE HERO CAPABILITY STACK (375x812)
    console.log('Capturing Mobile Hero (375px)...');
    await sendCDP('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await new Promise(r => setTimeout(r, 1000));
    await evaluate(`window.scrollTo(0, 0)`);
    await new Promise(r => setTimeout(r, 600));
    // scroll down slightly to focus on hero card deck on mobile
    await evaluate(`window.scrollTo(0, 480)`);
    await new Promise(r => setTimeout(r, 600));
    await capture('mobile_hero_deck_375.png');

    // 2. MOBILE NAV PAGES STACK (375x812)
    console.log('Capturing Mobile Nav Pages Stack (375px)...');
    await evaluate(`
      const el = document.getElementById('pages-stack-section');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    `);
    await new Promise(r => setTimeout(r, 800));
    await capture('mobile_nav_stack_375.png');

    // 3. TABLET NAV PAGES STACK (768x1024)
    console.log('Capturing Tablet Nav Pages Stack (768px)...');
    await sendCDP('Emulation.setDeviceMetricsOverride', {
      width: 768,
      height: 1024,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await new Promise(r => setTimeout(r, 800));
    await evaluate(`
      const el = document.getElementById('pages-stack-section');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    `);
    await new Promise(r => setTimeout(r, 800));
    await capture('tablet_nav_stack_768.png');

    // 4. DESKTOP NAV PAGES STACK (1440x900)
    console.log('Capturing Desktop Nav Pages Stack (1440px)...');
    await sendCDP('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await new Promise(r => setTimeout(r, 800));
    await evaluate(`
      const el = document.getElementById('pages-stack-section');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    `);
    await new Promise(r => setTimeout(r, 800));
    await capture('desktop_nav_stack_1440.png');

    console.log('All responsive captures finished successfully!');
    ws.close();
  } catch (err) {
    console.error('Error in verification:', err);
  } finally {
    edgeProcess.kill();
  }
}

run();
