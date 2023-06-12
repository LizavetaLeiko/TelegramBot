import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../interfaces/context.interface";


export class HelpCommand extends Command{
  constructor(public bot: Telegraf<IBotContext>){
    super(bot)
  }
  handle(): void {
    this.bot.help(ctx => ctx.reply(`Commands: 
1. /weather - to get weather forecast for 3 days. 
2. /cat - to get a cat picture. 
3. /dog - to get a dog picture.
4. /places - to get advice where to go by category
5. /task - to create a task and a reminder for it`))
  }
}