const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const baseLogoDir = 'c:/Users/arxhe/Desktop/NEW WEB M ONE 2026/Logo';
const blackInputPath = path.join(baseLogoDir, 'logo e ZEZë.png');
const whiteInputPath = path.join(baseLogoDir, 'logo e bardh .png');

const blackOutputPath = path.join(__dirname, 'public', 'favicon-black.webp');
const whiteOutputPath = path.join(__dirname, 'public', 'favicon-white.webp');
const defaultOutputPath = path.join(__dirname, 'public', 'favicon.webp');

async function processImage(input, output) {
  console.log(`Reading input image: ${input}`);
  if (!fs.existsSync(input)) {
    throw new Error(`Input file does not exist at ${input}`);
  }

  await sharp(input)
    .resize(64, 64, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .webp({ quality: 100 })
    .toFile(output);
  console.log(`Success! Saved to ${output}`);
}

async function convertAll() {
  try {
    await processImage(blackInputPath, blackOutputPath);
    await processImage(whiteInputPath, whiteOutputPath);
    await processImage(blackInputPath, defaultOutputPath);
  } catch (error) {
    console.error('Error during conversion:', error);
    process.exit(1);
  }
}

convertAll();
