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
	}
};