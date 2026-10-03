import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const USER_DATA_DIR = path.resolve('tmp_edge_resp_profile');
const BRAIN_DIR = 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\3279cfc3-0ae6-40ee-8317-20207a3ea428';

if (!fs.existsSync(USER_DATA_DIR)) {
  fs.mkdirSync(USER_DATA_DIR, { recursive: true });
}

async function run() {
  console.log('--- Testing Responsive Viewports on http://localhost:3001/home ---');

  const edgeProcess = spawn(EDGE_BIN, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9226',
    `--user-data-dir=${USER_DATA_DIR}`,
    'http://localhost:3001/home'
  ]);

  await new Promise(r => setTimeout(r, 3000));

  try {
    const res = await fetch('http://127.0.0.1:9226/json');
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

    const viewports = [
      { name: 'resp_mobile_375.png', w: 375, h: 812, mobile: true },
      { name: 'resp_tablet_768.png', w: 768, h: 1024, mobile: false },
      { name: 'resp_desktop_1440.png', w: 1440, h: 900, mobile: false },
    ];

    for (const vp of viewports) {
      console.log(`Setting viewport ${vp.w}x${vp.h}...`);
      await sendCDP('Emulation.setDeviceMetricsOverride', {
        width: vp.w,
        height: vp.h,
        deviceScaleFactor: 1,
        mobile: vp.mobile,
      });

      await new Promise(r => setTimeout(r, 1000));

      await evaluate(`
        const el = document.getElementById('pages-stack-section');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      `);

      await new Promise(r => setTimeout(r, 1000));
      await capture(vp.name);
    }

    ws.close();
  } catch (err) {
    console.error('Error during responsive test:', err);
  } finally {
    edgeProcess.kill();
  }
}

run();
