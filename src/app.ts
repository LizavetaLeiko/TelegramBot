import { Scenes, session, Telegraf } from 'telegraf';

import { UnsubscribeCommand } from 'commands/unsubscribeWeather.command';
import { UnsubscribeScene } from 'scenes/unsubscribeWeatherScene';

import {
  AnimalCommand,
  Command,
  CreateTaskCommand,
  HelpCommand,
  MyTasksCommand,
  PlacesCommand,
  StartCommand,
  UnknownCommand,
  WeatherCommand,
} from '@commands';
import { TaskScene, WeatherScene } from '@scenes';
import { messages, tokens } from '@constants';
import { IBotContext } from '@interfaces';
import { connectionToDb } from '@config';

class Bot {
  bot: Telegraf<IBotContext>;

  commands: Command[] = [];

  sceneCommands: Command[] = [];

  constructor() {
    this.bot = new Telegraf<IBotContext>(tokens.botToken);
    connectionToDb(tokens.dbToken);
  }

  async init() {
    this.bot.catch((err, ctx) => {
      ctx.reply(messages.errors.unknownErr);
    });

    this.bot.use(session()).middleware();
    this.commands = [
      new StartCommand(this.bot),
      new HelpCommand(this.bot),
      new AnimalCommand(this.bot, 'cat'),
      new AnimalCommand(this.bot, 'dog'),
      new PlacesCommand(this.bot),
      new MyTasksCommand(this.bot),
    ];
    for (const command of this.commands) {
      command.handle();
    }

    const stage = new Scenes.Stage<IBotContext>([TaskScene, WeatherScene, UnsubscribeScene]);
    stage.register(TaskScene, WeatherScene, UnsubscribeScene);
    this.bot.use(stage.middleware());

    this.sceneCommands = [
      new WeatherCommand(this.bot),
      new CreateTaskCommand(this.bot),
      new UnsubscribeCommand(this.bot),
    ];
    for (const command of this.sceneCommands) {
      command.handle();
    }

    new UnknownCommand(this.bot).handle();

    process.once('SIGINT', () => {
      this.bot.stop('SIGINT');
    });
    
    process.once('SIGTERM', () => {
      this.bot.stop('SIGTERM');
    });

    this.bot.launch().catch((err) =>{
      setTimeout(() => {
        this.bot.launch().catch((error) => {
          process.stderr.write(error.message);
        });
      }, 5000);
    });
  }
}
const bot = new Bot();
bot.init();
