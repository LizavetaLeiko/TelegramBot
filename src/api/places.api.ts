import axios, { AxiosResponse } from 'axios';

import { messages, tokens, urls } from '@constants';
import { ICityInfo, IPlacesCollection } from '@interfaces';
import { handleErrors } from '@helpers';

export async function getCity(city: string): Promise<ICityInfo | string> {
  const url = urls.checkCityUrl
    ? urls.checkCityUrl
      .replace('{city}', city)
      .replace('{token}', tokens.placesToken)
    : urls.checkCityUrl;
  try {
    const response: AxiosResponse<ICityInfo> = await axios.get<ICityInfo>(
      url,
    );
    if (response.data.status === 'NOT_FOUND') {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (err) {
    if (err instanceof Error && err.message == `Name ${city} at  not found`) {
      return messages.errors.cityErr;
    }
    return messages.errors.unknownErr;
  }
}

export async function getPlaces(
  kind: string,
  long: number,
  lat: number,
): Promise<IPlacesCollection | string> {
  const url = urls.placesUrl
    ? urls.placesUrl
      .replace('{long}', `${long}`)
      .replace('{lat}', `${lat}`)
      .replace('{kind}', kind)
      .replace('{token}', tokens.placesToken)
    : urls.placesUrl;
  return handleErrors(async () => {
    const response: AxiosResponse<IPlacesCollection> =
			await axios.get<IPlacesCollection>(url);
    return response.data;
  });
}
