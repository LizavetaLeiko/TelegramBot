import { Markup } from 'telegraf';

import { messages } from '@constants';
import { IMsgContext, ITask } from '@interfaces';
import { createTask, updateTask } from '@api';
import { setTaskRimender } from '@helpers';

export const titleHearer = async function (ctx: IMsgContext) {
  if (!ctx.message.text.trim() || ctx.message.text.length >= 60) {
    await ctx.reply(messages.errors.invalidTaskTitle);
    return;
  }

  const title = ctx.message.text.trim();
  ctx.session.task.title = title;
  ctx.session.task.user_id = ctx.message.from.id ? ctx.message.from.id : 0;
  await ctx.reply(messages.questions.askTaskContent);
  ctx.wizard.next();
};

export const taskHearer = async function (ctx: IMsgContext) {
  if (!ctx.message.text.trim()) {
    await ctx.reply(messages.errors.invalidTaskContent);
    return;
  }

  const text = ctx.message.text.trim();

  const taskData: ITask = {
    id: ctx.session.task.id,
    user_id: ctx.session.task.user_id,
    title: ctx.session.task.title,
    text,
    reminder: '',
  };

  const data = await createTask(taskData);
  if (typeof data === 'string') {
    ctx.reply(data);
  } else {
    ctx.reply(
      `${messages.info.taskCreated} ${messages.questions.askTaskReminder}`,
      Markup.inlineKeyboard([
        Markup.button.callback(messages.btns.setReminder, `setReminder_${taskData.id}`),
        Markup.button.callback(messages.btns.dontSetReminder, messages.btns.dontSetReminder),
      ]),
    );
  }
  ctx.wizard.next();
};

export const reminderHearer = async function (ctx: IMsgContext) {
  // checks if the message is a string of the form DD.MM.YYYY.HH:MM with values: day 0-32, month 1-12, year 2023-2099, hours 0-23, minutes 0-59
  const reg =
    /^(?:0[1-9]|[1-2][0-9]|3[0-1])\.(?:0[1-9]|1[0-2])\.(?:202[3-9]|20[3-9][0-9])\.(?:[01][0-9]|2[0-3]):(?:[0-5][0-9])$/;
  
  const userMsg = ctx.message.text;
  if (!reg.test(userMsg)) {
    ctx.reply(messages.errors.invalidTaskData);
    return;
  }

  const taskId = ctx.session.task.id;
  setTaskRimender(userMsg, taskId, ctx);
  updateTask(taskId, userMsg);
  ctx.reply(messages.info.remindSetted);
  ctx.scene.leave();
};
