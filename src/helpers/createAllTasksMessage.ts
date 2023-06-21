import { messages } from '../constants';
import { ITask } from '../interfaces';

export function createAllTasksMessage(tasks: ITask[]): string {
  if (tasks.length === 0) {
    return messages.info.noTasks;
  }

  const response = tasks.map(
    (task: ITask, i: number) => `${++i}. ${task.title}`,
  );

  response.unshift(messages.info.taskTitles);

  return response.join('\n');
}
