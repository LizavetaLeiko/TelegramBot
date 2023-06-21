"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
const command_class_1 = require("./command.class");
const constants_1 = require("../constants");
class HelpCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
        this.bot = bot;
    }
    handle() {
        this.bot.help((ctx) => ctx.reply(`Commands: 
1. /${constants_1.commands.weather.value} - ${constants_1.commands.weather.desc} 
2. /${constants_1.commands.cat.value} - ${constants_1.commands.cat.desc}  
3. /${constants_1.commands.dog.value} - ${constants_1.commands.dog.desc} 
4. /${constants_1.commands.places.value} - ${constants_1.commands.places.desc} 
5. /${constants_1.commands.task.value} - ${constants_1.commands.task.desc} 
6. /${constants_1.commands.myTasks.value} - ${constants_1.commands.myTasks.desc} 
7. /${constants_1.commands.skip.value} - ${constants_1.commands.skip.desc}`));
    }
}
exports.HelpCommand = HelpCommand;
