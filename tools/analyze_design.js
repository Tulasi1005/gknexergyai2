const fs = require('fs');
const path = require('path');

const summaryPath = path.join(__dirname, '..', 'scraped_pages', 'all_routes_summary.json');
const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));

console.log('=== ROUTE KEYS ===');
console.log(Object.keys(summary));

const fontUsage = {};
const colors = new Set();
const fontFamilies = new Set();

Object.entries(summary).forEach(([route, page]) => {
  if (!page.elements) return;
  page.elements.forEach(el => {
    if (el.fontFamily) {
      fontFamilies.add(el.fontFamily);
      const key = `${el.tag} | ${el.className.split(' ').slice(0, 3).join(' ')} | ${el.fontFamily} | ${el.fontWeight} | ${el.fontSize} | ${el.letterSpacing}`;
      fontUsage[key] = (fontUsage[key] || 0) + 1;
    }
    if (el.color) colors.add(el.color);
    if (el.backgroundColor && el.backgroundColor !== 'rgba(0, 0, 0, 0)') colors.add(el.backgroundColor);
  });
});

console.log('\n=== ALL FONT FAMILIES DETECTED ===');
console.log(Array.from(fontFamilies));

console.log('\n=== TOP TYPOGRAPHY PATTERNS ===');
Object.entries(fontUsage)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30)
  .forEach(([k, count]) => {
    console.log(`[${count}x] ${k}`);
  });

console.log('\n=== DISTINCT COLORS (SAMPLE 25) ===');
console.log(Array.from(colors).slice(0, 25));
