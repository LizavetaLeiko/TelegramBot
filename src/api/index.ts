import axios, { AxiosResponse } from "axios";
import { IWeatherData } from "../interfaces/weatherData.interfaces";
import { ITask } from "../interfaces/task.interface";
import { TaskModel } from "../models/taskModel";
import { IPicturesData } from "../interfaces/picturesData.interface";
import { ICityInfo, IPlacesCollection } from "../interfaces/placesData.interfaces";
import { config } from "dotenv";
import { cityErr, unknownErr } from "../constants/errorMsgs";

config()

export async function getWeather(city: string): Promise<IWeatherData | string> {
  try {
    const response: AxiosResponse<IWeatherData> =
    await axios.get<IWeatherData>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.WEATHER_TOKEN}`);
    return response.data;
  } catch (err) {
    if (err instanceof Error && err.message === 'Request failed with status code 404') {
      return cityErr
    }
    return unknownErr
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

export async function getAnimalPicture(animal: string): Promise<IPicturesData | string> {
  const randomPage = Math.floor(Math.random() * 50);
  try {
    const response: AxiosResponse<IPicturesData> =
      await axios.get<IPicturesData>(
        `https://api.pexels.com/v1/search?query=${animal}&per_page=1&page=${randomPage}`,
        {
          headers: {
            Authorization: process.env.PICTURES_TOKEN,
          },
        }
      );
    return response.data;
  } catch (err) {
    return unknownErr;
  }
}

export async function getCity(city: string): Promise<ICityInfo | string> {
  try {
    const response: AxiosResponse<ICityInfo> = await axios.get<ICityInfo>(
      `https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${process.env.PLACES_TOKEN}`
    );
    if (response.data.status === "NOT_FOUND") {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (err) {
    if (err instanceof Error && err.message == `Name ${city} at  not found`) {
      return cityErr
    }
    return unknownErr;
  }
}

export async function getPlaces(kind: string, long: number, lat: number ): Promise<IPlacesCollection | string> {
  try {
    const response: AxiosResponse<IPlacesCollection> =
      await axios.get<IPlacesCollection>(
        `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${
          long
        }&lat=${
          lat
        }&kinds=${kind}&format=geojson&limit=15&apikey=${process.env.PLACES_TOKEN}`
      );
    return response.data;
  } catch (err) {
    return unknownErr;
  }
}