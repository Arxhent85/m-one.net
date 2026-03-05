import https from 'https';

const urls = [
  'https://picsum.photos/seed/picsum/1920/1080?blur=4',
  'https://picsum.photos/id/449/400/500',
  'https://picsum.photos/id/175/400/500',
  'https://picsum.photos/seed/picsum/800/600'
];

async function getSize(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        getSize(res.headers.location).then(resolve);
      } else {
        res.resume();
        resolve(parseInt(res.headers['content-length'] || 0, 10));
      }
    }).on('error', () => resolve(0));
  });
}

async function main() {
  let total = 0;
  for (const url of urls) {
    const size = await getSize(url);
    console.log(`${url}: ${(size / 1024 / 1024).toFixed(2)} MB`);
    total += size;
  }
}

main();
