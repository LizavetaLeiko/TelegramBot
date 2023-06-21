import { ITask } from '../interfaces';

export function createAllTasksMessage(tasks: ITask[]): string {
  if (tasks.length === 0) {
    return `There is no tasks
Create one by /task command`;
  }

  const response = tasks.map(
    (task: ITask, i: number) => `${++i}. ${task.title}`,
  );

  response.unshift('Titles of your actual tasks:');
  
  return response.join('\n');
}
