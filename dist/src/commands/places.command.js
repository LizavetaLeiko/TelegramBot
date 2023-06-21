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
exports.PlacesCommand = void 0;
const telegraf_1 = require("telegraf");
const command_class_1 = require("./command.class");
const constants_1 = require("../constants");
const api_1 = require("../api");
const helpers_1 = require("../helpers");
class PlacesCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
        this.bot = bot;
        this.long = 0;
        this.lat = 0;
    }
    handle() {
        this.bot.command(constants_1.commands.places.value, (ctx) => __awaiter(this, void 0, void 0, function* () {
            ctx.sendMessage(constants_1.messages.questions.askCity);
            this.bot.hears(/.*/, (ctx2) => __awaiter(this, void 0, void 0, function* () {
                const city = ctx2.message.text.trim();
                const data = yield (0, api_1.getCity)(city);
                if (typeof data === 'string') {
                    ctx2.reply(data);
                }
                else {
                    this.lat = data.lat;
                    this.long = data.lon;
                    const cityName = data.name || '';
                    ctx2.reply(`${constants_1.messages.info.userCity(cityName)}
${constants_1.messages.questions.askTypeOfPlaces}`, telegraf_1.Markup.inlineKeyboard(constants_1.placesBtns.map((item) => telegraf_1.Markup.button.callback(`${item}`, `places_${item}`))));
                }
            }));
        }));
        this.bot.action(/places_(foods|religion|natural|cultural)/, (ctx3) => __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, api_1.getPlaces)(ctx3.match[0].slice(7), this.long, this.lat);
            if (typeof data === 'string') {
                ctx3.reply(data);
            }
            else {
                ctx3.reply((0, helpers_1.createPlacesListMessage)(data));
            }
        }));
    }
}
exports.PlacesCommand = PlacesCommand;
