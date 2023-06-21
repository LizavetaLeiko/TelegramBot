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
exports.AnimalCommand = void 0;
const command_class_1 = require("./command.class");
const api_1 = require("../api");
const helpers_1 = require("../helpers");
class AnimalCommand extends command_class_1.Command {
    constructor(bot, animal) {
        super(bot);
        this.bot = bot;
        this.animal = animal;
    }
    handle() {
        this.bot.command(this.animal, (ctx) => __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, api_1.getAnimalPicture)(this.animal);
            (0, helpers_1.createAnimalMessage)(data, ctx);
        }));
        this.bot.action('more', (ctx) => __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, api_1.getAnimalPicture)(this.animal);
            (0, helpers_1.createAnimalMessage)(data, ctx);
        }));
    }
}
exports.AnimalCommand = AnimalCommand;
