// Processes public/portrait.png -> public/about-portrait.png
// - samples the (uniform) background colour from the corners
// - auto-crops to the figure
// - keys the background onto the site bg (#0B0D0E) with a feathered edge
// Run: node scripts/process-portrait.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const SRC = fileURLToPath(new URL('../public/portrait.png', import.meta.url));
const OUT = fileURLToPath(new URL('../public/about-portrait.png', import.meta.url));

// target site background
const TR = 11, TG = 13, TB = 14; // #0B0D0E

const T0 = 55;  // dist <= T0  -> fully background
const T1 = 105; // dist >= T1  -> fully keep; between -> blend
const PAD = 28; // crop padding around the figure (px)

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

// --- sample bg from the four corners ---
function sampleCorner(cx, cy) {
  let r = 0, g = 0, b = 0, n = 0;
  for (let y = cy; y < cy + 12; y++)
    for (let x = cx; x < cx + 12; x++) {
      const i = (y * W + x) * C;
      r += data[i]; g += data[i + 1]; b += data[i + 2]; n++;
    }
  return [r / n, g / n, b / n];
}
const corners = [
  sampleCorner(0, 0),
  sampleCorner(W - 12, 0),
  sampleCorner(0, H - 12),
  sampleCorner(W - 12, H - 12),
];
const BR = corners.reduce((s, c) => s + c[0], 0) / 4;
const BG = corners.reduce((s, c) => s + c[1], 0) / 4;
const BB = corners.reduce((s, c) => s + c[2], 0) / 4;
console.log(`bg sampled: rgb(${BR.toFixed(0)}, ${BG.toFixed(0)}, ${BB.toFixed(0)})`);

const dist = (r, g, b) => Math.hypot(r - BR, g - BG, b - BB);

// --- erase the AI-tool sparkle watermark in the bottom-right corner ---
// (paint it back to bg so it's keyed away and excluded from the bbox)
const MW = 190, MH = 190;
for (let y = H - MH; y < H; y++)
  for (let x = W - MW; x < W; x++) {
    const i = (y * W + x) * C;
    data[i] = BR; data[i + 1] = BG; data[i + 2] = BB;
  }

// --- find bounding box of figure (pixels clearly not bg) ---
let minX = W, minY = H, maxX = 0, maxY = 0;
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * C;
    if (dist(data[i], data[i + 1], data[i + 2]) > T1) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
minX = Math.max(0, minX - PAD);
minY = Math.max(0, minY - PAD);
maxX = Math.min(W - 1, maxX + PAD);
maxY = Math.min(H - 1, maxY + PAD);
const cw = maxX - minX + 1;
const ch = maxY - minY + 1;
console.log(`figure bbox: ${cw}x${ch} at (${minX}, ${minY})`);

// --- key the background, write into a fresh cropped buffer ---
const out = Buffer.alloc(cw * ch * C);
for (let y = 0; y < ch; y++)
  for (let x = 0; x < cw; x++) {
    const si = ((y + minY) * W + (x + minX)) * C;
    const di = (y * cw + x) * C;
    const r = data[si], g = data[si + 1], b = data[si + 2];
    const d = dist(r, g, b);
    let t; // 0 = full bg replacement, 1 = keep original
    if (d <= T0) t = 0;
    else if (d >= T1) t = 1;
    else t = (d - T0) / (T1 - T0);
    out[di] = Math.round(TR * (1 - t) + r * t);
    out[di + 1] = Math.round(TG * (1 - t) + g * t);
    out[di + 2] = Math.round(TB * (1 - t) + b * t);
    out[di + 3] = 255;
  }

// --- center the figure into a square frame on the site bg ---
const side = Math.max(cw, ch);
const left = Math.round((side - cw) / 2);
const top = Math.round((side - ch) / 2);

await sharp(out, { raw: { width: cw, height: ch, channels: C } })
  .extend({
    top,
    bottom: side - ch - top,
    left,
    right: side - cw - left,
    background: { r: TR, g: TG, b: TB, alpha: 1 },
  })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`Wrote ${OUT} (${side}x${side})`);
