const BaseEvent = require("../Base/BaseEvent");

module.exports = class ReadyEvent extends BaseEvent {
	/**
	 * @param {import("../Base/Client")} client
	*/
	constructor(client) {
		super(client, "ready");
	}

	async run() {
		this.client.logger.success("client/events", `Logged in as ${this.client.user.tag}`);

		// The following code is for Production Mode
		/* this.client.application.commands.set(
		this.client.commands.map(cmd => cmd.config),
		); */

		this.client.guilds.fetch();
		this.client.guilds.cache.get("839534136548786206").commands.set(
			this.client.commands.map(cmd => cmd.config),
		);
	}
};