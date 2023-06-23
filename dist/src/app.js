"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const unsubscribeWeather_command_1 = require("./commands/unsubscribeWeather.command");
const unsubscribeWeatherScene_1 = require("./scenes/unsubscribeWeatherScene");
const _commands_1 = require("./commands/index");
const _scenes_1 = require("./scenes/index");
const _constants_1 = require("./constants/index");
const _config_1 = require("./config/index");
class Bot {
    constructor() {
        this.commands = [];
        this.sceneCommands = [];
        this.bot = new telegraf_1.Telegraf(_constants_1.tokens.botToken);
        (0, _config_1.connectionToDb)(_constants_1.tokens.dbToken);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.bot.catch((err, ctx) => {
                ctx.reply(_constants_1.messages.errors.unknownErr);
            });
            this.bot.use((0, telegraf_1.session)()).middleware();
            this.commands = [
                new _commands_1.StartCommand(this.bot),
                new _commands_1.HelpCommand(this.bot),
                new _commands_1.AnimalCommand(this.bot, 'cat'),
                new _commands_1.AnimalCommand(this.bot, 'dog'),
                new _commands_1.PlacesCommand(this.bot),
                new _commands_1.MyTasksCommand(this.bot),
            ];
            for (const command of this.commands) {
                command.handle();
            }
            const stage = new telegraf_1.Scenes.Stage([_scenes_1.TaskScene, _scenes_1.WeatherScene, unsubscribeWeatherScene_1.UnsubscribeScene]);
            stage.register(_scenes_1.TaskScene, _scenes_1.WeatherScene, unsubscribeWeatherScene_1.UnsubscribeScene);
            this.bot.use(stage.middleware());
            this.sceneCommands = [
                new _commands_1.WeatherCommand(this.bot),
                new _commands_1.CreateTaskCommand(this.bot),
                new unsubscribeWeather_command_1.UnsubscribeCommand(this.bot),
            ];
            for (const command of this.sceneCommands) {
                command.handle();
            }
            new _commands_1.UnknownCommand(this.bot).handle();
            this.bot.launch();
        });
    }
}
const bot = new Bot();
bot.init();
