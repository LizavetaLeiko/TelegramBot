"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownCommand = void 0;
const _1 = require("./");
class UnknownCommand extends _1.Command {
    constructor(bot) {
        super(bot);
        this.bot = bot;
    }
    handle() {
        this.bot.command(/.*/, ctx => ctx.reply('There is no such command'));
    }
}
exports.UnknownCommand = UnknownCommand;
