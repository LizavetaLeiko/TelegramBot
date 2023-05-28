import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";


export class HelpCommand extends Command{
  constructor(public bot: Telegraf<IBotContext>){
    super(bot)
  }
  handle(): void {
    this.bot.help(ctx => ctx.reply('Commands: 1. /weater - to get weather to 3 days. 2. /cat - to get a cat picture. 3. /dog - to get a dog picture'))
  }
}