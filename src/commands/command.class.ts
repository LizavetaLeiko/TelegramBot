import { Telegraf } from 'telegraf';

import { IBotContext } from '../interfaces';

export abstract class Command {
  bot: Telegraf<IBotContext>;

  constructor(bot: Telegraf<IBotContext>) {
    this.bot = bot;
  }
  abstract handle(): void;
}
