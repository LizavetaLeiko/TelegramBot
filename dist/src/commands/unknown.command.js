"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownCommand = void 0;
const command_class_1 = require("./command.class");
class UnknownCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
        this.bot = bot;
    }
    handle() {
        this.bot.command(/.*/, (ctx) => ctx.reply('There is no such command'));
    }
}
exports.UnknownCommand = UnknownCommand;
