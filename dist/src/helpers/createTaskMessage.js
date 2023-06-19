"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskMessage = void 0;
function createTaskMessage(task) {
    if (typeof task === 'string') {
        return `You set a task reminder for this time, 
but unfortunately an error occurred and the text of the task was lost`;
    }
    else {
        return `Don't forget about your task!
✅ ${task.title}
${task.text}
`;
    }
}
exports.createTaskMessage = createTaskMessage;
