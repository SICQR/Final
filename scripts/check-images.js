#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
// minimal, dependency-free image dimension extractor for common formats
function getImageDimensions(fp) {
  const buf = fs.readFileSync(fp);
  const sig = buf.slice(0, 12);
  // PNG: bytes 16-24 contain width/height (network order)
  if (sig.slice(0,8).toString('hex') === '89504e470d0a1a0a') {
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    return { width, height };
  }
  // JPEG: scan for 0xFFC0 marker (SOF0/2)
  if (sig[0] === 0xff && sig[1] === 0xd8) {
    let offset = 2;
    while (offset < buf.length) {
      if (buf[offset] !== 0xff) { offset++; continue; }
      const marker = buf[offset+1];
      const len = buf.readUInt16BE(offset+2);
      // SOF0/1/2 markers
      if (marker >= 0xc0 && marker <= 0xc3) {
        const height = buf.readUInt16BE(offset+5);
        const width = buf.readUInt16BE(offset+7);
        return { width, height };
      }
      offset += 2 + len;
    }
    return { width: null, height: null };
  }
  // GIF: width/height at bytes 6-10 little-endian
  if (sig.slice(0,3).toString() === 'GIF') {
    const width = buf.readUInt16LE(6);
    const height = buf.readUInt16LE(8);
    return { width, height };
  }
  // WebP: "RIFF" .. "WEBP" - VP8/VP8L chunk parsing can be complex; attempt simple read
  if (sig.slice(0,4).toString() === 'RIFF' && sig.slice(8,12).toString() === 'WEBP') {
    // VP8X: extended header with width/height stored little-endian at offset 24
    if (buf.slice(12,16).toString() === 'VP8X') {
      const width = buf.readUIntLE(24, 3) + 1;
      const height = buf.readUIntLE(27, 3) + 1;
      return { width, height };
    }
    return { width: null, height: null };
  }
  // SVG: try to extract width/height attributes
  if (path.extname(fp).toLowerCase() === '.svg') {
    try {
      const txt = buf.toString('utf8');
      const w = /width\s*=\s*"([0-9.]+)"/.exec(txt);
      const h = /height\s*=\s*"([0-9.]+)"/.exec(txt);
      return { width: w ? Number(w[1]) : null, height: h ? Number(h[1]) : null };
    } catch (e) {
      return { width: null, height: null };
    }
  }
  return { width: null, height: null };
}
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const IMAGE_DIRS = [path.join(process.cwd(), 'public', 'images'), path.join(process.cwd(), 'public 2', 'images')];
const MIN_LONG_EDGE = 1000; // px

async function walk(dir) {
  const results = [];
  try {
    const files = await readdir(dir);
    for (const file of files) {
      const fp = path.join(dir, file);
      const s = await stat(fp);
      if (s.isDirectory()) {
        const nested = await walk(fp);
        results.push(...nested);
      } else {
        const ext = path.extname(fp).toLowerCase();
        if (['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.svg'].includes(ext)) {
          results.push(fp);
        }
      }
    }
  } catch (err) {
    // ignore missing directories
  }
  return results;
}

function sha256FileSync(fp) {
  const hash = crypto.createHash('sha256');
  const data = fs.readFileSync(fp);
  hash.update(data);
  return hash.digest('hex');
}

async function inspectImage(fp) {
  const s = await stat(fp);
  let dims = { width: null, height: null };
  try {
    dims = getImageDimensions(fp) || { width: null, height: null };
  } catch (e) {
    dims = { width: null, height: null };
  }
  const hash = sha256FileSync(fp);
  return {
    path: path.relative(process.cwd(), fp),
    size: s.size,
    width: dims.width || null,
    height: dims.height || null,
    hash,
  };
}

(async function main() {
  const allImages = [];
  for (const d of IMAGE_DIRS) {
    const imgs = await walk(d);
    allImages.push(...imgs);
  }

  const inspected = [];
  for (const img of allImages) {
    try {
      const info = await inspectImage(img);
      inspected.push(info);
    } catch (err) {
      console.error('failed to inspect', img, err.message || err);
    }
  }

  // find duplicates
  const byHash = new Map();
  for (const i of inspected) {
    const arr = byHash.get(i.hash) || [];
    arr.push(i);
    byHash.set(i.hash, arr);
  }

  const duplicates = [];
  for (const [h, arr] of byHash.entries()) {
    if (arr.length > 1) duplicates.push(arr.map(a => a.path));
  }

  // find undersized
  const undersized = inspected.filter(i => {
    const w = i.width || 0;
    const h = i.height || 0;
    const long = Math.max(w, h);
    return long > 0 && long < MIN_LONG_EDGE;
  }).map(i => i.path);

  const report = { count: inspected.length, images: inspected, duplicates, undersized };

  console.log(JSON.stringify(report, null, 2));

  if (duplicates.length || undersized.length) {
    process.exitCode = 2;
  } else {
    process.exitCode = 0;
  }
})();
