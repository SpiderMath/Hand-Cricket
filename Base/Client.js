const { Client, Intents, Collection } = require("discord.js");
const { readdir } = require("fs/promises");
const { join } = require("path");

/* eslint-disable-next-line no-unused-vars */
const BaseEvent = require("./BaseEvent");
/* eslint-disable-next-line no-unused-vars */
const BaseCommand = require("./BaseCommand");
const Logger = require("./Logger");

module.exports = class HandCricketClient extends Client {
	constructor() {
		super({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
			],
			ws: {
				properties: { $browser: "Discord Android" },
			},
		});

		/**
		 * @type {Collection<string, BaseCommand}
		 */
		this.commands = new Collection();

		this.logger = new Logger();
	}

	async start() {
		await this.__loadEvents();
		await this.login(process.env.DISCORD_TOKEN);
	}

	async __loadEvents() {
		const files = await readdir(join(__dirname, "../Events"));

		for(const file of files) {
			const pseudoPull = require(join(__dirname, "../Events", file));
			/**
			 * @type {BaseEvent}
			 */
			const pull = new pseudoPull(this);

			this.on(pull.name, (...args) => pull.run(...args));
		}
	}
};