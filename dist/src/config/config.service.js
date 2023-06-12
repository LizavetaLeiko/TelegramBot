"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigSrevice = void 0;
const dotenv_1 = require("dotenv");
class ConfigSrevice {
    constructor() {
        const { error, parsed } = (0, dotenv_1.config)();
        if (error) {
            throw new Error("There isn't .env file");
        }
        if (!parsed) {
            throw new Error(".env file is empty");
        }
        this.config = parsed;
    }
    get(key) {
        const res = this.config[key];
        if (!res) {
            throw new Error("This key is not found");
        }
        return res;
    }
}
exports.ConfigSrevice = ConfigSrevice;
