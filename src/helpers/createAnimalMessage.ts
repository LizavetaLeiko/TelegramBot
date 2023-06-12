import { Markup } from "telegraf";
import { IBotContext } from "../interfaces/context.interface";
import { IPicturesData } from "../interfaces/picturesData.interface";

export function createAnimalMessage( data: IPicturesData | string, ctx: IBotContext){
  if (typeof data === "string") {
    ctx.reply(data);
  } else {
    ctx.replyWithPhoto(
      data.photos[0].url
        ? data.photos[0].url
        : "sorry, something is wrong with photo, try again",
      Markup.inlineKeyboard([
        Markup.button.callback("One more photo", "more"),
      ])
    );
  }
}