#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const publicImagesDir = path.join(root, 'public', 'images');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      // skip build and vendor dirs
      if (['.next', 'node_modules', '.git'].includes(f.name)) continue;
      walk(full, fileList);
    } else {
      fileList.push(full);
    }
  }
  return fileList;
}

function collectFiles() {
  const exts = ['.js', '.ts', '.tsx', '.jsx', '.css', '.html', '.md'];
  const files = walk(root).filter((p) => exts.includes(path.extname(p)));
  return files;
}

const files = collectFiles();
const missing = new Map();

const imageRefRegex = /['"`]\/images\/[\w\-./@]+\.(?:png|jpg|jpeg|gif|svg|webp|avif)['"`]/gi;

for (const file of files) {
  const rel = path.relative(root, file);
  try {
    const content = fs.readFileSync(file, 'utf8');
    let m;
    while ((m = imageRefRegex.exec(content))) {
      const raw = m[0];
      const quote = raw[0];
      const ref = raw.slice(1, -1);
  // map /images/... -> public/images/...
  const imagePath = path.join(root, 'public', 'images', ref.replace(/^\/images\//, ''));
      if (!fs.existsSync(imagePath)) {
        if (!missing.has(ref)) missing.set(ref, []);
        missing.get(ref).push(rel);
      }
    }
  } catch (err) {
    // ignore binary files we couldn't read
  }
}

if (missing.size === 0) {
  console.log('OK — all referenced /images/* files exist in public/images/ (or no literal refs found).');
  process.exit(0);
} else {
  console.error('Missing images referenced in code:');
  for (const [img, refs] of missing.entries()) {
    console.error(`  ${img}`);
    for (const r of refs) console.error(`    referenced from: ${r}`);
  }
  process.exit(2);
}
