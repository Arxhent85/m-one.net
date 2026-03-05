import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Recursively find all image files in a directory
function findImages(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findImages(filePath, fileList);
        } else {
            const ext = path.extname(file).toLowerCase();
            // Process jpg, jpeg, and png
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                fileList.push(filePath);
            }
        }
    }

    return fileList;
}

async function optimizeImages() {
    console.log('Finding images in public directory...');
    const images = findImages(PUBLIC_DIR);

    console.log(`Found ${images.length} images to optimize.`);

    for (const imagePath of images) {
        try {
            const ext = path.extname(imagePath);
            const webpPath = imagePath.replace(ext, '.webp');

            // Skip if the webp already exists and is newer than the source
            if (fs.existsSync(webpPath)) {
                const srcStat = fs.statSync(imagePath);
                const webpStat = fs.statSync(webpPath);
                if (webpStat.mtime > srcStat.mtime) {
                    console.log(`⏭️  Skipping (already optimized): ${path.relative(PUBLIC_DIR, imagePath)}`);
                    continue;
                }
            }

            console.log(`⏳ Optimizing: ${path.relative(PUBLIC_DIR, imagePath)}`);

            await sharp(imagePath)
                .resize({ width: 2400, withoutEnlargement: true })
                .modulate({
                    brightness: 1.05,
                    contrast: 1.15
                })
                .webp({ quality: 95, effort: 6 })
                .toFile(webpPath);

            console.log(`✅ Converted to WebP: ${path.relative(PUBLIC_DIR, webpPath)}`);

            // Delete original file to save space and force app to use WebP
            fs.unlinkSync(imagePath);
            console.log(`🗑️  Deleted original: ${path.relative(PUBLIC_DIR, imagePath)}`);

        } catch (err) {
            console.error(`❌ Failed to process ${imagePath}:`, err);
        }
    }
}

optimizeImages().then(() => console.log('✅ All images optimized successfully.')).catch(console.error);
