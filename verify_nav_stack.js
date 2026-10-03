import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const USER_DATA_DIR = path.resolve('tmp_edge_verify_profile');
const BRAIN_DIR = 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\3279cfc3-0ae6-40ee-8317-20207a3ea428';

if (!fs.existsSync(USER_DATA_DIR)) {
  fs.mkdirSync(USER_DATA_DIR, { recursive: true });
}

async function run() {
  console.log('--- Verifying NavPagesStack Section via Edge CDP ---');

  const edgeProcess = spawn(EDGE_BIN, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9225',
    `--user-data-dir=${USER_DATA_DIR}`,
    'http://localhost:3000/'
  ]);

  await new Promise(r => setTimeout(r, 3000));

  try {
    const res = await fetch('http://127.0.0.1:9225/json');
    const tabs = await res.json();
    const pageTab = tabs.find(t => t.type === 'page') || tabs[0];

    if (!pageTab || !pageTab.webSocketDebuggerUrl) {
      throw new Error('Could not find debugging websocket endpoint');
    }

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

    const captureScreenshot = async (filename) => {
      const res = await sendCDP('Page.captureScreenshot', { format: 'png' });
      if (res && res.result && res.result.data) {
        fs.writeFileSync(filename, Buffer.from(res.result.data, 'base64'));
        const brainDest = path.join(BRAIN_DIR, path.basename(filename));
        fs.writeFileSync(brainDest, Buffer.from(res.result.data, 'base64'));
        console.log(`Saved screenshot: ${filename} and copied to ${brainDest}`);
      }
    };

    await sendCDP('Page.enable');
    await sendCDP('Runtime.enable');
    await sendCDP('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 960,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await new Promise(r => setTimeout(r, 2000));

    // Scroll to the new section
    const foundSection = await evaluate(`
      const el = document.getElementById('pages-stack-section');
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
        true;
      } else {
        false;
      }
    `);
    console.log('Section found and scrolled into view:', foundSection);

    await new Promise(r => setTimeout(r, 1200));

    // Capture initial state
    await captureScreenshot('nav_pages_stack_initial.png');

    // Click the directory item for Solutions to bring it to front
    console.log('Clicking Solutions directory item...');
    await evaluate(`
      const items = Array.from(document.querySelectorAll('#pages-stack-section div')).filter(d => d.innerText && d.innerText.includes('Enterprise Solutions'));
      // Find the row
      const row = document.querySelectorAll('#pages-stack-section .group')[2];
      if (row) {
        row.click();
      }
    `);

    await new Promise(r => setTimeout(r, 800));

    // Capture state with Solutions card active in stack
    await captureScreenshot('nav_pages_stack_solutions_hover.png');

    console.log('All verification captures completed successfully!');

    ws.close();
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    edgeProcess.kill();
  }
}

run();
