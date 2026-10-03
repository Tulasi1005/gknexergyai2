import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userDir = path.resolve('tmp_edge_vis_test');
if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

const edge = spawn(EDGE_BIN, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9298',
  '--user-data-dir=' + userDir,
  '--window-size=1440,900',
  'http://localhost:3002/'
]);

async function main() {
  try {
    let tabs = null;
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch('http://127.0.0.1:9298/json');
        tabs = await res.json();
        if (tabs && tabs.length > 0) break;
      } catch (e) {
        await new Promise(r => setTimeout(r, 400));
      }
    }

    if (!tabs || !tabs[0]) {
      console.log('NO_TABS');
      return;
    }

    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
    let id = 1;
    const callbacks = new Map();
    const logs = [];

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.method === 'Runtime.consoleAPICalled') {
        logs.push(data.params);
      }
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
    await send('Console.enable');

    await new Promise(r => setTimeout(r, 2000));

    // Check if element exists and inspect styles
    const checkEl = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('pages-stack-section');
          if (!el) return { exists: false };
          const rect = el.getBoundingClientRect();
          const computed = window.getComputedStyle(el);
          return {
            exists: true,
            display: computed.display,
            visibility: computed.visibility,
            opacity: computed.opacity,
            height: rect.height,
            width: rect.width,
            top: rect.top + window.scrollY,
            cardsCount: el.querySelectorAll('[role="link"], .cursor-pointer').length,
            innerHTMLSnippet: el.innerHTML.slice(0, 300)
          };
        })()
      `,
      returnByValue: true
    });

    console.log('ELEMENT STATUS:', JSON.stringify(checkEl?.result?.value, null, 2));

    // Scroll to it
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('pages-stack-section');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });

    await new Promise(r => setTimeout(r, 1000));

    // Capture screenshot
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    if (shot?.result?.data) {
      const outPath = 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\3279cfc3-0ae6-40ee-8317-20207a3ea428\\current_live_stack_shot.png';
      fs.writeFileSync(outPath, Buffer.from(shot.result.data, 'base64'));
      console.log('Saved screenshot to', outPath);
    }

    ws.close();
  } catch (err) {
    console.error('Error in test:', err);
  } finally {
    edge.kill();
  }
}

main();
