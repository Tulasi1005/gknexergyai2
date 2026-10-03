import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const USER_DATA_DIR = path.resolve('tmp_edge_snap');

async function run() {
  const edge = spawn(EDGE_BIN, [
    '--headless=new',
    '--disable-gpu',
    '--window-size=1440,900',
    '--remote-debugging-port=9241',
    `--user-data-dir=${USER_DATA_DIR}`,
    'http://localhost:3002/about'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  
  const res = await fetch('http://127.0.0.1:9241/json');
  const tabs = await res.json();
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
  await send('Page.navigate', { url: 'http://localhost:3002/about' });
  await new Promise(r => setTimeout(r, 2500));

  // Click the back to stack button
  const clickRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('[data-testid="back-to-stack-link"]') || document.querySelector('[data-testid="nav-stack-btn"]');
      if (btn) {
        btn.click();
        return "Clicked back to stack button!";
      }
      return "Button not found";
    })()`,
    returnByValue: true
  });
  console.log("Click result:", clickRes.result?.value);

  await new Promise(r => setTimeout(r, 2000));

  const screenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('navigated_to_stack_preview.png', Buffer.from(screenshot.result.data, 'base64'));
  console.log("Screenshot saved to navigated_to_stack_preview.png");

  edge.kill();
}

run();
