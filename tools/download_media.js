const fs = require('fs');
const path = require('path');

async function main() {
  const css = fs.readFileSync('extracted_assets/main.css', 'utf8');
  const js = fs.readFileSync('extracted_assets/main.js', 'utf8');
  
  // Find media URLs in CSS and JS
  const mediaMatches = new Set();
  const urlRegex = /(?:url\(['"]?|\/static\/media\/|https?:\/\/[^'"]+\.(?:png|jpg|jpeg|svg|webp|gif|ico|woff2?))([^\'")\s]+)/gi;
  
  let m;
  while ((m = urlRegex.exec(css)) !== null) {
    mediaMatches.add(m[0]);
  }
  while ((m = urlRegex.exec(js)) !== null) {
    mediaMatches.add(m[0]);
  }

  // Also check scraped HTML pages for all img src and svg/media
  const scrapedDir = path.join(__dirname, '..', 'scraped_pages');
  const files = fs.readdirSync(scrapedDir).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    const html = fs.readFileSync(path.join(scrapedDir, f), 'utf8');
    const imgs = html.match(/src=["']([^"']+)["']/gi) || [];
    imgs.forEach(img => {
      const src = img.replace(/^src=["']|["']$/gi, '');
      if (src.includes('static/media') || src.includes('.png') || src.includes('.jpg') || src.includes('.svg') || src.includes('.webp')) {
        mediaMatches.add(src);
      }
    });
  });

  console.log('Detected media references count:', mediaMatches.size);
  console.log(Array.from(mediaMatches));

  // Now connect to browser to fetch and download all media files
  const tabsRes = await fetch('http://127.0.0.1:9222/json');
  const tabs = await tabsRes.json();
  const staticTab = tabs.find(t => t.url && t.url.includes('preview.static.emergentagent.com')) || tabs.find(t => t.title && t.title.includes('Nexergy'));
  
  const ws = new WebSocket(staticTab.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();
  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.id && pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
    }
  };
  const send = (method, params = {}) => new Promise(res => {
    const msgId = id++;
    pending.set(msgId, res);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await new Promise(r => ws.onopen = r);

  async function evaluate(fnString) {
    const res = await send('Runtime.evaluate', {
      expression: `(${fnString})()`,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result && res.result.result ? res.result.result.value : null;
  }

  const mediaDir = path.join(__dirname, '..', 'extracted_assets', 'media');
  if (!fs.existsSync(mediaDir)) fs.mkdirSync(mediaDir, { recursive: true });

  for (const item of mediaMatches) {
    let cleanUrl = item.replace(/^url\(['"]?|['"]?\)$/gi, '');
    if (!cleanUrl || cleanUrl.startsWith('data:')) continue;
    
    console.log('Fetching media:', cleanUrl);
    const mediaData = await evaluate(`async () => {
      try {
        const res = await fetch('${cleanUrl}');
        if (!res.ok) return { error: res.status };
        const blob = await res.blob();
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => resolve({ base64: reader.result });
          reader.readAsDataURL(blob);
        });
      } catch (e) {
        return { error: e.message };
      }
    }`);

    if (mediaData && mediaData.base64) {
      const base64Data = mediaData.base64.replace(/^data:[^;]+;base64,/, '');
      const filename = path.basename(cleanUrl.split('?')[0]);
      fs.writeFileSync(path.join(mediaDir, filename), Buffer.from(base64Data, 'base64'));
      console.log(`✓ Downloaded ${filename}`);
    } else {
      console.log(`✗ Failed to download ${cleanUrl}:`, mediaData?.error);
    }
  }

  ws.close();
  console.log('All media processed!');
}

main().catch(console.error);
