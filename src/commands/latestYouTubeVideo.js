import Command from "./_command.js";

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) console.error('Missing YOUTUBE_API_KEY in .env');

const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID;
if (!PLAYLIST_ID) console.error('Missing YOUTUBE_PLAYLIST_ID in .env');

/**
 * @function getLatestVideo
 * @description Fetches the latest video from the YouTube playlist
 * @returns {Promise<string>}
 * @async
 */
async function getLatestVideo() {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=1&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const items = data.items;
    
    if (items && Array.isArray(items)) {
        for (const item of items) {
            if (item.kind === 'youtube#playlistItem') {
                const { title, publishedAt } = item.snippet;
                const link = `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`;
                return `Title: ${title}\n\nPublished At: ${publishedAt}\nLink: ${link}`;
            }
        }
    }   

    return null;
}

/**
 * @class LatestYouTubeVideo
 * @classdesc Command to get the latest YouTube video
 * @extends Command
 * @property {string} name - The name of the command.
 * @property {string} description - The description of the command.
 */
export default class LatestYouTubeVideo extends Command {
    constructor() {
        super(
            'latestvideo', 
            'Get the latest YouTube video from Not So Serious Gaming'
        );
    }
    
    async execute(interaction) {
        const video = await getLatestVideo();
        if (!video) {
            await interaction.reply('Something went wrong. Please try again later.');
            return;
        }

        await interaction.reply(video);
    }
}
