module.exports = class BaseCommand {
	/**
	 * @param {import("./Client")} client
	 * @param {import("discord.js").ApplicationCommandData} config
	 */
	constructor(client, config) {
		/**
		 * @type {import("./Client")}
		 */
		this.client = client;

		Object.defineProperty(this, "client", {
			enumerable: false,
			configurable: true,
			writable: true,
		});

		/**
		 * @type {import("discord.js").ApplicationCommandData}
		 */
		this.config = config;
	}

	async run() {
		// Nothing here
	}
};