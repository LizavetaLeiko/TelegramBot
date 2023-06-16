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
exports.TaskScene = void 0;
const telegraf_1 = require("telegraf");
const node_schedule_1 = __importDefault(require("node-schedule"));
const uuid_1 = require("uuid");
const api_1 = require("../api");
const createTaskMessage_1 = require("../helpers/createTaskMessage");
exports.TaskScene = new telegraf_1.Scenes.WizardScene("task-scene", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    return ctx.wizard.next();
}));
exports.TaskScene.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.task = { id: (0, uuid_1.v4)(), title: "", user_id: "", text: "" };
    yield ctx.reply("Send me a title of the new task");
}));
exports.TaskScene.hears(/.*/, (ctx2) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx2.wizard.cursor === 0) {
        if (!ctx2.message.text.trim() || ctx2.message.text.length >= 100) {
            yield ctx2.reply("Title can't be empty or longer than 100 symbols");
            return;
        }
        const title = ctx2.message.text.trim();
        ctx2.session.task.title = title;
        ctx2.session.task.user_id = ctx2.message.from.username
            ? ctx2.message.from.username
            : "";
        yield ctx2.reply("Send me your task");
        ctx2.wizard.next();
    }
    else if (ctx2.wizard.cursor === 1) {
        if (!ctx2.message.text.trim()) {
            yield ctx2.reply("Task can't be empty");
            return;
        }
        const text = ctx2.message.text.trim();
        const taskData = {
            id: ctx2.session.task.id,
            user_id: ctx2.session.task.user_id,
            title: ctx2.session.task.title,
            text,
        };
        const data = yield (0, api_1.createTask)(taskData);
        if (typeof data === "string") {
            ctx2.reply(data);
        }
        else {
            ctx2.reply("Your task is created! Would you like to set a reminder?", telegraf_1.Markup.inlineKeyboard([
                telegraf_1.Markup.button.callback("Set a reminder", `setReminder_${taskData.id}`),
                telegraf_1.Markup.button.callback("Don't remind me", `no`),
            ]));
        }
        ctx2.wizard.next();
    }
    else {
        const reg = /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}\.\d{2}:\d{2}$/;
        if (!reg.test(ctx2.message.text)) {
            ctx2.reply("Invalid data format");
            return;
        }
        const taskId = ctx2.session.task.id;
        const [day, month, year, hours, minutes] = ctx2.message.text.split(/[.:]/);
        const rule = new node_schedule_1.default.RecurrenceRule();
        rule.year = +year;
        rule.hour = +hours - 3;
        rule.minute = +minutes;
        rule.date = +day;
        rule.month = +month - 1;
        node_schedule_1.default.scheduleJob(rule, () => __awaiter(void 0, void 0, void 0, function* () {
            ctx2.reply(yield (0, createTaskMessage_1.createTaskMessage)(taskId));
        }));
        ctx2.reply("Ok I will send you a reminder");
        ctx2.scene.leave();
    }
})),
    exports.TaskScene.action(/setReminder_*/, (ctx4) => __awaiter(void 0, void 0, void 0, function* () {
        ctx4.reply("When should I to remind you? Please, send me a date in format DD.MM.YYYY.00:00 without any smiles or spaces(for example 09.09.2023.14:00)");
        ctx4.wizard.next();
    }));
exports.TaskScene.action("no", (ctx4) => __awaiter(void 0, void 0, void 0, function* () {
    ctx4.reply("Ok, i wouldn't remind you");
    ctx4.scene.leave();
}));
