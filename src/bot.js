import { Client, GatewayIntentBits } from 'discord.js';
import { getData } from './youtube.js';

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
] });

const { DISCORD_TOKEN } = process.env;
if (!DISCORD_TOKEN) console.error('Missing TOKEN in .env');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'whoiselwood') {
    await interaction.reply('He is a legend');
  }
  else if (interaction.commandName === 'latestvideo') {
    const data = await getData();
    if (!data) {
      await interaction.reply('No data found');
      return;
    }
    await interaction.reply(
        `Title: ${data.title}\n\nPublished At: ${data.publishedAt}\nLink: ${data.link}`
    );
  }
});

client.login(DISCORD_TOKEN);
