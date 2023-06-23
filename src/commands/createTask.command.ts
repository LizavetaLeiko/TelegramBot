import { Telegraf } from 'telegraf';

import { Command } from './command.class';

import { commands, scenes } from '@constants';
import { IBotContext } from '@interfaces';

export class CreateTaskCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command(commands.task.value, async (ctx) => {
      await ctx.scene.enter(scenes.task);
    });
  }
}
