import Command from "./_command.js";

const text = `A Youtube channel about gaming.`;

export default class WhoIs extends Command {
    constructor() {
        super(
            'whois', 
            'Learn more about Not So Serious Gaming'
        );
    }

    async execute(interaction) {
        await interaction.reply(text);
    }
}
