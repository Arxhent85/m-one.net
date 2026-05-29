const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const OUT_DIR = path.join(__dirname, 'out');

function getAllFiles(dir, base = '') {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const rel = base ? `${base}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
            results = results.concat(getAllFiles(path.join(dir, entry.name), rel));
        } else {
            results.push(rel);
        }
    }
    return results;
}

function fileHash(filepath) {
    const content = fs.readFileSync(filepath);
    return crypto.createHash('md5').update(content).digest('hex');
}

const files = getAllFiles(OUT_DIR);
const manifest = {};
for (const rel of files) {
    const abs = path.join(OUT_DIR, rel);
    const stats = fs.statSync(abs);
    manifest[rel] = {
        size: stats.size,
        hash: fileHash(abs)
    };
}
fs.writeFileSync('.deploy-manifest.json', JSON.stringify(manifest, null, 2));
console.log(`Manifest erstellt mit ${Object.keys(manifest).length} Dateien.`);
