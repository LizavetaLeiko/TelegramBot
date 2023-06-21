import axios, { AxiosResponse } from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { config } from 'dotenv';

import { TaskModel } from '../models/taskModel';
import {
  cityErr,
  picturesToken,
  placesToken,
  unknownErr,
  weatherToken,
} from '../constants';
import {
  ICityInfo,
  IPicturesData,
  IPlacesCollection,
  ITask,
  IWeatherData,
} from '../interfaces';

config();

export async function getWeather(city: string): Promise<IWeatherData | string> {
  let url = process.env.WEATHER_URL || '';
  url
    ? (url = url.replace('{city}', city).replace('{token}', weatherToken))
    : url;
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
      return cityErr;
    }
    return unknownErr;
  }
}

export async function createTask(taskData: ITask) {
  try {
    const task = await TaskModel.create(taskData);
    return task;
  } catch (error) {
    return unknownErr;
  }
}

export async function updateTask(id: string, reminder: string) {
  try {
    const task = await TaskModel.findOne({ id });
    if (task) {
      task.reminder = reminder;
      await task.save();
      return task;
    }
    return task;
  } catch (error) {
    return unknownErr;
  }
}

export async function getTask(id: string) {
  try {
    const task = await TaskModel.findOne({ id });
    return task;
  } catch (error) {
    return unknownErr;
  }
}
export async function getAllTasks(user_id: number) {
  try {
    const tasks = await TaskModel.find({ user_id });
    return tasks;
  } catch (error) {
    return unknownErr;
  }
}
export async function deleteAllTasks(user_id: number) {
  try {
    const tasks = await TaskModel.deleteMany({ user_id });
    return tasks;
  } catch (error) {
    return unknownErr;
  }
}
export async function getAnimalPicture(
  animal: string,
): Promise<IPicturesData | string> {
  const randomPage = Math.floor(Math.random() * 50);
  let url = process.env.PICTURES_URL || '';
  url
    ? (url = url
      .replace('{animal}', animal)
      .replace('{randomPage}', `${randomPage}`))
    : url;
  try {
    const response: AxiosResponse<IPicturesData> =
      await axios.get<IPicturesData>(url, {
        headers: {
          Authorization: picturesToken,
        },
      });
    return response.data;
  } catch (err) {
    return unknownErr;
  }
}

export async function getCity(city: string): Promise<ICityInfo | string> {
  let url = process.env.CHECK_CITY_URL || '';
  url
    ? (url = url.replace('{city}', city).replace('{token}', placesToken))
    : url;
  try {
    const response: AxiosResponse<ICityInfo> = await axios.get<ICityInfo>(url);
    if (response.data.status === 'NOT_FOUND') {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (err) {
    if (err instanceof Error && err.message == `Name ${city} at  not found`) {
      return cityErr;
    }
    return unknownErr;
  }
}

export async function getPlaces(
  kind: string,
  long: number,
  lat: number,
): Promise<IPlacesCollection | string> {
  let url = process.env.PLACES_URL || '';
  url
    ? (url = url
      .replace('{long}', `${long}`)
      .replace('{lat}', `${lat}`)
      .replace('{kind}', kind)
      .replace('{token}', placesToken))
    : url;
  try {
    const response: AxiosResponse<IPlacesCollection> =
      await axios.get<IPlacesCollection>(url);
    return response.data;
  } catch (err) {
    return unknownErr;
  }
}
