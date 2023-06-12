import { Telegraf, Scenes, Context, session } from "telegraf";
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
import { WeatherScene } from "./scenes/weatherScene";

class Bot {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];
  sceneCommands: Command[] = [];
  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));
    connectionToDb(configService.get("MONGO_URL"));
  }
  async init() {
    this.bot.use(session()).middleware();
    this.commands = [
      new StartCommand(this.bot),
      new HelpCommand(this.bot),
      new AnimalCommand(this.bot, new ConfigSrevice(), "cat"),
      new AnimalCommand(this.bot, new ConfigSrevice(), "dog"),
      new PlacesCommand(this.bot, new ConfigSrevice()),
    ];
    for (const command of this.commands) {
      command.handle();
    }
    
    const stage = new Scenes.Stage<IBotContext>([TaskScene, WeatherScene]);
    stage.register(TaskScene, WeatherScene);
    this.bot.use(stage.middleware());

    this.sceneCommands = [
      new WeatherCommand(this.bot),
      new CreateTaskCommand(this.bot)
    ]
    for (const command of this.sceneCommands) {
      command.handle();
    }

    this.bot.launch();
  }
}
const bot = new Bot(new ConfigSrevice());
bot.init();