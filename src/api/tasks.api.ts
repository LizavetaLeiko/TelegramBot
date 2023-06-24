import { TaskModel } from '@models';
import { ITask } from '@interfaces';
import { handleErrors } from '@helpers';

export async function createTask(taskData: ITask) {
  return  handleErrors(async () => {
    const task = await TaskModel.create(taskData);
    return task;
  });
}

export async function updateTask(id: string, reminder: string) {
  return handleErrors(async () => {
    const task = await TaskModel.findOne({ id });
    if (task) {
      task.reminder = reminder;
      await task.save();
      return task;
    }
    return task;
  });
}

export async function getTask(id: string) {
  return handleErrors(async () => {
    const task = await TaskModel.findOne({ id });
    return task;
  });
}

export async function getAllTasks(user_id: number) {
  return handleErrors(async () => {
    const tasks = await TaskModel.find({ user_id });
    return tasks;
  });
}

export async function deleteAllTasks(user_id: number) {
  return handleErrors(async () => {
    const tasks = await TaskModel.deleteMany({ user_id });
    return tasks;
  });
}

// export async function createTask(taskData: ITask) {
//   try {
//     const task = await TaskModel.create(taskData);
//     return task;
//   } catch (error) {
//     return messages.errors.unknownErr;
//   }
// }

// export async function updateTask(id: string, reminder: string) {
//   try {
//     const task = await TaskModel.findOne({ id });
//     if (task) {
//       task.reminder = reminder;
//       await task.save();
//       return task;
//     }
//     return task;
//   } catch (error) {
//     return messages.errors.unknownErr;
//   }
// }

// export async function getTask(id: string) {
//   try {
//     const task = await TaskModel.findOne({ id });
//     return task;
//   } catch (error) {
//     return messages.errors.unknownErr;
//   }
// }

// export async function getAllTasks(user_id: number) {
//   try {
//     const tasks = await TaskModel.find({ user_id });
//     return tasks;
//   } catch (error) {
//     return messages.errors.unknownErr;
//   }
// }

// export async function deleteAllTasks(user_id: number) {
//   try {
//     const tasks = await TaskModel.deleteMany({ user_id });
//     return tasks;
//   } catch (error) {
//     return messages.errors.unknownErr;
//   }
// }

