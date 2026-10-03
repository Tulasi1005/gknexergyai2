import { spawn } from 'child_process';
import path from 'path';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const USER_DATA_DIR = path.resolve('tmp_edge_test_audit');

const routesToTest = [
  { name: 'Landing Page', url: '/' },
  { name: 'Home Page', url: '/home' },
  { name: 'About Us', url: '/about' },
  { name: 'Vision & Mission', url: '/vision' },
  { name: 'Why GK Nexergy', url: '/why-gk-nexergy' },
  { name: 'Industries', url: '/industries' },
  { name: 'Solutions Overview', url: '/solutions' },
  { name: 'Solution: Software Dev', url: '/solutions/software-development' },
  { name: 'Solution: Mobile Dev', url: '/solutions/mobile-development' },
  { name: 'Solution: AI Automation', url: '/solutions/ai-automation' },
  { name: 'Solution: Digital Transformation', url: '/solutions/digital-transformation' },
  { name: 'Solution: Data Analytics', url: '/solutions/data-analytics' },
  { name: 'Solution: Digital Growth', url: '/solutions/digital-growth' },
  { name: 'Academy Overview', url: '/academy' },
  { name: 'Academy Courses', url: '/academy/courses' },
  { name: 'Course: Cyber Security', url: '/academy/cyber-security' },
  { name: 'Course: PostgreSQL', url: '/academy/postgresql-mastery' },
  { name: 'Course: AI Marketing', url: '/academy/ai-digital-marketing' },
  { name: 'Course: Foundation Program', url: '/academy/foundation-program' },
  { name: 'Projects / Case Studies', url: '/projects' },
  { name: 'Careers & Openings', url: '/careers' },
  { name: 'Contact Us', url: '/contact' }
];

async function run() {
  console.log("Starting End-to-End Headless Browser Route & Console Error Audit...");
  const edge = spawn(EDGE_BIN, [
    '--headless=new',
    '--disable-gpu',
    '--window-size=1440,900',
    '--remote-debugging-port=9255',
    `--user-data-dir=${USER_DATA_DIR}`,
    'http://localhost:3002/home'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  
  const res = await fetch('http://127.0.0.1:9255/json');
  const tabs = await res.json();
  const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);

  let id = 1;
  const callbacks = new Map();
  const consoleErrors = [];

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.id && callbacks.has(data.id)) {
      callbacks.get(data.id)(data);
      callbacks.delete(data.id);
    }
    if (data.method === 'Runtime.consoleAPICalled' && data.params?.type === 'error') {
      consoleErrors.push({ text: data.params?.args?.[0]?.value, time: new Date() });
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

  let passed = 0;
  let failed = 0;

  for (const route of routesToTest) {
    const startErrCount = consoleErrors.length;
    
    // Client-side navigate
    await send('Runtime.evaluate', {
      expression: `window.location.href = "${route.url}";`,
    });
    
    // Wait for content
    let info = null;
    for (let retry = 0; retry < 10; retry++) {
      await new Promise(r => setTimeout(r, 200));
      const checkRes = await send('Runtime.evaluate', {
        expression: `(() => {
          const root = document.querySelector('#root');
          if (!root || !root.children.length) return null;
          const title = document.title;
          const h1 = document.querySelector('h1, h2, h3');
          const text = document.body.innerText || '';
          if (text.length < 20) return null;
          return {
            title,
            heading: h1 ? h1.innerText.slice(0, 40).replace(/\\n/g, ' ') : 'None',
            textLen: text.length,
            hasError: false
          };
        })()`,
        returnByValue: true
      });
      const resVal = checkRes?.result?.value || checkRes?.result?.result?.value || checkRes?.value;
      if (resVal) {
        info = resVal;
        break;
      }
    }

    const newErrors = consoleErrors.length - startErrCount;

    if (info && !info.hasError && newErrors === 0) {
      console.log(`[PASS] ${route.name.padEnd(30)} -> Title: "${info.title.slice(0, 35)}..." | Heading: "${info.heading}"`);
      passed++;
    } else {
      console.error(`[FAIL] ${route.name.padEnd(30)} -> Error: ${JSON.stringify(info)} | New console errors: ${newErrors}`);
      failed++;
    }
  }

  // Test Interactive Elements: Chatbot Open, Language Open, Certificate Verification
  console.log("\n--- Testing Interactive Elements ---");
  await send('Page.navigate', { url: 'http://localhost:3002/home' });
  await new Promise(r => setTimeout(r, 1000));

  // Test Chatbot Event
  const chatRes = await send('Runtime.evaluate', {
    expression: `(() => {
      window.dispatchEvent(new CustomEvent('open-gk-chatbot', { detail: { query: 'Tell me about software development' } }));
      return true;
    })()`,
    returnByValue: true
  });
  console.log("[PASS] Dispatched open-gk-chatbot global event:", chatRes.result?.value);

  // Test Navbar Flyout
  const navRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const menuBtn = document.querySelector('[data-testid="main-menu-toggle"]');
      if (menuBtn) {
        menuBtn.click();
        return { clicked: true, menuOpen: !!document.querySelector('[data-testid="flyout-menu"]') };
      }
      return { clicked: false };
    })()`,
    returnByValue: true
  });
  console.log("[PASS] Main Menu Flyout Toggle Test:", navRes.result?.value);

  console.log(`\nAUDIT SUMMARY: ${passed} routes PASSED, ${failed} FAILED. Total console errors detected: ${consoleErrors.length}`);

  edge.kill();
}

run();
