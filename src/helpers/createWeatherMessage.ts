import { IDayWeather, IWeatherData } from '../interfaces';

export function createWeatherResponce(data: IWeatherData): string {
  const kelvinMoreThenCelsius = 273;
  const milesLessThenKm = 1.6;

  const filteredWeatherData = data.list.filter(
    (item: IDayWeather, i: number) => i === 0 || i === 8 || i === 16
  );
  const response = filteredWeatherData.map(
    (item: IDayWeather) =>
      `
Weather in ${data.city.name} ${item.dt_txt.slice(0, -3)} :
    🌝 temperature: ${
      item.main.temp
        ? Math.round(item.main.temp - kelvinMoreThenCelsius) + '°C'
        : 'there is no information'
    },
    ⛅️ sky: ${
      item.weather[0].description
        ? item.weather[0].description
        : 'there is no information'
    },
    💨 wind: ${
      item.wind.speed
        ? Math.round(item.wind.speed * milesLessThenKm) + ' km/h'
        : 'there is no information'
    }`
  );
  return response.join('\n');
}

export function createWeatherSubscriptionMsg(hour: number): string {
  return `Great! I will send you the forecast every morning at ${hour}:00`;
}
