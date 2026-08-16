// Brand assets, deterministic and TEXTLESS: og.png 1200x630 plus the PNG
// favicons, all composed from the spintax mark SVG. No text on purpose — the
// sibling blog's generator documents the trap: librsvg resolves fonts through
// host fontconfig, so text would render differently per machine and the build
// would not be reproducible. sharp rasterizes the mark; the background is the
// site's dark surface with two brand-colour bars.
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const MARK = 'static/assets/spintax-mark.svg';
const BG = '#141414';
const BLUE = '#60cdff';
const MAGENTA = '#a91455';

const mark = readFileSync(MARK);

// og.png — mark centered on the dark canvas, brand bars top and bottom.
const bar = (color) =>
  Buffer.from(`<svg width="1200" height="10"><rect width="1200" height="10" fill="${color}"/></svg>`);
const markPng = await sharp(mark).resize(360, 360).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: BG } })
  .composite([
    { input: bar(BLUE), top: 0, left: 0 },
    { input: bar(MAGENTA), top: 620, left: 0 },
    { input: markPng, top: 135, left: 420 },
  ])
  .png()
  .toFile('dist/assets/og.png');

// Favicon PNGs from the same mark.
for (const [size, name] of [[96, 'favicon-96x96.png'], [180, 'apple-touch-icon.png']]) {
  await sharp(mark).resize(size, size).png().toFile(`dist/assets/${name}`);
}
console.log('brand assets: og.png 1200x630, favicon-96, apple-touch-icon');
