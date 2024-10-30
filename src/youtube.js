
const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) console.error('Missing YOUTUBE_API_KEY in .env');

export async function getData() {
    //const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${id}&key=${API_KEY}`;
    const playlistId = 'UUYhLqjUpnofq9jExIQZlOXQ';
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=1&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const items = data.items;
    if (!items || !items.length) return null;
    for (const item of items) {
        console.log(item);
        if (item.kind === 'youtube#playlistItem') {
            const { title, description, publishedAt } = item.snippet;
            return {
                title,
                description,
                publishedAt,
                link: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
            }
        }
    }
    return null;    
}
