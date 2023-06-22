"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
const command_class_1 = require("./command.class");
const _constants_1 = require("@constants");
class HelpCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
        this.bot = bot;
    }
    handle() {
        this.bot.help((ctx) => ctx.reply(`Commands: 
1. /${_constants_1.commands.weather.value} - ${_constants_1.commands.weather.desc} 
2. /${_constants_1.commands.cat.value} - ${_constants_1.commands.cat.desc}  
3. /${_constants_1.commands.dog.value} - ${_constants_1.commands.dog.desc} 
4. /${_constants_1.commands.places.value} - ${_constants_1.commands.places.desc} 
5. /${_constants_1.commands.task.value} - ${_constants_1.commands.task.desc} 
6. /${_constants_1.commands.myTasks.value} - ${_constants_1.commands.myTasks.desc} 
7. /${_constants_1.commands.skip.value} - ${_constants_1.commands.skip.desc}`));
    }
}
exports.HelpCommand = HelpCommand;
