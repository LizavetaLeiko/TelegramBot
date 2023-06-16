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
        ctx.reply(yield (0, createTaskMessage_1.createTaskMessage)(taskId));
    }));
}
exports.default = setTaskRimender;
