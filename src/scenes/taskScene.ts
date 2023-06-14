import { Markup, Scenes } from "telegraf";
import { IBotContext } from "../interfaces/context.interface";
import { v4 as uuidv4 } from "uuid";
import { ITask } from "../interfaces/task.interface";
import { createTaskMessage } from "../helpers/createTaskMessage";
import { createTask } from "../api";
import { CronJob } from "cron";
import  schedule  from 'node-schedule';

export const TaskScene = new Scenes.WizardScene<IBotContext>(
  "task-scene",
  async (ctx) => {
    return ctx.wizard.next();
  }
);

TaskScene.enter(async (ctx) => {
  ctx.session.task = { id: uuidv4(), title: "", user_id: "", text: "" };
  await ctx.reply("Send me a title of the new task");
});
TaskScene.hears(/.*/, async (ctx2) => {
  if (ctx2.wizard.cursor === 0) {
    if (!ctx2.message.text.trim() || ctx2.message.text.length >= 100) {
      await ctx2.reply("Title can't be empty or longer than 100 symbols");
      return;
    }
    const title = ctx2.message.text.trim();
    ctx2.session.task.title = title;
    ctx2.session.task.user_id = ctx2.message.from.username
      ? ctx2.message.from.username
      : "";
    await ctx2.reply("Send me your task");
    ctx2.wizard.next();
  } else if (ctx2.wizard.cursor === 1) {
    if (!ctx2.message.text.trim()) {
      await ctx2.reply("Task can't be empty");
      return;
    }
    const text = ctx2.message.text.trim();
    const taskData: ITask = {
      id: ctx2.session.task.id,
      user_id: ctx2.session.task.user_id,
      title: ctx2.session.task.title,
      text,
    };
    const data = await createTask(taskData);
    if (typeof data === "string") {
      ctx2.reply(data);
    } else {
      ctx2.reply(
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
    ctx2.wizard.next();
  } else {
    const reg = /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}\.\d{2}:\d{2}$/;
    if (!reg.test(ctx2.message.text)) {
      ctx2.reply("Invalid data format");
      return;
    }
    const taskId = ctx2.session.task.id
    const [day, month, year, hours, minutes] = ctx2.message.text.split(/[.:]/);
    const rule = new schedule.RecurrenceRule();
    rule.year = +year;
    rule.hour = +hours;
    rule.minute = +minutes;
    rule.date = +day;
    rule.month = +month - 1;
    schedule.scheduleJob(rule, async () => {
      ctx2.reply(await createTaskMessage(taskId));
    });
    ctx2.reply("Ok I will send you a reminder");
    ctx2.scene.leave();
  }
}),
TaskScene.action(/setReminder_*/, async (ctx4) => {
  ctx4.reply(
    "When should I to remind you? Please, send me a date in format DD.MM.YYYY.00:00 without any smiles or spaces(for example 09.09.2023.14:00)"
  );
  ctx4.wizard.next();
});
TaskScene.action("no", async (ctx4) => {
  ctx4.reply("Ok, i wouldn't remind you");
  ctx4.scene.leave();
});
