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
exports.reminderHearer = exports.taskHearer = exports.titleHearer = void 0;
const telegraf_1 = require("telegraf");
const _constants_1 = require("@constants");
const _api_1 = require("@api");
const _helpers_1 = require("@helpers");
const titleHearer = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ctx.message.text.trim() || ctx.message.text.length >= 60) {
            yield ctx.reply(_constants_1.messages.errors.invalidTaskTitle);
            return;
        }
        const title = ctx.message.text.trim();
        ctx.session.task.title = title;
        ctx.session.task.user_id = ctx.message.from.id ? ctx.message.from.id : 0;
        yield ctx.reply(_constants_1.messages.questions.askTaskContent);
        ctx.wizard.next();
    });
};
exports.titleHearer = titleHearer;
const taskHearer = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ctx.message.text.trim()) {
            yield ctx.reply(_constants_1.messages.errors.invalidTaskContent);
            return;
        }
        const text = ctx.message.text.trim();
        const taskData = {
            id: ctx.session.task.id,
            user_id: ctx.session.task.user_id,
            title: ctx.session.task.title,
            text,
            reminder: '',
        };
        const data = yield (0, _api_1.createTask)(taskData);
        if (typeof data === 'string') {
            ctx.reply(data);
        }
        else {
            ctx.reply(`${_constants_1.messages.info.taskCreated} ${_constants_1.messages.questions.askTaskReminder}`, telegraf_1.Markup.inlineKeyboard([
                telegraf_1.Markup.button.callback(_constants_1.messages.btns.setReminder, `setReminder_${taskData.id}`),
                telegraf_1.Markup.button.callback(_constants_1.messages.btns.dontSetReminder, _constants_1.messages.btns.dontSetReminder),
            ]));
        }
        ctx.wizard.next();
    });
};
exports.taskHearer = taskHearer;
const reminderHearer = function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        // checks if the message is a string of the form DD.MM.YYYY.HH:MM with values: day 0-32, month 1-12, year 2023-2099, hours 0-23, minutes 0-59
        const reg = /^(?:0[1-9]|[1-2][0-9]|3[0-1])\.(?:0[1-9]|1[0-2])\.(?:202[3-9]|20[3-9][0-9])\.(?:[01][0-9]|2[0-3]):(?:[0-5][0-9])$/;
        const userMsg = ctx.message.text;
        if (!reg.test(userMsg)) {
            ctx.reply(_constants_1.messages.errors.invalidTaskData);
            return;
        }
        const taskId = ctx.session.task.id;
        (0, _helpers_1.setTaskRimender)(userMsg, taskId, ctx);
        (0, _api_1.updateTask)(taskId, userMsg);
        ctx.reply(_constants_1.messages.info.remindSetted);
        ctx.scene.leave();
    });
};
exports.reminderHearer = reminderHearer;
