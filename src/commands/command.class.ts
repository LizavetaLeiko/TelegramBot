import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { IConfigService } from "../config/config.interface";

export abstract class Command{
  constructor(bot: Telegraf<IBotContext>, configService?: IConfigService, animal?: string ){
  }
  abstract handle(): void
}