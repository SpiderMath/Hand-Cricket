class BaseEvent {
	/**
	 * @param {import("./Client")} client
	 * @param {keyof import("discord.js").ClientEvents} eventName
	 */
	constructor(client, eventName) {
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
		 * @type {keyof import("discord.js").ClientEvents}
		 */
		this.name = eventName;
	}
}

module.exports = BaseEvent;