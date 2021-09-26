const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const { readdir } = require("fs/promises");
const { join } = require("path");
const AsciiTable = require("ascii-table");

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
		await this.__loadCommands();

		await this.login(process.env.DISCORD_TOKEN);
	}

	async __loadEvents() {
		const files = await readdir(join(__dirname, "../Events"));
		const eventsTable = new AsciiTable("Events");

		eventsTable.setHeading("Event", "Status");

		for(const file of files) {
			const pseudoPull = require(join(__dirname, "../Events", file));
			/**
			 * @type {BaseEvent}
			 */
			const pull = new pseudoPull(this);

			this.on(pull.name, (...args) => pull.run(...args));
			eventsTable.addRow(pull.name, "✅");
		}

		this.logger.success("client/events", "\n" + eventsTable.toString());
	}

	async __loadCommands() {
		const files = await readdir(join(__dirname, "../Commands/"));
		const commandsTable = new AsciiTable("Commands");

		commandsTable.setHeading("Command", "Status");

		for(const file of files) {
			const pseudoPull = require(join(__dirname, "../Commands/", file));

			/**
			 * @type {BaseCommand}
			 */
			const pull = new pseudoPull(this);

			commandsTable.addRow(pull.config.name, "✅");

			this.commands.set(pull.config.name, pull);
		}

		this.logger.success("client/commands", "\n" + commandsTable.toString());
	}

	// Utils and stuff I guess?

	/**
	 * @param {import("discord.js").ColorResolvable} color
	 * @param {import("discord.js").User} author
	 */
	embed(author, color = "GREEN") {
		return new MessageEmbed()
			.setTimestamp()
			.setColor(color)
			.setAuthor(author.tag, author.displayAvatarURL({
				dynamic: true,
			}));
	}
};