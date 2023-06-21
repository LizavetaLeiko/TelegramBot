import { Telegraf } from 'telegraf';

import { Command } from './command.class';

import { commands } from '../constants';
import { IBotContext } from '../interfaces';

export class HelpCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.help((ctx) =>
      ctx.reply(`Commands: 
1. /${commands.weather.value} - ${commands.weather.desc} 
2. /${commands.cat.value} - ${commands.cat.desc}  
3. /${commands.dog.value} - ${commands.dog.desc} 
4. /${commands.places.value} - ${commands.places.desc} 
5. /${commands.task.value} - ${commands.task.desc} 
6. /${commands.myTasks.value} - ${commands.myTasks.desc} 
7. /${commands.skip.value} - ${commands.skip.desc}`),
    );
  }
}
