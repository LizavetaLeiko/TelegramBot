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
exports.WeatherScene = void 0;
const telegraf_1 = require("telegraf");
const createWeatherMessage_1 = require("../helpers/createWeatherMessage");
const api_1 = require("../api");
const node_cron_1 = __importDefault(require("node-cron"));
exports.WeatherScene = new telegraf_1.Scenes.WizardScene("weather-scene", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    return ctx.wizard.next();
}));
exports.WeatherScene.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.weather = {
        city: "",
        isSubsribed: false
    },
        yield ctx.sendMessage("What is your city?");
}));
exports.WeatherScene.hears(/.*/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const city = ctx.message.text.trim();
    ctx.session.weather.city = city;
    const data = yield (0, api_1.getWeather)(city);
    if (typeof data === "string") {
        ctx.reply(data);
    }
    else if (!ctx.session.weather.isSubsribed) {
        ctx.reply((0, createWeatherMessage_1.createWeatherResponce)(data), telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback("Get weather every morning", "subscribe"),
            telegraf_1.Markup.button.callback("Don't subscribe", "don't subscribe"),
        ]));
    }
    else {
        ctx.reply((0, createWeatherMessage_1.createWeatherResponce)(data));
    }
    ctx.wizard.next();
}));
exports.WeatherScene.action("don't subscribe", (ctx) => {
    ctx.reply("Ok, i wouldn't send you the weather forcast");
    ctx.scene.leave();
});
exports.WeatherScene.action("subscribe", (ctx) => {
    ctx.session.weather.isSubsribed = true;
    ctx.sendMessage("What time would you like to get the forecast?", telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback("At 6:00", "subscribed_6am"),
        telegraf_1.Markup.button.callback("At 9:00", "subscribed_9am"),
    ]));
    ctx.wizard.next();
});
exports.WeatherScene.action(/subscribed_(9am|6am)/, (ctx) => {
    const city = ctx.session.weather.city;
    if (ctx.match[0] === "subscribed_9am") {
        ctx.reply("Great! I will send you the forecast every morning at 9:00");
        node_cron_1.default.schedule("25 12 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield (0, api_1.getWeather)(city);
            if (typeof data === "string") {
                ctx.reply(data);
            }
            else {
                ctx.reply((0, createWeatherMessage_1.createWeatherResponce)(data));
            }
        }));
    }
    else if (ctx.match[0] === "subscribed_6am") {
        ctx.reply("Great! I will send you the forecast every morning at 6:00");
        node_cron_1.default.schedule("0 6 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield (0, api_1.getWeather)(city);
            if (typeof data === "string") {
                ctx.reply(data);
            }
            else {
                ctx.reply((0, createWeatherMessage_1.createWeatherResponce)(data));
            }
        }));
    }
    ctx.scene.leave();
});
