import axios, { AxiosResponse } from 'axios';

import { tokens, urls } from '@constants';
import { IPicturesData } from '@interfaces';
import { handleErrors } from '@helpers';

export async function getAnimalPicture(
  animal: string,
): Promise<IPicturesData | string> {
  const randomPage = Math.floor(Math.random() * 50);
  const url = urls.animalsUrl
    ? urls.animalsUrl
      .replace('{animal}', animal)
      .replace('{randomPage}', `${randomPage}`)
    : urls.animalsUrl;
  return handleErrors(async () => {
    const response: AxiosResponse<IPicturesData> =
			await axios.get<IPicturesData>(url, {
			  headers: {
			    Authorization: tokens.picturesToken,
			  },
			});
    return response.data;
  });
}
