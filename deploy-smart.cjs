/**
 * SMART DEPLOY – Lädt nur geänderte Dateien hoch!
 * Vergleicht Dateigrößen & Hashes mit dem letzten Deployment.
 * Beim ersten Mal werden alle Dateien hochgeladen + ein Manifest gespeichert.
 * Ab dem zweiten Mal werden nur noch geänderte/neue Dateien hochgeladen.
 */
require('dotenv').config();
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ftp = require('basic-ftp');

const MANIFEST_FILE = path.join(__dirname, '.deploy-manifest.json');
const OUT_DIR = path.join(__dirname, 'out');

// ─── 1. BUILD ────────────────────────────────────────────────
console.log("🏗️  Starte lokalen Build (npm run build)...");
try {
    execSync('npm.cmd run build', { stdio: 'inherit' });
    console.log("\n✅ Build erfolgreich abgeschlossen!");

    // Kopiere .htaccess in den out-Ordner
    const htSrc = path.join(__dirname, 'public', '.htaccess');
    const htDst = path.join(OUT_DIR, '.htaccess');
    if (fs.existsSync(htSrc)) {
        fs.copyFileSync(htSrc, htDst);
        console.log("📄 .htaccess kopiert.");
    }
} catch (error) {
    console.error("\n❌ FEHLER beim Build. Upload abgebrochen.");
    process.exit(1);
}

// ─── 2. DATEIEN SCANNEN & HASHES BERECHNEN ───────────────────
function getAllFiles(dir, base = '') {
    let results = [];
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

function buildCurrentManifest() {
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
    return manifest;
}

function loadOldManifest() {
    if (fs.existsSync(MANIFEST_FILE)) {
        try {
            return JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
        } catch { }
    }
    return null;
}

function getChangedFiles(oldManifest, newManifest) {
    if (!oldManifest) return Object.keys(newManifest); // Erstes Deployment
    const changed = [];
    for (const [file, info] of Object.entries(newManifest)) {
        if (!oldManifest[file] || oldManifest[file].hash !== info.hash) {
            changed.push(file);
        }
    }
    return changed;
}

// ─── 3. SMART FTP UPLOAD ─────────────────────────────────────
async function smartDeploy() {
    const newManifest = buildCurrentManifest();
    const oldManifest = loadOldManifest();
    const changedFiles = getChangedFiles(oldManifest, newManifest);
    const totalFiles = Object.keys(newManifest).length;

    if (changedFiles.length === 0) {
        console.log("\n✨ Keine Änderungen erkannt – nichts hochzuladen!");
        return;
    }

    const isFullDeploy = !oldManifest;
    console.log(`\n🚀 ${isFullDeploy ? 'Erstes Deployment' : 'Smart-Deployment'}: ${changedFiles.length} von ${totalFiles} Dateien werden hochgeladen...`);

    // FTP-Verbindung
    const client = new ftp.Client();
    client.ftp.verbose = false;

    try {
        await client.access({
            host: process.env.FTP_SERVER,
            user: process.env.FTP_USERNAME,
            password: process.env.FTP_PASSWORD,
            port: 21,
            secure: false
        });
        console.log("🔗 FTP-Verbindung hergestellt!\n");

        let uploaded = 0;
        for (const relFile of changedFiles) {
            uploaded++;
            const localPath = path.join(OUT_DIR, relFile);
            const remotePath = '/public_html/' + relFile.replace(/\\/g, '/');

            // Verzeichnis auf dem Server erstellen falls nötig
            const remoteDir = remotePath.substring(0, remotePath.lastIndexOf('/'));
            try {
                await client.ensureDir(remoteDir);
            } catch { }
            // Zurück zum Root, da ensureDir das CWD ändert
            await client.cd('/');

            // Datei hochladen
            console.log(`[${uploaded}/${changedFiles.length}] ⬆️  ${relFile}`);
            await client.uploadFrom(localPath, remotePath);
        }

        // Manifest speichern für nächstes Deployment
        fs.writeFileSync(MANIFEST_FILE, JSON.stringify(newManifest, null, 2));

        const duration = isFullDeploy ? '' : ` (statt ${totalFiles} Dateien!)`;
        console.log(`\n🎉 ERFOLG! ${uploaded} Dateien hochgeladen${duration}`);
        console.log("🌐 Öffne: http://www.m-one.net");

    } catch (err) {
        console.error("\n❌ FEHLER beim FTP-Upload:");
        console.error(err.message);
        console.log("\nBitte überprüfe dein Passwort in der '.env'-Datei.");
    } finally {
        client.close();
    }
}

// Prüfe Zugangsdaten
if (!process.env.FTP_USERNAME || !process.env.FTP_PASSWORD || !process.env.FTP_SERVER) {
    console.error("❌ FTP-Zugangsdaten fehlen in '.env'!");
    process.exit(1);
}

smartDeploy();
