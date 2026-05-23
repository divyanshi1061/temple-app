const https = require('https');

const url = 'https://www.youtube.com/@maabaglamukhidarshan-d2e/shorts';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Search for channel ID
    const channelIdMatch = data.match(/"channelId":"(UC[a-zA-Z0-9_-]{22})"/);
    const channelId = channelIdMatch ? channelIdMatch[1] : null;
    console.log('Detected Channel ID:', channelId);

    // Search for video IDs (Shorts)
    const videoIdMatches = [...data.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
    const uniqueVideoIds = [...new Set(videoIdMatches)];
    console.log('Detected Video IDs from Shorts:', uniqueVideoIds.slice(0, 10));
  });
}).on('error', (err) => {
  console.error('Error fetching channel page:', err);
});
