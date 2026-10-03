import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACTS_DIR = 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\3279cfc3-0ae6-40ee-8317-20207a3ea428';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_BIN,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // 1. Desktop 1440x900
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3002/home', { waitUntil: 'networkidle0', timeout: 30000 });
  
  await page.evaluate(() => {
    const el = document.getElementById('pages-stack-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));

  const desktopShot = path.join(ARTIFACTS_DIR, 'nav_stack_desktop_fixed.png');
  await page.screenshot({ path: desktopShot });
  console.log('Saved Desktop:', desktopShot);

  // Hover over PROJECTS tab (05)
  await page.evaluate(() => {
    const cards = document.querySelectorAll('.nav-stack-fanned-card');
    if (cards.length >= 4) {
      cards[3].dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 600));
  const hoverShot = path.join(ARTIFACTS_DIR, 'nav_stack_hover_projects_fixed.png');
  await page.screenshot({ path: hoverShot });
  console.log('Saved Hover:', hoverShot);

  // 2. Tablet 768x1024
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    const el = document.getElementById('pages-stack-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));
  const tabletShot = path.join(ARTIFACTS_DIR, 'nav_stack_tablet_fixed.png');
  await page.screenshot({ path: tabletShot });
  console.log('Saved Tablet:', tabletShot);

  // 3. Mobile 375x812
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true });
  await page.evaluate(() => {
    const el = document.getElementById('pages-stack-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));
  const mobileShot = path.join(ARTIFACTS_DIR, 'nav_stack_mobile_fixed.png');
  await page.screenshot({ path: mobileShot });
  console.log('Saved Mobile:', mobileShot);

  await browser.close();
  console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY');
}

capture().catch(console.error);
