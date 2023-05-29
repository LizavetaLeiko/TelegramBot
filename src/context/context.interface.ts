import { Context } from "telegraf";

export interface ISessionData{
  oneMorePicture: boolean
}

export interface IBotContext extends Context{
  session: ISessionData
}
