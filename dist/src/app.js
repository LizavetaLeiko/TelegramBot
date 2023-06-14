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
const start_command_1 = require("./commands/start.command");
const help_comman_1 = require("./commands/help.comman");
const weather_command_1 = require("./commands/weather.command");
const animals_command_1 = require("./commands/animals.command");
const places_command_1 = require("./commands/places.command");
const createTask_command_1 = require("./commands/createTask.command");
const db_config_1 = require("./config/db.config");
const taskScene_1 = require("./scenes/taskScene");
const weatherScene_1 = require("./scenes/weatherScene");
const dotenv_1 = require("dotenv");
class Bot {
    constructor() {
        this.commands = [];
        this.sceneCommands = [];
        (0, dotenv_1.config)();
        const botToken = process.env.TOKEN || '';
        const dbToken = process.env.MONGO_URL || '';
        this.bot = new telegraf_1.Telegraf(botToken);
        (0, db_config_1.connectionToDb)(dbToken);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.bot.use((0, telegraf_1.session)()).middleware();
            this.commands = [
                new start_command_1.StartCommand(this.bot),
                new help_comman_1.HelpCommand(this.bot),
                new animals_command_1.AnimalCommand(this.bot, "cat"),
                new animals_command_1.AnimalCommand(this.bot, "dog"),
                new places_command_1.PlacesCommand(this.bot),
            ];
            for (const command of this.commands) {
                command.handle();
            }
            const stage = new telegraf_1.Scenes.Stage([taskScene_1.TaskScene, weatherScene_1.WeatherScene]);
            stage.register(taskScene_1.TaskScene, weatherScene_1.WeatherScene);
            this.bot.use(stage.middleware());
            this.sceneCommands = [
                new weather_command_1.WeatherCommand(this.bot),
                new createTask_command_1.CreateTaskCommand(this.bot)
            ];
            for (const command of this.sceneCommands) {
                command.handle();
            }
            this.bot.launch();
        });
    }
}
const bot = new Bot();
bot.init();
