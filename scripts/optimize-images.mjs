// Optimiza las imágenes de public/images in-place:
// - redimensiona a un máximo de 1920px (lado mayor)
// - reencoda JPEG (calidad 80, mozjpeg) y PNG (compresión máx)
// - solo reemplaza el archivo si el resultado es más chico
//
// Uso: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'node:fs/promises';
import { join, extname } from 'node:path';

const DIR = new URL('../public/images/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const MAX = 1920;
const JPEG_Q = 80;

sharp.cache(false);

function fmt(bytes) {
  return (bytes / 1048576).toFixed(2) + ' MB';
}

const files = await readdir(DIR);
let before = 0, after = 0, changed = 0;

for (const name of files) {
  const ext = extname(name).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

  const src = join(DIR, name);
  const tmp = src + '.tmp';
  const orig = (await stat(src)).size;
  before += orig;

  try {
    let pipeline = sharp(src).rotate(); // respeta orientación EXIF
    const meta = await sharp(src).metadata();
    if (meta.width && meta.width > MAX || meta.height && meta.height > MAX) {
      pipeline = pipeline.resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true });
    }
    if (ext === '.png') {
      pipeline = pipeline.png({ compressionLevel: 9, palette: true });
    } else {
      pipeline = pipeline.jpeg({ quality: JPEG_Q, mozjpeg: true });
    }
    await pipeline.toFile(tmp);

    const newSize = (await stat(tmp)).size;
    if (newSize < orig) {
      await rename(tmp, src);
      after += newSize;
      changed++;
      console.log(`✓ ${name}: ${fmt(orig)} → ${fmt(newSize)} (-${(100 - newSize / orig * 100).toFixed(0)}%)`);
    } else {
      await unlink(tmp);
      after += orig;
      console.log(`· ${name}: sin cambios (ya optimizada)`);
    }
  } catch (err) {
    after += orig;
    console.error(`✗ ${name}: ${err.message}`);
  }
}

console.log(`\nTotal: ${fmt(before)} → ${fmt(after)} en ${changed} archivos (-${(100 - after / before * 100).toFixed(0)}%)`);
