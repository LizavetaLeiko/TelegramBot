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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reminderHearer = exports.taskHearer = exports.titleHearer = void 0;
const telegraf_1 = require("telegraf");
const api_1 = require("../../api");
const task_shedule_1 = __importDefault(require("../shedulers/task.shedule"));
const titleHearer = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ctx.message.text.trim() || ctx.message.text.length >= 60) {
            yield ctx.reply("Title can't be empty or longer than 60 symbols");
            return;
        }
        const title = ctx.message.text.trim();
        ctx.session.task.title = title;
        ctx.session.task.user_id = ctx.message.from.id
            ? ctx.message.from.id
            : 0;
        yield ctx.reply("Send me your task");
        ctx.wizard.next();
    });
};
exports.titleHearer = titleHearer;
const taskHearer = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ctx.message.text.trim()) {
            yield ctx.reply("Task can't be empty");
            return;
        }
        const text = ctx.message.text.trim();
        const taskData = {
            id: ctx.session.task.id,
            user_id: ctx.session.task.user_id,
            title: ctx.session.task.title,
            text,
            reminder: ''
        };
        const data = yield (0, api_1.createTask)(taskData);
        if (typeof data === "string") {
            ctx.reply(data);
        }
        else {
            ctx.reply("Your task is created! Would you like to set a reminder?", telegraf_1.Markup.inlineKeyboard([
                telegraf_1.Markup.button.callback("Set a reminder", `setReminder_${taskData.id}`),
                telegraf_1.Markup.button.callback("Don't remind me", `no`),
            ]));
        }
        ctx.wizard.next();
    });
};
exports.taskHearer = taskHearer;
const reminderHearer = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const reg = /^(?:0[1-9]|[1-2][0-9]|3[0-1])\.(?:0[1-9]|1[0-2])\.(?:202[3-9]|20[3-9][0-9])\.(?:[01][0-9]|2[0-3]):(?:[0-5][0-9])$/;
        const userMsg = ctx.message.text;
        if (!reg.test(userMsg)) {
            ctx.reply("Invalid data format");
            return;
        }
        const taskId = ctx.session.task.id;
        (0, task_shedule_1.default)(userMsg, taskId, ctx);
        (0, api_1.updateTask)(taskId, userMsg);
        ctx.reply("Ok I will send you a reminder");
        ctx.scene.leave();
    });
};
exports.reminderHearer = reminderHearer;
