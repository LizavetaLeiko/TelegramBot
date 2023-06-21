import { Telegraf } from 'telegraf';

import { Command } from './';

import { IBotContext } from '../interfaces';

export class UnknownCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command(/.*/, (ctx) => ctx.reply('There is no such command'));
  }
}
