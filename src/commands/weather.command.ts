import { Telegraf } from 'telegraf';

import { Command } from './';

import { IBotContext } from '../interfaces';

export class WeatherCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('weather', async (ctx) => {
      await ctx.scene.enter('weather-scene');
    });
  }
}
