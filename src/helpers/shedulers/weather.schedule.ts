import schedule from 'node-schedule';

import { fromUTC } from '@constants';
import { IBotContext } from '@interfaces';
import { getWeather } from '@api';
import { createWeatherResponce } from '@helpers';

export function setWeatherSubscription(
  hour: number,
  city: string,
  ctx: IBotContext,
) {
  const weatherSchedule = schedule.scheduleJob(`00 ${hour - fromUTC} * * *`, async () => {
    const data = await getWeather(city);
    if (typeof data === 'string') {
      ctx.reply(data);
    } else {
      ctx.reply(createWeatherResponce(data));
    }
  });

  ctx.session.schedulers ? ctx.session.schedulers : ctx.session.schedulers = [];
  ctx.session.schedulers.push({ timer: weatherSchedule, city: city });
}
