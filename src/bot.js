import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { commands } from './commands/_index.js';

const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;
if (!DISCORD_TOKEN) console.error('Missing TOKEN in .env');
if (!DISCORD_CLIENT_ID) console.error('Missing CLIENT_ID in .env');

/**
 * @function registerCommands
 * @description Registers the commands to the Discord API
 * @returns {Promise<void>}
 * @async
 */
async function registerCommands() {
    try {
        console.log('Started refreshing application (/) commands.');
        const body = commands.map(command => command.details());
        const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);
        await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), { body });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

/**
 * @function login
 * @description Logs in the bot to Discord
 * @returns {Promise<void>}
 * @async
 */
async function login() {
    const client = new Client({ intents: [ GatewayIntentBits.Guilds ] });

    client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`));
    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;

        await commands
            .find(command => command.name === interaction.commandName)
            ?.execute(interaction);
    });

    client.login(DISCORD_TOKEN);
}

export async function init() {
    await registerCommands();
    await login();
}
