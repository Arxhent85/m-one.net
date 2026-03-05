import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import https from 'https';
import { fileURLToPath } from 'url';

// Provide __dirname equivalent in ES Modules if needed, but since it's a script we can use process.cwd()
const OUT_DIR = path.join(process.cwd(), 'public', 'images');

const IMAGE_URLS = [
    'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Bau%20219b.jpeg',
    'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Service%20219.jpeg',
    'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Color%20219.jpeg',
    'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Cleaning%20219.jpeg',
    'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Silikon%20Premium.jpeg',
    'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Bausilikon%20.png',
    'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Struktur%20Acryl.jpeg',
    'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Universal%20Acryl.jpeg',
    'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Extrem%20Kleber.png'
];

async function downloadImage(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
                return;
            }
            const data = [];
            res.on('data', chunk => data.push(chunk));
            res.on('end', () => resolve(Buffer.concat(data)));
        }).on('error', err => reject(err));
    });
}

async function optimizeImages() {
    if (!fs.existsSync(OUT_DIR)) {
        fs.mkdirSync(OUT_DIR, { recursive: true });
    }

    console.log(`Starting optimization of ${IMAGE_URLS.length} images...`);

    for (const url of IMAGE_URLS) {
        try {
            console.log(`Downloading: ${url}`);
            let buffer = await downloadImage(url);

            // Clean filename
            const decodedFilename = decodeURIComponent(url.split('/').pop());
            const baseName = decodedFilename.replace(/\.[^/.]+$/, "").trim(); // Remove extension and trailing spaces
            const safeName = baseName.replace(/[^a-zA-Z0-9-]/g, '_').toLowerCase();

            const outPath = path.join(OUT_DIR, `${safeName}.webp`);

            console.log(`Optimizing and saving to ${outPath}`);
            // Sharp process: resize (if overly large), convert to webp (quality 80)
            await sharp(buffer)
                .resize({ width: 1200, withoutEnlargement: true }) // reasonable max bound
                .webp({ quality: 80, effort: 6 })
                .toFile(outPath);

            console.log(`✅ Compressed ${safeName}.webp`);
        } catch (err) {
            console.error(`❌ Failed to process ${url}:`, err);
        }
    }
}

optimizeImages().then(() => console.log('Done.')).catch(console.error);
