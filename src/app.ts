import { Telegraf, Scenes, Context, session } from "telegraf";
import LocalSession from "telegraf-session-local";
import { ConfigSrevice } from "./config/config.service";
import { IConfigService } from "./config/config.interface";
import { IBotContext } from "./interfaces/context.interface";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import { HelpCommand } from "./commands/help.comman";
import { WeatherCommand } from "./commands/weather.command";
import { AnimalCommand } from "./commands/animals.command";
import { PlacesCommand } from "./commands/places.command";
import { CreateTaskCommand } from "./commands/createTask.command";
import { connectionToDb } from "./config/db.config";
import { TaskScene } from "./scenes/taskScene";

class Bot {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];
  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));
    connectionToDb(configService.get("MONGO_URL"));
  }
  async init() {
    this.bot.use(session()).middleware();
    this.commands = [
      new StartCommand(this.bot),
      new HelpCommand(this.bot),
      new WeatherCommand(this.bot, new ConfigSrevice()),
      new AnimalCommand(this.bot, new ConfigSrevice(), "cat"),
      new AnimalCommand(this.bot, new ConfigSrevice(), "dog"),
      new PlacesCommand(this.bot, new ConfigSrevice()),
    ];
    for (const command of this.commands) {
      command.handle();
    }
    
    const stage = new Scenes.Stage<IBotContext>([TaskScene]);
    stage.register(TaskScene);
    this.bot.use(stage.middleware());

    (new CreateTaskCommand(this.bot)).handle()
    
    this.bot.launch();
  }
}
const bot = new Bot(new ConfigSrevice());
bot.init();