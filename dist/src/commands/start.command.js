"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCommand = void 0;
const command_class_1 = require("./command.class");
const constants_1 = require("../constants");
class StartCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
        this.bot = bot;
    }
    handle() {
        this.bot.start((ctx) => {
            const name = ctx.message.from.username || '';
            ctx.reply(constants_1.messages.info.helloMsg(name));
        });
    }
}
exports.StartCommand = StartCommand;
