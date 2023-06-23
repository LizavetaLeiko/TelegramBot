import { Markup, Scenes } from 'telegraf';

import { messages, scenes } from '@constants';
import { IBotContext } from '@interfaces';
import { skipMiddleware } from '@middlewares';

export const UnsubscribeScene = new Scenes.WizardScene<IBotContext>(
  scenes.unsubsc,
  async (ctx) => {
    return ctx.wizard.next();
  },
);

UnsubscribeScene.use(skipMiddleware);

UnsubscribeScene.enter((ctx) => {
  const subscriptions = ctx.session.schedulers;
  if (subscriptions && subscriptions.length !== 0) {
    ctx.reply(
      messages.questions.askCityToUnsubscribe,
      Markup.inlineKeyboard(
        subscriptions.map((schedule) => {
          return Markup.button.callback(schedule.city, schedule.city);
        }),
      ),
    );
  } else {
    ctx.reply(messages.info.heventWeatherSubsc);
    ctx.scene.leave();
  }
});

UnsubscribeScene.action(/.*/, (ctx) => {
  const subscriptions = ctx.session.schedulers;
  const city = ctx.match[0];
  const timerIndex = subscriptions.findIndex((item) => item.city === city);
  if (timerIndex !== -1) {
    subscriptions[timerIndex].timer.cancel();
    ctx.session.schedulers.splice(timerIndex, 1);
    ctx.reply(messages.info.subscCanceled);
    ctx.scene.leave();
  } else {
    ctx.reply(messages.errors.subscNotCanceled);
    ctx.scene.leave();
  }
});
