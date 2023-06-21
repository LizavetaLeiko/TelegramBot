import schedule from 'node-schedule';

import { createWeatherResponce } from '../createWeatherMessage';

import { fromUTC } from '../../constants';
import { IBotContext } from '../../interfaces';
import { getWeather } from '../../api';

export function setWeatherSubscription(
  hour: number,
  city: string,
  ctx: IBotContext,
) {
  schedule.scheduleJob(`00 ${hour - fromUTC} * * *`, async () => {
    const data = await getWeather(city);
    if (typeof data === 'string') {
      ctx.reply(data);
    } else {
      ctx.reply(createWeatherResponce(data));
    }
  });
}
