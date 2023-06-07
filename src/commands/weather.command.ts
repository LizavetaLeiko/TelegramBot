import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../interfaces/context.interface";
import axios, { AxiosResponse } from "axios";
import { IConfigService } from "../config/config.interface";
import cron from "node-cron";
import { createWeatherResponce } from "../helpers/CreateWeatherMessage";
import { IWeatherData } from "../interfaces/weatherData.interfaces";

export class WeatherCommand extends Command {
  configService: IConfigService;
  sessionCount = 0;
  constructor(
    public bot: Telegraf<IBotContext>,
    configService: IConfigService
  ) {
    super(bot);
    this.configService = configService;
  }
  handle(): void {
    this.bot.command("weather", async (ctx) => {
      this.sessionCount = ctx.session.weather.length;
      ctx.session.weather = [
        ...ctx.session.weather,
        { weatherCounter: this.sessionCount, city: "", isSubsribed: false },
      ];
      ctx.sendMessage("What is your city?");
      this.bot.hears(/.*/, async (ctx2) => {
        const city = ctx2.message.text.trim();
        ctx.session.weather[this.sessionCount].city = city;
        const data = await this.getQuery(city);
        if (typeof data === "string") {
          ctx2.reply(data);
        } else if (!ctx2.session.weather[this.sessionCount].isSubsribed) {
          ctx2.reply(
            createWeatherResponce(data),
            Markup.inlineKeyboard([
              Markup.button.callback("Get weather every morning", "subscribe"),
            ])
          );
        } else {
          ctx2.reply(createWeatherResponce(data));
        }
      });
    });
    this.bot.action("subscribe", (ctx3) => {
      ctx3.session.weather[this.sessionCount].isSubsribed = true;
      ctx3.sendMessage(
        "What time would you like to get the forecast?",
        Markup.inlineKeyboard([
          Markup.button.callback("At 6:00", "subscribed_6am"),
          Markup.button.callback("At 9:00", "subscribed_9am"),
        ])
      );
    });
    this.bot.action(/subscribed_(9am|6am)/, (ctx4) => {
      if (ctx4.match[0].startsWith("subscribed")) {
        if (ctx4.match[0] === "subscribed_9am") {
          ctx4.reply(
            "Great! I will send you the forecast every morning at 9:00"
          );
          cron.schedule("0 9 * * *", async () => {
            const data = await this.getQuery(
              ctx4.session.weather[this.sessionCount].city
            );
            if (typeof data === "string") {
              ctx4.reply(data);
            } else {
              ctx4.reply(createWeatherResponce(data));
            }
          });
        } else if (ctx4.match[0] === "subscribed_6am") {
          ctx4.reply(
            "Great! I will send you the forecast every morning at 6:00"
          );
          cron.schedule("0 6 * * *", async () => {
            const data = await this.getQuery(
              ctx4.session.weather[this.sessionCount].city
            );
            if (typeof data === "string") {
              ctx4.reply(data);
            } else {
              ctx4.reply(createWeatherResponce(data));
            }
          });
        }
      }
    });
  }
  async getQuery(city: string): Promise<IWeatherData | string> {
    try {
      const response: AxiosResponse<IWeatherData> =
        await axios.get<IWeatherData>(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.configService.get(
            "WEATHER_TOKEN"
          )}`
        );
      return response.data;
    } catch (err) {
      return `The weather in ${city} is not found. Please, check your town (it should be in english and without any spaces, smileys, quotes, etc.) or try later`;
    }
  }
}
