"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRule = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const _constants_1 = require("../constants/index");
const createRule = function (msg) {
    const [day, month, year, hours, minutes] = msg.split(/[.:]/);
    const rule = new node_schedule_1.default.RecurrenceRule();
    rule.year = +year;
    rule.hour = +hours - _constants_1.fromUTC;
    rule.minute = +minutes;
    rule.date = +day;
    rule.month = +month - 1;
    return rule;
};
exports.createRule = createRule;
