import { Telegraf } from 'telegraf';

import { Command } from './command.class';

import { commands, scenes } from '@constants';
import { IBotContext } from '@interfaces';

export class UnsubscribeCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command(commands.unsubscribeWeather.value, async (ctx) => {
      await ctx.scene.enter(scenes.unsubsc);
    });
  }
}
