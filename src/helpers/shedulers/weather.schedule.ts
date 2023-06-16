import  schedule  from 'node-schedule';
import { IBotContext } from '../../interfaces';
import { getWeather } from '../../api';
import { createWeatherResponce } from '../createWeatherMessage';

export default function setWeatherSubscription(hour: number, city: string, ctx: IBotContext){
  const fromUTC = 3;
  schedule.scheduleJob(`00 ${hour - fromUTC} * * *`, async () => {
    const data = await getWeather(city);
    if (typeof data === "string") {
      ctx.reply(data);
    } else {
      ctx.reply(createWeatherResponce(data));
    }
  });
}