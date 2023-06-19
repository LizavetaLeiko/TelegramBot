import { Markup } from 'telegraf';
import { IBotContext, IPicturesData } from '../interfaces';

export function createAnimalMessage(
  data: IPicturesData | string,
  ctx: IBotContext
) {
  if (typeof data === 'string') {
    ctx.reply(data);
  } else {
    const url = data.photos[0].src?.medium || data.photos[0].url;
    ctx.replyWithPhoto(
      url ? url : 'sorry, something is wrong with photo, try again',
      Markup.inlineKeyboard([Markup.button.callback('One more photo', 'more')])
    );
  }
}
