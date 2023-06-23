import { Telegraf } from 'telegraf';

import { Command } from './command.class';

import { commands } from '@constants';
import { IBotContext } from '@interfaces';
import { createHelpMessage } from '@helpers';

export class HelpCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.help((ctx) =>
      ctx.reply(createHelpMessage()),
    );
  }
}