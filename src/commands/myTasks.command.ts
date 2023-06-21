import { Markup, Telegraf } from 'telegraf';

import { Command } from './command.class';

import { commands, messages } from '../constants';
import { IBotContext } from '../interfaces';
import { deleteAllTasks, getAllTasks } from '../api';
import { createAllTasksMessage } from '../helpers';

export class MyTasksCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command(commands.myTasks.value, async (ctx) => {
      const userId = ctx.message.from.id || 0;
      const tasks = await getAllTasks(userId);
      if (Array.isArray(tasks)) {
        ctx.reply(
          createAllTasksMessage(tasks),
          tasks.length !== 0 ? 
            Markup.inlineKeyboard([
              Markup.button.callback(messages.btns.deleteTasks, messages.btns.deleteTasks),
            ]) 
            : {},
        );
      } else {
        ctx.reply(tasks);
      }
    });
    
    this.bot.action(messages.btns.deleteTasks, (ctx) => {
      const userId = ctx.update.callback_query.from.id || 0;
      deleteAllTasks(userId);
      ctx.reply(messages.info.tasksRemoved);
    });
  }
}
