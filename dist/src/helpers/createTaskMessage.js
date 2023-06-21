"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskMessage = void 0;
const constants_1 = require("../constants");
function createTaskMessage(task) {
    if (typeof task === 'string') {
        return constants_1.messages.errors.taskIsNotFound;
    }
    else {
        return constants_1.messages.info.taskReminder(task);
    }
}
exports.createTaskMessage = createTaskMessage;
