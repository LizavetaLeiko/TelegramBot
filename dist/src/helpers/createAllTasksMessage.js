"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAllTasksMessage = void 0;
function createAllTasksMessage(tasks) {
    if (tasks.length === 0) {
        return `There is no tasks
Create one by /task command`;
    }
    const response = tasks.map((task, i) => `${++i}. ${task.title}`);
    response.unshift('Titles of your actual tasks:');
    return response.join('\n');
}
exports.createAllTasksMessage = createAllTasksMessage;
