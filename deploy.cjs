require('dotenv').config();
const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();
const { execSync } = require('child_process');

// 1. Zuerst das Projekt bauen
console.log("🏗️ Starte lokalen Build (npm run build)...");
try {
    execSync('npm.cmd run build', { stdio: 'inherit' });
    console.log("\n✅ Build erfolgreich abgeschlossen!");
} catch (error) {
    console.error("\n❌ FEHLER beim Build-Prozess. Upload abgebrochen.");
    process.exit(1);
}

// 2. FTP-Konfiguration vorbereiten
const config = {
    user: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
    host: process.env.FTP_SERVER,
    port: 21,
    localRoot: __dirname + '/out',
    remoteRoot: '/public_html/',
    include: ['*', '**/*'],
    exclude: ['.git/**', 'node_modules/**', '.next/**', 'deploy.cjs', 'deploy.js', '.env'],
    deleteRemote: false, 
    forcePasv: true
};

if (!config.user || !config.password || !config.host) {
    console.error("\n❌ FEHLER: Die FTP-Zugangsdaten in der Datei '.env' sind unvollständig!");
    console.log("Bitte trage in der Datei '.env' dein Passwort bei 'FTP_PASSWORD=' ein.");
    process.exit(1);
}

console.log("\n🚀 Starte FTP-Upload auf Contabo...");
console.log(`Server: ${config.host}`);
console.log(`Benutzer: ${config.user}`);
console.log("Bitte warten, Dateien werden hochgeladen...");

ftpDeploy.deploy(config)
    .then(res => {
        console.log("\n🎉 ERFOLG! Deine Website wurde erfolgreich hochgeladen und ist jetzt live!");
        console.log("Öffne: http://www.m-one.net");
    })
    .catch(err => {
        console.error("\n❌ FEHLER beim FTP-Upload:");
        console.error(err);
        console.log("\nBitte überprüfe, ob dein Passwort in der Datei '.env' korrekt eingetragen ist.");
    });
