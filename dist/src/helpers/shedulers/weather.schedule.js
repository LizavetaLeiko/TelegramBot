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
const node_schedule_1 = __importDefault(require("node-schedule"));
const api_1 = require("../../api");
const createWeatherMessage_1 = require("../createWeatherMessage");
function setWeatherSubscription(hour, city, ctx) {
    const fromUTC = 0;
    node_schedule_1.default.scheduleJob(`00 ${hour - fromUTC} * * *`, () => __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, api_1.getWeather)(city);
        if (typeof data === "string") {
            ctx.reply(data);
        }
        else {
            ctx.reply((0, createWeatherMessage_1.createWeatherResponce)(data));
        }
    }));
}
exports.default = setWeatherSubscription;
