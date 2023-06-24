import axios, { AxiosResponse } from 'axios';

import { messages, tokens, urls } from '@constants';
import { IWeatherData } from '@interfaces';

export async function getWeather(city: string): Promise<IWeatherData | string> {
  const url = urls.weatherUrl
    ? urls.weatherUrl
      .replace('{city}', city)
      .replace('{token}', tokens.weatherToken)
    : urls.weatherUrl;
  try {
    const response: AxiosResponse<IWeatherData> = await axios.get<IWeatherData>(
      url,
    );
    return response.data;
  } catch (err) {
    if (
      err instanceof Error &&
			err.message === 'Request failed with status code 404'
    ) {
      return messages.errors.cityErr;
    }
    return messages.errors.unknownErr;
  }
}