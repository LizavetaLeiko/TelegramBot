import { Markup } from "telegraf";
import { IMsgContext, ITask } from "../../interfaces";
import { createTask, updateTask } from "../../api";
import setTaskRimender from "../shedulers/task.shedule";


export const titleHearer = async function (ctx: IMsgContext){
  if (!ctx.message.text.trim() || ctx.message.text.length >= 60) {
    await ctx.reply("Title can't be empty or longer than 60 symbols");
    return;
  }
  const title = ctx.message.text.trim();
  ctx.session.task.title = title;
  ctx.session.task.user_id = ctx.message.from.username
    ? ctx.message.from.username
    : "";
  await ctx.reply("Send me your task");
  ctx.wizard.next();
}

export const taskHearer = async function (ctx: IMsgContext){
  if (!ctx.message.text.trim()) {
    await ctx.reply("Task can't be empty");
    return;
  }
  const text = ctx.message.text.trim();
  const taskData: ITask = {
    id: ctx.session.task.id,
    user_id: ctx.session.task.user_id,
    title: ctx.session.task.title,
    text,
    reminder: ''
  };
  const data = await createTask(taskData);
  if (typeof data === "string") {
    ctx.reply(data);
  } else {
    ctx.reply(
      "Your task is created! Would you like to set a reminder?",
      Markup.inlineKeyboard([
        Markup.button.callback(
          "Set a reminder",
          `setReminder_${taskData.id}`
        ),
        Markup.button.callback("Don't remind me", `no`),
      ])
    );
  }
  ctx.wizard.next();
}

export const reminderHearer = async function (ctx: IMsgContext){
  const reg = /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}\.\d{2}:\d{2}$/;
    const userMsg = ctx.message.text
    if (!reg.test(userMsg)) {
      ctx.reply("Invalid data format");
      return;
    }
    const taskId = ctx.session.task.id
    setTaskRimender(userMsg,taskId, ctx )
    updateTask(taskId, userMsg)
    ctx.reply("Ok I will send you a reminder");
    ctx.scene.leave();
}