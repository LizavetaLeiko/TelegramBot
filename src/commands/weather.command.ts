import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import axios, { AxiosResponse } from "axios";
import { IConfigService } from "../config/config.interface";

export class WeatherCommand extends Command {
  configService: IConfigService;
  constructor(public bot: Telegraf<IBotContext>,configService: IConfigService ) {
    super(bot);
    this.configService = configService;
  }
  handle(): void {
    this.bot.command("weater", async (ctx) => {
      ctx.sendMessage("What is your city?");
      this.bot.hears(/.*/, async (ctx2) => {
        this.getQuery(ctx2)
      });
    });
  }
  async getQuery(ctx: any): Promise<void> {
    let city: string = ctx.message.text;
    if (city) {
      try {
        const response: AxiosResponse<any> = await axios.get<any>(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.configService.get(
            "WEATHER_TOKEN"
          )}`
        );
        await ctx.reply(
          `Weather in ${city}:
  temperature: ${
    response.data.main.temp
      ? Math.floor(response.data.main.temp - 273)
      : "there is no information"
  },
  sky: ${
    response.data.weather[0].description
      ? response.data.weather[0].description
      : "there is no information"
  },
  wind: ${
    response.data.wind.speed
      ? response.data.wind.speed
      : "there is no information"
  } `)} catch (err) {
        await ctx.reply(
          `The weather in ${city} is not found. Please, check your town (it should be in english and without any spaces, smileys, quotes, etc.) or try later`
        );
      }
    }
  }
}
