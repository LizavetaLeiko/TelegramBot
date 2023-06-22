"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyTasksCommand = void 0;
const telegraf_1 = require("telegraf");
const command_class_1 = require("./command.class");
const _constants_1 = require("@constants");
const _api_1 = require("@api");
const _helpers_1 = require("@helpers");
class MyTasksCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
        this.bot = bot;
    }
    handle() {
        this.bot.command(_constants_1.commands.myTasks.value, (ctx) => __awaiter(this, void 0, void 0, function* () {
            const userId = ctx.message.from.id || 0;
            const tasks = yield (0, _api_1.getAllTasks)(userId);
            if (Array.isArray(tasks)) {
                ctx.reply((0, _helpers_1.createAllTasksMessage)(tasks), tasks.length !== 0 ?
                    telegraf_1.Markup.inlineKeyboard([
                        telegraf_1.Markup.button.callback(_constants_1.messages.btns.deleteTasks, _constants_1.messages.btns.deleteTasks),
                    ])
                    : {});
            }
            else {
                ctx.reply(tasks);
            }
        }));
        this.bot.action(_constants_1.messages.btns.deleteTasks, (ctx) => {
            const userId = ctx.update.callback_query.from.id || 0;
            (0, _api_1.deleteAllTasks)(userId);
            ctx.reply(_constants_1.messages.info.tasksRemoved);
        });
    }
}
exports.MyTasksCommand = MyTasksCommand;
