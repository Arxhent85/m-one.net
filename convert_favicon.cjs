const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = 'c:/Users/arxhe/Desktop/NEW WEB M ONE 2026/Logo/M-ONE LOGO kurz schwarz.png';
const outputPath = path.join(__dirname, 'public', 'favicon.webp');

async function convert() {
  try {
    console.log(`Reading input image: ${inputPath}`);
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file does not exist at ${inputPath}`);
    }

    console.log('Converting to favicon.webp with sharp...');
    await sharp(inputPath)
      .resize(64, 64, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({ quality: 100 })
      .toFile(outputPath);

    console.log(`Success! Saved to ${outputPath}`);
  } catch (error) {
    console.error('Error during conversion:', error);
    process.exit(1);
  }
}

convert();
