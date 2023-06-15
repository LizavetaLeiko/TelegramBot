"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnimalMessage = void 0;
const telegraf_1 = require("telegraf");
function createAnimalMessage(data, ctx) {
    var _a;
    if (typeof data === "string") {
        ctx.reply(data);
    }
    else {
        const url = ((_a = data.photos[0].src) === null || _a === void 0 ? void 0 : _a.medium) || data.photos[0].url;
        ctx.replyWithPhoto(url
            ? url
            : "sorry, something is wrong with photo, try again", telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback("One more photo", "more"),
        ]));
    }
}
exports.createAnimalMessage = createAnimalMessage;
