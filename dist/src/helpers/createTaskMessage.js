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
exports.createTaskMessage = void 0;
const taskModel_1 = require("../models/taskModel");
function createTaskMessage(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield taskModel_1.TaskModel.findOne({ id });
        return data
            ? `
    Don't forget about your task!
✅ ${data.title}
  ${data.text}
  `
            : `You set a task reminder for this time, 
but unfortunately an error occurred and the text of the task was lost`;
    });
}
exports.createTaskMessage = createTaskMessage;
