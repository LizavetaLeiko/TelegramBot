"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
const command_class_1 = require("./command.class");
const _helpers_1 = require("../helpers/index");
class HelpCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
        this.bot = bot;
    }
    handle() {
        this.bot.help((ctx) => ctx.reply((0, _helpers_1.createHelpMessage)()));
    }
}
exports.HelpCommand = HelpCommand;
