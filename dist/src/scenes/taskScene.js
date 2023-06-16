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
exports.TaskScene = void 0;
const telegraf_1 = require("telegraf");
const uuid_1 = require("uuid");
const task_hearers_1 = require("../helpers/hearers/task.hearers");
exports.TaskScene = new telegraf_1.Scenes.WizardScene("task-scene", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    return ctx.wizard.next();
}));
exports.TaskScene.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.task = {
        id: (0, uuid_1.v4)(),
        title: "",
        user_id: "",
        text: "",
    };
    yield ctx.reply("Send me a title of the new task");
}));
exports.TaskScene.hears(/.*/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.wizard.cursor === 0) {
        (0, task_hearers_1.titleHearer)(ctx);
    }
    else if (ctx.wizard.cursor === 1) {
        (0, task_hearers_1.taskHearer)(ctx);
    }
    else {
        (0, task_hearers_1.reminderHearer)(ctx);
    }
})),
    exports.TaskScene.action(/setReminder_*/, (ctx4) => __awaiter(void 0, void 0, void 0, function* () {
        ctx4.reply(`When should I to remind you? 
Please, send me a date in format DD.MM.YYYY.00:00 
without any smiles or spaces(for example 09.09.2023.14:00)`);
        ctx4.wizard.next();
    }));
exports.TaskScene.action("no", (ctx4) => __awaiter(void 0, void 0, void 0, function* () {
    ctx4.reply("Ok, i wouldn't remind you");
    ctx4.scene.leave();
}));
