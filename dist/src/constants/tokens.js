"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.tokens = {
    botToken: process.env.TOKEN || '',
    dbToken: process.env.MONGO_URL || '',
    weatherToken: process.env.WEATHER_TOKEN || '',
    picturesToken: process.env.PICTURES_TOKEN || '',
    placesToken: process.env.PLACES_TOKEN || '',
};
