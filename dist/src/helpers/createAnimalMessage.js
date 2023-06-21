"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnimalMessage = void 0;
const telegraf_1 = require("telegraf");
const constants_1 = require("../constants");
function createAnimalMessage(data, ctx) {
    var _a;
    if (typeof data === 'string') {
        ctx.reply(data);
    }
    else {
        const url = ((_a = data.photos[0].src) === null || _a === void 0 ? void 0 : _a.medium) || data.photos[0].url;
        ctx.replyWithPhoto(url ? url : constants_1.messages.errors.unknownErr, telegraf_1.Markup.inlineKeyboard([telegraf_1.Markup.button.callback(constants_1.messages.btns.morePhoto, constants_1.messages.btns.morePhoto)]));
    }
}
exports.createAnimalMessage = createAnimalMessage;
