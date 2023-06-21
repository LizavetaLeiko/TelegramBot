import { Markup, Scenes } from 'telegraf';

import { IBotContext } from '../interfaces';
import { getWeather } from '../api';
import {
  createWeatherResponce,
  createWeatherSubscriptionMsg,
  setWeatherSubscription,
} from '../helpers';
import { skipMiddleware } from '../middlewares/skipScene.middleware';

export const WeatherScene = new Scenes.WizardScene<IBotContext>(
  'weather-scene',
  async (ctx) => {
    return ctx.wizard.next();
  },
);

WeatherScene.use(skipMiddleware);

WeatherScene.enter(async (ctx) => {
  (ctx.session.weather = {
    city: '',
    isSubsribed: false,
  }),
  await ctx.sendMessage('What is your city?');
});

WeatherScene.hears(/.*/, async (ctx) => {
  const city = ctx.message.text.trim();
  ctx.session.weather.city = city;
  const data = await getWeather(city);

  if (typeof data === 'string') {
    ctx.reply(data);
  } else if (!ctx.session.weather.isSubsribed) {
    ctx.reply(
      createWeatherResponce(data),
      Markup.inlineKeyboard([
        Markup.button.callback('Get weather every morning', 'subscribe'),
        Markup.button.callback("Don't subscribe", "don't subscribe"),
      ]),
    );
  } else {
    ctx.reply(createWeatherResponce(data));
  }
  ctx.wizard.next();
});

WeatherScene.action("don't subscribe", (ctx) => {
  ctx.reply("Ok, i wouldn't send you the weather forcast");
  ctx.scene.leave();
});

WeatherScene.action('subscribe', (ctx) => {
  ctx.session.weather.isSubsribed = true;
  ctx.sendMessage(
    'What time would you like to get the forecast?',
    Markup.inlineKeyboard([
      Markup.button.callback('At 6:00', 'subscribed_6am'),
      Markup.button.callback('At 9:00', 'subscribed_9am'),
    ]),
  );
  ctx.wizard.next();
});

WeatherScene.action(/subscribed_(9am|6am)/, (ctx) => {
  const city = ctx.session.weather.city;

  if (ctx.match[0] === 'subscribed_9am') {
    ctx.reply(createWeatherSubscriptionMsg(9));
    setWeatherSubscription(14, city, ctx);
  } else if (ctx.match[0] === 'subscribed_6am') {
    ctx.reply(createWeatherSubscriptionMsg(6));
    setWeatherSubscription(6, city, ctx);
  }

  ctx.scene.leave();
});
