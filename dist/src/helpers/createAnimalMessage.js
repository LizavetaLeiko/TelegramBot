"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnimalMessage = void 0;
const telegraf_1 = require("telegraf");
function createAnimalMessage(data, ctx) {
    if (typeof data === "string") {
        ctx.reply(data);
    }
    else {
        ctx.replyWithPhoto(data.photos[0].url
            ? data.photos[0].url
            : "sorry, something is wrong with photo, try again", telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback("One more photo", "more"),
        ]));
    }
}
exports.createAnimalMessage = createAnimalMessage;
