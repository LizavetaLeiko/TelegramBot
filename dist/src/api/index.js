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
const taskModel_1 = require("../models/taskModel");
const dotenv_1 = require("dotenv");
const errorMsgs_1 = require("../constants/errorMsgs");
(0, dotenv_1.config)();
function getWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.WEATHER_TOKEN}`);
            return response.data;
        }
        catch (err) {
            if (err instanceof Error && err.message === 'Request failed with status code 404') {
                return errorMsgs_1.cityErr;
            }
            return errorMsgs_1.unknownErr;
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
            return errorMsgs_1.unknownErr;
        }
    });
}
exports.createTask = createTask;
function getAnimalPicture(animal) {
    return __awaiter(this, void 0, void 0, function* () {
        const randomPage = Math.floor(Math.random() * 50);
        try {
            const response = yield axios_1.default.get(`https://api.pexels.com/v1/search?query=${animal}&per_page=1&page=${randomPage}`, {
                headers: {
                    Authorization: process.env.PICTURES_TOKEN,
                },
            });
            return response.data;
        }
        catch (err) {
            return errorMsgs_1.unknownErr;
        }
    });
}
exports.getAnimalPicture = getAnimalPicture;
function getCity(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${process.env.PLACES_TOKEN}`);
            if (response.data.status === "NOT_FOUND") {
                throw new Error(response.data.error);
            }
            return response.data;
        }
        catch (err) {
            if (err instanceof Error && err.message == `Name ${city} at  not found`) {
                return errorMsgs_1.cityErr;
            }
            return errorMsgs_1.unknownErr;
        }
    });
}
exports.getCity = getCity;
function getPlaces(kind, long, lat) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${long}&lat=${lat}&kinds=${kind}&format=geojson&limit=15&apikey=${process.env.PLACES_TOKEN}`);
            return response.data;
        }
        catch (err) {
            return errorMsgs_1.unknownErr;
        }
    });
}
exports.getPlaces = getPlaces;
