
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
}
