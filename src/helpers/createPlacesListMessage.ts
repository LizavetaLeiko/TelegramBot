import { messages } from '@constants';
import { IPlaceBase, IPlacesCollection } from '@interfaces';

export function createPlacesListMessage(data: IPlacesCollection): string {
  const filteredArr = data.features
    .filter((item: IPlaceBase) => item.properties.name)
    .slice(0, 8);

  const response = filteredArr.map(
    (item: IPlaceBase, index: number) => `${++index}. ${item.properties.name} `,
  );

  response.unshift(messages.info.places);

  return response.join('\n');
}
