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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacesCommand = void 0;
const telegraf_1 = require("telegraf");
const command_class_1 = require("./command.class");
const axios_1 = __importDefault(require("axios"));
const createPlacesListMessage_1 = require("../helpers/createPlacesListMessage");
const placesBtns_1 = require("../helpers/placesBtns");
class PlacesCommand extends command_class_1.Command {
    constructor(bot, configService) {
        super(bot);
        this.bot = bot;
        this.configService = configService;
        this.long = 0;
        this.lat = 0;
    }
    handle() {
        this.bot.command("places", (ctx) => __awaiter(this, void 0, void 0, function* () {
            ctx.sendMessage("What is a city you interested in?");
            this.bot.hears(/.*/, (ctx2) => __awaiter(this, void 0, void 0, function* () {
                const city = ctx2.message.text.trim();
                const data = yield this.getCityQuery(city);
                if (typeof data === "string") {
                    ctx2.reply(data);
                }
                else {
                    this.lat = data.lat;
                    this.long = data.lon;
                    ctx2.reply(`Ok, your city is ${data.name}
What type of places would you like to get?`, telegraf_1.Markup.inlineKeyboard(placesBtns_1.placesBtns.map(item => telegraf_1.Markup.button.callback(`${item}`, `places_${item}`))));
                }
            }));
        }));
        this.bot.action(/places_(foods|religion|natural|cultural)/, (ctx3) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getCategoryQuery(ctx3.match[0].slice(7));
            if (typeof data === "string") {
                ctx3.reply(data);
            }
            else {
                ctx3.reply((0, createPlacesListMessage_1.createPlacesListMessage)(data));
            }
        }));
    }
    getCityQuery(city) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${this.configService.get("PLACES_TOKEN")}`);
                if (response.data.status === "NOT_FOUND") {
                    throw new Error(response.data.error);
                }
                return response.data;
            }
            catch (err) {
                return `Sorry, something is wrong. Please, check your city (it should be in english and without any spaces, smileys, quotes, etc.) or try later`;
            }
        });
    }
    getCategoryQuery(kind) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${this.long}&lat=${this.lat}&kinds=${kind}&format=geojson&limit=15&apikey=${this.configService.get("PLACES_TOKEN")}`);
                return response.data;
            }
            catch (err) {
                return `Sorry, something is wrong. Please, try later`;
            }
        });
    }
}
exports.PlacesCommand = PlacesCommand;
