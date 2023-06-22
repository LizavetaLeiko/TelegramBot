import { Telegraf } from 'telegraf';

import { Command } from './command.class';

import { messages } from '@constants';
import { IBotContext } from '@interfaces';

export class StartCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      const name = ctx.message.from.username || '';
      ctx.reply(messages.info.helloMsg(name));
    });
  }
}
