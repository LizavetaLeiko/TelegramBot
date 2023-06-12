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
exports.CreateTaskCommand = void 0;
const command_class_1 = require("./command.class");
class CreateTaskCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
        this.bot = bot;
    }
    handle() {
        this.bot.command("task", (ctx) => __awaiter(this, void 0, void 0, function* () {
            yield ctx.scene.enter("task-scene");
        }));
    }
}
exports.CreateTaskCommand = CreateTaskCommand;
