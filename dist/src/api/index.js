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
exports.getPlaces = exports.getCity = exports.getAnimalPicture = exports.deleteAllTasks = exports.getAllTasks = exports.getTask = exports.updateTask = exports.createTask = exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = require("dotenv");
const _models_1 = require("@models");
const _constants_1 = require("@constants");
(0, dotenv_1.config)();
function getWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = process.env.WEATHER_URL || '';
        url
            ? (url = url.replace('{city}', city).replace('{token}', _constants_1.tokens.weatherToken))
            : url;
        try {
            const response = yield axios_1.default.get(url);
            return response.data;
        }
        catch (err) {
            if (err instanceof Error &&
                err.message === 'Request failed with status code 404') {
                return _constants_1.messages.errors.cityErr;
            }
            return _constants_1.messages.errors.unknownErr;
        }
    });
}
exports.getWeather = getWeather;
function createTask(taskData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = yield _models_1.TaskModel.create(taskData);
            return task;
        }
        catch (error) {
            return _constants_1.messages.errors.unknownErr;
        }
    });
}
exports.createTask = createTask;
function updateTask(id, reminder) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = yield _models_1.TaskModel.findOne({ id });
            if (task) {
                task.reminder = reminder;
                yield task.save();
                return task;
            }
            return task;
        }
        catch (error) {
            return _constants_1.messages.errors.unknownErr;
        }
    });
}
exports.updateTask = updateTask;
function getTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = yield _models_1.TaskModel.findOne({ id });
            return task;
        }
        catch (error) {
            return _constants_1.messages.errors.unknownErr;
        }
    });
}
exports.getTask = getTask;
function getAllTasks(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tasks = yield _models_1.TaskModel.find({ user_id });
            return tasks;
        }
        catch (error) {
            return _constants_1.messages.errors.unknownErr;
        }
    });
}
exports.getAllTasks = getAllTasks;
function deleteAllTasks(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tasks = yield _models_1.TaskModel.deleteMany({ user_id });
            return tasks;
        }
        catch (error) {
            return _constants_1.messages.errors.unknownErr;
        }
    });
}
exports.deleteAllTasks = deleteAllTasks;
function getAnimalPicture(animal) {
    return __awaiter(this, void 0, void 0, function* () {
        const randomPage = Math.floor(Math.random() * 50);
        let url = process.env.PICTURES_URL || '';
        url
            ? (url = url
                .replace('{animal}', animal)
                .replace('{randomPage}', `${randomPage}`))
            : url;
        try {
            const response = yield axios_1.default.get(url, {
                headers: {
                    Authorization: _constants_1.tokens.picturesToken,
                },
            });
            return response.data;
        }
        catch (err) {
            return _constants_1.messages.errors.unknownErr;
        }
    });
}
exports.getAnimalPicture = getAnimalPicture;
function getCity(city) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = process.env.CHECK_CITY_URL || '';
        url
            ? (url = url.replace('{city}', city).replace('{token}', _constants_1.tokens.placesToken))
            : url;
        try {
            const response = yield axios_1.default.get(url);
            if (response.data.status === 'NOT_FOUND') {
                throw new Error(response.data.error);
            }
            return response.data;
        }
        catch (err) {
            if (err instanceof Error && err.message == `Name ${city} at  not found`) {
                return _constants_1.messages.errors.cityErr;
            }
            return _constants_1.messages.errors.unknownErr;
        }
    });
}
exports.getCity = getCity;
function getPlaces(kind, long, lat) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = process.env.PLACES_URL || '';
        url
            ? (url = url
                .replace('{long}', `${long}`)
                .replace('{lat}', `${lat}`)
                .replace('{kind}', kind)
                .replace('{token}', _constants_1.tokens.placesToken))
            : url;
        try {
            const response = yield axios_1.default.get(url);
            return response.data;
        }
        catch (err) {
            return _constants_1.messages.errors.unknownErr;
        }
    });
}
exports.getPlaces = getPlaces;
