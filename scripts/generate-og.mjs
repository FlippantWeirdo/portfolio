// Generates public/og.png — the social share card.
// Run with: node scripts/generate-og.mjs
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const W = 1200;
const H = 630;

// palette (matches design tokens)
const BG = '#0B0D0E';
const SURFACE = '#14171A';
const BORDER = '#232A2E';
const TEXT = '#E6E8E6';
const MUTED = '#8A938C';
const MINT = '#5DF2A3';
const MINT_DARK = '#2B7D52';

// ---- background grid ----
let grid = '';
for (let x = 0; x <= W; x += 40)
  grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${BORDER}" stroke-opacity="0.45" stroke-width="1"/>`;
for (let y = 0; y <= H; y += 40)
  grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${BORDER}" stroke-opacity="0.45" stroke-width="1"/>`;

// ---- pixel avatar (16x16, from PixelAvatar.astro), holes use BG ----
const FACE = MINT;
const DARK = MINT_DARK;
const HOLE = BG;
const px = [
  [6, 1, 4, 1, DARK], [5, 2, 6, 1, DARK], [5, 3, 1, 2, DARK], [10, 3, 1, 2, DARK],
  [6, 3, 4, 1, FACE], [6, 4, 4, 1, FACE], [5, 5, 6, 1, FACE], [5, 6, 6, 1, FACE],
  [5, 7, 6, 1, FACE], [6, 8, 4, 1, FACE],
  [6, 5, 1, 1, HOLE], [9, 5, 1, 1, HOLE], [7, 7, 2, 1, HOLE],
  [7, 9, 2, 1, DARK], [4, 10, 8, 1, DARK], [3, 11, 10, 1, DARK],
  [3, 12, 10, 1, DARK], [3, 13, 10, 1, DARK], [7, 10, 2, 1, FACE],
];
const s = 15; // px per cell -> 240px avatar
const ax = 856;
const ay = 196;
let avatar = `<rect x="${ax - 26}" y="${ay - 26}" width="${16 * s + 52}" height="${16 * s + 52}" fill="${BG}" stroke="${BORDER}" stroke-width="2"/>`;
avatar += `<rect x="${ax}" y="${ay}" width="${16 * s}" height="${16 * s}" fill="${BG}"/>`;
for (const [x, y, w, h, fill] of px)
  avatar += `<rect x="${ax + x * s}" y="${ay + y * s}" width="${w * s}" height="${h * s}" fill="${fill}"/>`;
// scanlines over the portrait
for (let i = 0; i < 16; i++)
  avatar += `<rect x="${ax}" y="${ay + i * s + s - 2}" width="${16 * s}" height="2" fill="#000" opacity="0.28"/>`;

// ---- scanlines over the whole card ----
let scan = '';
for (let y = 0; y < H; y += 4)
  scan += `<rect x="0" y="${y}" width="${W}" height="1" fill="#000" opacity="0.12"/>`;

const FONT = 'Departure Mono';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  ${grid}

  <!-- terminal window -->
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" rx="6" fill="${SURFACE}" stroke="${BORDER}" stroke-width="2"/>
  <!-- title bar -->
  <circle cx="74" cy="74" r="7" fill="${MINT_DARK}"/>
  <circle cx="100" cy="74" r="7" fill="${MINT_DARK}"/>
  <circle cx="126" cy="74" r="7" fill="${MINT}"/>
  <text x="${W / 2}" y="82" font-family="${FONT}" font-size="24" fill="${MUTED}" text-anchor="middle">adefila.cv — whoami</text>
  <line x1="40" y1="104" x2="${W - 40}" y2="104" stroke="${BORDER}" stroke-width="2"/>

  <!-- prompt + heading -->
  <text x="80" y="180" font-family="${FONT}" font-size="28" fill="${MINT}">~$ whoami</text>
  <text x="80" y="270" font-family="${FONT}" font-size="62" fill="${TEXT}">A human being who</text>
  <text x="80" y="346" font-family="${FONT}" font-size="62" fill="${TEXT}">ships software.</text>
  <rect x="672" y="300" width="30" height="50" fill="${MINT}"/>

  <!-- name + subtitle -->
  <text x="80" y="448" font-family="${FONT}" font-size="34" fill="${MINT}">Adefila Abdulmuiz</text>
  <text x="80" y="492" font-family="${FONT}" font-size="24" fill="${MUTED}">mobile &amp; web dev · CAD &amp; electrical engineering</text>

  <!-- footer -->
  <text x="80" y="554" font-family="${FONT}" font-size="22" fill="${MUTED}">Lagos, Nigeria</text>
  <text x="${W - 80}" y="554" font-family="${FONT}" font-size="22" fill="${MINT}" text-anchor="end">adefila.cv</text>

  <!-- avatar -->
  ${avatar}
  <text x="${ax + 8 * s}" y="${ay + 16 * s + 44}" font-family="${FONT}" font-size="20" fill="${MUTED}" text-anchor="middle">adefila.png</text>

  ${scan}
</svg>`;

const fontPath = fileURLToPath(new URL('./assets/DepartureMono-Regular.otf', import.meta.url));
const outPath = fileURLToPath(new URL('../public/og.png', import.meta.url));

const resvg = new Resvg(svg, {
  font: {
    fontFiles: [fontPath],
    loadSystemFonts: false,
    defaultFontFamily: FONT,
  },
  fitTo: { mode: 'width', value: W },
});

writeFileSync(outPath, resvg.render().asPng());
console.log(`Wrote ${outPath}`);
