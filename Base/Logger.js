const { stripIndents } = require("common-tags");

module.exports = class Logger {
	constructor() {
		this.colors = {
			green: "\x1b[32m",
			reset: "\x1b[0m",
			red: "\x1b[31m",
			yellow: "\x1b[33m",
			blue: "\x1b[34m",
		};
	}

	success(ctx, message) {
		console.log(`${this.colors.green}${new Date().toISOString()} ${ctx}: ${this.colors.reset} ${message}`);
	}

	error(ctx, message, stack) {
		console.log(stripIndents`
			${this.colors.red}${new Date().toUTCString()} ${ctx}: ${this.colors.reset} 
			${this.colors.red} Message: ${this.colors.reset}${message}
			${this.colors.red} Stack Trace: ${this.colors.reset} ${stack || "Not provided"}
		`);
	}

	info(ctx, message) {
		console.log(`${this.colors.blue}${new Date().toISOString()} ${ctx}: ${this.colors.reset} ${message}`);
	}

	warn(ctx, message) {
		console.log(`${this.colors.yellow}${new Date().toISOString()} ${ctx}: ${this.colors.reset} ${message}`);
	}
};