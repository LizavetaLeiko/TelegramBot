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
const db_config_1 = require("./config/db.config");
const tokens_1 = require("./constants/tokens");
const commands_1 = require("./commands");
const taskScene_1 = require("./scenes/taskScene");
const weatherScene_1 = require("./scenes/weatherScene");
class Bot {
    constructor() {
        this.commands = [];
        this.sceneCommands = [];
        this.bot = new telegraf_1.Telegraf(tokens_1.botToken);
        (0, db_config_1.connectionToDb)(tokens_1.dbToken);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.bot.use((0, telegraf_1.session)()).middleware();
            this.commands = [
                new commands_1.StartCommand(this.bot),
                new commands_1.HelpCommand(this.bot),
                new commands_1.AnimalCommand(this.bot, "cat"),
                new commands_1.AnimalCommand(this.bot, "dog"),
                new commands_1.PlacesCommand(this.bot),
            ];
            for (const command of this.commands) {
                command.handle();
            }
            const stage = new telegraf_1.Scenes.Stage([taskScene_1.TaskScene, weatherScene_1.WeatherScene]);
            stage.register(taskScene_1.TaskScene, weatherScene_1.WeatherScene);
            this.bot.use(stage.middleware());
            this.sceneCommands = [
                new commands_1.WeatherCommand(this.bot),
                new commands_1.CreateTaskCommand(this.bot),
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
