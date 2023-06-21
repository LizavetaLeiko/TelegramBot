import { Telegraf } from 'telegraf';

import { Command } from './';

import { IBotContext } from '../interfaces';

export class HelpCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.help((ctx) =>
      ctx.reply(`Commands: 
1. /weather - to get weather forecast for 3 days. 
2. /cat - to get a cat picture. 
3. /dog - to get a dog picture.
4. /places - to get advice where to go by category
5. /task - to create a task and a reminder for it
6. /myTasks - to get titles of your actual tasks and remove them if you would like to do it
7. /skip - if you would like to change the topic of the dialog and call another command (it works only in scenes)`),
    );
  }
}
