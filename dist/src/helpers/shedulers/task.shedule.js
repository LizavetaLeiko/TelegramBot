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
const node_schedule_1 = __importDefault(require("node-schedule"));
const createTaskMessage_1 = require("../createTaskMessage");
const api_1 = require("../../api");
function setTaskRimender(msg, taskId, ctx) {
    const fromUTC = 3;
    const [day, month, year, hours, minutes] = msg.split(/[.:]/);
    const rule = new node_schedule_1.default.RecurrenceRule();
    rule.year = +year;
    rule.hour = +hours - fromUTC;
    rule.minute = +minutes;
    rule.date = +day;
    rule.month = +month - 1;
    node_schedule_1.default.scheduleJob(rule, () => __awaiter(this, void 0, void 0, function* () {
        const task = yield (0, api_1.getTask)(taskId);
        if (task) {
            ctx.reply((0, createTaskMessage_1.createTaskMessage)(task));
        }
    }));
}
exports.default = setTaskRimender;
