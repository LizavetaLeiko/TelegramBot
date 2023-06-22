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
exports.setTaskRimender = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const _api_1 = require("../../api/index");
const _helpers_1 = require("../index");
function setTaskRimender(msg, taskId, ctx) {
    const rule = (0, _helpers_1.createRule)(msg);
    node_schedule_1.default.scheduleJob(rule, () => __awaiter(this, void 0, void 0, function* () {
        const task = yield (0, _api_1.getTask)(taskId);
        if (task) {
            ctx.reply((0, _helpers_1.createTaskMessage)(task));
        }
    }));
}
exports.setTaskRimender = setTaskRimender;
