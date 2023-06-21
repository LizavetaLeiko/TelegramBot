// eslint-disable-next-line import/no-extraneous-dependencies
import { config } from 'dotenv';

config();

export const tokens = {
  botToken: process.env.TOKEN || '',
  dbToken: process.env.MONGO_URL || '',
  weatherToken:  process.env.WEATHER_TOKEN || '',
  picturesToken: process.env.PICTURES_TOKEN || '',
  placesToken: process.env.PLACES_TOKEN || '',
};
