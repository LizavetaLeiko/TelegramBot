import { Markup } from 'telegraf';

import { messages } from '@constants';
import { IBotContext, IPicturesData } from '@interfaces';

export function createAnimalMessage(
  data: IPicturesData | string,
  ctx: IBotContext,
) {
  if (typeof data === 'string') {
    ctx.reply(data);
  } else {
    const url = data.photos[0].src?.medium || data.photos[0].url;
    ctx.replyWithPhoto(
      url ? url : messages.errors.unknownErr,
      Markup.inlineKeyboard([Markup.button.callback(messages.btns.morePhoto, messages.btns.morePhoto)]),
    );
  }
}
