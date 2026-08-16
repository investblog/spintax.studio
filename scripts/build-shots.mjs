// Product screenshots: static/assets/shots/*.png -> dist/assets/shots/*.webp
// beside the PNG the build already copied. The PNGs are the tracked sources
// (captured by the product repo's reproducible capture kit at 1500x890); WebP
// is the wire format, <picture> falls back to PNG.
import { readdirSync } from 'node:fs';
import sharp from 'sharp';

const srcDir = 'static/assets/shots';
const outDir = 'dist/assets/shots';

for (const f of readdirSync(srcDir).filter(n => n.endsWith('.png'))) {
  const out = `${outDir}/${f.replace(/\.png$/, '.webp')}`;
  // Lossless: UI screenshots are flat colour and text, where lossy WebP came
  // out LARGER than the PNG source (measured: 101 KB vs 62) and lossless
  // roughly a third of it (31/23/14 KB against 85/60/49).
  const info = await sharp(`${srcDir}/${f}`).webp({ lossless: true }).toFile(out);
  console.log(`${out}  ${Math.round(info.size / 1024)} KB`);
}
