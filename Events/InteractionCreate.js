const BaseEvent = require("../Base/BaseEvent");

module.exports = class InteractionCreate extends BaseEvent {
	constructor(client) {
		super(client, "interactionCreate");
	}

	/**
	 * @param {import("discord.js").Interaction} interaction
	 */
	async run(interaction) {
		if(interaction.isCommand()) await this.__handleCommands(interaction);
	}

	/**
	 * @param {import("discord.js").CommandInteraction} interaction
	 */
	async __handleCommands(interaction) {
		await interaction.deferReply();
		const command = this.client.commands.get(interaction.commandName);

		try {
			await command.run(interaction);
		}
		catch(err) {
			this.client.logger.error(
				"client/commands",
				err.message,
			);
		}
	}
};