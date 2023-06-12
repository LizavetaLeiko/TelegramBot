import axios, { AxiosResponse } from "axios";
import { ConfigSrevice } from "../config/config.service";
import { IWeatherData } from "../interfaces/weatherData.interfaces";
import { ITask } from "../interfaces/task.interface";
import { TaskModel } from "../models/taskModel";
import { IPicturesData } from "../interfaces/picturesData.interface";
import { ICityInfo, IPlacesCollection } from "../interfaces/placesData.interfaces";

export async function getWeather(city: string): Promise<IWeatherData | string> {
  const configService = new ConfigSrevice;
  try {
    const response: AxiosResponse<IWeatherData> =
      await axios.get<IWeatherData>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${configService.get(
          "WEATHER_TOKEN"
        )}`
      );
    return response.data;
  } catch (err) {
    return `The weather in ${city} is not found. Please, check your town (it should be in english and without any spaces, smileys, quotes, etc.) or try later`;
  }
}

export async function createTask(taskData: ITask) {
  try {
    const task = await TaskModel.create(taskData);
    return task;
  } catch (error) {
    return "Sorry, something is wrong. Please, try later";
  }
}

export async function getAnimalPicture(animal: string): Promise<IPicturesData | string> {
  const configService = new ConfigSrevice;
  const randomPage = Math.floor(Math.random() * 50);
  try {
    const response: AxiosResponse<IPicturesData> =
      await axios.get<IPicturesData>(
        `https://api.pexels.com/v1/search?query=${animal}&per_page=1&page=${randomPage}`,
        {
          headers: {
            Authorization: configService.get("PICTURES_TOKEN"),
          },
        }
      );
    return response.data;
  } catch (err) {
    return `Sorry, something is wrong`;
  }
}

export async function getCity(city: string): Promise<ICityInfo | string> {
  const configService = new ConfigSrevice;
  try {
    const response: AxiosResponse<ICityInfo> = await axios.get<ICityInfo>(
      `https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${configService.get(
        "PLACES_TOKEN"
      )}`
    );
    if (response.data.status === "NOT_FOUND") {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (err) {
    return `Sorry, something is wrong. Please, check your city (it should be in english and without any spaces, smileys, quotes, etc.) or try later`;
  }
}

export async function getPlaces(kind: string, long: number, lat: number ): Promise<IPlacesCollection | string> {
  const configService = new ConfigSrevice;
  try {
    const response: AxiosResponse<IPlacesCollection> =
      await axios.get<IPlacesCollection>(
        `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${
          long
        }&lat=${
          lat
        }&kinds=${kind}&format=geojson&limit=15&apikey=${configService.get(
          "PLACES_TOKEN"
        )}`
      );
    return response.data;
  } catch (err) {
    return `Sorry, something is wrong. Please, try later`;
  }
}