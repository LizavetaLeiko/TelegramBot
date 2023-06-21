// eslint-disable-next-line import/no-extraneous-dependencies
import { config } from 'dotenv';

config();

export const botToken = process.env.TOKEN || '';
export const dbToken = process.env.MONGO_URL || '';
export const weatherToken = process.env.WEATHER_TOKEN || '';
export const picturesToken = process.env.PICTURES_TOKEN || '';
export const placesToken = process.env.PLACES_TOKEN || '';
