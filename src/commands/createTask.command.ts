import { Telegraf } from 'telegraf';

import { Command } from './command.class';

import { IBotContext } from '../interfaces';

export class CreateTaskCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('task', async (ctx) => {
      await ctx.scene.enter('task-scene');
    });
  }
}
