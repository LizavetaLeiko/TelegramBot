import { IBotContext, MiddlewareContext } from '../interfaces';

export const skipMiddleware = (ctx: IBotContext, next: () => Promise<void>) => {
  const messageText = (ctx as MiddlewareContext).message?.text;

  if (messageText === '/skip') {
    ctx.reply('Ok, you can call another command');
    return ctx.scene.leave();
  }
  
  return next();
};
