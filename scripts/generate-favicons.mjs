// Generates the square favicons in public/ from public/aangan-logo.png (256x255, so not square).
// The logo is trimmed of its transparent edges, then centred on a transparent square: never
// stretched or cropped. Run with `node scripts/generate-favicons.mjs` after changing the logo.
import { writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const pub = join(resolve(dirname(fileURLToPath(import.meta.url)), '..'), 'public');
const source = join(pub, 'aangan-logo.png');
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

const trimmed = await sharp(source).trim({ threshold: 1 }).png().toBuffer();

const square = (size) =>
  sharp(trimmed)
    .resize(size, size, { fit: 'contain', background: transparent, kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toBuffer();

const pngs = {
  'favicon-48x48.png': 48,
  'favicon-96x96.png': 96,
  'favicon-192x192.png': 192,
  'favicon-512x512.png': 512,
  'apple-touch-icon.png': 180,
};
for (const [name, size] of Object.entries(pngs)) {
  await writeFile(join(pub, name), await square(size));
}

// favicon.ico with 16, 32 and 48 px images, each stored as PNG (supported by every current browser).
const icoSizes = [16, 32, 48];
const images = await Promise.all(icoSizes.map(square));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);
let offset = 6 + 16 * images.length;
const entries = images.map((image, i) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(icoSizes[i], 0); // width
  entry.writeUInt8(icoSizes[i], 1); // height
  entry.writeUInt8(0, 2); // palette colours
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(image.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += image.length;
  return entry;
});
await writeFile(join(pub, 'favicon.ico'), Buffer.concat([header, ...entries, ...images]));

console.log('favicons written to public/');
