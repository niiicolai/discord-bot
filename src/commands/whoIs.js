import Command from "./_command.js";

const YOUTUBE_CHANNEL_NAME = process.env.YOUTUBE_CHANNEL_NAME;
if (!YOUTUBE_CHANNEL_NAME) console.error('Missing YOUTUBE_CHANNEL_NAME in .env');

const text = `A Youtube channel.`;

export default class WhoIs extends Command {
    constructor() {
        super(
            'whois', 
            `Learn more about ${YOUTUBE_CHANNEL_NAME}`
        );
    }

    async execute(interaction) {
        await interaction.reply(text);
    }
}
