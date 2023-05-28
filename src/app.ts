import { IConfigService } from "./config/config.interface";
import { ConfigSrevice } from "./config/config.service";
import { Telegraf } from "telegraf";
import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import  LocalSession from "telegraf-session-local"
import * as dotenv from 'dotenv';
import { HelpCommand } from "./commands/help.command copy";

dotenv.config();

class Bot{ 
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];
  constructor(private readonly configService: IConfigService){
    this.bot = new Telegraf<IBotContext>(process.env.TOKEN || '')
    this.bot.use(new LocalSession({ database: 'sessions.json' }).middleware())
  }
  init(){
    this.commands = [new StartCommand(this.bot), new HelpCommand(this.bot)]
    for (const command of this.commands){
      command.handle()
    }
    this.bot.launch()
  }
}
const bot = new Bot(new ConfigSrevice());
bot.init();