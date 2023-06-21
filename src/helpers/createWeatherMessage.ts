import { kelvinMoreThenCelsius, milesLessThenKm } from '../constants';
import { IDayWeather, IWeatherData } from '../interfaces';

export function createWeatherResponce(data: IWeatherData): string {
  const filteredWeatherData = data.list.filter(
    (item: IDayWeather, i: number) => i === 0 || i === 8 || i === 16,
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
}`,
  );

  return response.join('\n');
}

