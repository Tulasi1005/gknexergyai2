import { spawn } from 'child_process';
import path from 'path';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const USER_DATA_DIR = path.resolve('tmp_edge_snap');

async function run() {
  const edge = spawn(EDGE_BIN, [
    '--headless=new',
    '--disable-gpu',
    '--window-size=1440,900',
    '--remote-debugging-port=9239',
    `--user-data-dir=${USER_DATA_DIR}`,
    'http://localhost:3002/home'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  
  const res = await fetch('http://127.0.0.1:9239/json');
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
  await send('Page.navigate', { url: 'http://localhost:3002/home' });
  await new Promise(r => setTimeout(r, 3000));

  const result = await send('Runtime.evaluate', {
    expression: `JSON.stringify(Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.innerText,
      testId: b.getAttribute('data-testid'),
      rect: b.getBoundingClientRect()
    })))`,
    returnByValue: true
  });

  console.log("Raw evaluate result:", result);
  console.log("Buttons parsed:", JSON.parse(result.result.result.value));

  edge.kill();
}

run();
