import { IPlaceBase, IPlacesCollection } from "../interfaces/placesData.interfaces";

export function createPlacesListMessage(data: IPlacesCollection): string{
  let filteredArr = data.features.filter((item: IPlaceBase) => item.properties.name).slice(0, 8)
  const response = filteredArr.map((item: IPlaceBase, index: number) =>
    `${++index}. ${item.properties.name} `
  );
  response.unshift('There is a list of places:')
  return response.join('\n');
}