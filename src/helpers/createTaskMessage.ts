import { ITask } from "../interfaces";

export function createTaskMessage(task: ITask | string): string {
  if (typeof task === "string") {
    return `You set a task reminder for this time, 
but unfortunately an error occurred and the text of the task was lost`;
  } else {
    return `Don't forget about your task!
✅ ${task.title}
${task.text}
`;
  }
}
