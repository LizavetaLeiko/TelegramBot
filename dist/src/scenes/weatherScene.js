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
exports.WeatherScene = void 0;
const telegraf_1 = require("telegraf");
const constants_1 = require("../constants");
const api_1 = require("../api");
const helpers_1 = require("../helpers");
const skipScene_middleware_1 = require("../middlewares/skipScene.middleware");
exports.WeatherScene = new telegraf_1.Scenes.WizardScene('weather-scene', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    return ctx.wizard.next();
}));
exports.WeatherScene.use(skipScene_middleware_1.skipMiddleware);
exports.WeatherScene.enter((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    (ctx.session.weather = {
        city: '',
        isSubsribed: false,
    }),
        yield ctx.sendMessage(constants_1.messages.questions.askCity);
}));
exports.WeatherScene.hears(/.*/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const city = ctx.message.text.trim();
    ctx.session.weather.city = city;
    const data = yield (0, api_1.getWeather)(city);
    if (typeof data === 'string') {
        ctx.reply(data);
    }
    else if (!ctx.session.weather.isSubsribed) {
        ctx.reply((0, helpers_1.createWeatherResponce)(data), telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback(constants_1.messages.btns.subscribeWeather, constants_1.messages.btns.subscribeWeather),
            telegraf_1.Markup.button.callback(constants_1.messages.btns.dontSubscribeWeather, constants_1.messages.btns.dontSubscribeWeather),
        ]));
    }
    else {
        ctx.reply((0, helpers_1.createWeatherResponce)(data));
    }
    ctx.wizard.next();
}));
exports.WeatherScene.action(constants_1.messages.btns.dontSubscribeWeather, (ctx) => {
    ctx.reply(constants_1.messages.info.dontSubscribeWeather);
    ctx.scene.leave();
});
exports.WeatherScene.action(constants_1.messages.btns.subscribeWeather, (ctx) => {
    ctx.session.weather.isSubsribed = true;
    ctx.sendMessage(constants_1.messages.questions.askForcastTime, telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback(constants_1.messages.btns.weatherSubscTime[6][0], constants_1.messages.btns.weatherSubscTime[6][1]),
        telegraf_1.Markup.button.callback(constants_1.messages.btns.weatherSubscTime[9][0], constants_1.messages.btns.weatherSubscTime[9][1]),
    ]));
    ctx.wizard.next();
});
exports.WeatherScene.action(/subscribed_(9am|6am)/, (ctx) => {
    const city = ctx.session.weather.city;
    if (ctx.match[0] === constants_1.messages.btns.weatherSubscTime[9][1]) {
        ctx.reply(constants_1.messages.info.weatherSubscribed('9'));
        (0, helpers_1.setWeatherSubscription)(9, city, ctx);
    }
    else if (ctx.match[0] === constants_1.messages.btns.weatherSubscTime[6][1]) {
        ctx.reply(constants_1.messages.info.weatherSubscribed('6'));
        (0, helpers_1.setWeatherSubscription)(6, city, ctx);
    }
    ctx.scene.leave();
});
