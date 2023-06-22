import { Telegraf } from 'telegraf';

import { Command } from './command.class';

import { commands } from '@constants';
import { IBotContext } from '@interfaces';

export class WeatherCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command(commands.weather.value, async (ctx) => {
      await ctx.scene.enter('weather-scene');
    });
  }
}
