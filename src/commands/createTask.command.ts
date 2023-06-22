import { Telegraf } from 'telegraf';

import { Command } from '@commands';
import { commands } from '@constants';
import { IBotContext } from '@interfaces';

export class CreateTaskCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command(commands.task.value, async (ctx) => {
      await ctx.scene.enter('task-scene');
    });
  }
}
