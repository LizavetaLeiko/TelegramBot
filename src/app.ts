import { Telegraf, Scenes, session } from "telegraf";
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
import { config } from "dotenv";

class Bot {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];
  sceneCommands: Command[] = [];
  constructor() {
    config()
    const botToken = process.env.TOKEN || ''
    const dbToken = process.env.MONGO_URL || ''
    this.bot = new Telegraf<IBotContext>(botToken);
    connectionToDb(dbToken);
  }
  async init() {
    this.bot.use(session()).middleware();
    this.commands = [
      new StartCommand(this.bot),
      new HelpCommand(this.bot),
      new AnimalCommand(this.bot, "cat"),
      new AnimalCommand(this.bot, "dog"),
      new PlacesCommand(this.bot,),
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
const bot = new Bot();
bot.init();