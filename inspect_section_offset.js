import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const USER_DATA_DIR = path.resolve('tmp_edge_inspect_profile');
const BRAIN_DIR = 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\3279cfc3-0ae6-40ee-8317-20207a3ea428';

async function run() {
  const edge = spawn(EDGE_BIN, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9228',
    `--user-data-dir=${USER_DATA_DIR}`,
    'http://localhost:3001/home'
  ]);

  await new Promise(r => setTimeout(r, 2500));
  const res = await fetch('http://127.0.0.1:9228/json');
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

  const evalRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.getElementById('pages-stack-section');
        if (!el) return { error: 'Not found' };
        const rect = el.getBoundingClientRect();
        return {
          offsetTop: el.offsetTop,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          bodyScrollHeight: document.body.scrollHeight,
          windowInnerWidth: window.innerWidth
        };
      })()
    `,
    returnByValue: true
  });

  console.log('DOM Rect of pages-stack-section on port 3001:', evalRes?.result?.result?.value);
  edge.kill();
}

run();
