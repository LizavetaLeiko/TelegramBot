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
exports.getPlaces = exports.getCity = exports.getAnimalPicture = exports.createTask = exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const config_service_1 = require("../config/config.service");
const taskModel_1 = require("../models/taskModel");
function getWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const configService = new config_service_1.ConfigSrevice;
        try {
            const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${configService.get("WEATHER_TOKEN")}`);
            return response.data;
        }
        catch (err) {
            return `The weather in ${city} is not found. Please, check your town (it should be in english and without any spaces, smileys, quotes, etc.) or try later`;
        }
    });
}
exports.getWeather = getWeather;
function createTask(taskData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = yield taskModel_1.TaskModel.create(taskData);
            return task;
        }
        catch (error) {
            return "Sorry, something is wrong. Please, try later";
        }
    });
}
exports.createTask = createTask;
function getAnimalPicture(animal) {
    return __awaiter(this, void 0, void 0, function* () {
        const configService = new config_service_1.ConfigSrevice;
        const randomPage = Math.floor(Math.random() * 50);
        try {
            const response = yield axios_1.default.get(`https://api.pexels.com/v1/search?query=${animal}&per_page=1&page=${randomPage}`, {
                headers: {
                    Authorization: configService.get("PICTURES_TOKEN"),
                },
            });
            return response.data;
        }
        catch (err) {
            return `Sorry, something is wrong`;
        }
    });
}
exports.getAnimalPicture = getAnimalPicture;
function getCity(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const configService = new config_service_1.ConfigSrevice;
        try {
            const response = yield axios_1.default.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${configService.get("PLACES_TOKEN")}`);
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
exports.getCity = getCity;
function getPlaces(kind, long, lat) {
    return __awaiter(this, void 0, void 0, function* () {
        const configService = new config_service_1.ConfigSrevice;
        try {
            const response = yield axios_1.default.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${long}&lat=${lat}&kinds=${kind}&format=geojson&limit=15&apikey=${configService.get("PLACES_TOKEN")}`);
            return response.data;
        }
        catch (err) {
            return `Sorry, something is wrong. Please, try later`;
        }
    });
}
exports.getPlaces = getPlaces;
