"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
const command_class_1 = require("./command.class");
class HelpCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
        this.bot = bot;
    }
    handle() {
        this.bot.help(ctx => ctx.reply(`Commands: 
1. /weather - to get weather forecast for 3 days. 
2. /cat - to get a cat picture. 
3. /dog - to get a dog picture.
4. /places - to get advice where to go by category`));
    }
}
exports.HelpCommand = HelpCommand;
