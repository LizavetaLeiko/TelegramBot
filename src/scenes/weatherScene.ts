import { Markup, Scenes } from 'telegraf';

import { messages, scenes } from '@constants';
import { IBotContext } from '@interfaces';
import { getWeather } from '@api';
import {
  createWeatherResponce,
  setWeatherSubscription,
} from '@helpers';
import { skipMiddleware } from '@middlewares';

export const WeatherScene = new Scenes.WizardScene<IBotContext>(
  scenes.weather,
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
  await ctx.sendMessage(messages.questions.askCity);
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
        Markup.button.callback(messages.btns.subscribeWeather, messages.btns.subscribeWeather),
        Markup.button.callback(messages.btns.dontSubscribeWeather, messages.btns.dontSubscribeWeather),
      ]),
    );
  } else {
    ctx.reply(createWeatherResponce(data));
  }
  ctx.wizard.next();
});

WeatherScene.action(messages.btns.dontSubscribeWeather, (ctx) => {
  ctx.reply(messages.info.dontSubscribeWeather);
  ctx.scene.leave();
});

WeatherScene.action(messages.btns.subscribeWeather, (ctx) => {
  ctx.session.weather.isSubsribed = true;
  ctx.sendMessage(
    messages.questions.askForcastTime,
    Markup.inlineKeyboard([
      Markup.button.callback(messages.btns.weatherSubscTime[6][0], messages.btns.weatherSubscTime[6][1]),
      Markup.button.callback(messages.btns.weatherSubscTime[9][0], messages.btns.weatherSubscTime[9][1]),
    ]),
  );
  ctx.wizard.next();
});

WeatherScene.action(/subscribed_(9am|6am)/, (ctx) => {
  const city = ctx.session.weather.city;
  if (ctx.match[0] === messages.btns.weatherSubscTime[9][1]) {
    ctx.reply(messages.info.weatherSubscribed('9'));
    setWeatherSubscription(9, city, ctx);
  } else if (ctx.match[0] === messages.btns.weatherSubscTime[6][1]) {
    ctx.reply(messages.info.weatherSubscribed('6'));
    setWeatherSubscription(6, city, ctx);
  }

  ctx.scene.leave();
});
