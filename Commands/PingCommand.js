const BaseCommand = require("../Base/BaseCommand");
const { stripIndents } = require("common-tags");

module.exports = class PingCommand extends BaseCommand {
	constructor(client) {
		super(client, {
			name: "ping",
			description: "Get the API Latency of the Bot",
		});
	}

	/**
	 * @param {import("discord.js").CommandInteraction} interaction
	 */
	async run(interaction) {
		interaction.editReply({
			embeds: [
				this.client.embed(interaction.user)
					.setTitle("API Latency")
					.setDescription(stripIndents`
						**API Latency:** ${Date.now() - interaction.createdTimestamp} ms
						**WebSocket Latency:** ${this.client.ws.ping} ms
					`),
			],
		});
	}
};