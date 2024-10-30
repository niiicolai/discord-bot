import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

/**
 * @class Command
 * @classdesc Base class for all commands.
 * @property {string} name - The name of the command.
 * @property {string} description - The description of the command.
 */
export default class Command {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    /**
     * @function details
     * @description Returns the details of the command.
     * @returns {Object} The details of the command.
     */
    details() {
        return {
            name: this.name,
            description: this.description
        };
    }

    /**
     * @function execute
     * @description Executes the command.
     * @param {Interaction} interaction - The interaction object.
     * @returns {Promise<void>}
     * @async
     */
    async execute(interaction) {
        await interaction.reply('Method not implemented.');
    }

    /**
     * @static
     * @function all
     * @description Returns all the commands.
     * @returns {Promise<Command[]>}
     */
    static async all() {
        const commands = [];
        const dir = path.resolve('src', 'commands');
        const files = await fs.promises.readdir(dir);
        const filePaths = files
            .filter(file => file.endsWith('.js'))
            .filter(file => file !== '_command.js')
            .map(file => {
                return pathToFileURL(path.join(dir, file));
            });
        
        for (const filePath of filePaths) {
            try {
                const command = (await import(filePath.href)).default;
                commands.push(new command());
            } catch (error) {
                console.error(error);
            }
        }

        return commands;
    }
}
