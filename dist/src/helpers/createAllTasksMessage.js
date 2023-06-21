"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAllTasksMessage = void 0;
const constants_1 = require("../constants");
function createAllTasksMessage(tasks) {
    if (tasks.length === 0) {
        return constants_1.messages.info.noTasks;
    }
    const response = tasks.map((task, i) => `${++i}. ${task.title}`);
    response.unshift(constants_1.messages.info.taskTitles);
    return response.join('\n');
}
exports.createAllTasksMessage = createAllTasksMessage;
