"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskMessage = void 0;
const _constants_1 = require("@constants");
function createTaskMessage(task) {
    if (typeof task === 'string') {
        return _constants_1.messages.errors.taskIsNotFound;
    }
    else {
        return _constants_1.messages.info.taskReminder(task);
    }
}
exports.createTaskMessage = createTaskMessage;
