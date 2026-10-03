import { spawn } from 'child_process';
import path from 'path';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const USER_DATA_DIR = path.resolve('tmp_edge_snap');

const stackPages = [
  { name: 'Company', url: '/about' },
  { name: 'Solutions', url: '/solutions' },
  { name: 'Academy', url: '/academy' },
  { name: 'Projects', url: '/projects' },
  { name: 'Careers', url: '/careers' },
  { name: 'Contact', url: '/contact' }
];

async function run() {
  const edge = spawn(EDGE_BIN, [
    '--headless=new',
    '--disable-gpu',
    '--window-size=1440,900',
    '--remote-debugging-port=9243',
    `--user-data-dir=${USER_DATA_DIR}`,
    'http://localhost:3002/home'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  
  const res = await fetch('http://127.0.0.1:9243/json');
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

  for (const page of stackPages) {
    console.log(`\nTesting page: ${page.name} (${page.url})`);
    await send('Page.navigate', { url: `http://localhost:3002${page.url}` });
    await new Promise(r => setTimeout(r, 1200));

    const checkRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('[data-testid="back-to-stack-link"]');
        if (!btn) return { ok: false, msg: "Back button NOT found" };
        const text = btn.innerText;
        btn.click();
        return { ok: true, text };
      })()`,
      returnByValue: true
    });

    console.log(`Status for ${page.name}:`, checkRes.result?.value);
    await new Promise(r => setTimeout(r, 1000));

    const urlRes = await send('Runtime.evaluate', {
      expression: `window.location.pathname + window.location.hash`,
      returnByValue: true
    });
    console.log(`Navigated to: ${urlRes.result?.value}`);
  }

  console.log("\nAll stack pages verified successfully!");
  edge.kill();
}

run();
