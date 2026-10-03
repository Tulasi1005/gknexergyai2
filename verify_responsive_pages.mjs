import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const USER_DATA_DIR = path.resolve('tmp_edge_snap');

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

async function capture() {
  for (const vp of viewports) {
    const edge = spawn(EDGE_BIN, [
      '--headless=new',
      '--disable-gpu',
      `--window-size=${vp.width},${vp.height}`,
      '--remote-debugging-port=9245',
      `--user-data-dir=${USER_DATA_DIR}`,
      'http://localhost:3002/careers'
    ]);

    await new Promise(r => setTimeout(r, 2000));
    
    const res = await fetch('http://127.0.0.1:9245/json');
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
    await send('Page.navigate', { url: 'http://localhost:3002/careers' });
    await new Promise(r => setTimeout(r, 2000));

    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`careers_${vp.name}_preview.png`, Buffer.from(screenshot.result.data, 'base64'));
    console.log(`Saved careers_${vp.name}_preview.png`);

    edge.kill();
    await new Promise(r => setTimeout(r, 1000));
  }
}

capture();
