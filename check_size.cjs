const https = require('https');

const urls = [
  'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Hero1%20Video.webp',
  'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Logo%20weiss%20lang.svg',
  'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Silikon%20Premium.jpeg',
  'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Bausilikon%20.png',
  'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Struktur%20Acryl.jpeg',
  'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Universal%20Acryl.jpeg',
  'https://axhsckkehhzzxiqiwoih.supabase.co/storage/v1/object/public/M%20ONE%20WEB/Extrem%20Kleber.png',
  'https://picsum.photos/id/449/400/500',
  'https://picsum.photos/id/175/400/500'
];

async function getSize(url) {
  return new Promise((resolve) => {
    https.request(url, { method: 'HEAD' }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Handle redirect for picsum
        getSize(res.headers.location).then(resolve);
      } else {
        resolve(parseInt(res.headers['content-length'] || 0, 10));
      }
    }).on('error', () => resolve(0)).end();
  });
}

async function main() {
  let total = 0;
  for (const url of urls) {
    const size = await getSize(url);
    console.log(`${url}: ${(size / 1024 / 1024).toFixed(2)} MB`);
    total += size;
  }
  console.log(`Total Image Size: ${(total / 1024 / 1024).toFixed(2)} MB`);
}

main();
