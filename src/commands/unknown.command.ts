import { Telegraf } from 'telegraf';

import { Command } from '@commands';
import { messages } from '@constants';
import { IBotContext } from '@interfaces';

export class UnknownCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command(/.*/, (ctx) => ctx.reply(messages.errors.unknownCommand));
  }
}
