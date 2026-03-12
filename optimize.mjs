import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dirs = [
  './public/products/premium-silikon',
  './public/products/neutral-silikon'
];

async function optimizeFolder(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.png')) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace('.png', '.webp'));
      console.log(`Optimizing ${file}...`);
      try {
        const buffer = fs.readFileSync(inputPath);
        await sharp(buffer).webp({ quality: 80, effort: 6 }).toFile(outputPath);
        fs.unlinkSync(inputPath);
      } catch (err) {
        console.error(`Failed on ${file}:`, err);
      }
    }
  }
}

async function run() {
  for (const dir of dirs) {
    if (fs.existsSync(dir)) {
      await optimizeFolder(dir);
    }
  }
  console.log('Done optimizing images.');
}

run();
