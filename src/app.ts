import { Telegraf, Scenes, session } from "telegraf";
import { connectionToDb } from "./config/db.config";
import { IBotContext } from "./interfaces";
import { botToken, dbToken } from "./constants/tokens";
import {
  StartCommand,
  HelpCommand,
  WeatherCommand,
  AnimalCommand,
  PlacesCommand,
  CreateTaskCommand,
  Command,
  UnknownCommand
} from "./commands";
import { TaskScene } from "./scenes/taskScene";
import { WeatherScene } from "./scenes/weatherScene";

class Bot {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];
  sceneCommands: Command[] = [];
  constructor() {
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
      new PlacesCommand(this.bot),
    ];
    for (const command of this.commands) {
      command.handle();
    }

    const stage = new Scenes.Stage<IBotContext>([TaskScene, WeatherScene]);
    stage.register(TaskScene, WeatherScene);
    this.bot.use(stage.middleware());

    this.sceneCommands = [
      new WeatherCommand(this.bot),
      new CreateTaskCommand(this.bot),
    ];
    for (const command of this.sceneCommands) {
      command.handle();
    }

    (new UnknownCommand(this.bot)).handle()

    this.bot.launch();
  }
}
const bot = new Bot();
bot.init();
