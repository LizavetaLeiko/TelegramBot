"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCommand = void 0;
const command_class_1 = require("./command.class");
class StartCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
        this.bot = bot;
    }
    handle() {
        this.bot.start((ctx) => {
            ctx.reply('Hello, send me "/help" to see what i can do');
        });
    }
}
exports.StartCommand = StartCommand;
