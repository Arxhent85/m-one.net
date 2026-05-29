const ftp = require('basic-ftp');

async function deleteDirRecursively(client, dirPath) {
    try {
        const list = await client.list(dirPath);
        for (const item of list) {
            const fullPath = `${dirPath}/${item.name}`;
            if (item.isDirectory) {
                await deleteDirRecursively(client, fullPath);
            } else {
                await client.remove(fullPath);
            }
        }
        await client.removeDir(dirPath);
        console.log(`Gelöscht: ${dirPath}`);
    } catch(err) {
        console.log(`Konnte ${dirPath} nicht löschen: ${err.message}`);
    }
}

async function cleanOldFolders() {
    const client = new ftp.Client();
    try {
        await client.access({
            host: 'ftp.m-one.net',
            user: 'ki466652',
            password: '!Sommer85!',
            secure: false
        });
        
        await client.cd('public_html');
        await client.uploadFrom('public/.htaccess', '.htaccess');
        console.log('.htaccess hochgeladen!');

        const produkteList = await client.list('produkte');
        for (const cat of produkteList) {
            if (cat.isDirectory) {
                const subPath = `produkte/${cat.name}`;
                const subList = await client.list(subPath);
                
                for (const subItem of subList) {
                    if (subItem.isDirectory) {
                        const dirPath = `${subPath}/${subItem.name}`;
                        console.log(`Gefunden: ${dirPath}. Lösche rekursiv...`);
                        await deleteDirRecursively(client, dirPath);
                    }
                }
            }
        }
        
    } catch (err) {
        console.error('Fehler:', err.message);
    }
    client.close();
}

cleanOldFolders();
