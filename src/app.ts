import { IConfigService } from "./config/config.interface";
import { ConfigSrevice } from "./config/config.service";
import { Telegraf } from "telegraf";
import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import  LocalSession from "telegraf-session-local"
import * as dotenv from 'dotenv';
import { HelpCommand } from "./commands/help.command copy";
import { WeatherCommand } from "./commands/weather.command";

class Bot{ 
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];
  constructor(private readonly configService: IConfigService){
    this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'))
    this.bot.use(new LocalSession({ database: 'sessions.json' }).middleware())
  }
  init(){
    this.commands = [new StartCommand(this.bot), new HelpCommand(this.bot), new WeatherCommand(this.bot, new ConfigSrevice())]
    for (const command of this.commands){
      command.handle()
    }
    this.bot.launch()
  }
}
const bot = new Bot(new ConfigSrevice());
bot.init();