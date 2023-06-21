"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placesToken = exports.picturesToken = exports.weatherToken = exports.dbToken = exports.botToken = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.botToken = process.env.TOKEN || '';
exports.dbToken = process.env.MONGO_URL || '';
exports.weatherToken = process.env.WEATHER_TOKEN || '';
exports.picturesToken = process.env.PICTURES_TOKEN || '';
exports.placesToken = process.env.PLACES_TOKEN || '';
