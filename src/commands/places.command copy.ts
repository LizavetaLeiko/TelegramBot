import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../interfaces/context.interface";
import axios, { AxiosResponse } from "axios";
import { IConfigService } from "../config/config.interface";
import { createPlacesListMessage } from "../helpers/createPlacesListMessage";
import {
  ICityInfo,
  IPlacesCollection,
} from "../interfaces/placesData.interfaces";
import { placesBtns } from '../helpers/placesBtns'

export class PlacesCommand extends Command {
  configService: IConfigService;
  long: number;
  lat: number;
  constructor(
    public bot: Telegraf<IBotContext>,
    configService: IConfigService
  ) {
    super(bot);
    this.configService = configService;
    this.long = 0;
    this.lat = 0;
  }
  handle(): void {
    this.bot.command("places", async (ctx) => {
      ctx.sendMessage("What is a city you interested in?");
      this.bot.hears(/.*/, async (ctx2) => {
        const city = ctx2.message.text.trim();
        const data = await this.getCityQuery(city);
        if (typeof data === "string") {
          ctx2.reply(data);
        } else {
          this.lat = data.lat;
          this.long = data.lon;
          ctx2.reply(
            `Ok, your city is ${data.name}
What type of places would you like to get?`,
            Markup.inlineKeyboard(placesBtns.map(item => Markup.button.callback(`${item}`, `places_${item}`)))
          );
        }
      });
    });
    this.bot.action(
      /places_(foods|religion|natural|cultural)/,
      async (ctx3) => {
        const data = await this.getCategoryQuery(ctx3.match[0].slice(7));
        if (typeof data === "string") {
          ctx3.reply(data);
        } else {
          ctx3.reply(createPlacesListMessage(data));
        }
      }
    );
  }
  async getCityQuery(city: string): Promise<ICityInfo | string> {
    try {
      const response: AxiosResponse<ICityInfo> = await axios.get<ICityInfo>(
        `https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${this.configService.get(
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
  async getCategoryQuery(kind: string): Promise<IPlacesCollection | string> {
    try {
      const response: AxiosResponse<IPlacesCollection> =
        await axios.get<IPlacesCollection>(
          `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${
            this.long
          }&lat=${
            this.lat
          }&kinds=${kind}&format=geojson&limit=15&apikey=${this.configService.get(
            "PLACES_TOKEN"
          )}`
        );
      return response.data;
    } catch (err) {
      return `Sorry, something is wrong. Please, try later`;
    }
  }
}
