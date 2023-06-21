"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownCommand = void 0;
const command_class_1 = require("./command.class");
const constants_1 = require("../constants");
class UnknownCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
        this.bot = bot;
    }
    handle() {
        this.bot.command(/.*/, (ctx) => ctx.reply(constants_1.messages.errors.unknownCommand));
    }
}
exports.UnknownCommand = UnknownCommand;
