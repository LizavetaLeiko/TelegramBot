import { Telegraf, Scenes, Markup } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../interfaces/context.interface";


export class CreateTaskCommand extends Command{
  constructor(public bot: Telegraf<IBotContext>){
    super(bot)
  }
  handle(): void {
    this.bot.command("createTask", async (ctx) => {
      await ctx.scene.enter("task-scene");
    });
  }
}