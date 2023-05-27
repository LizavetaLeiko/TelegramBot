import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";

export abstract class Command{
  constructor(bot: Telegraf<IBotContext>){

  }
  abstract handle(): void
}