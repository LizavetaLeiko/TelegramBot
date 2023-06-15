import { ITask } from "../interfaces/task.interface";
import { TaskModel } from "../models/taskModel";

export async function createTaskMessage(id: string): Promise<string>{
  const data: ITask | null = await TaskModel.findOne({id})
  return data ? `
    Don't forget about your task!
✅ ${data.title}
  ${data.text}
  ` : `You set a task reminder for this time, but unfortunately an error occurred and the text of the task was lost`
}