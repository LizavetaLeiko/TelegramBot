import { messages } from '../constants';
import { ITask } from '../interfaces';

export function createTaskMessage(task: ITask | string): string {
  if (typeof task === 'string') {
    return messages.errors.taskIsNotFound;
  } else {
    return messages.info.taskReminder(task);
  }
}
