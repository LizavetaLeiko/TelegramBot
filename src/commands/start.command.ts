import { Telegraf } from 'telegraf';

import { Command } from './command.class';

import { IBotContext } from '../interfaces';

export class StartCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      ctx.reply(
        `Hello ${ctx.message.from.username}, send me "/help" to see what i can do`,
      );
    });
  }
}
