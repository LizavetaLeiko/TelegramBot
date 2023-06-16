import { config } from "dotenv";

config()

export  const botToken = process.env.TOKEN || ''
export const dbToken = process.env.MONGO_URL || ''
