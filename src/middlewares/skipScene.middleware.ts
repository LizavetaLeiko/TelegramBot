import { messages } from '@constants';
import { IBotContext, MiddlewareContext } from '@interfaces';

export const skipMiddleware = (ctx: IBotContext, next: () => Promise<void>) => {
  const messageText = (ctx as MiddlewareContext).message?.text;

  if (messageText === '/skip') {
    ctx.reply(messages.info.skipScene);
    return ctx.scene.leave();
  }

  return next();
};
