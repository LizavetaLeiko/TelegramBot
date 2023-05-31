import { Context } from "telegraf";

export interface ISessionData{
  weather: Array<{
    weatherCounter: number,
    city: string,
    isSubsribed: boolean
  }>
}

export interface IBotContext extends Context{
  session: ISessionData
}
