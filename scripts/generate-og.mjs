// Generates the social share image for the software portfolio.
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const W = 1200;
const H = 630;
const asset = (name) => {
  const path = fileURLToPath(new URL(`../public/images/projects/${name}`, import.meta.url));
  return `data:image/png;base64,${readFileSync(path).toString('base64')}`;
};
const nokslock = asset('nokslock-add.png');
const flamingo = asset('flamingo-shop.png');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <clipPath id="phone1"><rect x="0" y="0" width="212" height="455" rx="25"/></clipPath>
    <clipPath id="phone2"><rect x="0" y="0" width="225" height="482" rx="27"/></clipPath>
  </defs>
  <rect width="${W}" height="${H}" fill="#3128c9"/>
  <circle cx="1070" cy="135" r="260" fill="none" stroke="#7169de" stroke-width="1"/>
  <circle cx="1070" cy="135" r="380" fill="none" stroke="#7169de" stroke-width="1"/>
  <circle cx="1070" cy="135" r="500" fill="none" stroke="#7169de" stroke-width="1"/>
  <text x="72" y="91" font-family="Arial, sans-serif" font-size="30" font-weight="900" fill="#fffefa">adefila<tspan fill="#ff7759">.</tspan></text>
  <text x="72" y="244" font-family="Arial, sans-serif" font-size="78" font-weight="900" letter-spacing="-3" fill="#fffefa">I make software</text>
  <text x="72" y="330" font-family="Arial, sans-serif" font-size="78" font-weight="900" letter-spacing="-3" fill="#fffefa">you can <tspan fill="#d9ff5c">feel.</tspan></text>
  <text x="74" y="415" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#ebe9ff">Adefila Abdulmuiz</text>
  <text x="74" y="452" font-family="Arial, sans-serif" font-size="22" fill="#d5d2ff">Mobile apps · Frontend experiences</text>
  <text x="74" y="565" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#d5d2ff">adefila.cv</text>
  <g transform="translate(753 152) rotate(-12 106 227)">
    <rect x="-7" y="-7" width="226" height="469" rx="30" fill="#18192a"/>
    <image href="${nokslock}" x="0" y="0" width="212" height="455" preserveAspectRatio="xMidYMin slice" clip-path="url(#phone1)"/>
  </g>
  <g transform="translate(922 107) rotate(10 112 241)">
    <rect x="-7" y="-7" width="239" height="496" rx="32" fill="#18192a"/>
    <image href="${flamingo}" x="0" y="0" width="225" height="482" preserveAspectRatio="xMidYMin slice" clip-path="url(#phone2)"/>
  </g>
  <circle cx="1082" cy="110" r="74" fill="#ff7759"/>
  <text x="1082" y="103" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" font-weight="900" fill="#191b35">BUILT TO</text>
  <text x="1082" y="127" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" font-weight="900" fill="#191b35">MOVE</text>
</svg>`;

const outPath = fileURLToPath(new URL('../public/og.png', import.meta.url));
const png = new Resvg(svg, { font: { loadSystemFonts: true }, fitTo: { mode: 'width', value: W } }).render().asPng();
writeFileSync(outPath, png);
console.log(`Wrote ${outPath}`);
