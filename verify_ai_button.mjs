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
    '--remote-debugging-port=9236',
    `--user-data-dir=${USER_DATA_DIR}`,
    'http://localhost:3002/home'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  
  const res = await fetch('http://127.0.0.1:9236/json');
  const tabs = await res.json();
  const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);

  let id = 1;
  const callbacks = new Map();
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.method === 'Runtime.consoleAPICalled') {
      console.log('CONSOLE:', data.params.type, data.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' '));
    }
    if (data.method === 'Runtime.exceptionThrown') {
      console.log('EXCEPTION:', data.params.exceptionDetails);
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
  await send('Page.navigate', { url: 'http://localhost:3002/home' });
  await new Promise(r => setTimeout(r, 3000));

  const screenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('floating_ai_assistant_preview.png', Buffer.from(screenshot.result.data, 'base64'));

  // Get DOM button elements count
  const evalRes = await send('Runtime.evaluate', {
    expression: `document.querySelectorAll('button').length`
  });
  console.log("Buttons found on page:", evalRes.result?.value);

  // Take cropped screenshot of the bottom right corner:
  const clipScreenshot = await send('Page.captureScreenshot', {
    format: 'png',
    clip: {
      x: 1440 - 280,
      y: 900 - 220,
      width: 280,
      height: 220,
      scale: 1
    }
  });
  fs.writeFileSync('floating_buttons_zoom.png', Buffer.from(clipScreenshot.result.data, 'base64'));
  console.log("Done");

  edge.kill();
}

run();
