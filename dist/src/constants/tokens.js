"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbToken = exports.botToken = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.botToken = process.env.TOKEN || '';
exports.dbToken = process.env.MONGO_URL || '';
