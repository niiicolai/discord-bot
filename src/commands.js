import { REST, Routes } from 'discord.js';

const { DISCORD_CLIENT_ID, DISCORD_TOKEN } = process.env;
if (!DISCORD_CLIENT_ID) console.error('Missing CLIENT_ID in .env');
if (!DISCORD_TOKEN) console.error('Missing TOKEN in .env');

const commands = [
  {
    name: 'whoiselwood',
    description: 'Learn more about Elwood',
  },
  {
    name: 'latestvideo',
    description: 'Get the latest video from Elwood',
  }
];

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
