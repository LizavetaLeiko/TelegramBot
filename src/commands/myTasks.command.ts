import { Markup, Telegraf } from 'telegraf';

import { Command } from './';

import { IBotContext } from '../interfaces';
import { deleteAllTasks, getAllTasks } from '../api';
import { createAllTasksMessage } from '../helpers';

export class MyTasksCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('myTasks', async (ctx) => {
      const userId = ctx.message.from.id || 0;
      const tasks = await getAllTasks(userId);

      if (Array.isArray(tasks) && tasks.length !== 0) {
        ctx.reply(
          createAllTasksMessage(tasks),
          Markup.inlineKeyboard([
            Markup.button.callback('Delete all tasks', 'deleteTasks'),
          ]),
        );
      } else if (Array.isArray(tasks) && tasks.length === 0) {
        ctx.reply(createAllTasksMessage(tasks));
      } else if (typeof tasks === 'string') {
        ctx.reply(tasks);
      }
    });
    
    this.bot.action('deleteTasks', (ctx) => {
      const userId = ctx.update.callback_query.from.id || 0;
      deleteAllTasks(userId);
      ctx.reply('Your tasks removed');
    });
  }
}
