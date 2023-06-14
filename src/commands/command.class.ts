import { Telegraf } from "telegraf";
import { IBotContext } from "../interfaces/context.interface";

export abstract class Command {
  constructor(bot: Telegraf<IBotContext>, animal?: string) {
  }
  abstract handle(): void
}