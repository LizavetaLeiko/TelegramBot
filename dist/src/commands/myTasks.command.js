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
const api_1 = require("../api");
const createAllTasksMessage_1 = require("../helpers/createAllTasksMessage");
class MyTasksCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
        this.bot = bot;
    }
    handle() {
        this.bot.command('myTasks', (ctx) => __awaiter(this, void 0, void 0, function* () {
            const user_id = ctx.message.from.id || 0;
            const tasks = yield (0, api_1.getAllTasks)(user_id);
            if (Array.isArray(tasks) && tasks.length !== 0) {
                ctx.reply((0, createAllTasksMessage_1.createAllTasksMessage)(tasks), telegraf_1.Markup.inlineKeyboard([
                    telegraf_1.Markup.button.callback("Delete all tasks", "deleteTasks"),
                ]));
            }
            else if (Array.isArray(tasks) && tasks.length === 0) {
                ctx.reply((0, createAllTasksMessage_1.createAllTasksMessage)(tasks));
            }
            else if (typeof tasks === 'string') {
                ctx.reply(tasks);
            }
        }));
        this.bot.action("deleteTasks", ctx => {
            const user_id = ctx.update.callback_query.from.id || 0;
            (0, api_1.deleteAllTasks)(user_id);
            ctx.reply('Your tasks removed');
        });
    }
}
exports.MyTasksCommand = MyTasksCommand;
