const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(walk(full));
    else results.push(full);
  });
  return results;
}

const imports = new Set();
const externalPackages = new Set();

walk('original_source').forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach(line => {
    const match = line.match(/from\s+["']([^"']+)["']/);
    if (match) {
      const imp = match[1];
      imports.add(imp);
      if (!imp.startsWith('.') && !imp.startsWith('@/')) {
        externalPackages.add(imp);
      }
    }
  });
});

console.log('All external packages needed:');
console.log(Array.from(externalPackages));
console.log('\nAll internal paths referenced:');
console.log(Array.from(imports).filter(i => i.startsWith('@/') || i.startsWith('.')));
